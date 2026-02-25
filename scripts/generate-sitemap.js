import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Generate sitemap.xml for clembarr.dev
 *
 * This script generates a sitemap with all static pages and blog posts.
 * Run this script after building the site: node scripts/generate-sitemap.js
 */

const SITE_URL = 'https://clembarr.dev';

// Static pages with priority and change frequency
const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/projects', priority: '0.9', changefreq: 'weekly' },
  { path: '/blog', priority: '0.9', changefreq: 'daily' },
];

// Project pages (will be populated from projects data if needed)
// For now, we'll leave this as an example
const projectPages = [
  // { path: '/projects/gpgtool', priority: '0.8', changefreq: 'monthly', lastmod: '2024-12-01' },
];

// Blog posts (will be populated from blog loader at build time)
const blogPosts = [
  { path: '/blog/implementing-mcts-pathfinding', priority: '0.8', changefreq: 'monthly', lastmod: '2025-01-15' },
];

/**
 * Format date to ISO 8601 (YYYY-MM-DD)
 */
const formatDate = (date) => {
  if (!date) return new Date().toISOString().split('T')[0];
  return new Date(date).toISOString().split('T')[0];
};

/**
 * Generate XML sitemap
 */
const generateSitemap = () => {
  const allPages = [...staticPages, ...projectPages, ...blogPosts];

  const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;

  const xmlFooter = `</urlset>`;

  const urls = allPages.map((page) => {
    const lastmod = page.lastmod ? `    <lastmod>${formatDate(page.lastmod)}</lastmod>` : '';

    return `  <url>
    <loc>${SITE_URL}${page.path}</loc>${lastmod ? '\n' + lastmod : ''}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  }).join('\n');

  return `${xmlHeader}
${urls}
${xmlFooter}`;
};

/**
 * Write sitemap to public directory
 */
const writeSitemap = () => {
  try {
    const sitemap = generateSitemap();
    const outputPath = join(__dirname, '../public/sitemap.xml');

    writeFileSync(outputPath, sitemap, 'utf-8');
    console.log('✓ Sitemap generated successfully at public/sitemap.xml');
    console.log(`  Total URLs: ${staticPages.length + projectPages.length + blogPosts.length}`);
  } catch (error) {
    console.error('✗ Error generating sitemap:', error);
    process.exit(1);
  }
};

// Run the generator
writeSitemap();
