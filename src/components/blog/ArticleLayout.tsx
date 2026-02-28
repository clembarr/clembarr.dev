import { useContext, useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { BlogPost } from '../../assets/dataTypes';
import { LangContext } from '../language';
import { formatBlogDate, generateBlogUrl } from '../../utils/markdown';

import TableOfContents from './TableOfContents';
import styles from '../../style';

type ArticleLayoutProps = {
  post: BlogPost;
  relatedPosts?: BlogPost[];
};

/**
 * @component ArticleLayout
 * @description Layout wrapper for blog post articles
 *
 * Features:
 * - Article metadata (author, date, reading time, category)
 * - Cover image display
 * - Table of contents sidebar
 * - Share button integration
 * - Related posts section
 * - Print-friendly layout
 * - Syntax highlighting for code blocks
 * - Responsive design
 */
const ArticleLayout = ({ post, relatedPosts = [] }: ArticleLayoutProps) => {
  const { currentLang } = useContext(LangContext);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const title = post.metadata.title[currentLang] || post.metadata.title['0'];
  const content = post.content[currentLang] || post.content['0'];
  const toc = post.tableOfContents[currentLang] || post.tableOfContents['0'];

  // Add IDs to headings in content for TOC navigation
  useEffect(() => {
    const articleElement = document.getElementById('article-content');
    if (!articleElement) return;

    const headings = articleElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach((heading) => {
      const text = heading.textContent || '';
      const slug = text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      heading.id = slug;
    });
  }, [content]);

  return (
    <motion.article
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="w-full"
    >
      {/* Article Header */}
      <header className="mb-12">
        {/* Cover Image */}
        {post.metadata.coverImage && (
          <div className="w-full h-96 mb-8 rounded-lg overflow-hidden shadow-2xl">
            <img
              src={post.metadata.coverImage}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Category Badge */}
        <div className="mb-4">
          <span
            className="
              bg-(--color-tertiary)
              text-(--color-primary)
              px-4
              py-2
              rounded-full
              text-2xs
              font-primary-semibold
              uppercase
              tracking-wider
            "
          >
            {post.metadata.category}
          </span>
        </div>

        {/* Title */}
        <h1
          className={`
            font-primary-bold
            2xl:text-5xl xl:text-4xl lg:text-3xl text-2xl
            text-(--color-quaternary)
            mb-6
            leading-tight
          `}
        >
          {title}
        </h1>

        {/* Metadata */}
        <div className="flex items-center flex-wrap gap-4 text-2xs text-(--color-quaternary) opacity-70">
          <div className="flex items-center gap-2">
            <span className="font-secondary-semibold">
              {post.metadata.author.firstName} {post.metadata.author.lastName}
            </span>
          </div>
          <span>•</span>
          <time dateTime={post.metadata.date.toISOString()}>
            {formatBlogDate(post.metadata.date, currentLang)}
          </time>
          <span>•</span>
          <span>{post.metadata.readingTime} min read</span>
        </div>

        {/* Tags */}
        {post.metadata.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.metadata.tags.map((tag, i) => (
              <span
                key={i}
                className="
                  text-3xs
                  text-(--color-tertiary)
                  bg-(--color-secondary)
                  px-3
                  py-1
                  rounded-full
                  font-secondary-regular
                "
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

      </header>

      {/* Article Content with TOC Sidebar */}
      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-8">
          <div
            id="article-content"
            className={`
              ${styles.paragraph}
              prose
              prose-lg
              max-w-none
              text-(--color-quaternary)

              prose-headings:text-(--color-quaternary)
              prose-headings:font-primary-bold
              prose-headings:tracking-wide

              prose-p:text-(--color-quaternary)
              prose-p:leading-relaxed

              prose-a:text-(--color-tertiary)
              prose-a:no-underline
              hover:prose-a:underline

              prose-strong:text-(--color-quaternary)
              prose-strong:font-secondary-semibold

              prose-code:text-(--color-tertiary)
              prose-code:bg-(--color-secondary)
              prose-code:px-1
              prose-code:py-0.5
              prose-code:rounded
              prose-code:text-2xs

              prose-pre:bg-(--color-secondary)
              prose-pre:text-(--color-quaternary)
              prose-pre:border
              prose-pre:border-(--color-quinary)
              prose-pre:rounded-lg
              prose-pre:shadow-lg

              prose-ul:text-(--color-quaternary)
              prose-ol:text-(--color-quaternary)
              prose-li:text-(--color-quaternary)

              prose-blockquote:text-(--color-quaternary)
              prose-blockquote:border-l-4
              prose-blockquote:border-(--color-tertiary)
              prose-blockquote:italic

              prose-img:rounded-lg
              prose-img:shadow-xl
            `}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

        {/* Table of Contents Sidebar */}
        <aside className="lg:col-span-4">
          <TableOfContents items={toc} />
        </aside>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-16 pt-12 border-t border-(--color-quinary)">
          <h2
            className={`
              ${styles.heading2}
              text-(--color-quaternary)
              mb-8
            `}
          >
            Related Articles
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedPosts.slice(0, 2).map((relatedPost, i) => (
              <Link
                key={i}
                to={generateBlogUrl(relatedPost.slug)}
                className="
                  block
                  p-6
                  bg-(--color-secondary)
                  rounded-lg
                  hover:shadow-xl
                  transition-shadow
                  duration-300
                "
              >
                <h3 className="font-primary-semibold text-md text-(--color-quaternary) mb-2">
                  {relatedPost.metadata.title[currentLang] || relatedPost.metadata.title['0']}
                </h3>
                <p className="text-2xs text-(--color-quaternary) opacity-70 line-clamp-2">
                  {relatedPost.metadata.description[currentLang] || relatedPost.metadata.description['0']}
                </p>
                <span className="text-3xs text-(--color-tertiary) mt-2 inline-block">
                  Read more →
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Back to Blog Link */}
      <div className="mt-12 pt-8 border-t border-(--color-quinary)">
        <Link
          to="/blog"
          className="
            inline-flex
            items-center
            gap-2
            text-(--color-tertiary)
            hover:text-(--color-quaternary)
            transition-colors
            duration-200
            font-secondary-semibold
          "
        >
          <span>←</span>
          <span>Back to Blog</span>
        </Link>
      </div>
    </motion.article>
  );
};

export default ArticleLayout;
