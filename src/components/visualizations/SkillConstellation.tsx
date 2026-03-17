import { useEffect, useRef, useState, useContext } from 'react';
import { skills } from '../../assets/contents';
import { Skill } from '../../assets/dataTypes';
import { ThemeContext } from '../theme/ThemeEngine';

interface SkillNode {
  skill: Skill;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  opacity: number;
}

type SkillConstellationProps = {
  width?: number;
  height?: number;
  className?: string;
};

/**
 * @component SkillConstellation
 * @description Interactive canvas visualization of skills as a constellation.
 * Skills are displayed as connected nodes, grouped by category with different colors.
 *
 * Features:
 * - Canvas 2D rendering with animated nodes
 * - Category-based color grouping (LANGUAGE, TOOL, LIBRARY)
 * - Connection lines between nearby skills
 * - Hover tooltips showing skill names
 * - Progressive fade-in animation
 * - Weight-based node sizing
 * - Respects prefers-reduced-motion
 */
const SkillConstellation = ({ width = 800, height = 500, className = '' }: SkillConstellationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<SkillNode[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { currentTheme } = useContext(ThemeContext);

  // Category colors (theme-aware)
  const getCategoryColor = (categoryContext: string): string => {
    const isDark = currentTheme === 'dark';
    switch (categoryContext) {
      case 'LANGUAGE':
        return isDark ? '#7CFFC4' : '#479561'; // Mint / Green
      case 'TOOL':
        return isDark ? '#FFA07A' : '#FF6347'; // Light Salmon / Tomato
      case 'LIBRARY':
        return isDark ? '#87CEEB' : '#4682B4'; // Sky Blue / Steel Blue
      default:
        return isDark ? '#D3D3D3' : '#696969'; // Light Gray / Dim Gray
    }
  };

  // Initialize constellation nodes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    // Create nodes from skills
    nodesRef.current = skills.map((skill, index) => {
      const weight = skill.weight || 5;
      const angle = (index / skills.length) * Math.PI * 2;
      const radiusSpread = Math.min(width, height) * 0.35;

      return {
        skill,
        x: width / 2 + Math.cos(angle) * radiusSpread * (0.5 + Math.random() * 0.5),
        y: height / 2 + Math.sin(angle) * radiusSpread * (0.5 + Math.random() * 0.5),
        vx: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.3,
        vy: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.3,
        radius: 3 + weight * 0.8,
        color: getCategoryColor(skill.category.context),
        opacity: 0,
      };
    });

    // Progressive fade-in animation
    if (!prefersReducedMotion) {
      let startTime = Date.now();
      const fadeInDuration = 2000; // 2 seconds

      const fadeIn = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / fadeInDuration, 1);

        nodesRef.current.forEach((node, index) => {
          const delay = (index / nodesRef.current.length) * 0.5;
          node.opacity = Math.min((progress - delay) / (1 - delay), 1);
        });

        if (progress < 1) {
          requestAnimationFrame(fadeIn);
        }
      };

      fadeIn();
    } else {
      // Instant display if reduced motion
      nodesRef.current.forEach(node => node.opacity = 1);
    }

    // Start animation loop
    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [width, height, currentTheme]);

  /**
   * @method animate
   * @description Main animation loop for constellation
   */
  const animate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update node positions
    nodesRef.current.forEach(node => {
      node.x += node.vx;
      node.y += node.vy;

      // Bounce off walls
      if (node.x < node.radius || node.x > width - node.radius) {
        node.vx *= -1;
        node.x = Math.max(node.radius, Math.min(width - node.radius, node.x));
      }
      if (node.y < node.radius || node.y > height - node.radius) {
        node.vy *= -1;
        node.y = Math.max(node.radius, Math.min(height - node.radius, node.y));
      }
    });

    // Draw connections between nearby nodes
    const connectionDistance = 120;
    for (let i = 0; i < nodesRef.current.length; i++) {
      for (let j = i + 1; j < nodesRef.current.length; j++) {
        const nodeA = nodesRef.current[i];
        const nodeB = nodesRef.current[j];

        const dx = nodeA.x - nodeB.x;
        const dy = nodeA.y - nodeB.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          const opacity = (1 - distance / connectionDistance) * 0.2 * Math.min(nodeA.opacity, nodeB.opacity);

          ctx.beginPath();
          ctx.strokeStyle = `rgba(${currentTheme === 'dark' ? '124, 255, 196' : '71, 149, 97'}, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.moveTo(nodeA.x, nodeA.y);
          ctx.lineTo(nodeB.x, nodeB.y);
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    nodesRef.current.forEach(node => {
      if (node.opacity <= 0) return;

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);

      // Glow effect for hovered skill
      if (hoveredSkill === node.skill) {
        ctx.shadowBlur = 15;
        ctx.shadowColor = node.color;
      } else {
        ctx.shadowBlur = 5;
        ctx.shadowColor = node.color;
      }

      ctx.fillStyle = node.color;
      ctx.globalAlpha = node.opacity;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    });

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  /**
   * @method handleMouseMove
   * @description Handle mouse movement to detect hovered skills
   */
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x: e.clientX, y: e.clientY });

    // Find hovered node
    let foundSkill: Skill | null = null;
    for (const node of nodesRef.current) {
      const dx = x - node.x;
      const dy = y - node.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < node.radius + 5) {
        foundSkill = node.skill;
        break;
      }
    }

    setHoveredSkill(foundSkill);
  };

  const handleMouseLeave = () => {
    setHoveredSkill(null);
  };

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ width, height }}
      />

      {/* Hover tooltip */}
      {hoveredSkill && (
        <div
          className="
            absolute
            pointer-events-none
            bg-(--color-secondary)
            bg-opacity-95
            backdrop-blur-sm
            px-3
            py-2
            rounded
            shadow-lg
            text-xs
            font-primary-semibold
            text-(--color-quaternary)
            whitespace-nowrap
            z-50
          "
          style={{
            left: mousePos.x + 15,
            top: mousePos.y - 30,
          }}
        >
          {hoveredSkill.label}
          {hoveredSkill.framework && (
            <span className="text-(--color-tertiary) ml-2">
              ({hoveredSkill.framework})
            </span>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="
        absolute
        bottom-4
        left-4
        flex
        gap-4
        text-xs
        text-(--color-quaternary)
        opacity-70
      ">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getCategoryColor('LANGUAGE') }} />
          <span>Languages</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getCategoryColor('TOOL') }} />
          <span>Tools</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getCategoryColor('LIBRARY') }} />
          <span>Libraries</span>
        </div>
      </div>
    </div>
  );
};

export default SkillConstellation;
