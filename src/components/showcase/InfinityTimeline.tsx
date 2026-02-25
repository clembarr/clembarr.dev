/**
 * @fileoverview InfinityTimeline Component
 * A timeline visualization in the shape of an infinity symbol (lemniscate).
 * Events are placed along the path, creating a continuous journey metaphor.
 */

import { useContext, useState, useRef, useEffect } from 'react';
import { ThemeContext } from '../theme/ThemeEngine';
import { motion, useScroll, useTransform } from 'framer-motion';

type TimelineEvent = {
  id: string;
  title: string;
  description?: string;
  date?: string;
  icon?: React.ReactNode;
  category?: string;
};

type InfinityTimelineProps = {
  events: TimelineEvent[];
  className?: string;
  title?: string;
  subtitle?: string;
};

/**
 * @description An infinity-shaped timeline for visualizing continuous journeys.
 * Points are distributed along a lemniscate curve with scroll-based animations.
 */
const InfinityTimeline = ({
  events,
  className = '',
  title,
  subtitle,
}: InfinityTimelineProps) => {
  const { currentTheme } = useContext(ThemeContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeEvent, setActiveEvent] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

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

  // Responsive dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = Math.min(containerRef.current.offsetWidth, 1000);
        setDimensions({
          width,
          height: width * 0.45,
        });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Calculate position on lemniscate (infinity curve)
  // Parametric equations: x = a*cos(t)/(1+sin²(t)), y = a*sin(t)*cos(t)/(1+sin²(t))
  const getPointOnLemniscate = (t: number, scale: number = 1) => {
    const a = dimensions.width * 0.4 * scale;
    const sinT = Math.sin(t);
    const cosT = Math.cos(t);
    const denominator = 1 + sinT * sinT;

    return {
      x: (a * cosT) / denominator + dimensions.width / 2,
      y: (a * sinT * cosT) / denominator + dimensions.height / 2,
    };
  };

  // Generate SVG path for the infinity symbol
  const generateInfinityPath = () => {
    const points: string[] = [];
    const steps = 100;

    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * 2 * Math.PI;
      const { x, y } = getPointOnLemniscate(t);
      points.push(i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`);
    }

    return points.join(' ') + ' Z';
  };

  // Position events along the curve
  const getEventPosition = (index: number, total: number) => {
    const t = (index / total) * 2 * Math.PI;
    return getPointOnLemniscate(t);
  };

  // Scroll-based animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{ minHeight: dimensions.height + 150 }}
    >
      {/* Title */}
      {title && (
        <div className="text-center mb-8">
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

      {/* SVG Canvas */}
      <svg
        width={dimensions.width}
        height={dimensions.height}
        className="mx-auto overflow-visible"
        style={{ maxWidth: '100%' }}
      >
        {/* Glow filter */}
        <defs>
          <filter id="infinity-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="infinity-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.primary} />
            <stop offset="50%" stopColor={colors.secondary} />
            <stop offset="100%" stopColor={colors.primary} />
          </linearGradient>
        </defs>

        {/* Background path (static) */}
        <path
          d={generateInfinityPath()}
          fill="none"
          stroke={isDark ? 'rgba(124, 255, 196, 0.1)' : 'rgba(71, 149, 97, 0.1)'}
          strokeWidth="3"
        />

        {/* Animated path */}
        <motion.path
          d={generateInfinityPath()}
          fill="none"
          stroke="url(#infinity-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#infinity-glow)"
          style={{
            pathLength,
          }}
        />

        {/* Event points */}
        {events.map((event, index) => {
          const pos = getEventPosition(index, events.length);
          const isActive = activeEvent === event.id;

          return (
            <g key={event.id}>
              {/* Connection line to label */}
              <motion.line
                x1={pos.x}
                y1={pos.y}
                x2={pos.x}
                y2={index % 2 === 0 ? pos.y - 40 : pos.y + 40}
                stroke={colors.primary}
                strokeWidth="1"
                strokeDasharray="4 2"
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0.3 }}
              />

              {/* Event node */}
              <motion.circle
                cx={pos.x}
                cy={pos.y}
                r={isActive ? 12 : 8}
                fill={isActive ? colors.primary : colors.background}
                stroke={colors.primary}
                strokeWidth="2"
                filter={isActive ? "url(#infinity-glow)" : undefined}
                className="cursor-pointer"
                onMouseEnter={() => setActiveEvent(event.id)}
                onMouseLeave={() => setActiveEvent(null)}
                whileHover={{ scale: 1.3 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              />

              {/* Event label */}
              <motion.g
                initial={{ opacity: 0, y: index % 2 === 0 ? 10 : -10 }}
                animate={{
                  opacity: isActive ? 1 : 0.7,
                  y: 0,
                }}
                transition={{ delay: index * 0.1 }}
              >
                <text
                  x={pos.x}
                  y={index % 2 === 0 ? pos.y - 50 : pos.y + 55}
                  textAnchor="middle"
                  className="text-xs font-primary-semibold"
                  fill={colors.text}
                >
                  {event.title}
                </text>
                {event.date && (
                  <text
                    x={pos.x}
                    y={index % 2 === 0 ? pos.y - 35 : pos.y + 70}
                    textAnchor="middle"
                    className="text-2xs font-secondary-regular"
                    fill={colors.secondary}
                  >
                    {event.date}
                  </text>
                )}
              </motion.g>
            </g>
          );
        })}
      </svg>

      {/* Active event details */}
      {activeEvent && (
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
          exit={{ opacity: 0, y: 20 }}
        >
          <p
            className="text-sm font-secondary-regular text-center"
            style={{ color: colors.text }}
          >
            {events.find(e => e.id === activeEvent)?.description || 'No description available'}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default InfinityTimeline;
