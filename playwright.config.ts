import { defineConfig, devices } from "@playwright/test";
import { execFileSync } from "node:child_process";

const PORT = 5175;

/**
 * @function findSystemChromium Locate a chromium already installed on this machine.
 * Playwright ships its own browsers, but those binaries are dynamically linked against
 * paths that do not exist on NixOS, where this site is developed: they install fine and
 * fail to start. On a runner the downloaded browser is the right one, so the lookup is
 * skipped under CI.
 * @returns the path to the system chromium, or undefined to let Playwright pick its own
 */
const findSystemChromium = (): string | undefined => {
    if (process.env.CI) return undefined;
    if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;

    try {
        return execFileSync("which", ["chromium"], { encoding: "utf8" }).trim();
    } catch {
        return undefined;
    }
};

/**
 * End to end configuration. The suite runs against the dev server rather than a preview
 * build on purpose: the service worker of the PWA caches across runs and would make a
 * failure depend on which test ran before.
 */
export default defineConfig({
    testDir: "./tests/e2e",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : [["list"]],

    use: {
        baseURL: `http://localhost:${PORT}`,
        trace: "on-first-retry",
        launchOptions: {
            executablePath: findSystemChromium(),
        },
    },

    projects: [
        {
            name: "desktop",
            use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
        },
        {
            name: "mobile",
            use: { ...devices["Pixel 5"] },
        },
    ],

    webServer: {
        command: `npm run dev -- --port ${PORT} --strictPort`,
        url: `http://localhost:${PORT}`,
        reuseExistingServer: !process.env.CI,
        timeout: 60_000,
    },
});
