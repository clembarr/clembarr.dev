/**
 * @fileoverview News feed utilities
 * Derives the home page news feed from the content layer, without any dedicated registry.
 * This file imports the projects barrel, which imports assetsUtils: it must therefore
 * never be imported by a file of src/assets/, or the import cycle closes.
 */

import { projects } from "../assets/projects";
import { blogPosts } from "../assets/blog";
import { NEWS_EVENT_COUNT } from "../assets/constants";
import { NewsEvent, NewsEventKind } from "../assets/dataTypes";

/**
 * @function getLatestNews Build the news feed by merging projects and blog posts, most
 * recent first. Entries flagged `excludeFromNews` are left out. The declaration order of
 * the barrels is not trusted: it claims to be sorted by date and is not. Content dated in
 * the future is kept.
 * @param count - how many events to keep, defaults to NEWS_EVENT_COUNT
 * @returns the count most recent events, newest first
 */
export const getLatestNews = (count: number = NEWS_EVENT_COUNT): NewsEvent[] => {
    const events: NewsEvent[] = [
        ...projects.map((source): NewsEvent => ({ kind: NewsEventKind.PROJECT, source })),
        ...blogPosts.map((source): NewsEvent => ({ kind: NewsEventKind.POST, source })),
    ];

    return events
        .filter((event) => !event.source.excludeFromNews)
        .sort((a, b) => b.source.date.getTime() - a.source.date.getTime())
        .slice(0, count);
}
