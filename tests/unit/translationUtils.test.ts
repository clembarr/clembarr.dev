import { describe, expect, it } from "vitest";
import { getContent, tCustom, translate, UNIVERSAL_LANG } from "../../src/utils/translationUtils";

/**
 * getContent is the single door every piece of displayed text goes through, and its
 * fallback chain is what decides whether a missing translation shows the other language
 * or an empty box. The chain is ordered — language, universal key, caller fallback, first
 * available value — and each rung is asserted on its own so a reordering is caught.
 */
describe("getContent", () => {
    it("returns the content of the requested language", () => {
        expect(getContent({ fr: "Bonjour", en: "Hello" }, "fr")).toBe("Bonjour");
        expect(getContent({ fr: "Bonjour", en: "Hello" }, "en")).toBe("Hello");
    });

    it("falls back to the universal key when the language is missing", () => {
        expect(getContent({ [UNIVERSAL_LANG]: "React" }, "fr")).toBe("React");
    });

    it("prefers the language over the universal key", () => {
        expect(getContent({ [UNIVERSAL_LANG]: "CV", fr: "Curriculum" }, "fr")).toBe("Curriculum");
    });

    it("falls back to the caller fallback before the first available value", () => {
        expect(getContent({ de: "Hallo" }, "fr", "fallback")).toBe("fallback");
    });

    it("falls back to the first available value as a last resort", () => {
        expect(getContent({ de: "Hallo" }, "fr")).toBe("Hallo");
    });

    it("returns the fallback when the content is undefined", () => {
        expect(getContent(undefined, "fr", "fallback")).toBe("fallback");
    });

    it("returns an empty string rather than undefined when nothing is found", () => {
        expect(getContent(undefined, "fr")).toBe("");
        expect(getContent({}, "fr")).toBe("");
    });

    /** The import cycle documented in CLAUDE.md turns UNIVERSAL_LANG into undefined,
     *  which reaches getContent as the literal key "undefined". The first-available
     *  fallback then hides the bug on screen — so the key itself is pinned here. */
    it("keeps the universal key at the literal string zero", () => {
        expect(UNIVERSAL_LANG).toBe("0");
    });
});

describe("translate", () => {
    it("is an alias of getContent", () => {
        expect(translate).toBe(getContent);
    });
});

describe("tCustom", () => {
    it("binds a language to a reusable translation function", () => {
        const t = tCustom("en");

        expect(t({ fr: "Bonjour", en: "Hello" })).toBe("Hello");
        expect(t(undefined, "fallback")).toBe("fallback");
    });
});
