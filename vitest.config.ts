import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

/**
 * Vitest runs on a config of its own rather than on vite.config.ts: the PWA and Tailwind
 * plugins have nothing to do in a test run, and the service worker would be rebuilt on
 * every watch pass. Asset imports still resolve — Vite handles those natively, which is
 * what lets a test import the content layer and its images.
 *
 * jsdom is the default environment because utils.ts mixes pure functions with DOM ones in
 * a single module: splitting the environment per file would only move the seam.
 */
export default defineConfig({
    plugins: [react()],
    test: {
        environment: "jsdom",
        setupFiles: ["./tests/setup.ts"],
        include: ["tests/unit/**/*.test.{ts,tsx}"],
        restoreMocks: true,
    },
});
