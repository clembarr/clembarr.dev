import { author, APP_URL } from "./configConstants";
import { SEOConstants } from "./dataTypes";

const authorName = `${author.firstName} ${author.lastName}`;
const authorUrl = APP_URL;

/** Schema.org Person entity for the portfolio owner. */
export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: authorName,
  jobTitle: 'Software Developer & Researcher',
  url: authorUrl,
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

/** Schema.org WebSite entity for the portfolio. */
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: `${authorName} - Portfolio`,
  description: `Portfolio of ${authorName} - Software Developer & Researcher`,
  url: authorUrl,
  author: {
    '@type': 'Person',
    name: authorName,
  },
  inLanguage: ['en', 'fr'],
};

/** Schema.org Blog entity for the blog section. */
export const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: `${authorName} - Blog`,
  description: 'Thoughts on software development, research, algorithms, and technology',
  url: `${APP_URL}/blog`,
  author: {
    '@type': 'Person',
    name: authorName,
  },
  publisher: {
    '@type': 'Person',
    name: authorName,
  },
  inLanguage: ['en', 'fr'],
};

/**
 * @function generateBlogPostSchema Build a Schema.org BlogPosting object for a blog post.
 * @param post - Post metadata used to populate the schema fields.
 * @returns A JSON-LD BlogPosting schema object.
 */
export const generateBlogPostSchema = (post: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  image?: string;
  keywords?: string[];
  author?: { name: string; url?: string };
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
    name: post.author?.name || authorName,
    url: post.author?.url || authorUrl,
  },
  publisher: {
    '@type': 'Person',
    name: authorName,
    url: authorUrl,
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': post.url,
  },
  inLanguage: 'en',
});

/**
 * @function generateProjectSchema Build a Schema.org CreativeWork object for a project.
 * @param project - Project metadata used to populate the schema fields.
 * @returns A JSON-LD CreativeWork schema object.
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
    name: authorName,
    url: authorUrl,
  },
  inLanguage: 'en',
});

export const BlogSEOConstants: SEOConstants = {
  title: `Blog - ${author.firstName} ${author.lastName}`,
  description: "Thoughts on software development, research, algorithms, and technology.",
  keywords: ['Blog', 'Software Development', 'AI', 'Algorithms', 'Research', 'Porfolio'],
  ogUrl: `${APP_URL}/blog`,
  canonical: `${APP_URL}/blog`,
}

export const ProjectSEOConstants: SEOConstants = {
  title: `Projets - ${author.firstName} ${author.lastName}`,
  description: "Découvrez les projets de Clément Barrière : développement web, intelligence artificielle, algorithmes et plus.",
  keywords: ['projets', 'projects', 'développement', 'software', 'AI', 'algorithms'],
  ogUrl: `${APP_URL}/projects`,
  canonical: `${APP_URL}/projects`,
}

export const HomeSEOConstants: SEOConstants = {
  title: `${author.firstName} ${author.lastName} - Portfolio`,
  description: "Portfolio de Clément Barrière - Développeur logiciel & chercheur. Projets, compétences et parcours.",
  keywords: ['portfolio', 'développeur', 'software developer', 'researcher', 'Clément Barrière'],
  ogUrl: `${APP_URL}`,
  canonical: `${APP_URL}`,
}
