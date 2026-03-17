/**
 * @fileoverview MathSpiral Component
 * A Fibonacci/Golden spiral visualization for displaying growth or progression.
 * Items are positioned along the spiral, creating a natural flow.
 */

import { useContext, useRef, useState, useEffect } from 'react';
import { ThemeContext } from '../theme/ThemeEngine';
import { motion, useScroll, useTransform } from 'framer-motion';

type SpiralItem = {
  id: string;
  label: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
};

type MathSpiralProps = {
  items: SpiralItem[];
  className?: string;
  spiralType?: 'fibonacci' | 'archimedean' | 'logarithmic';
  title?: string;
  subtitle?: string;
};

/**
 * @description A mathematical spiral visualization.
 * Items grow along the spiral following golden ratio proportions.
 */
const MathSpiral = ({
  items,
  className = '',
  spiralType = 'fibonacci',
  title,
  subtitle,
}: MathSpiralProps) => {
  const { currentTheme } = useContext(ThemeContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 600 });
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const isDark = currentTheme === 'dark';

  // Theme colors
  const colors = {
    primary: isDark ? '#7CFFC4' : '#479561',
    secondary: isDark ? '#71cbb3' : '#5ab578',
    tertiary: isDark ? '#a8ffe5' : '#3D3E3C',
    text: isDark ? '#71cbb3' : '#3D3E3C',
    background: isDark ? '#282929' : '#f1f1f1',
    glow: isDark ? 'rgba(124, 255, 196, 0.4)' : 'rgba(71, 149, 97, 0.3)',
  };

  // Responsive dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const size = Math.min(containerRef.current.offsetWidth, 700);
        setDimensions({ width: size, height: size });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Calculate position on spiral
  const getSpiralPoint = (index: number, total: number) => {
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;
    const maxRadius = Math.min(dimensions.width, dimensions.height) * 0.4;

    let angle: number;
    let radius: number;

    switch (spiralType) {
      case 'fibonacci':
        // Fibonacci spiral (golden spiral)
        angle = index * 2.4; // ~137.5 degrees in radians (golden angle)
        radius = Math.sqrt(index + 1) * (maxRadius / Math.sqrt(total));
        break;

      case 'archimedean':
        // Archimedean spiral (equal spacing)
        angle = index * 0.5;
        radius = (index / total) * maxRadius;
        break;

      case 'logarithmic':
        // Logarithmic spiral
        const a = 5;
        const b = 0.15;
        angle = index * 0.4;
        radius = a * Math.exp(b * angle);
        radius = Math.min(radius, maxRadius);
        break;

      default:
        angle = index * 2.4;
        radius = Math.sqrt(index + 1) * (maxRadius / Math.sqrt(total));
    }

    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
      angle: angle * (180 / Math.PI),
      radius,
    };
  };

  // Generate spiral path for SVG
  const generateSpiralPath = () => {
    const points: string[] = [];
    const steps = 200;
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;
    const maxRadius = Math.min(dimensions.width, dimensions.height) * 0.42;

    for (let i = 0; i <= steps; i++) {
      let angle: number;
      let radius: number;

      switch (spiralType) {
        case 'fibonacci':
          angle = i * 0.15;
          radius = Math.sqrt(i) * (maxRadius / Math.sqrt(steps));
          break;
        case 'archimedean':
          angle = i * 0.1;
          radius = (i / steps) * maxRadius;
          break;
        case 'logarithmic':
          angle = i * 0.08;
          radius = 5 * Math.exp(0.05 * angle);
          radius = Math.min(radius, maxRadius);
          break;
        default:
          angle = i * 0.15;
          radius = Math.sqrt(i) * (maxRadius / Math.sqrt(steps));
      }

      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      points.push(i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`);
    }

    return points.join(' ');
  };

  // Scroll animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const spiralRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const spiralScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  // Size multiplier based on item size
  const getSizeMultiplier = (size?: 'sm' | 'md' | 'lg') => {
    switch (size) {
      case 'sm': return 0.8;
      case 'lg': return 1.4;
      default: return 1;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Title */}
      {title && (
        <div className="text-center mb-6">
          <h3
            className="text-2xl font-primary-bold mb-2"
            style={{ color: colors.text }}
          >
            {title}
          </h3>
          {subtitle && (
            <p
              className="text-sm font-secondary-regular opacity-70"
              style={{ color: colors.text }}
            >
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Spiral container */}
      <motion.div
        className="relative mx-auto"
        style={{
          width: dimensions.width,
          height: dimensions.height,
          maxWidth: '100%',
        }}
      >
        {/* SVG Background spiral */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        >
          <defs>
            <linearGradient id="spiralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.primary} stopOpacity="0.1" />
              <stop offset="100%" stopColor={colors.secondary} stopOpacity="0.3" />
            </linearGradient>
            <filter id="spiralGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Spiral path */}
          <motion.path
            d={generateSpiralPath()}
            fill="none"
            stroke="url(#spiralGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            filter="url(#spiralGlow)"
            style={{
              rotate: isHovering ? 0 : spiralRotation,
              scale: spiralScale,
              transformOrigin: 'center',
            }}
          />

          {/* Center decoration */}
          <motion.circle
            cx={dimensions.width / 2}
            cy={dimensions.height / 2}
            r={20}
            fill={colors.background}
            stroke={colors.primary}
            strokeWidth="2"
            filter="url(#spiralGlow)"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <text
            x={dimensions.width / 2}
            y={dimensions.height / 2 + 5}
            textAnchor="middle"
            className="text-xs font-primary-bold"
            fill={colors.primary}
          >
            {spiralType === 'fibonacci' ? 'φ' : spiralType === 'archimedean' ? '∞' : 'e'}
          </text>
        </svg>

        {/* Spiral items */}
        {items.map((item, index) => {
          const pos = getSpiralPoint(index, items.length);
          const isActive = activeItem === item.id;
          const baseSize = 50 * getSizeMultiplier(item.size);

          return (
            <motion.div
              key={item.id}
              className="absolute cursor-pointer"
              style={{
                width: baseSize,
                height: baseSize,
                left: pos.x - baseSize / 2,
                top: pos.y - baseSize / 2,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: isActive ? 1.2 : 1,
              }}
              transition={{
                delay: index * 0.05,
                type: 'spring',
                stiffness: 200,
              }}
              onMouseEnter={() => setActiveItem(item.id)}
              onMouseLeave={() => setActiveItem(null)}
              whileHover={{ scale: 1.3, zIndex: 10 }}
            >
              <div
                className="w-full h-full rounded-full flex items-center justify-center transition-all duration-200"
                style={{
                  background: isActive
                    ? `radial-gradient(circle, ${colors.primary}40 0%, ${colors.background} 70%)`
                    : colors.background,
                  border: `2px solid ${isActive ? colors.primary : colors.secondary}`,
                  boxShadow: isActive
                    ? `0 0 20px ${colors.glow}, 0 0 40px ${colors.glow}`
                    : `0 4px 10px rgba(0,0,0,0.2)`,
                }}
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
                    style={{ color: isActive ? colors.primary : colors.text }}
                  >
                    {item.label.slice(0, 4)}
                  </span>
                )}
              </div>

              {/* Label on hover */}
              {isActive && (
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-lg"
                  style={{
                    top: baseSize + 8,
                    background: colors.background,
                    border: `1px solid ${colors.primary}`,
                    boxShadow: `0 4px 12px ${colors.glow}`,
                  }}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <span
                    className="text-xs font-primary-semibold"
                    style={{ color: colors.text }}
                  >
                    {item.label}
                  </span>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Active item details */}
      {activeItem && (
        <motion.div
          className="mt-8 mx-auto p-4 rounded-xl max-w-md text-center"
          style={{
            background: colors.background,
            border: `1px solid ${colors.primary}`,
            boxShadow: `0 8px 32px ${colors.glow}`,
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h4
            className="text-lg font-primary-semibold mb-2"
            style={{ color: colors.text }}
          >
            {items.find(i => i.id === activeItem)?.label}
          </h4>
          <p
            className="text-sm font-secondary-regular"
            style={{ color: colors.text, opacity: 0.8 }}
          >
            {items.find(i => i.id === activeItem)?.description || 'Element on the spiral of growth'}
          </p>
        </motion.div>
      )}

      {/* Mathematical formula decoration */}
      <div className="text-center mt-4">
        <span
          className="text-xs font-secondary-regular italic opacity-50"
          style={{ color: colors.text }}
        >
          {spiralType === 'fibonacci' && 'r = a × φ^(θ/90°) — Golden Spiral'}
          {spiralType === 'archimedean' && 'r = a + b × θ — Archimedean Spiral'}
          {spiralType === 'logarithmic' && 'r = a × e^(bθ) — Logarithmic Spiral'}
        </span>
      </div>
    </div>
  );
};

export default MathSpiral;
