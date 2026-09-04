/**
 * @fileoverview Detects dangling media in the content asset folders.
 *
 * Reports three kinds of drift, mostly useful after deleting a project or an
 * article, and as a periodic audit:
 *   1. image files present on disk but never imported by the folder's index.ts
 *   2. ProjectMedia exports declared but referenced by no project and no post
 *   3. imports declared in index.ts whose file is missing
 *
 * Nothing is deleted: the report is advisory, since an unused export may be
 * deliberate (an image kept for an upcoming article).
 *
 *   node .claude/skills/portfolio-content/scripts/orphans.js
 */

import { readdirSync, readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../../../..');
const FOLDERS = ['projects_images', 'blog_images'];

// Piping into head/less closes stdout early; exit quietly instead of throwing EPIPE
process.stdout.on('error', (error) => {
  if (error.code === 'EPIPE') process.exit(0);
  throw error;
});


/**
 * @function stripComments Removes block and line comments from a source file.
 * The registry index files document their conventions with commented-out example
 * imports, which would otherwise be mistaken for real declarations.
 * @param source - Raw file content.
 * @returns The content without comments.
 */
const stripComments = (source) =>
  source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

/**
 * @function sourceFiles Collects every TS/TSX file under src/, except the media
 * registries themselves. A media export referenced only by its own registry is
 * unused; one referenced by any component or content file is not.
 * @param dir - Directory to walk.
 * @returns Absolute paths of the source files to search.
 */
const sourceFiles = (dir = join(ROOT, 'src')) => {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (FOLDERS.includes(entry.name)) continue;
      files.push(...sourceFiles(path));
    } else if (/\.tsx?$/.test(entry.name)) {
      files.push(path);
    }
  }
  return files;
};

const sources = stripComments(sourceFiles().map((file) => readFileSync(file, 'utf-8')).join('\n'));
let findings = 0;

for (const folder of FOLDERS) {
  const dir = join(ROOT, 'src/assets', folder);
  const indexPath = join(dir, 'index.ts');
  if (!existsSync(indexPath)) continue;

  const index = stripComments(readFileSync(indexPath, 'utf-8'));
  const files = readdirSync(dir).filter((file) => file !== 'index.ts');

  console.log(`== ${folder} ==`);

  // 1. Files on disk that index.ts never imports
  const unimported = files.filter((file) => !index.includes(`./${file}`));
  if (unimported.length) {
    findings += unimported.length;
    console.log(`  ⚠ ${unimported.length} fichier(s) non importe(s) dans index.ts :`);
    unimported.forEach((file) => console.log(`      ${file}`));
  }

  // 3. Imports pointing at a file that no longer exists
  const imported = [...index.matchAll(/from\s+["']\.\/([^"']+)["']/g)].map((match) => match[1]);
  const missing = imported.filter((file) => !existsSync(join(dir, file)));
  if (missing.length) {
    findings += missing.length;
    console.log(`  ✗ ${missing.length} import(s) vers un fichier absent :`);
    missing.forEach((file) => console.log(`      ${file}`));
  }

  // 2. Declared media exports nobody references
  const exports = [...index.matchAll(/^export const (\w+)\s*:\s*ProjectMedia/gm)].map((match) => match[1]);
  const unused = exports.filter((name) => !new RegExp(`\\b${name}\\b`).test(sources));
  if (unused.length) {
    findings += unused.length;
    console.log(`  ⚠ ${unused.length} export(s) ProjectMedia reference(s) nulle part dans src/ :`);
    console.log(`      ${unused.join(' ')}`);
  }

  if (!unimported.length && !missing.length && !unused.length) console.log('  ✓ rien a signaler');
  console.log();
}

console.log(findings === 0 ? '✓ Aucun orphelin' : `${findings} point(s) a verifier`);
