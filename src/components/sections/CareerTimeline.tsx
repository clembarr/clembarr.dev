import { ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import DOMPurify from "dompurify";
import { careerFigure } from "../../assets/illustrations";
import { careerTimeline } from "../../assets/contents";
import { careerSectionLabels } from "../../assets/constants";
import { CareerEntry, CareerEntryType } from "../../assets/dataTypes";
import { translate } from "../../utils/assetsUtils";
import styles from "../../style";
import { LangContext } from "../language";
import { ThemeContext } from "../theme/ThemeEngine";
import { SwipeIndicator } from "../widgets";

/**
 * French month prefixes, accent-free and lowercase, paired with their zero-based index.
 * "juin" and "juil" are spelled to four letters so they cannot shadow each other.
 */
const MONTH_PREFIXES: Array<[string, number]> = [
    ["janv", 0],
    ["fevr", 1],
    ["mars", 2],
    ["avr", 3],
    ["mai", 4],
    ["juin", 5],
    ["juil", 6],
    ["aout", 7],
    ["sept", 8],
    ["oct", 9],
    ["nov", 10],
    ["dec", 11],
];

/**
 * Tags that name the nature of an entry rather than one of its topics. They wear the
 * amber code of the type badge (`--color-xp-type`), so the nature still reads at a glance
 * now that the column, not a badge, carries the type.
 */
const NATURE_TAGS = new Set([
    "alternance", "apprenticeship",
    "stage", "internship",
    "benevolat", "volunteering",
]);

/**
 * @function isNatureTag Tell whether a tag names the nature of the entry.
 * @param tag - The tag as written in the content layer
 * @returns true when the tag belongs to the nature vocabulary
 */
const isNatureTag = (tag: string): boolean =>
    NATURE_TAGS.has(tag.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase());

/**
 * @function toMonthIndex Turn one bound of a period ("Sept. 2026", "2022") into an
 * absolute month index, so two bounds can be compared and sorted.
 * @param bound - One line of the French period string
 * @returns year * 12 + month, or null when no year can be read. A bare year is January
 */
const toMonthIndex = (bound: string): number | null => {
    const year = bound.match(/\d{4}/);
    if (!year) return null;

    const normalized = bound
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    const month = MONTH_PREFIXES.find(([prefix]) => normalized.includes(prefix));

    return parseInt(year[0], 10) * 12 + (month ? month[1] : 0);
};

/**
 * @function readStart Read the month an entry starts on. The French period is read
 * whatever the active language: it is the stable key of the content layer.
 * @param entry - The career entry to read
 * @returns The absolute month index of the earliest bound, or 0 when none can be read
 */
const readStart = (entry: CareerEntry): number => {
    const bounds = entry.period["fr"]
        .split("\n")
        .map(toMonthIndex)
        .filter((month): month is number => month !== null);

    return bounds.length ? Math.min(...bounds) : 0;
};

/**
 * @function readRange Format the whole period of an entry as a single inline interval.
 * @param entry - The career entry to read
 * @param lang - The active language, so the interval reads in the displayed language
 * @returns "Sept 2026 – Août 2029", or the single bound when the entry is a point in time
 */
const readRange = (entry: CareerEntry, lang: string): string => {
    const bounds = entry.period[lang].split("\n").map((bound) => bound.trim()).filter(Boolean);

    return bounds.length > 1 ? `${bounds[0]} – ${bounds[bounds.length - 1]}` : bounds[0] ?? "";
};


/** @constant TRACK_WIDTH Width (px) of the timeline track standing left of each column. */
const TRACK_WIDTH = 44;

/** @constant TRACK_OFFSET Drop (px) of the track below the top of the first card. */
const TRACK_OFFSET = 12;

/** One year on a column track, and the span its cards cover in the scrolled content (px). */
type YearTick = {
    year: number;
    top: number;
    bottom: number;
};

/** What the track needs to know about its scroll container, read on every scroll. */
type ScrollMetrics = {
    scrollTop: number;
    clientHeight: number;
    scrollHeight: number;
    ticks: YearTick[];
};

/**
 * @component CareerColumn
 * @description One nature of the career, scrolled on its own. The native scrollbar is
 * hidden and replaced by the column timeline: each year faces its first card and scrolls
 * with it, lighting up while one of its cards is in view, and a thumb running on the axis
 * tells where the column stands. The thumb can be dragged and the rail clicked, the
 * wheel, touch and keyboard keep scrolling the column natively.
 * @param name - Nature name, used to build the ids
 * @param label - Column label, already translated
 * @param entries - Entries of that nature, newest first
 * @param renderCard - Card renderer of the section, so both columns share one card
 * @param smooth - false under prefers-reduced-motion: a click on the track then jumps
 */
const CareerColumn = ({ name, label, entries, renderCard, smooth }: {
    name: string;
    label: string;
    entries: CareerEntry[];
    renderCard: (entry: CareerEntry, id: string) => ReactNode;
    smooth: boolean;
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const drag = useRef<{ y: number; scrollTop: number } | null>(null);
    const [metrics, setMetrics] = useState<ScrollMetrics>({ scrollTop: 0, clientHeight: 0, scrollHeight: 1, ticks: [] });

    /**
     * @function measure Read the scroll state and the span covered by the cards of each
     * year. Cheap enough to run on every scroll: a column holds a handful of cards.
     */
    const measure = useCallback(() => {
        const scroller = scrollRef.current;
        if (!scroller) return;

        const ticks: YearTick[] = [];
        entries.forEach((entry, i) => {
            const year = Math.floor(readStart(entry) / 12);
            const card = scroller.querySelector<HTMLElement>(`#career-${name}-${i}`);
            if (!card) return;

            const bottom = card.offsetTop + card.offsetHeight;
            const tick = ticks.find((known) => known.year === year);
            if (tick) tick.bottom = Math.max(tick.bottom, bottom);
            else ticks.push({ year, top: card.offsetTop, bottom });
        });

        setMetrics({
            scrollTop: scroller.scrollTop,
            clientHeight: scroller.clientHeight,
            scrollHeight: scroller.scrollHeight,
            ticks,
        });
    }, [entries, name]);

    useEffect(() => {
        const scroller = scrollRef.current;
        if (!scroller) return;

        const observer = new ResizeObserver(measure);
        observer.observe(scroller);
        if (scroller.firstElementChild) observer.observe(scroller.firstElementChild);

        return () => observer.disconnect();
    }, [measure]);

    /**
     * @function jumpTo Center the column on the point of the track that was pressed.
     * @param event - The pointer event on the track
     */
    const jumpTo = (event: React.PointerEvent<HTMLDivElement>) => {
        const scroller = scrollRef.current;
        const track = trackRef.current;
        if (!scroller || !track) return;

        const rect = track.getBoundingClientRect();
        const target = (event.clientY - rect.top) / rect.height * scroller.scrollHeight - scroller.clientHeight / 2;
        scroller.scrollTo({ top: target, behavior: smooth ? "smooth" : "auto" });
    };

    const startDrag = (event: React.PointerEvent<HTMLSpanElement>) => {
        event.stopPropagation();
        event.currentTarget.setPointerCapture(event.pointerId);
        drag.current = { y: event.clientY, scrollTop: scrollRef.current?.scrollTop ?? 0 };
    };

    const moveDrag = (event: React.PointerEvent<HTMLSpanElement>) => {
        const scroller = scrollRef.current;
        const track = trackRef.current;
        if (!drag.current || !scroller || !track) return;

        // "instant": the global smooth scroll-behavior would make the column trail the pointer
        scroller.scrollTo({
            top: drag.current.scrollTop + (event.clientY - drag.current.y) * scroller.scrollHeight / track.clientHeight,
            behavior: "instant",
        });
    };

    const stopDrag = () => { drag.current = null; };

    const { scrollTop, clientHeight, scrollHeight, ticks } = metrics;
    const toPercent = (px: number) => `${px / scrollHeight * 100}%`;

    /** The rail, where the thumb runs, starts level with the first year at rest. */
    const railTop = (ticks[0]?.top ?? 0) + TRACK_OFFSET;
    const scrollable = scrollHeight > clientHeight + 1;

    return (
        <div id={`career-${name}-column`} className={`${styles.flexCol} min-w-0 min-h-0`}>
            <span id={`career-${name}-label`}
                style={{ paddingLeft: `${TRACK_WIDTH + 16}px` }}
                className={`
                    shrink-0
                    pb-2
                    font-secondary-semibold
                    text-3xs
                    uppercase tracking-widest
                    text-(--color-quaternary)/35
                `}
            > {label} </span>

            <div id={`career-${name}-body`} className={`${styles.flexRow} grow min-h-0 gap-4`}>
                <div id={`career-${name}-track`}
                    aria-hidden="true"
                    style={{ width: `${TRACK_WIDTH}px` }}
                    className={`relative shrink-0`}
                >
                    <span id={`career-${name}-axis`}
                        style={{ top: `${Math.max(0, railTop - scrollTop)}px` }}
                        className={`absolute bottom-0 right-1 w-px bg-(--color-tertiary)/25`}
                    />

                    <div id={`career-${name}-years`}
                        className={`
                            absolute inset-0
                            overflow-hidden
                            mask-[linear-gradient(to_bottom,transparent,black_4%,black_90%,transparent)]
                        `}
                    >
                        {ticks.map((tick) => {
                            const inView = tick.bottom > scrollTop && tick.top < scrollTop + clientHeight;

                            return (
                                <span key={`career-${name}-tick-${tick.year}`}
                                    id={`career-${name}-tick-${tick.year}`}
                                    style={{ top: `${tick.top + TRACK_OFFSET - scrollTop}px` }}
                                    className={`
                                        absolute right-0
                                        ${styles.flexRow}
                                        items-center gap-1.5
                                        -translate-y-1/2
                                        font-mono
                                        text-3xs
                                        ${inView ? "text-(--color-tertiary)" : "text-(--color-quaternary)/30"}
                                        ${smooth ? "transition-colors duration-300 ease-out" : ""}
                                    `}
                                >
                                    {tick.year}
                                    <span className={`
                                            w-[9px] h-[9px]
                                            rounded-full
                                            border border-(--color-tertiary)/60
                                            ${inView ? "bg-(--color-tertiary)" : "bg-(--color-secondary)"}
                                        `}
                                    />
                                </span>
                            );
                        })}
                    </div>

                    <div id={`career-${name}-rail`}
                        ref={trackRef}
                        onPointerDown={jumpTo}
                        style={{ top: `${railTop}px` }}
                        className={`
                            absolute bottom-0 right-0
                            w-[9px]
                            ${scrollable ? "cursor-pointer" : ""}
                        `}
                    >
                        {scrollable &&
                        <span id={`career-${name}-thumb`}
                            onPointerDown={startDrag}
                            onPointerMove={moveDrag}
                            onPointerUp={stopDrag}
                            onPointerCancel={stopDrag}
                            style={{ top: toPercent(scrollTop), height: toPercent(clientHeight) }}
                            className={`
                                absolute right-0
                                w-[9px]
                                ${styles.flexRow}
                                justify-center
                                touch-none
                                cursor-grab active:cursor-grabbing
                            `}
                        >
                            <span className={`w-[3px] h-full rounded-full bg-(--color-tertiary)/50`} />
                        </span>}
                    </div>
                </div>

                <div id={`career-${name}-scroll`}
                    ref={scrollRef}
                    role="list"
                    tabIndex={0}
                    aria-label={label}
                    onScroll={measure}
                    className={`
                        relative
                        grow min-w-0
                        overflow-y-auto
                        overflow-x-hidden
                        outline-none
                        mask-[linear-gradient(to_bottom,transparent,black_4%,black_90%,transparent)]
                        no-scrollbar
                    `}
                >
                    <div id={`career-${name}-cards`} className={`${styles.flexCol} gap-3 py-4 pb-[9vh]`}>
                        {entries.map((entry, i) => (
                            <div key={`career-${name}-item-${i}`} role="listitem">
                                {renderCard(entry, `career-${name}-${i}`)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

/**
 * @function byStartDesc Sort comparator putting the most recent start first.
 * @param a - First entry
 * @param b - Second entry
 * @returns A negative number when a started after b
 */
const byStartDesc = (a: CareerEntry, b: CareerEntry): number => readStart(b) - readStart(a);

/**
 * @component CareerTimeline
 * @description Career section read from left to right: the figure, then two columns
 * scrolled independently, experiences and education. Each column carries its own
 * timeline as its scrollbar, so the nature is told by the column and the date by the
 * track. Certifications leave the chronology for a flat band of tokens under the columns.
 * Below md the columns become one horizontal swipe, the band staying where it is.
 */
const CareerTimeline = () => {
    const { currentLang } = useContext(LangContext);
    const { currentTheme } = useContext(ThemeContext);

    const isDark = currentTheme === "dark";
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const transition = prefersReducedMotion ? "" : styles.easeOutTransition;

    const experiences = useMemo(
        () => careerTimeline
            .filter((entry) => entry.type !== CareerEntryType.CERTIFICATION && entry.type !== CareerEntryType.EDUCATION)
            .sort(byStartDesc),
        []
    );

    const education = useMemo(
        () => careerTimeline.filter((entry) => entry.type === CareerEntryType.EDUCATION).sort(byStartDesc),
        []
    );

    const swipeEntries = useMemo(() => [...experiences, ...education].sort(byStartDesc), [experiences, education]);

    const certifications = useMemo(
        () => careerTimeline.filter((entry) => entry.type === CareerEntryType.CERTIFICATION),
        []
    );

    /**
     * @function renderCard Render one entry as a card that breathes: the logo beside a
     * block holding title, organization and dates, then the full description, then the
     * tags. Nothing is clamped or truncated — this section is the only place these texts
     * are readable, so a card grows to fit rather than cutting its content.
     * @param entry - The career entry to display
     * @param id - Identifier of the card, unique across the section
     * @returns The card element
     */
    const renderCard = (entry: CareerEntry, id: string) => {
        const tags = entry.tags?.[currentLang] ?? [];

        return (
            <article key={id} id={id}
                className={`
                    group/card
                    relative
                    ${styles.flexCol}
                    h-full
                    rounded-md
                    px-4 py-3.5
                    bg-(--color-surface)
                    border border-(--color-border)
                    ${isDark
                        ? "hover:border-(--color-tertiary)/35"
                        : "hover:border-(--color-border-strong)"
                    }
                    ${transition}
                `}
            >
                <div id={`${id}-header`} className={`${styles.flexRow} items-start gap-3 min-w-0`}>
                    <div id={`${id}-identity`} className={`${styles.flexCol} grow min-w-0`}>
                        <p id={`${id}-title`}
                            className={`
                                font-primary-bold
                                2xl:text-base xl:text-sm text-xs
                                leading-snug
                                text-(--color-quaternary)
                                group-hover/card:text-(--color-tertiary)
                                wrap-break-word
                                ${transition}
                            `}
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(translate(entry.title, currentLang)) }}
                        />

                        <p id={`${id}-organization`}
                            className={`
                                mt-1
                                font-primary-semibold
                                2xl:text-xs xl:text-2xs text-2xs
                                leading-tight
                                text-(--color-quaternary)/70
                                wrap-break-word
                            `}
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(translate(entry.organization, currentLang)) }}
                        />

                        <span id={`${id}-range`}
                            className={`
                                mt-2
                                text-3xs
                                leading-tight
                                text-(--color-quaternary)/35
                            `}
                        > {readRange(entry, currentLang)} </span>
                    </div>

                    {entry.icon &&
                    <img id={`${id}-icon`}
                        src={entry.icon.content[currentTheme]}
                        alt={entry.icon.alt}
                        loading="lazy"
                        className={`2xl:w-11 xl:w-10 w-9 h-auto shrink-0 object-contain opacity-80`}
                    />}
                </div>

                <p id={`${id}-description`}
                    className={`
                        mt-3
                        font-primary-regular
                        text-2xs
                        leading-[165%]
                        text-(--color-quaternary)/55
                        wrap-break-word
                    `}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(translate(entry.description, currentLang)) }}
                />

                {tags.length > 0 &&
                <div id={`${id}-tags`} className={`${styles.flexRow} flex-wrap gap-1 mt-3`}>
                    {tags.map((tag, j) => (
                        <span key={`${id}-tag-${j}`} id={`${id}-tag-${j}`}
                            className={`
                                inline-flex items-center
                                px-1.5 py-px
                                rounded-full
                                font-primary-semibold
                                text-3xs
                                ${isNatureTag(tag)
                                    ? "bg-(--color-xp-type)/10 border border-(--color-xp-type)/25 text-(--color-xp-type)"
                                    : "bg-(--color-tertiary)/10 border border-(--color-tertiary)/20 text-(--color-tertiary)"
                                }
                                opacity-70 group-hover/card:opacity-100
                                ${transition}
                            `}
                        > {tag} </span>
                    ))}
                </div>}
            </article>
        );
    };

    return (
        <div id="career"
            className={`
                w-full
                h-[75vh]
                relative
                ${styles.flexCol}
                overflow-hidden
            `}
        >
            <div id="illustration-container"
                className={`
                    hidden lg:flex
                    absolute
                    ${isDark ?
                    `
                        top-40 lg:top-60 xl:top-40
                        -left-15 lg:left-0 xl:-left-15
                        opacity-100 lg:opacity-30 xl:opacity-100
                        max-w-lg
                        lg:w-80 xl:w-120 2xl:w-auto
                    `
                    :
                    `
                        top-20 lg:top-35 xl:top-20
                        left-0
                        opacity-95 lg:opacity-30 xl:opacity-95
                        max-w-100
                        lg:w-80 xl:w-90 2xl:w-auto
                    `
                }
                    ${styles.sizeFull}
                    ${styles.flexCol}
                `}
            >
                <img id="career-illustration"
                    src={careerFigure.content[currentTheme]}
                    alt={careerFigure.alt}
                    className={`object-cover w-full h-auto`}
                />
            </div>

            <div id="career-columns-view"
                className={`
                    hidden md:grid
                    grid-cols-2
                    2xl:gap-x-12 xl:gap-x-10 gap-x-8
                    grow min-h-0
                    lg:ml-30 xl:ml-[23vw]
                    mr-4
                `}
            >
                <CareerColumn
                    name="experience"
                    label={translate(careerSectionLabels.experience, currentLang)}
                    entries={experiences}
                    renderCard={renderCard}
                    smooth={!prefersReducedMotion}
                />

                <CareerColumn
                    name="education"
                    label={translate(careerSectionLabels.education, currentLang)}
                    entries={education}
                    renderCard={renderCard}
                    smooth={!prefersReducedMotion}
                />
            </div>

            <div id="career-horizontal-view"
                className={`
                    flex md:hidden
                    ${styles.flexCol}
                    w-full grow
                    min-h-0
                    pb-10
                    px-4
                `}
            >
                <div id="career-horizontal-scroll"
                    className={`
                        flex
                        w-full grow min-h-0
                        items-center
                        overflow-x-auto
                        snap-x snap-mandatory
                        no-scrollbar
                        gap-4
                    `}
                >
                    {swipeEntries.map((entry, index) => (
                        <div key={`career-swipe-${index}`}
                            id={`career-swipe-${index}`}
                            className={`
                                snap-center shrink-0
                                xs:w-[66vw] w-[72vw]
                                max-w-[300px]
                                ${styles.flexCol}
                                gap-2
                            `}
                        >
                            <div id={`career-swipe-marker-${index}`} className={`${styles.flexRow} items-center gap-3`}>
                                <span className={`text-3xs text-(--color-tertiary)`}>
                                    {translate(entry.period, currentLang).split("\n")[0]}
                                </span>
                                <span className={`grow h-px bg-(--color-tertiary)/20`} />
                                <span className={`w-2 h-2 rounded-full bg-(--color-tertiary)`} />
                            </div>

                            {renderCard(entry, `career-swipe-card-${index}`)}
                        </div>
                    ))}
                </div>

                <SwipeIndicator
                    bottomClass="bottom-1"
                    animationName="swipe-hint"
                />
            </div>

            <div id="career-certifications-band"
                className={`
                    shrink-0
                    ${styles.flexRow}
                    items-center
                    gap-2
                    md:px-0 px-4
                    lg:ml-30 xl:ml-[23vw]
                    md:mr-4
                    2xl:mt-12 xl:mt-10 mt-8
                    md:flex-wrap flex-nowrap
                    md:overflow-visible overflow-x-auto
                    no-scrollbar
                `}
            >
                <span id="career-certifications-label"
                    className={`
                        shrink-0
                        mr-5
                        font-secondary-semibold
                        text-3xs
                        uppercase tracking-widest
                        text-(--color-quaternary)/35
                    `}
                > {translate(careerSectionLabels.certifications, currentLang)} </span>

                {certifications.map((entry, index) => (
                    <span key={`career-certification-${index}`}
                        id={`career-certification-${index}`}
                        tabIndex={0}
                        className={`
                            ${styles.tag}
                            group/token
                            relative
                            shrink-0
                            gap-1.5
                            text-3xs
                            outline-none
                            ${isDark ? "hover:shadow-(--glow-sm)" : "hover:border-(--color-tertiary)/40"}
                            ${transition}
                        `}
                    >
                        {entry.icon &&
                        <img src={entry.icon.content[currentTheme]}
                            alt={entry.icon.alt}
                            loading="lazy"
                            className={`w-3.5 h-auto object-contain opacity-80`}
                        />}

                        {translate(entry.title, currentLang)}

                        <span className={`opacity-60`}>
                            {readRange(entry, currentLang)}
                        </span>

                        <span id={`career-certification-detail-${index}`}
                            className={`
                                absolute bottom-full left-0 mb-2
                                w-96 max-w-[80vw]
                                ${styles.flexCol}
                                gap-1.5
                                p-4
                                rounded-md
                                text-left
                                text-(length:--base-font-size)
                                bg-(--color-surface)
                                border border-(--color-tertiary)/20
                                ${isDark ? "shadow-(--glow-sm)" : "shadow-lg"}
                                opacity-0 pointer-events-none
                                group-hover/token:opacity-100
                                group-focus/token:opacity-100
                                ${transition}
                            `}
                        >
                            <span className={`font-primary-semibold text-[75%] text-(--color-quaternary)/80`}>
                                {translate(entry.organization, currentLang)}
                            </span>

                            <span className={`
                                    font-primary-regular
                                    text-[70%]
                                    leading-[160%]
                                    text-(--color-quaternary)/70
                                `}
                            >
                                {translate(entry.description, currentLang)}
                            </span>
                        </span>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default CareerTimeline;
