import { useContext } from "react";
import { ThemeContext } from "../theme/ThemeEngine";
import { coreImages } from "../../assets";

type HeroIllustrationProps = {
  isVisible: boolean;
}

const HeroIllustration = ({ isVisible }: HeroIllustrationProps) => {
  const { currentTheme } = useContext(ThemeContext);
  const isDark = currentTheme === 'dark';

  const containerClasses = `
    absolute
    overflow-hidden
    2xl:w-[75%] xl:w-[70%] lg:w-[65%] md:w-[70%] sm:w-[70%] ss:w-[300px] xs:w-[250px] w-50
    2xl:max-w-195 xl:max-w-150 lg:max-w-137.5 sm:max-w-125
    2xl:top-[7%] xl:top-[6%] lg:top-[36%] md:top-[5%] sm:top-[10%] ss:top-[15%] xs:top-[25%] top-[15%]
    2xl:right-0 xl:right-0 lg:right-0 md:-right-[2%] sm:-right-[2%] ss:-right-[0] xs:-right-[2%] -right-[2%]
    transition-all duration-700
    ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}
  `;

  const imageResponsiveOpacity = `
    2xl:opacity-100 xl:opacity-100 lg:opacity-100 md:opacity-80 sm:opacity-25 opacity-25
  `;

  return (
    <div id="illustration-container" className={containerClasses} style={{ transitionDelay: '400ms' }}>

      {isDark && (
        <>
          <div id="glow-effect"
            className="
              absolute
              top-1/2 left-1/2
              w-1/2 h-1/2
              -translate-x-1/2 -translate-y-1/2
              bg-(--color-tertiary)
              rounded-full
              opacity-8
            "
            style={{
              filter: 'blur(180px)',
            }}
          />

          <img id="hero-image"
            src={coreImages.heroFigure.content['dark']}
            alt={coreImages.heroFigure.alt}
            className={`
              relative
              w-full
              object-cover
              ${imageResponsiveOpacity}
              drop-shadow-[0_0_30px_rgba(124,255,196,0.15)]
              animate-[ascii-pulse_3s_ease-in-out_infinite]
            `}
          />
        </>
      )}

      {!isDark && (
        <>
          <img id="hero-image"
            src={coreImages.heroFigure.content['light']}
            alt={coreImages.heroFigure.alt}
            className={`
              relative
              w-full
              object-cover
              ${imageResponsiveOpacity}
            `}
          />

          <img id="hero-artifact"
            src={coreImages.sysiphusBoulder.content['light']}
            alt={coreImages.sysiphusBoulder.alt}
            className={`
              absolute
              inset-0
              w-full
              object-cover
              pointer-events-none
              origin-[69.5%_32.8%]
              ${imageResponsiveOpacity}
              animate-[boulder-roll_25s_linear_infinite]
            `}
          />
        </>
      )}

    </div>
  );
};

export default HeroIllustration;
