import { useContext } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { BlogPost } from '../../assets/dataTypes';
import { LangContext } from '../language';
import { formatBlogDate, generateBlogUrl } from '../../utils/markdown';
import styles from '../../style';

type BlogCardProps = {
  post: BlogPost;
  index?: number;
};

/**
 * @component BlogCard
 * @description Card component for displaying blog post preview in listing
 *
 * Features:
 * - Multilingual support
 * - Category badge
 * - Tags display
 * - Reading time indicator
 * - Cover image support
 * - Hover animations
 * - Staggered fade-in on mount
 */
const BlogCard = ({ post, index = 0 }: BlogCardProps) => {
  const { currentLang } = useContext(LangContext);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const title = post.metadata.title[currentLang] || post.metadata.title['0'];
  const description = post.metadata.description[currentLang] || post.metadata.description['0'];
  const blogUrl = generateBlogUrl(post.slug);

  // Category colors
  const getCategoryColor = () => {
    switch (post.metadata.category) {
      case 'RESEARCH':
        return 'bg-(--color-tertiary)';
      case 'DEVELOPMENT':
        return 'bg-blue-500';
      case 'TUTORIAL':
        return 'bg-purple-500';
      case 'ALGORITHM':
        return 'bg-orange-500';
      case 'OPINION':
        return 'bg-pink-500';
      default:
        return 'bg-(--color-tertiary)';
    }
  };

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : 0.4,
        delay: prefersReducedMotion ? 0 : index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={prefersReducedMotion ? {} : {
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="h-full"
    >
      <Link to={blogUrl} className="block h-full">
        <article
          className={`
            ${styles.flexCol}
            h-full
            bg-(--color-secondary)
            rounded-lg
            overflow-hidden
            shadow-lg
            hover:shadow-2xl
            transition-shadow
            duration-300
          `}
        >
          {/* Cover Image */}
          {post.metadata.coverImage && (
            <div className="w-full h-48 overflow-hidden">
              <img
                src={post.metadata.coverImage}
                alt={title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-6 flex flex-col flex-grow space-y-4">
            {/* Category Badge & Date */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span
                className={`
                  ${getCategoryColor()}
                  text-(--color-primary)
                  px-3
                  py-1
                  rounded-full
                  text-3xs
                  font-primary-semibold
                  uppercase
                  tracking-wider
                `}
              >
                {post.metadata.category}
              </span>
              <time
                dateTime={post.metadata.date.toISOString()}
                className="text-2xs text-(--color-quaternary) opacity-70"
              >
                {formatBlogDate(post.metadata.date, currentLang)}
              </time>
            </div>

            {/* Title */}
            <h2
              className={`
                ${styles.heading2}
                text-(--color-quaternary)
                line-clamp-2
                mb-0
              `}
            >
              {title}
            </h2>

            {/* Description */}
            <p
              className={`
                ${styles.paragraph}
                text-(--color-quaternary)
                opacity-80
                line-clamp-3
                flex-grow
              `}
            >
              {description}
            </p>

            {/* Tags */}
            {post.metadata.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.metadata.tags.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="
                      text-3xs
                      text-(--color-tertiary)
                      bg-(--color-primary)
                      px-2
                      py-1
                      rounded
                      font-secondary-regular
                    "
                  >
                    #{tag}
                  </span>
                ))}
                {post.metadata.tags.length > 3 && (
                  <span className="text-3xs text-(--color-quaternary) opacity-50">
                    +{post.metadata.tags.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* Footer: Author & Reading Time */}
            <div
              className="
                flex
                items-center
                justify-between
                pt-4
                border-t
                border-(--color-quinary)
                opacity-70
              "
            >
              <span className="text-2xs text-(--color-quaternary)">
                {post.metadata.author.firstName} {post.metadata.author.lastName}
              </span>
              <span className="text-2xs text-(--color-quaternary)">
                {post.metadata.readingTime} min read
              </span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
