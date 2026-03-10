import { useEffect } from 'react';
import { author as authorConstants } from '../../assets/configConstants';

type MetaTagsProps = {
  title?: string;
  description?: string;
  keywords?: string[];
  author?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  canonical?: string;
};

/**
 * @component MetaTags
 * @description Dynamic meta tags for SEO and social sharing
 *
 * Features:
 * - Dynamic title and description
 * - Open Graph tags for social media
 * - Twitter Card tags
 * - Keywords meta tag
 * - Canonical URL
 * - Automatic cleanup
 *
 * Usage:
 * ```tsx
 * <MetaTags
 *   title="Page Title"
 *   description="Page description"
 *   keywords={['keyword1', 'keyword2']}
 *   ogImage="/path/to/image.jpg"
 * />
 * ```
 */
const MetaTags = ({
  title,
  description,
  keywords,
  author = `${authorConstants.firstName} ${authorConstants.lastName}`,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  twitterCard = 'summary_large_image',
  canonical,
}: MetaTagsProps) => {
  useEffect(() => {
    const createdElements: HTMLElement[] = [];

    // Update document title
    if (title) {
      document.title = title;
    }

    // Helper to set or create meta tag
    const setMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(
        `meta[${attribute}="${name}"]`
      ) as HTMLMetaElement;

      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
        createdElements.push(meta);
      }

      meta.content = content;
    };

    // Standard meta tags
    if (description) {
      setMetaTag('description', description);
    }

    if (keywords && keywords.length > 0) {
      setMetaTag('keywords', keywords.join(', '));
    }

    if (author) {
      setMetaTag('author', author);
    }

    // Open Graph tags
    if (ogTitle || title) {
      setMetaTag('og:title', ogTitle || title || '', true);
    }

    if (ogDescription || description) {
      setMetaTag('og:description', ogDescription || description || '', true);
    }

    if (ogImage) {
      setMetaTag('og:image', ogImage, true);
      setMetaTag('og:image:alt', title || 'Image', true);
    }

    if (ogUrl) {
      setMetaTag('og:url', ogUrl, true);
    }

    setMetaTag('og:type', 'website', true);

    // Twitter Card tags
    setMetaTag('twitter:card', twitterCard);

    if (title) {
      setMetaTag('twitter:title', title);
    }

    if (description) {
      setMetaTag('twitter:description', description);
    }

    if (ogImage) {
      setMetaTag('twitter:image', ogImage);
    }

    // Canonical link
    if (canonical) {
      let link = document.querySelector(
        'link[rel="canonical"]'
      ) as HTMLLinkElement;

      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
        createdElements.push(link);
      }

      link.href = canonical;
    }

    return () => {
      createdElements.forEach((element) => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      });
    };
  }, [title, description, keywords, author, ogTitle, ogDescription, ogImage, ogUrl, twitterCard, canonical]);

  return null;
};

export default MetaTags;
