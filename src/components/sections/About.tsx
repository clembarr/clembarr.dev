import styles from "../../style"
import { coreImages, documents } from "../../assets"
import { bioText, aboutTags, aboutSections } from "../../assets/contents"
import DOMPurify from "dompurify"
import { useContext } from "react"
import { Link } from "react-router"
import { LangContext } from "../language"
import { getActiveBreakpoint } from "../../utils"
import { aboutLinks, placeholderMessages } from "../../assets/constants"

const About = () => {
  const { currentLang } = useContext(LangContext);

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
            text-(--color-tertiary)
            overflow-x-visible
          `}
        >
          {aboutLinks.map((ressource) => (
            ressource.context == "0" ? 
              <Link id={ressource.link}
                to={ressource.link}
                className={`
                  cursor-pointer
                  hover:translate-x-1.5
                  ${styles.defaultTransition}
                `}
              > {ressource.content[currentLang]} </Link>
            :
              <a id={ressource.link}
                href={ressource.link}
                className={`
                  cursor-pointer
                  hover:translate-x-1.5
                  ${styles.defaultTransition}
                `}
              > {ressource.content[currentLang]} </a>
          ))}
        </div>
      </div>

      <div id="about-text"
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
          ${styles.flexCol}
          w-full
          xl:gap-5 lg:gap-4 gap-3
        `}>
          {aboutSections.map((section) => (
            <div key={section.title.en}
              className={`
                w-full
                px-4 py-3
                rounded-lg
                bg-(--color-secondary)
                border border-(--color-tertiary)/15
              `}
            >
              <h3 className="
                font-primary-semibold
                2xl:text-md xl:text-md md:text-sm text-2xs
                text-(--color-tertiary)
                mb-2
              "> {section.title[currentLang]} </h3>

              <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(section.content[currentLang])}}
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
          ))}

          <div className={`
            ${styles.flexRow}
            ${styles.flexWrap}
            gap-3
            w-full
          `}>
            {aboutTags.map((encart) => (
              <div key={encart.label.en}
                className={`
                  ${styles.flexRow}
                  items-center
                  gap-2
                  px-3 py-1.5
                  rounded-lg
                  bg-(--color-secondary)
                  border border-(--color-tertiary)/15
                `}
              >
                <span className="
                  font-primary-semibold
                  2xl:text-sm xl:text-xs text-3xs
                  text-(--color-tertiary)
                "> {encart.label[currentLang]} </span>

                <span className="
                  text-(--color-tertiary)/30
                  2xl:text-sm xl:text-xs text-3xs
                "> | </span>

                <div className={`${styles.flexRow} ${styles.flexWrap} gap-1.5`}>
                  {encart.tags[currentLang].map((tag) => (
                    <span key={tag} className={`${styles.tag} 2xl:text-xs xl:text-3xs text-3xs`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
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
              <Link id={ressource.link}
                to={ressource.link}
                className={`
                  cursor-pointer
                  hover:translate-x-1.5
                  ${styles.defaultTransition}
                  overflow-x-visible
                `}
              > {ressource.content[currentLang]} </Link>
            :
              <a id={ressource.link}
                href={ressource.link}
                className={`
                  xl:text-lg lg:text-base
                  text-(--color-tertiary)
                  cursor-pointer
                  hover:translate-x-1.5
                  transition-all
                  duration-300
                  ease-in-out
                  overflow-x-visible
                `}
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
