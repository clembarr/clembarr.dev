import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, describe, expect, it } from "vitest";
import Footer from "../../src/components/Footer";
import Credits from "../../src/pages/Credits";
import { LangEngine } from "../../src/components/language";
import { ThemeEngine } from "../../src/components/theme/ThemeEngine";
import { creditsMentions, FOOTER_SEE_ALSO_COUNT } from "../../src/assets/constants";
import { sharedLinks } from "../../src/assets/contents";

/**
 * The credits left the footer for a page of their own: the footer only keeps a link to
 * it, and the page is now the one place that lists every credited asset. The footer
 * picks its navigation column from the pathname by string, so a route that no pattern
 * names — the credits page is one — has to fall back on the home links rather than
 * render an empty column.
 */

/**
 * @function mount Render a tree inside the router and the engines it depends on.
 * @param node - The tree to render
 * @returns the testing library render result
 */
const mount = (node: React.ReactNode) =>
    render(
        <MemoryRouter>
            <LangEngine>
                <ThemeEngine>{node}</ThemeEngine>
            </LangEngine>
        </MemoryRouter>
    );

afterEach(() => window.history.pushState({}, "", "/"));

describe("Footer", () => {
    it("no longer lists the credits itself", () => {
        mount(<Footer />);

        expect(document.getElementById("credits-container")).toBeNull();
    });

    it("links to the credits page", () => {
        mount(<Footer />);

        const footer = document.getElementById("footer")!;
        expect(within(footer).getAllByRole("link").some((link) => link.getAttribute("href") === "/credits")).toBe(true);
    });

    /** The see-also row used to copy the length of the navigation row, which grows with
     *  the menu. It is capped on its own now, whatever the route. */
    it("caps the see-also row", () => {
        mount(<Footer />);

        const seeAlso = document.getElementById("see-also-container")!;
        expect(within(seeAlso).getAllByRole("link")).toHaveLength(Math.min(FOOTER_SEE_ALSO_COUNT, sharedLinks.length));
    });

    it("falls back on the home navigation on a route no pattern names", () => {
        window.history.pushState({}, "", "/credits");

        mount(<Footer />);

        const navigation = document.getElementById("navigation-container")!;
        expect(within(navigation).getAllByRole("link").length).toBeGreaterThan(0);
    });
});

describe("Credits", () => {
    it("lists every credit as an external link", () => {
        mount(<Credits />);

        const list = screen.getByRole("list");
        const links = within(list).getAllByRole("link");

        expect(links).toHaveLength(creditsMentions.length);
        links.forEach((link) => {
            expect(link).toHaveAttribute("target", "_blank");
            expect(link.getAttribute("rel")).toContain("noopener");
        });
    });
});
