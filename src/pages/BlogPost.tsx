import { useParams, useNavigate } from 'react-router';
import { ArticleLayout } from '../components/blog';
import { PageTransition } from '../components/animations';
import { UNIVERSAL_LANG } from '../assets/i18n';
import { author } from '../assets/constants';
import { blogPosts } from '../assets/blog';
import { getRelatedPosts } from '../utils';
import { StructuredData, MetaTags, generateBlogPostSchema } from '../components/seo';
import styles from '../style';

/**
 * @component BlogPost
 * @description Individual blog post page with deep linking.
 * Performs synchronous lookup from the blog barrel export.
 *
 * Features:
 * - Dynamic routing with slug parameter
 * - Automatic metadata for SEO
 * - Related posts suggestions
 * - 404 redirect for invalid slugs
 * - Print-friendly layout
 */
const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  if (!slug) {
    navigate('/blog');
    return null;
  }

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    navigate('/404');
    return null;
  }

  const relatedPosts = getRelatedPosts(post, blogPosts, 2);

  const title = post.title[UNIVERSAL_LANG] || post.title[Object.keys(post.title)[0]];
  const description =
    post.description[UNIVERSAL_LANG] || post.description[Object.keys(post.description)[0]];
  const postUrl = `https://clembarr.dev/blog/${post.slug}`;
  const keywords = Object.values(post.tags).flat();

  return (
    <PageTransition>
      {/* Blog Post SEO */}
      <StructuredData
        schema={generateBlogPostSchema({
          title,
          description,
          datePublished: post.date.toISOString(),
          url: postUrl,
          image: post.coverImage,
          keywords,
          author: {
            name: `${author.firstName} ${author.lastName}`,
            url: 'https://clembarr.dev',
          },
        })}
      />
      <MetaTags
        title={`${title} - Clément Barrière`}
        description={description}
        keywords={keywords}
        ogTitle={title}
        ogDescription={description}
        ogImage={post.coverImage}
        ogUrl={postUrl}
        canonical={postUrl}
      />

      <div
        id="blog-post-container"
        className={`
          ${styles.page}
          ${styles.sectionContainer}
          pb-20
        `}
      >
        <ArticleLayout post={post} relatedPosts={relatedPosts} />
      </div>
    </PageTransition>
  );
};

export default BlogPost;
