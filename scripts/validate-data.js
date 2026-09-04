/**
 * Headless runner for the data consistency validation.
 *
 * `src/assets/dataConsistency.ts` normally only runs in the browser, in dev mode
 * (imported by src/main.tsx). This script loads that exact module from the CLI so
 * content errors — a relatedProjects pointing at a missing project, a getSkill()
 * label typo — are caught without opening a browser. Type errors are already
 * covered by `npm run build`; these are the ones that compile fine and break at
 * runtime.
 *
 * Vite is used as the module loader: it transpiles the TypeScript, resolves image
 * imports to URLs and injects import.meta.env. No extra dependency, and no second
 * copy of the validation rules.
 *
 *   npm run validate
 */

import { createServer } from 'vite';

/**
 * @function run Load and execute validateData() through Vite's SSR module loader.
 * @returns Process exit code: 1 when at least one error was reported, else 0.
 */
const run = async () => {
  let server;

  try {
    server = await createServer({
      server: { middlewareMode: true },
      appType: 'custom',
      logLevel: 'error',
    });

    const module = await server.ssrLoadModule('/src/assets/dataConsistency.ts');
    const { errors, errorCount, warningCount } = module.validateData();

    if (errorCount > 0) {
      console.error(`\n✗ Data consistency: ${errorCount} error(s)\n`);
      errors.forEach((err) => console.error(`  ${err}`));
      console.error('');
      return 1;
    }

    console.log(`✓ Data consistency check passed (${warningCount} warning(s))`);
    return 0;
  } catch (error) {
    console.error('✗ Could not run the data validation:', error);
    return 1;
  } finally {
    if (server) await server.close();
  }
};

process.exit(await run());
