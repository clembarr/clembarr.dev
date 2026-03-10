import { PageTransition, ScrollReveal } from '../components/animations';
import { BlogSEOConstants, blogSortingOptions, blogSchema } from '../assets/constants';
import { blogPosts } from '../assets/blog';
import { StructuredData, MetaTags } from '../components/seo';
import { SearchEngine, Searchbar, Sortingbar } from '../components/search';
import { BlogListing } from '../components/sections';
import styles from '../style';

/**
 * @component Blog
 * @description Blog listing page with search and filtering. Wraps content in a
 * SearchEngine context shared with Searchbar, Sortingbar and BlogListing.
 */
const Blog = () => {

  return (
    <PageTransition>
      <StructuredData schema={blogSchema} />
      <MetaTags
        title={BlogSEOConstants.title}
        description={BlogSEOConstants.description}
        keywords={BlogSEOConstants.keywords}
        ogUrl={BlogSEOConstants.ogUrl}
        canonical={BlogSEOConstants.canonical}
      />

      <SearchEngine>
        <div
          id="blog-container"
          className={`
            ${styles.page}
            ${styles.flexCol}
            ${styles.sectionContainer}
            space-y-12
            mt-25
            pb-20
          `}
        >
          <ScrollReveal direction="up" delay={0.2}>
            <div
              id="blog-search-container"
              className={`
                ${styles.flexCol}
                ${styles.contentCenter}
                gap-4
                space-y-5
              `}
            >
              <Searchbar placeholderContext="searchBlog" />

              <Sortingbar options={blogSortingOptions} maxPills={3} />
            </div>
          </ScrollReveal>

          <BlogListing posts={blogPosts} />
        </div>
      </SearchEngine>
    </PageTransition>
  );
};

export default Blog;
