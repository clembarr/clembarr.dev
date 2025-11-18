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
        2xl:pt-[2%] lg:pt-[4%] pt-[10%]
        lg:pb-[2%] pb-[5%]
        ${getActiveBreakpoint('number') as number <= 2 ? styles.flexCol : styles.flexRow}
        lg:space-y-0 space-y-[8%]
        color-scheme-secondary
        relative
        shadow-md
      `}
    >
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
          `}
        >
          <h3 id="nav-links-title"
            className=
            {`
              font-primary-semibold
              lg:text-lg
            `}
          >Navigation</h3>

          {navLinks.filter((pattern) => pattern.route.includes(window.location.pathname.split("/")[1]))[0].links
          .map((navLink, index) => (
            <a key={`nav-link-${index}`}
              id={`nav-link-${navLink.content[currentLang]}`}
              href={navLink.link}
              className=
              {`
                ${(navLink.link).toLowerCase() === currentNavigation ? 'text-(--color-tertiary)' : ""}
                ${styles.hyperlink}
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
          `}
        >
          <h3 id="credits-title"
            className=
            {`
              font-primary-semibold
              lg:text-lg
              w-full
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
              className={`${styles.hyperlink}`}
              target="_blank" 
              rel="noopener noreferrer"
            > {credit.content[currentLang]} </a>
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
          `}
        >
          <h3 id="see-also-title"
            className=
            {`
              font-primary-semibold
              lg:text-lg
            `}
          >See also</h3>
          
          <div id="see-also-links-cols"
            className=
            {`
              ${styles.flexRow}
              ${styles.sizeFull}
              space-x-[8%]
            `}
          >
            <div id="links-col-1"
              className=
              {`
                ${styles.sizeFull}
                ${styles.flexCol}
                overflow-y-scroll
                overflow-x-hidden
              `}
            >
              {shuffle(shuffle(sharedLinks)).map((link, index) => {
                if (index >= 4) {return;}

                return (
                  <a key={`credit-${index}`}
                    id={`credit-${index}`}
                    href={link.link}
                    className={`${styles.hyperlink}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                  > {link.content[currentLang]} </a>
                )
              })}
            </div>
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
          text-3xs
        `}
      >
        {
          <a id="copyrigth" 
            href={copyrigthText.link}
            className=
            {`
              ${getActiveBreakpoint('number') as number <= 2 ? "text-left" : "text-right"}
              ${styles.hyperlink}
            `}
            target="_blank" 
            rel="noopener noreferrer"
            dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(copyrigthText.content[0])}}
          />
        }
      </div>

    </footer>
  )
}

export default Footer
