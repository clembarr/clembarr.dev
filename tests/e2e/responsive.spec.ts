import { expect, Page, test } from "@playwright/test";

/**
 * The root of the page clips horizontal overflow (`overflow-x: hidden`, src/index.css): a
 * block pushed past the edge of the screen never shows a scrollbar, it is silently cut.
 * The page scroll width therefore proves nothing, and each element is measured instead.
 * The same goes for type: the font scale is written in percentages of the parent, so two
 * small sizes nested inside each other compound without any warning.
 *
 * The suite runs with reduced motion: ScrollReveal then renders every block at its resting
 * place from the start, instead of holding the ones it has not revealed yet transparent
 * and offset, which would hide them from the measure.
 *
 * These invariants run on every route, at one width per breakpoint band and at the
 * heights the height breakpoints split on. They check a shape, never a value: a section
 * added tomorrow is covered the day it appears.
 */

/** One viewport per width band (xs 400, ss 500, sm 640, md 768, lg 1024, xl 1280, 2xl 1536), plus a short laptop. */
const VIEWPORTS = [
    { width: 360, height: 740 },
    { width: 450, height: 800 },
    { width: 560, height: 800 },
    { width: 700, height: 800 },
    { width: 900, height: 800 },
    { width: 1100, height: 800 },
    { width: 1366, height: 650 },
    { width: 1600, height: 900 },
    { width: 1920, height: 1080 },
];

/**
 * Floor under which a rendered text is a compounding accident rather than a choice. The
 * smallest texts the site means to show sit at 10px (footer, media badges).
 */
const MIN_FONT_SIZE = 10;

/**
 * @function settle Scroll the page down and back up, so lazy sections mount before
 * anything is measured.
 * @param page - The page to settle
 */
const settle = async (page: Page) => {
    await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 400) {
            window.scrollTo(0, y);
            await new Promise((resolve) => setTimeout(resolve, 60));
        }
        window.scrollTo(0, 0);
    });
    await page.waitForTimeout(800);
};

/**
 * @function findCutElements List the visible elements that leave the viewport sideways
 * with nothing to scroll or clip them but the root of the page. An element inside a
 * horizontal scroller (a swipe, a carousel) or a container that clips on purpose is not
 * cut: it is waiting to be scrolled to, or it is decoration.
 * @param page - The page to measure
 * @returns One description per cut element
 */
const findCutElements = (page: Page) => page.evaluate(() => {
    const width = document.documentElement.clientWidth;

    const isHeldByAncestor = (element: Element): boolean => {
        for (let parent = element.parentElement; parent && parent !== document.body; parent = parent.parentElement) {
            if (parent.parentElement === document.body) return false;
            if (getComputedStyle(parent).overflowX !== "visible") return true;
        }
        return false;
    };

    return [...document.body.querySelectorAll("*")]
        .filter((element) => {
            const box = element.getBoundingClientRect();

            return box.width > 0
                && (box.right > width + 1 || box.left < -1)
                && !element.closest("[aria-hidden='true']")
                && element.checkVisibility({ opacityProperty: true, visibilityProperty: true })
                && !isHeldByAncestor(element);
        })
        .map((element) => {
            const box = element.getBoundingClientRect();
            return `${element.id || element.tagName.toLowerCase()} [${Math.round(box.left)}, ${Math.round(box.right)}]`;
        });
});

/**
 * @function findTinyTexts List the visible texts rendered below the font floor.
 * @param page - The page to measure
 * @param floor - Smallest font size allowed, in px
 * @returns One description per text under the floor
 */
const findTinyTexts = (page: Page, floor: number) => page.evaluate((floor) => {
    const tiny: string[] = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

    while (walker.nextNode()) {
        const text = walker.currentNode.textContent?.trim();
        const element = walker.currentNode.parentElement;
        if (!text || !element || !element.getBoundingClientRect().width) continue;
        if (!element.checkVisibility({ opacityProperty: true, visibilityProperty: true })) continue;

        const size = parseFloat(getComputedStyle(element).fontSize);
        if (size < floor) tiny.push(`${element.id || element.tagName.toLowerCase()} "${text.slice(0, 30)}" ${size}px`);
    }

    return tiny;
}, floor);

/**
 * @function articleRoute Read the route of the first article the blog listing links to.
 * @param page - Any page of the site
 * @returns The path of that article
 */
const articleRoute = async (page: Page): Promise<string> => {
    await page.goto("/blog");
    const href = await page.locator("a[href^='/blog/']").first().getAttribute("href");

    expect(href, "the blog listing links to no article").toBeTruthy();
    return href!;
};

test.describe("responsive layout", () => {
    test.skip(({ isMobile }) => isMobile, "the viewport matrix already covers phone widths");
    test.describe.configure({ mode: "parallel" });
    test.use({ reducedMotion: "reduce" });

    for (const route of ["/", "/projects", "/blog", "/credits", "article"]) {
        test(`${route} holds at every breakpoint`, async ({ page }) => {
            test.slow();
            const path = route === "article" ? await articleRoute(page) : route;

            for (const viewport of VIEWPORTS) {
                const at = `${path} at ${viewport.width}x${viewport.height}`;

                await page.setViewportSize(viewport);
                await page.goto(path);
                await settle(page);

                expect.soft(await findCutElements(page), `${at}: elements cut by the edge of the screen`).toEqual([]);
                expect.soft(await findTinyTexts(page, MIN_FONT_SIZE), `${at}: texts under ${MIN_FONT_SIZE}px`).toEqual([]);
            }
        });
    }
});
