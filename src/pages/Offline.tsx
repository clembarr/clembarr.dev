import styles from "../style";
import { PageTransition } from "../components/animations";

/**
 * @component Offline
 * @description Offline fallback page displayed when PWA is offline
 *
 * Features:
 * - Clean minimal design
 * - Helpful messaging
 * - Retry button
 */
const Offline = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <PageTransition>
      <section
        id="offline-container"
        className={`
          ${styles.sizeScreen}
          ${styles.flexCol}
          ${styles.contentCenter}
          space-y-6
          px-[10%]
        `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-(--color-tertiary)"
        >
          <line x1="1" y1="1" x2="23" y2="23" />
          <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
          <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
          <path d="M10.71 5.05A16 16 0 0 1 22.58 9" />
          <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
          <line x1="12" y1="20" x2="12.01" y2="20" />
        </svg>

        <h1
          className={`
            ${styles.heading2}
            text-center
          `}
        >
          You're Offline
        </h1>

        <p
          className={`
            ${styles.paragraph}
            text-center
            max-w-[500px]
          `}
        >
          It looks like you've lost your internet connection. Some features may not be available
          until you're back online.
        </p>

        <button
          onClick={handleRetry}
          className="
            px-6
            py-3
            bg-(--color-tertiary)
            text-(--color-primary)
            rounded-lg
            font-primary-semibold
            hover:scale-105
            active:scale-95
            transition-transform
            duration-200
          "
        >
          Try Again
        </button>

        <p className="text-xs text-(--color-quaternary) opacity-70">
          This portfolio works partially offline. Cached pages will remain available.
        </p>
      </section>
    </PageTransition>
  );
};

export default Offline;
