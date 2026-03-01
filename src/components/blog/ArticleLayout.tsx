import { useContext } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import DOMPurify from 'dompurify';
import { BlogPost } from '../../assets/dataTypes';
import { UNIVERSAL_LANG } from '../../assets/i18n';
import { ArticlesMotionConstants, author, placeholderMessages } from '../../assets/constants';
import { LangContext } from '../language';
import { formatBlogDate } from '../../utils';

import TableOfContents from './TableOfContents';
import styles from '../../style';

type ArticleLayoutProps = {
  post: BlogPost;
  relatedPosts?: BlogPost[];
};

/**
 * @component ArticleLayout
 * @description Layout wrapper for blog post articles.
 * Renders post.paragraphs[] as JSX instead of raw HTML via dangerouslySetInnerHTML.
 * Use the [[image x]] pattern in content to inline images from post.img[].
 */
const ArticleLayout = ({ post, relatedPosts = [] }: ArticleLayoutProps) => {
  const { currentLang } = useContext(LangContext);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const title = post.title[currentLang] || post.title[UNIVERSAL_LANG];
  const toc = post.tableOfContents?.[currentLang] || post.tableOfContents?.[UNIVERSAL_LANG] || [];
  const tags = post.tags[currentLang] || post.tags[UNIVERSAL_LANG] || [];
  const minRead = placeholderMessages.find((m) => m.context === "blogMinRead")!.content[currentLang];

  /** @function ph Shorthand to look up a message by context in placeholderMessages. */
  const ph = (context: string) =>
    placeholderMessages.find((m) => m.context === context)!.content[currentLang];

  /**
   * @function renderParagraphContent Renders a paragraph's content,
   * replace [[image x]] pattern with corresponding image in post.img[] by inserting <img>
   * @param content - the content string for the current language
   * @returns JSX elements array
   */
  const renderParagraphContent = (content: string) => {
    const parts = content.split(/(\[\[image\s+\d+\]\])/g);

    return parts.map((part, i) => {
      const imageMatch = part.match(/\[\[image\s+(\d+)\]\]/);

      if (imageMatch) {
        const imgIndex = parseInt(imageMatch[1], 10);
        const imgSrc = post.img?.[imgIndex];

        if (imgSrc) {
          return (
            <img
              key={i}
              src={imgSrc}
              alt={`${title}-illustration${imgIndex}`}
              className="rounded-lg shadow-xl my-6 w-full"
              loading="lazy"
            />
          );
        }
        return null;
      }
      if (part.trim()) {
        return (
          <div
            key={i}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(part) }}
          />
        );
      }
      return null;
    });
  };

  return (
    <motion.article
      initial={prefersReducedMotion ? {} : { opacity: ArticlesMotionConstants.MOTION_OPACITY, y: ArticlesMotionConstants.MOTION_Y }}
      animate={{ opacity: ArticlesMotionConstants.ANIMATE_OPACITY, y: ArticlesMotionConstants.ANIMATE_Y }}
      transition={{
        duration: prefersReducedMotion ? ArticlesMotionConstants.REDUCED_MOTION_TRANSITION_DURATION : ArticlesMotionConstants.TRANSITION_DURATION,
        ease: [...ArticlesMotionConstants.TRANSITION_EASE.valueOf().split(' ').map((n) => parseFloat(n))] as [number, number, number, number],
      }}
      className={`
        w-full
        mt-20
      `}
    >
      <header id='article-header'
        className={`mb-12`}
      >
        <div id='back-to-blog-top' className="mb-6">
          <Link to="/blog" className={styles.animatedLink}>
            <span>{ph("blogBackToBlog")}</span>
          </Link>
        </div>

        <h1 id='article-title'
          className={`
            font-primary-bold
            2xl:text-5xl xl:text-4xl lg:text-3xl text-2xl
            text-(--color-quaternary)
            leading-tight
          `}
        > {title} </h1>

        {post.coverImage && (
          <div id='cover-image-container'
            className={`
              w-full 
              h-50
              mb-10
              mt-10
              shadow-md
              overflow-hidden 
              opacity-80
            `}>
            <img id='cover-image'
              src={post.coverImage}
              alt={title}
              className={`
                w-full 
                h-full
                object-cover
              `}
            />
          </div>
        )}

        <div id='article-meta'
          className={`
            ${styles.flexRow}
            ${styles.contentStartX}
            flex-wrap 
            gap-4 
            text-2xs 
            text-(--color-quaternary) 
            opacity-70
          `}
        >
          <div id='author-info-container'
            className={`${styles.flexRow} ${styles.contentStartX} items-center gap-2`}
          >
            <span id='author-info'
              className={`font-secondary-semibold`}
            >
              {author.firstName} {author.lastName}
            </span>
          </div>

          <span id='infos-sep-1'>•</span>

          <time id='date-info'
            dateTime={post.date.toISOString()}
          > {formatBlogDate(post.date, currentLang)} </time>
          
          <span id='infos-sep-2'>•</span>
          
          <span id='reading-time-info'>{post.readingTime} {minRead}</span>
        </div>

        {tags.length > 0 && (
          <div 
            id='tags-container'
            className={`
              ${styles.flexWrap}
              gap-2 
              mt-6
            `}
          >
            {tags.map((tag, i) => (
              <span id={`tag-${i}`}
                key={i}
                className={`${styles.tag} text-3xs opacity-80`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div id='article-container'
        className={`
          lg:grid 
          lg:grid-cols-12 
          lg:gap-8
        `}
      >
        <div id='article-content-container'
          className={`
            lg:col-span-8
          `}
      >
          <div id="article-content"
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
          >
            {post.paragraphs.map((paragraph, idx) => {
              const paragraphContent = paragraph.content[currentLang] || paragraph.content[UNIVERSAL_LANG];
              const headingId = paragraph.context
                ?.toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim();

              return (
                <section key={idx} className="mb-8">
                  {paragraph.context && (
                    <h2
                      id={headingId}
                      className="
                        font-primary-bold
                        2xl:text-3xl xl:text-2xl lg:text-xl text-lg
                        text-(--color-quaternary)
                        mt-8 mb-4
                        tracking-wide
                      "
                    >
                      {paragraph.context}
                    </h2>
                  )}
                  {paragraphContent && renderParagraphContent(paragraphContent)}
                </section>
              );
            })}
          </div>
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
            {ph("blogRelatedArticles")}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedPosts.slice(0, 2).map((relatedPost, i) => (
              <Link
                key={i}
                to={`/blog/${relatedPost.slug}`}
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
                  {relatedPost.title[currentLang] || relatedPost.title[UNIVERSAL_LANG]}
                </h3>
                <p className="text-2xs text-(--color-quaternary) opacity-70 line-clamp-2">
                  {relatedPost.description[currentLang] || relatedPost.description[UNIVERSAL_LANG]}
                </p>
                <span className="text-3xs text-(--color-tertiary) mt-2 inline-block">
                  {ph("blogReadMore")}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Back to Blog Link */}
      <div className="mt-12 pt-8 border-t border-(--color-quinary)">
        <Link to="/blog" className={styles.animatedLink}>
          <span>{ph("blogBackToBlog")}</span>
        </Link>
      </div>
    </motion.article>
  );
};

export default ArticleLayout;
