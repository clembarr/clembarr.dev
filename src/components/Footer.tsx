import styles from "../style"
import { copyrigthText, creditsLink, FOOTER_SEE_ALSO_COUNT } from "../assets/constants"
import { getCurrentNavigation, getLinkFromTypedLink, shuffle } from "../utils/utils"
import { useContext, useEffect, useState } from "react"
import { footerColumns } from "../assets/contents"
import DOMPurify from "dompurify"
import { LangContext } from "./language"
import { ThemeContext } from "./theme/ThemeEngine"
import { Hyperlink, NavbarPattern } from "../assets/dataTypes"
import { Link } from "react-router"

/**
 * @component ExternalLinkIcon
 * @description Small SVG icon displayed inline next to external link labels.
 */
export const ExternalLinkIcon = () => (
  <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
)

/**
 * @component Footer
 * @description Footer with one horizontal row per entry of `footerColumns`: the title,
 * then its links side by side. Navigation and see-also rows sit above a bottom line
 * holding the link to the credits page on the left and the copyright on the right.
 */
const Footer = () => {
  const [currentNavigation, setCurrentNavigation] = useState(getCurrentNavigation())
  const { currentLang } = useContext(LangContext)
  const { currentTheme } = useContext(ThemeContext)

  const isDark = currentTheme === 'dark';

  useEffect(() => {
    setCurrentNavigation(getCurrentNavigation())

  }, [window.location.pathname, window.location.hash])

  /**
   * @function renderColumnItems Renders the items of a footer column based on its context.
   * @param context - the discriminant identifying the column type
   * @param content - the data array to render
   * @returns JSX elements for the column items
   */
  const renderColumnItems = (context: string, content: Hyperlink[] | NavbarPattern[]) => {
    switch (context) {
      case "navigation": {
        const patterns = content as NavbarPattern[];
        const currentPattern = patterns.find(
          (pattern) => pattern.route.includes(window.location.pathname.split("/")[1])
        ) ?? patterns.find((pattern) => pattern.route === "");
        if (!currentPattern) return null;

        return currentPattern.links.map((navLink, index) => (
          <a key={`nav-link-${index}`}
            id={`nav-link-${navLink.content[currentLang]}`}
            href={getLinkFromTypedLink(navLink.link, currentLang)}
            className={`
              text-sm
              transition-all duration-200
              ${(getLinkFromTypedLink(navLink.link, currentLang).toLowerCase()) === currentNavigation
                ? `text-(--color-tertiary) ${isDark ? 'drop-shadow-[0_0_4px_rgba(124,255,196,0.4)]' : ''}`
                : 'text-(--color-muted) hover:text-(--color-tertiary)'
              }
            `}
            onClick={() => setCurrentNavigation(getLinkFromTypedLink(navLink.link, currentLang).toLowerCase())}
          > {navLink.content[currentLang] || navLink.content[0]} </a>
        ));
      }

      case "see-also": {
        const links = shuffle(shuffle(content as Hyperlink[])).sort((a, b) => a.prioritized ? -1 : b.prioritized ? 1 : -1);

        return links.slice(0, FOOTER_SEE_ALSO_COUNT).map((link, index) => (
          <a key={`see-also-${index}`}
            id={`see-also-${index}`}
            href={getLinkFromTypedLink(link.link, currentLang)}
            className={`
              text-sm
              text-(--color-muted)
              hover:text-(--color-tertiary)
              transition-all duration-200
              inline-flex items-center gap-1
            `}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.content[currentLang]}
            <ExternalLinkIcon />
          </a>
        ));
      }

      default:
        return null;
    }
  };

  return (
    <footer id="footer"
      className={`
        w-screen
        px-[5%]
        lg:pt-6 pt-8
        pb-4
        ${styles.flexCol}
        bg-(--color-secondary)
        border-t border-(--color-border)
        relative
        ${isDark ? 'shadow-[0_-4px_20px_rgba(0,0,0,0.3)]' : 'shadow-[0_-2px_10px_rgba(0,0,0,0.05)]'}
      `}
    >
      <div className={`
        absolute top-0 left-1/2 -translate-x-1/2
        w-1/3 h-px
        bg-linear-to-r from-transparent via-(--color-tertiary) to-transparent
        ${isDark ? 'opacity-50' : 'opacity-30'}
      `} />

      <div id="footer-content"
        className={`
          w-full
          grid
          md:grid-cols-[auto_1fr] grid-cols-1
          md:gap-x-8 md:gap-y-4 gap-y-2
          items-baseline
          text-2xs
        `}
      >
        {footerColumns.map((col) => (
          <div key={`footer-col-${col.context}`}
            id={`${col.context}-container`}
            className="contents"
          >
            <h3 id={`${col.context}-title`}
              className={`
                font-primary-semibold
                lg:text-base text-sm
                text-(--color-quaternary)
                md:mt-0 mt-3
              `}
            >{col.title[currentLang]}</h3>

            <div id={`${col.context}-items`}
              className={`
                ${styles.flexWrap}
                items-baseline
                gap-x-5 gap-y-1
              `}
            >
              {renderColumnItems(col.context, col.content)}
            </div>
          </div>
        ))}
      </div>

      <div id="copyrigth-container"
        className={`
          ${styles.flexRow}
          justify-between items-end
          w-full
          pt-3
          mt-6
          border-t border-(--color-border)
          text-xs
        `}
      >
        <Link id="credits-link"
          to={getLinkFromTypedLink(creditsLink.link, currentLang)}
          className={`
            text-3xs
            text-(--color-muted)
            hover:text-(--color-tertiary)
            transition-all duration-200
          `}
        >{creditsLink.content[currentLang]}</Link>

        <a id="copyrigth"
          href={getLinkFromTypedLink(copyrigthText.link, currentLang)}
          className={`
            text-right
            text-3xs
            text-(--color-muted)
            hover:text-(--color-tertiary)
            transition-all duration-200
          `}
          target="_blank"
          rel="noopener noreferrer"
          dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(copyrigthText.content[0])}}
        />
      </div>

    </footer>
  )
}

export default Footer
