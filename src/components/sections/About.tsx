import styles from "../../style"
import { coreImages } from "../../assets"
import { bioText, aboutWidgets } from "../../assets/contents"
import DOMPurify from "dompurify"
import { useCallback, useContext, useEffect, useMemo, useRef } from "react"
import { Link } from "react-router"
import { LangContext } from "../language"
import { ThemeContext } from "../theme/ThemeEngine"
import { adjustFontSize, getLinkFromTypedLink, isOverflowing } from "../../utils/utils"
import { aboutLinks } from "../../assets/constants"
import AboutWidget from "../widgets/AboutWidget"
import { LanguageLevel } from "../../assets/dataTypes"
import { MultilingualContent, MultilingualContentArray } from "../../utils/assetsUtils"

/**
 * @component About
 * @description About section displaying bio text, portrait, links, and
 * contextual widgets (languages, hobbies, interests, currently working on, future goals).
 * Adjusts text font size dynamically on resize to prevent overflow.
 */
const About = () => {
  const { currentLang } = useContext(LangContext);
  const { currentTheme } = useContext(ThemeContext);

  const aboutTextRef = useRef<HTMLParagraphElement>(null);

  const handleTextOverflow = useCallback(() => {
    if (!aboutTextRef.current) return;
    if (isOverflowing(aboutTextRef.current)) {
      adjustFontSize(aboutTextRef.current, "min");
    } else {
      adjustFontSize(aboutTextRef.current, "max");
    }
  }, []);

  useEffect(() => {
    handleTextOverflow();
    window.addEventListener('resize', handleTextOverflow);
    return () => window.removeEventListener('resize', handleTextOverflow);
  }, [currentLang, handleTextOverflow]);

  const languagesWidget = useMemo(() => {
    const widget = aboutWidgets.find((widget) => widget.id == "lang");
    if (!widget) return null;

    const content = (widget.content as unknown as LanguageLevel[]).map((lang) => {
      return (
        <li key={lang.label[currentLang]}>
          <span className={`font-primary-semibold`}> {lang.label[currentLang]} </span>
            {" - "}
          <span className="opacity-70"> {lang.level[currentLang]} </span>
        </li>
      )
    })

    return (
      <AboutWidget
        id={widget.id}
        title={widget.title[currentLang]}
        content={(
          <ul id='languages-list'
            className={`
              font-primary-regular
              2xl:text-sm
              tracking-wide
              space-y-2
            `}
          > {content} </ul>
        )}
        titleAdditionnalStyle="text-sm md:text-lg font-bold mb-2 md:mb-4"
        additionalTopStyles={`${styles.flexCol}`}
        contentStyle="text-2xs ss:text-xs md:text-sm lg:text-md"
      />
    );
  }, [currentLang]);

  const tagsWidget = (widgetId: string) => {
    const widget = aboutWidgets.find((widget) => widget.id == widgetId);
    if (!widget) return null;

    const content: string[] = (widget.content as MultilingualContentArray)[currentLang] as string[];
    
    return (
      <AboutWidget
        id={widget.id}
        title={widget.title[currentLang]}
        content={content}
        titleAdditionnalStyle="text-sm md:text-lg font-bold mb-2 md:mb-4"
        contentStyle="text-xs md:text-sm "
        additionalTopStyles={`${styles.flexCol}`}
      />
    );
  }

  const hobbiesWidget = useMemo(() => {
    return tagsWidget("hobbies");
  }, [currentLang]);
  
  const interestsWidget = useMemo(() => {
    return tagsWidget("interests");
  }, [currentLang]);

  const textWidget = (widgetId: string) => {
    const widget = aboutWidgets.find((widget) => widget.id == widgetId);
    if (!widget) return null;

    return (
      <AboutWidget
        id={widget.id}
        title={widget.title[currentLang]}
        content={(<p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize((widget.content as MultilingualContent)[currentLang])}} />)}
        titleAdditionnalStyle="text-sm md:text-lg font-bold mb-2"
        contentStyle="text-2xs ss:text-sm md:text-md lg:text-md"
        additionalTopStyles={`${styles.flexCol}`}
      />
    );
  }

  const currentlyWidget = useMemo(() => {
    return textWidget("currently");
  }, [currentLang]);

  const futureWidget = useMemo(() => {
    return textWidget("future");
  }, [currentLang]);


  return (
    <section id="about"
      className={`
        ${styles.sizeFull}
        ${styles.flexColToRowAtMd}
        ${styles.contentStartY}
        overflow-hidden
        2xl:space-x-0 space-x-12
      `}
    >
      <div id="left-side-container"
        className={`
          ${styles.hiddenToFlexColAtLg}
          w-5/12
          h-fit
          relative
          xl:space-y-12 space-y-8
        `}
      >
        <div className="relative w-fit">
          <div className={`
              absolute
              hidden xl:block
              top-4 left-6
              w-full h-full
              rounded-[5px]
              border-2 border-(--color-tertiary)/40
              pointer-events-none
            `}
          />
          <img src={coreImages.portrait.content[currentTheme]}
            alt={coreImages.portrait.alt}
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
              <Link key={getLinkFromTypedLink(ressource.link, currentLang)}
                to={getLinkFromTypedLink(ressource.link, currentLang)}
                className={styles.animatedLink}
              > {ressource.content[currentLang]} </Link>
            :
              <a key={getLinkFromTypedLink(ressource.link, currentLang)}
                href={getLinkFromTypedLink(ressource.link, currentLang)}
                className={styles.animatedLink}
              > {ressource.content[currentLang]} </a>
          ))}
        </div>
      </div>

      <div id="about-info"
        className={`
          ${styles.sizeFull}
          ${styles.flexCol}
          ${styles.contentStartAll}
          overflow-hidden
        `}
      >
        <h2 dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(bioText.find((e) => e.active)!.title[currentLang])}}
          className={`
            font-primary-bold
            2xl:text-3xl xl:text-2xl lg:text-xl md:text-xl ss:text-lg text-md
            leading-6 xl:leading-8
            w-full
            md:tracking-wider tracking-normal
            xl:mb-6 lg:mb-6 mb-4
            text-(--color-quaternary)
            ml-1 lg:ml-0
          `}
        />

        <div className={`
            ${styles.flexColToRowAtMd}
            w-full
            xl:gap-5 lg:gap-4 gap-3
            ml-1 lg:ml-0
          `}
        >
          <div id="about-text"
            className={`
              ${styles.flexCol}
              ${styles.sizeFit}
            `}
          >
            <div className={`md:flex-1`}>
              <p ref={aboutTextRef}
                dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(bioText.find((e) => e.active)!.content[currentLang])}}
                className={`
                  font-primary-regular
                  text-xs ss:text-base md:text-md xl:text-lg 2xl:text-lg
                  leading-[140%] md:leading-[145%]
                  tracking-wide
                  text-wrap
                  whitespace-pre-line
                  2xl:pr-[3.5%]
                  overflow-hidden
                `}
              />
            </div>
          </div>
        </div>

        <div id='about-widgets-container'
          className={`
            w-full
            ${styles.flexCol}
            ${styles.contentStartAll}
            space-y-4
            mt-8
          `}
        >
          <div id='first-row'
            className={`
              w-full
              grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2
              gap-4
            `}
          >
            <div id="widget-1" className="h-full"> {currentlyWidget} </div>
            <div id="widget-2" className="h-full"> {futureWidget} </div>
          </div>

          <div id='second-row'
            className={`
              w-full
              grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-[1.2fr_1fr_1fr]
              gap-4
              shadow-lg
              pb-2
            `}
          >
            <div id="widget-3" className="h-full"> {languagesWidget} </div>
            <div id="widget-4" className="h-full"> {interestsWidget} </div>
            <div id="widget-5" className="h-full"> {hobbiesWidget} </div>

            <div id="widget-links" className="h-full lg:hidden">
              <div id="about-widget-links"
                className={`
                  px-3 py-2 md:px-6 md:py-4
                  h-full
                  ${styles.flexCol}
                  space-y-2
                  sm:text-base text-sm
                  ${styles.contentStartY}
                `}
              >
                {aboutLinks.map((ressource) => (
                  ressource.context == "0" ?
                    <Link key={getLinkFromTypedLink(ressource.link, currentLang)}
                      to={getLinkFromTypedLink(ressource.link, currentLang)}
                      className={styles.animatedLink}
                    > {ressource.content[currentLang]} </Link>
                  :
                    <a key={getLinkFromTypedLink(ressource.link, currentLang)}
                      href={getLinkFromTypedLink(ressource.link, currentLang)}
                      className={styles.animatedLink}
                    > {ressource.content[currentLang]} </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <span id="portrait-container-mobile"
        className={`
          hidden
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
          <img src={coreImages.portrait.content[currentTheme]}
            alt={coreImages.portrait.alt}
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
