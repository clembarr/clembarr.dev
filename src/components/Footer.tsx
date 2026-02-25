import styles from "../style"
import { copyrigthText, creditsMentions, navLinks } from "../assets/constants"
import { getActiveBreakpoint, getCurrentNavigation, shuffle } from "../utils"
import { useContext, useEffect, useState } from "react"
import { sharedLinks } from "../assets/contents"
import DOMPurify from "dompurify"
import { LangContext } from "./language"
import { ThemeContext } from "./theme/ThemeEngine"

const Footer = () => {
  const [currentNavigation, setCurrentNavigation] = useState(getCurrentNavigation())
  const { currentLang } = useContext(LangContext)
  const { currentTheme } = useContext(ThemeContext)

  const isDark = currentTheme === 'dark';

  useEffect(() => {
    setCurrentNavigation(getCurrentNavigation())

  }, [window.location.pathname, window.location.hash])

  return (
    <footer id="footer"
      className=
      {`
        w-screen
        h-full
        px-[5%]
        2xl:pt-8 lg:pt-10 pt-12
        lg:pb-6 pb-8
        ${getActiveBreakpoint('number') as number <= 2 ? styles.flexCol : styles.flexRow}
        lg:space-y-0 space-y-8
        bg-(--color-secondary)
        border-t border-(--color-border)
        relative
        ${isDark ? 'shadow-[0_-4px_20px_rgba(0,0,0,0.3)]' : 'shadow-[0_-2px_10px_rgba(0,0,0,0.05)]'}
      `}
    >
      {/* Decorative top line */}
      <div className={`
        absolute top-0 left-1/2 -translate-x-1/2
        w-1/3 h-px
        bg-gradient-to-r from-transparent via-(--color-tertiary) to-transparent
        ${isDark ? 'opacity-50' : 'opacity-30'}
      `} />
      <div id="footer-content"
        className=
        {`
          h-full
          w-full
          ${styles.contentStartAll}
          ${getActiveBreakpoint('number') as number <= 2 ? styles.flexCol : styles.flexRow}
          text-2xs
          xl:space-x-[100px] lg:space-x-[50px]
          lg:space-y-0 space-y-[3%]
        `}
      >
        <div id="nav-links-container"
          className=
          {`
            ${styles.flexCol}
            w-fit
            gap-2
          `}
        >
          <h3 id="nav-links-title"
            className=
            {`
              font-primary-semibold
              lg:text-base text-sm
              text-(--color-quaternary)
              mb-1
            `}
          >Navigation</h3>

          {navLinks.filter((pattern) => pattern.route.includes(window.location.pathname.split("/")[1]))[0].links
          .map((navLink, index) => (
            <a key={`nav-link-${index}`}
              id={`nav-link-${navLink.content[currentLang]}`}
              href={navLink.link}
              className=
              {`
                text-sm
                transition-all duration-200
                ${(navLink.link).toLowerCase() === currentNavigation
                  ? `text-(--color-tertiary) ${isDark ? 'drop-shadow-[0_0_4px_rgba(124,255,196,0.4)]' : ''}`
                  : 'text-(--color-muted) hover:text-(--color-tertiary)'
                }
              `}
              onClick={() => setCurrentNavigation((navLink.link).toLowerCase())}
            > {navLink.content[currentLang] || navLink.content[0]} </a>
          ))}
        </div>

        <div id="credits-container"
          className=
          {`
            ${styles.flexCol}
            ${styles.contentStartAll}
            text-nowrap
            gap-2
          `}
        >
          <h3 id="credits-title"
            className=
            {`
              font-primary-semibold
              lg:text-base text-sm
              text-(--color-quaternary)
              w-full
              mb-1
            `}
          >Credits</h3>

          {creditsMentions.map((credit, index) => (
            <a key={`credit-${index}`}
              id={`credit-${credit.content[currentLang]}`}
              href={
                credit.link ? credit.link
                : (Array.isArray(credit.contentRef) ?
                  credit.contentRef[0].content[currentTheme]
                  : credit.contentRef.content[currentTheme])
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
              <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          ))}
        </div>

        <div id="see-also-container"
          className=
          {`
            ${styles.flexCol}
            ${styles.contentStartAll}
            w-fit
            h-full
            text-nowrap
            gap-2
          `}
        >
          <h3 id="see-also-title"
            className=
            {`
              font-primary-semibold
              lg:text-base text-sm
              text-(--color-quaternary)
              mb-1
            `}
          >See also</h3>

          <div id="see-also-links-cols"
            className=
            {`
              ${styles.flexCol}
              gap-2
            `}
          >
            {shuffle(shuffle(sharedLinks)).map((link, index) => {
              if (index >= 4) {return;}

              return (
                <a key={`see-also-${index}`}
                  id={`see-also-${index}`}
                  href={link.link}
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
                  <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )
            })}
          </div>
        </div>
      </div>

      <div id="copyrigth-container"
        className=
        {`
          ${styles.flexRow}
          ${getActiveBreakpoint('number') as number <= 2 ? styles.contentStartX : styles.contentEndAll}
          ${styles.sizeFull}
          self-end
          pt-4
          mt-4
          border-t border-(--color-border)
        `}
      >
        <a id="copyrigth"
          href={copyrigthText.link}
          className=
          {`
            ${getActiveBreakpoint('number') as number <= 2 ? "text-left" : "text-right"}
            text-xs
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
