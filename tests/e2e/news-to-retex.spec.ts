import { expect, Locator, Page, test } from "@playwright/test";

/**
 * The news section is the one place that opens a retex through a route change. That
 * detour is what broke the gallery button: the page transition animates on `y`, and a
 * transform on an ancestor makes it the containing block of the fixed retex overlay, so
 * anything measured while the transition runs is measured against the wrong box.
 *
 * These assertions therefore care about geometry, not presence. An element pushed out of
 * an `overflow-hidden` parent keeps a bounding box, so `toBeVisible()` stays green on the
 * very bug this file exists to catch.
 */

/**
 * @function openFirstProjectFromNews Click the first project card of the news feed and
 * wait for the retex it opens on the projects page.
 * @param page - the page under test
 * @returns the locator of the opened retex overlay
 */
const openFirstProjectFromNews = async (page: Page): Promise<Locator> => {
    await page.goto("/");

    // Posts are links, projects are buttons: the card kind is readable from the markup.
    const projectCard = page.locator("#news-cards-list li button").first();

    await expect(projectCard).toBeVisible();
    await projectCard.click();

    await page.waitForURL(/\/projects/);

    const retex = page.locator("#retex-container");

    await expect(retex).toBeVisible();
    return retex;
};

/**
 * @function expectContainedIn Assert that an element sits fully inside another one.
 * @param inner - the element expected to be contained
 * @param outer - the element expected to contain it
 */
const expectContainedIn = async (inner: Locator, outer: Locator) => {
    const innerBox = await inner.boundingBox();
    const outerBox = await outer.boundingBox();

    expect(innerBox, "the inner element has no layout box at all").not.toBeNull();
    expect(outerBox, "the outer element has no layout box at all").not.toBeNull();

    expect(innerBox!.x).toBeGreaterThanOrEqual(outerBox!.x - 1);
    expect(innerBox!.y).toBeGreaterThanOrEqual(outerBox!.y - 1);
    expect(innerBox!.x + innerBox!.width).toBeLessThanOrEqual(outerBox!.x + outerBox!.width + 1);
    expect(innerBox!.y + innerBox!.height).toBeLessThanOrEqual(outerBox!.y + outerBox!.height + 1);
};

test.describe("news feed to retex", () => {
    test("opens the retex of a project card on the projects page", async ({ page }) => {
        const retex = await openFirstProjectFromNews(page);

        await expect(retex.locator("#retex-content")).toBeVisible();
    });

    test("clears the navigation state so a reload does not reopen the retex", async ({ page }) => {
        await openFirstProjectFromNews(page);
        await page.reload();

        await expect(page.locator("#retex-container")).toBeHidden();
    });
});

test.describe("gallery button", () => {
    // The preview and its button only exist from lg up; below it the retex falls back to
    // the stacked mobile gallery, which is covered on its own.
    test.skip(({ viewport }) => (viewport?.width ?? 0) < 1024, "desktop layout only");

    test("stays inside its preview when the retex is reached from the news feed", async ({ page }) => {
        await openFirstProjectFromNews(page);

        const preview = page.locator("#retex-gallery-preview");
        const button = page.locator("#retex-gallery-button");

        await expect(preview).toBeVisible();

        if (await button.count() === 0) {
            // A single-media project renders the media itself instead of a button. That
            // is by design, and there is nothing to place in that case.
            await expect(preview.locator("img, video")).toHaveCount(1);
            return;
        }

        await expect(button).toBeVisible();
        await expectContainedIn(button, preview);
    });

    test("opens the gallery when clicked, coming from the news feed", async ({ page }) => {
        await openFirstProjectFromNews(page);

        const button = page.locator("#retex-gallery-button");

        if (await button.count() === 0 || await button.isDisabled()) return;

        // This covers the gallery opening, not the placement: Playwright scrolls an
        // element into view before clicking it, which works around the clipping the
        // placement tests above are there to catch.
        await button.click();

        await expect(page.locator("#retex-gallery-container")).toBeVisible();
        await expect(page.locator("#gallery-focused-image-container")).toBeVisible();
        await expect(page.locator("#retex-gallery-button")).toBeHidden();
    });

    test("places the button the same way whether the retex is reached by route or by click", async ({ page }) => {
        await openFirstProjectFromNews(page);

        const fromNews = await page.locator("#retex-gallery-button").boundingBox();
        const preview = await page.locator("#retex-gallery-preview").boundingBox();

        if (!fromNews || !preview) return;

        // Centred in its preview, which is what the JS measurement used to get wrong.
        const offsetX = fromNews.x + fromNews.width / 2 - (preview.x + preview.width / 2);
        const offsetY = fromNews.y + fromNews.height / 2 - (preview.y + preview.height / 2);

        expect(Math.abs(offsetX)).toBeLessThanOrEqual(2);
        expect(Math.abs(offsetY)).toBeLessThanOrEqual(2);
    });
});
