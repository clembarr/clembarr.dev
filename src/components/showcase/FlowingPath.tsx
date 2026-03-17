/**
 * @fileoverview FlowingPath Component
 * An animated SVG path that represents a journey or progression.
 * Features flowing particles along the path with milestones.
 */

import { useContext, useRef, useEffect, useState } from 'react';
import { ThemeContext } from '../theme/ThemeEngine';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

type Milestone = {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  position: number; // 0-1 along path
};

type FlowingPathProps = {
  milestones: Milestone[];
  className?: string;
  pathType?: 'wave' | 'mountain' | 'river' | 'zigzag';
  title?: string;
};

/**
 * @description A flowing animated path with milestones.
 * Particles travel along the path, highlighting progression.
 */
const FlowingPath = ({
  milestones,
  className = '',
  pathType = 'wave',
  title,
}: FlowingPathProps) => {
  const { currentTheme } = useContext(ThemeContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 400 });
  const [pathLength, setPathLength] = useState(0);
  const [activeMilestone, setActiveMilestone] = useState<string | null>(null);

  const isDark = currentTheme === 'dark';

  // Theme colors
  const colors = {
    primary: isDark ? '#7CFFC4' : '#479561',
    secondary: isDark ? '#71cbb3' : '#5ab578',
    tertiary: isDark ? '#a8ffe5' : '#3D3E3C',
    text: isDark ? '#71cbb3' : '#3D3E3C',
    background: isDark ? '#282929' : '#f1f1f1',
    glow: isDark ? 'rgba(124, 255, 196, 0.5)' : 'rgba(71, 149, 97, 0.4)',
  };

  // Generate path based on type
  const generatePath = (): string => {
    const w = dimensions.width;
    const h = dimensions.height;
    const margin = 50;

    switch (pathType) {
      case 'wave':
        return `M ${margin} ${h / 2}
          Q ${w * 0.25} ${h * 0.2}, ${w * 0.5} ${h / 2}
          Q ${w * 0.75} ${h * 0.8}, ${w - margin} ${h / 2}`;

      case 'mountain':
        return `M ${margin} ${h - margin}
          L ${w * 0.25} ${h * 0.4}
          L ${w * 0.4} ${h * 0.6}
          L ${w * 0.6} ${h * 0.2}
          L ${w * 0.8} ${h * 0.5}
          L ${w - margin} ${h - margin}`;

      case 'river':
        return `M ${margin} ${margin}
          C ${w * 0.2} ${h * 0.3}, ${w * 0.1} ${h * 0.5}, ${w * 0.3} ${h * 0.5}
          S ${w * 0.5} ${h * 0.3}, ${w * 0.6} ${h * 0.6}
          S ${w * 0.8} ${h * 0.8}, ${w - margin} ${h - margin}`;

      case 'zigzag':
        const segments = 5;
        let path = `M ${margin} ${h / 2}`;
        for (let i = 1; i <= segments; i++) {
          const x = margin + ((w - 2 * margin) / segments) * i;
          const y = i % 2 === 0 ? h * 0.3 : h * 0.7;
          path += ` L ${x} ${y}`;
        }
        return path;

      default:
        return `M ${margin} ${h / 2} L ${w - margin} ${h / 2}`;
    }
  };

  // Get point on path at percentage
  const getPointOnPath = (percentage: number): { x: number; y: number } | null => {
    if (!pathRef.current || pathLength === 0) return null;
    const point = pathRef.current.getPointAtLength(pathLength * percentage);
    return { x: point.x, y: point.y };
  };

  // Update dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = Math.min(containerRef.current.offsetWidth, 1200);
        setDimensions({
          width,
          height: Math.max(300, width * 0.35),
        });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Get path length
  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [dimensions, pathType]);

  // Scroll animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const pathDrawProgress = useTransform(smoothProgress, [0.1, 0.7], [0, 1]);

  // Particle positions (multiple particles flowing along path)
  const particleCount = 5;
  const particles = Array.from({ length: particleCount }, (_, i) => {
    const offset = i / particleCount;
    return useTransform(smoothProgress, [0, 1], [offset, offset + 1]);
  });

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{ minHeight: dimensions.height + 100 }}
    >
      {/* Title */}
      {title && (
        <h3
          className="text-center text-2xl font-primary-bold mb-8"
          style={{ color: colors.text }}
        >
          {title}
        </h3>
      )}

      {/* SVG Canvas */}
      <svg
        width={dimensions.width}
        height={dimensions.height}
        className="mx-auto overflow-visible"
        style={{ maxWidth: '100%' }}
      >
        {/* Definitions */}
        <defs>
          <linearGradient id="flowingPathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.primary} stopOpacity="0.3" />
            <stop offset="50%" stopColor={colors.secondary} />
            <stop offset="100%" stopColor={colors.primary} stopOpacity="0.3" />
          </linearGradient>

          <filter id="flowingGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Particle gradient */}
          <radialGradient id="particleGradient">
            <stop offset="0%" stopColor={colors.primary} />
            <stop offset="100%" stopColor={colors.primary} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background path (static guide) */}
        <path
          d={generatePath()}
          fill="none"
          stroke={isDark ? 'rgba(124, 255, 196, 0.1)' : 'rgba(71, 149, 97, 0.1)'}
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Animated main path */}
        <motion.path
          ref={pathRef}
          d={generatePath()}
          fill="none"
          stroke="url(#flowingPathGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#flowingGlow)"
          style={{
            pathLength: pathDrawProgress,
          }}
        />

        {/* Flowing particles */}
        {particles.map((particleProgress, i) => (
          <motion.g key={`particle-${i}`}>
            <motion.circle
              r="6"
              fill={colors.primary}
              filter="url(#flowingGlow)"
              style={{
                cx: useTransform(particleProgress, (p) => {
                  const point = getPointOnPath(p % 1);
                  return point?.x || 0;
                }),
                cy: useTransform(particleProgress, (p) => {
                  const point = getPointOnPath(p % 1);
                  return point?.y || 0;
                }),
                opacity: useTransform(particleProgress, (p) => {
                  const normalized = p % 1;
                  // Fade in and out at edges
                  if (normalized < 0.1) return normalized * 10;
                  if (normalized > 0.9) return (1 - normalized) * 10;
                  return 1;
                }),
              }}
            />
            {/* Particle trail */}
            <motion.circle
              r="12"
              fill="url(#particleGradient)"
              style={{
                cx: useTransform(particleProgress, (p) => {
                  const point = getPointOnPath((p % 1) - 0.02);
                  return point?.x || 0;
                }),
                cy: useTransform(particleProgress, (p) => {
                  const point = getPointOnPath((p % 1) - 0.02);
                  return point?.y || 0;
                }),
                opacity: useTransform(particleProgress, (p) => {
                  const normalized = p % 1;
                  if (normalized < 0.1 || normalized > 0.9) return 0;
                  return 0.5;
                }),
              }}
            />
          </motion.g>
        ))}

        {/* Milestones */}
        {milestones.map((milestone) => {
          const point = getPointOnPath(milestone.position);
          if (!point) return null;

          const isActive = activeMilestone === milestone.id;

          return (
            <g key={milestone.id}>
              {/* Milestone marker */}
              <motion.circle
                cx={point.x}
                cy={point.y}
                r={isActive ? 16 : 12}
                fill={colors.background}
                stroke={colors.primary}
                strokeWidth="3"
                filter={isActive ? "url(#flowingGlow)" : undefined}
                className="cursor-pointer"
                onMouseEnter={() => setActiveMilestone(milestone.id)}
                onMouseLeave={() => setActiveMilestone(null)}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: milestone.position * 0.5 }}
                whileHover={{ scale: 1.2 }}
              />

              {/* Milestone icon or number */}
              <text
                x={point.x}
                y={point.y + 4}
                textAnchor="middle"
                className="text-xs font-primary-bold pointer-events-none"
                fill={colors.primary}
              >
                {milestone.icon || milestones.indexOf(milestone) + 1}
              </text>

              {/* Milestone label */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0.7 }}
              >
                <text
                  x={point.x}
                  y={point.y - 25}
                  textAnchor="middle"
                  className="text-sm font-primary-semibold"
                  fill={colors.text}
                >
                  {milestone.title}
                </text>
              </motion.g>
            </g>
          );
        })}
      </svg>

      {/* Active milestone details */}
      {activeMilestone && (
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 px-6 py-4 rounded-xl z-20"
          style={{
            bottom: '20px',
            background: colors.background,
            border: `1px solid ${colors.primary}`,
            boxShadow: `0 8px 32px ${colors.glow}`,
            maxWidth: '90%',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p
            className="text-sm font-secondary-regular text-center"
            style={{ color: colors.text }}
          >
            {milestones.find(m => m.id === activeMilestone)?.description}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default FlowingPath;
