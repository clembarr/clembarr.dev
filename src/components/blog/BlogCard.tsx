import { useContext, useRef } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { BlogPost } from '../../assets/dataTypes';
import { normalizeMedia, UNIVERSAL_LANG } from '../../utils/assetsUtils';
import { LangContext } from '../language';
import { ThemeContext } from '../theme/ThemeEngine';
import { author, placeholderMessages } from '../../assets/constants';
import { formatBlogDate, handleMouseEnter, handleMouseLeave, handleMouseMove } from '../../utils/utils';
import styles from '../../style';
import Card from '../cards/Card';

type BlogCardProps = {
  post: BlogPost;
  index?: number;
};

/**
 * @component BlogCard
 * @description Card component for displaying blog post preview in listing.
 * Composes the shared Card component (title-description-tags) with
 * blog-specific header (category badge + date) and footer (author + reading time).
 * Uses the same 3D tilt effect as ProjectCard.
 */
const BlogCard = ({ post, index = 0 }: BlogCardProps) => {
  const { currentLang } = useContext(LangContext);
  const { currentTheme } = useContext(ThemeContext);
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const title = post.title[currentLang] || post.title[UNIVERSAL_LANG];
  const description = post.description[currentLang] || post.description[UNIVERSAL_LANG];
  const blogUrl = `/blog/${post.slug}`;
  const tags = post.tags[currentLang] || post.tags[UNIVERSAL_LANG] || [];
  const minRead = placeholderMessages.find((m) => m.context === "blogMinRead")!.content[currentLang];
  const isDark = currentTheme === 'dark';

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : 0.4,
        delay: prefersReducedMotion ? 0 : index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={`${styles.sizeFull}`}
      style={{ perspective: '1000px' }}
    >
      <div
        ref={cardRef}
        className={`
          group
          ${styles.sizeFull}
          ${styles.flexCol}
          ${styles.easeOutTransition}
          rounded-lg
          overflow-hidden
          cursor-pointer
          ${isDark
            ? `
              bg-(--color-secondary)
              border border-(--color-quinary)
              shadow-lg
              hover:border-(--color-tertiary)/30
              hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]
            `
            : `
              bg-(--color-secondary)
              shadow-lg
              hover:shadow-2xl
            `
          }
        `}
        onMouseLeave={() => handleMouseLeave(cardRef.current)}
        onMouseMove={(e) => handleMouseMove(e, cardRef.current)}
        onMouseEnter={() => handleMouseEnter(cardRef.current)}
      >
        <div className={`
          absolute
          top-0 left-0 right-0
          h-0.75
          transition-all duration-300
          bg-linear-to-r from-(--color-tertiary)/0 via-(--color-tertiary) to-(--color-tertiary)/0
          opacity-0 group-hover:opacity-100
        `} />

        <Link to={blogUrl} className={`block h-full ${styles.flexCol}`}>

          {post.coverImage && (
            <div className="w-full h-36 overflow-hidden">
              <img
                src={normalizeMedia(post.coverImage).url}
                alt={title}
                className={`${styles.sizeFull} object-cover`}
                loading="lazy"
              />
            </div>
          )}

          <div className={`
              ${styles.sizeFull}
              p-4
              ${styles.flexCol}
              grow
              space-y-5
            `}
          >
            <div className={`
                ${styles.flexWrap}
                items-center
                justify-between
                gap-2
                text-sm
              `}
            >
              <span
                className={`
                  bg-orange-400
                  ${isDark ? 'text-white' : 'text-(--color-primary)'}
                  px-2.5
                  py-0.5
                  rounded-full
                  text-3xs
                  font-primary-semibold
                  uppercase
                  tracking-wider
                `}
              >
                {post.category}
              </span>
              <time
                dateTime={post.date.toISOString()}
                className="text-3xs text-(--color-quaternary) opacity-70"
              >
                {formatBlogDate(post.date, currentLang)}
              </time>
            </div>

            <Card title={title}
              content={description}
              tags={tags}
              moreTopClasses={`${styles.sizeFull} space-y-3 grow space-y-4`}
              titleProps="text-md leading-snug xl:mt-4 group-hover:text-(--color-tertiary) transition-colors duration-300"
              contentProps="text-xs opacity-80 line-clamp-3 "
              tagsProps="text-2xs "
            />

            <div id='footer-infos'
              className="
                flex
                items-center
                justify-between
                pt-3
                border-t
                border-(--color-quinary)
                opacity-70
              "
            >
              <span className="text-3xs text-(--color-quaternary)">
                {author.firstName} {author.lastName}
              </span>
              <span className="text-3xs text-(--color-quaternary)">
                {post.readingTime} {minRead}
              </span>
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default BlogCard;
