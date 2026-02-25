import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Link } from 'react-router';

type AnimatedLinkProps = {
  children: ReactNode;
  to: string;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
};

/**
 * @component AnimatedLink
 * @description Link with subtle hover animations
 *
 * Features:
 * - Scale and translate effect on hover
 * - Supports internal (React Router) and external links
 * - Respects prefers-reduced-motion
 * - Accessible
 *
 * @param children - Link content
 * @param to - Link destination
 * @param className - Additional CSS classes
 * @param external - If true, renders as <a> instead of <Link>
 * @param ariaLabel - ARIA label for accessibility
 */
const AnimatedLink = ({
  children,
  to,
  className = '',
  external = false,
  ariaLabel,
}: AnimatedLinkProps) => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const hoverVariant = prefersReducedMotion ? {} : { x: 4 };

  if (external) {
    return (
      <motion.a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className={className}
        whileHover={hoverVariant}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 0.3 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <Link to={to} aria-label={ariaLabel}>
      <motion.span
        className={className}
        whileHover={hoverVariant}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 0.3 }}
      >
        {children}
      </motion.span>
    </Link>
  );
};

export default AnimatedLink;
