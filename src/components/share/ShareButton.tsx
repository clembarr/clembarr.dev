import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ShareButtonProps = {
  title: string;
  text: string;
  url: string;
  className?: string;
};

/**
 * @component ShareButton
 * @description Share button with Web Share API and fallback to clipboard
 *
 * Features:
 * - Uses native Web Share API when available
 * - Falls back to clipboard copy
 * - Visual feedback on success
 * - Accessible (keyboard + ARIA)
 *
 * @param title - Title to share
 * @param text - Description text
 * @param url - URL to share
 * @param className - Additional CSS classes
 */
const ShareButton = ({ title, text, url, className = '' }: ShareButtonProps) => {
  const [showCopied, setShowCopied] = useState(false);
  const [shareError, setShareError] = useState(false);

  const handleShare = async () => {
    // Check if Web Share API is available
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
      } catch (err: unknown) {
        // User cancelled or error occurred
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error('Error sharing:', err);
          setShareError(true);
          setTimeout(() => setShareError(false), 2000);
        }
      }
    } else {
      // Fallback: copy URL to clipboard
      try {
        await navigator.clipboard.writeText(url);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      } catch (err) {
        console.error('Error copying to clipboard:', err);
        setShareError(true);
        setTimeout(() => setShareError(false), 2000);
      }
    }
  };

  return (
    <div className="relative">
      <motion.button
        onClick={handleShare}
        className={`
          ${className}
          relative
          px-4
          py-2
          rounded-lg
          bg-(--color-tertiary)
          text-(--color-primary)
          font-primary-semibold
          transition-all
          duration-300
          hover:scale-105
          active:scale-95
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Share this project"
      >
        <span className="flex items-center gap-2">
          {/* Share icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          {'share' in navigator ? 'Share' : 'Copy link'}
        </span>
      </motion.button>

      {/* Success feedback */}
      <AnimatePresence>
        {showCopied && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="
              absolute
              -top-12
              left-1/2
              -translate-x-1/2
              px-3
              py-2
              bg-(--color-secondary)
              text-(--color-tertiary)
              rounded-lg
              shadow-lg
              text-sm
              whitespace-nowrap
              pointer-events-none
            "
          >
            Link copied!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error feedback */}
      <AnimatePresence>
        {shareError && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="
              absolute
              -top-12
              left-1/2
              -translate-x-1/2
              px-3
              py-2
              bg-red-500
              text-white
              rounded-lg
              shadow-lg
              text-sm
              whitespace-nowrap
              pointer-events-none
            "
          >
            Error sharing
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShareButton;
