/**
 * @fileoverview Internationalization constants and utilities
 * Provides constants for language management and helper functions for multilingual content access
 */

/**
 * Language code for universal/language-agnostic content.
 * Used when content is the same across all languages (e.g., "React", "CV", "Blog")
 *
 * @constant {string}
 */
export const UNIVERSAL_LANG = "0";

/**
 * Supported language codes for the application
 *
 * @constant {ReadonlyArray<string>}
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
export type MultilingualContent = { [key: string]: string | undefined };

/**
 * Safely retrieve content in the specified language with fallback logic.
 *
 * Fallback order:
 * 1. Exact language match (lang parameter)
 * 2. Universal language (UNIVERSAL_LANG)
 * 3. Custom fallback (fallback parameter)
 * 4. First available language
 * 5. Empty string
 *
 * @function getContent
 * @param content - The multilingual content object
 * @param lang - The desired language code (e.g., "fr", "en")
 * @param fallback - Optional fallback string if no content found
 * @returns The content in the requested language or fallback
 *
 * @example
 * const title = { fr: "Bonjour", en: "Hello" };
 * getContent(title, "fr"); // "Bonjour"
 * getContent(title, "de", "Hi"); // "Hi" (fallback)
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
 * Simple translation function - alias for getContent.
 * Provides a shorter, more familiar name for content retrieval.
 *
 * @function t
 * @param content - The multilingual content object
 * @param lang - The desired language code
 * @param fallback - Optional fallback string
 * @returns The content in the requested language or fallback
 *
 * @example
 * const { currentLang } = useContext(LangContext);
 * <h1>{t(project.title, currentLang)}</h1>
 */
export const t = getContent;

/**
 * Create a translation function bound to a specific language.
 * Useful for binding to the current language in a component.
 *
 * @function tCustom
 * @param lang - The language to bind to
 * @returns A function that translates content to the bound language
 *
 * @example
 * const { currentLang } = useContext(LangContext);
 * const tLang = tCustom(currentLang);
 * return (
 *   <div>
 *     <h1>{tLang(project.title)}</h1>
 *     <p>{tLang(project.description)}</p>
 *   </div>
 * );
 */
export const tCustom = (lang: string) => {
  return (content: MultilingualContent | undefined, fallback?: string) =>
    getContent(content, lang, fallback);
};
