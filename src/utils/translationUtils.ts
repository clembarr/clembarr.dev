/**
 * @fileoverview Translation core constants and types
 * Independent from assets to prevent circular dependencies.
 */

/**
 * Language code for universal/language-agnostic content.
 * Used when content is the same across all languages (e.g., "React", "CV", "Blog")
 */
export const UNIVERSAL_LANG = "0";

/**
 * Supported language codes for the application
 */
export const SUPPORTED_LANGUAGES = ["fr", "en"] as const;

/**
 * Type for supported language codes
 */
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

/**
 * Type for multilingual content objects
 * Maps language codes to their content strings
 */
export type MultilingualContent = { [key: string]: string };
export type MultilingualContentArray = { [key: string]: string[] };

/**
 * @function getContent Safely retrieve content in the specified language with fallback logic.
 * Falls back to UNIVERSAL_LANG, then the optional fallback string, then the first available value.
 * @param content - Multilingual content object keyed by language code.
 * @param lang - Language code to retrieve.
 * @param fallback - Optional fallback string if no content is found.
 * @returns The resolved content string, or an empty string if nothing is found.
 */
export const getContent = (
  content: MultilingualContent | undefined,
  lang: string,
  fallback?: string
): string => {
  if (!content) return fallback || "";

  return (
    content[lang] ||
    content[UNIVERSAL_LANG] ||
    fallback ||
    Object.values(content)[0] ||
    ""
  );
};

/**
 * @function translate Alias for getContent. Retrieves localized content from a
 * multilingual object with fallback logic.
 */
export const translate = getContent;

/**
 * @function tCustom Create a translation function bound to a specific language,
 * returning a reusable `t(content, fallback?)` helper for that language.
 * @param lang - Language code to bind.
 * @returns A translation function pre-bound to the given language.
 */
export const tCustom = (lang: string) => {
  return (content: MultilingualContent | undefined, fallback?: string) =>
    getContent(content, lang, fallback);
};
