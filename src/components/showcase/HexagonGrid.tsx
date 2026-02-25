/**
 * @fileoverview HexagonGrid Component
 * An interactive honeycomb grid layout for displaying items.
 * Perfect for skills, projects, or any categorical content.
 */

import { useContext, useState, useEffect, useRef } from 'react';
import { ThemeContext } from '../theme/ThemeEngine';
import { motion, AnimatePresence } from 'framer-motion';

type HexItem = {
  id: string;
  label: string;
  icon?: string;
  description?: string;
  category?: string;
  color?: string;
};

type HexagonGridProps = {
  items: HexItem[];
  className?: string;
  hexSize?: number;
  gap?: number;
  columns?: number;
};

/**
 * @description A honeycomb hexagonal grid for displaying items.
 * Each hexagon is interactive with hover effects and optional expand.
 */
const HexagonGrid = ({
  items,
  className = '',
  hexSize = 80,
  gap = 8,
  columns = 5,
}: HexagonGridProps) => {
  const { currentTheme } = useContext(ThemeContext);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [actualColumns, setActualColumns] = useState(columns);

  const isDark = currentTheme === 'dark';

  // Theme colors
  const colors = {
    primary: isDark ? '#7CFFC4' : '#479561',
    secondary: isDark ? '#71cbb3' : '#5ab578',
    tertiary: isDark ? '#a8ffe5' : '#3D3E3C',
    text: isDark ? '#71cbb3' : '#3D3E3C',
    background: isDark ? '#282929' : '#f1f1f1',
    backgroundAlt: isDark ? '#2F2F2F' : '#f4f4f4',
    glow: isDark ? 'rgba(124, 255, 196, 0.4)' : 'rgba(71, 149, 97, 0.3)',
    border: isDark ? 'rgba(124, 255, 196, 0.3)' : 'rgba(71, 149, 97, 0.3)',
  };

  // Category colors
  const categoryColors: Record<string, string> = {
    language: isDark ? '#7CFFC4' : '#479561',
    tool: isDark ? '#FFA07A' : '#FF6347',
    library: isDark ? '#87CEEB' : '#4682B4',
    framework: isDark ? '#DDA0DD' : '#9370DB',
    default: colors.primary,
  };

  // Responsive columns
  useEffect(() => {
    const updateColumns = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.offsetWidth;

      if (width < 400) setActualColumns(2);
      else if (width < 600) setActualColumns(3);
      else if (width < 800) setActualColumns(4);
      else setActualColumns(columns);
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, [columns, hexSize, gap]);

  // Calculate hexagon positions
  const getHexPosition = (index: number) => {
    const hexWidth = hexSize * 1.1;
    const hexHeight = hexSize;
    const row = Math.floor(index / actualColumns);
    const col = index % actualColumns;

    // Offset every other row for honeycomb effect
    const xOffset = row % 2 === 1 ? hexWidth / 2 : 0;

    return {
      x: col * (hexWidth + gap) + xOffset,
      y: row * (hexHeight * 0.85 + gap),
    };
  };

  // Generate hexagon clip path
  const hexClipPath = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';

  // Calculate grid dimensions
  const rows = Math.ceil(items.length / actualColumns);
  const gridWidth = actualColumns * (hexSize * 1.1 + gap) + hexSize * 0.55;
  const gridHeight = rows * (hexSize * 0.85 + gap) + hexSize * 0.15;

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Grid container */}
      <div
        className="relative mx-auto"
        style={{
          width: gridWidth,
          maxWidth: '100%',
          height: gridHeight,
        }}
      >
        {items.map((item, index) => {
          const pos = getHexPosition(index);
          const isHovered = hoveredItem === item.id;
          const isSelected = selectedItem === item.id;
          const itemColor = item.color || categoryColors[item.category || 'default'] || colors.primary;

          return (
            <motion.div
              key={item.id}
              className="absolute cursor-pointer"
              style={{
                width: hexSize,
                height: hexSize,
                left: pos.x,
                top: pos.y,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: index * 0.03,
                type: 'spring',
                stiffness: 260,
                damping: 20,
              }}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => setSelectedItem(isSelected ? null : item.id)}
            >
              {/* Hexagon background */}
              <motion.div
                className="w-full h-full flex items-center justify-center"
                style={{
                  clipPath: hexClipPath,
                  background: isHovered || isSelected
                    ? `linear-gradient(135deg, ${itemColor}30 0%, ${itemColor}10 100%)`
                    : colors.backgroundAlt,
                  border: `2px solid ${isHovered || isSelected ? itemColor : colors.border}`,
                  boxShadow: isHovered || isSelected
                    ? `0 0 20px ${itemColor}40, inset 0 0 20px ${itemColor}10`
                    : 'none',
                }}
                animate={{
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                {/* Inner content */}
                <div className="flex flex-col items-center justify-center p-2">
                  {item.icon ? (
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="w-8 h-8 object-contain mb-1"
                      style={{
                        filter: isHovered ? 'brightness(1.2)' : 'none',
                      }}
                    />
                  ) : (
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center mb-1"
                      style={{
                        background: `${itemColor}30`,
                        border: `1px solid ${itemColor}`,
                      }}
                    >
                      <span
                        className="text-xs font-primary-bold"
                        style={{ color: itemColor }}
                      >
                        {item.label.charAt(0)}
                      </span>
                    </div>
                  )}
                  <span
                    className="text-2xs font-primary-regular text-center leading-tight"
                    style={{
                      color: isHovered || isSelected ? itemColor : colors.text,
                      maxWidth: hexSize - 16,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              </motion.div>

              {/* Glow effect on hover */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      clipPath: hexClipPath,
                      background: `radial-gradient(circle, ${itemColor}20 0%, transparent 70%)`,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Selected item details panel */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="mt-8 mx-auto p-6 rounded-xl max-w-md"
            style={{
              background: colors.background,
              border: `1px solid ${colors.primary}`,
              boxShadow: `0 8px 32px ${colors.glow}`,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {(() => {
              const item = items.find(i => i.id === selectedItem);
              if (!item) return null;

              return (
                <div className="text-center">
                  <h4
                    className="text-lg font-primary-semibold mb-2"
                    style={{ color: colors.text }}
                  >
                    {item.label}
                  </h4>
                  {item.category && (
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-secondary-regular mb-3"
                      style={{
                        background: `${categoryColors[item.category] || colors.primary}20`,
                        color: categoryColors[item.category] || colors.primary,
                        border: `1px solid ${categoryColors[item.category] || colors.primary}`,
                      }}
                    >
                      {item.category}
                    </span>
                  )}
                  {item.description && (
                    <p
                      className="text-sm font-secondary-regular"
                      style={{ color: colors.text, opacity: 0.8 }}
                    >
                      {item.description}
                    </p>
                  )}
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HexagonGrid;
