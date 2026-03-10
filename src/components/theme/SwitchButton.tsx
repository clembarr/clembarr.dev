import { useContext, useEffect, useState } from "react";
import styles from "../../style";
import { ThemeContext } from "./ThemeEngine";

/**
 * @description Modern theme toggle with animated sun/moon icons
 */
const SwitchButton = () => {
  const { setCurrentTheme } = useContext(ThemeContext);
  const [toggleSwitch, setToggleSwitch] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (toggleSwitch) {
      setCurrentTheme("dark");
    } else {
      setCurrentTheme("light");
    }
  }, [toggleSwitch, setCurrentTheme]);

  const isDark = toggleSwitch;

  return (
    <button
      id="switch-container"
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      onClick={() => setToggleSwitch(!toggleSwitch)}
      className={`
        ${styles.sizeFit}
        ${styles.flexRow}
        ${styles.contentCenter}
        z-10
        relative
        cursor-pointer
        p-1.5
        rounded-full
        transition-all
        duration-300
        hover:scale-105
        active:scale-95
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-(--color-tertiary)
      `}
    >
      <div id="switch-track"
        className={`
          relative
          h-7 w-14
          rounded-full
          transition-all
          duration-500
          ease-(--ease-smooth)
          bg-(--color-secondary)
          border
          border-(--color-border-strong)
        `}
      >
        <div id="stars-container" 
          className={`absolute inset-0 transition-opacity duration-500 ${isDark ? 'opacity-100' : 'opacity-0'}`}
        >
          <span className="absolute w-1 h-1 bg-(--color-quaternary) rounded-full top-1.5 left-2" />
          <span className="absolute w-0.5 h-0.5 bg-(--color-quaternary)/70 rounded-full top-3 left-4" />
          <span className="absolute w-0.5 h-0.5 bg-(--color-quaternary)/50 rounded-full bottom-2 left-3" />
        </div>

        <div id="clouds-container"
          className={`absolute z-(--z-dropdown) inset-0 transition-opacity duration-500 ${isDark ? 'opacity-0' : 'opacity-100'}`}
        >
          <span className="absolute w-3 h-1.5 bg-(--color-muted)/30 rounded-full top-1.5 left-5" />
          <span className="absolute w-2 h-1 bg-(--color-muted)/20 rounded-full bottom-2 left-7" />
        </div>

        <div id="toggle-knob"
          className={`
            absolute
            top-1/2
            -translate-y-1/2
            w-5 h-5
            rounded-full
            transition-all
            duration-500
            ease-(--ease-bounce)
            ${isDark ? 'translate-x-8' : 'translate-x-1'}
            ${isDark ? 'bg-(--color-tertiary)' : 'bg-(--color-quinary)'}
            shadow-[0_0_12px_var(--color-tertiary)]/40
          `}
        >
          <div id="moon-craters"
            className={`absolute inset-0 transition-opacity duration-300 ${isDark ? 'opacity-100' : 'opacity-0'}`}
          >
            <span className="absolute w-1 h-1 bg-(--color-primary)/50 rounded-full top-1 left-1" />
            <span className="absolute w-0.5 h-0.5 bg-(--color-primary)/40 rounded-full bottom-1.5 right-1" />
          </div>
        </div>
      </div>
    </button>
  );
};

export default SwitchButton;
