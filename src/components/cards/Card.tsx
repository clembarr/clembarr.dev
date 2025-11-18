import { useEffect, useState } from 'react';
import styles from '../../style';
import DOMPurify from 'dompurify';
import { isOverflowing, truncateTextIfOverflow } from '../../utils';

type CardProps = {
    title: string;
    content: string;
    tags: string[];
    moreTopClasses?: string;
    titleProps?: string;
    contentProps?: string;
    tagsProps?: string;
}

const Card = ({title, content, tags, moreTopClasses, titleProps, contentProps, tagsProps}: CardProps) => {
    const [displayedTags, setDisplayedTags] = useState<string[]>(tags.slice(0, 3));

    useEffect(() => {
        truncateTextIfOverflow(document.getElementById(`card-${title}-title`)!, title);
        truncateTextIfOverflow(document.getElementById(`card-${title}-text`)!, content);

        const tagsContainer = document.getElementById(`card-${title}-tags`)!;
        if (isOverflowing(tagsContainer)) { 
            setDisplayedTags((prev) => prev.slice(0, displayedTags.length-1))
        }

    }, [content, tags, title]);

    return (
        <div id={`card-${title}`}
            className={` 
                ${styles.flexCol}
                ${styles.sizeFull}
                ${moreTopClasses}
            `}
        >
            <header id={`card-header`}
                className={`
                    flex
                    w-full
                    h-1/4
                    max-h-[25%]
                    ${styles.contentStartX}
                    font-primary-bold
                    ${titleProps}
                `}
            >
                <h3 id={`card-${title}-title`}
                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(title)}}
                />
            </header>

            <p id={`card-${title}-text`}
                className={`
                    flex
                    w-full
                    h-2/4
                    max-h-[50%]
                    overflow-hidden
                    text-ellipsis
                    ${styles.contentStartX}
                    ${contentProps}
                `}
                dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(content, {ALLOWED_TAGS: ['br']})}}
            />
                        
            <div id={`card-${title}-tags`}
                className={`
                    flex
                    w-full
                    h-1/6
                    max-h-[25%]
                    ${styles.contentStartX}
                    space-x-[5%]
                    overflow-hidden
                    ${tagsProps}
                `}
            >
                {displayedTags.map((tag, index) => {
                    return (
                        <a key={index}
                            className={`
                                text-(--color-tertiary)
                                text-nowrap
                            `}
                        > {tag} </a>
                    );
                })}
            </div>
        </div>
    );
}

export default Card
