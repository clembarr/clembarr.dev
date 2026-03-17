/**
 * @fileoverview SkillTreeRPG Component
 * A vertical RPG-style skill tree visualization. A root node "DEV" branches
 * into subcategories (WEB, SOFTWARE, DATABASE, etc.), each containing skill
 * leaf nodes with XP bars proportional to their weight.
 *
 * Layout: SVG for edges (cubic bezier paths), DOM overlay for nodes.
 * Interactivity: hover glow + tooltip, click to expand detail panel.
 * Animations: staggered node entrance with Framer Motion, path draw on scroll.
 */

import { useContext, useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { ThemeContext } from '../theme/ThemeEngine';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// ---------------------------------------------------------------------------
// Types (local to component)
// ---------------------------------------------------------------------------

type SkillTreeNode = {
  id: string;
  label: string;
  level?: number;
  children?: SkillTreeNode[];
  color?: string;
};

type SkillTreeRPGProps = {
  root: SkillTreeNode;
  className?: string;
};

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Colours assigned to each subcategory branch. */
const BRANCH_COLORS: Record<string, string> = {
  WEB: '#7CFFC4',
  SOFTWARE: '#FF6B6B',
  DATABASE: '#4ECDC4',
  BIGDATA: '#FFE66D',
  FORMATING: '#A78BFA',
  OTHER: '#71cbb3',
};

const NODE_VERTICAL_GAP = 48;
const BRANCH_MIN_WIDTH = 140;
const LEAF_HEIGHT = 38;
const ROOT_RADIUS = 32;
const BRANCH_RADIUS = 22;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * @function buildLayout Compute x/y positions for every node in the tree so
 * we can render SVG edges and absolutely-positioned DOM nodes on top.
 * Each branch is spread horizontally; leaves stack vertically under branches.
 */
const buildLayout = (
  root: SkillTreeNode,
  containerWidth: number,
) => {
  const positions: Record<string, { x: number; y: number }> = {};
  const branches = root.children ?? [];
  const totalBranches = branches.length;
  if (totalBranches === 0) return { positions, totalHeight: 200 };

  // Branch widths proportional to children count, with a minimum
  const branchWidths = branches.map(b => Math.max(BRANCH_MIN_WIDTH, (b.children?.length ?? 1) * 28 + 80));
  const totalNaturalWidth = branchWidths.reduce((a, b) => a + b, 0);
  const scale = Math.min(1, (containerWidth - 40) / totalNaturalWidth);
  const scaledWidths = branchWidths.map(w => w * scale);
  const totalScaled = scaledWidths.reduce((a, b) => a + b, 0);
  const offsetX = (containerWidth - totalScaled) / 2;

  // Root position
  const rootX = containerWidth / 2;
  const rootY = 50;
  positions[root.id] = { x: rootX, y: rootY };

  // Branch positions
  let cumulativeX = offsetX;
  const branchY = rootY + 100;
  let maxLeafBottom = branchY;

  branches.forEach((branch, bi) => {
    const bx = cumulativeX + scaledWidths[bi] / 2;
    positions[branch.id] = { x: bx, y: branchY };

    // Leaf positions (vertical stack under the branch)
    const leaves = branch.children ?? [];
    leaves.forEach((leaf, li) => {
      const ly = branchY + 60 + li * NODE_VERTICAL_GAP;
      positions[leaf.id] = { x: bx, y: ly };
      if (ly + LEAF_HEIGHT > maxLeafBottom) maxLeafBottom = ly + LEAF_HEIGHT;
    });

    cumulativeX += scaledWidths[bi];
  });

  return { positions, totalHeight: maxLeafBottom + 40 };
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/** SVG edge from parent to child using a cubic bezier curve. */
const Edge = ({
  x1, y1, x2, y2, color, delay,
}: {
  x1: number; y1: number; x2: number; y2: number; color: string; delay: number;
}) => {
  const midY = (y1 + y2) / 2;
  const d = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.6 }}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
    />
  );
};

/** XP bar rendered as a small horizontal bar. */
const XPBar = ({ level, color, width = 80 }: { level: number; color: string; width?: number }) => {
  const pct = Math.min(level / 10, 1);
  return (
    <div className="flex items-center gap-1.5 mt-0.5">
      <div
        className="h-[5px] rounded-full overflow-hidden"
        style={{ width, background: 'rgba(255,255,255,0.08)' }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct * 100}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
      <span className="text-[10px] opacity-60 font-secondary-regular tabular-nums select-none">
        {level}
      </span>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

/**
 * @description Renders a vertical RPG-style skill tree. The root "DEV" node
 * sits at the top, branching into subcategory groups. Each leaf displays
 * an XP bar whose width reflects the skill's weight (0-10).
 */
const SkillTreeRPG = ({ root, className = '' }: SkillTreeRPGProps) => {
  const { currentTheme } = useContext(ThemeContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });
  const [containerWidth, setContainerWidth] = useState(800);
  const [selectedNode, setSelectedNode] = useState<SkillTreeNode | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const isDark = currentTheme === 'dark';
  const textColor = isDark ? '#71cbb3' : '#3D3E3C';
  const mutedText = isDark ? 'rgba(113,203,179,0.7)' : 'rgba(61,62,60,0.7)';

  // Responsive width measurement
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Compute layout
  const { positions, totalHeight } = useMemo(
    () => buildLayout(root, containerWidth),
    [root, containerWidth],
  );

  const branches = root.children ?? [];

  /** Resolve a color for a branch id. */
  const branchColor = useCallback((id: string) => {
    return BRANCH_COLORS[id] ?? BRANCH_COLORS.OTHER;
  }, []);

  /** Find the branch a leaf belongs to (for colouring). */
  const leafBranchColor = useCallback((leafId: string) => {
    for (const b of branches) {
      if (b.children?.some(c => c.id === leafId)) return branchColor(b.id);
    }
    return branchColor('OTHER');
  }, [branches, branchColor]);

  // Flatten all nodes for detail lookup
  const nodeMap = useMemo(() => {
    const map = new Map<string, SkillTreeNode>();
    const walk = (n: SkillTreeNode) => { map.set(n.id, n); n.children?.forEach(walk); };
    walk(root);
    return map;
  }, [root]);

  const handleNodeClick = useCallback((id: string) => {
    const node = nodeMap.get(id);
    if (!node) return;
    setSelectedNode(prev => prev?.id === id ? null : node);
  }, [nodeMap]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-x-auto ${className}`}
      style={{ minHeight: totalHeight + 20 }}
    >
      {/* SVG Layer — edges */}
      {isInView && (
        <svg
          className="absolute inset-0 pointer-events-none"
          width={containerWidth}
          height={totalHeight}
          style={{ overflow: 'visible' }}
        >
          <defs>
            {branches.map(b => (
              <radialGradient key={`glow-${b.id}`} id={`glow-${b.id}`}>
                <stop offset="0%" stopColor={branchColor(b.id)} stopOpacity={0.5} />
                <stop offset="100%" stopColor={branchColor(b.id)} stopOpacity={0} />
              </radialGradient>
            ))}
          </defs>

          {/* Root → Branch edges */}
          {branches.map((b, i) => {
            const rp = positions[root.id];
            const bp = positions[b.id];
            if (!rp || !bp) return null;
            return (
              <Edge
                key={`e-root-${b.id}`}
                x1={rp.x} y1={rp.y + ROOT_RADIUS}
                x2={bp.x} y2={bp.y - BRANCH_RADIUS}
                color={branchColor(b.id)}
                delay={0.15 * i}
              />
            );
          })}

          {/* Branch → Leaf edges */}
          {branches.map((b) =>
            (b.children ?? []).map((leaf, li) => {
              const bp = positions[b.id];
              const lp = positions[leaf.id];
              if (!bp || !lp) return null;
              return (
                <Edge
                  key={`e-${b.id}-${leaf.id}`}
                  x1={bp.x} y1={bp.y + BRANCH_RADIUS}
                  x2={lp.x} y2={lp.y - 8}
                  color={branchColor(b.id)}
                  delay={0.3 + li * 0.08}
                />
              );
            })
          )}
        </svg>
      )}

      {/* DOM Layer — nodes */}
      {isInView && (
        <div className="absolute inset-0" style={{ width: containerWidth, height: totalHeight }}>

          {/* Root node */}
          {positions[root.id] && (
            <motion.div
              className="absolute flex items-center justify-center rounded-full cursor-pointer select-none"
              style={{
                left: positions[root.id].x - ROOT_RADIUS,
                top: positions[root.id].y - ROOT_RADIUS,
                width: ROOT_RADIUS * 2,
                height: ROOT_RADIUS * 2,
                background: isDark
                  ? 'radial-gradient(circle, rgba(124,255,196,0.25), rgba(124,255,196,0.05))'
                  : 'radial-gradient(circle, rgba(71,149,97,0.25), rgba(71,149,97,0.05))',
                border: `2px solid ${isDark ? '#7CFFC4' : '#479561'}`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              onClick={() => handleNodeClick(root.id)}
            >
              <motion.span
                className="font-primary-bold text-sm"
                style={{ color: isDark ? '#7CFFC4' : '#479561' }}
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                {root.label}
              </motion.span>
            </motion.div>
          )}

          {/* Branch nodes */}
          {branches.map((branch, bi) => {
            const bp = positions[branch.id];
            if (!bp) return null;
            const color = branchColor(branch.id);
            const isHovered = hoveredId === branch.id;
            return (
              <motion.div
                key={branch.id}
                className="absolute flex items-center justify-center rounded-full cursor-pointer select-none"
                style={{
                  left: bp.x - BRANCH_RADIUS,
                  top: bp.y - BRANCH_RADIUS,
                  width: BRANCH_RADIUS * 2,
                  height: BRANCH_RADIUS * 2,
                  background: isHovered
                    ? `${color}30`
                    : isDark ? 'rgba(40,41,41,0.9)' : 'rgba(241,241,241,0.9)',
                  border: `2px solid ${color}`,
                  boxShadow: isHovered ? `0 0 16px ${color}60` : 'none',
                  transition: 'box-shadow 0.3s, background 0.3s',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 180, damping: 18, delay: 0.1 + bi * 0.12 }}
                onMouseEnter={() => setHoveredId(branch.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => handleNodeClick(branch.id)}
              >
                <span
                  className="font-primary-semibold text-[10px] tracking-wider uppercase"
                  style={{ color }}
                >
                  {branch.label}
                </span>
              </motion.div>
            );
          })}

          {/* Leaf nodes */}
          {branches.map((branch) =>
            (branch.children ?? []).map((leaf, li) => {
              const lp = positions[leaf.id];
              if (!lp) return null;
              const color = branchColor(branch.id);
              const isHovered = hoveredId === leaf.id;
              const isSelected = selectedNode?.id === leaf.id;
              return (
                <motion.div
                  key={leaf.id}
                  className="absolute cursor-pointer select-none"
                  style={{
                    left: lp.x - 60,
                    top: lp.y - 8,
                    width: 120,
                  }}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + li * 0.06, ease: 'easeOut' }}
                  onMouseEnter={() => setHoveredId(leaf.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => handleNodeClick(leaf.id)}
                >
                  <div
                    className="rounded-lg px-2.5 py-1.5"
                    style={{
                      background: isHovered || isSelected
                        ? `${color}18`
                        : 'transparent',
                      border: isSelected ? `1px solid ${color}50` : '1px solid transparent',
                      boxShadow: isHovered ? `0 0 12px ${color}30` : 'none',
                      transition: 'all 0.25s',
                    }}
                  >
                    <span
                      className="font-secondary-regular text-xs block truncate"
                      style={{ color: isHovered ? color : textColor }}
                    >
                      {leaf.label}
                    </span>
                    {leaf.level !== undefined && (
                      <XPBar level={leaf.level} color={color} width={100} />
                    )}
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      )}

      {/* Detail Panel */}
      <AnimatePresence>
        {selectedNode && selectedNode.id !== root.id && (
          <motion.div
            className="absolute top-4 right-4 z-20 rounded-xl p-4 backdrop-blur-md"
            style={{
              background: isDark ? 'rgba(40,41,41,0.92)' : 'rgba(241,241,241,0.92)',
              border: `1px solid ${leafBranchColor(selectedNode.id)}40`,
              maxWidth: 220,
            }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="absolute top-2 right-2 text-xs opacity-50 hover:opacity-100 transition-opacity"
              style={{ color: textColor }}
              onClick={() => setSelectedNode(null)}
              aria-label="Close detail"
            >
              ✕
            </button>
            <span
              className="font-primary-bold text-sm block mb-1"
              style={{ color: leafBranchColor(selectedNode.id) }}
            >
              {selectedNode.label}
            </span>
            {selectedNode.children && selectedNode.children.length > 0 ? (
              <span className="font-secondary-regular text-xs block" style={{ color: mutedText }}>
                {selectedNode.children.length} skill{selectedNode.children.length > 1 ? 's' : ''}
              </span>
            ) : selectedNode.level !== undefined ? (
              <>
                <span className="font-secondary-regular text-[11px] block mb-2" style={{ color: mutedText }}>
                  XP Level
                </span>
                <XPBar level={selectedNode.level} color={leafBranchColor(selectedNode.id)} width={140} />
              </>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SkillTreeRPG;
