/**
 * @fileoverview Assets and Content utilities
 * Consolidates utilities for skills, projects, and blog.
 * This file imports assets, so it should NOT be imported by the configuration assets 
 * (like projects/*.ts or documents/index.ts) to prevent circular dependencies.
 */

import { skills } from '../assets/skills';
import { errorMessages, APP_URL } from "../assets/constants";
import { blogPosts } from "../assets/blog";
import { 
  Skill, 
  AvailableSkillCategories, 
  ProjectMedia,
  MediaType
} from '../assets/dataTypes';

export * from './translationUtils';

/** Lazy-loaded map for O(1) skill lookups. Initialized on first call to avoid
 * circular dependency issues when configuration assets import this file. */
let _skillsMap: Map<string, Skill> | null = null;

/**
 * @function getSkillsMap Return the skills lookup map, building it on first call.
 * @returns A Map keyed by skill label for O(1) lookups.
 */
const getSkillsMap = (): Map<string, Skill> => {
  if (!_skillsMap) {
    // Defensive check: if skills is still undefined (module cycle), 
    // we return an empty map for now or throw a more helpful error
    if (!skills) return new Map();

    _skillsMap = new Map<string, Skill>(
      skills.map(skill => [skill.label, skill])
    );
  }
  return _skillsMap;
};

/**
 * @function getSkill Retrieve a skill by its label with O(1) average complexity.
 * Falls back to a linear search if the map lookup fails. Throws in dev mode if
 * the skill is not found.
 * @param label - The skill label to look up.
 * @returns The matching Skill object.
 */
export const getSkill = (label: string): Skill => {
  const map = getSkillsMap();
  const skill = map.get(label);

  if (!skill) {
    // Search in the list if map lookup fails (fallback)
    // We check skills existence again for safety in circular loops
    const safeSkills = skills || [];
    const foundSkill = safeSkills.find(s => s.label === label);
    if (!foundSkill) {
      const error = `Skill "${label}" not found.`;
      if (import.meta.env.DEV) {
        throw new Error(error);
      } else {
        console.error(error);
        return safeSkills[0];
      }
    }
    return foundSkill;
  }

  return skill;
};

/**
 * @function hasSkill Check if a skill exists in the skills index.
 * @param label - The skill label to check.
 * @returns true if the skill exists, false otherwise.
 */
export const hasSkill = (label: string): boolean => {
  const safeSkills = skills || [];
  try {
    return getSkillsMap().has(label) || safeSkills.some(s => s.label === label);
  } catch {
    return safeSkills.some(s => s.label === label);
  }
};

/**
 * @function getSkillsByCategory Get all skills filtered by category.
 * @param category - The category to filter by.
 * @returns Array of skills belonging to the given category.
 */
export const getSkillsByCategory = (category: AvailableSkillCategories): Skill[] => {
  const safeSkills = skills || [];
  return safeSkills.filter(skill => skill.category.context === category);
};

/**
 * @function wrapInMedia Wrap a resource URL into a ProjectMedia object.
 * @param ressourceUrl - The URL of the media resource.
 * @param type - The media type (IMAGE or VIDEO).
 * @param alt - Alternative text for accessibility.
 * @returns A ProjectMedia object.
 */
export const wrapInMedia = (ressourceUrl: string, type: MediaType, alt: string): ProjectMedia => {
    if (type === MediaType.IMAGE) {
        return {
            url: ressourceUrl,
            type: MediaType.IMAGE,
            alt: alt
        }
    } else if (type === MediaType.VIDEO) {
        return {
            url: ressourceUrl,
            type: MediaType.VIDEO,
            alt: alt
        }
    } else {
        const errorMsg = errorMessages.find((m) => m.context === "mediaError")?.content.en || "Media type not supported";
        throw new Error(errorMsg);
    }
}

/** URL of the blog page */
const BLOG_URL = APP_URL + "/blog";

/**
 * @function getRelatedPosts Returns blog posts that reference the given project title
 * in their `relatedProjects` field.
 * @param projectTitle - The project title to match against.
 * @returns Array of related BlogPost objects.
 */
export const getRelatedPosts = (projectTitle: string) => {
    return blogPosts.filter((post) => post.relatedProjects && post.relatedProjects.includes(projectTitle));
}

/**
 * @function getPost Returns the blog post with the given slug.
 * @param postSlug - The slug to look up.
 * @returns The matching BlogPost, or undefined if not found.
 */
export const getPost = (postSlug: string) => {
    return blogPosts.find((post) => post.slug === postSlug);
}

/**
 * @function getPostUrl Returns the full URL of a blog post given its slug.
 * @param postSlug - The post slug to build the URL from.
 * @returns The full blog post URL string.
 */
export const getPostUrl = (postSlug: string) => {
    return BLOG_URL + "/" + postSlug;
}

export { skills };

/**
 * @function normalizeMedia Normalizes media input into a ProjectMedia object.
 * Plain URL strings are wrapped as IMAGE type; existing ProjectMedia objects are
 * returned as-is.
 * @param media - A raw image URL string or an existing ProjectMedia object.
 * @returns A normalized ProjectMedia object.
 */
export const normalizeMedia = (media: string | ProjectMedia): ProjectMedia => {
    if (typeof media === 'string') {
        return {
            url: media,
            type: MediaType.IMAGE,
            alt: "Project illustration"
        };
    }
    return media;
};