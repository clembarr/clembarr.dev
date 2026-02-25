import { useEffect } from 'react';

/**
 * Person schema for portfolio owner
 */
export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Clément Barrière',
  jobTitle: 'Software Developer & Researcher',
  url: 'https://clembarr.dev',
  sameAs: [
    'https://github.com/B-a-r-r',
    'https://www.linkedin.com/in/clement-barriere',
  ],
  knowsAbout: [
    'Software Development',
    'Artificial Intelligence',
    'Algorithms',
    'Web Development',
    'Research',
  ],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'IUT de Bordeaux',
  },
  worksFor: {
    '@type': 'Organization',
    name: 'Self-employed',
  },
};

/**
 * Website schema
 */
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Clément Barrière - Portfolio',
  description: 'Portfolio of Clément Barrière - Software Developer & Researcher',
  url: 'https://clembarr.dev',
  author: {
    '@type': 'Person',
    name: 'Clément Barrière',
  },
  inLanguage: ['en', 'fr'],
};

/**
 * Blog schema
 */
export const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Clément Barrière - Blog',
  description: 'Thoughts on software development, research, algorithms, and technology',
  url: 'https://clembarr.dev/blog',
  author: {
    '@type': 'Person',
    name: 'Clément Barrière',
  },
  publisher: {
    '@type': 'Person',
    name: 'Clément Barrière',
  },
  inLanguage: ['en', 'fr'],
};

/**
 * Generate BlogPosting schema for individual blog posts
 */
export const generateBlogPostSchema = (post: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  image?: string;
  keywords?: string[];
  author?: {
    name: string;
    url?: string;
  };
}) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  description: post.description,
  datePublished: post.datePublished,
  dateModified: post.dateModified || post.datePublished,
  url: post.url,
  image: post.image,
  keywords: post.keywords?.join(', '),
  author: {
    '@type': 'Person',
    name: post.author?.name || 'Clément Barrière',
    url: post.author?.url || 'https://clembarr.dev',
  },
  publisher: {
    '@type': 'Person',
    name: 'Clément Barrière',
    url: 'https://clembarr.dev',
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': post.url,
  },
  inLanguage: 'en',
});

/**
 * Generate Project/CreativeWork schema
 */
export const generateProjectSchema = (project: {
  name: string;
  description: string;
  url: string;
  dateCreated: string;
  image?: string;
  keywords?: string[];
}) => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: project.name,
  description: project.description,
  url: project.url,
  dateCreated: project.dateCreated,
  image: project.image,
  keywords: project.keywords?.join(', '),
  creator: {
    '@type': 'Person',
    name: 'Clément Barrière',
    url: 'https://clembarr.dev',
  },
  inLanguage: 'en',
});

type StructuredDataProps = {
  schema: object | object[];
};

/**
 * @component StructuredData
 * @description Injects JSON-LD structured data into page head
 *
 * Features:
 * - SEO optimization with Schema.org
 * - Support for multiple schema types
 * - Dynamic injection via useEffect
 * - Cleanup on unmount
 *
 * Usage:
 * ```tsx
 * <StructuredData schema={personSchema} />
 * <StructuredData schema={[websiteSchema, blogSchema]} />
 * ```
 */
const StructuredData = ({ schema }: StructuredDataProps) => {
  useEffect(() => {
    const schemas = Array.isArray(schema) ? schema : [schema];
    const scriptElements: HTMLScriptElement[] = [];

    schemas.forEach((s, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = `structured-data-${index}`;
      script.textContent = JSON.stringify(s);
      document.head.appendChild(script);
      scriptElements.push(script);
    });

    // Cleanup on unmount
    return () => {
      scriptElements.forEach((script) => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, [schema]);

  return null;
};

export default StructuredData;
