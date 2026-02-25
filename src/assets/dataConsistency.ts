/**
 * @fileoverview Data consistency validation system
 * This file contains runtime validation for projects, skills, and i18n content.
 * Validation runs automatically in development mode to catch data errors early.
 */

import { projects } from './projects';
import { skills } from './contents';
import { UNIVERSAL_LANG, SUPPORTED_LANGUAGES } from './i18n';
import { hasSkill } from './skillsIndex';
import { Retex, Skill } from './dataTypes';

interface ValidationError {
  type: 'error' | 'warning';
  category: 'project' | 'skill' | 'i18n' | 'reference';
  message: string;
  context?: string;
}

const errors: ValidationError[] = [];

/**
 * Logs a validation error/warning to console and stores it
 */
const logError = (error: ValidationError) => {
  errors.push(error);
  const prefix = error.type === 'error' ? '❌' : '⚠️';
  const contextStr = error.context ? ` (${error.context})` : '';

  if (error.type === 'error') {
    console.error(`${prefix} [${error.category}] ${error.message}${contextStr}`);
  } else {
    console.warn(`${prefix} [${error.category}] ${error.message}${contextStr}`);
  }
};

/**
 * Validates multilingual content has required language keys
 */
const validateMultilingual = (
  obj: { [key: string]: string | string[] } | undefined,
  context: string,
  required = true
) => {
  if (!obj && required) {
    logError({
      type: 'error',
      category: 'i18n',
      message: 'Missing multilingual content',
      context
    });
    return;
  }

  if (obj) {
    // If UNIVERSAL_LANG is present, that's sufficient
    if (obj[UNIVERSAL_LANG]) {
      return;
    }

    // Otherwise, check for all supported languages
    SUPPORTED_LANGUAGES.forEach(lang => {
      if (!obj[lang]) {
        logError({
          type: 'warning',
          category: 'i18n',
          message: `Missing "${lang}" translation`,
          context
        });
      }
    });
  }
};

/**
 * Validates a single project has all required fields and valid references
 */
const validateProject = (project: Retex, index: number) => {
  const projectId = project.title?.[UNIVERSAL_LANG] ||
                    project.title?.fr ||
                    project.title?.en ||
                    `Project #${index + 1}`;

  // Required fields validation
  if (!project.title) {
    logError({
      type: 'error',
      category: 'project',
      message: 'Missing title',
      context: projectId
    });
  }

  if (!project.description) {
    logError({
      type: 'error',
      category: 'project',
      message: 'Missing description',
      context: projectId
    });
  }

  if (!project.date || !(project.date instanceof Date)) {
    logError({
      type: 'error',
      category: 'project',
      message: 'Invalid or missing date',
      context: projectId
    });
  } else if (isNaN(project.date.getTime())) {
    logError({
      type: 'error',
      category: 'project',
      message: 'Date is invalid (NaN)',
      context: projectId
    });
  }

  // Multilingual content validation
  validateMultilingual(project.title, `${projectId} - title`);
  validateMultilingual(project.description, `${projectId} - description`);
  validateMultilingual(project.tags, `${projectId} - tags`, false);
  validateMultilingual(project.specs, `${projectId} - specs`, false);
  validateMultilingual(project.notions, `${projectId} - notions`, false);

  // Tools/skills reference validation
  if (project.tools && Array.isArray(project.tools)) {
    project.tools.forEach((tool, i) => {
      if (!tool) {
        logError({
          type: 'error',
          category: 'reference',
          message: `Tool at index ${i} is null/undefined`,
          context: projectId
        });
      } else if (!tool.label) {
        logError({
          type: 'error',
          category: 'reference',
          message: `Tool at index ${i} has no label`,
          context: projectId
        });
      } else if (!hasSkill(tool.label)) {
        logError({
          type: 'error',
          category: 'reference',
          message: `Tool "${tool.label}" not found in skills index`,
          context: projectId
        });
      }
    });
  }

  // Images validation
  if (project.img && Array.isArray(project.img)) {
    project.img.forEach((image, i) => {
      if (!image || typeof image !== 'string') {
        logError({
          type: 'warning',
          category: 'project',
          message: `Image at index ${i} is invalid`,
          context: projectId
        });
      }
    });
  }

  // Additional resources validation
  if (project.additionalRessources && Array.isArray(project.additionalRessources)) {
    project.additionalRessources.forEach((resource, i) => {
      if (!resource.content) {
        logError({
          type: 'warning',
          category: 'project',
          message: `Additional resource ${i} missing content`,
          context: projectId
        });
      }
      if (!resource.link) {
        logError({
          type: 'warning',
          category: 'project',
          message: `Additional resource ${i} missing link`,
          context: projectId
        });
      }
    });
  }
};

/**
 * Validates a single skill has all required fields
 */
const validateSkill = (skill: Skill, index: number) => {
  const skillId = skill.label || `Skill #${index + 1}`;

  if (!skill.label) {
    logError({
      type: 'error',
      category: 'skill',
      message: 'Missing label',
      context: skillId
    });
  }

  if (!skill.category) {
    logError({
      type: 'error',
      category: 'skill',
      message: 'Missing category',
      context: skillId
    });
  } else if (!skill.category.context) {
    logError({
      type: 'error',
      category: 'skill',
      message: 'Category missing context',
      context: skillId
    });
  }

  if (!skill.icon) {
    logError({
      type: 'warning',
      category: 'skill',
      message: 'Missing icon',
      context: skillId
    });
  }
};

/**
 * Main validation function - validates all data
 */
export const validateData = () => {
  // Only run in development mode
  if (!import.meta.env.DEV) {
    return { errors: [], errorCount: 0, warningCount: 0 };
  }

  console.log('🔍 Running data consistency validation...');
  errors.length = 0; // Clear previous errors

  // Validate skills
  skills.forEach((skill, i) => validateSkill(skill, i));

  // Validate projects
  projects.forEach((project, i) => validateProject(project, i));

  // Summary
  const errorCount = errors.filter(e => e.type === 'error').length;
  const warningCount = errors.filter(e => e.type === 'warning').length;

  if (errorCount === 0 && warningCount === 0) {
    console.log('✅ Data validation passed! All checks completed successfully.');
  } else {
    console.log(`📊 Validation complete: ${errorCount} error(s), ${warningCount} warning(s)`);

    if (errorCount > 0) {
      console.error('⚠️  Please fix errors before deploying to production.');
    }
  }

  return { errors, errorCount, warningCount };
};

// Auto-run validation in development mode
if (import.meta.env.DEV) {
  validateData();
}
