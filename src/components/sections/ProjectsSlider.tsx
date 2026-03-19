import { Project } from "../../assets/dataTypes"
import { SLIDER_CARD_INTERVAL_MS, SLIDER_CARD_APPARITION_TIMEOUT_MS, SLIDER_PERSPECTIVE } from "../../assets/constants"
import { projects } from "../../assets/contents"
import styles from "../../style"
import { coreImages, menuIcons } from "../../assets"
import { SwipeIndicator } from "../widgets"
import { cloneElement, ReactElement, useContext, useEffect, useRef, useState } from "react"
import { randomNumberBetween } from "../../utils/utils"
import { ProjectCard } from "../cards"
import { ThemeContext } from "../theme/ThemeEngine"
import { LangContext } from "../language"

/**
 * @component ProjectsSlider
 * @description Animated stacked card carousel displaying projects on the home page.
 * Cards appear one by one on mount and can be cycled forward or backward.
 * Each card has a randomised tilt; the top card flattens to 0° when active.
 */
const ProjectsSlider = () => {
  const { currentTheme } = useContext(ThemeContext);
  const { currentLang } = useContext(LangContext);
  const [cards, setCards] = useState<Array<ReactElement>>([]);
  const apparitionEnded = useRef<boolean>(false);
  const topCardTrueAngle = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const assignRotation = (index: number, all: number) => {
    return(
      index === all - 1 ? 0
      : index % 2 === 0 ? index + randomNumberBetween(4, 9)
      : `-${index + randomNumberBetween(2, 6)}`
    )
  }

  // Make a stack of cards from the projects
  const initCards = () => {
    const slides: Array<ReactElement> = [];
  
    projects.slice(0,10).map((project: Project, index: number, all: Project[]) => {
      slides.push(
        <ProjectCard key={`project-${index}-card`}
          project={project}
          additionalStyles={{
            rotate: `${assignRotation(index, all.length)}deg`,
            animation: `card-apparition 0.5s cubic-bezier(.54,.54,.57,.56) forwards`,
            transformStyle: 'preserve-3d',
          }}
        />
      )
    });
  
    return slides;
  }

  // This effect handles the non-passive touchmove listener to block vertical scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchMove = (e: TouchEvent) => {
      const touchCurrentX = e.touches[0].clientX;
      const touchCurrentY = e.touches[0].clientY;
      const diffX = Math.abs(touchStartX.current - touchCurrentX);
      const diffY = Math.abs(touchStartY.current - touchCurrentY);

      //prevent vertical scrolling while swiping horizontally
      if (diffX > diffY && diffX > 10) {
        if (e.cancelable) e.preventDefault();
      }
    };

    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => container.removeEventListener('touchmove', handleTouchMove);
  }, []);

  // This effect occurs only once, it allows to display the stack card by card
  useEffect(() => {
    const initialCards: ReactElement[] = initCards();
  
    let i = 0;
    const interval = setInterval(() => {
      if (i < initialCards.length) {
        setCards(initialCards.slice(0, i+1))
      } else {
        clearInterval(interval);
      }
      i++;
    }, SLIDER_CARD_INTERVAL_MS);

    return () => {
      clearInterval(interval);
      setTimeout(() => apparitionEnded.current = true, SLIDER_CARD_APPARITION_TIMEOUT_MS * initialCards.length);
    };
  }, [currentLang, currentTheme]);

  // This function is called before updating the cards, to animate the cards according to their position
  const adjustAnimations = (cardsCopy: ReactElement[], from?: "prev" | "next") => {
    let tmp: number;

    return(
      cardsCopy.map((card, index) => {
        tmp = 0;

        switch (index) {
          case cardsCopy.length - 1:
            tmp = topCardTrueAngle.current;
            topCardTrueAngle.current = from === "next" ? topCardTrueAngle.current : 0;
            return (
              cloneElement(card, {
                additionalStyles: {
                  animation: (
                    from === "next" ? `card-top-to-bottom 2s ease-in forwards` 
                    : "card-top-to-second ease-in 0.2s forwards"
                  ),
                  rotate: `${
                    tmp !== 0 
                    ? tmp : assignRotation(randomNumberBetween(0,1), cardsCopy.length)
                  }deg`
                },
                onaonanimationend: (from === "next" ? (e: React.AnimationEvent<HTMLDivElement>) => {
                  e.currentTarget.style.rotate = '0deg';
                } : undefined)
              })
            )
          case cardsCopy.length - 2:
            topCardTrueAngle.current = from === "next" ? parseInt(card.props.additionalStyles.rotate.split("deg")[0]) : topCardTrueAngle.current;
            return (
              cloneElement(card, {
                additionalStyles: {
                  animation: (from === "next" ? `card-reach-top ease-in 0.3s forwards` : ""),
                  rotate: (`${card.props.additionalStyles.rotate}`)
                },
                onanimationend: (from === "next" ? (e: React.AnimationEvent<HTMLDivElement>) => {
                  e.currentTarget.style.rotate = '0deg';
                } : undefined)
              })
            )
          case 0:
            return (
              cloneElement(card, {
                additionalStyles: {
                  animation: (
                    from === "next" ? ``
                    : `card-bottom-to-top 1s ease-in forwards`
                  ),
                  rotate: (from === "next" ? `${card.props.additionalStyles.rotate}` : "0deg")
                },
                
              })
            )
          default:
            return (
              cloneElement(card)
            )
        }
      })
    )
  }

  const previousCard = () => {
    if (cards.length <= 1) return;
    const [last, ...rest] = adjustAnimations(cards, "prev");
    setCards([...rest, last]);
  }

  const nextCard = () => {
    if (cards.length <= 1) return;
    const cardsCopy = adjustAnimations(cards, "next");
    const first = cardsCopy.pop();
    if (first) {
      setCards([first, ...cardsCopy]);
    }
  }

  /**
   * @function handleTouchStart Record the start position of a touch event
   * @param e the touch event
   */
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchStartY.current = e.targetTouches[0].clientY;
  }

  /**
   * @function handleTouchEnd Calculate the swipe distance and trigger navigation if it exceeds the threshold
   * @param e the touch event
   */
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;

    if (diff > 50) {
      previousCard();
    } else if (diff < -50) {
      nextCard();
    }
  }

  return (
    <section id='projects-slider'
      className={`
        relative
        w-full h-[65vh] ss:h-[75vh] sm:h-[65vh] md:h-screen
        md:max-h-[70vh] min-h-70
        ${styles.flexRow}
        ${styles.contentCenter}
        lg:space-x-[10%]
      `}
    >

      <div id="cards-stack-container"
        ref={containerRef}
        className={`
          ${styles.sizeFull}
          ${styles.flexRow}
          ${styles.contentCenter}
          relative
        `}
        style={{
          perspective: SLIDER_PERSPECTIVE,
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      > 
        {cards.map((card: ReactElement) => (
          card
        ))}

        <SwipeIndicator
          bottomClass="sm:bottom-0 ss:bottom-0 xs:bottom-8 bottom-5"
          animationName="swipe-hint-projects-slider"
        />

        <button id="prev-button"
          className={`
            hidden md:block
            absolute
            2xl:left-6 xl:-left-6 lg:-left-8 md:left-10
            md:top-1/2
            z-10
            hover:scale-105
            transition-all
            duration-200
            ease-in-out
          `}
          onClick={previousCard}
        > 
          <img id="icon-previous" 
            src={menuIcons.double_chevrons_icon.content[currentTheme]} 
            alt="previous button"
            className={`
              object-cover
              -rotate-90
              lg:w-7.5 md:w-10
            `}
          /> 
        </button>

        <button id="next-button"
          className={`
            hidden md:block
            absolute
            2xl:right-6 xl:-right-6 lg:-right-8 md:right-10
            md:top-1/2
            z-10
            rounded-full
            hover:scale-105
            transition-all
            duration-200
            ease-in-out
          `}
          onClick={nextCard}
        > 
          <img id="icon-next" 
            src={menuIcons.double_chevrons_icon.content[currentTheme]} 
            alt="next button"
            className={`
              object-cover
              rotate-90
              lg:w-7.5 md:w-10
            `}
          /> 
        </button>

      </div>

      <div id="image-container"
        className={`
          ${styles.sizeFull}
          ${styles.hiddenToFlexColAtLg}
          ${styles.contentCenter}
          relative
          overflow-y-visible
        `}
      >
        <div id="glitch-effect-wrapper"
          className={`
            absolute
            left-0 2xl:left-[3%]
            ${currentTheme === "dark" ? "lg:bottom-10 xl:-bottom-10" : ""}
            2xl:w-[80%] xl:w-[88%]
            overflow-hidden
          `}
        >
          {currentTheme === "dark" && <>
            <img
              src={coreImages.hephaistos.content[currentTheme]}
              alt={coreImages.hephaistos.alt}
              aria-hidden="true"
              className={`absolute inset-0 ${styles.sizeFull} object-contain pointer-events-none`}
              style={{ animation: 'glitch-slice-1 9s infinite' }}
            />
            <img
              src={coreImages.hephaistos.content[currentTheme]}
              alt={coreImages.hephaistos.alt}
              aria-hidden="true"
              className={`absolute inset-0 ${styles.sizeFull} object-contain pointer-events-none`}
              style={{ animation: 'glitch-slice-2 9s infinite 0.25s' }}
            />
          </>}
          <img id="hephaistos-statue"
            src={coreImages.hephaistos.content[currentTheme]}
            alt={coreImages.hephaistos.alt}
            className={`relative w-full object-contain`}
            style={ currentTheme === "dark" ? { animation: 'glitch-flicker 9s infinite' } : undefined }
          />
        </div>
      </div>
    </section>
  )
}

export default ProjectsSlider