import styles from "../../style"
import { author } from "../../assets/constants"
import { subtitleMessages } from "../../assets/contents"
import { useContext, useEffect, useState } from "react"
import DOMPurify from "dompurify"
import { ThemeContext } from "../theme/ThemeEngine"
import { LangContext } from "../language"
import { getActiveBreakpoint } from "../../utils"
import HeroIllustration from "./HeroIllustration"

const Hero = () => {
  const { currentTheme } = useContext(ThemeContext);
  const [displayText, setDisplayText] = useState('');
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { currentLang } = useContext(LangContext);

  const isDark = currentTheme === 'dark';

  //fade in effect on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  //typing effect for subtitle messages
  useEffect(() => {
    const message: string = subtitleMessages[currentMessage].content[currentLang];
    let index = 0;
    let text = '';

    let interval = setInterval(() => {
      if (index === message.length) {
        clearInterval(interval);

        setTimeout(() => {
          interval = setInterval(() => {
            if (index === 0) {
              clearInterval(interval);
              setCurrentMessage((currentMessage + 1) % subtitleMessages.length);

            } else {
              index--;
              text = message.substring(0, index);
              setDisplayText(text);
            }
          }, 1);

        }, 4000);

      } else {
        index++;
        text = message.substring(0, index);
        setDisplayText(text);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [currentMessage, currentLang]);

  return (
    <section id="hero"
      className=
      {`
        ${styles.sizeFull}
        ${styles.flexRow}
        ${getActiveBreakpoint('number') as number <= 2 ? styles.contentStartX : styles.contentCenter}
        overflow-visible
        font-primary-regular
        relative
        min-h-125
      `}
    >
      <HeroIllustration isVisible={isVisible} />

      <div id="hero-text"
        className=
        {`
          ${styles.sizeFull}
          z-10
          ${styles.flexCol}
          ${styles.contentStartAll}
          2xl:space-y-13.75 lg:space-y-10 space-y-7.5
          relative
          2xl:pr-[75%] xl:pr-[75%] lg:pr-[70%] md:pr-[65%] sm:pr-[65%] ss:pr-[50%] xs:pr-[40%] pr-[40%]
        `}
      >
        <div id="text-container" 
          className=
          {`
            ${styles.sizeFit}
            relative
            2xl:mt-37.5 xl:mt-27.5 lg:mt-25 md:mt-20 sm:mt-15 mt-11.25
            transition-all duration-700
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
          `}
        >
          <h1 id="main-title-container"
            className=
            {`
              tracking-[0.05em]
              2xl:leading-13 xl:leading-12 lg:leading-11 md:leading-9 leading-9
              2xl:text-9xl xl:text-5xl lg:text-4xl text-
            `}
          >
            <span id="first-line"
              className=
              {`
                text-[54px]
                text-(--color-muted)
                font-primary-regular
            `}>
              {author.firstName}
            </span>
            <br/>

            <span id="second-line"
              className=
              {`
                font-primary-bold
                text-7xl
                tracking-wide
                ${isDark ? 'text-(--color-tertiary)' : 'text-(--color-quaternary)'}
            `}>
              {author.lastName.toUpperCase()}
            </span>
            <br className="sm:block base:hidden"/>
          </h1>

          <div id="underline" 
            className=
            {`
              absolute
              2xl:-bottom-4.5 lg:-bottom-3.5 -bottom-2.5
              sm:left-1/4 left-[26%]
              w-2/3
              2xl:h-1 h-0.75
              bg-(--color-tertiary)
              rounded-full
              transition-all duration-700
              ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}
              origin-left
            `}
            style={{ transitionDelay: '200ms' }}
          />
        </div>

        <div id="typing-subtitles-container"
          className={`
            transition-all duration-700
            2xl:mt-2
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
          style={{ transitionDelay: '300ms' }}
        >
          <p id="current-subtitle"
            className={`
              2xl:text-xl lg:text-md md:text-sm text-xs
              text-wrap
              text-(--color-quaternary)
              inline
            `}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                /*escape HTML angle brackets to prevent rendering issues*/
                displayText[displayText.length-1] === "<" ?
                displayText.substring(0, displayText.length-1)
                : displayText
              )
            }}
          />
          
          <span id="typing-cursor"
            className={`
              inline-block
              w-0.5
              h-[1.2em]
              ml-1
              align-middle
              bg-(--color-tertiary)
              animate-[glow-pulse_1s_ease_infinite]
              ${isDark ? 'shadow-(--glow-sm)' : ''}
            `} 
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
