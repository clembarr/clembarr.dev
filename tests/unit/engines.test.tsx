import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useContext } from "react";
import { beforeEach, describe, expect, it } from "vitest";
import { LangContext, LangEngine } from "../../src/components/language";
import { ThemeContext, ThemeEngine } from "../../src/components/theme/ThemeEngine";
import { SearchContext, SearchEngine } from "../../src/components/search/SearchEngine";
import { RetexContext, RetexDisplayEngine } from "../../src/components/retex/RetexDisplayEngine";

/**
 * The four Engines hold everything the site renders from: the active language keys every
 * multilingual lookup, the theme keys every colour token and every themed asset, the
 * search state drives the projects listing, and the retex title is the only thing that
 * says whether the overlay is open. They are context providers with a side effect each,
 * and that side effect is what these assertions read.
 */

describe("LangEngine", () => {
    /**
     * @component LangProbe Render the active language and a control to change it.
     */
    const LangProbe = () => {
        const { currentLang, setCurrentLang } = useContext(LangContext);

        return (
            <>
                <span data-testid="lang"> {currentLang} </span>
                <button onClick={() => setCurrentLang("en")}> to english </button>
            </>
        );
    };

    it("starts on the stored language", () => {
        localStorage.setItem("lang", "fr");

        render(<LangEngine><LangProbe /></LangEngine>);

        expect(screen.getByTestId("lang")).toHaveTextContent("fr");
    });

    it("writes the language to local storage and to the document", async () => {
        localStorage.setItem("lang", "fr");

        render(<LangEngine><LangProbe /></LangEngine>);
        await userEvent.click(screen.getByRole("button"));

        expect(screen.getByTestId("lang")).toHaveTextContent("en");
        expect(localStorage.getItem("lang")).toBe("en");
        expect(document.documentElement.lang).toBe("en");
    });

    /** The lang attribute is what a screen reader and a translation tool read to pick a
     *  pronunciation. It is set by the engine alone, nothing else writes it. */
    it("keeps the document lang attribute in step", () => {
        localStorage.setItem("lang", "fr");

        render(<LangEngine><LangProbe /></LangEngine>);

        expect(document.documentElement.lang).toBe("fr");
    });
});

describe("ThemeEngine", () => {
    /**
     * @component ThemeProbe Render the active theme and a control to change it.
     */
    const ThemeProbe = () => {
        const { currentTheme, setCurrentTheme } = useContext(ThemeContext);

        return (
            <>
                <span data-testid="theme"> {currentTheme} </span>
                <button onClick={() => setCurrentTheme(currentTheme === "dark" ? "light" : "dark")}>
                    toggle
                </button>
            </>
        );
    };

    beforeEach(() => {
        document.documentElement.className = "";
    });

    it("defaults to light when nothing is stored", () => {
        render(<ThemeEngine><ThemeProbe /></ThemeEngine>);

        expect(screen.getByTestId("theme")).toHaveTextContent("light");
        expect(document.documentElement).toHaveClass("light");
    });

    it("starts on the stored theme", () => {
        localStorage.setItem("theme", "dark");

        render(<ThemeEngine><ThemeProbe /></ThemeEngine>);

        expect(document.documentElement).toHaveClass("dark");
    });

    /** The two classes drive two disjoint token sets. Both present at once would let the
     *  cascade decide the palette, which is not a decision the site makes anywhere. */
    it("never leaves both theme classes on the document at once", async () => {
        localStorage.setItem("theme", "light");

        render(<ThemeEngine><ThemeProbe /></ThemeEngine>);
        await userEvent.click(screen.getByRole("button"));

        expect(document.documentElement).toHaveClass("dark");
        expect(document.documentElement).not.toHaveClass("light");
    });

    it("persists the theme it switches to", async () => {
        render(<ThemeEngine><ThemeProbe /></ThemeEngine>);
        await userEvent.click(screen.getByRole("button"));

        expect(localStorage.getItem("theme")).toBe("dark");
    });
});

describe("SearchEngine", () => {
    /**
     * @component SearchProbe Render the current filters and a control to replace them.
     * @param terms - the terms the control commits when clicked
     */
    const SearchProbe = ({ terms }: { terms: string[] }) => {
        const { toMatch, updateSearch } = useContext(SearchContext);

        return (
            <>
                <span data-testid="terms"> {toMatch.join("|")} </span>
                <button onClick={() => updateSearch(terms)}> search </button>
            </>
        );
    };

    /**
     * @function renderSearch Mount a search probe under the language engine it depends on.
     * @param terms - the terms the probe commits when clicked
     */
    const renderSearch = (terms: string[]) =>
        render(<LangEngine><SearchEngine><SearchProbe terms={terms} /></SearchEngine></LangEngine>);

    it("starts on the catch-all filter", () => {
        renderSearch([]);

        expect(screen.getByTestId("terms")).toHaveTextContent("ALL");
    });

    it("drops duplicates", async () => {
        renderSearch(["Rust", "Rust", "Go"]);
        await userEvent.click(screen.getByRole("button"));

        expect(screen.getByTestId("terms")).toHaveTextContent("Rust|Go");
    });

    /** ALL means "no filter": keeping it beside a real term would widen the listing back
     *  to everything, and an empty result set would show every project instead of none. */
    it("drops the catch-all as soon as a real term is given", async () => {
        renderSearch(["ALL", "Rust"]);
        await userEvent.click(screen.getByRole("button"));

        expect(screen.getByTestId("terms")).toHaveTextContent("Rust");
        expect(screen.getByTestId("terms")).not.toHaveTextContent("ALL");
    });

    it("falls back to the catch-all rather than to an empty filter", async () => {
        renderSearch(["", "ALL"]);
        await userEvent.click(screen.getByRole("button"));

        expect(screen.getByTestId("terms")).toHaveTextContent("ALL");
    });

    /** A filter typed in one language means nothing in the other: the listing would show
     *  an empty result with no way to tell why. */
    it("resets its filters when the language changes", async () => {
        /**
         * @component LangAndSearch Expose both the language control and the filters.
         */
        const LangAndSearch = () => {
            const { setCurrentLang } = useContext(LangContext);
            const { toMatch, updateSearch } = useContext(SearchContext);

            return (
                <>
                    <span data-testid="terms"> {toMatch.join("|")} </span>
                    <button onClick={() => updateSearch(["Rust"])}> search </button>
                    <button onClick={() => setCurrentLang("en")}> to english </button>
                </>
            );
        };

        localStorage.setItem("lang", "fr");
        render(<LangEngine><SearchEngine><LangAndSearch /></SearchEngine></LangEngine>);

        await userEvent.click(screen.getByRole("button", { name: /search/i }));
        expect(screen.getByTestId("terms")).toHaveTextContent("Rust");

        await userEvent.click(screen.getByRole("button", { name: /to english/i }));
        expect(screen.getByTestId("terms")).toHaveTextContent("ALL");
    });
});

describe("RetexDisplayEngine", () => {
    /**
     * @component RetexProbe Render the displayed retex title and controls to set it.
     */
    const RetexProbe = () => {
        const { displayedRetexTitle, setDisplayedRetex } = useContext(RetexContext);

        return (
            <>
                <span data-testid="retex"> {displayedRetexTitle ?? "none"} </span>
                <button onClick={() => setDisplayedRetex("A Project")}> open </button>
                <button onClick={() => setDisplayedRetex(undefined)}> close </button>
            </>
        );
    };

    it("starts closed", () => {
        render(<RetexDisplayEngine><RetexProbe /></RetexDisplayEngine>);

        expect(screen.getByTestId("retex")).toHaveTextContent("none");
    });

    it("opens on a title and closes on undefined", async () => {
        render(<RetexDisplayEngine><RetexProbe /></RetexDisplayEngine>);

        await userEvent.click(screen.getByRole("button", { name: /open/i }));
        expect(screen.getByTestId("retex")).toHaveTextContent("A Project");

        await userEvent.click(screen.getByRole("button", { name: /close/i }));
        expect(screen.getByTestId("retex")).toHaveTextContent("none");
    });

    /** The overlay has no URL of its own, so this title is the whole of its state: any
     *  consumer reading it out of step would render a retex nobody asked for. */
    it("exposes the same title to every consumer", async () => {
        /**
         * @component TwoConsumers Read the retex title from two separate consumers.
         */
        const TwoConsumers = () => (
            <>
                <RetexProbe />
                <SecondProbe />
            </>
        );

        /**
         * @component SecondProbe Read the retex title from a sibling consumer.
         */
        const SecondProbe = () => {
            const { displayedRetexTitle } = useContext(RetexContext);

            return <span data-testid="mirror"> {displayedRetexTitle ?? "none"} </span>;
        };

        render(<RetexDisplayEngine><TwoConsumers /></RetexDisplayEngine>);

        await act(async () => {
            await userEvent.click(screen.getByRole("button", { name: /open/i }));
        });

        expect(screen.getByTestId("mirror")).toHaveTextContent("A Project");
    });
});
