/**
 * @fileoverview Inventory of every existing content item.
 *
 * Entry point of any content operation: it prevents inventing a getSkill('...')
 * label that does not exist, reusing a slug, or renaming a project title that
 * other content links to.
 *
 * Loads the real modules through Vite (same mechanism as scripts/validate-data.js)
 * rather than parsing the TypeScript with regexes, so the output always matches
 * what the app actually sees.
 *
 *   node .claude/skills/portfolio-content/scripts/inventory.js [section]
 *   sections: projects | blog | skills | career | media | all (default)
 */

import { createServer } from 'vite';
import { readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../../../..');

// Piping into head/less closes stdout early; exit quietly instead of throwing EPIPE
process.stdout.on('error', (error) => {
  if (error.code === 'EPIPE') process.exit(0);
  throw error;
});

const section = process.argv[2] || 'all';
const wants = (name) => section === 'all' || section === name;

/** Month is 0-indexed in the Date constructor used across the content files. */
const ymd = (date) =>
  date instanceof Date && !Number.isNaN(date.getTime())
    ? date.toISOString().slice(0, 10)
    : '?';

/** Title under the universal key doubles as the relational key for related content. */
const label = (multilingual) =>
  multilingual?.['0'] || multilingual?.fr || multilingual?.en || '?';

/** Wrap a long list of identifiers so the output stays readable in a terminal. */
const columns = (items, width = 100, indent = '  ') => {
  const lines = [];
  let line = '';
  for (const item of items) {
    if (line && (line + ' ' + item).length > width) {
      lines.push(indent + line);
      line = '';
    }
    line = line ? `${line} ${item}` : item;
  }
  if (line) lines.push(indent + line);
  return lines.join('\n');
};

const server = await createServer({
  root: ROOT,
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});

try {
  const { projects, careerTimeline } = await server.ssrLoadModule('/src/assets/contents.ts');
  const { blogPosts } = await server.ssrLoadModule('/src/assets/blog/index.ts');
  const { skills } = await server.ssrLoadModule('/src/assets/skills.ts');
  const media = await server.ssrLoadModule('/src/assets/projects_images/index.ts');

  if (wants('projects')) {
    console.log(`== PROJETS (${projects.length}) — src/assets/projects/ ==`);
    console.log('   le titre est la CLE RELATIONNELLE utilisee par relatedProjects/relatedPosts');
    projects.forEach((project) => {
      const tools = project.content?.tools?.map((tool) => tool.label).join(', ') || '';
      console.log(`  ${ymd(project.date)}  ${label(project.title).padEnd(24)} ${project.favorite ? '★' : ' '} ${tools}`);
    });
    console.log('  ordre du barrel (doit rester du plus recent au plus ancien) :');
    console.log(columns(projects.map((project) => label(project.title)), 100, '    '));
    console.log();
  }

  if (wants('blog')) {
    console.log(`== ARTICLES (${blogPosts.length}) — src/assets/blog/ ==`);
    blogPosts.forEach((post) => {
      console.log(`  ${ymd(post.date)}  ${post.slug.padEnd(24)} ${String(post.category).padEnd(12)} ${post.paragraphs.length} §  ${post.readingTime ?? '?'} min`);
      if (post.relatedProjects?.length) console.log(`      → projets lies : ${post.relatedProjects.join(', ')}`);
    });
    console.log();
  }

  if (wants('skills')) {
    console.log(`== LABELS DE SKILLS (${skills.length}) — a reprendre A L'IDENTIQUE dans getSkill() ==`);
    const byCategory = new Map();
    skills.forEach((skill) => {
      const key = skill.category?.context || 'SANS CATEGORIE';
      if (!byCategory.has(key)) byCategory.set(key, []);
      byCategory.get(key).push(skill.label);
    });
    for (const [category, labels] of byCategory) {
      console.log(`  [${category}]`);
      console.log(columns(labels.sort(), 96, '    '));
    }
    console.log();
  }

  if (wants('career')) {
    console.log(`== PARCOURS (${careerTimeline.length}) — contents.ts → careerTimeline ==`);
    careerTimeline.forEach((entry) => {
      const period = label(entry.period).replace(/\n/g, ' → ');
      const tags = entry.tags?.fr?.join(' · ') || entry.tags?.['0']?.join(' · ') || '';
      console.log(`  ${String(entry.type).padEnd(14)} ${period.padEnd(24)} ${label(entry.organization)}`);
      console.log(`  ${' '.repeat(14)} ${label(entry.title)}`);
      if (tags) console.log(`  ${' '.repeat(14)} ${tags}`);
    });
    console.log();
  }

  if (wants('media')) {
    const named = Object.entries(media)
      .filter(([, value]) => value && typeof value === 'object' && 'url' in value && 'type' in value)
      .map(([name]) => name)
      .sort();
    console.log(`== MEDIAS: exports ProjectMedia reutilisables (${named.length}) ==`);
    console.log(columns(named));

    const files = readdirSync(join(ROOT, 'src/assets/projects_images')).filter((file) => file !== 'index.ts');
    console.log(`  fichiers presents dans le dossier : ${files.length} (voir orphans.js pour les non references)`);
    console.log();
  }
} finally {
  await server.close();
}
