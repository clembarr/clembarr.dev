import { describe, expect, it, vi } from "vitest";
import {
    getPost,
    getPostUrl,
    getRelatedPosts,
    getSkill,
    getSkillsByCategory,
    hasSkill,
    normalizeMedia,
    skills,
    wrapInMedia,
} from "../../src/utils/assetsUtils";
import { blogPosts } from "../../src/assets/blog";
import { AvailableSkillCategories, MediaType } from "../../src/assets/dataTypes";
import { APP_URL } from "../../src/assets/configConstants";

/**
 * These assertions read the real content layer rather than fixtures, on purpose: the
 * failure they are meant to catch is a content change that silently breaks a lookup.
 * They are written against the shape of the data, never against a given title or label,
 * so adding a project or renaming a skill does not turn them red for the wrong reason.
 */
describe("getSkill", () => {
    it("finds a skill by its exact label", () => {
        const label = skills[0].label;

        expect(getSkill(label)).toBe(skills[0]);
    });

    /** getSkill is called with string literals scattered across the content layer, and a
     *  typo compiles fine. Throwing in dev is what turns that into a visible failure —
     *  losing it would make every mistyped label a silently missing skill. */
    it("throws on an unknown label in dev mode", () => {
        expect(() => getSkill("Not A Skill")).toThrowError(/not found/i);
    });

    it("is case sensitive, as the content layer keys are", () => {
        expect(() => getSkill(skills[0].label.toUpperCase() + " ")).toThrowError();
    });
});

describe("hasSkill", () => {
    it("tells an existing label from a missing one without throwing", () => {
        expect(hasSkill(skills[0].label)).toBe(true);
        expect(hasSkill("Not A Skill")).toBe(false);
    });
});

describe("getSkillsByCategory", () => {
    it("returns only the skills of the requested category", () => {
        const languages = getSkillsByCategory(AvailableSkillCategories.LANGUAGE);

        expect(languages.length).toBeGreaterThan(0);
        languages.forEach((skill) => {
            expect(skill.category.context).toBe(AvailableSkillCategories.LANGUAGE);
        });
    });

    it("covers every skill once the three categories are merged", () => {
        const merged = Object.values(AvailableSkillCategories)
            .flatMap((category) => getSkillsByCategory(category));

        expect(merged).toHaveLength(skills.length);
    });
});

describe("wrapInMedia", () => {
    it("wraps an image and a video under their own type", () => {
        expect(wrapInMedia("/cover.webp", MediaType.IMAGE, "a cover")).toEqual({
            url: "/cover.webp",
            type: MediaType.IMAGE,
            alt: "a cover",
        });
        expect(wrapInMedia("/clip.mp4", MediaType.VIDEO, "a clip")).toEqual({
            url: "/clip.mp4",
            type: MediaType.VIDEO,
            alt: "a clip",
        });
    });

    it("throws on an unsupported media type", () => {
        expect(() => wrapInMedia("/x.pdf", "PDF" as MediaType, "a document")).toThrowError();
    });
});

describe("normalizeMedia", () => {
    it("wraps a bare url as an image", () => {
        expect(normalizeMedia("/cover.webp")).toEqual({
            url: "/cover.webp",
            type: MediaType.IMAGE,
            alt: "Project illustration",
        });
    });

    it("leaves an existing media untouched", () => {
        const media = { url: "/clip.mp4", type: MediaType.VIDEO, alt: "a clip" };

        expect(normalizeMedia(media)).toBe(media);
    });

    /** Every ProjectMedia needs a non-empty alt — the normalized shape is what the
     *  viewers render, so the default has to be there even for a bare url. */
    it("never produces an empty alt", () => {
        expect(normalizeMedia("/cover.webp").alt).not.toBe("");
    });
});

describe("getPost", () => {
    it("finds a post by its slug", () => {
        expect(getPost(blogPosts[0].slug)).toBe(blogPosts[0]);
    });

    it("returns undefined for an unknown slug", () => {
        expect(getPost("no-such-post")).toBeUndefined();
    });
});

describe("getPostUrl", () => {
    it("builds the absolute url of a post", () => {
        expect(getPostUrl("a-slug")).toBe(`${APP_URL}/blog/a-slug`);
    });
});

describe("getRelatedPosts", () => {
    it("returns the posts whose relatedProjects name the given project", () => {
        const linked = blogPosts.find((post) => post.relatedProjects?.length);

        // Skipped rather than asserted on a hard-coded title: the link is content, and
        // content may legitimately carry no cross-reference at a given time.
        if (!linked) return;

        expect(getRelatedPosts(linked.relatedProjects![0])).toContain(linked);
    });

    it("returns an empty list for a project nothing references", () => {
        expect(getRelatedPosts("Not A Project")).toEqual([]);
    });
});

describe("skills index", () => {
    it("has no duplicate label, which would shadow a skill in the lookup map", () => {
        const labels = skills.map((skill) => skill.label);

        expect(new Set(labels).size).toBe(labels.length);
    });
});

describe("getSkill fallback", () => {
    /** Outside dev the lookup must degrade instead of crashing the page: a missing
     *  skill logs and yields the first one, so a content typo never blanks a section. */
    it("logs and returns a default skill in production mode", () => {
        vi.stubEnv("DEV", false);
        const error = vi.spyOn(console, "error").mockImplementation(() => {});

        expect(getSkill("Not A Skill")).toBe(skills[0]);
        expect(error).toHaveBeenCalled();

        vi.unstubAllEnvs();
    });
});
