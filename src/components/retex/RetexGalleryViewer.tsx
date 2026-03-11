import { useContext, useEffect, useRef, useState } from "react";
import styles from "../../style";
import { menuIcons } from "../../assets";
import { ThemeContext } from "../theme/ThemeEngine";
import { galleryControls, GALLERY_HINTS_DELAY_MS } from "../../assets/constants";
import { GalleryAction, MediaType, ProjectMedia } from "../../assets/dataTypes";
import { motion } from "framer-motion";
import { normalizeMedia } from "../../utils/assetsUtils";

type RetexGalleryViewerProps = {
    images: ProjectMedia[];
    untoggler: () => void;
}

/**
 * @component RetexGalleryViewer
 * @description Full-screen image gallery for a retex project. Supports keyboard
 * navigation (arrows, +/-, 0), zoom + drag-to-pan on the focused image, and a
 * thumbnail strip for direct access. On mobile, renders a vertical scroll list.
 * Keyboard hints auto-hide after GALLERY_HINTS_DELAY_MS ms.
 * @param images - Array of images or ProjectMedia objects to display
 * @param untoggler - Callback to close the gallery and return to the retex view
 */
const RetexGalleryViewer = ({images, untoggler}: RetexGalleryViewerProps) => {
    const {currentTheme} = useContext(ThemeContext);
    const [focusedImage, setFocusedImage] = useState<string | ProjectMedia>(images[0]);
    const [zoom, setZoom] = useState<number>(1);
    const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [showHints, setShowHints] = useState<boolean>(true);
    const index = useRef<number>(0);
    const imageRef = useRef<HTMLImageElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // Map each gallery control action to its handler.
        // CLOSE is excluded — Escape is handled by RetexViewer via galleryToggleState
        // to avoid a race condition between keydown (gallery) and keyup (retex).
        const actionHandlers: Partial<Record<GalleryAction, () => void>> = {
            [GalleryAction.NAVIGATE_NEXT]: () => setIndex((index.current + 1) % images.length),
            [GalleryAction.NAVIGATE_PREV]: () => setIndex((index.current - 1 + images.length) % images.length),
            [GalleryAction.ZOOM_IN]:       () => setZoom((prev) => Math.min(prev + 0.25, 3)),
            [GalleryAction.ZOOM_OUT]:      () => setZoom((prev) => Math.max(prev - 0.25, 1)),
            [GalleryAction.RESET]:         () => { setZoom(1); setPanOffset({ x: 0, y: 0 }); },
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            const control = galleryControls.find((c) => c.keys.includes(e.key));
            const handler: (() => void) | undefined = control ? actionHandlers[control.action] : undefined;
            if (handler) handler();
        };

        document.addEventListener('keydown', handleKeyDown);
        const hintsTimer = setTimeout(() => setShowHints(false), GALLERY_HINTS_DELAY_MS);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            clearTimeout(hintsTimer);
        }
    }, [images.length]);

    // Reset zoom and pan when the focused image changes.
    useEffect(() => {
        setZoom(1);
        setPanOffset({ x: 0, y: 0 });
    }, [focusedImage]);

    const setIndex = (newIndex: number) => {
        index.current = newIndex;
        setFocusedImage(images[index.current]);
    }

    const getUrl = (image: string | ProjectMedia): string =>
        typeof image === 'string' ? image : image.url;

    /**
     * Renders a media for the retex (supporting both images and videos).
     * 
     * @function renderMedia
     * @param media - The ProjectMedia object to render
     * @param index - The index of the media in the list (used for keys)
     * @param isBlurred - Whether to apply a blur effect to the media (defaults to true)
     * @param play - Whether to play the media (for videos) (defaults to false)
     * @param additionalStyles - Any additional CSS classes to apply to the media container
     * @param onClick - Optional click handler for the media (e.g., to set focus)
     * @returns A React element (img or video)
     */
    const renderMedia = (
        media: ProjectMedia, 
        index: number, 
        isBlurred: boolean =true, 
        play: boolean =false,
        additionalStyles?: string,
        onClick?: () => void,
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
                    onClick={onClick}
                />
            );
        }

        return (
            <img key={`retex-media-${index}`}
                src={media.url}
                alt={media.alt || `retex image ${index + 1}`}
                className={className}
                onClick={onClick}
            />
        );
    };

    return (
        <div id="retex-gallery-container"
            className={`
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
                className={`
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
                className={`
                    ${styles.sizeFull}
                    ${styles.hiddenToFlexColAtMd}
                    ${styles.contentCenter}
                    transition-all
                    duration-300
                    ease-in-out
                    overflow-hidden
                    relative
                `}
            >
                {normalizeMedia(focusedImage).type === MediaType.VIDEO ?
                    <motion.video
                        ref={videoRef}
                        id="gallery-focused-video"
                        src={normalizeMedia(focusedImage).url}
                        poster={normalizeMedia(focusedImage).poster}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className={`
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
                :
                    <motion.img
                        ref={imageRef}
                        id="gallery-focused-image"
                        src={getUrl(focusedImage)}
                        alt="Focused retex image"
                        className={`
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
                }

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
                className={`
                    absolute
                    ${styles.hiddenToFlexColAtMd}
                    ${styles.contentCenter}
                    overflow-x-scroll
                    overflow-y-hidden
                    w-4/5
                    h-1/6
                    bottom-0
                `}
            >
                <div id="gallery-thumbnails"
                    className={`
                        ${styles.flexRow}
                        ${styles.sizeFull}
                        ${styles.contentCenter}
                        space-x-[1%]
                        relative
                        opacity-50
                        hover:opacity-100
                        ${styles.defaultTransition}
                    `}
                >
                    {images.map((image, i) => (
                        renderMedia(
                            image, 
                            i, 
                            false, 
                            false, 
                            `
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
                                    'border-2 border-(--color-tertiary) mb-[1.5%]'
                                :
                                    'border border-(--color-quaternary)'
                                }
                            `,
                            () => setIndex(i)
                        )
                    ))}

                    <hr id="thumbnail-underline"
                        className={`
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
                    ${styles.flexColHideAtMd}
                    space-y-[5%]
                    pt-6.25
                `}
            >
                {images.map((image, i) => (
                    renderMedia(
                        image, 
                        i, 
                        true, 
                        true, 
                        `
                            object-contain
                            object-center
                            rounded-lg
                            shadow-lg
                        `,

                    )
                ))}
            </div>
        </div>
    )
}

export default RetexGalleryViewer
