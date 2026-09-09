# Architecture et refactors

Composition : `src/main.tsx` — l'ordre d'imbrication des providers
Coquille : `src/Layout.tsx` — navbar, contenu, footer
Routes : `src/components/AnimatedRoutes.tsx` — seul endroit
Contrat de données : `src/assets/dataTypes.ts` ↔ `src/assets/dataConsistency.ts`
Build : `vite.config.ts` — plugins, `manualChunks`, PWA

## Le patron « Engine »

Tout état transverse est un Context Provider nommé `<Nom>Engine`, dans son propre dossier
sous `src/components/`, avec son barrel :

| Engine | Contexte | Rôle |
|---|---|---|
| `LangEngine` | `LangContext` | langue courante, `document.documentElement.lang`, `localStorage` |
| `ThemeEngine` | `ThemeContext` | classe `light`/`dark` sur `<html>`, `localStorage` |
| `FlashsEngine` | `FlashsContext` | messages éphémères |
| `RetexDisplayEngine` | `RetexContext` | quel projet est affiché en modale |
| `SearchEngine` | `SearchContext` | recherche et tri des listings |

La forme est constante : une `interface <Nom>ContextType`, un `createContext` avec une
valeur par défaut vide, un provider `({ children }: { children: ReactNode })`, un
`export { <Nom>Engine, <Nom>Context };`. Le squelette complet est dans
`references/style-code.md`.

**L'ordre d'imbrication compte** (`src/main.tsx`) :
`BrowserRouter > LangEngine > ThemeEngine > FlashsEngine > RetexDisplayEngine > Layout >
AnimatedRoutes`. Un Engine qui consomme un autre doit être imbriqué plus profond.

Un nouvel état transverse suit ce patron. Un état local à une section reste dans la section.

## Barrels

Presque chaque dossier a son `index.ts` : `src/components/`, `sections/`, `cards/`,
`pages/`, `assets/`, et chaque dossier de médias. Un fichier ajouté sans son entrée de
barrel **compile**, mais n'est importable qu'en chemin profond — la convention se délite
sans qu'aucun outil ne le signale.

`src/assets/constants.ts` est un barrel de compatibilité qui ré-exporte les quatre fichiers
de constantes éclatés (`configConstants`, `motionConstants`, `uiConstants`, `seoConstants`).
Les nouveaux imports peuvent viser directement le bon fichier.

## Refactorer sans tests

`tsc -b` couvre les renommages de **symboles**. Il ne voit rien de ce qui suit :

| Ce qui casse en silence | Comment le retrouver |
|---|---|
| Ancre de section ↔ `navLinks` | `grep -rn '#<ancre>' src/` |
| Label de compétence passé à `getSkill()` | `node .claude/skills/portfolio-content/scripts/inventory.js skills` |
| `relatedProjects` / `relatedPosts` | `npm run validate` |
| Import de média supprimé ou renommé | `node .claude/skills/portfolio-content/scripts/orphans.js` |
| Clé de langue attendue par un composant | rien — voir `references/i18n.md` |
| Token CSS présent dans un seul bloc de thème | rien — voir `references/styling.md` |

Le réflexe avant un renommage large : **chercher la chaîne littérale**, pas seulement le
symbole. Après : `npm run validate` puis `orphans.js`.

Un renommage d'URL publique (slug d'article, chemin de route) est irréversible côté
référencement. Le signaler avant, jamais après.

## Types et validation

`dataTypes.ts` définit les interfaces et les enums ; `dataConsistency.ts` (578 lignes) les
vérifie à l'exécution. Le module est importé pour effet de bord par `src/main.tsx`, donc il
tourne automatiquement en développement, et en CLI via `npm run validate`.

**Les deux évoluent ensemble.** Un champ ajouté à un type sans règle de validation est un
champ que personne ne vérifiera jamais — et dans un dépôt sans tests, le validateur *est*
le filet.

Les validateurs existants suivent tous la même signature : `(ctx: ValidationContext) =>
void`, poussant sur `ctx.errors` (bloquant) ou `ctx.warnings` (informatif). Les ajouter à
`validateData()` en fin de fichier.

## Dépendances et bundle

Douze dépendances de production. Avant d'en ajouter une, vérifier `src/utils/utils.ts` :
il couvre déjà DOM, mathématiques, couleurs, résolution de liens typés.

Une dépendance volumineuse se déclare dans `manualChunks` (`vite.config.ts:114`), aux côtés
de `vendor-react`, `vendor-animation` et `vendor-utils`, sinon elle grossit le chunk
principal.

Le chargement différé se fait avec `React.lazy()` + `<Suspense fallback={<SuspenseFallback />}>`.
Aujourd'hui seul `ProjectsSlider` en bénéficie ; les routes ne sont pas découpées.

⚠️ `pkg-dir` figure dans les dépendances et n'est importé nulle part.

## Sécurité

`DOMPurify.sanitize` est **obligatoire** avant tout `dangerouslySetInnerHTML`. Le contenu
du site autorise du HTML dans les descriptions et les articles : c'est une frontière de
confiance, pas une précaution facultative.

## Déploiement

- `npm run deploy` → `predeploy` (`npm run sitemap && npm run build`) → `gh-pages -d dist`.
  Manuel, depuis un poste de développement. Il n'y a **aucune CI**.
- `npm run deploy:full` lance `scripts/deploy.sh`, qui **ne déploie pas** : il nettoie,
  vérifie les types, construit, affiche les tailles de bundle et imprime les instructions.
  Il n'appelle jamais `gh-pages`, et ne lance pas `npm run validate`.
- Hébergement GitHub Pages sur domaine propre (`CNAME`, `base: "/"`). Pas de règle de
  réécriture : sans `public/404.html`, les liens profonds échouent à froid.

## Pièges

- **Déplacer un fichier sans mettre à jour son barrel** casse la convention d'import en
  silence.
- **Ajouter un provider au mauvais niveau** dans `main.tsx` donne un contexte vide, sans
  erreur : la valeur par défaut du `createContext` prend le relais.
- **`Layout.tsx` masque navbar et footer** quand `displayedRetexTitle` est défini, en
  manipulant `classList` sur des refs. Un refactor de `Layout` doit préserver ce couplage.
- **`npm run validate` n'est branché ni sur `build` ni sur `predeploy`** : un déploiement
  peut partir avec des erreurs de contenu. Écart connu.

## Vérifier

```bash
npm run lint && npm run build && npm run validate
node .claude/skills/portfolio-content/scripts/orphans.js
```
