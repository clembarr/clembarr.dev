import { BlogPost } from '../assets/dataTypes';
import { parseBlogPost, slugify } from './markdown';

/**
 * @function loadBlogPosts Load all blog posts from Markdown files
 * @returns Promise resolving to array of BlogPost objects
 *
 * Uses Vite's import.meta.glob to dynamically import all .md files
 * from the content/blog directory at build time.
 */
export const loadBlogPosts = async (): Promise<BlogPost[]> => {
  // Use Vite's glob import to get all markdown files
  const markdownFiles = import.meta.glob<string>('../content/blog/*.md', {
    query: '?raw',
    import: 'default',
  });

  const posts: BlogPost[] = [];

  // Process each markdown file
  for (const [path, loader] of Object.entries(markdownFiles)) {
    try {
      const markdown = await loader();

      // Extract slug from filename
      const filename = path.split('/').pop()?.replace('.md', '') || '';
      const slug = slugify(filename);

      // For multilingual support, we'd look for -fr.md, -en.md variants
      // For now, we'll use the same content for all languages
      const markdownByLang = {
        '0': markdown, // English
        'fr': markdown, // French (same content for now)
      };

      const post = await parseBlogPost(slug, markdownByLang);
      posts.push(post);
    } catch (error) {
      console.error(`Error loading blog post from ${path}:`, error);
    }
  }

  // Sort by date (newest first)
  posts.sort((a, b) => b.metadata.date.getTime() - a.metadata.date.getTime());

  return posts;
};

/**
 * @function getBlogPost Get a single blog post by slug
 * @param slug - URL slug of the blog post
 * @param allPosts - Array of all blog posts (optional, will load if not provided)
 * @returns Promise resolving to BlogPost or undefined
 */
export const getBlogPost = async (
  slug: string,
  allPosts?: BlogPost[]
): Promise<BlogPost | undefined> => {
  const posts = allPosts || (await loadBlogPosts());
  return posts.find((post) => post.slug === slug);
};

/**
 * @function getRelatedPosts Get related posts based on category and tags
 * @param post - Current blog post
 * @param allPosts - Array of all blog posts (optional, will load if not provided)
 * @param limit - Maximum number of related posts to return
 * @returns Promise resolving to array of related BlogPost objects
 */
export const getRelatedPosts = async (
  post: BlogPost,
  allPosts?: BlogPost[],
  limit: number = 3
): Promise<BlogPost[]> => {
  const posts = allPosts || (await loadBlogPosts());

  // Calculate relevance score for each post
  const scoredPosts = posts
    .filter((p) => p.slug !== post.slug && p.metadata.published)
    .map((p) => {
      let score = 0;

      // Same category: +10 points
      if (p.metadata.category === post.metadata.category) {
        score += 10;
      }

      // Shared tags: +2 points per tag
      const sharedTags = p.metadata.tags.filter((tag) =>
        post.metadata.tags.includes(tag)
      );
      score += sharedTags.length * 2;

      // Recency bonus (posts within 90 days): +1-5 points
      const daysDiff = Math.abs(
        (p.metadata.date.getTime() - post.metadata.date.getTime()) /
          (1000 * 60 * 60 * 24)
      );
      if (daysDiff < 90) {
        score += Math.max(1, 5 - Math.floor(daysDiff / 18));
      }

      return { post: p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);

  return scoredPosts;
};
