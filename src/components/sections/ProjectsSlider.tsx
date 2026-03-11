import { Project } from "../../assets/dataTypes"
import { SLIDER_CARD_INTERVAL_MS, SLIDER_CARD_APPARITION_TIMEOUT_MS, SLIDER_PERSPECTIVE } from "../../assets/constants"
import { projects } from "../../assets/contents"
import styles from "../../style"
import { coreImages, menuIcons } from "../../assets"
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

  // State to manage the cards 
  const [cards, setCards] = useState<Array<ReactElement>>([]);
  const apparitionEnded = useRef<boolean>(false);
  const topCardTrueAngle = useRef<number>(0);

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

  return (
    <section id='projects-slider'
      className={`
        relative
        w-full h-[60vh] md:h-screen
        md:max-h-[70vh] min-h-[350px]
        ${styles.flexRow}
        ${styles.contentCenter}
        lg:space-x-[10%]
      `}
    >

      <div id="cards-stack-container"
        className={`
          ${styles.sizeFull}
          ${styles.flexRow}
          ${styles.contentStartYToCenterAtMd}
          relative
          pt-10 md:pt-0
        `}
        style={{
          perspective: SLIDER_PERSPECTIVE,
        }}
      > 
        {cards.map((card: ReactElement) => (
          card
        ))}

        <hr className={`
          md:hidden
          absolute
          ${styles.line}
          sm:bottom-11 ss:bottom-20.5 xs:bottom-21.5 bottom-18.5
          w-6
          h-2
          opacity-25
          rounded-full
        `} />

        <button id="prev-button"
          className={`
            absolute
            2xl:left-6 xl:-left-6 lg:-left-8 md:left-10 sm:left-[25%] ss:left-[22%] left-[20%]
            md:top-1/2 sm:top-[88%] ss:top-[81%] top-[80%]
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
              lg:w-7.5 md:w-10 w-8.75
            `}
          /> 
        </button>

        <button id="next-button"
          className={`
            absolute
            2xl:right-6 xl:-right-6 lg:-right-8 md:right-10 sm:right-[25%] ss:right-[22%] right-[20%]
            md:top-1/2 sm:top-[88%] ss:top-[81%] top-[80%]
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
              lg:w-7.5 md:w-10 w-8.75
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
        <img id="hephaistos-statue"
            src={coreImages.hephaistos.content[currentTheme]}
            alt={coreImages.hephaistos.alt}
            className={`
              object-contain
              2xl:w-[80%] xl:w-[88%]
              absolute
              left-0 2xl:left-[3%]
              ${currentTheme === "dark" ? "-bottom-10" : ""}
            `}
          />
      </div>
    </section>
  )
}

export default ProjectsSlider