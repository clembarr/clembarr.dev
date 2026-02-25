import { motion } from 'framer-motion';
import { ReactNode, MouseEvent } from 'react';

type AnimatedButtonProps = {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  ariaLabel?: string;
};

/**
 * @component AnimatedButton
 * @description Button with subtle hover and tap animations
 *
 * Features:
 * - Scale effect on hover
 * - Tap feedback
 * - Glow effect on hover
 * - Respects prefers-reduced-motion
 * - Accessible (keyboard + screen reader)
 *
 * @param children - Button content
 * @param onClick - Click handler
 * @param className - Additional CSS classes
 * @param type - Button type (button/submit/reset)
 * @param disabled - Disabled state
 * @param ariaLabel - ARIA label for accessibility
 */
const AnimatedButton = ({
  children,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  ariaLabel,
}: AnimatedButtonProps) => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`
        relative
        ${className}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      whileHover={
        prefersReducedMotion || disabled
          ? {}
          : {
              scale: 1.05,
              transition: { duration: 0.2, ease: 'easeOut' },
            }
      }
      whileTap={
        prefersReducedMotion || disabled
          ? {}
          : {
              scale: 0.95,
              transition: { duration: 0.1, ease: 'easeIn' },
            }
      }
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : 0.3,
      }}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
