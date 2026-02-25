# clembarr.dev

Ce document répertorie des informations sur ce projet VITE/React/TypeScript/TailwindCSS4.

## Structure du Projet

```
src/
├── assets/                   # Données, types, constantes et assets
│   ├── constants.ts          # Données constantes de l'application
│   ├── contents.ts           # Contenus relatifs multilingues
│   ├── dataTypes.ts          # Types TypeScript (inclut types Blog)
│   ├── dataConsistency.ts    # Tests de cohérence des données
│   ├── documents/            # Documents téléchargeables
│   ├── illustrations/        # Illustrations diverses
│   ├── menu_icons/           # Icônes de menu
│   ├── projects_images/      # Images de projets
│   ├── skills_icons/         # Icônes de compétences
│   └── socials_icons/        # Icônes de réseaux sociaux
├── components/               # Composants réutilisables (organisés par fonctionnalité)
│   ├── animations/           # Composants d'animation (NEW)
│   │   ├── ScrollReveal.tsx     # Animations au scroll
│   │   ├── PageTransition.tsx   # Transitions entre pages
│   │   ├── FadeIn.tsx          # Fade-in effect
│   │   ├── StaggerContainer.tsx # Container pour animations séquentielles
│   │   ├── AnimatedButton.tsx   # Boutons animés
│   │   ├── AnimatedLink.tsx     # Liens animés
│   │   └── index.ts            # Barrel exports
│   ├── blog/                 # Composants de blog (NEW)
│   │   ├── BlogCard.tsx        # Card de preview d'article
│   │   ├── ArticleLayout.tsx   # Layout pour articles
│   │   ├── TableOfContents.tsx # TOC auto-généré
│   │   └── index.ts            # Barrel exports
│   ├── cards/                # Template de cartes
│   │   ├── Card.tsx             # Carte générique (with Framer Motion)
│   │   ├── ProjectCard.tsx      # Carte de projet détaillée
│   │   ├── ProjectPreview.tsx   # Carte de preview de projet
│   │   └── index.ts             # Barrel exports
│   ├── contact/              # Formulaire de contact
│   │   ├── ContactForm.tsx      # Formulaire (honeypot, validation, confetti)
│   │   ├── SubmitEngine.tsx     # Moteur de soumission (context, EmailJS)
│   │   └── index.ts             # Barrel exports
│   ├── dropdowns/            # Menus déroulants
│   │   ├── DropdownLang.tsx     # Menu déroulant sélecteur de langue
│   │   ├── Dropdown.tsx         # Menu déroulant générique
│   │   ├── DropdownPhone.tsx    # Menu déroulant sélecteur de numéro de téléphone
│   │   ├── DropdownSort.tsx     # Menu déroulant sélecteur de critère de tri des projets
│   │   └── index.ts             # Barrel exports
│   ├── effects/              # Effets visuels (NEW)
│   │   └── Confetti.tsx        # Système de particules confetti
│   ├── flashs/               # Messages flash/notifications
│   │   ├── FlashMessage.tsx      # Composant de message flash
│   │   ├── FlashsEngine.tsx      # Moteur de gestion (contexte)
│   │   └── index.ts              # Barrel exports
│   ├── language/             # Gestion de la langue
│   │   ├── LangEngine.tsx        # Moteur de gestion (contexte)
│   │   └── index.ts              # Barrel exports
│   ├── retex/                # Affichage de retours d'expérience liés aux projets
│   │   ├── RetexDisplayEngine.tsx   # Moteur de gestion de l'affichage (contexte)
│   │   ├── RetexGalleryViewer.tsx   # Galerie avec zoom & keyboard nav (ENHANCED)
│   │   ├── RetexHeader.tsx          # Composant d'en-tête de retex
│   │   ├── RetexViewer.tsx          # Composant de retex
│   │   └── index.ts                 # Barrel exports
│   ├── search/               # Gestion de la recherche et de l'affichage des projets
│   │   ├── SearchEngine.tsx      # Moteur de recherche (contexte)
│   │   ├── Sortingbar.tsx        # Composant de tri des projets par tags/critères
│   │   ├── Searchbar.tsx         # Barre de recherche des projets
│   │   └── index.ts              # Barrel exports
│   ├── sections/
│   │   ├── About.tsx          # Section "À propos"
│   │   ├── Contact.tsx        # Section "Contact"
│   │   ├── Hero.tsx           # Section "Hero"
│   │   ├── ProjectsListing.tsx  # Section liste de projets (page Projets)
│   │   ├── ProjectsSlider.tsx   # Section "Pile de cartes de projets défilantes" (lazy loaded)
│   │   └── index.ts           # Barrel exports
│   ├── seo/                  # Composants SEO (NEW)
│   │   ├── StructuredData.tsx  # JSON-LD structured data
│   │   ├── MetaTags.tsx        # Dynamic meta tags
│   │   └── index.ts            # Barrel exports
│   ├── share/                # Composants de partage (NEW)
│   │   └── ShareButton.tsx     # Web Share API + clipboard fallback
│   ├── theme/
│   │   ├── SwitchButton.tsx     # Commutateur de thème clair/sombre
│   │   ├── ThemeEngine.tsx      # Moteur de gestion du thème (contexte)
│   │   └── index.ts             # Barrel exports
│   ├── Navbar.tsx        # Barre de navigation
│   ├── Footer.tsx       # Pied de page
│   └── index.ts        # Barrel exports
├── content/            # Contenu Markdown (NEW)
│   └── blog/          # Articles de blog en Markdown
│       └── *.md       # Articles avec frontmatter
├── pages/              # Composants de page
│   ├── Home.tsx        # Page d'accueil (with lazy loading)
│   ├── Projects.tsx    # Page des projets
│   ├── ProjectDetail.tsx # Détails d'un projet (NEW)
│   ├── Blog.tsx        # Page listing blog (NEW)
│   ├── BlogPost.tsx    # Page article individuel (NEW)
│   ├── Offline.tsx     # Page PWA offline fallback (NEW)
│   ├── Err404.tsx      # Page d'erreur 404
│   └── index.tsx      # Barrel exports
├── utils/             # Utilitaires
│   ├── utils.ts          # Fonctions utilitaires générales
│   ├── markdown.ts       # Parser Markdown (remark + rehype) (NEW)
│   └── blogLoader.ts     # Loader de posts blog (NEW)
├── Layout.tsx          # Layout principal (with SEO components)
├── main.tsx            # Point d'entrée (with PWA registration)
├── style.tsx           # Classes Tailwind centralisées
├── index.css           # CSS global + thèmes
├── print.css           # Styles pour impression (NEW)
└── vite-env.d.ts       # Types Vite + PWA (NEW)

scripts/                # Scripts de build et déploiement (NEW)
├── generate-sitemap.js  # Générateur de sitemap.xml
└── deploy.sh            # Script de déploiement complet

public/                 # Assets statiques
├── robots.txt          # Configuration SEO robots (NEW)
├── sitemap.xml         # Sitemap généré (NEW)
└── manifest.webmanifest # PWA manifest (NEW)
```

## Nouvelles Fonctionnalités (Phases 5-10)

### Phase 5: Animations & Transitions (Framer Motion)
- **ScrollReveal**: Composant pour animations au scroll avec Intersection Observer
- **PageTransition**: Transitions fluides entre pages avec AnimatePresence
- **Motion components**: Cards, boutons et liens animés avec hover effects
- **Spring physics**: Animations naturelles avec easing personnalisés
- **prefers-reduced-motion**: Support accessibilité pour animations réduites

### Phase 6: Retex Viewer Enhanced
- **Deep linking**: Routes individuelles `/projects/:projectSlug`
- **Zoom & Pan**: Galerie d'images avec zoom 1x-3x et drag to pan
- **Keyboard navigation**: Touches fléchées, +/-, 0 pour reset
- **ShareButton**: Web Share API natif avec fallback clipboard
- **Print optimization**: CSS print stylesheet pour export PDF

### Phase 7: Contact Form Improvements
- **Honeypot field**: Détection de bots invisible
- **Real-time validation**: Validation debounced (500ms) avec feedback
- **Auto-save draft**: Sauvegarde automatique dans localStorage (1s)
- **Send copy checkbox**: Option d'envoi d'une copie à soi-même
- **Confetti effect**: Animation de particules au succès
- **Enhanced ARIA**: Attributs d'accessibilité complets

### Phase 8: Performance & PWA
- **Code splitting**: Vendor chunks (react, three, animation, utils)
- **Lazy loading**: ProjectsSlider avec React.lazy() et Suspense
- **PWA manifest**: Configuration avec icônes et theme colors
- **Service Worker**: Workbox avec stratégies de cache
  - CacheFirst pour images (30 jours, max 50 entries)
  - CacheFirst pour Google Fonts (1 an)
  - Precache des assets critiques (JS, CSS, HTML)
- **Offline fallback**: Page dédiée quand hors ligne
- **Bundle optimization**: Main bundle réduit de 81% (176 KB gzipped)

### Phase 9: Blog System
- **Markdown parsing**: remark + rehype avec syntax highlighting
- **Frontmatter support**: gray-matter pour métadonnées
- **Table of Contents**: Auto-générée depuis headings avec navigation
- **Blog components**:
  - BlogCard: Preview avec cover image, catégorie, tags, temps de lecture
  - ArticleLayout: Layout complet avec TOC sidebar, related posts
  - TableOfContents: Sticky sidebar avec section active tracking
- **Search & Filter**: Recherche temps réel + filtres par catégorie
- **Related posts**: Algorithm basé sur catégorie, tags et récence
- **Reading time**: Calcul automatique (200 mots/minute)
- **Multilingual ready**: Structure pour support multilingue

### Phase 10: SEO & Deployment
- **robots.txt**: Configuration SEO pour crawlers
- **sitemap.xml**: Génération automatique avec toutes les pages
- **Structured data (JSON-LD)**:
  - Schema.org Person pour portfolio
  - WebSite schema
  - Blog schema
  - BlogPosting schema pour articles individuels
  - CreativeWork schema pour projets
- **Meta tags dynamiques**:
  - Title, description, keywords par page
  - Open Graph tags pour social sharing
  - Twitter Card tags
  - Canonical URLs
- **Deployment scripts**:
  - `npm run sitemap`: Génère sitemap.xml
  - `npm run deploy`: Deploy via gh-pages
  - `npm run deploy:full`: Script bash complet avec checks

## Conventions de Nommage

### Fichiers
- **Composants** : PascalCase (ex: `Navbar.tsx`, `Card.tsx`)
- **Utilitaires/données** : camelCase (ex: `utils.ts`, `constants.ts`)

### Variables
```typescript
// Booléens : préfixes toggle/is/can
const [toggleBurger, setToggleBurger] = useState(true);
const canSubmit = useContext(SubmitContext).canSubmit;

// Variables d'état : descriptives
const [currentNavigation, setCurrentNavigation] = useState(getCurrentNavigation());
const [displayedTags, setDisplayedTags] = useState<string[]>(tags.slice(0, 3));
const [formFistName, setFormFirstName] = useState<string>('');

// Constantes : UPPER_SNAKE_CASE
export const CARD_TEXT_MAX_LINES = 5;

// Types/Interfaces : PascalCase
export interface GraphicAsset { ... }
```

### Fonctions
```typescript
// Fonctions utilitaires : verbes ou orientées action
export const getCurrentNavigation = () => { ... }
export const getLocalTheme = () => { ... }
export const isOverflowing = (element: HTMLElement) => { ... }
export const truncateTextIfOverflow = () => { ... }

// Composants : PascalCase
const Card = ({ ... }) => { ... }
const Navbar = () => { ... }
```

## Structure des Composants

**Patron standard de composant fonctionnel :**

```typescript
// 1. Imports (ordre : React → libs tierces → imports locaux)
import { useContext, useEffect, useRef, useState } from "react";
import DOMPurify from 'dompurify';
import { Link } from "react-router";
import styles from "../style";
import { navLinks } from "../assets/constants";
import { LangContext } from "./language";

// 2. Définition des Props (interface/type avant le composant)
type ComponentProps = {
    prop1: string;
    prop2: string;
    optionalProp?: string;
}

// 3. Composant
/**
 * @description Description du composant
 */
const ComponentName = ({ prop1, prop2 }: ComponentProps) => {
  // 4. Hooks en premier
  const [state, setState] = useState<Type>(initialValue);
  const { contextValue } = useContext(SomeContext);
  const ref = useRef<HTMLElement>(null);

  // 5. Effects groupés après les hooks
  useEffect(() => {
    // Side effects
  }, [dependencies]);

  // 6. Event handlers
  const handleEvent = () => { ... };

  // 7. JSX return
  return (
    <div id="component-id" className={`classes`}>
      {/* Content */}
    </div>
  );
};

export default ComponentName;
```

## TypeScript

### Configuration stricte
```json
{
  "strict": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "noFallthroughCasesInSwitch": true
}
```

### Patterns TypeScript

**Enums pour les valeurs type-safe :**
```typescript
export enum AvailableSkillCategories {
  LANGUAGE = "LANGUAGE",
  TOOL = "TOOL",
  LIBRARY = "LIBRARY",
}

export enum Errors {
  NOT_FOUND = 404,
}
```

**Interfaces avec JSDoc :**
```typescript
/**
 * Available information for a graphic asset.
 * @param label - name of the graphic asset
 * @param content - content with light and dark versions
 * @param alt - alternative text
 */
export interface GraphicAsset {
  label: string;
  content: {[theme: string]: string};
  alt: string;
}

/**
 * Structure of a project overview
 */
export interface Project {
  title: {[lang: string]: string};
  description: {[lang: string]: string};
  tags: {[lang: string]: string[]};
  img?: string[];
  date: Date;
}
```

**Composition d'interfaces :**
```typescript
// Utiliser Omit pour composer
export interface SkillCategorie extends Omit<Message, "context"> {
  context: AvailableSkillCategories;
}
```

**Union types pour les paramètres :**
```typescript
export const getRGBAThemeColor = (
    CSSVarName: "--color-primary"
    | "--color-secondary"
    | "--color-tertiary"
    | "--color-quaternary"
    | "--color-quinary",
    alpha?: number
) => { ... }
```

## Styling (Tailwind CSS v4)

### Système de thèmes

**Thème défini dans `index.css` :**
```css
.light {
  --color-primary: #f4f4f4;
  --color-secondary: #f1f1f1;
  --color-tertiary: #479561;
  --color-quaternary: #3D3E3C;
  --color-quinary: #4F4F4F;
  --color-mobile-navbar: rgba(244, 244, 244, 0.9);
  --color-layout-bg: rgba(244, 244, 244, 0.9);
  --background-image: url('./assets/illustrations/background_landscape_light.webp');
}

.dark {
  --color-primary: #2F2F2F;
  --color-secondary: #282929;
  --color-tertiary: #7CFFC4;
  --color-quaternary: #71cbb3;
  --color-quinary: #3c3c3c;
  /* ... */
}
```

### Notation dans les balises
```tsx
<div className="
  text-(--color-quaternary) 
  bg-(--color-primary)"
> {/* One line content */} </div>
/*OR*/
<div
  className={`
    ${styles.flexCol}
    ${styles.sizeFull}
    ${moreTopClasses}
  `}
> 
  {/* Multi-line content */}
</div>
```

### Configuration Tailwind personnalisée

**Dans `index.css` :**
```css
@theme {
  /* Familles de polices */
  --font-montserrat: "Montserrat", sans-serif;
  --font-hind_vadodara: "Hind Vadodara", sans-serif;
  --font-kanit: "Kanit", sans-serif;

  /* Tailles de texte en pourcentages */
  --text-3xs: 60%;
  --text-2xs: 80%;
  --text-xs: 90%;
  /* ... jusqu'à 320% */

  /* Breakpoints personnalisés */
  --breakpoint-xs: 400px;
  --breakpoint-ss: 500px;
  /* ... */

  /* Breakpoints basés sur la hauteur */
  --breakpoint-hxs: 720px;
  --breakpoint-hsm: 850px;
  /* ... */
}
```

### Classes de polices personnalisées
```css
.font-primary-extralight { font-weight: 100; }
.font-primary-light { font-weight: 200; }
.font-primary-regular { font-weight: 350; }
.font-primary-semibold { font-weight: 600; }
.font-primary-bold { font-weight: 800; }

.font-secondary-light { font-weight: 300; }
.font-secondary-regular { font-weight: 400; }
.font-secondary-semibold { font-weight: 600; }

.font-tertiary-light { font-weight: 200; }
.font-tertiary-regular { font-weight: 300; }
.font-tertiary-semibold { font-weight: 400; }
```

### Centralisation des styles (`style.tsx`)

**Pattern de chaînes de style centralisées :**
```typescript
const styles = {
  page: `
    w-full
    h-full
    text-(--color-quaternary)
    bg-transparent
  `,

  heading2: `
    font-primary-bold
    2xl:text-3xl xl:text-2xl lg:text-xl md:text-xl text-md
    xl:leading-8 base:leading-6
    w-full
    tracking-wider
    xl:mb-9 lg:mb-6 mb-4
  `,

  // Utilitaires flexbox
  flexCol: `flex flex-col`,
  flexRow: `flex flex-row`,
  contentCenter: `justify-center items-center`,

  // Utilitaires de taille
  sizeFull: `w-full h-full`,
  sizeScreen: `h-screen w-auto`,
};
```

**Usage dans les composants :**
```typescript
// Template strings avec classes dynamiques
className={`
  ${styles.flexCol}
  ${styles.sizeFull}
  ${moreTopClasses}
`}

// Classes conditionnelles
className={`
  z-50
  top-0
  w-full
  ${getActiveBreakpoint('number') as number <= 1 ?
    "bg-(--color-layout-bg)" : "bg-(--color-secondary)"
  }
`}

// Styles inline pour valeurs dynamiques
style={{
  minHeight: "calc(100vh - 120px)",
  animation: 'burger-menu-apparition 0.5s ease-in-out'
}}
```

### Breakpoints responsifs
```
Largeur :
- base: 0px
- xs: 400px
- ss: 500px
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

Hauteur :
- hbase: 0px
- hxs: 720px
- hsm: 850px
- hmd: 1080px
- hlg: 1280px
- hxl: 1440px
- h2xl: 2160px
```

## Documentation

### JSDoc pour les fonctions
Documentation must be comprehensive and allow deep understanding of the logic, more than just superficial descriptions.

```typescript
/**
 * @function randomNumberBetween Get a random number between min and max
 * @param min from this number
 * @param max to this number (included)
 * @returns a number
 */
export const randomNumberBetween = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * @function getActiveBreakpoint compare the current screen width with the custom
 * breakpoints in the tailwindcss config file.
 * @param returnType the type of the return value: 'string' or 'number'
 * @returns the active breakpoint.
 */
export const getActiveBreakpoint = (returnType: "string" | "number") => { ... }
```

### Documentation des composants

```typescript
/**
* @description This component renders the navigation bar of the website,
* from the info in the constants file.
*/
const Navbar = () => {
  /**@constant toggleBurger true if the burger menu is clicked, else false.*/
  const [toggleBurger, setToggleBurger] = useState(true);

  /**@constant currentNavigation the current navigation, used to colorize
   * the related label in the navbar. */
  const [currentNavigation, setCurrentNavigation] = useState(getCurrentNavigation());

  /** If rather the currently used language or the current navigation link changed,
   * actualize the current navigation label in the navbar.*/
  useEffect(() => { ... }, []);
```

### Documentation des interfaces

```typescript
/**
 * Available information for a graphic asset.
 * @param label - name of the graphic asset
 * @param content - content with light and dark versions
 * @param alt - alternative text
 */
export interface GraphicAsset {
  label: string;
  content: {[theme: string]: string};
  alt: string;
}
```

### Commentaires inline

```typescript
// Pour les explications de logique complexe
/** If the navigation link is an anchor on the page, it become an <a>.
 * Else if it is supposed to redirect on another page, it become a React <Link>. */
nav.link.includes('#') ?
  <a href={nav.link}> {thisNav} </a>
  :
  <Link to={nav.link}> {thisNav} </Link>
```

## Gestion d'État

### Pattern Context (State global)

```typescript
// Définition du contexte
interface ThemeContextType {
    currentTheme: string;
    setCurrentTheme: React.Dispatch<React.SetStateAction<string>>;
}

const ThemeContext = createContext<ThemeContextType>({
    currentTheme: "",
    setCurrentTheme: () => {},
});

// Provider
const ThemeEngine = ({ children }: { children: ReactNode }) => {
    const [currentTheme, setCurrentTheme] = useState<string>(getLocalTheme());

    useEffect(() => {
        // Logique pour appliquer le thème
    }, [currentTheme]);

    return (
        <ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeEngine, ThemeContext };
```

### Structure du point d'entrée (main.tsx)

```typescript
// Providers de contexte imbriqués pour l'état global
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <LangEngine>
      <ThemeEngine>
        <FlashsEngine>
          <RetexDisplayEngine>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/*" element={<Err404 />} />
                </Routes>
            </Layout>
          </RetexDisplayEngine>
        </FlashsEngine>
      </ThemeEngine>
    </LangEngine>
  </BrowserRouter>,
)
```

**Contextes multiples pour différentes préoccupations :**
- Theme (thème clair/sombre)
- Language (internationalisation)
- Flash messages (notifications)
- Search/Display (état UI)
- État persisté dans localStorage quand approprié

## Catégories de Fonctions Utilitaires

- **Navigation** : `getCurrentNavigation()`, `getNavbarOffset()`
- **Thème** : `getLocalTheme()`, `getRGBAThemeColor()`
- **Manipulation DOM** : `truncateTextIfOverflow()`, `isOverflowing()`
- **Couleurs** : `darkenHexColor()`, `lightenHexColor()`
- **Responsive** : `getActiveBreakpoint()`
- **Tailles de police** : `adjustFontSize()`, `minimizeFontSize()`

## Bibliothèques Tierces

- **EmailJS** : soumission de formulaire de contact
- **DOMPurify** : prévention XSS
- **React Router v7** : routing
- **Vite** : outil de build
- **Tailwind CSS v4** : styling

## Sécurité

- **Sanitisation XSS** : utilisation de DOMPurify pour le contenu utilisateur
- **TypeScript strict** : prévention des erreurs à la compilation
- **Validation** : validation des entrées formulaire

## Performance

- **Fonctions utilitaires** : pour éviter la duplication de logique
- **Manipulation DOM optimisée** : utilisation de refs et mesures directes
- **Lazy loading** : chargement différé des assets quand nécessaire
- **Responsive images** : utilisation de WebP

## Accessibilité

- HTML sémantique
- Attributs ARIA quand approprié
- Support navigation clavier
- Contraste de couleurs approprié (défini dans les thèmes)
