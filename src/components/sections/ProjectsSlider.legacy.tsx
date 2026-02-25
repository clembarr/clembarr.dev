import { Project } from "../../assets/dataTypes"
import { projects } from "../../assets/contents"
import styles from "../../style"
import { coreImages, menuIcons } from "../../assets"
import { cloneElement, ReactElement, useContext, useEffect, useRef, useState } from "react"
import { getActiveBreakpoint, randomNumberBetween } from "../../utils"
import { ProjectCard } from "../cards"
import { ThemeContext } from "../theme/ThemeEngine"
import { LangContext } from "../language"

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
    }, 200); 

    return () => {
      clearInterval(interval);
      setTimeout(() => apparitionEnded.current = true, 400*initialCards.length);
    };
  }, [currentLang, currentTheme]);

  // This funtion is called before updating the cards, to animate the cards according to their position
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
        ${styles.sizeScreen}
        max-h-[70vh]
        ${styles.flexRow}
        ${styles.contentCenter}
        lg:space-x-[10%]
      `}
    >

      <div id="cards-stack-container"
        className={`
          ${styles.sizeFull}
          ${styles.flexRow}
          ${styles.contentCenter}
          relative
        `}
        style={{
          perspective: '1000px',
        }}
      > 
        {cards.map((card: ReactElement) => (
          card
        ))}

        <hr className={`
          md:hidden
          absolute
          ${styles.line}
          top-[82%]
          w-6
          h-[5px]
          opacity-25
          rounded-full
        `} />

        <button id="prev-button"
          className={`
            absolute
            2xl:left-6 xl:-left-6 lg:-left-8 md:-left-3 left-[20%]
            md:top-1/2 top-[80%]
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
              lg:w-[30px] md:w-[40px] w-[35px]
            `}
          /> 
        </button>

        <button id="next-button"
          className={`
            absolute
            2xl:right-6 xl:-right-6 lg:-right-8 md:-right-3 right-[20%]
            md:top-1/2 top-[80%]
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
              lg:w-[30px] md:w-[40px] w-[35px]
            `}
          /> 
        </button>

      </div>

      <div id="image-container"
        className=
        {`
          ${styles.sizeFull}
          ${getActiveBreakpoint('number') as number <= 2 ? "hidden" : styles.flexCol}
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
              2xl:left-[3%] base:left-0
            `}
          />
      </div>
    </section>
  )
}

export default ProjectsSlider