/**
 * @fileoverview Skills indexing and access utilities
 * Provides O(1) skill lookups via Map-based index instead of O(n) array searches
 */

import { skills } from './contents';
import { Skill, AvailableSkillCategories } from './dataTypes';

/**
 * Map-based index for O(1) skill lookups by label.
 * Created once at module load time for optimal performance.
 *
 * @constant {Map<string, Skill>}
 */
const skillsMap = new Map<string, Skill>(
  skills.map(skill => [skill.label, skill])
);

/**
 * Retrieve a skill by its label with O(1) complexity.
 *
 * This function provides a performance-optimized alternative to
 * `skills.find((skill) => skill.label === 'React')` by using a Map index.
 *
 * @function getSkill
 * @param label - The skill label (e.g., "React", "Python", "Docker")
 * @returns The skill object corresponding to the label
 * @throws Error in development mode if skill not found (helps catch typos during development)
 *
 * @example
 * // Before (O(n) complexity):
 * const reactSkill = skills.find((skill) => skill.label === 'React')!;
 *
 * // After (O(1) complexity):
 * const reactSkill = getSkill('React');
 */
export const getSkill = (label: string): Skill => {
  const skill = skillsMap.get(label);

  if (!skill) {
    const error = `Skill "${label}" not found in skills index. Available skills: ${Array.from(skillsMap.keys()).join(', ')}`;

    if (import.meta.env.DEV) {
      throw new Error(error);
    } else {
      console.error(error);
      // Fallback to first skill in production to prevent crashes
      return skills[0];
    }
  }

  return skill;
};

/**
 * Check if a skill exists in the skills index.
 *
 * @function hasSkill
 * @param label - The skill label to check
 * @returns True if the skill exists, false otherwise
 *
 * @example
 * if (hasSkill('React')) {
 *   const reactSkill = getSkill('React');
 * }
 */
export const hasSkill = (label: string): boolean => {
  return skillsMap.has(label);
};

/**
 * Get all skills filtered by category.
 *
 * @function getSkillsByCategory
 * @param category - The category to filter by (e.g., AvailableSkillCategories.LANGUAGE)
 * @returns Array of skills in the specified category
 *
 * @example
 * const languageSkills = getSkillsByCategory(AvailableSkillCategories.LANGUAGE);
 * const tools = getSkillsByCategory(AvailableSkillCategories.TOOL);
 */
export const getSkillsByCategory = (category: AvailableSkillCategories): Skill[] => {
  return skills.filter(skill => skill.category.context === category);
};

/**
 * Re-export the skills array for backward compatibility.
 * Components that iterate over all skills can still import from this module.
 */
export { skills };
