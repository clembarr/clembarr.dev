import { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TableOfContentsItem } from '../../assets/dataTypes';
import { placeholderMessages, TableOfContentObserverConstants, TableOfContentsItemConstants } from '../../assets/constants';
import { LangContext } from '../language';
import styles from '../../style';

type TableOfContentsProps = {
  items: TableOfContentsItem[];
  className?: string;
};

/**
 * @component TableOfContents
 * @description Auto-generated table of contents with active section highlighting
 */
const TableOfContents = ({ items, className = '' }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>('');
  const { currentLang } = useContext(LangContext);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /** @function ph Shorthand to look up a message by context in placeholderMessages. */
  const ph = (context: string) =>
    placeholderMessages.find((m) => m.context === context)!.content[currentLang];

  useEffect(() => {
    // Intersection Observer to track which heading is currently focused
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: TableOfContentObserverConstants.ROOT_MARGIN,
      threshold: TableOfContentObserverConstants.THRESHOLD,
    });

    // Observe all headings
    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for fixed navbar
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });

      // Update URL without scrolling
      window.history.pushState(null, '', `#${id}`);
      setActiveId(id);
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <motion.nav
      initial={prefersReducedMotion ? {} : { opacity: TableOfContentObserverConstants.MOTION_OPACITY, x: TableOfContentObserverConstants.MOTION_X }}
      animate={{ opacity: TableOfContentObserverConstants.ANIMATE_OPACITY, x: TableOfContentObserverConstants.ANIMATE_X }}
      transition={{
        duration: prefersReducedMotion ? TableOfContentObserverConstants.REDUCED_MOTION_TRANSITION_DURATION : TableOfContentObserverConstants.TRANSITION_DURATION,
        delay: TableOfContentObserverConstants.TRANSITION_DELAY,
        ease: TableOfContentObserverConstants.TRANSITION_EASE.split(' ').map((n) => parseFloat(n)) as [number, number, number, number],
      }}
      className={`
        ${className}
        sticky
        top-24
        max-h-[calc(100vh-120px)]
        overflow-y-auto
        hidden
        lg:block
      `}
      aria-label="Table of contents"
    >
      <div
        className="
          bg-(--color-secondary)
          rounded-lg
          p-6
          shadow-lg
        "
      >
        <h2
          className={`
            font-primary-bold
            text-md
            text-(--color-quaternary)
            mb-4
            pb-2
            border-b
            border-(--color-quinary)
          `}
        >
          {ph("blogTableOfContents")}
        </h2>

        <ul className={`
            space-y-2
            text-2xs
          `}
        >
          {items.map((item, index) => {
            const isActive = activeId === item.id;
            const indent = (item.level - 1) * 12; // 12px per level

            return (
              <motion.li
                key={index}
                style={{ paddingLeft: `${indent}px` }}
                initial={prefersReducedMotion ? {} : { opacity: TableOfContentsItemConstants.MOTION_OPACITY, x: TableOfContentsItemConstants.MOTION_X }}
                animate={{ opacity: TableOfContentsItemConstants.ANIMATE_OPACITY, x: TableOfContentsItemConstants.ANIMATE_X }}
                transition={{
                  duration: prefersReducedMotion ? TableOfContentsItemConstants.REDUCED_MOTION_TRANSITION_DURATION : TableOfContentsItemConstants.TRANSITION_DURATION,
                  delay: prefersReducedMotion ? TableOfContentsItemConstants.REDUCED_MOTION_TRANSITION_DELAY : index * 0.05,
                }}
              >
                <a id={`table-item-${item.id}`}
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={`
                    ${styles.paragraph}
                    block
                    py-1
                    transition-all
                    duration-200
                    border-l-2
                    pl-3
                    ${
                      isActive
                        ? 'border-(--color-tertiary) text-(--color-tertiary) font-secondary-semibold'
                        : 'border-transparent text-(--color-quaternary) opacity-70 hover:opacity-100 hover:border-(--color-quinary)'
                    }
                  `}
                >
                  {item.text}
                </a>
              </motion.li>
            );
          })}
        </ul>

        <div className="mt-6 pt-4 border-t border-(--color-quinary)">
          <div className="flex items-center justify-between text-3xs text-(--color-quaternary) opacity-60">
            <span>{ph("blogScrollProgress")}</span>
            <span>
              {items.findIndex((item) => item.id === activeId) + 1} / {items.length}
            </span>
          </div>
          <div className="mt-2 w-full h-1 bg-(--color-primary) rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-(--color-tertiary)"
              initial={{ width: '0%' }}
              animate={{
                width: `${((items.findIndex((item) => item.id === activeId) + 1) / items.length) * 100}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default TableOfContents;
