import styles from "../../style"
import { coreImages } from "../../assets"
import { bioText, aboutMottos, aboutLanguages, aboutStack, aboutSection } from "../../assets/contents"
import DOMPurify from "dompurify"
import { useContext, useMemo } from "react"
import { Link } from "react-router"
import { LangContext } from "../language"
import { ThemeContext } from "../theme/ThemeEngine"
import { getActiveBreakpoint, randomNumberBetween } from "../../utils"
import { aboutLinks } from "../../assets/constants"

const About = () => {
  const { currentLang } = useContext(LangContext);
  const { currentTheme } = useContext(ThemeContext);

  /** Pick a random motto on mount (stable across re-renders). */
  const motto = useMemo(
    () => aboutMottos[randomNumberBetween(0, aboutMottos.length - 1)],
    []
  );

  /** Shared widget card classes. */
  const widgetCard = `
    px-4 py-3
    rounded-lg
    bg-(--color-secondary)
    border border-(--color-tertiary)/15
  `;

  return (
    <section id="about"
      className=
      {`
        ${styles.sizeFull}
        ${getActiveBreakpoint('number') as number <= 1 ? styles.flexCol : styles.flexRow}
        ${styles.contentStartY}
        2xl:space-x-5 lg:space-x-15
        overflow-hidden
      `}
    >
      <div id="left-side-container"
        className=
        {`
          ${getActiveBreakpoint('number') as number <= 2 ? "hidden" : styles.flexCol}
          w-5/12
          h-fit
          relative
          space-y-[6%]
        `}
      >
        <div className="relative w-fit">
          <div className="
            absolute
            top-3 left-3
            w-full h-full
            rounded-[5px]
            border-2 border-(--color-tertiary)/40
            pointer-events-none
          " />
          <img src={coreImages.portrait}
            alt="author-portrait"
            className="
              object-cover
              object-center
              aspect-square
              rounded-[5px]
              w-full
              max-w-70
              shadow-xl
              relative
            "
          />
        </div>

        <div id="links-container"
          className={`
            ${styles.flexCol}
            space-y-2
            text-md
            overflow-x-visible
          `}
        >
          {aboutLinks.map((ressource) => (
            ressource.context == "0" ?
              <Link key={ressource.link}
                to={ressource.link}
                className={styles.animatedLink}
              > {ressource.content[currentLang]} </Link>
            :
              <a key={ressource.link}
                href={ressource.link}
                className={styles.animatedLink}
              > {ressource.content[currentLang]} </a>
          ))}
        </div>
      </div>

      <div id="about-info"
        className=
        {`
          ${styles.sizeFit}
          ${styles.flexCol}
          ${styles.contentStartAll}
        `}
      >
        <h2 dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(bioText.find((e) => e.active)!.title[currentLang])}}
          className=
          {`
            ${styles.heading2}
          `}
        />

        <div className={`
            ${styles.flexCol} md:${styles.flexRow}
            w-full
            xl:gap-5 lg:gap-4 gap-3
          `}
        >
          <div id="about-text"
            className={`
              ${styles.flexCol}
              ${styles.sizeFit}
            `}
          >
            <div className={`md:flex-1`}>
              <h3 className="
                font-primary-semibold
                2xl:text-md xl:text-md md:text-sm text-2xs
                text-(--color-tertiary)
                mb-2
              "> {aboutSection.title[currentLang]} </h3>
              <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(aboutSection.content[currentLang])}}
                className={`
                  font-primary-regular
                  2xl:text-md xl:text-lg md:text-md base:text-2xs
                  leading-[145%] base:leading-[140%]
                  tracking-wide
                  text-wrap
                  whitespace-pre-line
                  2xl:pr-[3.5%]
                `}
              />
            </div>

            <div className={`md:flex-1`}>
              <h3 className="
                font-primary-semibold
                2xl:text-md xl:text-md md:text-sm text-2xs
                text-(--color-tertiary)
                mb-2
              "> {aboutSection.title[currentLang]} </h3>
              <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(aboutSection.content[currentLang])}}
                className={`
                  font-primary-regular
                  2xl:text-md xl:text-lg md:text-md base:text-2xs
                  leading-[145%] base:leading-[140%]
                  tracking-wide
                  text-wrap
                  whitespace-pre-line
                  2xl:pr-[3.5%]
                `}
              />
            </div>
          </div>

          {/* Right column — stacked widgets */}
          <div className={`
            ${styles.flexCol}
            xl:gap-5 lg:gap-4 gap-3
            md:w-5/12
          `}>
            {/* Languages widget */}
            <div className={widgetCard}>
              <h3 className="
                font-primary-semibold
                2xl:text-md xl:text-md md:text-sm text-2xs
                text-(--color-tertiary)
                mb-2
              "> {currentLang === "fr" ? "Langues" : "Languages"} </h3>
              <ul className="
                font-primary-regular
                2xl:text-md xl:text-lg md:text-md base:text-2xs
                tracking-wide
                space-y-0.5
              ">
                {aboutLanguages.map((lang) => (
                  <li key={lang.label.en}>
                    <span className="font-primary-semibold">{lang.label[currentLang]}</span>
                    {" — "}
                    <span className="opacity-70">{lang.level[currentLang]}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stack widget */}
            <div className={widgetCard}>
              <h3 className="
                font-primary-semibold
                2xl:text-md xl:text-md md:text-sm text-2xs
                text-(--color-tertiary)
                mb-2
              "> Stack </h3>
              <div className={`${styles.flexRow} ${styles.flexWrap} gap-3`}>
                {aboutStack.map((icon) => (
                  <img
                    key={icon.label}
                    src={icon.content[currentTheme]}
                    alt={icon.alt}
                    title={icon.alt.replace(" Icon", "")}
                    className="2xl:w-8 2xl:h-8 xl:w-7 xl:h-7 w-6 h-6"
                  />
                ))}
              </div>
            </div>

            {/* Motto widget */}
            <div className={widgetCard}>
              <h3 className="
                font-primary-semibold
                2xl:text-md xl:text-md md:text-sm text-2xs
                text-(--color-tertiary)
                mb-2
              "> Motto </h3>
              <p className="
                font-primary-regular italic
                2xl:text-md xl:text-lg md:text-md base:text-2xs
                tracking-wide
              ">
                &laquo; {motto.content[currentLang]} &raquo;
              </p>
            </div>
          </div>
        </div>

        <div id="links-container-mobile"
          className={`
            ${styles.flexCol}
            lg:hidden
            space-y-2
            pt-5
          `}
        >
          {aboutLinks.map((ressource) => (
            ressource.context == "0" ?
              <Link key={ressource.link}
                to={ressource.link}
                className={styles.animatedLink}
              > {ressource.content[currentLang]} </Link>
            :
              <a key={ressource.link}
                href={ressource.link}
                className={styles.animatedLink}
              > {ressource.content[currentLang]} </a>
          ))}
        </div>
      </div>

      <span id="portrait-container-mobile"
        className=
        {`
          ${getActiveBreakpoint('number') as number < 1 ? styles.flexCol : "hidden"}
          sm:ss:hidden
          w-full
          h-fit
          ${styles.contentCenter}
          relative
          sm:pt-[10%] xs:pt-[10%] pt-[2%]
        `}
      >
        <div className="relative w-fit">
          <div className="
            absolute
            top-2.5 left-2.5
            w-full h-full
            rounded-[5px]
            border-2 border-(--color-tertiary)/40
            pointer-events-none
          " />
          <img src={coreImages.portrait}
            alt="author-portrait"
            className="
              object-cover
              object-center
              aspect-square
              rounded-[5px]
              xs:w-[200px] w-[175px]
              shadow-xl
              relative
            "
          />
        </div>
      </span>
    </section>
  )
}

export default About
