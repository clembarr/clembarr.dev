import styles from "../../style";
import { ReactElement, useContext, useMemo } from "react";
import { ThemeContext } from "../theme/ThemeEngine";

interface AboutWidgetProps {
    id: number | string;
    title: string | ReactElement;
    content: string | ReactElement | string[];
    titleAdditionnalStyle?: string;
    contentStyle?: string;
    additionalTopStyles?: string;
}

/**
 * @component TagGrid
 * @description Lays out an array of tag strings in a square-ish grid that grows
 * to fill the parent (so 4 tags each land in their own corner, 1 tag is centred,
 * etc.). Each tag floats organically via the shared graph-widget-float animation
 * with a unique duration/delay per index.
 */
const TagGrid = ({ tags, isDark }: { tags: string[]; isDark: boolean }) => {
    const cols = Math.max(1, Math.ceil(Math.sqrt(tags.length)));
    const rows = Math.ceil(tags.length / cols);

    return (
        <div
            className="grid w-full h-full"
            style={{
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
            }}
        >
            {tags.map((tag, i) => {
                const duration = 4 + (i * 1.3) % 3;
                const delay = -((i * 0.7) % duration);
                return (
                    <div key={tag} className="flex items-center justify-center">
                        <span
                            className={`
                                graph-widget-float
                                font-primary-semibold
                                whitespace-nowrap
                                ${styles.tag}
                                select-none
                                transition-colors duration-300
                                ${isDark
                                    ? 'bg-(--color-tertiary)/10 text-(--color-tertiary) border border-(--color-tertiary)/30 hover:bg-(--color-tertiary)/20 hover:border-(--color-tertiary)/50'
                                    : 'bg-(--color-tertiary)/10 text-(--color-tertiary) border border-(--color-tertiary)/20 hover:bg-(--color-tertiary)/15 hover:border-(--color-tertiary)/40'
                                }
                            `}
                            style={{
                                animationDuration: `${duration}s`,
                                animationDelay: `${delay}s`,
                            }}
                        >
                            {tag}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

/**
 * @description Generic widget card used in the About section. When `content` is
 * a `string[]`, it renders a TagGrid instead of raw content.
 */
const AboutWidget = ({ id, title, content, titleAdditionnalStyle, contentStyle, additionalTopStyles }: AboutWidgetProps) => {
    const { currentTheme } = useContext(ThemeContext);
    const isDark = currentTheme === 'dark';
    const isTagList = Array.isArray(content);

    const tagGrid = useMemo(
        () => isTagList ? <TagGrid tags={content as string[]} isDark={isDark} /> : null,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [content, isDark],
    );

    return (
        <div id={`about-widget-${id}`}
            className={`
                ${styles.widgetCard}
                px-3 py-2 md:px-6 md:py-4
                h-full
                shadow-md
                ${additionalTopStyles}
            `}
            style={{
            }}
        >
            <h3 id={`about-widget-${id}-title`}
                className={`
                    font-primary-semibold
                    ${titleAdditionnalStyle}
                `}
            > {title} </h3>

            <div id={`about-widget-${id}-content`}
                className={`
                    ${contentStyle}
                    flex-1
                    min-h-0
                    relative
                `}
            >
                {isTagList ? tagGrid : content}
            </div>
        </div>
    );
};

export default AboutWidget;
