/**
 * @fileoverview Blog posts barrel export
 * Centralizes all blog post definitions for synchronous access
 */

import { BlogPost } from '../dataTypes';
import { mctsPathfinding } from './mcts-pathfinding';

/**
 * All blog posts - ordered by date (most recent first)
 */
export const blogPosts: BlogPost[] = [
  mctsPathfinding,
];

// Individual exports for direct access
export { mctsPathfinding };

/**
 * EMPTY BLOG POST TEMPLATE:
 * -------------------------
 *
  {
    slug: "my-article-slug",
    title: {
      "0": "",
      fr: "",
    },
    description: {
      "0": "",
      fr: "",
    },
    tags: {
      "0": [],
    },
    img: [],
    date: new Date(2025, 0),
    category: BlogCategory.DEVELOPMENT,
    readingTime: 5,
    paragraphs: [
      {
        context: "Section Title",
        content: {
          "0": "",
          fr: "",
        },
      },
    ],
    tableOfContents: {
      "0": [
        { id: "section-title", text: "Section Title", level: 2 },
      ],
    },
  },
 */
