import { useState, useContext, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BlogCard } from '../components/blog';
import { PageTransition, ScrollReveal } from '../components/animations';
import { LangContext } from '../components/language';
import { BlogPost, BlogCategory } from '../assets/dataTypes';
import { loadBlogPosts } from '../utils/blogLoader';
import { StructuredData, MetaTags, blogSchema } from '../components/seo';
import styles from '../style';

/**
 * @component Blog
 * @description Blog listing page with search and filtering
 *
 * Features:
 * - Search by title and description
 * - Filter by category
 * - Sort by date (newest/oldest)
 * - Responsive grid layout
 * - Empty state handling
 * - Staggered card animations
 */
const Blog = () => {
  const { currentLang } = useContext(LangContext);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'ALL'>('ALL');
  const [sortOrder, setSortOrder] = useState<'NEWEST' | 'OLDEST'>('NEWEST');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Load blog posts on mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await loadBlogPosts();
        setBlogPosts(posts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter and search posts
  const filteredPosts = useMemo(() => {
    let filtered = [...blogPosts];

    // Filter by published status
    filtered = filtered.filter((post) => post.metadata.published);

    // Filter by category
    if (selectedCategory !== 'ALL') {
      filtered = filtered.filter((post) => post.metadata.category === selectedCategory);
    }

    // Search by title and description
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((post) => {
        const title = (post.metadata.title[currentLang] || post.metadata.title['0']).toLowerCase();
        const description = (
          post.metadata.description[currentLang] || post.metadata.description['0']
        ).toLowerCase();
        return title.includes(query) || description.includes(query);
      });
    }

    // Sort by date
    filtered.sort((a, b) => {
      const dateA = a.metadata.date.getTime();
      const dateB = b.metadata.date.getTime();
      return sortOrder === 'NEWEST' ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [blogPosts, selectedCategory, searchQuery, sortOrder, currentLang]);

  const categories: Array<BlogCategory | 'ALL'> = [
    'ALL',
    BlogCategory.RESEARCH,
    BlogCategory.DEVELOPMENT,
    BlogCategory.TUTORIAL,
    BlogCategory.ALGORITHM,
    BlogCategory.OPINION,
  ];

  if (loading) {
    return (
      <PageTransition>
        <div
          className={`
            ${styles.sizeScreen}
            ${styles.flexCol}
            ${styles.contentCenter}
          `}
        >
          <div className="text-(--color-tertiary) text-xl animate-pulse">
            Loading blog posts...
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      {/* Blog SEO */}
      <StructuredData schema={blogSchema} />
      <MetaTags
        title="Blog - Clément Barrière"
        description="Thoughts on software development, research, algorithms, and technology."
        keywords={['Blog', 'Software Development', 'AI', 'Algorithms', 'Research', 'Tutorials']}
        ogUrl="https://clembarr.dev/blog"
        canonical="https://clembarr.dev/blog"
      />

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
              Blog & Research
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
              Thoughts on software development, research, algorithms, and technology.
            </p>
          </header>
        </ScrollReveal>

        {/* Search and Filters */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`
                  w-full
                  px-6
                  py-4
                  bg-(--color-secondary)
                  text-(--color-quaternary)
                  border-2
                  border-(--color-quinary)
                  rounded-lg
                  focus:border-(--color-tertiary)
                  focus:outline-none
                  transition-colors
                  duration-200
                  font-secondary-regular
                `}
                aria-label="Search blog posts"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    px-4
                    py-2
                    rounded-full
                    font-secondary-semibold
                    text-2xs
                    uppercase
                    tracking-wider
                    transition-all
                    duration-200
                    ${
                      selectedCategory === category
                        ? 'bg-(--color-tertiary) text-(--color-primary) shadow-lg'
                        : 'bg-(--color-secondary) text-(--color-quaternary) opacity-70 hover:opacity-100'
                    }
                  `}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort Toggle */}
            <div className="flex justify-center gap-4 items-center">
              <span className="text-2xs text-(--color-quaternary) opacity-70">Sort by:</span>
              <button
                onClick={() => setSortOrder(sortOrder === 'NEWEST' ? 'OLDEST' : 'NEWEST')}
                className={`
                  px-4
                  py-2
                  rounded-lg
                  bg-(--color-secondary)
                  text-(--color-quaternary)
                  font-secondary-semibold
                  text-2xs
                  hover:bg-(--color-tertiary)
                  hover:text-(--color-primary)
                  transition-colors
                  duration-200
                `}
              >
                {sortOrder === 'NEWEST' ? 'Newest First' : 'Oldest First'}
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Results Count */}
        {blogPosts.length > 0 && (
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-center text-2xs text-(--color-quaternary) opacity-70">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} found
            </p>
          </ScrollReveal>
        )}

        {/* Blog Posts Grid */}
        <ScrollReveal direction="up" delay={0.4}>
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <BlogCard key={post.slug} post={post} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 space-y-4">
              <div className="text-6xl opacity-20">📝</div>
              <h2 className="font-primary-semibold text-xl text-(--color-quaternary) opacity-70">
                {blogPosts.length === 0
                  ? 'No articles yet'
                  : searchQuery || selectedCategory !== 'ALL'
                  ? 'No articles found'
                  : 'No articles available'}
              </h2>
              <p className="text-2xs text-(--color-quaternary) opacity-50">
                {blogPosts.length === 0
                  ? 'Blog posts coming soon!'
                  : 'Try adjusting your search or filters'}
              </p>
              {(searchQuery || selectedCategory !== 'ALL') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('ALL');
                  }}
                  className="
                    mt-4
                    px-6
                    py-3
                    bg-(--color-tertiary)
                    text-(--color-primary)
                    rounded-lg
                    font-primary-semibold
                    hover:scale-105
                    active:scale-95
                    transition-transform
                    duration-200
                  "
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </ScrollReveal>
      </div>
    </PageTransition>
  );
};

export default Blog;
