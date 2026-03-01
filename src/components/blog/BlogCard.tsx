import { useContext } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { BlogPost } from '../../assets/dataTypes';
import { UNIVERSAL_LANG } from '../../assets/i18n';
import { LangContext } from '../language';
import { author, placeholderMessages } from '../../assets/constants';
import { formatBlogDate } from '../../utils';
import styles from '../../style';
import { ThemeContext } from '../theme/ThemeEngine';

type BlogCardProps = {
  post: BlogPost;
  index?: number;
};

/**
 * @component BlogCard
 * @description Card component for displaying blog post preview in listing
 */
const BlogCard = ({ post, index = 0 }: BlogCardProps) => {
  const { currentLang } = useContext(LangContext);
  const { currentTheme } = useContext(ThemeContext);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const title = post.title[currentLang] || post.title[UNIVERSAL_LANG];
  const description = post.description[currentLang] || post.description[UNIVERSAL_LANG];
  const blogUrl = `/blog/${post.slug}`;
  const tags = post.tags[currentLang] || post.tags[UNIVERSAL_LANG] || [];
  const minRead = placeholderMessages.find((m) => m.context === "blogMinRead")!.content[currentLang];

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
          {post.coverImage && (
            <div className="w-full h-36 overflow-hidden">
              <img
                src={post.coverImage}
                alt={title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          )}

          <div className={`
              p-4 
              ${styles.flexCol} 
              grow 
              space-y-5
            `}
          >
            <div className={`
                flex 
                items-center 
                justify-between 
                gap-2 
                flex-wrap
                text-sm
              `}
            >
              <span
                className={`
                  bg-orange-400
                  ${currentTheme === 'dark' ? 'text-white' : 'text-(--color-primary)'}
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

            <h2
              className="
                font-primary-bold
                text-md
                leading-snug
                text-(--color-quaternary)
                line-clamp-2
              "
            > {title} </h2>

            <p
              className="
                font-primary-regular
                text-xs
                leading-relaxed
                text-(--color-quaternary)
                opacity-80
                line-clamp-3
                grow
                mb-6
              "
            > {description} </p>

            {tags.length > 0 && (
              <div 
              className="flex flex-wrap gap-1.5">
                {tags.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className={`
                      ${styles.tag}
                      text-3xs
                    `}
                  >
                    {tag}
                  </span>
                ))}
                {tags.length > 3 && (
                  <span className="
                    inline-flex items-center
                    px-2 py-0.5
                    text-2xs font-primary-regular
                    text-(--color-quaternary) opacity-50
                  ">
                    +{tags.length - 3}
                  </span>
                )}
              </div>
            )}

            <div
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
        </article>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
