import { BlogPost, Hyperlink } from "../assets/dataTypes";
import { navLinks } from "../assets/constants";
import { MultilingualContent, UNIVERSAL_LANG } from "./assetsUtils";

/**
 * @function randomNumberBetween Get a random number between min and max
 * @param min from this number 
 * @param max to this number (included)
 * @returns a number 
 */
export const randomNumberBetween = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * @function shuffle Shuffle an array of strings using the Fisher-Yates algorithm
 * @param array the array to shuffle
 * @returns the shuffled array
 */
export const shuffle = <T>(array: T[]): T[] => {
    for (let i = array.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1)); 
        [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array;
}; 

/**
 * @function getLinkFromTypedLink Resolve a link from a Hyperlink, a multilingual
 * content object, or a plain string into a single URL string.
 * @param link - the link to resolve, which can be a Hyperlink (with nested link),
 *   a MultilingualContent object keyed by language, or a plain string URL.
 * @param lang - optional language code to select the correct URL from a
 *   MultilingualContent object. Falls back to UNIVERSAL_LANG if omitted.
 * @returns the resolved URL string
 */
export const getLinkFromTypedLink = (link: Hyperlink | string | MultilingualContent, lang?: string): string => {
    if (typeof link === "string") {
        return link;
    }
    if ("link" in link) {
        return getLinkFromTypedLink((link as Hyperlink).link, lang);
    }
    return (link[lang || UNIVERSAL_LANG] || link[UNIVERSAL_LANG]);
}

/**
 * @function getCurrentNavigation Get the current navigation link to highlight in the navbar of the current page
 * If no nav links correspond to the current pae, return the first link of the 
 * current navigation links
 * @returns the link to highlight in the navbar, to lowercase
 */
export const getCurrentNavigation = () => {
    const segment = window.location.pathname.split('/')[1];
    const currentRoute = navLinks.find(
        (nav) => nav.route.includes(segment)
    ) ?? navLinks.find((nav) => nav.route === '')!;

    const correspondingNavigation = currentRoute.links.find(
        (navLink) => {
            if (window.location.hash !== "") {
                return window.location.hash.toLowerCase().includes(getLinkFromTypedLink(navLink.link).split('/')[1].toLowerCase());

            } else {
                const pathname = window.location.pathname.toLowerCase();
                const link = getLinkFromTypedLink(navLink.link).toLowerCase();
                return pathname === link
                    || (link !== "/" && pathname.startsWith(link + "/"));
            }
        }
    );

    if (correspondingNavigation) {
        return getLinkFromTypedLink((currentRoute.links.find((nav) => nav.link === correspondingNavigation.link)!).link).toLowerCase();
    } else {
        return getLinkFromTypedLink(currentRoute.links[0].link).toLowerCase();
    }
}

/**
 * @function getLocalTheme Get the current theme of the website
 * @returns the current theme 
 */
export const getLocalTheme = () => {
    return localStorage.getItem('theme')?.toLocaleLowerCase() || 'light';
}

/**
 * @function getLocalLanguage Get the language used by the user
 * @returns the symbol of local language (ex: 'fr')
 */
export const getLocalLanguage = () => {
    return localStorage.getItem('lang')?.toString().toLowerCase() 
    || navigator.language.slice(0, 2)?.toString().toLowerCase()
    || 'fr';
}

/**
 * @function getLocalTentativeCooldown Get the time when the user reached the
 * submit limit for the contact form, from the local storage.
 * @return string value in the local storage if it exists, else now.
 */
export const getLocalTentativeCooldown = () => {
    return localStorage.getItem('reachedLimit')?.toString().toLowerCase()
    || Date.now().toString();
}

/**
 * @function isOverflowing Check if an element is overflowing its container
 * @param element the element to check
 * @returns true if the element is overflowing, false otherwise
 */
export const isOverflowing = (element: HTMLElement) => {
    if (!element) {console.warn("Can't check overflowing: element is null."); return false;}
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

/**
 * @function truncateTextIfOverflow Truncate the text in an element if it is overflowing
 * @param textContainer HTML element containing the text
 * @param text the text to truncate
 */
export const truncateTextIfOverflow = (textContainer: HTMLElement, text: string) => {
    let tempText = text;

    while (isOverflowing(textContainer) && tempText.length > 0) {
        tempText = tempText.slice(0, tempText.lastIndexOf(' '));
        textContainer.textContent = tempText + '...';
    }
}

/**
 * @function getNavbarOffset Get the height of the navbar
 * @returns the height of the navbar
 */
export const getNavbarOffset = () => {
    const navbar = document.getElementById('navbar');
    return navbar ? navbar.clientHeight : 0;
}

/**
 * @function getFooterOffset Get the height of the footer
 * @returns the height of the footer
 */
export const getFooterOffset = () => {
    const footer = document.getElementById('footer');
    return footer ? footer.clientHeight : 0;
}

/**
 * @function handleMouseEnter When the mouse enters the given div, the element
 * drops its initial animation properties.
 * @param div the div to animate
 * @returns void
 */
export const handleMouseEnter = (div: HTMLDivElement | null) => {
    if (!div) return;
    div.style.animation = "";
}

/**
 * @function handleMouseMove When the mouse mouves over the given div, the element
 * rotates according to the mouse position.
 * @param e the mouse event
 * @param div the div to rotate
 * @returns void
 */
export const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, div: HTMLDivElement | null) => {
    if (!div) return;
    const { top, left, width, height } = div.getBoundingClientRect();
    const color1 = getComputedStyle(div).getPropertyValue("--color-primary")
    const color2 = getComputedStyle(div).getPropertyValue("--color-secondary")
    const cursorX = e.clientX - left - width / 2;
    const cursorY = e.clientY - top - height / 2;

    div.style.transform = `rotateX(${cursorY/25}deg) rotateY(${cursorX/22}deg)`;
    div.style.background = `radial-gradient(circle at ${cursorX}% ${cursorY}%, ${lightenHexColor(color1, 4)} 8%, ${lightenHexColor(color2, 1)})`;
    injectCursorPosition(e.clientX, e.clientY);
}

/**
 * @function handleMouseLeave When the mouse leaves the given div, the element
 * rotates back to its original position.
 * @param div the div to rotate
 * @returns void
 */
export const handleMouseLeave = (div: HTMLDivElement | null) => {
    if (!div) return;
    div.style.transform = `rotateX(0deg) rotateY(0deg)`;
    div.style.background = '';
    injectCursorPosition(0, 0);
}

/**
 * @function injectCursorPosition Inject the cursor position in the CSS variables
 * @param x the x position of the cursor
 * @param y the y position of the cursor
 * @returns void
 */
export const injectCursorPosition = (x: number, y: number) => {
    document.documentElement.style.setProperty('--x', `${Math.round(x)}`)
    document.documentElement.style.setProperty('--y', `${Math.round(y)}`);
}

/**
 * @function darkenHexColor Darken a given hex string color by a given percentage
 * @param color the color to darken
 * @param percent the percentage to darken the color
 * @returns the darkened color as a hex string
 */
export const darkenHexColor = (color: string, percent: number) => {
    const num = parseInt(color.slice(1), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + 
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + 
    (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

/**
 * @function lightenHexColor Lighten a given hex string color by a given percentage
 * @param color the color to lighten
 * @param percent the percentage to lighten the color
 * @returns the lightened color as a hex string
 */
export const lightenHexColor = (color: string, percent: number) => {
    const num = parseInt(color.slice(1), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + 
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + 
    (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

const RANDOM_TAILWIND_COLORS = [
    'red-500',
    'green-500',
    'blue-500',
    'yellow-500',
    'purple-500',
    'pink-500',
    'cyan-500',
];

/**
 * @function getMaxPills
 * @description Defines the number of displayed pills in the sorting bar,
 * according to the active breakpoint. 
 * @returns return number of sorting options to display
 */
export const getMaxPills = () => {
    const avbp = getActiveBreakpoint("number") as number;
    
    switch (avbp) {
        case 5:
        case 4: return 3; //xl
        case 3:
        case 2: return 2; //md
        case 1:
        case 0:
        case -1:
        case -2:
        default: return 2; //bellow xs
    }
};

/**
 * @function getRandomTailwindColor Get a random Tailwind CSS color among a
 * predefined list of colors.
 * @returns a random Tailwind CSS color
 */
export const getRandomTailwindColor = () => {
    return RANDOM_TAILWIND_COLORS[randomNumberBetween(0, RANDOM_TAILWIND_COLORS.length - 1)];
}

/**
 * @function getCSSBreakpoint Read a breakpoint value from the Tailwind 4 CSS
 * custom property `--breakpoint-<name>` defined in `@theme` (index.css).
 * @param name the breakpoint name (e.g. "sm", "2xl")
 * @returns the breakpoint value in pixels, or 0 if not found.
 */
const getCSSBreakpoint = (name: string): number => {
    const value = getComputedStyle(document.documentElement)
        .getPropertyValue(`--breakpoint-${name}`)
        .trim();
    return parseInt(value) || 0;
}

/**
 * @function getActiveBreakpoint Compare the current screen width with the custom
 * breakpoints defined as CSS custom properties by Tailwind 4 in index.css.
 * @param returnType the type of the return value: 'string' or 'number'
 * @returns the active breakpoint as a label string (base to 2xl) or a rank number (-2 to 5).
 */
export const getActiveBreakpoint = (returnType: "string" | "number") => {
    const currentWidth = window.innerWidth;

    if (getCSSBreakpoint("2xl") <= currentWidth) {
        return returnType === "number" ? 5 : "2xl";
    }
    else if (getCSSBreakpoint("xl") <= currentWidth) {
        return returnType === "number" ? 4 : "xl";
    }
    else if (getCSSBreakpoint("lg") <= currentWidth) {
        return returnType === "number" ? 3 : "lg";
    }
    else if (getCSSBreakpoint("md") <= currentWidth) {
        return returnType === "number" ? 2 : "md";
    }
    else if (getCSSBreakpoint("sm") <= currentWidth) {
        return returnType === "number" ? 1 : "sm";
    }
    else if (getCSSBreakpoint("ss") <= currentWidth) {
        return returnType === "number" ? 0 : "ss";
    }
    else if (getCSSBreakpoint("xs") <= currentWidth) {
        return returnType === "number" ? -1 : "xs";
    }
    else {
        return returnType === "number" ? -2 : "base";
    }
}

/**
 * @function getRGBThemeColor Get the RGBA color of a theme color from the hex CSS variables
 * @param CSSVarName the name of the CSS variable to get the color from
 * @param alpha the opacity of the color
 * @returns the RGBA color as a string
 */
export const getRGBAThemeColor = (
    CSSVarName: "--color-primary" 
    | "--color-secondary" 
    | "--color-tertiary"
    | "--color-quaternary"
    | "--color-quinary"
    | "--color-layout-bg",
    alpha?: number
) => {
    const color = getComputedStyle(document.documentElement).getPropertyValue(CSSVarName).trim();
    if (!color || color.length <= 0) console.error("Can't get color from CSS variable.");
    return `rgba(
        ${parseInt(color.slice(1, 3), 16)}, 
        ${parseInt(color.slice(3, 5), 16)}, 
        ${parseInt(color.slice(5, 7), 16)}, 
        ${alpha || 1}
    )`
}

/**
 * @function isFullScreen Check if the window is in full screen mode
 * @returns true if the window is in full screen mode, false otherwise
 */
export const isFullScreen = () => {
    return window.innerHeight === screen.height;
}

/**
 * @function charsPerLine Get the number of characters that can fit in a line for a given container
 * and font size.
 * @param container the container
 * @param fontSize the font size
 * @return the number of characters that can fit in a line
 */
export const charsPerLine = (container: HTMLElement, fontSize: number) => {
    return Math.floor(container.clientWidth / fontSize)
}

/**
 * @function minimizeFontSize While the text is overflowing the container, decrease the font size.
 * Then, apply the font size that fits the text in the container.
 * @param container - the container of the text
 * @param fontSize - the font size
 * @param simulatedHeight - the simulated height of the text, to compare with the container height
 */
export const minimizeFontSize = (
    container: HTMLElement, 
    fontSize: number, 
    simulatedHeight: (fontSize: number) => number,
) => {
    
    while (simulatedHeight(fontSize) > container.offsetHeight) {
        fontSize -= 0.2;
    }
    container.style.fontSize = `${fontSize}px`;
}

/**
 * @function maximizeFontSize While the text is not overflowing the container, increase the font size.
 * Then, apply the font size that fits the text in the container.
 * @param container - the container of the text
 * @param fontSize - the font size
 * @param simulatedHeight - the simulated height of the text, to compare with the container height
 */
export const maximizeFontSize = (
    container: HTMLElement, 
    fontSize: number, 
    simulatedHeight: (fontSize: number) => number,
) => {
    
    while (simulatedHeight(fontSize) < container.offsetHeight) {
        fontSize += 0.2;
    }
    container.style.fontSize = `${fontSize}px`;
}

/**
 * @function adjustFontSize Adjust the font size of a text to fit in its container
 * @param container the container of the text
 * @param expect the expected behavior: 'min' to minimize or 'max' to maximize
 */
export const adjustFontSize = (container: HTMLElement, expect: "min" | "max") => {
    if (!container) {console.warn("Can't adjust font size: container is null."); return;}

    const initFontSize = parseFloat(getComputedStyle(container).fontSize);
    const textContentLenght = container.innerText.length || 0;
    const lines = (fontSize: number) => Math.ceil(textContentLenght / charsPerLine(container, fontSize)); 
    const simulatedHeight = (fontSize: number) => lines(fontSize) * fontSize;

    if (expect === "min") {
        minimizeFontSize(container, initFontSize, simulatedHeight);
    } else {
        maximizeFontSize(container, initFontSize, simulatedHeight);
    }    
}

/**
 * @function uniformizeFontSize Uniformize the font size of two containers according to the expected behavior
 * @param container1 the first container
 * @param container2 the second container
 * @param expect the expected behavior: 'min' to minimize or 'max' to maximize
 * @returns void
 */
export const uniformizeFontSize = (container1: HTMLElement, container2: HTMLElement, expect: "min" | "max") => {
    if (!container1 || !container2) return;

    const fontSize1 = parseFloat(getComputedStyle(container1).fontSize);
    const fontSize2 = parseFloat(getComputedStyle(container2).fontSize);

    if (expect === "min") {
        const newSize = Math.min(fontSize1, fontSize2);
        container1.style.fontSize = `${newSize}px`;
        container2.style.fontSize = `${newSize}px`;
    } else {
        const newSize = Math.max(fontSize1, fontSize2);
        container1.style.fontSize = `${newSize}px`;
        container2.style.fontSize = `${newSize}px`;
    }
}

/**
 * @function formatBlogDate Format a date for blog display using locale-aware formatting
 * @param date - Date object to format
 * @param lang - language code (e.g. "fr", "en", or "0" for universal/English)
 * @returns formatted date string (e.g. "January 15, 2025" or "15 janvier 2025")
 */
export const formatBlogDate = (date: Date, lang: string): string => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    return new Intl.DateTimeFormat(lang === '0' ? 'en-US' : lang === 'en' ? 'en-US' : 'fr-FR', options).format(date);
};

/**
 * @function getRelatedPosts Get related posts based on category, tags and recency.
 * Scores each candidate post and returns the top ones sorted by relevance.
 * @param post - the current blog post
 * @param allPosts - array of all blog posts
 * @param limit - maximum number of related posts to return
 * @returns array of related BlogPost objects, sorted by relevance score (descending)
 */
export const getRelatedPosts = (
    post: BlogPost,
    allPosts: BlogPost[],
    limit: number = 3
): BlogPost[] => {
    return allPosts
        .filter((p) => p.slug !== post.slug)
        .map((p) => {
            let score = 0;

            // Same category: +10 points
            if (p.category === post.category) {
                score += 10;
            }

            // Shared tags: +2 points per tag (flatten all lang keys)
            const postTags = Object.values(post.tags).flat();
            const candidateTags = Object.values(p.tags).flat();
            const sharedTags = candidateTags.filter((tag) => postTags.includes(tag));
            score += sharedTags.length * 2;

            // Recency bonus (posts within 90 days): +1-5 points
            const daysDiff = Math.abs(
                (p.date.getTime() - post.date.getTime()) / (1000 * 60 * 60 * 24)
            );
            if (daysDiff < 90) {
                score += Math.max(1, 5 - Math.floor(daysDiff / 18));
            }

            return { post: p, score };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map((item) => item.post);
};