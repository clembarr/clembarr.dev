import styles from "../../style"
import { coreImages } from "../../assets"
import { bioText, aboutSection, aboutWidgets } from "../../assets/contents"
import DOMPurify from "dompurify"
import { useCallback, useContext, useEffect, useMemo, useRef } from "react"
import { Link } from "react-router"
import { LangContext } from "../language"
import { ThemeContext } from "../theme/ThemeEngine"
import { adjustFontSize, getActiveBreakpoint, getLinkFromTypedLink, isOverflowing } from "../../utils/utils"
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
        titleAdditionnalStyle="text-lg font-bold mb-4"
        additionalTopStyles={`${styles.flexCol}`}
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
        titleAdditionnalStyle="text-lg font-bold mb-4"
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
        titleAdditionnalStyle="text-lg font-bold mb-2"
        contentStyle=""
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
        ${getActiveBreakpoint('number') as number <= 1 ? styles.flexCol : styles.flexRow}
        ${styles.contentStartY}
        overflow-hidden
      `}
    >
      <div id="left-side-container"
        className={`
          ${getActiveBreakpoint('number') as number <= 2 ? "hidden" : styles.flexCol}
          w-5/12
          h-fit
          relative
          space-y-12
        `}
      >
        <div className="relative w-fit">
          <div className={`
              absolute
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
            2xl:text-3xl xl:text-2xl lg:text-xl md:text-xl text-md
            xl:leading-8 base:leading-6
            w-full
            tracking-wider
            xl:mb-6 lg:mb-6 mb-4
            text-(--color-quaternary)
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
              <p ref={aboutTextRef}
                dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(aboutSection.content[currentLang])}}
                className={`
                  font-primary-regular
                  2xl:text-lg xl:text-lg md:text-md base:text-2xs
                  leading-[145%] base:leading-[140%]
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
              grid grid-cols-2
              gap-4
            `}
          >
            <div id="widget-1" className="h-full"> {currentlyWidget} </div>
            <div id="widget-2" className="h-full"> {futureWidget} </div>
          </div>

          <div id='second-row'
            className={`
              w-full
              grid grid-cols-[1.2fr_1fr_1fr]
              gap-4
              shadow-lg
              pb-2
            `}
          >
            <div id="widget-3" className="h-full"> {languagesWidget} </div>
            <div id="widget-4" className="h-full"> {interestsWidget} </div>
            <div id="widget-5" className="h-full"> {hobbiesWidget} </div>
          </div>
        </div>
      </div>

      <span id="portrait-container-mobile"
        className={`
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
