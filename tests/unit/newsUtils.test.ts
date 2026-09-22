import { describe, expect, it } from "vitest";
import { getLatestNews } from "../../src/utils/newsUtils";
import { blogPosts } from "../../src/assets/blog";
import { projects } from "../../src/assets/projects";
import { NEWS_EVENT_COUNT } from "../../src/assets/constants";
import { NewsEventKind } from "../../src/assets/dataTypes";

/**
 * The news feed keeps no registry of its own: it derives everything from the content
 * layer at runtime. What can break it is therefore the content — a date fixed by hand, a
 * barrel reordered, a flag forgotten — which is exactly what these assertions watch.
 */
describe("getLatestNews", () => {
    it("sorts strictly from the most recent to the oldest", () => {
        const dates = getLatestNews(100).map((event) => event.source.date.getTime());

        expect(dates).toEqual([...dates].sort((a, b) => b - a));
    });

    /** The barrels claim to be ordered by date and are not. Sorting has to happen in the
     *  feed itself, so a declaration order that disagrees with the dates is not enough
     *  to change what the home page shows. */
    it("does not trust the declaration order of the barrels", () => {
        const declared = [...projects, ...blogPosts].map((source) => source.date.getTime());
        const sorted = getLatestNews(100).map((event) => event.source.date.getTime());

        expect(sorted).toEqual([...declared].sort((a, b) => b - a));
    });

    it("merges projects and posts into a single feed", () => {
        const kinds = new Set(getLatestNews(100).map((event) => event.kind));

        expect(kinds.has(NewsEventKind.PROJECT)).toBe(true);
        expect(kinds.has(NewsEventKind.POST)).toBe(blogPosts.length > 0);
    });

    it("keeps at most the requested number of events", () => {
        expect(getLatestNews(2)).toHaveLength(2);
        expect(getLatestNews(1)).toHaveLength(1);
    });

    it("defaults to the configured event count", () => {
        expect(getLatestNews()).toHaveLength(NEWS_EVENT_COUNT);
    });

    it("leaves out the content flagged out of the feed", () => {
        const excluded = [...projects, ...blogPosts].filter((source) => source.excludeFromNews);
        const shown = getLatestNews(100).map((event) => event.source);

        excluded.forEach((source) => expect(shown).not.toContain(source));
    });

    /** Each card renders a cover, a date and a title: an event reaching the section
     *  without one of those is a hole in the row, not an error anyone would see. */
    it("yields events the news cards can render as is", () => {
        getLatestNews(100).forEach((event) => {
            expect(event.source.title).toBeTruthy();
            expect(event.source.description).toBeTruthy();
            expect(event.source.date).toBeInstanceOf(Date);
            expect(Number.isNaN(event.source.date.getTime())).toBe(false);
        });
    });

    it("discriminates each event on its kind, with no third value", () => {
        getLatestNews(100).forEach((event) => {
            expect(Object.values(NewsEventKind)).toContain(event.kind);
        });
    });

    /** A post card routes to /blog/<slug>, a project card hands its title to the
     *  projects page. Both keys have to be there or the card leads nowhere. */
    it("carries the key each card navigates on", () => {
        getLatestNews(100).forEach((event) => {
            if (event.kind === NewsEventKind.POST) {
                expect(event.source.slug).toBeTruthy();
            } else {
                expect(Object.keys(event.source.title).length).toBeGreaterThan(0);
            }
        });
    });
});
