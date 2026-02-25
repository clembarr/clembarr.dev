import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';
import rehypeHighlight from 'rehype-highlight';
import { BlogPost, BlogMetadata, TableOfContentsItem, BlogCategory } from '../assets/dataTypes';

/**
 * @function calculateReadingTime Calculate estimated reading time for text
 * @param text - the text content to analyze
 * @returns estimated reading time in minutes
 */
export const calculateReadingTime = (text: string): number => {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
};

/**
 * @function slugify Convert a string to a URL-friendly slug
 * @param text - the text to slugify
 * @returns URL-friendly slug
 */
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^\w\s-]/g, '') // Remove non-word chars
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/-+/g, '-') // Replace multiple - with single -
    .trim();
};

/**
 * @function extractTableOfContents Extract heading structure from Markdown
 * @param markdown - raw Markdown content
 * @returns array of table of contents items
 */
export const extractTableOfContents = (markdown: string): TableOfContentsItem[] => {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const toc: TableOfContentsItem[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = slugify(text);

    toc.push({
      id,
      text,
      level,
    });
  }

  return toc;
};

/**
 * @function parseMarkdown Parse Markdown content to HTML with frontmatter
 * @param markdown - raw Markdown content with frontmatter
 * @returns object with metadata, HTML content, and table of contents
 */
export const parseMarkdown = async (markdown: string): Promise<{
  metadata: any;
  content: string;
  tableOfContents: TableOfContentsItem[];
}> => {
  // Parse frontmatter
  const { data, content } = matter(markdown);

  // Extract table of contents before converting to HTML
  const tableOfContents = extractTableOfContents(content);

  // Convert Markdown to HTML with syntax highlighting
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkHtml, { sanitize: false })
    .use(rehypeHighlight)
    .process(content);

  const htmlContent = processedContent.toString();

  // Calculate reading time
  const readingTime = calculateReadingTime(content);

  return {
    metadata: {
      ...data,
      readingTime,
    },
    content: htmlContent,
    tableOfContents,
  };
};

/**
 * @function parseBlogPost Parse a complete blog post from Markdown files
 * @param slug - URL slug for the post
 * @param markdownByLang - object with Markdown content per language
 * @returns BlogPost object with all data
 */
export const parseBlogPost = async (
  slug: string,
  markdownByLang: { [lang: string]: string }
): Promise<BlogPost> => {
  const contentByLang: { [lang: string]: string } = {};
  const tocByLang: { [lang: string]: TableOfContentsItem[] } = {};
  const rawContentByLang: { [lang: string]: string } = {};

  let metadata: BlogMetadata | null = null;

  // Parse each language version
  for (const [lang, markdown] of Object.entries(markdownByLang)) {
    const parsed = await parseMarkdown(markdown);

    contentByLang[lang] = parsed.content;
    tocByLang[lang] = parsed.tableOfContents;
    rawContentByLang[lang] = markdown;

    // Use first language metadata as base (should be consistent across languages)
    if (!metadata) {
      metadata = {
        title: parsed.metadata.title || {},
        description: parsed.metadata.description || {},
        date: new Date(parsed.metadata.date),
        category: parsed.metadata.category as BlogCategory,
        tags: parsed.metadata.tags || [],
        author: parsed.metadata.author || {
          firstName: 'Clément',
          lastName: 'Barrière',
        },
        coverImage: parsed.metadata.coverImage,
        readingTime: parsed.metadata.readingTime,
        published: parsed.metadata.published !== false,
      };
    }
  }

  if (!metadata) {
    throw new Error('No metadata found in blog post');
  }

  return {
    slug,
    metadata,
    content: contentByLang,
    rawContent: rawContentByLang,
    tableOfContents: tocByLang,
  };
};

/**
 * @function generateBlogUrl Generate URL for a blog post
 * @param slug - blog post slug
 * @returns full URL path
 */
export const generateBlogUrl = (slug: string): string => {
  return `/blog/${slug}`;
};

/**
 * @function formatBlogDate Format date for blog display
 * @param date - Date object
 * @param lang - language code
 * @returns formatted date string
 */
export const formatBlogDate = (date: Date, lang: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return new Intl.DateTimeFormat(lang === '0' ? 'en-US' : 'fr-FR', options).format(date);
};
