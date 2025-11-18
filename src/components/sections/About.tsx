import styles from "../../style"
import { coreImages, documents } from "../../assets"
import { bioText } from "../../assets/contents"
import DOMPurify from "dompurify"
import { useContext } from "react"
import { LangContext } from "../language"
import { getActiveBreakpoint } from "../../utils"
import { placeholderMessages } from "../../assets/constants"

const About = () => {
  const { currentLang } = useContext(LangContext);

  return (
    <section id="about"
      className=
      {`
        ${styles.sizeFull}
        ${getActiveBreakpoint('number') as number <= 1 ? styles.flexCol : styles.flexRow}
        ${styles.contentStartY}
        2xl:space-x-[20px] lg:space-x-[60px]
        lg:space-y-0 base:space-y-[10%]
        overflow-hidden
        lg:pt-0 md:pt-[28%] sm:pt-[25%] ss:pt-[25%] xs:pt-[20%] pt-[10%]
      `}
    >
      <span id="portrait-container-desktop"
        className=
        {`
          ${getActiveBreakpoint('number') as number <= 2 ? "hidden" : styles.flexCol}
          w-5/12
          h-fit
          relative
          space-y-[6%]
        `}
      >
        <img src={coreImages.portrait}
          alt="author-portrait"
          className=
          {`
            object-cover
            object-center
            aspect-square
            rounded-[5px]
            2xl:w-[93%] xl:w-full w-full
            max-w-[280px]
            right-0
            shadow-xl
          `}
        />

        <a id="additional-link"
          href={documents.cv}
          className=
          {`
            xl:text-lg lg:text-base
            text-(--color-tertiary)
            cursor-pointer
            hover:translate-x-1.5
            transition-all
            duration-300
            ease-in-out
            overflow-x-visible
          `}
        > {placeholderMessages.find(message => message.context === "aboutAdditionalLink")!.content[currentLang]} </a>
      </span>

      <div id="about-text"
        className=
        {`
          ${styles.sizeFit}
          ${styles.flexCol}
          ${styles.contentStartAll}
          lg:space-y-0 md:space-y-[2%] space-y-[1%]
        `}
      >
        <h2 dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(bioText.find((e) => e.active)!.title[currentLang])}}
          className=
          {`
            ${styles.heading2}
          `}
        />

        <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(bioText.find((e) => e.active)!.content[currentLang])}}
          className=
          {`
            ${styles.sizeFull}
            ${styles.paragraph}
            2xl:pr-[3.5%]
          `}
        />

        <a id="additional-link"
          href={documents.cv}
          className=
          {`
            lg:hidden
            pt-[20px]
            sm:text-md ss:text-md xs:text-sm text-2xs
            text-(--color-tertiary)
            overflow-x-visible
          `}
        > {placeholderMessages.find(message => message.context === "aboutAdditionalLink")!.content[currentLang]} </a>
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
        <img src={coreImages.portrait}
          alt="author-portrait"
          className=
          {`
            object-cover
            object-center
            aspect-square
            rounded-[5px]
            xs:w-[200px] w-[175px]
            shadow-xl
          `}
        />
      </span>
    </section>
  )
}

export default About
