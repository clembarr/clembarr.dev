
import { useContext, useEffect, useRef, useState } from "react";
import styles from "../../style";
import { menuIcons } from "../../assets";
import { ThemeContext } from "../theme/ThemeEngine";
import { getActiveBreakpoint } from "../../utils";
import { galleryControls } from "../../assets/constants";
import { GalleryAction } from "../../assets/dataTypes";
import { motion } from "framer-motion";

type RetexGalleryViewerProps = {
    images: string[];
    untoggler: () => void;
}

const RetexGalleryViewer = ({images, untoggler}: RetexGalleryViewerProps) => {
    const HINTS_DELAY_MS: number = 5000;
    const {currentTheme} = useContext(ThemeContext);
    const [focusedImage, setFocusedImage] = useState<string>(images[0]);
    const [zoom, setZoom] = useState<number>(1);
    const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
    const [showHints, setShowHints] = useState<boolean>(true);
    const index = useRef<number>(0);
    const imageRef = useRef<HTMLImageElement>(null);
    
    useEffect(() => {
        /** Map each gallery control action to its handler.
         *  CLOSE is excluded — Escape is handled by RetexViewer via galleryToggleState
         *  to avoid a race condition between keydown (gallery) and keyup (retex). */
        const actionHandlers: Partial<Record<GalleryAction, () => void>> = {
            [GalleryAction.NAVIGATE_NEXT]: () => setIndex((index.current + 1) % images.length),
            [GalleryAction.NAVIGATE_PREV]: () => setIndex((index.current - 1 + images.length) % images.length),
            [GalleryAction.ZOOM_IN]:       () => setZoom((prev) => Math.min(prev + 0.25, 3)),
            [GalleryAction.ZOOM_OUT]:      () => setZoom((prev) => Math.max(prev - 0.25, 1)),
            [GalleryAction.RESET]:         () => { setZoom(1); setPanOffset({ x: 0, y: 0 }); },
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            const control = galleryControls.find((c) => c.keys.includes(e.key));
            if (control && actionHandlers[control.action]) {
                actionHandlers[control.action]();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        const hintsTimer = setTimeout(() => setShowHints(false), HINTS_DELAY_MS);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            clearTimeout(hintsTimer);
        }
    }, [images.length]);

    // Reset zoom when changing images
    useEffect(() => {
        setZoom(1);
        setPanOffset({ x: 0, y: 0 });
    }, [focusedImage]);

    const setIndex = (newIndex: number) => {
        index.current = newIndex;
        setFocusedImage(images[index.current]);
    }

    return (
        <div id="retex-gallery-container"
            className=
            {`
                ${styles.flexCol}
                ${styles.sizeFull}
                ${styles.contentCenter}
                cursor-default
                relative
            `}
        >
            <button
                type="button"
                aria-label="Close gallery"
                className=
                {`
                    absolute
                    md:-top-[5%] -top-[10px]
                    md:-right-[3%] -right-[15px]
                    z-23
                    ${styles.sizeFit}
                    cursor-pointer
                `}
                onClick={untoggler}
            >
                <img src={menuIcons.close_menu_icon.content[currentTheme]}
                    alt={menuIcons.close_menu_icon.alt}
                />
            </button>

            <div id="gallery-focused-image-container"
                className=
                {`
                    ${styles.sizeFull}
                    ${getActiveBreakpoint('number') as number < 2 ? "hidden" : styles.flexCol}
                    ${styles.contentCenter}
                    transition-all
                    duration-300
                    ease-in-out
                    overflow-hidden
                    relative
                `}
            >
                <motion.img
                    ref={imageRef}
                    id="gallery-focused-image"
                    src={focusedImage || ''}
                    alt={`Focused Retex Image`}
                    className=
                    {`
                        ${styles.sizeFull}
                        object-contain
                        object-center
                        rounded-lg
                        ${zoom > 1 ? 'cursor-move' : 'cursor-zoom-in'}
                    `}
                    style={{
                        transform: `scale(${zoom}) translate(${panOffset.x}px, ${panOffset.y}px)`,
                    }}
                    drag={zoom > 1}
                    dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                    dragElastic={0.1}
                    onClick={() => {
                        if (zoom === 1) {
                            setZoom(2);
                        } else {
                            setZoom(1);
                            setPanOffset({ x: 0, y: 0 });
                        }
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />

                <div className={`
                    absolute 
                    top-0 
                    left-0
                    bg-(--color-secondary) bg-opacity-90
                    rounded-lg px-3 py-2
                    text-xs text-(--color-quaternary)
                    shadow-lg
                    transition-opacity duration-500
                    ${showHints ? 'opacity-100 border border-(--color-tertiary)' : 'opacity-0 pointer-events-none'}
                `}>
                    <p>{galleryControls
                        .filter((c) => c.action !== GalleryAction.CLOSE)
                        .map((c) => `${c.binding} ${c.label}`).join(' | ')}</p>
                </div>
            </div>

            <nav id="gallery-navigation"
                className=
                {`
                    absolute
                    ${getActiveBreakpoint('number') as number < 2 ? "hidden" : styles.flexCol}
                    ${styles.contentCenter}
                    overflow-x-scroll
                    overflow-y-hidden
                    w-4/5
                    h-1/6
                    bottom-0
                `}
            >
                <div id="gallery-thumbnails"
                    className=
                    {`
                        ${styles.flexRow}
                        ${styles.sizeFull}
                        ${styles.contentCenter}
                        space-x-[1%]
                        relative
                    `}  
                >
                    {images ? images.map((image, index) => (
                        <img key={`retex-gallery-image-${index}`}
                            src={image}
                            alt={`Retex Gallery Image ${index + 1}`}
                            className=
                            {`
                                ${styles.sizeFit}
                                max-w-[100px]
                                max-h-[60px]
                                object-fill
                                object-center
                                cursor-pointer
                                hover:scale-105
                                transition-all
                                duration-300
                                ease-in-out
                                rounded-lg
                                shadow-lg
                                
                                ${focusedImage === image ? 
                                    'border-2 \
                                    border-(--color-tertiary) \
                                    mb-[1.5%]' 
                                : 
                                    'border \
                                    border-(--color-quaternary)'
                                }
                            `}
                            onClick={() => { setIndex(index) }}
                        />
                    )) : null}

                    <hr id="thumbnail-underline"
                        className=
                        {`
                            absolute
                            bottom-0
                            left-0
                            right-0
                            h-0.5
                            border-none
                            bg-linear-to-r
                            from-(--color-tertiary)/0
                            via-(--color-tertiary)
                            to-(--color-tertiary)/0
                            shadow-(--glow-md)
                        `}
                    />
                </div>
            </nav>

            <div id="gallery-mobile"
                className={`
                    ${styles.sizeFull}
                    ${getActiveBreakpoint('number') as number < 2 ? styles.flexCol : "hidden"}
                    space-y-[5%]
                    pt-6.25
                `}
            >
                {images.map((image, idx) => (
                    <img key={`retex-gallery-mobile-image-${idx}`}
                        src={image}
                        alt={`Retex Gallery Mobile Image ${idx + 1}`}
                        className={`
                            object-contain
                            object-center
                            rounded-lg
                            shadow-lg
                        `}
                    />
                ))}
            </div>
        </div>
    )
}

export default RetexGalleryViewer
