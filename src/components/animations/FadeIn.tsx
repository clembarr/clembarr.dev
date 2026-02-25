import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
};

/**
 * @component FadeIn
 * @description Simple fade-in animation on mount
 *
 * Use for:
 * - Loading states
 * - Success messages
 * - Modal appearances
 *
 * @param children - Elements to animate
 * @param delay - Delay before animation (seconds)
 * @param duration - Animation duration (seconds)
 * @param className - Additional CSS classes
 */
const FadeIn = ({
  children,
  delay = 0,
  duration = 0.4,
  className = '',
}: FadeInProps) => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : duration,
        delay: prefersReducedMotion ? 0 : delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
