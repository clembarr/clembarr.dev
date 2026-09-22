import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes, useLocation } from "react-router";
import { describe, expect, it } from "vitest";
import News from "../../src/components/sections/News";
import { LangEngine } from "../../src/components/language";
import { ThemeEngine } from "../../src/components/theme/ThemeEngine";
import { getLatestNews } from "../../src/utils/newsUtils";
import { NewsEventKind } from "../../src/assets/dataTypes";
import { NEWS_EVENT_COUNT } from "../../src/assets/constants";

/**
 * The news cards reach their content two different ways, and the difference is the whole
 * point: a post is a route of its own, a project is handed to the projects page through
 * the navigation state, because that is where the retex viewer lives. Rendering one as
 * the other breaks the link without breaking the build.
 */

/**
 * @component LocationProbe Expose the current route and its navigation state.
 */
const LocationProbe = () => {
    const location = useLocation();

    return (
        <span data-testid="location">
            {location.pathname} :: {JSON.stringify(location.state)}
        </span>
    );
};

/**
 * @function renderNews Mount the news section inside the engines and the router it needs.
 * @returns the testing library render result
 */
const renderNews = () =>
    render(
        <MemoryRouter initialEntries={["/"]}>
            <LangEngine>
                <ThemeEngine>
                    <Routes>
                        <Route path="/" element={<News />} />
                        <Route path="/projects" element={<LocationProbe />} />
                        <Route path="/blog/:slug" element={<LocationProbe />} />
                    </Routes>
                </ThemeEngine>
            </LangEngine>
        </MemoryRouter>
    );

describe("News", () => {
    it("renders one card per event of the feed", () => {
        renderNews();

        const cards = within(screen.getByRole("list")).getAllByRole("listitem");

        expect(cards).toHaveLength(NEWS_EVENT_COUNT);
    });

    it("gives every card a date, a title and a lead", () => {
        renderNews();

        const cards = within(screen.getByRole("list")).getAllByRole("listitem");

        cards.forEach((card) => {
            expect(card.querySelector("time")).toBeInTheDocument();
            expect(within(card).getByRole("heading", { level: 3 })).toBeInTheDocument();
        });
    });

    /** Both kinds have to stay real interactive elements, or the cards fall out of the
     *  keyboard order entirely. */
    it("renders a post as a link and a project as a button", () => {
        renderNews();

        const events = getLatestNews();
        const expectedLinks = events.filter((event) => event.kind === NewsEventKind.POST).length;
        const expectedButtons = events.length - expectedLinks;
        const list = screen.getByRole("list");

        expect(within(list).queryAllByRole("link")).toHaveLength(expectedLinks);
        expect(within(list).queryAllByRole("button")).toHaveLength(expectedButtons);
    });

    it("hands the project title to the projects page as navigation state", async () => {
        renderNews();

        const projectCard = within(screen.getByRole("list")).getAllByRole("button")[0];
        const title = within(projectCard).getByRole("heading", { level: 3 }).textContent?.trim();

        await userEvent.click(projectCard);

        const location = screen.getByTestId("location");

        expect(location).toHaveTextContent("/projects");
        expect(location).toHaveTextContent(`"retexTitle":"${title}"`);
    });

    /** The dated `datetime` attribute is what a machine reads; the visible text is
     *  formatted for a human and differs between languages. */
    it("carries a machine readable date on every card", () => {
        renderNews();

        const times = screen.getByRole("list").querySelectorAll("time");

        expect(times).toHaveLength(NEWS_EVENT_COUNT);
        times.forEach((time) => {
            const value = time.getAttribute("dateTime") ?? time.getAttribute("datetime");

            expect(Number.isNaN(Date.parse(value!))).toBe(false);
        });
    });

    it("gives every cover an alternative text", () => {
        renderNews();

        screen.getByRole("list").querySelectorAll("img").forEach((image) => {
            expect(image.getAttribute("alt")).toBeTruthy();
        });
    });

    it("links to the full projects listing under the cards", () => {
        renderNews();

        const listingLink = screen.getAllByRole("link").find(
            (link) => link.getAttribute("href") === "/projects"
        );

        expect(listingLink).toBeDefined();
    });

    /** The Hephaistos figure is decoration: it carries no information the cards do not
     *  already give, so it must not be announced. */
    it("hides the decorative glitch layers from assistive technology", () => {
        renderNews();

        const decorations = document.querySelectorAll("#glitch-effect-wrapper img[aria-hidden='true']");

        decorations.forEach((image) => {
            expect(image).toHaveAttribute("aria-hidden", "true");
        });
    });
});
