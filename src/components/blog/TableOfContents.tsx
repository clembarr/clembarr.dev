import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TableOfContentsItem } from '../../assets/dataTypes';
import styles from '../../style';

type TableOfContentsProps = {
  items: TableOfContentsItem[];
  className?: string;
};

/**
 * @component TableOfContents
 * @description Auto-generated table of contents with active section highlighting
 *
 * Features:
 * - Automatically extracts headings from article
 * - Highlights currently visible section
 * - Smooth scroll to section on click
 * - Sticky positioning
 * - Nested structure based on heading levels
 * - Responsive hiding on mobile
 */
const TableOfContents = ({ items, className = '' }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>('');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    // Intersection Observer to track which heading is currently visible
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-80px 0px -80% 0px',
      threshold: 1.0,
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
      initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : 0.4,
        delay: 0.2,
        ease: [0.25, 0.1, 0.25, 1],
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
          Table of Contents
        </h2>

        <ul className="space-y-2">
          {items.map((item, index) => {
            const isActive = activeId === item.id;
            const indent = (item.level - 1) * 12; // 12px per level

            return (
              <motion.li
                key={index}
                style={{ paddingLeft: `${indent}px` }}
                initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0.01 : 0.3,
                  delay: prefersReducedMotion ? 0 : index * 0.05,
                }}
              >
                <a
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

        {/* Progress Indicator */}
        <div className="mt-6 pt-4 border-t border-(--color-quinary)">
          <div className="flex items-center justify-between text-3xs text-(--color-quaternary) opacity-60">
            <span>Scroll Progress</span>
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
