/**
 * @fileoverview OrbitingSkills Component
 * A planetary system visualization where skills orbit around a central element.
 * Each orbit represents a skill category, with skills as planets.
 */

import { useContext, useRef, useState } from 'react';
import { ThemeContext } from '../theme/ThemeEngine';
import { motion } from 'framer-motion';

type OrbitItem = {
  id: string;
  label: string;
  icon?: string;
  category?: string;
};

type OrbitRing = {
  items: OrbitItem[];
  radius: number;
  duration: number;
  direction?: 'clockwise' | 'counterclockwise';
  color?: string;
};

type OrbitingSkillsProps = {
  centerContent?: React.ReactNode;
  centerLabel?: string;
  rings: OrbitRing[];
  className?: string;
  size?: number;
};

/**
 * @description A planetary orbit system for visualizing hierarchical data.
 * Items orbit around a center point in concentric rings with smooth animations.
 */
const OrbitingSkills = ({
  centerContent,
  centerLabel = "Core",
  rings,
  className = '',
  size = 500,
}: OrbitingSkillsProps) => {
  const { currentTheme } = useContext(ThemeContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const isDark = currentTheme === 'dark';

  // Theme colors
  const colors = {
    primary: isDark ? '#7CFFC4' : '#479561',
    secondary: isDark ? '#71cbb3' : '#5ab578',
    tertiary: isDark ? '#a8ffe5' : '#3D3E3C',
    orbit: isDark ? 'rgba(124, 255, 196, 0.15)' : 'rgba(71, 149, 97, 0.15)',
    glow: isDark ? 'rgba(124, 255, 196, 0.4)' : 'rgba(71, 149, 97, 0.3)',
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Orbit rings (visual guides) */}
      {rings.map((ring, ringIndex) => (
        <div
          key={`orbit-${ringIndex}`}
          className="absolute rounded-full border transition-all duration-300"
          style={{
            width: ring.radius * 2,
            height: ring.radius * 2,
            left: `calc(50% - ${ring.radius}px)`,
            top: `calc(50% - ${ring.radius}px)`,
            borderColor: ring.color || colors.orbit,
            borderWidth: hoveredItem ? '1px' : '1px',
            opacity: hoveredItem ? 0.3 : 0.6,
          }}
        />
      ))}

      {/* Center element */}
      <motion.div
        className="absolute z-20 flex flex-col items-center justify-center rounded-full"
        style={{
          width: 80,
          height: 80,
          left: 'calc(50% - 40px)',
          top: 'calc(50% - 40px)',
          background: `radial-gradient(circle, ${colors.primary}20 0%, ${colors.primary}05 70%)`,
          boxShadow: `0 0 30px ${colors.glow}`,
          border: `2px solid ${colors.primary}`,
        }}
        animate={{
          scale: [1, 1.05, 1],
          boxShadow: [
            `0 0 20px ${colors.glow}`,
            `0 0 40px ${colors.glow}`,
            `0 0 20px ${colors.glow}`,
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {centerContent || (
          <span
            className="text-sm font-primary-semibold"
            style={{ color: colors.primary }}
          >
            {centerLabel}
          </span>
        )}
      </motion.div>

      {/* Orbiting items */}
      {rings.map((ring, ringIndex) => (
        <div key={`ring-${ringIndex}`} className="absolute inset-0">
          {ring.items.map((item, itemIndex) => {
            const itemCount = ring.items.length;
            const angleOffset = (360 / itemCount) * itemIndex;
            const isHovered = hoveredItem === item.id;
            const direction = ring.direction === 'counterclockwise' ? -1 : 1;

            return (
              <motion.div
                key={item.id}
                className="absolute z-10"
                style={{
                  width: 50,
                  height: 50,
                  left: 'calc(50% - 25px)',
                  top: 'calc(50% - 25px)',
                }}
                animate={{
                  rotate: isPaused ? angleOffset : [angleOffset, angleOffset + 360 * direction],
                }}
                transition={{
                  duration: ring.duration,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <motion.div
                  className="absolute flex items-center justify-center rounded-full cursor-pointer
                    transition-all duration-200"
                  style={{
                    width: 50,
                    height: 50,
                    transform: `translateX(${ring.radius - 25}px)`,
                    background: isHovered
                      ? `radial-gradient(circle, ${colors.primary}40 0%, ${colors.primary}10 70%)`
                      : `radial-gradient(circle, ${colors.secondary}20 0%, transparent 70%)`,
                    border: `2px solid ${isHovered ? colors.primary : colors.secondary}`,
                    boxShadow: isHovered ? `0 0 20px ${colors.glow}` : 'none',
                  }}
                  animate={{
                    rotate: isPaused ? -angleOffset : [-angleOffset, -angleOffset - 360 * direction],
                  }}
                  transition={{
                    duration: ring.duration,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  whileHover={{ scale: 1.2 }}
                >
                  {item.icon ? (
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="w-6 h-6 object-contain"
                    />
                  ) : (
                    <span
                      className="text-xs font-primary-semibold text-center px-1"
                      style={{ color: colors.tertiary }}
                    >
                      {item.label.slice(0, 3)}
                    </span>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      ))}

      {/* Tooltip */}
      {hoveredItem && (
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full
            px-4 py-2 rounded-lg z-30"
          style={{
            background: isDark ? 'rgba(40, 41, 41, 0.95)' : 'rgba(244, 244, 244, 0.95)',
            border: `1px solid ${colors.primary}`,
            boxShadow: `0 4px 20px ${colors.glow}`,
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span
            className="text-sm font-primary-regular"
            style={{ color: colors.tertiary }}
          >
            {rings.flatMap(r => r.items).find(i => i.id === hoveredItem)?.label}
          </span>
        </motion.div>
      )}
    </div>
  );
};

export default OrbitingSkills;
