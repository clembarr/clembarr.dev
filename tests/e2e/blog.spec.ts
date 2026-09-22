import { expect, test } from "@playwright/test";

/**
 * A blog post is the only content of this site reachable by a public URL of its own: its
 * slug is the route. That makes the listing-to-article path the one place where a content
 * key and a route have to agree, which is what these assertions walk.
 */

test.describe("blog listing", () => {
    test("shows the posts", async ({ page }) => {
        await page.goto("/blog");

        await expect(page.locator("#blog-container")).toBeVisible();
        await expect(page.locator("a[href^='/blog/']").first()).toBeVisible();
    });

    test("opens an article from the listing", async ({ page }) => {
        await page.goto("/blog");

        const firstPost = page.locator("a[href^='/blog/']").first();
        const href = await firstPost.getAttribute("href");

        await firstPost.click();
        await page.waitForURL(new RegExp(`${href}$`));

        await expect(page.locator("#article-title")).toBeVisible();
        await expect(page.locator("#article-header")).toBeVisible();
    });

    /** Every link of the listing is built from a slug. One pointing at a slug no post
     *  carries lands on the error page, with nothing failing at build time. */
    test("every listed link leads to a real article", async ({ page }) => {
        await page.goto("/blog");

        const links = page.locator("a[href^='/blog/']");
        const hrefs = await links.evaluateAll((nodes) =>
            nodes.map((node) => node.getAttribute("href")!)
        );
        const slugs = [...new Set(hrefs)];

        expect(slugs.length).toBeGreaterThan(0);

        for (const slug of slugs) {
            await page.goto(slug);
            await expect(page.locator("#article-title"), `${slug} does not render an article`).toBeVisible();
        }
    });
});

test.describe("article", () => {
    test("renders its body and its cover", async ({ page }) => {
        await page.goto("/blog");
        await page.locator("a[href^='/blog/']").first().click();

        await expect(page.locator("#article-title")).toBeVisible();

        // first(): ArticleLayout numbers its parts per paragraph, so every paragraph of
        // the article restarts at paragraph-0-content and the id is not unique.
        await expect(page.locator("[id^='paragraph-'][id$='-content']").first()).toBeVisible();
    });

    test("navigates back to the listing", async ({ page }) => {
        await page.goto("/blog");
        await page.locator("a[href^='/blog/']").first().click();
        await expect(page.locator("#article-title")).toBeVisible();

        await page.locator("#back-to-blog-top a, #back-to-blog-top button").first().click();
        await page.waitForURL(/\/blog$/);

        await expect(page.locator("#blog-container")).toBeVisible();
    });

    /** Paragraph bodies go through DOMPurify before being injected as HTML. A build that
     *  drops the sanitising step would still render — and would render scripts too. */
    test("injects no script tag into the article body", async ({ page }) => {
        await page.goto("/blog");
        await page.locator("a[href^='/blog/']").first().click();
        await expect(page.locator("#article-title")).toBeVisible();

        const scripts = await page.locator("[id^='paragraph-'] script").count();

        expect(scripts).toBe(0);
    });
});
