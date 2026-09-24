import { ReactNode, useContext, useMemo } from "react";
import { Link, useNavigate } from "react-router";
import { coreImages } from "../../assets";
import { MediaType, NewsEvent, NewsEventKind, ProjectMedia } from "../../assets/dataTypes";
import { PROJECTS_LISTING_PERSPECTIVE, newsAllProjectsLink, newsSectionTitle } from "../../assets/constants";
import { getLatestNews } from "../../utils/newsUtils";
import { normalizeMedia, translate } from "../../utils/assetsUtils";
import { UNIVERSAL_LANG } from "../../utils/translationUtils";
import { formatBlogDate, handleMouseEnter, handleMouseLeave, handleMouseMove } from "../../utils/utils";
import styles from "../../style";
import { LangContext } from "../language";
import { ThemeContext } from "../theme/ThemeEngine";

/**
 * Type scale of the card text. Both follow the width available to one card, not the
 * width of the screen: the cards sit three abreast from md up, and stack full width
 * below it, so both dip at md and grow back on small screens. Title and body sit one
 * step apart at most, and level at times: here the hierarchy is carried by the single
 * weight gap the site uses everywhere, not by size.
 */
const titleScale = "2xl:text-sm xl:text-xs md:text-2xs sm:text-xs ss:text-xs text-2xs";
const bodyScale = "lg:text-2xs md:text-3xs text-2xs";

/**
 * The date is metadata, not text to read: it sits flat on the floor of the scale, and
 * relies on its case, its letter spacing and the insisting typeface to register.
 */
const dateScale = "text-3xs";

/**
 * @component News
 * @description News section of the home page. Shows the most recent contents, projects
 * and blog posts merged, all readable at once: each carries its cover, its date and its
 * title. Cards rotate towards the cursor the way the project cards do, and stand still
 * under reduced motion. Below md they stack vertically at full width and the Hephaistos
 * figure is dropped.
 */
const News = () => {
    const { currentLang } = useContext(LangContext);
    const { currentTheme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const isDark = currentTheme === "dark";
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTilted = !prefersReducedMotion;

    const events = useMemo(() => getLatestNews(), []);

    /**
     * @function renderMedia Render a cover, keeping videos as videos unless motion is reduced.
     * @param media - The normalized cover of the event
     * @param title - Title of the event, used as the image alternative text
     * @returns The cover element
     */
    const renderMedia = (media: ProjectMedia, title: string) => {
        const mediaStyle = `
            ${styles.sizeFull}
            object-cover object-top
            ${isDark ? "opacity-90 group-hover:opacity-100" : "opacity-100"}
            transition-opacity duration-300 ease-out
        `;

        if (media.type === MediaType.VIDEO) {
            return (
                <video
                    src={media.url}
                    poster={media.poster}
                    muted
                    loop
                    playsInline
                    autoPlay={!prefersReducedMotion}
                    className={mediaStyle}
                />
            );
        }

        return (
            <img
                src={media.url}
                alt={media.alt || title}
                loading="lazy"
                className={mediaStyle}
            />
        );
    }

    /**
     * @function renderAction Wrap a card body into the element that carries its action.
     * The two content types are reached differently: a post is a route of its own, while
     * a project is handed to the projects page, which is where the retex viewer lives —
     * it opens there once that page is rendered. Both are real interactive elements so
     * the card stays reachable with a keyboard.
     * @param event - The news event the card stands for
     * @param body - The card content to wrap
     * @returns The actionable element wrapping the body
     */
    const renderAction = (event: NewsEvent, body: ReactNode) => {
        const actionStyle = `
            ${styles.flexCol}
            ${styles.sizeFull}
            p-0!
            text-left
            cursor-pointer
        `;

        if (event.kind === NewsEventKind.POST) {
            return (
                <Link to={`/blog/${event.source.slug}`} className={actionStyle}>
                    {body}
                </Link>
            );
        }

        return (
            <button
                type="button"
                className={actionStyle}
                onClick={() => navigate(newsAllProjectsLink.link as string, {
                    state: {
                        retexTitle: event.source.title[currentLang]
                            || event.source.title[UNIVERSAL_LANG],
                    },
                })}
            >
                {body}
            </button>
        );
    }

    /**
     * @function renderEvent Render one news card: cover, date, title and lead.
     * @param event - The news event to display
     * @param index - Position of the card in the row
     * @returns The card element
     */
    const renderEvent = (event: NewsEvent, index: number) => {
        const title = translate(event.source.title, currentLang);
        const media = normalizeMedia(event.source.coverImage || coreImages.placeholder_retex_image);

        const body = (<>
                    <div id={`news-event-${index}-cover`}
                        className={`
                            m-[6%]
                            mb-0
                            2xl:h-32 xl:h-28 lg:h-24 md:h-20 sm:h-36 ss:h-32 h-28
                            overflow-hidden
                            shrink-0
                        `}
                    >
                        {renderMedia(media, title)}
                    </div>

                    <div id={`news-event-${index}-body`}
                        className={`
                            ${styles.flexCol}
                            grow
                            px-[8%]
                            2xl:py-5 xl:py-4 md:py-3.5 py-4
                            2xl:space-y-3 space-y-2
                        `}
                    >
                        <time
                            dateTime={event.source.date.toISOString()}
                            className={`
                                font-primary-regular
                                ${dateScale}
                                uppercase tracking-wider
                                text-(--color-quaternary)/60
                                whitespace-nowrap
                            `}
                        > {formatBlogDate(event.source.date, currentLang)} </time>

                        <h3 className={`
                                font-primary-bold
                                ${titleScale}
                                leading-snug
                                text-(--color-quaternary)
                                group-hover:text-(--color-tertiary)
                                transition-colors duration-300 ease-out
                                wrap-break-word
                            `}
                        > {title} </h3>

                        <p className={`
                                font-primary-regular
                                ${bodyScale}
                                leading-[150%]
                                text-(--color-quaternary)/80
                                line-clamp-3
                                wrap-break-word
                            `}
                        > {translate(event.source.description, currentLang)} </p>
                    </div>
        </>);

        return (
            <li key={`news-event-${index}`}
                className={`
                    md:flex-1 w-full
                    min-w-0
                `}
            >
                <div id={`news-event-${index}-card`}
                    className={`
                        group
                        ${styles.flexCol}
                        ${styles.sizeFull}
                        rounded-md
                        overflow-hidden
                        relative
                        ${styles.easeOutTransition}
                        bg-(--color-surface)
                        border border-(--color-border)
                        shadow-(--shadow-card)
                        hover:shadow-(--shadow-card-hover)
                        ${isDark
                            ? "hover:border-(--color-tertiary)/30"
                            : "hover:border-(--color-border-strong)"
                        }
                    `}
                    style={isTilted ? { transformStyle: "preserve-3d" } : undefined}
                    onMouseEnter={isTilted ? (e) => handleMouseEnter(e.currentTarget) : undefined}
                    onMouseMove={isTilted ? (e) => handleMouseMove(e, e.currentTarget) : undefined}
                    onMouseLeave={isTilted ? (e) => handleMouseLeave(e.currentTarget) : undefined}
                >
                    <span
                        className={`
                            absolute
                            top-0 left-0 right-0
                            h-0.75
                            z-10
                            bg-linear-to-r from-(--color-tertiary)/0 via-(--color-tertiary) to-(--color-tertiary)/0
                            opacity-0 group-hover:opacity-100
                            transition-opacity duration-300 ease-out
                            ${isDark ? "shadow-(--glow-md)" : ""}
                        `}
                    />

                    {renderAction(event, body)}
                </div>
            </li>
        );
    }

    return (
        <section id="news"
            className={`
                relative
                w-full h-fit
                ${styles.flexRow}
                ${styles.contentCenter}
                lg:space-x-[2%]
            `}
        >

            <div id="news-cards-container"
                className={`
                    ${styles.flexCol}
                    lg:w-[72%] w-full
                    h-fit
                `}
            >
                <h2 className={`
                        font-secondary-semibold
                        2xl:text-md xl:text-sm md:text-xs text-2xs
                        text-(--color-quaternary)/60
                    `}
                > {translate(newsSectionTitle, currentLang)} </h2>

                <ul id="news-cards-list"
                    className={`
                        ${styles.flexColToRowAtMd}
                        items-stretch
                        w-full h-fit
                        2xl:gap-4 xl:gap-3.5 md:gap-3 gap-5
                        2xl:mt-12 xl:mt-10 md:mt-8 mt-7
                    `}
                    style={isTilted ? { perspective: PROJECTS_LISTING_PERSPECTIVE } : undefined}
                >
                    {events.map((event: NewsEvent, index: number) => renderEvent(event, index))}
                </ul>

                <Link to={newsAllProjectsLink.link as string}
                    className={`
                        ${styles.animatedLink}
                        2xl:text-md xl:text-sm md:text-sm text-xs
                        self-start
                        2xl:mt-6 xl:mt-5 md:mt-4 mt-4
                    `}
                >
                    <span aria-hidden="true"> → </span>
                    <span> {translate(newsAllProjectsLink.content, currentLang)} </span>
                </Link>
            </div>

            <div id="image-container"
                className={`
                    lg:w-[26%] h-full
                    ${styles.hiddenToFlexColAtLg}
                    ${styles.contentCenter}
                    relative
                    overflow-y-visible
                `}
            >
                <div id="figure-wrapper"
                    className={`
                        absolute
                        left-1/2 -translate-x-1/2
                        2xl:w-[96%] xl:w-[100%] w-[100%]
                    `}
                >
                    <img id="hephaistos-statue"
                        src={coreImages.hephaistos.content[currentTheme]}
                        alt={coreImages.hephaistos.alt}
                        className={`relative w-full object-contain`}
                    />
                </div>
            </div>
        </section>
    );
};

export default News;
