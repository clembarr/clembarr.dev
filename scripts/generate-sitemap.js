import { writeFileSync, readFileSync, readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Generate sitemap.xml for clembarr.dev
 *
 * Static pages are hardcoded. Blog posts are discovered dynamically by parsing
 * all *.ts files in src/assets/blog/ (excluding index.ts) for their `slug`
 * and `date: new Date(...)` fields — no TypeScript compilation required.
 *
 * Run before building so Vite copies the result into dist/:
 *   node scripts/generate-sitemap.js && npm run build
 */

const SITE_URL = 'https://clembarr.dev';

const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/projects', priority: '0.9', changefreq: 'weekly' },
  { path: '/blog', priority: '0.9', changefreq: 'daily' },
];

/**
 * @function parseBlogPosts Reads every *.ts file in src/assets/blog/ (except
 * index.ts) and extracts the `slug` and `date` fields via regex.
 * Supports the `new Date(year, month[, day])` constructor format used across
 * all blog post definitions (month is 0-indexed, as in JavaScript).
 * Files that do not contain a slug are silently skipped.
 * @returns Array of { path, priority, changefreq, lastmod } objects
 */
const parseBlogPosts = () => {
  const blogDir = join(__dirname, '../src/assets/blog');
  const files = readdirSync(blogDir).filter(
    (f) => f.endsWith('.ts') && f !== 'index.ts'
  );

  const posts = [];

  for (const file of files) {
    const src = readFileSync(join(blogDir, file), 'utf-8');

    const slugMatch = src.match(/slug:\s*["']([^"']+)["']/);
    if (!slugMatch) continue;
    const slug = slugMatch[1];

    /** Parse new Date(year, month[, day]) — month is 0-indexed in JS */
    const dateMatch = src.match(/date:\s*new Date\((\d{4}),\s*(\d{1,2})(?:,\s*(\d{1,2}))?\)/);
    let lastmod;
    if (dateMatch) {
      const year = parseInt(dateMatch[1], 10);
      const month = parseInt(dateMatch[2], 10); // 0-indexed
      const day = dateMatch[3] ? parseInt(dateMatch[3], 10) : 1;
      lastmod = new Date(year, month, day).toISOString().split('T')[0];
    }

    posts.push({
      path: `/blog/${slug}`,
      priority: '0.8',
      changefreq: 'monthly',
      lastmod,
    });
  }

  return posts;
};

/**
 * @function formatDate Format a date string or Date to ISO 8601 (YYYY-MM-DD)
 */
const formatDate = (date) => {
  if (!date) return new Date().toISOString().split('T')[0];
  return new Date(date).toISOString().split('T')[0];
};

/**
 * @function generateSitemap Build the XML sitemap string from all page entries
 */
const generateSitemap = (blogPostPages) => {
  const allPages = [...staticPages, ...blogPostPages];

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

  return `${xmlHeader}\n${urls}\n${xmlFooter}`;
};

/**
 * @function writeSitemap Generate and write sitemap.xml to public/
 */
const writeSitemap = () => {
  try {
    const blogPostPages = parseBlogPosts();
    const sitemap = generateSitemap(blogPostPages);
    const outputPath = join(__dirname, '../public/sitemap.xml');

    writeFileSync(outputPath, sitemap, 'utf-8');
    console.log('✓ Sitemap generated successfully at public/sitemap.xml');
    console.log(`  Static pages : ${staticPages.length}`);
    console.log(`  Blog posts   : ${blogPostPages.length} (${blogPostPages.map((p) => p.path).join(', ')})`);
  } catch (error) {
    console.error('✗ Error generating sitemap:', error);
    process.exit(1);
  }
};

writeSitemap();
