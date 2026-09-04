/**
 * @fileoverview Data consistency validation system
 * This file contains runtime validation for every content type of the portfolio:
 * projects (retex), blog posts, skills, career timeline, miscellaneous contents
 * and the media/icon assets they reference.
 *
 * Validation runs automatically in development mode to catch data errors early,
 * and can be run headlessly from the CLI via `npm run validate`
 * (see scripts/validate-data.js).
 *
 * Errors are blocking (broken links, missing mandatory data). Warnings flag
 * naming-convention drift and incomplete-but-usable data.
 */

import { projects, careerTimeline, bioText, aboutWidgets, sharedLinks, footerColumns } from './contents';
import { blogPosts } from './blog';
import { skills } from './skills';
import { UNIVERSAL_LANG, SUPPORTED_LANGUAGES } from '../utils/translationUtils';
import { hasSkill } from '../utils/assetsUtils';
import {
  Retex,
  BlogPost,
  BlogCategory,
  CareerEntry,
  CareerEntryType,
  Skill,
  GraphicAsset,
  ProjectMedia,
  Hyperlink,
  LanguageLevel,
  MultilingualContent,
  MultilingualContentArray,
} from './dataTypes';

interface ValidationResult {
  errors: string[];
  errorCount: number;
  warningCount: number;
}

/**
 * @interface ValidationContext
 * @description Accumulator threaded through every validator so errors and warnings
 * are collected in one place instead of being reported ad hoc.
 */
interface ValidationContext {
  errors: string[];
  warnings: string[];
}

/** Slugs must be lowercase ASCII kebab-case: they are used as public URLs. */
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * @function validateMultilingual Validates a multilingual content object.
 * @param content - The multilingual object to check.
 * @param context - Human-readable location, used to prefix messages.
 * @param ctx - The validation accumulator.
 * @param isMandatory - Whether a missing object is an error or silently accepted.
 * @returns Nothing; findings are pushed onto ctx.
 */
const validateMultilingual = (
  content: MultilingualContent | MultilingualContentArray | undefined,
  context: string,
  ctx: ValidationContext,
  isMandatory = true
): void => {
  if (!content) {
    if (isMandatory) ctx.errors.push(`[${context}] Content is missing`);
    return;
  }

  // Must have at least one language or universal key
  const keys = Object.keys(content);
  if (keys.length === 0) {
    ctx.errors.push(`[${context}] Content object is empty`);
    return;
  }

  // Warn if mandatory languages are missing
  if (!keys.includes(UNIVERSAL_LANG)) {
    SUPPORTED_LANGUAGES.forEach(lang => {
      if (!keys.includes(lang)) {
        ctx.warnings.push(`[${context}] Missing translation for language: ${lang}`);
      }
    });
  }

  // An empty string or empty array is as broken as a missing key
  keys.forEach(key => {
    const value = content[key];
    if (Array.isArray(value) ? value.length === 0 : !value?.trim()) {
      ctx.warnings.push(`[${context}] Empty content for key "${key}"`);
    }
  });
};

/**
 * @function validateMedia Validates a project/blog media reference.
 * Raw URL strings are accepted for backward compatibility but warned about,
 * since they carry no alt text.
 * @param media - The media reference to check.
 * @param context - Human-readable location, used to prefix messages.
 * @param ctx - The validation accumulator.
 * @returns Nothing; findings are pushed onto ctx.
 */
const validateMedia = (
  media: string | ProjectMedia | undefined,
  context: string,
  ctx: ValidationContext
): void => {
  if (!media) {
    ctx.errors.push(`[${context}] Media is missing`);
    return;
  }

  if (typeof media === 'string') {
    ctx.warnings.push(`[${context}] Raw URL string used, prefer a ProjectMedia object with an alt`);
    return;
  }

  if (!media.url) ctx.errors.push(`[${context}] Media has no url`);
  if (!media.alt?.trim()) ctx.errors.push(`[${context}] Media has no alt text`);
};

/**
 * @function validateGraphicAsset Validates a themed icon/logo asset.
 * @param asset - The graphic asset to check.
 * @param context - Human-readable location, used to prefix messages.
 * @param ctx - The validation accumulator.
 * @returns Nothing; findings are pushed onto ctx.
 */
const validateGraphicAsset = (
  asset: GraphicAsset | undefined,
  context: string,
  ctx: ValidationContext
): void => {
  if (!asset) {
    ctx.errors.push(`[${context}] Graphic asset is missing`);
    return;
  }

  if (!asset.alt?.trim()) ctx.errors.push(`[${context}] Graphic asset has no alt text`);
  if (!asset.content) {
    ctx.errors.push(`[${context}] Graphic asset has no content`);
    return;
  }

  // Both themes are mandatory: the ThemeEngine looks them up by key
  (['light', 'dark'] as const).forEach(theme => {
    if (!asset.content[theme]) {
      ctx.errors.push(`[${context}] Graphic asset is missing the "${theme}" theme variant`);
    }
  });
};

/**
 * @function validateDate Checks that a value is a usable Date object.
 * @param date - The value to check.
 * @param context - Human-readable location, used to prefix messages.
 * @param ctx - The validation accumulator.
 * @returns Nothing; findings are pushed onto ctx.
 */
const validateDate = (date: Date | undefined, context: string, ctx: ValidationContext): void => {
  if (!date) {
    ctx.errors.push(`[${context}] Missing date`);
  } else if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    ctx.errors.push(`[${context}] Invalid date`);
  }
};

/**
 * @function validateHyperlinks Validates a list of hyperlinks (resources, shared links).
 * @param links - The hyperlinks to check.
 * @param context - Human-readable location, used to prefix messages.
 * @param ctx - The validation accumulator.
 * @returns Nothing; findings are pushed onto ctx.
 */
const validateHyperlinks = (
  links: Hyperlink[] | undefined,
  context: string,
  ctx: ValidationContext
): void => {
  if (!links) return;

  if (!Array.isArray(links)) {
    ctx.errors.push(`[${context}] Hyperlinks must be an array`);
    return;
  }

  links.forEach((link, i) => {
    validateMultilingual(link.content, `${context}[${i}] - content`, ctx);

    if (!link.link) {
      ctx.errors.push(`[${context}][${i}] Missing link`);
    } else if (typeof link.link === 'string' && !link.link.trim()) {
      ctx.errors.push(`[${context}][${i}] Empty link`);
    }

    if (link.prioritized !== undefined && typeof link.prioritized !== 'boolean') {
      ctx.errors.push(`[${context}][${i}] "prioritized" must be a boolean`);
    }
  });
};

/**
 * @function mediaUrl Extracts the URL of a media reference, whatever its shape.
 * @param media - A raw URL string or a ProjectMedia object.
 * @returns The underlying URL string.
 */
const mediaUrl = (media: string | ProjectMedia): string =>
  typeof media === 'string' ? media : media.url;

/**
 * @function validateProjects Validates every entry of the projects (Retex) list.
 * @param ctx - The validation accumulator.
 * @returns Nothing; findings are pushed onto ctx.
 */
const validateProjects = (ctx: ValidationContext): void => {
  const seenTitles = new Set<string>();
  const knownSlugs = new Set(blogPosts.map(post => post.slug));

  projects.forEach((project: Retex) => {
    const projectId = project.title?.[UNIVERSAL_LANG] || project.title?.en || 'Unknown Project';

    // Metadata validation
    validateMultilingual(project.title, `${projectId} - title`, ctx);
    validateMultilingual(project.description, `${projectId} - description`, ctx);
    validateMultilingual(project.tags, `${projectId} - tags`, ctx);
    validateDate(project.date, projectId, ctx);

    // Titles are relational keys: relatedProjects and getRelatedPosts() match on them
    if (seenTitles.has(projectId)) {
      ctx.errors.push(`[${projectId}] Duplicate project title, titles are used as relational keys`);
    }
    seenTitles.add(projectId);

    if (!project.coverImage) {
      ctx.errors.push(`[${projectId}] Missing coverImage`);
    } else {
      validateMedia(project.coverImage, `${projectId} - coverImage`, ctx);
    }

    if (project.favorite !== undefined && typeof project.favorite !== 'boolean') {
      ctx.errors.push(`[${projectId}] "favorite" must be a boolean`);
    }

    // Content validation
    if (!project.content) {
      ctx.errors.push(`[${projectId}] Missing content object`);
      return;
    }

    const { specs, notions, tools, images, additionalRessources, relatedPosts } = project.content;

    validateMultilingual(specs, `${projectId} - specs`, ctx);
    validateMultilingual(notions, `${projectId} - notions`, ctx);

    if (tools && Array.isArray(tools)) {
      tools.forEach((tool, i) => {
        if (!tool || !tool.label) {
          ctx.errors.push(`[${projectId}] Invalid tool at index ${i}`);
        } else if (!hasSkill(tool.label)) {
          ctx.errors.push(`[${projectId}] Skill "${tool.label}" not found in global skills list`);
        }
      });
    } else {
      ctx.errors.push(`[${projectId}] tools must be an array`);
    }

    if (images && Array.isArray(images)) {
      if (images.length === 0) {
        ctx.warnings.push(`[${projectId}] Project has no images`);
      }

      images.forEach((image, i) => validateMedia(image, `${projectId} - images[${i}]`, ctx));

      // The cover is expected to be one of the gallery images
      if (project.coverImage && !images.some(image => mediaUrl(image) === mediaUrl(project.coverImage))) {
        ctx.warnings.push(`[${projectId}] coverImage is not part of content.images`);
      }
    } else {
      ctx.errors.push(`[${projectId}] images must be an array`);
    }

    validateHyperlinks(additionalRessources, `${projectId} - additionalRessources`, ctx);

    relatedPosts?.forEach(slug => {
      if (!knownSlugs.has(slug)) {
        ctx.errors.push(`[${projectId}] relatedPosts references unknown blog slug "${slug}"`);
      }
    });
  });
};

/**
 * @function validateBlogPosts Validates every entry of the blog posts list.
 * @param ctx - The validation accumulator.
 * @returns Nothing; findings are pushed onto ctx.
 */
const validateBlogPosts = (ctx: ValidationContext): void => {
  const seenSlugs = new Set<string>();
  const knownProjectTitles = new Set(
    projects.map(project => project.title?.[UNIVERSAL_LANG] || project.title?.en)
  );
  const categories = Object.values(BlogCategory) as string[];

  blogPosts.forEach((post: BlogPost) => {
    const postId = post.slug || post.title?.[UNIVERSAL_LANG] || 'Unknown Post';

    // The slug is the public URL and the sitemap entry
    if (!post.slug?.trim()) {
      ctx.errors.push(`[${postId}] Missing slug`);
    } else {
      if (seenSlugs.has(post.slug)) {
        ctx.errors.push(`[${postId}] Duplicate slug, slugs must be unique`);
      }
      seenSlugs.add(post.slug);

      if (!SLUG_PATTERN.test(post.slug)) {
        ctx.warnings.push(`[${postId}] Slug is not lowercase ASCII kebab-case`);
      }
    }

    validateMultilingual(post.title, `${postId} - title`, ctx);
    validateMultilingual(post.description, `${postId} - description`, ctx);
    validateMultilingual(post.tags, `${postId} - tags`, ctx);
    validateDate(post.date, postId, ctx);

    if (!post.coverImage) {
      ctx.errors.push(`[${postId}] Missing coverImage`);
    } else {
      validateMedia(post.coverImage, `${postId} - coverImage`, ctx);
    }

    if (!post.category) {
      ctx.errors.push(`[${postId}] Missing category`);
    } else if (!categories.includes(post.category)) {
      ctx.errors.push(`[${postId}] Unknown category "${post.category}"`);
    }

    if (post.readingTime === undefined) {
      ctx.warnings.push(`[${postId}] No readingTime set`);
    } else if (post.readingTime <= 0) {
      ctx.errors.push(`[${postId}] readingTime must be greater than 0`);
    }

    if (!post.paragraphs || !Array.isArray(post.paragraphs)) {
      ctx.errors.push(`[${postId}] paragraphs must be an array`);
    } else if (post.paragraphs.length === 0) {
      ctx.errors.push(`[${postId}] Post has no paragraphs`);
    } else {
      post.paragraphs.forEach((paragraph, i) => {
        validateMultilingual(paragraph.content, `${postId} - paragraphs[${i}] - content`, ctx);
        validateMultilingual(paragraph.title, `${postId} - paragraphs[${i}] - title`, ctx, false);
      });
    }

    post.img?.forEach((image, i) => validateMedia(image, `${postId} - img[${i}]`, ctx));

    post.relatedProjects?.forEach(title => {
      if (!knownProjectTitles.has(title)) {
        ctx.errors.push(`[${postId}] relatedProjects references unknown project "${title}"`);
      }
    });
  });
};

/**
 * @function validateSkills Validates the global skills list and its icons.
 * @param ctx - The validation accumulator.
 * @returns Nothing; findings are pushed onto ctx.
 */
const validateSkills = (ctx: ValidationContext): void => {
  const seenLabels = new Set<string>();
  const seenLowercaseLabels = new Set<string>();
  const knownLabels = new Set(skills.map(skill => skill.label));

  skills.forEach((skill: Skill, index: number) => {
    const skillId = skill.label || `skills[${index}]`;

    if (!skill.label?.trim()) {
      ctx.errors.push(`[${skillId}] Missing label`);
    } else {
      if (seenLabels.has(skill.label)) {
        ctx.errors.push(`[${skillId}] Duplicate skill label, labels are used as lookup keys`);
      } else if (seenLowercaseLabels.has(skill.label.toLowerCase())) {
        ctx.warnings.push(`[${skillId}] Another skill differs only by case, getSkill() is case-sensitive`);
      }
      seenLabels.add(skill.label);
      seenLowercaseLabels.add(skill.label.toLowerCase());
    }

    validateGraphicAsset(skill.icon, `${skillId} - icon`, ctx);

    // skills.ts resolves categories with `.find(...)!`, which yields undefined silently
    if (!skill.category) {
      ctx.errors.push(`[${skillId}] Category could not be resolved, check the context value`);
    } else {
      validateMultilingual(skill.category.content, `${skillId} - category`, ctx);
    }

    if (skill.subcategory) {
      validateMultilingual(skill.subcategory.content, `${skillId} - subcategory`, ctx);

      // parentCategory is declarative metadata that no component reads today, and a
      // subcategory can legitimately span categories (BIGDATA covers both the SQL
      // language and the Pandas library), so this is informational only.
      if (skill.category && skill.subcategory.parentCategory !== skill.category.context) {
        ctx.warnings.push(
          `[${skillId}] Subcategory "${skill.subcategory.context}" declares parentCategory "${skill.subcategory.parentCategory}" but the skill is "${skill.category.context}"`
        );
      }
    }

    if (skill.framework && !knownLabels.has(skill.framework)) {
      ctx.errors.push(`[${skillId}] framework "${skill.framework}" is not a known skill label`);
    }

    if (skill.weight !== undefined && (skill.weight < 0 || skill.weight > 10)) {
      ctx.errors.push(`[${skillId}] weight must be between 0 and 10, got ${skill.weight}`);
    }

    if (skill.link !== undefined && !skill.link.trim()) {
      ctx.errors.push(`[${skillId}] Empty link`);
    }
  });
};

/**
 * @function validateCareer Validates the career timeline entries.
 * @param ctx - The validation accumulator.
 * @returns Nothing; findings are pushed onto ctx.
 */
const validateCareer = (ctx: ValidationContext): void => {
  const types = Object.values(CareerEntryType) as string[];

  careerTimeline.forEach((entry: CareerEntry, index: number) => {
    const entryId = entry.title?.[UNIVERSAL_LANG] || entry.title?.fr || `careerTimeline[${index}]`;

    if (!entry.type) {
      ctx.errors.push(`[${entryId}] Missing career entry type`);
    } else if (!types.includes(entry.type)) {
      ctx.errors.push(`[${entryId}] Unknown career entry type "${entry.type}"`);
    }

    validateMultilingual(entry.title, `${entryId} - title`, ctx);
    validateMultilingual(entry.organization, `${entryId} - organization`, ctx);
    validateMultilingual(entry.period, `${entryId} - period`, ctx);
    validateMultilingual(entry.description, `${entryId} - description`, ctx);
    validateMultilingual(entry.tags, `${entryId} - tags`, ctx, false);

    if (entry.icon) validateGraphicAsset(entry.icon, `${entryId} - icon`, ctx);

    validateHyperlinks(entry.ressources, `${entryId} - ressources`, ctx);
  });
};

/**
 * @function isLanguageLevelList Narrows an about widget content to a spoken-languages list.
 * @param content - The widget content to inspect.
 * @returns True when the content is a LanguageLevel array.
 */
const isLanguageLevelList = (
  content: MultilingualContent | MultilingualContentArray | LanguageLevel[]
): content is LanguageLevel[] => Array.isArray(content);

/**
 * @function validateMisc Validates biography, about widgets, shared links and footer columns.
 * @param ctx - The validation accumulator.
 * @returns Nothing; findings are pushed onto ctx.
 */
const validateMisc = (ctx: ValidationContext): void => {
  // Biography: the Hero section renders the active entry, so exactly one is expected
  const activeBios = bioText.filter(bio => bio.active);
  if (activeBios.length === 0) {
    ctx.errors.push('[bioText] No active biography, nothing will be rendered');
  } else if (activeBios.length > 1) {
    ctx.warnings.push(`[bioText] ${activeBios.length} active biographies, only one is displayed`);
  }

  bioText.forEach((bio, index) => {
    validateMultilingual(bio.title, `bioText[${index}] - title`, ctx);
    validateMultilingual(bio.content, `bioText[${index}] - content`, ctx);
  });

  // About widgets: ids are used as React keys and lookup handles
  const seenWidgetIds = new Set<string>();
  aboutWidgets.forEach((widget, index) => {
    const widgetId = widget.id || `aboutWidgets[${index}]`;

    if (!widget.id?.trim()) {
      ctx.errors.push(`[${widgetId}] Missing id`);
    } else if (seenWidgetIds.has(widget.id)) {
      ctx.errors.push(`[${widgetId}] Duplicate widget id`);
    }
    seenWidgetIds.add(widget.id);

    validateMultilingual(widget.title, `${widgetId} - title`, ctx);

    if (!widget.content) {
      ctx.errors.push(`[${widgetId}] Missing content`);
    } else if (isLanguageLevelList(widget.content)) {
      if (widget.content.length === 0) {
        ctx.errors.push(`[${widgetId}] Empty language list`);
      }
      widget.content.forEach((language, i) => {
        validateMultilingual(language.label, `${widgetId} - content[${i}] - label`, ctx);
        validateMultilingual(language.level, `${widgetId} - content[${i}] - level`, ctx);
      });
    } else {
      validateMultilingual(widget.content, `${widgetId} - content`, ctx);
    }
  });

  validateHyperlinks(sharedLinks, 'sharedLinks', ctx);

  // Footer columns: context is the discriminator used by Footer.tsx
  const seenContexts = new Set<string>();
  footerColumns.forEach((column, index) => {
    const columnId = column.context || `footerColumns[${index}]`;

    validateMultilingual(column.title, `${columnId} - title`, ctx);

    if (!column.context?.trim()) {
      ctx.errors.push(`[${columnId}] Missing context`);
    } else if (seenContexts.has(column.context)) {
      ctx.errors.push(`[${columnId}] Duplicate footer column context`);
    }
    seenContexts.add(column.context);

    if (!Array.isArray(column.content) || column.content.length === 0) {
      ctx.errors.push(`[${columnId}] Footer column has no content`);
    }
  });
};

/**
 * @function validateData Runs every validator and reports the aggregated result.
 * @returns The list of blocking errors, plus error and warning counts.
 */
export const validateData = (): ValidationResult => {
  const ctx: ValidationContext = { errors: [], warnings: [] };

  validateProjects(ctx);
  validateBlogPosts(ctx);
  validateSkills(ctx);
  validateCareer(ctx);
  validateMisc(ctx);

  const errorCount = ctx.errors.length;
  const warningCount = ctx.warnings.length;

  if (import.meta.env.DEV) {
    if (warningCount > 0) {
      console.group(`⚠️ Data Consistency Warnings (${warningCount})`);
      ctx.warnings.forEach(warning => console.warn(warning));
      console.groupEnd();
    }

    if (errorCount > 0) {
      console.group(`❌ Data Consistency Errors (${errorCount})`);
      ctx.errors.forEach(err => console.error(err));
      console.groupEnd();
      console.error('⚠️ Please fix errors before deploying to production.');
    } else {
      console.log('✅ Data consistency check passed');
    }
  }

  return { errors: ctx.errors, errorCount, warningCount };
};

// Auto-run validation in development mode (skipped under SSR: the headless
// runner in scripts/validate-data.js calls validateData() explicitly).
if (import.meta.env.DEV && !import.meta.env.SSR) {
  validateData();
}
