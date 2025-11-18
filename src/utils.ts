import { Hyperlink, NavbarPattern } from "./assets/dataTypes";
import { navLinks } from "./assets/constants";
import { customTheme as themeConfig} from  "../custom-theme";

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
export const shuffle = (array: any[]) => { 
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  } 
  return array; 
}; 

/**
 * @function getCurrentNavigation Get the current navigation link to highlight in the navbar of the current page
 * If no nav links correspond to the current pae, return the first link of the 
 * current navigation links
 * @returns the link to highlight in the navbar, to lowercase
 */
export const getCurrentNavigation = () => {
    let currentRoute: NavbarPattern = navLinks.find(
        (nav) => (
            nav.route.includes(window.location.pathname.split('/')[1])
        )
    )!;

    let correspondingNavigation: Hyperlink = currentRoute.links.find(
        (navLink) => {
            if (window.location.hash !== "") {
                return window.location.hash.toLowerCase().includes(navLink.link.split('/')[1].toLowerCase());

            } else {
                return window.location.pathname.toLowerCase() === navLink.link.toLowerCase();
            }
        }
    )!;

    if (correspondingNavigation) {
        return (currentRoute.links.find((nav) => nav.link === correspondingNavigation.link)!).link.toLowerCase();
    } else {
        return (currentRoute.links[0].link).toLowerCase();
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
    div.style.backgroundColor = `var(--color-secondary)`;
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

/**
 * @function getRandomTailwindColor Get a random Tailwind CSS color anmong a 
 * predefined list of colors.
 * @returns a random Tailwind CSS color
 */
export const getRandomTailwindColor = () => {
    const colors = [
        'red-500', 
        'green-500', 
        'blue-500', 
        'yellow-500', 
        'purple-500', 
        'pink-500', 
        'cyan-500', 
    ];
    return colors[randomNumberBetween(0, colors.length - 1)];
}

/**
 * @function getActiveBreakpoint compare the current screen width with the custom 
 * breakpoints in the tailwindcss config file.
 * @param returnType the type of the return value: 'string' or 'number'
 * @returns the active breakpoint.
 */
export const getActiveBreakpoint = (returnType: "string" | "number") => {
    const currentWidth = window.innerWidth;

    if (parseInt(themeConfig.screens && (themeConfig.screens as any)["2xl"]) <= currentWidth) {
        return returnType === "number" ? 5 : "2xl";
    }
    else if (parseInt(themeConfig.screens && (themeConfig.screens as any)["xl"]) <= currentWidth) {
        return returnType === "number" ? 4 : "xl";
    }
    else if (parseInt(themeConfig.screens && (themeConfig.screens as any)["lg"]) <= currentWidth) {
        return returnType === "number" ? 3 : "lg";
    }
    else if (parseInt(themeConfig.screens && (themeConfig.screens as any)["md"]) <= currentWidth) {
        return returnType === "number" ? 2 : "md"
    }
    else if (parseInt(themeConfig.screens && (themeConfig.screens as any)["sm"]) <= currentWidth) {
        return returnType === "number" ? 1 : "sm";
    }
    else {
        return returnType === "number" ? 0 : "base";
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
 * @
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