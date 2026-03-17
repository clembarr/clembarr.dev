import { useContext, useMemo } from "react";
import { skills } from "../../assets/contents";
import styles from "../../style";
import { ThemeContext } from "../theme/ThemeEngine";
// import SkillGalaxy from "../showcase/SkillGalaxy";
import { LangContext } from "../language";
import { translate } from "../../utils/assetsUtils";
import { GalaxyLink, SkillNode } from "../../assets/dataTypes";

/**
 * @function assignGridJitterPositions Distribute nodes evenly across the virtual
 * canvas using a uniform grid, then add per-cell jitter for organic variance.
 * Nodes are sorted by cluster first so same-cluster skills land in adjacent cells,
 * preserving a loose grouping without forcing tight clusters.
 * @param nodes Nodes to position in-place (x/y are overwritten).
 * @param vw Virtual canvas width (px).
 * @param vh Virtual canvas height (px).
 * @param jitter Fraction of cell size used as jitter radius (0–1).
 */
const assignGridJitterPositions = (
  nodes: SkillNode[],
  vw: number,
  vh: number,
  jitter = 0.55,
) => {
  const n = nodes.length;
  if (n === 0) return;

  // Match grid aspect ratio to the canvas so cells are roughly square.
  const cols = Math.max(1, Math.round(Math.sqrt(n * (vw / vh))));
  const rows = Math.ceil(n / cols);
  const cellW = vw / cols;
  const cellH = vh / rows;

  // Sort by cluster so same-category nodes occupy adjacent grid cells.
  const sorted = [...nodes].sort((a, b) => a.cluster.localeCompare(b.cluster));

  sorted.forEach((node, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const px = (col + 0.5) * cellW + (Math.random() - 0.5) * cellW * jitter;
    const py = (row + 0.5) * cellH + (Math.random() - 0.5) * cellH * jitter;
    // Mutations propagate to the original `nodes` array (shared object refs).
    node.x = Math.max(0.05, Math.min(0.95, px / vw));
    node.y = Math.max(0.05, Math.min(0.95, py / vh));
  });
};

/** Virtual canvas used for pixel-space collision resolution before normalizing back to 0–1. */
const VIRTUAL_W = 900;
const VIRTUAL_H = 580;

/**
 * @function resolveCircleCollisions Push overlapping skill nodes apart iteratively
 * (relaxation algorithm) until no two circles overlap. Works in a virtual pixel
 * space so radii are meaningful, then re-normalizes positions to [0, 1].
 * @param nodes Initial nodes with normalized x/y positions and pixel size.
 * @param vw Virtual canvas width in px.
 * @param vh Virtual canvas height in px.
 * @param gap Extra gap to enforce between circle edges (px).
 * @param iterations Maximum relaxation passes.
 * @returns New array of nodes with collision-free normalized positions.
 */
const resolveCircleCollisions = (
  nodes: SkillNode[],
  vw: number,
  vh: number,
  gap = 12,
  iterations = 200,
): SkillNode[] => {
  const pts = nodes.map(n => ({
    x: n.x * vw,
    y: n.y * vh,
    r: Math.max(20, n.size),
  }));

  for (let iter = 0; iter < iterations; iter++) {
    let moved = false;

    // Phase 1 — separation only, no clamping yet.
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[j].x - pts[i].x;
        const dy = pts[j].y - pts[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = pts[i].r + pts[j].r + gap;
        if (dist < minDist) {
          const overlap = (minDist - dist) / 2;
          // Unit vector from i toward j, or random if nodes are exactly co-located.
          const nx = dist > 0.01 ? dx / dist : (Math.random() - 0.5) * 2;
          const ny = dist > 0.01 ? dy / dist : (Math.random() - 0.5) * 2;
          pts[i].x -= nx * overlap;
          pts[i].y -= ny * overlap;
          pts[j].x += nx * overlap;
          pts[j].y += ny * overlap;
          moved = true;
        }
      }
    }

    // Phase 2 — clamp every node after all pairs have been resolved.
    for (const p of pts) {
      const margin = p.r + 6;
      p.x = Math.max(margin, Math.min(vw - margin, p.x));
      p.y = Math.max(margin, Math.min(vh - margin, p.y));
    }

    if (!moved) break;
  }

  return nodes.map((n, i) => ({ ...n, x: pts[i].x / vw, y: pts[i].y / vh }));
};

/**
 * @component Skills
 * @description Skills section rendering a galaxy visualization of the developer's
 * skills. Nodes are laid out with a grid-jitter algorithm then collision-resolved,
 * and re-computed when the theme or language changes.
 */
const Skills = () => {
  const { currentTheme } = useContext(ThemeContext);
  const { currentLang } = useContext(LangContext);

  const { nodes, links } = useMemo(() => {
    const galaxyNodes: SkillNode[] = [];
    const galaxyLinks: GalaxyLink[] = [];

    skills.forEach((skill) => {
      galaxyNodes.push({
        id: skill.label,
        label: skill.label,
        x: 0, // set by assignGridJitterPositions below
        y: 0,
        size: (skill.weight ?? 5) * 3,
        cluster: translate(skill.category.content, currentLang)?.toUpperCase() || skill.category.context,
        color: currentTheme === 'dark' ? '#71cbb3' : '#3D3E3C',
        icon: skill.icon.content[currentTheme]
      });

      // Create links for frameworks
      if (skill.framework) {
        // Ensure the framework exists in our skills list to avoid broken links
        const targetExists = skills.some(s => s.label === skill.framework);
        if (targetExists) {
          galaxyLinks.push({
            source: skill.label,
            target: skill.framework,
            type: 'framework'
          });
        }
      }
    });

    // Create additional links for related subcategories within the same category
    // This makes the constellation look more connected
    skills.forEach((skill, i) => {
      if (!skill.subcategory) return;
      
      // Find another skill with the same subcategory to connect to
      const relatedSkill = skills.find((s, j) => 
        j > i && // Avoid duplicate links and self-links
        s.subcategory?.context === skill.subcategory?.context &&
        !s.framework && !skill.framework // Don'translate over-connect framework items
      );

      if (relatedSkill) {
        galaxyLinks.push({
          source: skill.label,
          target: relatedSkill.label,
          type: 'career'
        });
      }
    });

    assignGridJitterPositions(galaxyNodes, VIRTUAL_W, VIRTUAL_H);
    const resolvedNodes = resolveCircleCollisions(galaxyNodes, VIRTUAL_W, VIRTUAL_H);
    return { nodes: resolvedNodes, links: galaxyLinks };
  }, [currentTheme, currentLang]);

  return (
    <section id="skills"
      className={`
        ${styles.sizeFull}
        ${styles.flexCol}
        ${styles.contentCenter}
      `}
    >
      <div id="galaxy-container"
        className={`
          w-full
          min-h-[500px]
          md:min-h-[600px]
          relative
          ${styles.contentCenter}
          rounded-2xl
          overflow-hidden
        `}
      >
        {/* <SkillGalaxy 
          nodes={nodes} 
          links={links} 
          className="w-full h-full"
        /> */}
      </div>
    </section>
  );
};

export default Skills;
