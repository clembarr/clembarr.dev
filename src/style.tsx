import { getRandomTailwindColor } from "./utils/utils";

const styles = {

  page: `
    w-full
    h-full
    text-(--color-quaternary)
    bg-transparent
  `,

  sectionContainer: `
    w-screen
    px-(--section-padding-x)
    text-(--color-quaternary)
    bg-transparent
  `,

  heading2: `
    font-primary-bold
    2xl:text-3xl xl:text-2xl lg:text-xl md:text-xl text-lg
    leading-6 xl:leading-8
    w-full
    md:tracking-wider tracking-normal
    xl:mb-9 lg:mb-6 mb-4
    text-(--color-quaternary)`,

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
    text-2xs md:text-md xl:text-lg 2xl:text-xl
    leading-[140%] md:leading-[145%]
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

  flexColToRowAtMd: `flex flex-col md:flex-row`,
  flexColToRowAtLg: `flex flex-col lg:flex-row`,
  flexColToRowAtXl: `flex flex-col xl:flex-row`,
  flexRowToColAtMd: `flex flex-row md:flex-col`,

  hiddenToFlexColAtMd: `hidden md:flex md:flex-col`,
  hiddenToFlexColAtLg: `hidden lg:flex lg:flex-col`,
  flexRowHideAtMd: `hidden md:flex md:flex-row`,
  flexRowHideDesktopAtMd: `flex flex-row md:hidden`,
  flexRowHideDesktopAtLg: `flex flex-row lg:hidden`,
  
  flexRowHideAtLg: `hidden lg:flex lg:flex-row`,
  flexColHideAtSm: `flex flex-col sm:hidden`,
  flexColHideAtMd: `flex flex-col md:hidden`,

  flexRowToColAtLg: `flex flex-row lg:flex-col`,

  contentCenter: `justify-center items-center`,
  contentStartAll: `justify-start items-start`,
  contentStartX: `justify-start items-center`,
  contentStartY: `justify-center items-start`,
  contentEndAll: `justify-end items-end`,
  contentEndX: `justify-end items-center`,
  contentEndY: `justify-center items-end`,

  contentStartYToCenterAtMd: `justify-center items-start md:justify-center md:items-center`,

  sizeFull: `w-full h-full`,
  sizeScreen: `h-screen w-auto`,
  sizeFit: `w-fit h-fit`,
  sizeAuto: `w-auto h-auto`,

  buttonBase: `
    inline-flex items-center justify-center gap-2
    px-6 py-3
    font-primary-semibold
    text-sm
    rounded-lg
    transition-all duration-300
    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `,

  buttonPrimary: `
    inline-flex items-center justify-center gap-2
    px-6 py-3
    font-primary-semibold
    text-sm
    rounded-lg
    bg-(--color-tertiary)
    text-(--color-primary)
    hover:brightness-110
    hover:-translate-y-0.5
    active:translate-y-0
    transition-all duration-300
    focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-tertiary)
  `,

  buttonSecondary: `
    inline-flex items-center justify-center gap-2
    px-6 py-3
    font-primary-semibold
    text-sm
    rounded-lg
    border-2 border-(--color-tertiary)
    text-(--color-tertiary)
    bg-transparent
    hover:bg-(--color-tertiary)/10
    hover:-translate-y-0.5
    active:translate-y-0
    transition-all duration-300
    focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-tertiary)
  `,

  buttonGhost: `
    inline-flex items-center justify-center gap-2
    px-4 py-2
    font-primary-semibold
    text-sm
    rounded-lg
    text-(--color-quaternary)
    bg-transparent
    hover:bg-(--color-quaternary)/10
    hover:text-(--color-tertiary)
    transition-all duration-300
  `,

  // Card styles
  card: `
    bg-(--color-surface)
    border border-(--color-border)
    rounded-xl
    shadow-(--shadow-card)
    transition-all duration-300
    hover:shadow-(--shadow-card-hover)
  `,

  cardElevated: `
    bg-(--color-surface-elevated)
    border border-(--color-border)
    rounded-xl
    shadow-(--shadow-md)
    transition-all duration-300
    hover:shadow-(--shadow-lg)
    hover:-translate-y-1
  `,

  // Input styles
  input: `
    w-full
    px-4 py-3
    bg-(--color-surface)
    border border-(--color-border)
    rounded-lg
    text-(--color-quaternary)
    font-primary-regular
    transition-all duration-200
    placeholder:text-(--color-muted)
    hover:border-(--color-border-strong)
    focus:border-(--color-tertiary)
    focus:ring-2 focus:ring-(--color-tertiary)/20
    focus:outline-none
  `,

  tag: `
    inline-flex items-center
    px-2.5 py-1
    text-xs
    font-primary-semibold
    rounded-full
    bg-(--color-tertiary)/10
    text-(--color-tertiary)
    border border-(--color-tertiary)/20
    transition-all duration-300 ease-in-out
    cursor-pointer
  `,

  animatedLink: `
    inline-flex items-center gap-2
    text-(--color-tertiary)
    hover:translate-x-1.5
    hover:text-(--color-quaternary)
    cursor-pointer
    font-secondary-semibold
    transition-all duration-300 ease-in-out
  `,

  divider: `
    w-full h-px
    bg-(--color-border)
  `,

  dividerVertical: `
    w-px h-full
    bg-(--color-border)
  `,

  glass: `
    bg-white/5
    backdrop-blur-md
    border border-white/10
  `,

  glassCard: `
    bg-(--color-surface)/80
    backdrop-blur-lg
    border border-(--color-border)
    rounded-xl
    shadow-(--shadow-card)
  `,

  glassNav: `
    bg-(--color-secondary)/90
    backdrop-blur-md
    border-b border-(--color-border)
  `,

  glassModal: `
    bg-(--color-surface)/95
    backdrop-blur-xl
    border border-(--color-border)
    rounded-2xl
    shadow-(--shadow-lg)
  `,

  heroHeading: `
    font-primary-bold
    2xl:text-6xl xl:text-5xl lg:text-4xl md:text-3xl text-2xl
    tracking-tight
    leading-tight
  `,

  gradientText: `
    bg-gradient-to-r
    from-(--color-tertiary)
    via-(--color-accent-cyber)
    to-(--color-tertiary)
    bg-clip-text
    text-transparent
    bg-[length:200%_auto]
  `,

  widgetCard: `
    px-4 py-3
    rounded-md
    bg-(--color-secondary)
    border border-(--color-tertiary)/15
  `,

  debugBorders: `border-2 border-`.concat(getRandomTailwindColor()),

  defaultTransition: `transition-all duration-300 ease-in-out`,
  easeOutTransition: `transition-all duration-300 ease-out`
};

export default styles;