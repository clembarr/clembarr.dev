import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type StaggerContainerProps = {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
};

/**
 * @component StaggerContainer
 * @description Container that staggers animation of child elements
 *
 * Use with:
 * - Lists of cards
 * - Grid layouts
 * - Navigation items
 *
 * Children will animate in sequence with a delay between each
 *
 * @param children - Elements to stagger (wrap each in motion.div)
 * @param staggerDelay - Delay between each child animation (seconds)
 * @param className - Additional CSS classes
 */
const StaggerContainer = ({
  children,
  staggerDelay = 0.1,
  className = '',
}: StaggerContainerProps) => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default StaggerContainer;
