import { useContext, useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import DOMPurify from 'dompurify';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';  // base for TS, JSX, TSX
import 'prismjs/components/prism-typescript';   // depends on javascript
import 'prismjs/components/prism-jsx';          // depends on markup (core) + javascript
import 'prismjs/components/prism-tsx';          // depends on typescript + jsx
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-sql';
import { BlogPost, MediaType } from '../../assets/dataTypes';
import { normalizeMedia, UNIVERSAL_LANG } from '../../utils/assetsUtils';
import { ArticlesMotionConstants, author, placeholderMessages } from '../../assets/constants';
import { LangContext } from '../language';
import { formatBlogDate } from '../../utils/utils';

import TableOfContents from './TableOfContents';
import styles from '../../style';
import { ThemeContext } from '../theme/ThemeEngine';

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
  const { currentTheme } = useContext(ThemeContext);  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const title = post.title[currentLang] || post.title[UNIVERSAL_LANG];
  /** Auto-generate TOC from paragraph titles when tableOfContents is true */
  const toc = post.tableOfContents
    ? post.paragraphs
        .filter((p) => p.title)
        .map((p) => ({
          id: (p.title![UNIVERSAL_LANG] ?? Object.values(p.title!)[0])
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim(),
          text: p.title![currentLang] || p.title![UNIVERSAL_LANG],
          level: 2,
        }))
    : [];
  const tags = post.tags[currentLang] || post.tags[UNIVERSAL_LANG] || [];
  const minRead = placeholderMessages.find((m) => m.context === "blogMinRead")!.content[currentLang];

  /**
   * Highlight all <pre><code class="language-xxx"> blocks with Prism.js, then post-process:
   * 1. Split .token.keyword into declaration (blue) vs control-flow (magenta)
   * 2. Add indentation guides limited to the leading-whitespace region of each line
   */
  useEffect(() => {
    const TAB_SIZE = 2;
    const GUIDE_COLOR = 'rgba(255,255,255,0.06)';

    const controlFlowKeywords = new Set([
      'if', 'else', 'return', 'for', 'while', 'do', 'switch', 'case',
      'break', 'continue', 'throw', 'try', 'catch', 'finally',
      'yield', 'await', 'import', 'from', 'export', 'default', 'as',
      'in', 'of', 'new', 'delete', 'typeof', 'instanceof', 'void',
    ]);

    document.querySelectorAll('#article-content pre code').forEach((el) => {
      const lang = el.className.match(/language-(\w+)/)?.[1];
      const grammar = lang ? Prism.languages[lang] : undefined;

      /** Mark parent <pre> as not-prose so Typography doesn't interfere */
      const pre = el.closest('pre');
      if (pre) {
        pre.classList.add('not-prose');
        if (lang) pre.classList.add(`language-${lang}`);
      }

      /** Highlight with Prism if grammar is available */
      if (grammar) {
        el.innerHTML = Prism.highlight(el.textContent ?? '', grammar, lang!);
      }

      /** Post-process: split keywords into declaration vs control-flow */
      el.querySelectorAll('.token.keyword').forEach((kw) => {
        const word = kw.textContent?.trim() ?? '';
        if (controlFlowKeywords.has(word)) {
          kw.classList.add('control-flow');
        }
      });

      /** Add indentation guides per line */
      const codeEl = el as HTMLElement;
      const lines = codeEl.innerHTML.split('\n');
      codeEl.innerHTML = lines.map((line) => {
        const textContent = line.replace(/<[^>]*>/g, '');
        const leadingSpaces = textContent.match(/^( *)/)?.[1].length ?? 0;
        if (leadingSpaces >= TAB_SIZE) {
          return `<span class="code-line code-line-indent" style="background-image:repeating-linear-gradient(90deg,${GUIDE_COLOR} 0px,${GUIDE_COLOR} 1px,transparent 1px,transparent ${TAB_SIZE}ch);background-size:${leadingSpaces}ch 100%;background-repeat:no-repeat">${line}</span>`;
        }
        return `<span class="code-line">${line}</span>`;
      }).join('\n');
    });
  }, [post, currentLang]);

  /** @function ph Shorthand to look up a message by context in placeholderMessages. */
  const ph = (context: string) =>
    placeholderMessages.find((m) => m.context === context)!.content[currentLang];

  /**
   * @function parseInlineMarkdown Converts pseudo-markdown inline syntax to HTML.
   * Only transforms text nodes — existing HTML tags are preserved as-is.
   * Supported: **bold**, *italic*, _underline_, ==highlight==
   */
  const parseInlineMarkdown = (html: string): string =>
    html
      .split(/(<[^>]+>)/g)
      .map((segment, i) => {
        if (i % 2 === 1) return segment; // HTML tag → preserve as-is
        return segment
          .replace(/\*\*([\s\S]+?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*([^*]+)\*/g, '<em>$1</em>')
          .replace(/_([^_]+)_/g, '<u>$1</u>')
          .replace(/==([^=]+)==/g, '<mark class="highlight">$1</mark>');
      })
      .join('');

  /**
   * @function renderParagraphContent Renders a paragraph's content,
   * replacing [[image x]] or [[image x | w=y pos]] patterns with corresponding
   * media (image or video) from post.img[]. Optional params after `|` control
   * width and positioning:
   * - w=<value> : applied as inline style width (e.g. w=1/2, w=80px, w=100%)
   * - positioning keyword (center, left, right) : wraps the media in a flex
   *   container with the corresponding justify- class
   * Without params, defaults to w-full with no wrapper.
   * Videos are rendered as autoplaying muted looping elements, using the
   * ProjectMedia poster field if available.
   * @param content - the content string for the current language
   * @returns JSX elements array
   */
  const renderParagraphContent = (content: string) => {
    const imagePattern = /(\[\[image\s+\d+(?:\s*\|[^\]]*)?\]\])/g;
    const parts = content.split(imagePattern);

    return parts.map((part, i) => {
      const imageMatch = part.match(/\[\[image\s+(\d+)(?:\s*\|\s*([^\]]*))?\]\]/);

      if (imageMatch) {
        const imgIndex = parseInt(imageMatch[1], 10);
        const imgSrc = post.img?.[imgIndex];
        if (!imgSrc) return null;

        const media = normalizeMedia(imgSrc);

        /** Parse optional params: w=<CSS value> and positioning keyword */
        const rawParams = imageMatch[2]?.trim() ?? '';
        const widthMatch = rawParams.match(/w=(\S+)/);
        const widthStyle = widthMatch ? widthMatch[1] : undefined;

        const posMap: Record<string, string> = {
          center: 'justify-center',
          left: 'justify-start',
          right: 'justify-end',
        };
        const posKey = Object.keys(posMap).find((k) => rawParams.includes(k));

        const mediaClassName = `
          rounded-lg
          shadow-lg
          my-6
          ${widthStyle ? '' : 'w-full'}
          max-w-4xl
          object-cover
        `;
        const mediaStyle = widthStyle ? { width: widthStyle } : undefined;

        const mediaEl = media.type === MediaType.VIDEO ? (
          <video id={`media-${imgIndex}`}
            key={i}
            src={media.url}
            poster={media.poster}
            autoPlay
            muted
            loop
            playsInline
            className={mediaClassName}
            style={mediaStyle}
          />
        ) : (
          <img id={`media-${imgIndex}`}
            key={i}
            src={media.url}
            alt={media.alt ?? `${title}-illustration${imgIndex}`}
            className={mediaClassName}
            style={mediaStyle}
            loading="lazy"
          />
        );

        if (posKey) {
          return (
            <div key={i} className={`flex ${posMap[posKey]}`}>
              {mediaEl}
            </div>
          );
        }
        return mediaEl;
      }
      if (part.trim()) {
        return (
          <div id={`paragraph-${i}-content`}
            key={i}
            className={`
              leading-relaxed
            `}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(parseInlineMarkdown(part)) }}
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
        className={`mb-8`}
      >
        <div id='back-to-blog-top' className="mb-6">
          <Link to="/blog" className={styles.animatedLink}>
            <span>{ph("blogBackToBlog")}</span>
          </Link>
        </div>

        <h1 id='article-title'
          className={`
            font-primary-bold
            2xl:text-4xl xl:text-4xl lg:text-3xl text-2xl
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
              src={normalizeMedia(post.coverImage).url}
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
          <div id='tags-container'
            className={`
              ${styles.flexWrap}
              gap-2 
              mt-6
            `}
          >
            {tags.map((tag: string, i: number) => {
              if (i <= 3) {
                return (
                  <span id={`tag-${i}`}
                    key={i}
                    className={`
                      ${styles.tag} 
                      text-3xs 
                      opacity-80
                      ${currentTheme === 'dark'
                        ? 'bg-(--color-tertiary)/10 text-(--color-tertiary) border border-(--color-tertiary)/30 hover:bg-(--color-tertiary)/20'
                        : 'bg-(--color-tertiary)/10 text-(--color-tertiary) border border-(--color-tertiary)/20 hover:bg-(--color-tertiary)/15'
                      }
                    `}
                  > {tag} </span>
                );
              }
            })}
          </div>
        )}
      </header>

      <div id='article-container'
        className={`
          ${toc.length > 0 ? 'lg:grid lg:grid-cols-12 lg:gap-8' : ''}
          mt-15
        `}
      >
        <div id='article-content-container'
          className={`
            ${toc.length > 0 ? 'lg:col-span-8' : 'w-full'}
          `}
      >
          <div id="article-content"
            className={`
              font-primary-regular
              text-2xs md:text-md xl:text-lg 2xl:text-md
              tracking-wide
              text-wrap
              whitespace-pre-line
              prose
              prose-lg
              max-w-none
              text-(--color-quaternary)

              prose-headings:text-(--color-quaternary)
              prose-headings:font-primary-bold
              prose-headings:tracking-wide

              prose-h3:mt-8
              prose-h3:mb-4
              prose-h3:text-md

              prose-p:text-(--color-quaternary)
              prose-p:leading-relaxed

              prose-a:text-(--color-tertiary)
              prose-a:no-underline
              hover:prose-a:underline

              prose-strong:text-(--color-quaternary)
              prose-strong:font-secondary-semibold

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
              const paragraphTitle = paragraph.title?.[currentLang] || paragraph.title?.[UNIVERSAL_LANG];
              const headingId = (paragraph.title?.[UNIVERSAL_LANG] ?? paragraphTitle)
                ?.toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim();

              return (
                <section id={`paragraph-${idx}`}
                  key={idx}
                  className={`mb-8`}
                >
                  {paragraphTitle && (
                    <h2 id={headingId}
                      className="
                        font-primary-bold
                        2xl:text-lg
                        text-(--color-quaternary)
                        mt-8 mb-4
                        tracking-wide
                      "
                    > {paragraphTitle} </h2>
                  )}
                  {paragraphContent && renderParagraphContent(paragraphContent)}
                </section>
              );
            })}
          </div>
        </div>

        {toc.length > 0 && (
          <aside id='table-of-content-container'
            className={`
              lg:col-span-4
            `}
          >
            <TableOfContents items={toc} />
          </aside>
        )}
      </div>

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
      
      <div className="mt-12 pt-8 border-t border-(--color-quinary)">
        <Link to="/blog" className={styles.animatedLink}>
          <span>{ph("blogBackToBlog")}</span>
        </Link>
      </div>
    </motion.article>
  );
};

export default ArticleLayout;
