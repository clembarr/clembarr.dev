import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
    adjustFontSize,
    darkenHexColor,
    formatBlogDate,
    getActiveBreakpoint,
    getCurrentNavigation,
    getLinkFromTypedLink,
    getLocalLanguage,
    getLocalTheme,
    getMaxPills,
    getNavbarOffset,
    getRelatedPosts,
    isOverflowing,
    lightenHexColor,
    randomNumberBetween,
    shuffle,
    truncateTextIfOverflow,
} from "../../src/utils/utils";
import { BlogCategory, BlogPost, Hyperlink } from "../../src/assets/dataTypes";
import { UNIVERSAL_LANG } from "../../src/utils/translationUtils";

/**
 * @function mockViewportWidth Make window.matchMedia answer as a viewport of the given
 * width would. jsdom ships no media query engine at all, so every breakpoint-aware
 * function reads as "base" until this stands in for it.
 * @param width - the viewport width in pixels to simulate
 */
const mockViewportWidth = (width: number) => {
    vi.stubGlobal("matchMedia", (query: string) => ({
        matches: width >= Number(query.match(/(\d+)px/)?.[1] ?? 0),
        media: query,
    }));
};

/**
 * @function mockBoxSize Give a jsdom element the layout metrics it never computes.
 * @param element - the element to measure-proof
 * @param box - the scroll and client sizes to expose
 */
const mockBoxSize = (
    element: HTMLElement,
    box: { scrollHeight: number; clientHeight: number; scrollWidth: number; clientWidth: number }
) => {
    Object.entries(box).forEach(([property, value]) => {
        Object.defineProperty(element, property, { value, configurable: true });
    });
};

afterEach(() => {
    vi.unstubAllGlobals();
    localStorage.clear();
    document.body.innerHTML = "";
});

describe("randomNumberBetween", () => {
    it("stays within the bounds, both included", () => {
        for (let i = 0; i < 200; i++) {
            const drawn = randomNumberBetween(3, 7);

            expect(drawn).toBeGreaterThanOrEqual(3);
            expect(drawn).toBeLessThanOrEqual(7);
            expect(Number.isInteger(drawn)).toBe(true);
        }
    });

    it("returns the bound itself when both are equal", () => {
        expect(randomNumberBetween(4, 4)).toBe(4);
    });

    /** Math.random() returns [0, 1), so the top bound is only reachable because of the
     *  +1 in the formula — the rounding that makes the range inclusive. */
    it("can reach both ends of the range", () => {
        const drawn = new Set(Array.from({ length: 500 }, () => randomNumberBetween(0, 1)));

        expect(drawn).toEqual(new Set([0, 1]));
    });
});

describe("shuffle", () => {
    it("keeps every element exactly once", () => {
        const shuffled = shuffle([1, 2, 3, 4, 5, 6, 7, 8]);

        expect([...shuffled].sort((a, b) => a - b)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    });

    /** Fisher-Yates here shuffles in place and returns the same reference. Callers that
     *  assume a copy would silently reorder the array they passed — worth pinning. */
    it("shuffles in place and returns the same array", () => {
        const array = [1, 2, 3];

        expect(shuffle(array)).toBe(array);
    });

    it("handles the empty and single element cases", () => {
        expect(shuffle([])).toEqual([]);
        expect(shuffle(["only"])).toEqual(["only"]);
    });
});

describe("getLinkFromTypedLink", () => {
    it("returns a plain string url as is", () => {
        expect(getLinkFromTypedLink("/projects")).toBe("/projects");
    });

    it("reads a multilingual link in the requested language", () => {
        const link = { fr: "/fr/cv.pdf", en: "/en/cv.pdf" };

        expect(getLinkFromTypedLink(link, "en")).toBe("/en/cv.pdf");
    });

    it("falls back to the universal key when the language is missing", () => {
        const link = { [UNIVERSAL_LANG]: "/cv.pdf" };

        expect(getLinkFromTypedLink(link, "fr")).toBe("/cv.pdf");
        expect(getLinkFromTypedLink(link)).toBe("/cv.pdf");
    });

    it("unwraps a nested hyperlink down to its url", () => {
        const nested = {
            content: { [UNIVERSAL_LANG]: "CV" },
            link: {
                content: { [UNIVERSAL_LANG]: "CV" },
                link: { [UNIVERSAL_LANG]: "/cv.pdf" },
            },
        } as Hyperlink;

        expect(getLinkFromTypedLink(nested)).toBe("/cv.pdf");
    });
});

describe("getCurrentNavigation", () => {
    beforeEach(() => {
        window.history.pushState({}, "", "/");
    });

    it("matches the anchor of the current hash", () => {
        window.history.pushState({}, "", "/#career");

        expect(getCurrentNavigation()).toBe("/#career");
    });

    it("matches a page route by its pathname", () => {
        window.history.pushState({}, "", "/blog");

        expect(getCurrentNavigation()).toBe("/blog");
    });

    /** A blog post lives under /blog/<slug>: the navbar has to keep highlighting Blog
     *  rather than falling back to the first link of the route. */
    it("keeps the parent route highlighted on a nested path", () => {
        window.history.pushState({}, "", "/blog/some-article");

        expect(getCurrentNavigation()).toBe("/blog");
    });

    it("falls back to the first link of the route when nothing matches", () => {
        window.history.pushState({}, "", "/");

        expect(getCurrentNavigation()).toBeTruthy();
    });
});

describe("getLocalTheme", () => {
    it("defaults to light when nothing is stored", () => {
        expect(getLocalTheme()).toBe("light");
    });

    it("reads the stored theme, lowercased", () => {
        localStorage.setItem("theme", "DARK");

        expect(getLocalTheme()).toBe("dark");
    });
});

describe("getLocalLanguage", () => {
    it("prefers the stored language over the browser one", () => {
        localStorage.setItem("lang", "EN");

        expect(getLocalLanguage()).toBe("en");
    });

    it("falls back to the browser language, reduced to its two letter code", () => {
        vi.stubGlobal("navigator", { language: "fr-FR" });

        expect(getLocalLanguage()).toBe("fr");
    });
});

describe("isOverflowing", () => {
    it("detects an overflow on either axis", () => {
        const element = document.createElement("div");

        mockBoxSize(element, { scrollHeight: 200, clientHeight: 100, scrollWidth: 0, clientWidth: 0 });
        expect(isOverflowing(element)).toBe(true);

        const wide = document.createElement("div");

        mockBoxSize(wide, { scrollHeight: 0, clientHeight: 0, scrollWidth: 200, clientWidth: 100 });
        expect(isOverflowing(wide)).toBe(true);
    });

    it("returns false when the content fits", () => {
        const element = document.createElement("div");

        mockBoxSize(element, { scrollHeight: 50, clientHeight: 100, scrollWidth: 50, clientWidth: 100 });
        expect(isOverflowing(element)).toBe(false);
    });

    it("warns and returns false rather than throwing on a null element", () => {
        const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

        expect(isOverflowing(null as unknown as HTMLElement)).toBe(false);
        expect(warn).toHaveBeenCalled();
    });
});

describe("truncateTextIfOverflow", () => {
    /** One character of text is one pixel tall here: the container then overflows for
     *  anything longer than its 10 pixel box, which is enough to exercise the loop. */
    const makeShrinkingBox = () => {
        const element = document.createElement("div");

        Object.defineProperty(element, "scrollHeight", {
            get: () => (element.textContent ?? "").length,
        });
        Object.defineProperty(element, "clientHeight", { value: 10 });
        Object.defineProperty(element, "scrollWidth", { value: 0 });
        Object.defineProperty(element, "clientWidth", { value: 0 });

        return element;
    };

    it("trims word by word until the text fits", () => {
        const element = makeShrinkingBox();

        element.textContent = "one two three four five six";
        truncateTextIfOverflow(element, "one two three four five six");

        expect(element.textContent).toBe("one two...");
        expect(element.scrollHeight).toBeLessThanOrEqual(element.clientHeight);
    });

    it("leaves a text that already fits untouched", () => {
        const element = makeShrinkingBox();

        element.textContent = "short";
        truncateTextIfOverflow(element, "short");

        expect(element.textContent).toBe("short");
    });

    /** Without the length guard the loop would spin forever on a text it cannot cut
     *  down any further — the container never stops overflowing on its own. */
    it("gives up instead of looping on a text it cannot trim", () => {
        const element = document.createElement("div");

        mockBoxSize(element, { scrollHeight: 200, clientHeight: 100, scrollWidth: 0, clientWidth: 0 });

        expect(() => truncateTextIfOverflow(element, "")).not.toThrow();
    });
});

describe("getNavbarOffset", () => {
    it("returns zero when there is no navbar in the document", () => {
        expect(getNavbarOffset()).toBe(0);
    });

    it("returns the navbar height when it is mounted", () => {
        const navbar = document.createElement("div");

        navbar.id = "navbar";
        Object.defineProperty(navbar, "clientHeight", { value: 64 });
        document.body.appendChild(navbar);

        expect(getNavbarOffset()).toBe(64);
    });
});

describe("darkenHexColor", () => {
    it("subtracts the percentage from every channel", () => {
        expect(darkenHexColor("#ffffff", 10)).toBe("#e5e5e5");
    });

    it("clamps to black instead of wrapping around", () => {
        expect(darkenHexColor("#000000", 50)).toBe("#000000");
    });

    it("keeps the color untouched at zero percent", () => {
        expect(darkenHexColor("#479561", 0)).toBe("#479561");
    });
});

describe("lightenHexColor", () => {
    it("adds the percentage to every channel", () => {
        expect(lightenHexColor("#000000", 10)).toBe("#1a1a1a");
    });

    it("clamps to white instead of wrapping around", () => {
        expect(lightenHexColor("#ffffff", 50)).toBe("#ffffff");
    });

    it("undoes a darkening of the same amount, away from the bounds", () => {
        expect(lightenHexColor(darkenHexColor("#808080", 10), 10)).toBe("#808080");
    });
});

describe("getActiveBreakpoint", () => {
    it.each([
        [1600, "2xl", 5],
        [1280, "xl", 4],
        [1024, "lg", 3],
        [768, "md", 2],
        [640, "sm", 1],
        [500, "ss", 0],
        [400, "xs", -1],
        [320, "base", -2],
    ])("reads %ipx as %s", (width, name, rank) => {
        mockViewportWidth(width);

        expect(getActiveBreakpoint("string")).toBe(name);
        expect(getActiveBreakpoint("number")).toBe(rank);
    });

    /** The px values mirror the @theme block of index.css. A breakpoint moved on one
     *  side only makes the JS and the CSS disagree without any error. */
    it("switches exactly on the boundary, not one pixel before", () => {
        mockViewportWidth(1023);
        expect(getActiveBreakpoint("string")).toBe("md");

        mockViewportWidth(1024);
        expect(getActiveBreakpoint("string")).toBe("lg");
    });
});

describe("getMaxPills", () => {
    it.each([
        [1600, 3],
        [1280, 3],
        [1024, 2],
        [768, 2],
        [640, 0],
        [320, 0],
    ])("shows %i px worth of pills as %i", (width, expected) => {
        mockViewportWidth(width);

        expect(getMaxPills()).toBe(expected);
    });
});

describe("adjustFontSize", () => {
    it("warns and returns rather than throwing on a null container", () => {
        const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

        expect(() => adjustFontSize(null as unknown as HTMLElement, "min")).not.toThrow();
        expect(warn).toHaveBeenCalled();
    });
});

describe("formatBlogDate", () => {
    const date = new Date(2025, 0, 15);

    it("formats in French for the fr locale", () => {
        expect(formatBlogDate(date, "fr")).toBe("15 janvier 2025");
    });

    it("formats in English for the en locale", () => {
        expect(formatBlogDate(date, "en")).toBe("January 15, 2025");
    });

    /** Universal content is language agnostic, and the site renders it in English. */
    it("formats the universal key in English", () => {
        expect(formatBlogDate(date, UNIVERSAL_LANG)).toBe("January 15, 2025");
    });

    it("falls back to French for an unknown locale", () => {
        expect(formatBlogDate(date, "de")).toBe("15 janvier 2025");
    });
});

/**
 * @function makePost Build the smallest blog post the scoring function reads.
 * @param overrides - the fields the case under test cares about
 * @returns a blog post usable by getRelatedPosts
 */
const makePost = (overrides: Partial<BlogPost>): BlogPost => ({
    slug: "a-post",
    title: { [UNIVERSAL_LANG]: "A post" },
    description: { [UNIVERSAL_LANG]: "A description" },
    date: new Date(2025, 0, 1),
    category: BlogCategory.RESEARCH,
    tags: { [UNIVERSAL_LANG]: [] },
    ...overrides,
} as BlogPost);

describe("getRelatedPosts", () => {
    const current = makePost({ slug: "current", category: BlogCategory.RESEARCH });

    it("never returns the post itself", () => {
        const related = getRelatedPosts(current, [current, makePost({ slug: "other" })]);

        expect(related.map((post) => post.slug)).not.toContain("current");
    });

    it("ranks a post of the same category above an unrelated one", () => {
        const sameCategory = makePost({
            slug: "same-category",
            category: BlogCategory.RESEARCH,
            date: new Date(2024, 0, 1),
        });
        const otherCategory = makePost({
            slug: "other-category",
            category: BlogCategory.TUTORIAL,
            date: new Date(2024, 0, 1),
        });

        const related = getRelatedPosts(current, [current, otherCategory, sameCategory]);

        expect(related[0].slug).toBe("same-category");
    });

    it("ranks shared tags above recency alone", () => {
        const tagged = makePost({
            slug: "tagged",
            category: BlogCategory.TUTORIAL,
            tags: { [UNIVERSAL_LANG]: ["rust", "bench", "alife"] },
            date: new Date(2020, 0, 1),
        });
        const recent = makePost({
            slug: "recent",
            category: BlogCategory.TUTORIAL,
            date: new Date(2025, 0, 2),
        });
        const subject = makePost({
            slug: "subject",
            tags: { [UNIVERSAL_LANG]: ["rust", "bench", "alife"] },
        });

        const related = getRelatedPosts(subject, [tagged, recent]);

        expect(related[0].slug).toBe("tagged");
    });

    it("honours the limit", () => {
        const posts = Array.from({ length: 6 }, (_, i) => makePost({ slug: `post-${i}` }));

        expect(getRelatedPosts(current, posts, 2)).toHaveLength(2);
        expect(getRelatedPosts(current, posts)).toHaveLength(3);
    });

    it("returns an empty list when there is nothing else to relate to", () => {
        expect(getRelatedPosts(current, [current])).toEqual([]);
    });
});
