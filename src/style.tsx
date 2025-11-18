import { getRandomTailwindColor } from "./utils";

const styles = {

  page: `
    w-full 
    h-full
    text-(--color-quaternary) 
    bg-transparent 
  `,
  
  sectionContainer: `
    w-screen 
    px-[12%] 
    text-(--color-quaternary) 
    bg-transparent
  `,

  heading2: ` 
    font-primary-bold 
    2xl:text-3xl xl:text-2xl lg:text-xl md:text-xl text-md 
    xl:leading-8 base:leading-6 
    w-full  
    tracking-wider  
    xl:mb-9 lg:mb-6 mb-4`,
  
  line: ` 
    block 
    bg-(--color-tertiary) 
    w-2/3 
    2xl:h-[5px] h-[3px] 
    border-none `,
  
  subtitle: ` 
    font-primary-regular  
    xxl:text-5xl  
    leading-[40px]  
    tracking-wide`, 
  
  paragraph: ` 
    font-primary-regular 
    2xl:text-xl xl:text-lg md:text-md base:text-2xs 
    leading-[145%] base:leading-[140%]  
    tracking-wide 
    text-wrap  
    whitespace-pre-line`,

  hyperlink: ` 
    hover:text-(--color-tertiary) 
    transition-all 
    duration-200 
    ease-in-out`,

  flexCol: `flex flex-col`,
  flexRow: `flex flex-row`,
  flexWrap: `flex flex-wrap`,

  contentCenter: `justify-center items-center`,
  contentStartAll: `justify-start items-start`,
  contentStartX: `justify-start items-center`,
  contentStartY: `justify-center items-start`,
  contentEndAll: `justify-end items-end`,
  contentEndX: `justify-end items-center`,
  contentEndY: `justify-center items-end`,

  sizeFull: `w-full h-full`,
  sizeScreen: `h-screen w-auto`,
  sizeFit: `w-fit h-fit`,
  sizeAuto: `w-auto h-auto`,

  debugBorders: `border-2 border-`.concat(getRandomTailwindColor()),
};
  
export default styles;