# Project Memory

## Build Error Patterns

### TS7053 - String indexing on literal object types
Objects like `{ fr: string; en: string }` cannot be indexed by a `string` variable (`currentLang`).
**Fix**: Explicitly type with index signature `{[lang: string]: string}` in the declaration.
Affected files: `contents.ts` (aboutSection, careerPageContent, aboutLanguages, aboutLocation).

### TS2722 - Possibly undefined invocation
When accessing a `Partial<Record<...>>` value and calling it, extract into a typed variable first.
Example in `RetexGalleryViewer.tsx`: `const handler = actionHandlers[action]; if (handler) handler();`

### TS6133 - Unused imports/variables
Strict mode catches unused imports. Common in `utils.ts` and demo pages like `GlitchDemo.tsx`.

## Key Type Files
- `src/assets/dataTypes.ts` - All interfaces and enums
- `src/assets/i18n.ts` - `UNIVERSAL_LANG = "0"`, `getContent()`, `t()` helpers
- `src/assets/constants.ts` - Typed constants (galleryControls, sortOptions, etc.)
- `src/assets/contents.ts` - Multilingual content data

## Multilingual Pattern
Content objects use `{[lang: string]: string}` pattern. Access via `obj[currentLang]`.
Universal content uses key `"0"` (UNIVERSAL_LANG constant from i18n.ts).

## Formatting Conventions (from user directives)
- Props separated by newlines
- className always uses template literals `{\`...\`}` with classes on separate lines
- Inline children on same line as closing `>` if short
- id prop describes role/nature (no comments needed)
- `styles.tsx` and `index.css` centralize reusable styles
