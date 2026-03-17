/**
 * @fileoverview Data consistency validation system
 * This file contains runtime validation for projects, skills, and translation content.
 * Validation runs automatically in development mode to catch data errors early.
 */

import { projects } from './contents';
import { UNIVERSAL_LANG, SUPPORTED_LANGUAGES } from '../utils/translationUtils';
import { hasSkill } from '../utils/assetsUtils';
import { Retex, MultilingualContent, MultilingualContentArray } from './dataTypes';

interface ValidationResult {
  errors: string[];
  errorCount: number;
  warningCount: number;
}

/**
 * Validates a multilingual content object
 */
const validateMultilingual = (
  content: MultilingualContent | MultilingualContentArray | undefined,
  context: string,
  errors: string[],
  isMandatory = true
): void => {
  if (!content) {
    if (isMandatory) errors.push(`[${context}] Content is missing`);
    return;
  }

  // Must have at least one language or universal key
  const keys = Object.keys(content);
  if (keys.length === 0) {
    errors.push(`[${context}] Content object is empty`);
    return;
  }

  // Warn if mandatory languages are missing
  if (!keys.includes(UNIVERSAL_LANG)) {
    SUPPORTED_LANGUAGES.forEach(lang => {
      if (!keys.includes(lang)) {
        // This is a warning, not a hard error if another language exists
        console.warn(`[${context}] Missing translation for language: ${lang}`);
      }
    });
  }
};

/**
 * Validates all data consistency
 */
export const validateData = (): ValidationResult => {
  const errors: string[] = [];
  let warningCount = 0;

  // 1. Validate Projects (Retex)
  projects.forEach((project: Retex) => {
    const projectId = project.title[UNIVERSAL_LANG] || project.title.en || 'Unknown Project';

    // Metadata validation
    validateMultilingual(project.title, `${projectId} - title`, errors);
    validateMultilingual(project.description, `${projectId} - description`, errors);
    
    if (!project.date) errors.push(`[${projectId}] Missing date`);
    if (!project.coverImage) errors.push(`[${projectId}] Missing coverImage`);

    // Content validation
    if (!project.content) {
      errors.push(`[${projectId}] Missing content object`);
    } else {
      const { specs, notions, tools, images } = project.content;
      
      validateMultilingual(specs, `${projectId} - specs`, errors);
      validateMultilingual(notions, `${projectId} - notions`, errors);

      if (tools && Array.isArray(tools)) {
        tools.forEach((tool, i) => {
          if (!tool || !tool.label) {
            errors.push(`[${projectId}] Invalid tool at index ${i}`);
          } else if (!hasSkill(tool.label)) {
            errors.push(`[${projectId}] Skill "${tool.label}" not found in global skills list`);
          }
        });
      } else {
        errors.push(`[${projectId}] tools must be an array`);
      }

      if (images && Array.isArray(images)) {
        if (images.length === 0) {
          console.warn(`[${projectId}] Project has no images`);
          warningCount++;
        }
      } else {
        errors.push(`[${projectId}] images must be an array`);
      }
    }
  });

  const errorCount = errors.length;

  if (import.meta.env.DEV) {
    if (errorCount > 0) {
      console.group('❌ Data Consistency Errors');
      errors.forEach(err => console.error(err));
      console.groupEnd();
    } else {
      console.log('✅ Data consistency check passed');
    }

    if (errorCount > 0) {
      console.error('⚠️ Please fix errors before deploying to production.');
    }
  }

  return { errors, errorCount, warningCount };
};

// Auto-run validation in development mode
if (import.meta.env.DEV) {
  validateData();
}
