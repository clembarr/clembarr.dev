/**
 * @fileoverview PerspectiveCards Component
 * A 3D perspective card stack that responds to scroll and mouse movement.
 * Creates an immersive depth effect for showcasing content.
 */

import { useContext, useRef, useState, useEffect } from 'react';
import { ThemeContext } from '../theme/ThemeEngine';
import { motion, useScroll, useTransform } from 'framer-motion';

type PerspectiveCard = {
  id: string;
  title: string;
  description?: string;
  image?: string;
  tags?: string[];
  link?: string;
};

type PerspectiveCardsProps = {
  cards: PerspectiveCard[];
  className?: string;
};

/**
 * @description A 3D perspective card display with scroll-based depth effects.
 * Cards appear to float in 3D space and respond to mouse movement.
 */
const PerspectiveCards = ({
  cards,
  className = '',
}: PerspectiveCardsProps) => {
  const { currentTheme } = useContext(ThemeContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const isDark = currentTheme === 'dark';

  // Theme colors
  const colors = {
    primary: isDark ? '#7CFFC4' : '#479561',
    secondary: isDark ? '#71cbb3' : '#5ab578',
    text: isDark ? '#71cbb3' : '#3D3E3C',
    background: isDark ? '#282929' : '#f1f1f1',
    cardBg: isDark ? '#2F2F2F' : '#f4f4f4',
    glow: isDark ? 'rgba(124, 255, 196, 0.3)' : 'rgba(71, 149, 97, 0.2)',
  };

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Spring smoothing is available via mousePosition

  // Handle mouse movement for 3D effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Transform values for perspective effect
  const perspective = 1000;
  const rotateXBase = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const scaleBase = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full min-h-[600px] py-12 ${className}`}
      style={{ perspective: `${perspective}px` }}
    >
      {/* 3D Container */}
      <motion.div
        className="relative w-full max-w-4xl mx-auto"
        style={{
          transformStyle: 'preserve-3d',
          rotateX: rotateXBase,
          scale: scaleBase,
        }}
      >
        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {cards.map((card, index) => {
            const isActive = activeCard === index;
            const depth = (index % 3) * 20; // Varying depth per card
            const delay = index * 0.1;

            // Calculate rotation based on mouse position
            const cardRotateY = (mousePosition.x - 0.5) * 15;
            const cardRotateX = (mousePosition.y - 0.5) * -15;

            return (
              <motion.div
                key={card.id}
                className="relative cursor-pointer group"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `translateZ(${depth}px)`,
                }}
                initial={{ opacity: 0, y: 50, rotateX: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotateX: isActive ? 0 : cardRotateX * 0.3,
                  rotateY: isActive ? 0 : cardRotateY * 0.3,
                  z: isActive ? 80 : depth,
                  scale: isActive ? 1.05 : 1,
                }}
                transition={{
                  delay,
                  duration: 0.5,
                  type: 'spring',
                  stiffness: 200,
                  damping: 25,
                }}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                {/* Card face */}
                <div
                  className="relative overflow-hidden rounded-xl transition-all duration-300"
                  style={{
                    background: colors.cardBg,
                    border: `1px solid ${isActive ? colors.primary : colors.secondary}40`,
                    boxShadow: isActive
                      ? `0 25px 50px -12px ${colors.glow}, 0 0 30px ${colors.primary}30`
                      : `0 10px 30px -10px rgba(0,0,0,0.3)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Image */}
                  {card.image && (
                    <div className="relative h-40 overflow-hidden">
                      <motion.img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover"
                        animate={{
                          scale: isActive ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(to bottom, transparent 50%, ${colors.cardBg} 100%)`,
                        }}
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-5">
                    <h3
                      className="text-lg font-primary-semibold mb-2"
                      style={{ color: colors.text }}
                    >
                      {card.title}
                    </h3>

                    {card.description && (
                      <p
                        className="text-sm font-secondary-regular mb-4 line-clamp-2"
                        style={{ color: colors.text, opacity: 0.7 }}
                      >
                        {card.description}
                      </p>
                    )}

                    {/* Tags */}
                    {card.tags && card.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {card.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 rounded-full text-xs font-secondary-regular"
                            style={{
                              background: `${colors.primary}20`,
                              color: colors.primary,
                              border: `1px solid ${colors.primary}40`,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `linear-gradient(
                        ${135 + mousePosition.x * 90}deg,
                        transparent 0%,
                        ${colors.primary}10 50%,
                        transparent 100%
                      )`,
                    }}
                    animate={{
                      opacity: isActive ? 1 : 0,
                    }}
                  />

                  {/* Edge highlight */}
                  <div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{
                      background: 'transparent',
                      boxShadow: isActive
                        ? `inset 0 1px 0 ${colors.primary}40, inset 0 -1px 0 ${colors.primary}20`
                        : 'none',
                    }}
                  />
                </div>

                {/* 3D Shadow plane */}
                <motion.div
                  className="absolute -bottom-4 left-4 right-4 h-8 rounded-xl"
                  style={{
                    background: 'rgba(0,0,0,0.2)',
                    filter: 'blur(10px)',
                    transform: 'rotateX(90deg) translateZ(-20px)',
                    transformOrigin: 'bottom',
                  }}
                  animate={{
                    opacity: isActive ? 0.8 : 0.4,
                    scaleX: isActive ? 1.1 : 1,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Depth indicators (decorative) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-px"
            style={{
              top: `${30 + i * 20}%`,
              background: `linear-gradient(90deg,
                transparent 0%,
                ${colors.primary}20 50%,
                transparent 100%
              )`,
              transform: `translateZ(${-100 - i * 50}px)`,
            }}
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PerspectiveCards;
