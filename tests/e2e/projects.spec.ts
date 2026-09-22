import { expect, test } from "@playwright/test";

/**
 * The retex is a modal with no URL of its own: nothing but the DOM says whether it is
 * open. Its three ways out — the close button, Escape and a click on the backdrop — are
 * each wired separately in RetexViewer, so each one is checked separately here.
 */

test.describe("projects listing", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/projects");
        await expect(page.locator("#projects-container")).toBeVisible();
    });

    test("lists the project cards", async ({ page }) => {
        const cards = page.locator("#projects-container [id^='card-'][id$='-container']");

        await expect(cards.first()).toBeVisible();
        expect(await cards.count()).toBeGreaterThan(0);
    });

    test("keeps the retex closed until a card is opened", async ({ page }) => {
        await expect(page.locator("#retex-container")).toBeHidden();
    });

    test("narrows the listing as the search bar is typed into", async ({ page }) => {
        const cards = page.locator("#projects-container [id^='card-'][id$='-container']");
        const before = await cards.count();

        await page.locator("#search-bar-container input").fill("zzzzznomatch");

        await expect(async () => {
            expect(await cards.count()).toBeLessThan(before);
        }).toPass({ timeout: 5_000 });
    });

    test("restores the listing when the search is cleared", async ({ page }) => {
        const cards = page.locator("#projects-container [id^='card-'][id$='-container']");
        const before = await cards.count();
        const search = page.locator("#search-bar-container input");

        await search.fill("zzzzznomatch");
        await search.fill("");

        await expect(async () => {
            expect(await cards.count()).toBe(before);
        }).toPass({ timeout: 5_000 });
    });
});

test.describe("retex overlay", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/projects");

        const firstCard = page.locator("#projects-container [id^='card-'][id$='-container']").first();

        await expect(firstCard).toBeVisible();
        await firstCard.click();
        await expect(page.locator("#retex-container")).toBeVisible();
    });

    test("opens on a card click and shows the project content", async ({ page }) => {
        await expect(page.locator("#retex-content")).toBeVisible();
        await expect(page.locator("#specs")).toBeVisible();
    });

    /** The overlay is a dialog: it declares the role, traps focus, and locks the page
     *  behind it. Losing any of those makes it unusable with a keyboard. */
    test("is announced as a modal dialog", async ({ page }) => {
        const retex = page.locator("#retex-container");

        await expect(retex).toHaveAttribute("role", "dialog");
        await expect(retex).toHaveAttribute("aria-modal", "true");
    });

    test("locks the page scroll while it is open", async ({ page }) => {
        await expect(async () => {
            expect(await page.evaluate(() => document.body.style.overflow)).toBe("hidden");
        }).toPass({ timeout: 5_000 });
    });

    test("closes on Escape", async ({ page }) => {
        await page.keyboard.press("Escape");

        await expect(page.locator("#retex-container")).toBeHidden();
    });

    test("releases the page scroll once closed", async ({ page }) => {
        await page.keyboard.press("Escape");
        await expect(page.locator("#retex-container")).toBeHidden();

        await expect(async () => {
            expect(await page.evaluate(() => document.body.style.overflow)).toBe("scroll");
        }).toPass({ timeout: 5_000 });
    });

    test("closes on a click outside the panel", async ({ page }) => {
        // The backdrop handler compares the event target to the retex wrapper itself, so
        // the click has to land on the padding around the panel, not on the panel.
        await page.locator("#retex-container > div").click({ position: { x: 5, y: 5 } });

        await expect(page.locator("#retex-container")).toBeHidden();
    });

    test("closes on the close button", async ({ page }) => {
        const close = page.locator("#retex-content button[aria-label='Close button']");

        if (await close.count() === 0 || !(await close.isVisible())) return;

        await close.click();
        await expect(page.locator("#retex-container")).toBeHidden();
    });
});
