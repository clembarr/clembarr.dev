/**
 * @constant PageTransitionsConstants
 * @description Constants related to the page transition animation used in the Layout component.
 * @property DURATION duration of the animation (s)
 * @property REDUCED_MOTION_DURATION duration of the animation when user prefers reduced motion (s)
 * @property INITIAL_OPACITY initial opacity of the page before animation
 * @property INITIAL_Y initial vertical offset of the page before animation (px)
 * @property ANIMATE_OPACITY final opacity of the page after animation
 * @property ANIMATE_Y final vertical position of the page after animation (px)
 * @property EXIT_OPACITY opacity of the page during exit animation
 * @property EXIT_Y vertical offset of the page during exit animation (px)
 * @property EASE easing function for the animation (cubic-bezier values)
 */
export const PageTransitionsConstants = {
  DURATION: 0.4,
  REDUCED_MOTION_DURATION: 0.01,
  INITIAL_OPACITY: "0",
  INITIAL_Y: 20,
  ANIMATE_OPACITY: 1,
  ANIMATE_Y: "0",
  EXIT_OPACITY: "0",
  EXIT_Y: -20,
  EASE: "0.25 0.1 0.25 1", //space separated values
}

/**
 * @constant ScrollRevealConstants
 * @description Constants related to the scroll reveal animation used in various components.
 * @property DURATION duration of the animation (s)
 * @property REDUCED_MOTION_DURATION duration of the animation when user prefers reduced motion (s)
 * @property INITIAL_POS initial offset of elements before animation (px)
 * @property INITIAL_OPACITY initial opacity of elements before animation
 * @property ANIMATE_POS final position of elements after animation (px)
 * @property ANIMATE_OPACITY final opacity of elements after animation
 * @property EASE easing function for the animation (cubic-bezier values)
 */
export const ScrollRevealConstants = {
  DURATION: 0.6,
  REDUCED_MOTION_DURATION: 0.01,
  INITIAL_POS: 50, //varies based on direction
  INITIAL_OPACITY: 0,
  ANIMATE_POS: 0,
  ANIMATE_OPACITY: 1,
  EASE: "0.25 0.1 0.25 1", //space separated values
}

/**
 * @constant ArticlesMotionConstants
 * @description Constants related to the animation of articles in the Articles component.
 * @property MOTION_OPACITY initial opacity of articles before animation
 * @property MOTION_Y initial vertical offset of articles before animation (px)
 * @property ANIMATE_OPACITY final opacity of articles after animation
 * @property ANIMATE_Y final vertical position of articles after animation
 * @property TRANSITION_DURATION duration of the animation (s)
 * @property TRANSITION_EASE easing function for the animation (cubic-bezier values)
 * @property REDUCED_MOTION_TRANSITION_DURATION duration of the animation when user prefers reduced motion (s)
 */
export const ArticlesMotionConstants = {
  MOTION_OPACITY: 0,
  MOTION_Y: 20,
  ANIMATE_OPACITY: 1,
  ANIMATE_Y: 0,
  REDUCED_MOTION_TRANSITION_DURATION: 0.01,
  TRANSITION_DURATION: 0.5,
  TRANSITION_EASE: "0.25 0.1 0.25 1"
}

/**
 * @constant TableOfContentObserverConstants
 * @description Constants related to the animation of items in the Table of Contents component.
 * @property ROOT_MARGIN root margin for IntersectionObserver (px)
 * @property THRESHOLD threshold for IntersectionObserver (0-1)
 * @property MOTION_OPACITY initial opacity of items before animation
 * @property MOTION_X initial horizontal offset of items before animation (px)
 * @property ANIMATE_OPACITY final opacity of items after animation
 * @property ANIMATE_X final horizontal position of items after animation (px)
 * @property TRANSITION_DURATION duration of the animation (s)
 * @property REDUCED_MOTION_TRANSITION_DURATION duration of the animation when user prefers reduced motion (s)  
 * @property TRANSITION_DELAY delay before starting the animation (s)
 * @property TRANSITION_EASE easing function for the animation (cubic-bezier values)
 */
export const TableOfContentObserverConstants = {
  ROOT_MARGIN: "-80px 0px -80% 0px",
  THRESHOLD: 1.0,
  MOTION_OPACITY: 0,
  MOTION_X: 20,
  ANIMATE_OPACITY: 1,
  ANIMATE_X: 0,
  TRANSITION_DURATION: 0.4,
  REDUCED_MOTION_TRANSITION_DURATION: 0.01,
  TRANSITION_DELAY: 0.2,
  TRANSITION_EASE: "0.25 0.1 0.25 1"
}

/**
 * @constant TableOfContentsItemConstants
 * @description Constants related to the animation of items in the Table of Contents component.
 * @property MOTION_OPACITY initial opacity of items before animation
 * @property MOTION_X initial horizontal offset of items before animation (px)
 * @property ANIMATE_OPACITY final opacity of items after animation
 * @property ANIMATE_X final horizontal position of items after animation (px)
 * @property TRANSITION_DURATION duration of the animation (s)
 * @property REDUCED_MOTION_TRANSITION_DURATION duration of the animation when user prefers reduced motion (s)
 * @property REDUCED_MOTION_TRANSITION_DELAY delay before starting the animation when user prefers reduced motion (s)
 */
export const TableOfContentsItemConstants = {
  MOTION_OPACITY: 0,
  MOTION_X: 20,
  ANIMATE_OPACITY: 1,
  ANIMATE_X: 0,
  TRANSITION_DURATION: 0.3,
  REDUCED_MOTION_TRANSITION_DURATION: 0.01,
  REDUCED_MOTION_TRANSITION_DELAY: 0
}

/**
 * @constant GraphWidgetConstants
 * @description Constants related to the GraphWidget component, defining spacing and animation parameters.
 * @property GAP_PX minimum gap between any two tags (px)
 * @property EDGE_PX minimum distance from container edges (px)
 * @property FLOAT_AMP_PX maximum translation from the CSS float animation (px)
 */
export const GraphWidgetConstants = {
  GAP_PX: 10,
  EDGE_PX: 6,
  FLOAT_AMP_PX: 4,
}