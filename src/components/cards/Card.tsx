import { useContext, useEffect, useState } from 'react';
import styles from '../../style';
import DOMPurify from 'dompurify';
import { isOverflowing, truncateTextIfOverflow } from '../../utils';
import { ThemeContext } from '../theme/ThemeEngine';

type CardProps = {
  title: string;
  content: string;
  tags: string[];
  moreTopClasses?: string;
  titleProps?: string;
  contentProps?: string;
  tagsProps?: string;
}

/**
 * @description Modern Card component with theme-aware styling
 */
const Card = ({title, content, tags, moreTopClasses, titleProps, contentProps, tagsProps}: CardProps) => {
  const [displayedTags, setDisplayedTags] = useState<string[]>(tags.slice(0, 3));
  const { currentTheme } = useContext(ThemeContext);
  const isDark = currentTheme === 'dark';

  useEffect(() => {
    const titleEl = document.getElementById(`card-${title}-title`);
    const textEl = document.getElementById(`card-${title}-text`);
    const tagsEl = document.getElementById(`card-${title}-tags`);

    if (titleEl) truncateTextIfOverflow(titleEl, title);
    if (textEl) truncateTextIfOverflow(textEl, content);
    if (tagsEl && isOverflowing(tagsEl)) {
      setDisplayedTags((prev) => prev.slice(0, displayedTags.length - 1));
    }
  }, [content, tags, title, displayedTags.length]);

  return (
    <div id={`card-${title}`}
      className={`
        ${styles.flexCol}
        ${styles.sizeFull}
        ${moreTopClasses}
        relative
      `}
    >
      {/* Card Header */}
      <header id="card-header"
        className={`
          flex
          w-full
          h-1/4
          max-h-[25%]
          ${styles.contentStartX}
          font-primary-bold
          ${titleProps}
        `}
      >
        <h3 id={`card-${title}-title`}
          className={`
            transition-colors duration-300
            group-hover:text-(--color-tertiary)
          `}
          dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(title)}}
        />
      </header>

      {/* Card Content */}
      <p id={`card-${title}-text`}
        className={`
          flex
          w-full
          h-2/4
          max-h-[50%]
          overflow-hidden
          text-ellipsis
          ${styles.contentStartX}
          ${contentProps}
          text-(--color-quaternary)/80
          leading-relaxed
        `}
        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(content, {ALLOWED_TAGS: ['br']})}}
      />

      {/* Card Tags */}
      <div id={`card-${title}-tags`}
        className={`
          flex
          w-full
          h-1/6
          max-h-[25%]
          ${styles.contentStartX}
          gap-2
          overflow-hidden
          flex-wrap
          ${tagsProps}
        `}
      >
        {displayedTags.map((tag, index) => (
          <span key={index}
            className={`
              inline-flex items-center
              px-2.5 py-0.5
              text-2xs
              font-primary-semibold
              rounded-full
              transition-all duration-300
              ${isDark
                ? 'bg-(--color-tertiary)/10 text-(--color-tertiary) border border-(--color-tertiary)/30 hover:bg-(--color-tertiary)/20'
                : 'bg-(--color-tertiary)/10 text-(--color-tertiary) border border-(--color-tertiary)/20 hover:bg-(--color-tertiary)/15'
              }
            `}
          >
            {tag}
          </span>
        ))}
        {tags.length > displayedTags.length && (
          <span className="inline-flex items-center px-2 py-0.5 text-2xs font-primary-regular text-(--color-muted)">
            +{tags.length - displayedTags.length}
          </span>
        )}
      </div>
    </div>
  );
}

export default Card;
