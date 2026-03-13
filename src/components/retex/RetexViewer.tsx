import { projects } from "../../assets/contents";
import styles from '../../style';
import DOMPurify from 'dompurify';
import { adjustFontSize, getLinkFromTypedLink, isOverflowing } from '../../utils/utils';
import { useContext, useCallback, useEffect, useRef, useState } from 'react';
import { LangContext } from '../language';
import { coreImages, menuIcons } from '../../assets';
import { RetexContext } from './RetexDisplayEngine'
import { placeholderMessages } from '../../assets/constants';
import RetexHeader from './RetexHeader';
import RetexGalleryViewer from './RetexGalleryViewer';
import { ThemeContext } from "../theme/ThemeEngine";
import { ProjectMedia, MediaType } from "../../assets/dataTypes";
import { normalizeMedia, translate, UNIVERSAL_LANG } from "../../utils/assetsUtils";

/**
 * @component RetexViewer
 * @description Full-screen overlay that displays a project retex. Scroll, keyboard
 * (Escape), and backdrop-click all close the panel. Contains a gallery sub-view
 * toggled by the media preview button.
 */
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
    const notionsList = useRef<HTMLUListElement>(null);

    /** Maximum number of notions to display before truncating to prevent overflow. */
    const [maxNotions, setMaxNotions] = useState<number>(Infinity);

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
            if (getComputedStyle(specsContainer.current).fontSize 
                < getComputedStyle(notionsContainer.current).fontSize
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
        return (translate(project.title, currentLang) === displayedRetexTitle
        || translate(project.title, UNIVERSAL_LANG) === displayedRetexTitle);
    });
    if (!displayedRetexTitle) return;
    if (!relatedProject) {console.warn(`No project found for '${displayedRetexTitle}'.`); return;}

    // Notions list capped by maxNotions to avoid overflow without DOM mutation.
    const displayedNotions = (relatedProject.content.notions[currentLang] || relatedProject.content.notions[UNIVERSAL_LANG] || []).slice(0, maxNotions);

    const projectMedia = relatedProject.content.images ? relatedProject.content.images.map((media) => normalizeMedia(media)) : [];

    /**
     * Renders a media preview for the retex (supporting both images and videos).
     * 
     * @function renderPreviewMedia
     * @param media - The ProjectMedia object to render
     * @param index - The index of the media in the list (used for keys)
     * @param isBlurred - Whether to apply a blur effect to the media (defaults to true)
     * @param play - Whether to play the media (for videos) (defaults to false)
     * @returns A React element (img or video)
     */
    const renderPreviewMedia = (
        media: ProjectMedia, 
        index: number, 
        isBlurred: boolean =true, 
        play: boolean =false,
        additionalStyles?: string
    ) => {
        const className =`
            ${styles.sizeFull}
            object-cover
            object-center
            ${isBlurred ? 'blur-[2px]' : ''}
            ${additionalStyles || ''}
        `;

        if (media.type === MediaType.VIDEO) {
            return (
                <video key={`retex-media-${index}`}
                    src={media.url}
                    poster={media.poster}
                    autoPlay={play}
                    muted={true}
                    loop={play}
                    playsInline={play}
                    className={className}
                />
            );
        }

        return (
            <img key={`retex-media-${index}`}
                src={media.url}
                alt={media.alt || `retex image ${index + 1}`}
                className={className}
            />
        );
    };

    return (
        <div id={`retex-${displayedRetexTitle}`}
            className={`
                lg:w-full lg:h-full
                ${styles.flexColToRowAtLg}
                p-[6%]
                relative
                lg:overflow-hidden overflow-scroll
                lg:space-y-0 md:space-y-4 space-y-2
            `}
        >
            <RetexHeader {...relatedProject} />

            <div id='retex-content'
                className={`
                    ${styles.sizeFull}
                    ${styles.flexCol}
                    color-scheme-secondary
                    2xl:py-[3%] lg:py-[4%] py-[6%]
                    lg:px-[3%] px-[8%]
                    rounded-lg
                    shadow-lg
                    overflow-x-hidden
                    lg:overflow-hidden overflow-y-scroll
                    z-22
                    lg:ml-[2%]
                    relative
                    ${styles.defaultTransition}
                    space-y-4 lg:space-y-0
                `}
            >
                {toggleGallery && relatedProject.content.images && relatedProject.content.images.length > 0
                ? <RetexGalleryViewer images={projectMedia} untoggler={() => setToggleGallery(false)}/>
                : <>
                    <button
                        type="button"
                        aria-label="Close button"
                        onClick={() => setDisplayedRetex(undefined)}
                        className={`
                            absolute
                            2xl:top-2 top-1
                            2xl:-right-6 -right-4
                            hidden lg:flex
                            ${styles.contentCenter}
                            2xl:w-30
                            rounded-full
                            cursor-pointer
                            ${styles.defaultTransition}
                            z-50
                        `}
                    >
                        <img src={menuIcons.close_menu_icon.content[currentTheme]}
                            alt={menuIcons.close_menu_icon.alt}
                            className={`${styles.sizeFull}`}
                        />
                    </button>

                    <span id='specs'
                        ref={specsContainer}
                        className={`
                            ${styles.sizeFull}
                            ${styles.flexCol}
                            overflow-hidden
                            mb-[0.5%]
                        `}
                    >
                        <p className={`
                                ${styles.sizeFull}
                                text-wrap
                                md:text-md sm:text-md text-xs
                                text-justify
                            `}
                            dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(translate(relatedProject.content.specs, currentLang))}}
                        />
                    </span>

                    <div id='retex-bottom'
                        className={`
                            w-full
                            md:h-fit h-full
                            md:max-h-[40%]
                            ${styles.flexColToRowAtLg}
                            ${styles.contentCenter}
                            text-wrap
                            md:space-x-[3%] space-x-0
                            lg:mt-2 mt-6
                        `}
                    >
                        <span id='notions'
                            ref={notionsContainer}
                            className={`
                                ${styles.sizeFull}
                                ${styles.flexRow}
                                ${styles.contentStartX}
                                overflow-hidden
                                relative
                            `}
                        >
                            <ul ref={notionsList}
                                className={`
                                    ${styles.sizeFull}
                                    ${styles.flexCol}
                                    ${styles.contentStartAll}
                                    list-disc
                                    list-inside
                                    space-y-[5%]
                                    md:text-md sm:text-md text-xs
                                `}
                            >
                                {displayedNotions.map((notion: string, index: number) => (
                                    <li key={`notion-${index}`}
                                        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(notion)}}
                                    />
                                ))}
                            </ul>
                        </span>

                        <div id='retex-imgs-container'
                            className={`
                                relative
                                ${styles.sizeFull}
                                lg:max-w-[44%]
                                hidden lg:flex lg:flex-col
                                ${styles.contentCenter}
                                rounded-lg
                                overflow-hidden
                            `}
                        >
                            <span id='retex-gallery-preview'
                                ref={galleryPreview}
                                className={`
                                    ${styles.sizeFull}
                                    ${projectMedia.length !== 1 ? 
                                        "grid grid-cols-2 grid-rows-2 grid-flow-dense"
                                        : ""
                                    }
                                    relative
                                    gap-[2%]
                                    ${styles.flexCol}
                                    rounded-lg
                                    overflow-hidden
                                `}
                            >
                                {projectMedia.length > 1 && projectMedia.map((media, index) => {
                                    if (index < 4) return renderPreviewMedia(media, index);
                                    return null;
                                })}

                                {projectMedia.length > 1 && projectMedia.length < 4
                                    ? Array.from({ length: 4 - projectMedia.length }, (_, i) => (
                                        <img key={`placeholder-img-${i}`}
                                            src={coreImages.placeholder_retex_image}
                                            alt={`placeholder image ${i+1}`}
                                            className={`
                                                ${styles.sizeFull}
                                                object-cover
                                                object-center
                                                blur-[2px]
                                            `}
                                        />
                                    ))
                                : null}

                                {projectMedia.length !== 1 ?
                                    <button id='retex-gallery-button'
                                        ref={galleryButton}
                                        className={`
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
                                            ${styles.defaultTransition}
                                            rounded-lg
                                            shadow-lg
                                        `}
                                        onClick={() => setToggleGallery(true)}
                                        disabled={projectMedia.length <= 1}
                                    > {projectMedia.length > 1 ?
                                        translate(placeholderMessages.find((message) => message.context === "projectGalleryButton")?.content, currentLang)
                                        : translate(placeholderMessages.find((message) => message.context === "projectGalleryButtonEmpty")?.content, currentLang)
                                    } </button>
                                : 
                                    renderPreviewMedia(projectMedia[0], 0, false, true)
                                }
                            </span>
                        </div>
                    </div>
                </>}
            </div>

            <div id='retex-additional'
                className={`
                    ${styles.flexCol}
                    lg:space-y-0 md:space-y-10 space-y-5
                    lg:mb-0 mb-10
                `}
            >
                {projectMedia.length > 0 && (
                    <div id='retex-mobile-gallery'
                        className={`
                            ${styles.flexCol} lg:hidden
                            gap-2
                            rounded-lg
                            overflow-x-auto
                            bg-(--color-secondary)
                            py-4
                            px-4
                        `}
                    >
                        {projectMedia.map((media, index) =>
                            renderPreviewMedia(media, index, false, true, `rounded-lg`)
                        )}
                    </div>
                )}

                <ul id='retex-header-additional-ressources'
                    className={`
                        ${styles.sizeFull}
                        ${styles.flexCol}
                        list-none
                        text-wrap
                        ml-[6%]
                        text-xs
                        font-bold
                        text-shadow-2xl
                    `}
                >
                    {relatedProject.content.additionalRessources ?
                        relatedProject.content.additionalRessources.map((resource, index) => (
                            <li key={`retex-resource-${index}`}
                                className={`
                                    ${styles.sizeFull}
                                    ${styles.flexRowHideDesktopAtLg}
                                    ${styles.contentStartX}
                                    space-x-[3%]
                                    ${currentTheme === 'dark' ? 'text-(--color-tertiary)' : 'text-(--color-quaternary)'}
                                    transition-all
                                    duration-400
                                    ease-in-out
                                `}
                            >
                                <a target='_blank'
                                    rel="noopener noreferrer"
                                    href={getLinkFromTypedLink(resource.link)}
                                > → {translate(resource.content, currentLang)} </a>
                            </li>
                        ))
                    : null}
                </ul>
            </div>
        </div>
    )
}

export default RetexViewer;
