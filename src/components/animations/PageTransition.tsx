import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { PageTransitionsConstants } from '../../assets/constants';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

type PageTransitionProps = {
  children: ReactNode;
  className?: string;
};

/**
 * @component PageTransition
 * @description Smooth page transition wrapper for route changes
 * - Fade + slide animation on page mount
 * - Exit animation on page unmount
 * - Respects prefers-reduced-motion
 * - Works with React Router
 */
const PageTransition = ({ children, className = '' }: PageTransitionProps) => {

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: PageTransitionsConstants.INITIAL_OPACITY.valueOf(), y: PageTransitionsConstants.INITIAL_Y.valueOf() }}
      animate={{ opacity: PageTransitionsConstants.ANIMATE_OPACITY.valueOf(), y: PageTransitionsConstants.ANIMATE_Y.valueOf() }}
      exit={prefersReducedMotion ? {} : { opacity: PageTransitionsConstants.EXIT_OPACITY.valueOf(), y: PageTransitionsConstants.EXIT_Y.valueOf() }}
      transition={{
        duration: prefersReducedMotion ? PageTransitionsConstants.REDUCED_MOTION_DURATION.valueOf() : PageTransitionsConstants.DURATION.valueOf(),
        ease: [...PageTransitionsConstants.EASE.valueOf().split(' ').map((n) => parseFloat(n))] as [number, number, number, number],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
