import { expect, Page, test } from "@playwright/test";

/**
 * From md up, the career section reads as two columns scrolled on their own, experiences
 * and education, each carrying its timeline as its scrollbar: every year faces the card it
 * dates and scrolls with it, and a thumb on the axis can be dragged. Below md the columns
 * give way to one horizontal swipe. None of this exists outside the layout engine, so it
 * lives here rather than in jsdom.
 */

test.use({ reducedMotion: "reduce" });

/**
 * @function openCareer Load the home page and bring the career section into view.
 * @param page - The page to drive
 */
const openCareer = async (page: Page) => {
    await page.goto("/");
    const section = page.locator("#career");

    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
};

/**
 * @function yearsFacingCards Tell, for each year of a column, whether its dot sits level
 * with the top of one of the cards of that column.
 * @param page - The page to measure
 * @param name - Column name: "experience" or "education"
 * @returns One entry per year, with the distance from its dot to the nearest card top (px)
 */
const yearsFacingCards = (page: Page, name: string) => page.evaluate((name) => {
    const cards = [...document.querySelectorAll(`#career-${name}-cards article`)];

    return [...document.querySelectorAll(`#career-${name}-years > span`)].map((year) => {
        const dot = year.querySelector("span")!.getBoundingClientRect();
        const center = dot.top + dot.height / 2;
        const distance = Math.min(...cards.map((card) => {
            const top = card.getBoundingClientRect().top;
            return center >= top ? center - top : Infinity;
        }));

        return { year: year.textContent!.trim(), distance };
    });
}, name);

test.describe("career columns", () => {
    test.skip(({ viewport }) => (viewport?.width ?? 0) < 768, "the two columns start at md");

    test.beforeEach(async ({ page }) => openCareer(page));

    test("sets experiences and education side by side", async ({ page }) => {
        const experience = await page.locator("#career-experience-column").boundingBox();
        const education = await page.locator("#career-education-column").boundingBox();

        expect(experience && education, "both columns are rendered").toBeTruthy();
        expect(experience!.x + experience!.width).toBeLessThanOrEqual(education!.x);
    });

    test("scrolls each column on its own", async ({ page }) => {
        await page.locator("#career-experience-scroll").evaluate((scroller) => scroller.scrollTo({ top: 300, behavior: "instant" }));

        await expect.poll(() => page.locator("#career-experience-scroll").evaluate((scroller) => scroller.scrollTop)).toBeGreaterThan(0);
        expect(await page.locator("#career-education-scroll").evaluate((scroller) => scroller.scrollTop)).toBe(0);
    });

    test("lists the years of each column newest first", async ({ page }) => {
        for (const name of ["experience", "education"]) {
            const years = (await page.locator(`#career-${name}-years > span`).allTextContents()).map((year) => parseInt(year, 10));

            expect(years.length, `${name} has years on its track`).toBeGreaterThan(0);
            expect(years).toEqual([...years].sort((a, b) => b - a));
        }
    });

    test("keeps every year facing its card while the column scrolls", async ({ page }) => {
        for (const name of ["experience", "education"]) {
            for (const top of [0, 250, 600]) {
                await page.locator(`#career-${name}-scroll`).evaluate((scroller, top) => scroller.scrollTo({ top, behavior: "instant" }), top);
                await page.waitForTimeout(100);

                for (const { year, distance } of await yearsFacingCards(page, name)) {
                    expect(distance, `${name} ${year} at scroll ${top} faces a card top`).toBeLessThan(24);
                }
            }
        }
    });

    test("scrolls the column when its thumb is dragged", async ({ page }) => {
        const scroller = page.locator("#career-experience-scroll");
        const thumb = await page.locator("#career-experience-thumb").boundingBox();

        expect(thumb, "the column overflows, so it has a thumb").toBeTruthy();

        await page.mouse.move(thumb!.x + thumb!.width / 2, thumb!.y + 10);
        await page.mouse.down();
        await page.mouse.move(thumb!.x + thumb!.width / 2, thumb!.y + 70, { steps: 5 });
        await page.mouse.up();

        expect(await scroller.evaluate((element) => element.scrollTop)).toBeGreaterThan(50);
    });
});

test.describe("career certifications", () => {
    test.beforeEach(async ({ page }) => openCareer(page));

    test("opens the detail of a certification without a native tooltip on top", async ({ page, isMobile }) => {
        const token = page.locator("#career-certification-0");
        const detail = page.locator("#career-certification-detail-0");

        await expect(token).toBeVisible();
        if (isMobile) await token.focus();
        else await token.hover();

        await expect.poll(() => detail.evaluate((element) => getComputedStyle(element).opacity)).toBe("1");
        expect(await token.evaluate((element) => element.querySelectorAll("[title]").length + (element.hasAttribute("title") ? 1 : 0))).toBe(0);
    });
});

test.describe("career swipe", () => {
    test.skip(({ viewport }) => (viewport?.width ?? 0) >= 768, "the swipe only exists below md");

    test("trades the columns for a horizontal swipe", async ({ page }) => {
        await openCareer(page);

        await expect(page.locator("#career-horizontal-view")).toBeVisible();
        await expect(page.locator("#career-columns-view")).toBeHidden();
        expect(await page.locator("#career-horizontal-scroll article").count()).toBeGreaterThan(1);
    });
});
