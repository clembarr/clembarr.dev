import { projects } from "../../assets/contents";
import styles from '../../style';
import DOMPurify from 'dompurify';
import { adjustFontSize, getActiveBreakpoint, isOverflowing } from '../../utils';
import { useContext, useEffect, useRef, useState } from 'react';
import { LangContext } from '../language';
import { coreImages, menuIcons } from '../../assets';
import { RetexContext } from './RetexDisplayEngine'
import { placeholderMessages } from '../../assets/constants';
import RetexHeader from './RetexHeader';
import RetexGalleryViewer from './RetexGalleryViewer';
import { ThemeContext } from "../theme/ThemeEngine";
import { ShareButton } from '../share';

const RetexViewer = () => {
    const { currentLang } = useContext(LangContext);
    const { displayedRetexTitle, setDisplayedRetex } = useContext(RetexContext);
    const { currentTheme } = useContext(ThemeContext);
    const [toggleGallery, setToggleGallery] = useState<boolean>(false);
    let galleryToggleState = useRef<boolean>(toggleGallery);

    const galleryButton = useRef<HTMLButtonElement>(null);
    const galleryPreview = useRef<HTMLDivElement>(null);
    const specsContainer = useRef<HTMLSpanElement>(null);
    const notionsContainer = useRef<HTMLSpanElement>(null);
    const notionsList = useRef<HTMLUListElement>(null);

    useEffect(() => {
        setToggleGallery(false);

        document.addEventListener('keyup', (e) => {
            if (e.key === 'Escape') {
                if (galleryToggleState.current) {
                    setTimeout(() => {
                        setToggleGallery(false);
                    }, 50);
                } else {
                    setDisplayedRetex(undefined);
                }
            }
        });

        document.addEventListener('click', (e) => {
            if (e.target === document.getElementById(`retex-${displayedRetexTitle}`)) {
                setDisplayedRetex(undefined);
            }
        });

        window.addEventListener('resize', handleTextOverflow);

        return () => {
            document.removeEventListener('click', () => {});
            document.removeEventListener('keydown', () => {});
            window.removeEventListener('resize', handleTextOverflow);
        }
    }, [displayedRetexTitle]);

    useEffect(() => {
        galleryToggleState.current = toggleGallery;
    }, [toggleGallery]);

    useEffect(() => {
        handleTextOverflow();
    }, [displayedRetexTitle, toggleGallery, currentLang]);

    useEffect(() => {
        const button = galleryButton.current;
        const buttonContainer = galleryPreview.current;
        if (!button || !buttonContainer) return;

        //Center absolute button in its parent container
        button.style.top = `${(buttonContainer.clientHeight - button.clientHeight) / 2 -2}px`;
        button.style.left = `${(buttonContainer.clientWidth - button.clientWidth) / 2}px`;
    }, [currentLang, displayedRetexTitle, toggleGallery]);

    const handleTextOverflow = () => {
        console.log(isOverflowing(notionsContainer.current!), isOverflowing(specsContainer.current!));

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

        if (notionsContainer.current && notionsList.current) {
            /** If the content is still overflowing, remove the last notion */
            while (isOverflowing(notionsContainer.current)) {
                notionsList.current.removeChild(notionsList.current.lastChild as Node);
                if (notionsList.current.childElementCount === 0) break;
            }
        }
    }

    const relatedProject = projects.find((project) => {
        return (project.title[currentLang] === displayedRetexTitle
        || project.title[0] === displayedRetexTitle);
    });
    if (!displayedRetexTitle) return;
    if (!relatedProject) {console.warn(`No project found for '${displayedRetexTitle}'.`); return;}

    // Generate shareable URL
    const projectSlug = relatedProject.title[0].toLowerCase().replace(/\s+/g, '-');
    const shareUrl = `${window.location.origin}/projects/${projectSlug}`;
    const shareTitle = relatedProject.title[currentLang] || relatedProject.title[0];
    const shareText = relatedProject.description[currentLang] || relatedProject.description['en'];

    return (
        <div id={`retex-${displayedRetexTitle}`}
            className=
            {`
                ${getActiveBreakpoint('number') as number < 2 ? "" : styles.sizeFull}
                ${getActiveBreakpoint('number') as number < 2 ? styles.flexCol : styles.flexRow}
                p-[6%]
                relative
                md:space-y-0 space-y-[20px]
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
                    md:space-y-0 space-y-[20px]
                `}
            >
                {toggleGallery && relatedProject.img && relatedProject.img.length > 0 
                ? <RetexGalleryViewer images={relatedProject.img} untoggler={() => setToggleGallery(false)}/>
                : <>
                    <div className="absolute top-[2%] right-[1%] z-23 flex items-center gap-3">
                        {/* Share Button */}
                        <ShareButton
                            title={shareTitle}
                            text={shareText}
                            url={shareUrl}
                            className="text-xs"
                        />

                        {/* Close Button */}
                        <img src={menuIcons.close_menu_icon.content[currentTheme]}
                            id='close-button'
                            alt={menuIcons.close_menu_icon.alt}
                            className=
                            {`
                                ${getActiveBreakpoint('number') as number < 2 ? "hidden" : ""}
                                ${styles.sizeFit}
                                cursor-pointer
                            `}
                            onClick={() => setDisplayedRetex(undefined)}
                        />
                    </div>

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
                                ${getActiveBreakpoint('number') as number < 2 ? "text-xs" : ""}
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
                            ${getActiveBreakpoint('number') as number < 2 ? styles.flexCol : styles.flexRow}
                            ${styles.contentCenter}
                            text-wrap
                            md:space-x-[3%] space-x-0
                            md:space-y-0 space-y-[30px]
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
                            <ul ref={notionsList}
                                className=
                                {`
                                    ${styles.sizeFull}
                                    ${styles.flexCol}
                                    ${styles.contentStartAll}
                                    list-disc
                                    list-inside
                                    space-y-[5%]
                                    ${getActiveBreakpoint('number') as number < 2 ? "text-2xs" : ""}
                                `}
                            >
                                {relatedProject.notions[currentLang].map((notion, index) => (
                                    <li key={`notion-${index}`}
                                        className={``}
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
                                    ${getActiveBreakpoint('number') as number < 2 ? styles.flexRow : "hidden"}
                                    ${styles.contentStartX}
                                    space-x-[3%]
                                    ${currentTheme === 'dark' ? 'text-(--color-tertiary)' : 'text-(--color-primary)'}
                                    transition-all
                                    duration-400
                                    ease-in-out
                                `}
                            >   
                                <a target='_blank'
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