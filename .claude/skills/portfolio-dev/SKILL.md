---
name: portfolio-dev
description: Évolution du code de clembarr.dev — créer ou modifier une section, ajouter une page ou une route, retoucher le design system (couleurs, thème sombre, espacements, breakpoints, polices), traduire l'interface ou brancher une nouvelle langue, refondre l'architecture, déplacer ou renommer un composant, ajouter un contexte, revoir les dépendances ou le découpage du bundle. À utiliser dès qu'il faut toucher à src/components, src/pages, src/utils, src/style.tsx, src/index.css, vite.config.ts ou scripts/. Pour ajouter ou modifier une valeur de contenu (un projet, un article, une compétence, une entrée de parcours, une image), passer par le skill portfolio-content à la place. Also covers: add or restyle a section, add a page or route, change colors or dark mode, adjust responsive breakpoints, add a language, refactor or rename components, rework this portfolio's architecture.
---

# Code du portfolio — sections, styles, i18n, architecture

Ce dépôt n'a **ni test ni CI** : `.github/` ne contient que deux dossiers vides. Le seul
filet est `tsc -b` (via `npm run build`) et `src/assets/dataConsistency.ts`. Or les liens
entre les couches de ce site sont des **chaînes de caractères**, que `tsc` ne voit pas.

Ce skill décrit ces couplages, les conventions du dépôt, et la façon d'écrire du code qui
ressemble au reste.

## Frontière avec `portfolio-content`

Deux skills se déclenchent sur le mot « portfolio ». La ligne de partage est nette :

| La demande | Le skill |
|---|---|
| Une **valeur** de contenu : un projet, un article, une compétence, une entrée de parcours, une image | `portfolio-content` |
| Une **structure** : composant, page, route, style, type, contexte, dépendance | ce skill |

Une demande à cheval — « ajoute une section Témoignages » — commence ici pour la structure
(le composant, son montage, son ancre de navigation), puis **délègue les données** à
`portfolio-content`. Le dire à l'utilisateur au lieu d'improviser une forme de données :
inventer un type de contenu sans passer par `dataTypes.ts` et `dataConsistency.ts` crée du
contenu que personne ne validera jamais.

## Règles d'or

1. **Les couplages sont des chaînes, pas des types.** L'`id="career"` d'un composant doit
   correspondre au `link: "/#career"` de `navLinks` (`src/assets/uiConstants.ts:485`) ;
   `getSkill('label')` lève à l'exécution sur un label inconnu ; `relatedProjects` cible un
   titre de projet. Renommer un côté sans l'autre **compile parfaitement** et casse le site.
   Avant tout renommage, `grep` la chaîne littérale dans tout `src/`.

2. **`src/style.tsx` avant d'écrire un `className`.** Ce fichier est le dictionnaire de
   styles du site : `sectionContainer`, `heading2`, `paragraph`, `card`, `buttonPrimary`,
   `flexColToRowAtMd`, `contentCenter`, `defaultTransition`… Une classe réutilisable écrite
   en dur dans un composant est un style qui divergera du reste au premier ajustement.

3. **Une couleur s'écrit deux fois.** Les tokens de couleur sont déclarés dans `.light`
   (`src/index.css:88`) **et** `.dark` (`src/index.css:117`), sous les mêmes noms. Un token
   ajouté dans un seul bloc donne une couleur qui disparaît dans l'autre thème, sans
   erreur ni avertissement. Même logique pour les images : tout `GraphicAsset` porte
   `content: { light, dark }`.

4. **Cycle d'import.** Les fichiers de `src/assets/` importent `UNIVERSAL_LANG` depuis
   `utils/translationUtils`, **jamais** depuis `utils/assetsUtils`. `assetsUtils` importe
   `blogPosts` : l'importer depuis un fichier de contenu crée un cycle, la constante vaut
   `undefined` à l'évaluation et la clé devient littéralement `"undefined"`. Le repli
   `Object.values(content)[0]` de `getContent()` masque le bug à l'écran. Un refactor
   d'imports casse cette règle très facilement.

5. **`dataTypes.ts` et `dataConsistency.ts` évoluent ensemble.** Un champ ajouté à un type
   sans règle de validation correspondante est un champ que personne ne vérifiera jamais —
   et le validateur est ce qui tient ce dépôt debout à la place des tests.

## Réflexes par défaut qui sont faux ici

Ces gestes sont raisonnables sur la plupart des projets React et faux sur celui-ci. Les
vérifier avant d'agir coûte moins cher que de les défaire.

| Réflexe | La réalité de ce dépôt |
|---|---|
| Créer ou modifier `tailwind.config.js` | Il n'existe pas. Tailwind v4 se configure **en CSS**, dans `src/index.css` (`@theme`, `:root`, `.light`, `.dark`) |
| Installer `i18next` ou `react-intl` | Un moteur maison complet existe : `src/utils/translationUtils.ts` + `src/components/language/LangEngine.tsx` |
| Importer depuis `react-router-dom` | Le dépôt utilise **`react-router` v7**, sans le `-dom` |
| Ajouter Prettier, ESLint stylistique ou `.editorconfig` | Aucun n'existe. La mise en forme se lit dans les fichiers : voir `references/style-code.md` |
| Introduire des CSS Modules ou `styled-components` | Tout est Tailwind + `src/style.tsx`. Aucun `.module.css` dans le dépôt |
| Installer Vitest « pour ajouter un test » | Aucun harnais de test. En proposer un est une décision d'architecture, pas un détail d'implémentation : le demander |
| Ajouter une dépendance pour un besoin ponctuel | Vérifier d'abord `src/utils/utils.ts` et les 12 dépendances déjà présentes |

## Où aller selon la demande

| La demande porte sur… | Lire |
|---|---|
| section, bloc, page, route, ancre de menu, SEO, sitemap | `references/sections.md` |
| traduction, langue, fr/en, texte non traduit | `references/i18n.md` |
| couleur, thème, sombre/clair, espacement, responsive, police, z-index | `references/styling.md` |
| refonte, refactor, déplacer, renommer, contexte, dépendance, bundle | `references/architecture.md` |

**Ne charger que le fichier concerné.**

Une exception : **`references/style-code.md` se lit dès qu'on écrit une ligne de code**, en
plus du fichier de domaine. C'est lui qui fait que le résultat ressemble au reste du dépôt
plutôt qu'à du React générique.

## Déroulé

### 1. Lire avant d'écrire

Le fichier visé **et son voisin le plus proche** : la section d'à côté, la page qui la
monte. Les conventions de ce dépôt — barrels `index.ts`, contextes nommés `*Engine`, JSDoc
avec la description collée au tag — ne sont configurées nulle part. Elles se lisent.

Pour connaître les données réellement disponibles (labels de compétences, titres de
projets), le skill voisin a déjà l'outil :

```bash
node .claude/skills/portfolio-content/scripts/inventory.js
```

### 2. Questions groupées, en un seul tour

Regrouper tout ce qui manque en une seule fois plutôt que d'interroger au fil de l'eau.

### 3. Proposer avant d'appliquer

Le site est public. Présenter le changement avant de l'écrire dès qu'il est **visible ou
difficile à défaire** : un token de design modifié (il se propage partout), une suppression,
un renommage d'URL, un changement de structure de données.

Séparer explicitement ce qui a été demandé de ce qui a été déduit d'une convention du
dépôt. Une convention peut être un choix comme un défaut jamais rouvert — c'est à
l'utilisateur de trancher.

### 4. Écriture

Composant → barrel `index.ts` → point de montage. Dans cet ordre, les erreurs de `tsc`
guident au lieu de s'accumuler.

### 5. Vérification — obligatoire avant de rendre la main

```bash
npm run lint && npm run build && npm run validate
```

`npm run build` fait `tsc -b` : c'est le contrôle de typage. `npm run validate` ne couvre
que le contenu, mais un changement de type ou de structure s'y voit.

⚠️ Si ces commandes répondent `eslint: command not found` ou `tsc: command not found`, les
liens de `node_modules/.bin/` sont cassés : ils pointent en absolu vers l'emplacement d'une
ancienne machine. `npm install` les rétablit. En attendant, contourner avec
`node node_modules/typescript/bin/tsc -b` et `node node_modules/eslint/bin/eslint.js .`.

Si le contenu a bougé aussi, la chaîne complète du skill voisin est plus large :

```bash
bash .claude/skills/portfolio-content/scripts/check.sh
```

Rapporter la sortie réelle. Une affirmation « ça marche » se paie d'une commande lancée.

### 6. Ne pas committer

Rendre compte de ce qui a été fait, de ce qui a été vérifié et comment, et de ce qui reste
ouvert. Le commit est une décision de l'utilisateur.

## Lignes de base

Ces commandes ne sortent pas propres aujourd'hui. Ne pas chercher à atteindre zéro, ne pas
faire monter les compteurs, et signaler tout écart introduit par la modification en cours.

| Commande | État de référence |
|---|---|
| `tsc -b` (via `npm run build`) | **propre** — toute erreur est nouvelle |
| `npm run lint` | 3 erreurs, 16 avertissements |
| `npm run validate` | 1 erreur, 33 avertissements |

Les 3 erreurs d'ESLint : un `prefer-const` dans `SkillConstellation.tsx:95`, deux
`no-explicit-any` dans `BlogPost.tsx`. Les avertissements sont pour l'essentiel des
`react-hooks/exhaustive-deps`.

L'erreur du validateur est réelle et instructive : `[eew-language-biases] relatedProjects references
unknown project "EEW Analyzer"` — le projet a été renommé « LLM as a Judge » sans mettre à
jour l'article qui le cite. C'est exactement la règle d'or n° 1 en action. La corriger
relève de `portfolio-content`.

Ne pas faire monter le nombre d'erreurs. Si une modification produit un avertissement, le
signaler.

## Écarts connus — ne pas imiter, ne pas corriger d'office

Documentés pour qu'on ne les prenne pas pour des patrons, et qu'on ne les « répare » pas au
détour d'une autre tâche. Ceux marqués *à proposer* méritent d'être soulevés quand
l'occasion se présente, pas traités en silence.

| Écart | Statut |
|---|---|
| `projectsImages` et `projectsMedia` sont `@deprecated` | Ne rien y ajouter, ne pas les supprimer non plus |
| La vue projet (retex) est une modale sans URL, donc non partageable ni indexable | Limitation assumée ; en faire une route est un chantier à part entière |
| Pas de `public/404.html` : sur GitHub Pages, un lien profond comme `/blog/<slug>` renvoie 404 à froid | Vrai bug — à proposer |
| `ThemeEngine` ignore `prefers-color-scheme` et `index.html` sert `class="root light"` : flash clair au chargement en mode sombre | À proposer |
| `getContent()` existe mais les composants indexent en direct `x[currentLang]` | cf. `references/i18n.md` — correctif large, à proposer |
| `pkg-dir` est en dépendance et n'est importé nulle part | Suppression à proposer |
| `npm run validate` n'est branché ni sur `build` ni sur `predeploy` | À proposer |
| `About.tsx` : `useMemo(() => tagsWidget("hobbies"), [currentLang])` a une dépendance manquante, et `aboutWidgets.content` force des casts `as unknown as` | Dette de typage — ne pas la reproduire dans du code neuf |
| `CareerTimeline.tsx` trie sur `period['fr']` en dur | Casse si la clé `fr` disparaît — à proposer |
| `SkillConstellation.tsx` — 311 lignes de canvas, ré-exporté par son barrel et importé par aucun composant | Code mort. Suppression à proposer |
| La police Kanit est chargée sur chaque page et appliquée à aucun élément (`font-tertiary` : 0 usage) | Coût réseau réel — à proposer |
| `style.tsx` n'est adopté qu'en partie : `glass`, `glassCard`, `glassNav`, `glassModal`, `card`, `cardElevated`, les quatre boutons et `heroHeading` ne sont importés nulle part | Les composants réécrivent ces styles à la main. Ne pas supposer qu'une clé de `style.tsx` est en service |
| `--color-navbar-bg` n'est déclaré que dans `.light` alors que `Navbar.tsx:85` l'utilise | Déclaration sans effet en sombre : `backdrop-blur-md` prend le relais et le rendu est correct. Ne pas « réparer » |
| `validateMultilingual` saute le contrôle par langue dès qu'`UNIVERSAL_LANG` est présent | Rend la validation des traductions quasi inopérante — cf. `references/i18n.md` |
