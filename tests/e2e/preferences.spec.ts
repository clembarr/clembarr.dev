import { expect, Page, test } from "@playwright/test";

/**
 * Theme and language are the two pieces of state the site keeps for a visitor, in
 * localStorage, read back by getLocalTheme and getLocalLanguage. Both drive the whole
 * render: the theme picks a token set and a variant of every GraphicAsset, the language
 * picks a key in every multilingual object. A preference that does not survive a reload
 * is the failure that shows up on the second visit, never on the first.
 */

/**
 * @function switchTo Pick a language in the navbar dropdown.
 * @param page - the page under test
 * @param symbol - the language symbol as the dropdown displays it, such as "FR"
 */
const switchTo = async (page: Page, symbol: string) => {
    await page.locator("#navbar-options #dropdown-button").click();
    await page.locator("#navbar-options #items-list li")
        .filter({ hasText: new RegExp(`^${symbol}$`) })
        .click();
};

test.describe("theme", () => {
    test("toggles between light and dark", async ({ page }) => {
        await page.goto("/");

        const root = page.locator("html");
        const before = await root.getAttribute("class");

        await page.locator("#switch-container").click();

        await expect(root).not.toHaveClass(before ?? "");
    });

    test("survives a reload", async ({ page }) => {
        await page.goto("/");
        await page.locator("#switch-container").click();

        const chosen = await page.evaluate(() => localStorage.getItem("theme"));

        expect(chosen).toBeTruthy();

        await page.reload();

        expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe(chosen);
        await expect(page.locator("html")).toHaveClass(new RegExp(chosen!.toLowerCase()));
    });

    test("is announced as a switch with its state", async ({ page }) => {
        await page.goto("/");

        const toggle = page.locator("#switch-container");

        await expect(toggle).toHaveAttribute("role", "switch");
        await expect(toggle).toHaveAttribute("aria-checked", /true|false/);
    });

    /** Dark mode swaps the source of every themed image. A variant missing from the
     *  content layer leaves a broken image rather than an error. */
    test("keeps every image loadable in both themes", async ({ page }) => {
        await page.goto("/");
        await page.locator("#switch-container").click();
        await expect(page.locator("#news")).toBeVisible();

        const broken = await page.locator("img").evaluateAll((images) =>
            images
                .filter((image) => {
                    const img = image as HTMLImageElement;
                    return img.complete && img.naturalWidth === 0;
                })
                .map((image) => (image as HTMLImageElement).currentSrc || image.getAttribute("src"))
        );

        expect(broken, `broken images after the theme switch: ${broken.join(", ")}`).toEqual([]);
    });
});

test.describe("language", () => {
    // Scoped to the navbar: Dropdown hard-codes its ids, and the contact form mounts two
    // more instances of it on the same page.
    // The starting language is whatever navigator.language says unless localStorage
    // holds one, so it is pinned here: a headless browser reports en-US, and switching
    // to the language already in use would assert nothing.
    test.beforeEach(async ({ page }) => {
        // Seeded only when absent: this script runs on every navigation, so writing
        // unconditionally would undo the very choice the reload is meant to check.
        await page.addInitScript(() => {
            if (!localStorage.getItem("lang")) localStorage.setItem("lang", "en");
        });
    });

    test("switches the interface language", async ({ page }) => {
        await page.goto("/");

        const title = page.locator("#news h2").first();

        await expect(title).toHaveText(/Lately/);

        await switchTo(page, "FR");

        await expect(title).toHaveText(/Dernièrement/);
    });

    test("survives a reload", async ({ page }) => {
        await page.goto("/");
        await switchTo(page, "FR");

        await expect(async () => {
            expect(await page.evaluate(() => localStorage.getItem("lang"))).toBe("fr");
        }).toPass({ timeout: 5_000 });

        await page.reload();

        expect(await page.evaluate(() => localStorage.getItem("lang"))).toBe("fr");
        await expect(page.locator("#news h2").first()).toHaveText(/Dernièrement/);
    });

    /** The universal key is the fallback of getContent. When the cycle documented in
     *  CLAUDE.md closes, it becomes the literal string "undefined" and leaks on screen
     *  through the last-resort branch, with nothing failing anywhere. */
    test("never renders the universal key as visible text", async ({ page }) => {
        await page.goto("/");

        const body = await page.locator("body").innerText();

        expect(body).not.toContain("undefined");
    });
});
