
import { useContext, useEffect, useRef, useState } from "react";
import styles from "../../style";
import { menuIcons } from "../../assets";
import { ThemeContext } from "../theme/ThemeEngine";
import { getActiveBreakpoint } from "../../utils";
import { motion } from "framer-motion";

type RetexGalleryViewerProps = {
    images: string[];
    untoggler: () => void;
}

const RetexGalleryViewer = ({images, untoggler}: RetexGalleryViewerProps) => {
    const {currentTheme} = useContext(ThemeContext);
    const [focusedImage, setFocusedImage] = useState<string>(images[0]);
    const [zoom, setZoom] = useState<number>(1);
    const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
    let index = useRef<number>(0);
    const imageRef = useRef<HTMLImageElement>(null);
    
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') {
                setIndex((index.current + 1) % images.length);
            }
            else if (e.key === 'ArrowLeft') {
                setIndex((index.current - 1 + images.length) % images.length);
            }
            else if (e.key === '+' || e.key === '=') {
                // Zoom in
                setZoom((prev) => Math.min(prev + 0.25, 3));
            }
            else if (e.key === '-' || e.key === '_') {
                // Zoom out
                setZoom((prev) => Math.max(prev - 0.25, 1));
            }
            else if (e.key === '0') {
                // Reset zoom
                setZoom(1);
                setPanOffset({ x: 0, y: 0 });
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
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
            <img src={menuIcons.close_menu_icon.content[currentTheme]}
                id='close-button'
                alt={menuIcons.close_menu_icon.alt}
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
            />

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

                {/* Zoom controls */}
                <div className="absolute bottom-[15%] right-4 flex flex-col gap-2 bg-(--color-secondary) bg-opacity-90 rounded-lg p-2 shadow-lg">
                    <button
                        onClick={() => setZoom((prev) => Math.min(prev + 0.25, 3))}
                        className="px-3 py-1 text-(--color-tertiary) hover:scale-110 transition-transform"
                        aria-label="Zoom in"
                    >
                        +
                    </button>
                    <span className="px-2 text-xs text-(--color-quaternary)">
                        {Math.round(zoom * 100)}%
                    </span>
                    <button
                        onClick={() => setZoom((prev) => Math.max(prev - 0.25, 1))}
                        className="px-3 py-1 text-(--color-tertiary) hover:scale-110 transition-transform"
                        aria-label="Zoom out"
                    >
                        −
                    </button>
                    <button
                        onClick={() => {
                            setZoom(1);
                            setPanOffset({ x: 0, y: 0 });
                        }}
                        className="px-2 py-1 text-xs text-(--color-tertiary) hover:scale-110 transition-transform"
                        aria-label="Reset zoom"
                    >
                        Reset
                    </button>
                </div>

                {/* Keyboard shortcuts hint */}
                <div className="absolute top-4 left-4 bg-(--color-secondary) bg-opacity-90 rounded-lg px-3 py-2 text-xs text-(--color-quaternary) shadow-lg">
                    <p>← → Navigate | +/- Zoom | 0 Reset | Esc Close</p>
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
                            block
                            bg-(--color-tertiary)
                            h-[4px]
                            border-none
                            w-1/5
                            bottom-0
                            shadow-lg
                            blur-[1px]
                        `}
                    />
                </div>
            </nav>

            <div id="gallery-mobile"
                className={`
                    ${styles.sizeFull}
                    ${getActiveBreakpoint('number') as number < 2 ? styles.flexCol : "hidden"}
                    space-y-[5%]
                    pt-[25px]
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
