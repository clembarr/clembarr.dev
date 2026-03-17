import styles from "../style"
import { copyrigthText, navLinks } from "../assets/constants"
import { getCurrentNavigation, getLinkFromTypedLink, shuffle } from "../utils/utils"
import { useContext, useEffect, useState } from "react"
import { footerColumns } from "../assets/contents"
import DOMPurify from "dompurify"
import { LangContext } from "./language"
import { ThemeContext } from "./theme/ThemeEngine"
import { CreditMention, Hyperlink, NavbarPattern } from "../assets/dataTypes"

/**
 * @component ExternalLinkIcon
 * @description Small SVG icon displayed inline next to external link labels.
 */
const ExternalLinkIcon = () => (
  <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
)

/**
 * @component Footer
 * @description Footer with dynamically generated columns from `footerColumns`.
 * Renders navigation links, credits, and see-also links depending on column context.
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
  const renderColumnItems = (context: string, content: Hyperlink[] | CreditMention[] | NavbarPattern[]) => {
    switch (context) {
      case "navigation": {
        const patterns = content as NavbarPattern[];
        const currentPattern = patterns.filter(
          (pattern) => pattern.route.includes(window.location.pathname.split("/")[1])
        )[0];
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

      case "credits": {
        const credits = content as CreditMention[];

        return credits.map((credit, index) => (
          <a key={`credit-${index}`}
            id={`credit-${credit.content[currentLang]}`}
            href={
              credit.link ? getLinkFromTypedLink(credit.link, currentLang)
              : (Array.isArray(credit.contentRef) ?
                getLinkFromTypedLink(credit.contentRef[0].content[currentTheme], currentLang)
                : getLinkFromTypedLink(credit.contentRef.content[currentTheme], currentLang)
              )
            }
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
            {credit.content[currentLang]}
            <ExternalLinkIcon />
          </a>
        ));
      }

      case "see-also": {
        const currentPattern = navLinks.filter(
          (pattern) => pattern.route.includes(window.location.pathname.split("/")[1])
        )[0];
        const countNavLinks = currentPattern ? currentPattern.links.length : 4;
        const links = content as Hyperlink[];

        return shuffle(shuffle(links)).slice(0, countNavLinks).map((link, index) => (
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
        h-full
        px-[5%]
        2xl:pt-8 lg:pt-10 pt-12
        lg:pb-6 pb-8
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
          h-full
          w-full
          ${styles.contentStartAll}
          ${styles.flexColToRowAtLg}
          text-2xs
          xl:space-x-25 lg:space-x-12.5
          lg:space-y-0 space-y-[3%]
        `}
      >
        {footerColumns.map((col) => (
          <div key={`footer-col-${col.context}`}
            id={`${col.context}-container`}
            className={`
              ${styles.flexCol}
              ${col.context !== "navigation" ? styles.contentStartAll : ""}
              w-fit
              ${col.context === "credits" ? "text-nowrap" : ""}
              ${col.context === "see-also" ? "h-full text-nowrap" : ""}
              gap-2
            `}
          >
            <h3 id={`${col.context}-title`}
              className={`
                font-primary-semibold
                lg:text-base text-sm
                text-(--color-quaternary)
                ${col.context === "credits" ? "w-full" : ""}
                mb-1
              `}
            >{col.title[currentLang]}</h3>

            {renderColumnItems(col.context, col.content)}
          </div>
        ))}
      </div>

      <div id="copyrigth-container"
        className={`
          ${styles.flexRow}
          justify-start items-center lg:justify-end lg:items-end
          ${styles.sizeFull}
          self-end
          pt-4
          mt-4
          border-t border-(--color-border)
          text-xs
        `}
      >
        <a id="copyrigth"
          href={getLinkFromTypedLink(copyrigthText.link, currentLang)}
          className={`
            text-left lg:text-right
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
