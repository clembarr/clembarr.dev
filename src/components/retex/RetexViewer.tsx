import { projects } from "../../assets/contents";
import styles from '../../style';
import DOMPurify from 'dompurify';
import { adjustFontSize, getActiveBreakpoint, isOverflowing } from '../../utils';
import { useContext, useCallback, useEffect, useRef, useState } from 'react';
import { LangContext } from '../language';
import { coreImages, menuIcons } from '../../assets';
import { RetexContext } from './RetexDisplayEngine'
import { placeholderMessages } from '../../assets/constants';
import RetexHeader from './RetexHeader';
import RetexGalleryViewer from './RetexGalleryViewer';
import { ThemeContext } from "../theme/ThemeEngine";

const RetexViewer = () => {
    const { currentLang } = useContext(LangContext);
    const { displayedRetexTitle, setDisplayedRetex } = useContext(RetexContext);
    const { currentTheme } = useContext(ThemeContext);
    const [toggleGallery, setToggleGallery] = useState<boolean>(false);
    const galleryToggleState = useRef<boolean>(toggleGallery);

    const galleryButton = useRef<HTMLButtonElement>(null);
    const galleryPreview = useRef<HTMLDivElement>(null);
    const specsContainer = useRef<HTMLSpanElement>(null);
    const notionsContainer = useRef<HTMLSpanElement>(null);

    /** Maximum number of notions to display before truncating to prevent overflow. */
    const [maxNotions, setMaxNotions] = useState<number>(Infinity);

    const isMobile = (getActiveBreakpoint('number') as number) < 2;

    const handleTextOverflow = useCallback(() => {
        if (specsContainer.current) {
            if (isOverflowing(specsContainer.current)) {adjustFontSize(specsContainer.current, "min");}
            else {adjustFontSize(specsContainer.current, "max");}
        }

        if (notionsContainer.current) {
            if (isOverflowing(notionsContainer.current)) {adjustFontSize(notionsContainer.current, "min");}
            else {adjustFontSize(notionsContainer.current, "max");}
        }

        if (specsContainer.current && notionsContainer.current) {
            if (getComputedStyle(specsContainer.current).fontSize <
                getComputedStyle(notionsContainer.current).fontSize
            ) {
                notionsContainer.current.style.fontSize = getComputedStyle(specsContainer.current).fontSize;
            }
        }

        /** If the notions container is still overflowing, reduce the displayed count
         *  via state so React handles the DOM — no direct removeChild mutations. */
        if (notionsContainer.current) {
            setMaxNotions((prev) => {
                if (notionsContainer.current && isOverflowing(notionsContainer.current) && prev > 1) {
                    return prev - 1;
                }
                return prev;
            });
        }
    }, []);

    useEffect(() => {
        setToggleGallery(false);
        setMaxNotions(Infinity);

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (galleryToggleState.current) {
                    setTimeout(() => {
                        setToggleGallery(false);
                    }, 50);
                } else {
                    setDisplayedRetex(undefined);
                }
            }
        };

        const handleBackdropClick = (e: MouseEvent) => {
            if (e.target === document.getElementById(`retex-${displayedRetexTitle}`)) {
                setDisplayedRetex(undefined);
            }
        };

        document.addEventListener('keyup', handleKeyUp);
        document.addEventListener('click', handleBackdropClick);
        window.addEventListener('resize', handleTextOverflow);

        return () => {
            document.removeEventListener('keyup', handleKeyUp);
            document.removeEventListener('click', handleBackdropClick);
            window.removeEventListener('resize', handleTextOverflow);
        }
    }, [displayedRetexTitle, setDisplayedRetex, handleTextOverflow]);

    useEffect(() => {
        galleryToggleState.current = toggleGallery;
    }, [toggleGallery]);

    useEffect(() => {
        setMaxNotions(Infinity);
        handleTextOverflow();
    }, [displayedRetexTitle, toggleGallery, currentLang, handleTextOverflow]);

    useEffect(() => {
        const button = galleryButton.current;
        const buttonContainer = galleryPreview.current;
        if (!button || !buttonContainer) return;

        //Center absolute button in its parent container
        button.style.top = `${(buttonContainer.clientHeight - button.clientHeight) / 2 -2}px`;
        button.style.left = `${(buttonContainer.clientWidth - button.clientWidth) / 2}px`;
    }, [currentLang, displayedRetexTitle, toggleGallery]);

    const relatedProject = projects.find((project) => {
        return (project.title[currentLang] === displayedRetexTitle
        || project.title[0] === displayedRetexTitle);
    });
    if (!displayedRetexTitle) return;
    if (!relatedProject) {console.warn(`No project found for '${displayedRetexTitle}'.`); return;}

    /** Notions list capped by maxNotions to avoid overflow without DOM mutation. */
    const displayedNotions = relatedProject.notions[currentLang].slice(0, maxNotions);

    return (
        <div id={`retex-${displayedRetexTitle}`}
            className=
            {`
                ${isMobile ? "" : styles.sizeFull}
                ${isMobile ? styles.flexCol : styles.flexRow}
                p-[6%]
                relative
                md:overflow-hidden overflow-scroll
            `}
        >
            <RetexHeader {...relatedProject} />

            <div id='retex-content'
                className=
                {`
                    ${styles.sizeFull}
                    ${styles.flexCol}
                    color-scheme-secondary
                    md:py-[3%] py-[6%]
                    md:px-[3%] px-[8%]
                    rounded-lg
                    shadow-lg
                    overflow-x-hidden
                    md:overflow-hidden overflow-y-scroll
                    z-22
                    md:ml-[2%]
                    relative
                    transition-all
                    duration-200
                    ease-in-out
                    space-y-0
                `}
            >
                {toggleGallery && relatedProject.img && relatedProject.img.length > 0
                ? <RetexGalleryViewer images={relatedProject.img} untoggler={() => setToggleGallery(false)}/>
                : <>
                    <button
                        type="button"
                        aria-label="Close"
                        onClick={() => setDisplayedRetex(undefined)}
                        className={`
                            absolute
                            top-[2%]
                            right-[1%]
                            z-23
                            ${isMobile ? "hidden" : "flex"}
                            items-center
                            justify-center
                            w-8 h-8
                            rounded-full
                            cursor-pointer
                            ${styles.defaultTransition}
                        `}
                    >
                        <img src={menuIcons.close_menu_icon.content[currentTheme]}
                            alt={menuIcons.close_menu_icon.alt}
                            className={`${styles.sizeFull}`}
                        />
                    </button>

                    <span id='specs'
                        ref={specsContainer}
                        className=
                        {`
                            ${styles.sizeFull}
                            ${styles.flexCol}
                            overflow-hidden
                            mb-[0.5%]
                        `}
                    >
                        <p className=
                            {`
                                ${styles.sizeFull}
                                text-wrap
                                ${isMobile ? "text-xs" : ""}
                            `}
                            dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(relatedProject.specs[currentLang])}}
                        />
                    </span>

                    <div id='retex-bottom'
                        className=
                        {`
                            w-full
                            md:h-fit h-full
                            md:max-h-[40%]
                            ${isMobile ? styles.flexCol : styles.flexRow}
                            ${styles.contentCenter}
                            text-wrap
                            md:space-x-[3%] space-x-0
                        `}
                    >
                        <span id='notions'
                            ref={notionsContainer}
                            className=
                            {`
                                ${styles.sizeFull}
                                ${styles.flexRow}
                                ${styles.contentStartX}
                                overflow-hidden
                                relative
                            `}
                        >
                            <ul
                                className=
                                {`
                                    ${styles.sizeFull}
                                    ${styles.flexCol}
                                    ${styles.contentStartAll}
                                    list-disc
                                    list-inside
                                    space-y-[5%]
                                    ${isMobile ? "text-2xs" : ""}
                                `}
                            >
                                {displayedNotions.map((notion, index) => (
                                    <li key={`notion-${index}`}
                                        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(notion)}}
                                    />
                                ))}
                            </ul>
                        </span>

                        <div id='retex-imgs-container'
                            className=
                            {`
                                relative
                                ${styles.sizeFull}
                                md:max-w-[44%]
                                ${styles.flexCol}
                                ${styles.contentCenter}
                                rounded-lg
                                overflow-hidden
                            `}
                        >
                            <span id='retex-gallery-preview'
                                ref={galleryPreview}
                                className=
                                {`
                                    ${styles.sizeFull}
                                    grid
                                    grid-cols-2
                                    grid-rows-2
                                    grid-flow-dense
                                    relative
                                    gap-[2%]
                                    ${styles.flexCol}
                                    rounded-lg
                                    overflow-hidden
                                `}
                            >
                                {relatedProject.img && relatedProject.img.length > 1 && relatedProject.img.map((img, index) => {
                                    if (index < 4) return (
                                        <img key={`retex-img-${index}`}
                                            src={img}
                                            alt={`retex image ${index + 1}`}
                                            className=
                                            {`
                                                ${styles.sizeFull}
                                                object-cover
                                                object-center
                                                blur-[2px]
                                            `}
                                        />
                                    )
                                })}
                                {relatedProject.img && relatedProject.img.length > 1 && relatedProject.img.length < 4
                                    ? Array.from({ length: 4 - relatedProject.img.length }, (_, i) => (
                                        <img key={`placeholder-img-${i}`}
                                            src={coreImages.placeholder_retex_image}
                                            alt={`placeholder image ${i+1}`}
                                            className=
                                            {`
                                                ${styles.sizeFull}
                                                object-cover
                                                object-center
                                                blur-[2px]
                                            `}
                                        />
                                    ))
                                    : null}

                                <button id='retex-gallery-button'
                                    ref={galleryButton}
                                    className=
                                    {`
                                        absolute
                                        ${styles.sizeFit}
                                        ${styles.flexRow}
                                        ${styles.contentCenter}
                                        z-50
                                        bg-(--color-secondary)
                                        text-(--color-tertiary)
                                        text-xs
                                        enabled:hover:scale-105
                                        font-semibold
                                        enabled:hover:text-(--color-quinary)
                                        disabled:text-wrap
                                        transition-all
                                        duration-300
                                        ease-in-out
                                        rounded-lg
                                        shadow-lg
                                    `}
                                    onClick={() => setToggleGallery(true)}
                                    disabled={relatedProject.img && relatedProject.img.length <= 1}
                                > {relatedProject.img && relatedProject.img.length > 1 ?
                                    placeholderMessages.find((message) => message.context === "projectGalleryButton")!.content[currentLang]
                                    : placeholderMessages.find((message) => message.context === "projectGalleryButtonEmpty")!.content[currentLang]
                                } </button>
                            </span>
                        </div>
                    </div>
                </>}
            </div>

            <div id='retex-mobile-additional'
                className=
                {`
                    ${styles.flexCol}
                `}
            >
                <ul id='retex-header-additional-ressources'
                    className=
                    {`
                        ${styles.sizeFull}
                        ${styles.flexCol}
                        list-none
                        text-wrap
                        ml-[6%]
                        text-xs
                    `}
                >
                    {relatedProject.additionalRessources ?
                        relatedProject.additionalRessources.map((resource, index) => (
                            <li key={`retex-resource-${index}`}
                                className=
                                {`
                                    ${styles.sizeFull}
                                    ${isMobile ? styles.flexRow : "hidden"}
                                    ${styles.contentStartX}
                                    space-x-[3%]
                                    ${currentTheme === 'dark' ? 'text-(--color-tertiary)' : 'text-(--color-primary)'}
                                    transition-all
                                    duration-400
                                    ease-in-out
                                `}
                            >
                                <a target='_blank'
                                    rel="noopener noreferrer"
                                    href={resource.link}
                                > → {resource.content[currentLang]} </a>
                            </li>
                        ))
                    : null}
                </ul>
            </div>
        </div>
    )
}

export default RetexViewer;
