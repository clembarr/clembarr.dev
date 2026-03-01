import { useContext } from 'react';
import { motion } from 'framer-motion';
import { PageTransition, ScrollReveal } from '../components/animations';
import { blogSortingOptions, placeholderMessages } from '../assets/constants';
import { blogPosts } from '../assets/blog';
import { StructuredData, MetaTags, blogSchema } from '../components/seo';
import { SearchEngine, Searchbar, Sortingbar } from '../components/search';
import { BlogListing } from '../components/sections';
import { LangContext } from '../components/language';
import styles from '../style';

/**
 * @component Blog
 * @description Blog listing page with search and filtering, using the mutualized
 * SearchEngine, Searchbar, and Sortingbar components.
 * Blog posts are loaded synchronously from the TS barrel export.
 */
const Blog = () => {
  const { currentLang } = useContext(LangContext);

  /** @function ph Shorthand to look up a message by context in placeholderMessages. */
  const ph = (context: string) =>
    placeholderMessages.find((m) => m.context === context)!.content[currentLang];

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <PageTransition>
      {/* SEO */}
      <StructuredData schema={blogSchema} />
      <MetaTags
        title="Blog - Clément Barrière"
        description="Thoughts on software development, research, algorithms, and technology."
        keywords={['Blog', 'Software Development', 'AI', 'Algorithms', 'Research', 'Tutorials']}
        ogUrl="https://clembarr.dev/blog"
        canonical="https://clembarr.dev/blog"
      />

      <SearchEngine>
        <div
          id="blog-container"
          className={`
            ${styles.page}
            ${styles.flexCol}
            ${styles.sectionContainer}
            space-y-12
            pb-20
          `}
        >
          {/* Header */}
          <ScrollReveal direction="up" delay={0.1}>
            <header className="text-center space-y-4">
              <motion.h1
                className={`
                  font-primary-bold
                  2xl:text-5xl xl:text-4xl lg:text-3xl text-2xl
                  text-(--color-quaternary)
                  mb-4
                `}
                initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: prefersReducedMotion ? 0.01 : 0.5,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                {ph("blogTitle")}
              </motion.h1>
              <p
                className={`
                  ${styles.paragraph}
                  text-(--color-quaternary)
                  opacity-80
                  max-w-2xl
                  mx-auto
                `}
              >
                {ph("blogSubtitle")}
              </p>
            </header>
          </ScrollReveal>

          {/* Search and Filters */}
          <ScrollReveal direction="up" delay={0.2}>
            <div
              className={`
                ${styles.flexCol}
                ${styles.contentCenter}
                gap-4
              `}
            >
              <Searchbar placeholderContext="searchBlog" />
                <Sortingbar options={blogSortingOptions} maxPills={5} />
            </div>
          </ScrollReveal>

          {/* Blog listing (filtered by SearchContext) */}
          <BlogListing posts={blogPosts} />
        </div>
      </SearchEngine>
    </PageTransition>
  );
};

export default Blog;
