import { expect, test } from "@playwright/test";

/**
 * Routes and navbar anchors are wired by string, not by type: an `id` on a section and a
 * `link` in navLinks have to agree, and nothing in the build checks that they do. These
 * assertions walk the links the navbar actually renders rather than a list written here,
 * so a link added to the content layer is covered the day it appears.
 */

test.describe("routes", () => {
    test.skip(({ viewport }) => (viewport?.width ?? 0) < 1024, "the desktop navbar only");

    test("serves the home page with its sections", async ({ page }) => {
        await page.goto("/");

        await expect(page.locator("#navbar")).toBeVisible();
        await expect(page.locator("#news")).toBeVisible();
    });

    test("serves the projects listing", async ({ page }) => {
        await page.goto("/projects");

        await expect(page.locator("#projects-listing")).toBeVisible();
        await expect(page.locator("#projects-container")).toBeVisible();
    });

    test("serves the blog listing", async ({ page }) => {
        await page.goto("/blog");

        await expect(page.locator("#blog-container")).toBeVisible();
    });

    /** No public/404.html is deployed, so a cold deep link is served by the SPA fallback
     *  in dev and by GitHub Pages in production. The in-app route is what is checked. */
    test("renders the error page on an unknown route", async ({ page }) => {
        await page.goto("/this-route-does-not-exist");

        await expect(page.locator("#navbar")).toBeVisible();
        await expect(page.locator("#projects-listing")).toHaveCount(0);
    });
});

test.describe("navbar", () => {
    test.skip(({ viewport }) => (viewport?.width ?? 0) < 1024, "the desktop navbar only");

    test("every internal link it renders leads somewhere", async ({ page }) => {
        await page.goto("/");

        const links = page.locator("#navbar-items a[id^='page-link-'], #navbar-items a[id^='page-navigation-link-']");
        const count = await links.count();

        expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {
            const href = await links.nth(i).getAttribute("href");

            expect(href, `link ${i} of the navbar has no href`).toBeTruthy();
            expect(href!.startsWith("/") || href!.startsWith("#")).toBe(true);
        }
    });

    /** An anchor link points at the id of a section. Renaming one side only compiles
     *  fine and scrolls nowhere, which is the failure mode this covers. */
    test("every anchor it renders targets a section that exists", async ({ page }) => {
        await page.goto("/");

        const anchors = page.locator("#navbar-items a[href*='#']");
        const count = await anchors.count();

        for (let i = 0; i < count; i++) {
            const href = await anchors.nth(i).getAttribute("href");
            const anchor = href?.split("#")[1];

            if (!anchor) continue;

            await expect(
                page.locator(`#${anchor}`),
                `the navbar points at #${anchor}, which no section carries`
            ).toHaveCount(1);
        }
    });

    test("navigates to the projects page and back home", async ({ page }) => {
        await page.goto("/");

        await page.locator("#navbar-items a[href='/projects']").first().click();
        await page.waitForURL(/\/projects/);
        await expect(page.locator("#projects-listing")).toBeVisible();

        await page.locator("#navbar-items a[href='/']").first().click();
        await page.waitForURL(/\/$/);
        await expect(page.locator("#news")).toBeVisible();
    });
});

test.describe("mobile navbar", () => {
    test.skip(({ viewport }) => (viewport?.width ?? 0) >= 1024, "the burger menu only");

    test("opens the burger menu and navigates from it", async ({ page }) => {
        await page.goto("/");

        await page.locator("#burger").click();

        // The menu div itself is a zero-sized flex box: its list is absolutely
        // positioned, so the links are what actually shows on screen.
        const menuLinks = page.locator("#burger-menu ul");

        await expect(menuLinks).toBeVisible();
        await menuLinks.locator("a[href='/projects']").first().click();

        await page.waitForURL(/\/projects/);
        await expect(page.locator("#projects-listing")).toBeVisible();
    });
});
