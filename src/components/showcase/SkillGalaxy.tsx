/**
 * @fileoverview SkillGalaxy Component
 * A 2D constellation map where each skill is a star grouped into clusters
 * by subcategory. Links connect skills sharing a framework or career tags.
 *
 * - Cluster zones: semi-transparent ellipses with subcategory labels.
 * - Nodes: SVG circles sized by weight, glow on hover, tooltip on hover.
 * - Links: solid (framework) or dashed (career), with animated particles.
 * - Entrance: staggered node fade-in, link fade-in, slow ambient rotation.
 */

import { useContext, useRef, useState, useEffect, useMemo } from 'react';
import { ThemeContext } from '../theme/ThemeEngine';
import { motion, useInView } from 'framer-motion';
import { SkillGalaxyProps, SkillNode } from '../../assets/dataTypes';
import { GALAXY_CLUSTER_COLORS } from '../../assets/uiConstants';

/**
 * @function getClusterEllipse Compute the bounding ellipse for a cluster's nodes
 * with some padding, used to draw the zone background.
 */
const getClusterEllipse = (
  clusterNodes: SkillNode[],
  w: number,
  h: number,
) => {
  if (clusterNodes.length === 0) return null;
  const xs = clusterNodes.map(n => n.x * w);
  const ys = clusterNodes.map(n => n.y * h);
  const cx = xs.reduce((a, b) => a + b, 0) / xs.length;
  const cy = ys.reduce((a, b) => a + b, 0) / ys.length;
  const rx = Math.max(50, (Math.max(...xs) - Math.min(...xs)) / 2 + 40);
  const ry = Math.max(40, (Math.max(...ys) - Math.min(...ys)) / 2 + 35);
  return { cx, cy, rx, ry };
};

/**
 * Animated particle that travels along a link path.
 * We animate a small circle from source to target infinitely.
 */
const LinkParticle = ({
  x1, y1, x2, y2, color, delay,
}: {
  x1: number; y1: number; x2: number; y2: number; color: string; delay: number;
}) => (
  <motion.circle
    r={1.5}
    fill={color}
    initial={{ cx: x1, cy: y1, opacity: 0 }}
    animate={{
      cx: [x1, x2],
      cy: [y1, y2],
      opacity: [0, 0.8, 0],
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      ease: 'linear',
    }}
  />
);

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

/**
 * @description Renders a constellation-style galaxy of skills. Each skill is
 * a star positioned by cluster (subcategory). Links between skills represent
 * framework relationships (solid) or shared career tags (dashed).
 */
const SkillGalaxy = ({ nodes, links, className = '' }: SkillGalaxyProps) => {
  const { currentTheme } = useContext(ThemeContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });
  const [dimensions, setDimensions] = useState({ width: 900, height: 600 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  const isDark = currentTheme === 'dark';
  const textColor = isDark ? '#71cbb3' : '#3D3E3C';
  const mutedText = isDark ? 'rgba(113,203,179,0.5)' : 'rgba(61,62,60,0.45)';
  const bgTint = isDark ? 'rgba(40,41,41,0.4)' : 'rgba(241,241,241,0.35)';

  // Responsive dimensions
  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        const h = Math.max(400, Math.min(w * 0.66, 650));
        setDimensions({ width: w, height: h });
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const { width: W, height: H } = dimensions;

  // Node map for quick lookup
  const nodeMap = useMemo(() => {
    const m = new Map<string, SkillNode>();
    nodes.forEach(n => m.set(n.id, n));
    return m;
  }, [nodes]);

  // Group nodes by cluster
  const clusters = useMemo(() => {
    const map = new Map<string, SkillNode[]>();
    nodes.forEach(n => {
      if (!map.has(n.cluster)) map.set(n.cluster, []);
      map.get(n.cluster)!.push(n);
    });
    return map;
  }, [nodes]);

  // Hovered node data
  const hoveredNode = hoveredId ? nodeMap.get(hoveredId) : null;

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {isInView && (
        <svg
          width={W}
          height={H}
          viewBox={`0 0 ${W} ${H}`}
          className="block mx-auto"
          style={{ overflow: 'visible' }}
        >
          {/* SVG Filters */}
          <defs>
            <filter id="galaxy-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="galaxy-glow-strong" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Cluster zone ellipses */}
          {Array.from(clusters.entries()).map(([cluster, clusterNodes]) => {
            const ell = getClusterEllipse(clusterNodes, W, H);
            if (!ell) return null;
            const color = GALAXY_CLUSTER_COLORS[cluster] ?? GALAXY_CLUSTER_COLORS.OTHER;
            return (
              <motion.g key={`cluster-${cluster}`}>
                <motion.ellipse
                  cx={ell.cx}
                  cy={ell.cy}
                  rx={ell.rx}
                  ry={ell.ry}
                  fill={color}
                  fillOpacity={isDark ? 0.02 : 0.03}
                  stroke={color}
                  strokeOpacity={0.06}
                  strokeWidth={1}
                  strokeDasharray="4 6"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
                <motion.text
                  x={ell.cx}
                  y={ell.cy - ell.ry - 8}
                  textAnchor="middle"
                  fill={color}
                  fillOpacity={0.5}
                  fontSize={10}
                  fontFamily="Montserrat, sans-serif"
                  fontWeight={600}
                  letterSpacing="0.1em"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  {cluster}
                </motion.text>
              </motion.g>
            );
          })}

          {/* Links */}
          {links.map((link, i) => {
            const s = nodeMap.get(link.source);
            const t = nodeMap.get(link.target);
            if (!s || !t) return null;
            const x1 = s.x * W;
            const y1 = s.y * H;
            const x2 = t.x * W;
            const y2 = t.y * H;
            const color = link.type === 'framework'
              ? (GALAXY_CLUSTER_COLORS[s.cluster] ?? '#71cbb3')
              : '#A78BFA';
            const isHighlighted = hoveredId === s.id || hoveredId === t.id;
            return (
              <g key={`link-${i}`}>
                <motion.line
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={color}
                  strokeWidth={isHighlighted ? 1.5 : 0.8}
                  strokeOpacity={isHighlighted ? 0.7 : 0.2}
                  strokeDasharray={link.type === 'career' ? '4 4' : undefined}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 + i * 0.03 }}
                  style={{ transition: 'stroke-width 0.3s, stroke-opacity 0.3s' }}
                />
                {/* Particles along link */}
                <LinkParticle
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  color={color}
                  delay={1 + i * 0.4}
                />
              </g>
            );
          })}

          {/* Nodes (stars or icons) */}
          {nodes.map((node, i) => {
            const px = node.x * W;
            const py = node.y * H;
            const r = Math.max(20, node.size); // Taille ajustée pour les icônes
            const isHovered = hoveredId === node.id;
            const floatDuration = 4 + (i * 1.3) % 4;
            const floatDelay = -((i * 0.7) % floatDuration);

            return (
              /** Outer <g> drives the organic float via CSS animation */
              <g
                key={node.id}
                style={{
                  animationName: 'graph-widget-float',
                  animationDuration: `${floatDuration}s`,
                  animationDelay: `${floatDelay}s`,
                  animationTimingFunction: 'ease-in-out',
                  animationIterationCount: 'infinite',
                }}
              >
                {/** Inner motion.g handles entrance (scale + opacity) */}
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 150,
                    damping: 15,
                    delay: 0.3 + i * 0.04,
                  }}
                  onMouseEnter={() => {
                    setHoveredId(node.id);
                    setTooltipPos({ x: px, y: py });
                  }}
                  onMouseLeave={() => {
                    setHoveredId(null);
                    setTooltipPos(null);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Background glow circle */}
                  <circle
                    cx={px}
                    cy={py}
                    r={r + 4}
                    fill={node.color}
                    fillOpacity={isHovered ? 0.3 : 0}
                    filter={isHovered ? 'url(#galaxy-glow-strong)' : 'url(#galaxy-glow)'}
                    style={{ transition: 'fill-opacity 0.2s' }}
                  />

                  {node.icon ? (
                    <image
                      href={node.icon}
                      x={px - r}
                      y={py - r}
                      width={r * 2}
                      height={r * 2}
                      style={{
                        opacity: isHovered ? 1 : 0.8,
                        transition: 'opacity 0.2s'
                      }}
                    />
                  ) : (
                    <circle
                      cx={px}
                      cy={py}
                      r={Math.max(3, node.size / 3)}
                      fill={node.color}
                      fillOpacity={isHovered ? 1 : 0.8}
                      style={{ transition: 'fill-opacity 0.2s' }}
                    />
                  )}
                </motion.g>
              </g>
            );
          })}

          {/* Tooltip */}
          {hoveredNode && tooltipPos && (
            <g>
              <rect
                x={tooltipPos.x + 12}
                y={tooltipPos.y - 24}
                width={hoveredNode.label.length * 7.5 + 24}
                height={28}
                rx={6}
                fill={bgTint}
                stroke={hoveredNode.color}
                strokeWidth={1}
                strokeOpacity={0.4}
              />
              <text
                x={tooltipPos.x + 24}
                y={tooltipPos.y - 6}
                fill={textColor}
                fontSize={12}
                fontFamily="Hind Vadodara, sans-serif"
              >
                {hoveredNode.label}
              </text>
            </g>
          )}
        </svg>
      )}

      {/* Legend */}
      {isInView && (
        <motion.div
          className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-5 h-px" style={{ background: mutedText }} />
            <span className="text-[10px] font-secondary-regular" style={{ color: mutedText }}>
              Framework
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="inline-block w-5 h-px"
              style={{ background: '#A78BFA', borderTop: '1px dashed #A78BFA' }}
            />
            <span className="text-[10px] font-secondary-regular" style={{ color: mutedText }}>
              Career
            </span>
          </div>
          {Object.entries(GALAXY_CLUSTER_COLORS).filter(([k]) => clusters.has(k)).map(([k, c]) => (
            <div key={k} className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full" style={{ background: c }} />
              <span className="text-[10px] font-secondary-regular" style={{ color: mutedText }}>
                {k}
              </span>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default SkillGalaxy;
