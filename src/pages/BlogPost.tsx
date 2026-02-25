import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArticleLayout } from '../components/blog';
import { PageTransition } from '../components/animations';
import { BlogPost as BlogPostType } from '../assets/dataTypes';
import { getBlogPost, getRelatedPosts } from '../utils/blogLoader';
import { StructuredData, MetaTags, generateBlogPostSchema } from '../components/seo';
import styles from '../style';

/**
 * @component BlogPost
 * @description Individual blog post page with deep linking
 *
 * Features:
 * - Dynamic routing with slug parameter
 * - Automatic metadata for SEO
 * - Related posts suggestions
 * - 404 redirect for invalid slugs
 * - Print-friendly layout
 * - Share functionality
 */
const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        navigate('/blog');
        return;
      }

      try {
        // Find the post by slug
        const foundPost = await getBlogPost(slug);

        if (foundPost) {
          setPost(foundPost);

          // Find related posts
          const related = await getRelatedPosts(foundPost, undefined, 2);
          setRelatedPosts(related);
        } else {
          // Post not found, redirect to 404
          navigate('/404');
          return;
        }
      } catch (error) {
        console.error('Error loading blog post:', error);
        navigate('/404');
        return;
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, navigate]);

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
            Loading article...
          </div>
        </div>
      </PageTransition>
    );
  }

  if (!post) {
    return null;
  }

  const title = post.metadata.title['0'] || post.metadata.title[Object.keys(post.metadata.title)[0]];
  const description =
    post.metadata.description['0'] || post.metadata.description[Object.keys(post.metadata.description)[0]];
  const postUrl = `https://clembarr.dev/blog/${post.slug}`;

  return (
    <PageTransition>
      {/* Blog Post SEO */}
      <StructuredData
        schema={generateBlogPostSchema({
          title,
          description,
          datePublished: post.metadata.date.toISOString(),
          url: postUrl,
          image: post.metadata.coverImage,
          keywords: post.metadata.tags,
          author: {
            name: `${post.metadata.author.firstName} ${post.metadata.author.lastName}`,
            url: 'https://clembarr.dev',
          },
        })}
      />
      <MetaTags
        title={`${title} - Clément Barrière`}
        description={description}
        keywords={post.metadata.tags}
        ogTitle={title}
        ogDescription={description}
        ogImage={post.metadata.coverImage}
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
