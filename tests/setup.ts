import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

/**
 * jsdom implements no media query engine and no layout, which several components read on
 * their first render: PageTransition and News ask for prefers-reduced-motion at module
 * scope, and every breakpoint-aware helper calls matchMedia. Without a stand-in they
 * throw before a single assertion runs, so the default here is a viewport that matches
 * nothing — each test widens it when the case calls for one.
 */
if (!window.matchMedia) {
    Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: (query: string) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: () => {},
            removeListener: () => {},
            addEventListener: () => {},
            removeEventListener: () => {},
            dispatchEvent: () => false,
        }),
    });
}

/** Framer Motion and several sections observe their own size; jsdom ships neither. */
if (!window.ResizeObserver) {
    window.ResizeObserver = class {
        observe() {}
        unobserve() {}
        disconnect() {}
    };
}

if (!window.IntersectionObserver) {
    window.IntersectionObserver = class {
        readonly root = null;
        readonly rootMargin = "";
        readonly thresholds = [];
        observe() {}
        unobserve() {}
        disconnect() {}
        takeRecords() {
            return [];
        }
    } as unknown as typeof IntersectionObserver;
}

/** RetexViewer defers its first measurement to document.fonts.ready; jsdom has no font
 *  loading API at all, and reaching for it throws before the component renders. */
if (!document.fonts) {
    Object.defineProperty(document, "fonts", {
        writable: true,
        value: { ready: Promise.resolve() },
    });
}

/** jsdom implements no innerText, and adjustFontSize reads it unguarded: its `|| 0`
 *  fallback runs after the property access, so it catches an empty string and not an
 *  absent property. Mapped onto textContent, which is close enough for a layout-free
 *  environment where every measurement comes back zero anyway. */
if (!Object.getOwnPropertyDescriptor(HTMLElement.prototype, "innerText")) {
    Object.defineProperty(HTMLElement.prototype, "innerText", {
        configurable: true,
        get() {
            return this.textContent ?? "";
        },
        set(value: string) {
            this.textContent = value;
        },
    });
}

afterEach(() => {
    cleanup();
    localStorage.clear();
    vi.unstubAllGlobals();
});
