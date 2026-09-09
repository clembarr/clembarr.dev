# Styles, thème et responsive

Dictionnaire de classes : `src/style.tsx` — un objet TS de chaînes Tailwind
Configuration Tailwind : `src/index.css` — **il n'y a pas de `tailwind.config.js`**
Impression : `src/print.css` — articles de blog
Thème : `src/components/theme/ThemeEngine.tsx` — classe `light`/`dark` sur `<html>`

Tailwind v4 se configure en CSS. Chercher ou créer un `tailwind.config.js` est une perte de
temps : tout est dans `src/index.css`.

## L'ordre dans lequel chercher

1. **`src/style.tsx`** — une classe réutilisable y existe peut-être déjà :
   `page`, `sectionContainer`, `heading2`, `line`, `subtitle`, `paragraph`, `hyperlink`,
   `card`, `cardElevated`, `input`, `tag`, `animatedLink`, `divider`, `glass`, `glassCard`,
   `glassNav`, `glassModal`, `heroHeading`, `gradientText`, `widgetCard`,
   `buttonBase`/`buttonPrimary`/`buttonSecondary`/`buttonGhost`, toute la famille
   `flex*`/`content*`/`size*`, `defaultTransition`, `easeOutTransition`.
2. **Un token de `src/index.css`** — espacement, rayon, transition, z-index.
3. **Une classe Tailwind en dur**, en dernier recours, dans le composant.

Une classe réutilisable écrite en dur dans un composant divergera du reste au premier
ajustement. C'est l'unique raison d'être de `style.tsx`.

## Les quatre blocs de `src/index.css`

| Bloc | Ligne | Contenu |
|---|---|---|
| `@theme` | 9 | polices, échelle typographique, breakpoints |
| `:root` | 47 | espacements, rayons, transitions, z-index, largeurs |
| `.light` | 88 | tokens de couleur et d'ombre, thème clair |
| `.dark` | 117 | les mêmes noms, thème sombre |

**`@theme`** porte trois familles de polices (`--font-family-montserrat`,
`hind_vadodara`, `kanit`), une échelle typographique **en pourcentages** — `--text-3xs: 60%`
jusqu'à `--text-9xl: 400%`, relative à `--base-font-size: 20px` — et les breakpoints. Deux
séries :

- largeur : `xs:400px`, `ss:500px`, puis les valeurs Tailwind habituelles `sm` → `2xl` ;
- **hauteur** : `hxs:720px`, `hsm:850px`, `hmd:1080px`, `hlg:1280px`, `hxl:1440px`,
  `h2xl:2160px`. Elles servent aux sections qui doivent tenir dans la fenêtre.

**`:root`** porte tout ce qui n'est pas une couleur. Utiliser ces variables plutôt que des
valeurs en dur : `--space-xs` → `--space-3xl`, `--radius-sm` → `--radius-full`,
`--transition-fast/normal/slow`, les courbes `--ease-out`/`--ease-bounce`/`--ease-smooth`,
l'échelle `--z-dropdown:100` → `--z-tooltip:600`, `--section-padding-x: 12%`,
`--max-page-width: 1920px`.

## ⚠️ Une couleur s'écrit deux fois

`.light` et `.dark` déclarent les **mêmes noms de token**. Un token ajouté dans un seul bloc
ne produit ni erreur ni avertissement : la couleur disparaît simplement dans l'autre thème.

Le dépôt en contient un exemple : **`--color-navbar-bg` n'est déclaré que dans `.light`**
(`src/index.css:103`) alors que `Navbar.tsx:85` l'utilise via `bg-(--color-navbar-bg)/95`. En
thème sombre la déclaration ne s'applique donc pas — sans conséquence visible, parce que
`backdrop-blur-md` prend le relais par-dessus l'illustration de fond. Le rendu est correct :
ne pas « corriger » cet écart, mais ne pas s'en inspirer non plus.

Asymétries volontaires, en revanche : `.dark` ajoute `--color-accent-cyber`,
`--color-accent-purple` et la famille `--glow-*`, qui n'ont pas de sens en thème clair.

Les couleurs s'écrivent en **syntaxe Tailwind v4** dans le JSX :
`text-(--color-quaternary)`, `bg-(--color-secondary)`, `border-(--color-tertiary)/15`.
Jamais `[var(--color-x)]`, jamais d'hexadécimal en dur.

## Le thème pilote aussi les images

Ce n'est pas qu'une affaire de CSS. Tout `GraphicAsset` porte `content: { light, dark }`, et
les composants l'indexent avec le thème courant :

```tsx
const { currentTheme } = useContext(ThemeContext);
// …
<img src={coreImages.portrait.content[currentTheme]} alt={coreImages.portrait.alt} />
```

`--background-image` suit la même logique côté CSS, avec deux illustrations distinctes.

**Une image ajoutée sans sa variante sombre casse le thème.** L'import des médias relève de
`portfolio-content` (`references/media.md`).

## Responsive : desktop-first à l'écriture

Les variantes se groupent sur **une seule ligne, du plus grand écran au plus petit, la
valeur sans préfixe en dernier** :

```
2xl:text-3xl xl:text-2xl lg:text-xl md:text-xl text-lg
```

Tailwind reste mobile-first à l'exécution : la valeur nue s'applique en dessous du plus
petit breakpoint cité. L'ordre d'écriture est une convention de lisibilité du dépôt, pas
une contrainte technique — mais s'en écarter produit un fichier visiblement étranger.

## Animations

Les variantes framer-motion vivent dans `src/assets/motionConstants.ts`, pas dans les
composants. `prefers-reduced-motion` s'y respecte via des durées conditionnelles : une
animation ajoutée en dur dans un composant contourne ce garde-fou.

`ScrollReveal` et `PageTransition` (`src/components/animations/`) couvrent la majorité des
besoins — les réutiliser avant d'écrire un `motion.div`.

## Pièges

- **Un token dans un seul bloc de thème** : voir plus haut. Vérifier `.light` *et* `.dark`.
- **Un `z-index` en dur** court-circuite l'échelle `--z-*` et finit par passer sous une
  modale.
- **`ThemeEngine` ignore `prefers-color-scheme`** et applique la classe dans un `useEffect`,
  alors que `index.html` sert `class="root light"` : un visiteur en thème sombre voit un
  flash clair au chargement. Écart connu, à proposer plutôt qu'à corriger au passage.
- **L'échelle typographique est en pourcentages.** `text-lg` vaut `120%`, pas `1.125rem`.
  Raisonner en proportions, pas en pixels.

## Vérifier

```bash
npm run lint && npm run build
```

Puis, à l'œil : la modification dans les **deux thèmes**, et aux breakpoints qu'elle touche.
Aucun outil du dépôt ne vérifie qu'une couleur existe dans les deux blocs.
