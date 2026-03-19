import { useContext } from "react";
import { menuIcons } from "../../assets";
import styles from "../../style";
import { ThemeContext } from "../theme/ThemeEngine";

interface SwipeIndicatorProps {
  bottomClass: string;
  animationName: string;
}

const SwipeIndicator = ({ bottomClass, animationName }: SwipeIndicatorProps) => {
  const { currentTheme } = useContext(ThemeContext);

  return (
    <div id="mobile-swipe-indicator"
      className={`
        md:hidden
        absolute
        ${styles.flexCol}
        ${styles.contentCenter}
        ${bottomClass}
        w-full
        opacity-30
        pointer-events-none
        animate-fade-in
      `}
    >
      <span className={`text-[10px] font-mono uppercase tracking-widest`}>
        Swipe !
      </span>
      <img id="swipe-icon"
        src={menuIcons.double_chevrons_icon.content[currentTheme]}
        alt={menuIcons.double_chevrons_icon.alt}
        className={`w-6`}
        style={{ animation: `${animationName} 2s infinite ease-in-out` }}
      />
    </div>
  );
};

export default SwipeIndicator;
