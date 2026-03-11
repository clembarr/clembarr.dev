import styles from "../../style"
import { author, HERO_FADE_DELAY_MS, HERO_TYPING_SPEED_MS, HERO_BACKSPACE_SPEED_MS, HERO_TYPING_PAUSE_MS } from "../../assets/constants"
import { subtitleMessages } from "../../assets/contents"
import { useContext, useEffect, useState } from "react"
import DOMPurify from "dompurify"
import { ThemeContext } from "../theme/ThemeEngine"
import { LangContext } from "../language"
import HeroIllustration from "./HeroIllustration"

/**
 * @component Hero
 * @description Landing section. Displays the author's name with a typewriter
 * subtitle cycling through subtitleMessages. The illustration and text fade in
 * on mount; the underline slides in with a short delay.
 */
const Hero = () => {
  const { currentTheme } = useContext(ThemeContext);
  const [displayText, setDisplayText] = useState('');
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { currentLang } = useContext(LangContext);

  const isDark = currentTheme === 'dark';

  // Fade in the section on mount.
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), HERO_FADE_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  // Typewriter effect: type the current subtitle, pause, then backspace.
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
          }, HERO_BACKSPACE_SPEED_MS);

        }, HERO_TYPING_PAUSE_MS);

      } else {
        index++;
        text = message.substring(0, index);
        setDisplayText(text);
      }
    }, HERO_TYPING_SPEED_MS);

    return () => clearInterval(interval);
  }, [currentMessage, currentLang]);

  return (
    <section id="hero"
      className={`
        ${styles.sizeFull}
        ${styles.flexRow}
        justify-start items-center lg:justify-center
        overflow-visible
        font-primary-regular
        relative
        min-h-125
      `}
    >
      <HeroIllustration isVisible={isVisible} />

      <div id="hero-text"
        className={`
          ${styles.sizeFull}
          z-10
          ${styles.flexCol}
          ${styles.contentStartAll}
          2xl:space-y-13.75 lg:space-y-10 space-y-6
          relative
          2xl:pr-[75%] xl:pr-[75%] lg:pr-[70%] md:pr-[65%] sm:pr-[65%] ss:pr-[50%] xs:pr-[40%] pr-[40%]
        `}
      >
        <div id="text-container"
          className={`
            ${styles.sizeFit}
            relative
            2xl:mt-37.5 xl:mt-27.5 lg:mt-25 md:mt-20 sm:mt-15 mt-11.25
            transition-all duration-700
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
          `}
        >
          <h1 id="main-title-container"
            className={`
              tracking-[0.05em]
              2xl:leading-11 lg:leading-11 md:leading-10 sm:leading-9 ss:leading-8 leading-7
              2xl:text-md text-md
            `}
          >
            <span id="first-line"
              className={`
                2xl:text-[60px] xl:text-[48px] lg:text-[42px] md:text-[38px] ss:text-[32px] text-[25px]
                text-(--color-muted)
                font-primary-regular
              `}>
              {author.firstName}
            </span>
            <br/>

            <span id="second-line"
              className={`
                font-black
                2xl:text-7xl xl:text-[52px] lg:text-[49px] md:text-[45px] ss:text-[38px] text-[30px]
                tracking-wide
                ${isDark ? 'text-(--color-tertiary)' : 'text-(--color-quaternary)'}
              `}>
              {author.lastName.toUpperCase()}
            </span>
            <br className="hidden sm:block"/>
          </h1>

          <div id="underline"
            className={`
              absolute
              2xl:-bottom-4.5 lg:-bottom-3.5 -bottom-2.5
              sm:left-1/4 left-[26%]
              w-2/3
              2xl:h-1 xs:h-1 h-0.75
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
            mt-2 md:mt-4 2xl:mt-2
            md:mr-0 mr-4
            leading-4 xs:leading-5 lg:leading-9
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
          style={{ transitionDelay: '300ms' }}
        >
          <p id="current-subtitle"
            className={`
              text-2xs xs:text-2xs sm:text-sm md:text-sm lg:text-md 2xl:text-lg
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
              2xl:h-[1.2em] xs:h-[0.8em] h-[0.5em]
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
