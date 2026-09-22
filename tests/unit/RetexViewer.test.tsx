import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactNode, useContext, useEffect } from "react";
import { describe, expect, it, vi } from "vitest";
import RetexViewer from "../../src/components/retex/RetexViewer";
import { RetexContext, RetexDisplayEngine } from "../../src/components/retex/RetexDisplayEngine";
import { LangEngine } from "../../src/components/language";
import { ThemeEngine } from "../../src/components/theme/ThemeEngine";
import { projects } from "../../src/assets/projects";
import { translate, UNIVERSAL_LANG } from "../../src/utils/translationUtils";

/**
 * The gallery button follows one rule: a project with several media gets a button onto
 * the gallery, a project with a single one gets that media shown instead. Placement is
 * left to the end to end suite, which has a layout engine; what is checked here is the
 * branch React takes, and the keyboard contract around it.
 */

/**
 * @component OpenRetex Open the viewer on a given project as soon as it is mounted.
 * @param title - the project title the viewer should display
 * @param children - the viewer and anything else under the context
 */
const OpenRetex = ({ title, children }: { title: string; children: ReactNode }) => {
    const { setDisplayedRetex } = useContext(RetexContext);

    useEffect(() => {
        setDisplayedRetex(title);
    }, [title, setDisplayedRetex]);

    return <>{children}</>;
};

/**
 * @function renderRetex Mount the viewer on one project, under the engines it consumes.
 * @param title - the project title to open, or undefined to leave it closed
 */
const renderRetex = (title?: string) =>
    render(
        <LangEngine>
            <ThemeEngine>
                <RetexDisplayEngine>
                    {title
                        ? <OpenRetex title={title}><RetexViewer /></OpenRetex>
                        : <RetexViewer />}
                </RetexDisplayEngine>
            </ThemeEngine>
        </LangEngine>
    );

/**
 * @function titleOf Read the key the viewer matches a project on. Not every project
 * declares a universal title — one whose name is genuinely translated carries fr and en
 * only — so the lookup goes through the same fallback the viewer itself uses.
 * @param project - the project to read
 * @returns the title the viewer resolves for this project
 */
const titleOf = (project: typeof projects[number]) => translate(project.title, UNIVERSAL_LANG);

const multiMedia = projects.find((project) => (project.content.images?.length ?? 0) > 1)!;
const singleMedia = projects.find((project) => project.content.images?.length === 1);

describe("RetexViewer", () => {
    it("renders nothing while no retex is selected", () => {
        const { container } = renderRetex();

        expect(container).toBeEmptyDOMElement();
    });

    it("warns and renders nothing for a title no project carries", () => {
        const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

        const { container } = renderRetex("Not A Project");

        expect(warn).toHaveBeenCalledWith(expect.stringContaining("Not A Project"));
        expect(container).toBeEmptyDOMElement();
    });

    it("opens on the project whose universal title matches", () => {
        renderRetex(titleOf(multiMedia));

        expect(document.getElementById(`retex-${titleOf(multiMedia)}`)).toBeInTheDocument();
        expect(document.getElementById("retex-content")).toBeInTheDocument();
    });
});

describe("gallery button", () => {
    it("is rendered and enabled for a project with several media", () => {
        renderRetex(titleOf(multiMedia));

        const button = document.getElementById("retex-gallery-button");

        expect(button).toBeInTheDocument();
        expect(button).toBeEnabled();
    });

    it("gives way to the media itself when the project has a single one", () => {
        if (!singleMedia) return;

        renderRetex(titleOf(singleMedia));

        expect(document.getElementById("retex-gallery-button")).not.toBeInTheDocument();
        expect(document.querySelectorAll("#retex-gallery-preview img, #retex-gallery-preview video"))
            .toHaveLength(1);
    });

    it("opens the gallery when activated", async () => {
        renderRetex(titleOf(multiMedia));

        await userEvent.click(document.getElementById("retex-gallery-button")!);

        expect(document.getElementById("retex-gallery-container")).toBeInTheDocument();
        expect(document.getElementById("retex-gallery-button")).not.toBeInTheDocument();
    });

    /** No inline style may be left on the button: the JS placement it used to carry was
     *  measured during the page transition and put the button outside its clipping
     *  parent, which is how it came to be invisible when reached from the news feed. */
    it("carries no inline positioning, which is what the centring bug was made of", () => {
        renderRetex(titleOf(multiMedia));

        const button = document.getElementById("retex-gallery-button")!;

        expect(button.style.top).toBe("");
        expect(button.style.left).toBe("");
    });
});

describe("keyboard", () => {
    it("closes the retex on Escape", async () => {
        renderRetex(titleOf(multiMedia));
        expect(document.getElementById("retex-content")).toBeInTheDocument();

        await userEvent.keyboard("{Escape}");

        expect(document.getElementById("retex-content")).not.toBeInTheDocument();
    });

    /** Escape has two meanings depending on what is open. From the gallery it steps back
     *  to the retex rather than closing everything at once. */
    it("steps back from the gallery to the retex on Escape", async () => {
        renderRetex(titleOf(multiMedia));

        await userEvent.click(document.getElementById("retex-gallery-button")!);
        expect(document.getElementById("retex-gallery-container")).toBeInTheDocument();

        await userEvent.keyboard("{Escape}");

        // Closing the gallery is deferred by 50 ms, to keep the keydown that closes it
        // from racing the keyup that would close the retex behind it.
        await waitFor(() => {
            expect(document.getElementById("retex-gallery-container")).not.toBeInTheDocument();
        });

        expect(document.getElementById("retex-content")).toBeInTheDocument();
    });
});
