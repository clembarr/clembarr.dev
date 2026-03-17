import { coreImages } from "../assets";
import styles from "../style";

type EffectDemoProps = {
  title: string;
  description: string;
  animationClass: string;
  extraElements?: React.ReactNode;
}

/**
 * @component EffectDemo
 * @description Renders a single visual effect demo card with a title, description,
 * and an animated preview of the hero figure image.
 * @param title - Display name of the effect.
 * @param description - Short explanation of how the effect works.
 * @param animationClass - Tailwind animation class(es) applied to the image.
 * @param extraElements - Optional overlay elements rendered on top of the image.
 */
const EffectDemo = ({ title, description, animationClass, extraElements }: EffectDemoProps) => {
  return (
    <div className={`
      ${styles.flexCol}
      items-center
      gap-4
      p-6
      bg-(--color-secondary)
      rounded-lg
      border border-(--color-border)
      hover:border-(--color-tertiary)
      transition-all duration-300
    `}>
      <h3 className="font-primary-semibold text-lg text-(--color-tertiary)">
        {title}
      </h3>
      <p className="text-xs text-(--color-muted) text-center">
        {description}
      </p>
      <div className="relative w-full max-w-md aspect-[2144/1984] overflow-hidden rounded-md bg-(--color-primary)">
        <img
          src={coreImages.heroFigure.content['dark']}
          alt="ASCII Art Demo"
          className={`
            w-full
            h-full
            object-cover
            ${animationClass}
          `}
        />
        {extraElements}
      </div>
    </div>
  );
};

/**
 * @component GlitchDemo
 * @description Demo page comparing all available glitch/visual effects applied to
 * the dark-theme ASCII hero image. Intended as a developer reference only.
 */
const GlitchDemo = () => {
  // Générer des caractères Matrix aléatoires
  const generateMatrixChars = (count: number) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
    return Array.from({ length: count }, () => ({
      char: chars[Math.floor(Math.random() * chars.length)],
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
    }));
  };

  const matrixChars = generateMatrixChars(15);

  return (
    <section className={`
      ${styles.page}
      ${styles.flexCol}
      items-center
      gap-8
      py-12
      px-[var(--section-padding-x)]
    `}>
      <div className={`
        ${styles.flexCol}
        items-center
        gap-4
        text-center
        max-w-3xl
      `}>
        <h1 className={`
          ${styles.heroHeading}
          ${styles.gradientText}
        `}>
          Glitch Effects Demo
        </h1>
        <p className="text-(--color-muted) text-md">
          Comparaison des différents effets visuels pour l'illustration Hero en thème sombre.
          Chaque effet est appliqué en boucle continue pour visualisation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 w-full max-w-[1600px]">

        {/* Effet 1: Glitch RGB complet */}
        <EffectDemo
          title="RGB Glitch + Scanline"
          description="Effet de glitch avec séparation RGB chromatique, distorsion skew, et scanline CRT. Déclenché périodiquement toutes les 8 secondes."
          animationClass="animate-[ascii-glitch_8s_ease-in-out_infinite]"
          extraElements={
            <div className="
              absolute inset-0 w-full h-1
              bg-gradient-to-b from-transparent via-(--color-tertiary)/30 to-transparent
              pointer-events-none
              animate-[scanline_4s_linear_infinite]
            " />
          }
        />

        {/* Effet 2: Pulse lumineux */}
        <EffectDemo
          title="Pulse / Breathing"
          description="Effet de respiration lumineuse avec variations de luminosité et contraste. Crée un effet organique et vivant."
          animationClass="animate-[ascii-pulse_3s_ease-in-out_infinite]"
        />

        {/* Effet 3: Hologram Flicker */}
        <EffectDemo
          title="Hologram Flicker"
          description="Scintillement holographique instable avec micro-décalages verticaux et variations d'opacité rapides."
          animationClass="animate-[hologram-flicker_2s_ease-in-out_infinite]"
        />

        {/* Effet 4: Data Corruption */}
        <EffectDemo
          title="Data Corruption"
          description="Bandes horizontales simulant une corruption de données ou un bug d'affichage. Effet de découpe par clip-path."
          animationClass="animate-[data-corruption_6s_step-end_infinite]"
        />

        {/* Effet 5: Static Noise */}
        <EffectDemo
          title="Static Noise Overlay"
          description="Texture de bruit statique animée en overlay, simulant l'interférence d'un écran TV analogique."
          animationClass=""
          extraElements={
            <div
              className="absolute inset-0 opacity-10 mix-blend-overlay animate-[noise_0.2s_steps(3)_infinite]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat',
                backgroundSize: '200px 200px',
              }}
            />
          }
        />

        {/* Effet 6: Matrix Rain */}
        <EffectDemo
          title="Matrix Rain"
          description="Pluie de caractères type Matrix tombant en overlay. Utilise des caractères alphanumériques et symboles."
          animationClass=""
          extraElements={
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {matrixChars.map((char, i) => (
                <div
                  key={i}
                  className="absolute text-(--color-tertiary) font-mono text-xs opacity-60"
                  style={{
                    left: `${char.left}%`,
                    animation: `matrix-rain ${char.duration}s linear infinite`,
                    animationDelay: `${char.delay}s`,
                  }}
                >
                  {char.char}
                </div>
              ))}
            </div>
          }
        />

        {/* Effet 7: Combinaison Glitch + Pulse */}
        <EffectDemo
          title="Glitch + Pulse Combo"
          description="Combinaison du glitch RGB périodique avec un pulse lumineux continu. Double effet pour plus d'intensité."
          animationClass="animate-[ascii-glitch_8s_ease-in-out_infinite,ascii-pulse_3s_ease-in-out_infinite]"
        />

        {/* Effet 8: Hologram + Scanline */}
        <EffectDemo
          title="Hologram + Scanline"
          description="Flicker holographique combiné avec une scanline CRT. Effet rétro-futuriste."
          animationClass="animate-[hologram-flicker_2s_ease-in-out_infinite]"
          extraElements={
            <div className="
              absolute inset-0 w-full h-1
              bg-gradient-to-b from-transparent via-(--color-tertiary)/30 to-transparent
              pointer-events-none
              animate-[scanline_4s_linear_infinite]
            " />
          }
        />

        {/* Effet 9: Corruption + Noise */}
        <EffectDemo
          title="Corruption + Noise"
          description="Data corruption avec overlay de bruit statique. Simulation d'un affichage fortement dégradé."
          animationClass="animate-[data-corruption_6s_step-end_infinite]"
          extraElements={
            <div
              className="absolute inset-0 opacity-15 mix-blend-overlay animate-[noise_0.15s_steps(4)_infinite]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat',
                backgroundSize: '200px 200px',
              }}
            />
          }
        />

      </div>

      <div className={`
        ${styles.flexCol}
        gap-3
        p-6
        bg-(--color-secondary)
        border border-(--color-tertiary)/30
        rounded-lg
        max-w-2xl
        text-center
      `}>
        <p className="text-sm text-(--color-quaternary)">
          <strong className="text-(--color-tertiary)">Note:</strong> Les animations sont en boucle continue
          pour faciliter la comparaison. Dans l'utilisation réelle, certains effets (comme le glitch RGB)
          ne se déclencheront que périodiquement pour éviter la sur-stimulation.
        </p>
        <p className="text-xs text-(--color-muted)">
          URL: <code className="text-(--color-tertiary)">/glitch-demo</code>
        </p>
      </div>
    </section>
  );
};

export default GlitchDemo;
