/**
 * @fileoverview Blog posts barrel export
 * Centralizes all blog post definitions for synchronous access
 */

import { BlogPost } from '../dataTypes';
import { eewLangBiases } from './eew-lang-biases';

/**
 * All blog posts - ordered by date (most recent first)
 */
export const blogPosts: BlogPost[] = [
  eewLangBiases
];

// Individual exports for direct access
export { 
  eewLangBiases 
};
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
        title: {
          "0": "Section Title",
          fr: "Titre de section",
        },
        content: {
          "0": "",
          fr: "",
        },
      },
    ],
    tableOfContents: true,
  },
 */
