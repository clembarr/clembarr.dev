import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { ScrollRevealConstants } from '../../assets/constants';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

type ScrollRevealProps = {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  className?: string;
  once?: boolean;
};

/**
 * @component ScrollReveal
 * @description Animates children into view when scrolling
 *
 * Features:
 * - Fade-in animation with directional slide
 * - Configurable delay for staggered effects
 * - Respects prefers-reduced-motion
 * - Uses Intersection Observer for performance
 *
 * @param children - Elements to animate
 * @param delay - Delay before animation starts (seconds)
 * @param direction - Direction of slide animation
 * @param duration - Animation duration (seconds)
 * @param className - Additional CSS classes
 * @param once - If true, animate only once
 */
const ScrollReveal = ({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.6,
  className = '',
  once = true,
}: ScrollRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    margin: '-100px', //trigger animation 100px before element enters viewport
  });

  const getInitialPosition = () => {
    if (prefersReducedMotion) return {};

    switch (direction) {
      case 'up':
        return { y: ScrollRevealConstants.INITIAL_POS.valueOf(), opacity: ScrollRevealConstants.INITIAL_OPACITY.valueOf() };
      case 'down':
        return { y: -ScrollRevealConstants.INITIAL_POS.valueOf(), opacity: ScrollRevealConstants.INITIAL_OPACITY.valueOf() };
      case 'left':
        return { x: ScrollRevealConstants.INITIAL_POS.valueOf(), opacity: ScrollRevealConstants.INITIAL_OPACITY.valueOf() };
      case 'right':
        return { x: -ScrollRevealConstants.INITIAL_POS.valueOf(), opacity: ScrollRevealConstants.INITIAL_OPACITY.valueOf() };
      case 'none':
        return { opacity: ScrollRevealConstants.INITIAL_OPACITY.valueOf() };
      default:
        return { y: ScrollRevealConstants.INITIAL_POS.valueOf(), opacity: ScrollRevealConstants.INITIAL_OPACITY.valueOf() };
    }
  };

  const getAnimatePosition = () => {
    if (prefersReducedMotion) return { opacity: 1 };

    switch (direction) {
      case 'up':
      case 'down':
        return { y: ScrollRevealConstants.ANIMATE_POS.valueOf(), opacity: ScrollRevealConstants.ANIMATE_OPACITY.valueOf() };
      case 'left':
      case 'right':
        return { x: ScrollRevealConstants.ANIMATE_POS.valueOf(), opacity: ScrollRevealConstants.ANIMATE_OPACITY.valueOf() };
      case 'none':
        return { opacity: ScrollRevealConstants.ANIMATE_OPACITY.valueOf() };
      default:
        return { y: ScrollRevealConstants.ANIMATE_POS.valueOf(), opacity: ScrollRevealConstants.ANIMATE_OPACITY.valueOf() };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      animate={isInView ? getAnimatePosition() : getInitialPosition()}
      transition={{
        duration: prefersReducedMotion ? ScrollRevealConstants.REDUCED_MOTION_DURATION.valueOf() : duration,
        delay: prefersReducedMotion ? ScrollRevealConstants.REDUCED_MOTION_DURATION.valueOf() : delay,
        ease: [...ScrollRevealConstants.EASE.valueOf().split(' ').map((n) => parseFloat(n))] as [number, number, number, number],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
