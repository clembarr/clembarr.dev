---
name: portfolio-test
description: Tests de clembarr.dev — écrire, lancer, réparer ou étendre les suites Vitest (tests/unit/) et Playwright (tests/e2e/), choisir laquelle des deux porte un cas, prouver qu'un test attrape vraiment la régression qu'il vise, diagnostiquer un échec de CI (.github/workflows/ci.yml). À utiliser dès qu'une modification de code commence — ce dépôt travaille en TDD, le test rouge s'écrit avant le code — et dès qu'il est question de couverture, de non-régression, de test instable, de tests/, de vitest.config.ts ou de playwright.config.ts. Le code qui rend le test vert s'écrit avec portfolio-dev ; une valeur de contenu n'a pas de test, elle a le validateur (portfolio-content). Also covers: write a test, TDD, red green refactor, unit tests, component tests, end to end tests, Vitest, Playwright, jsdom, Testing Library, CI pipeline, flaky test, regression test, coverage for this portfolio.
---

# Tests — clembarr.dev

Le dépôt porte deux suites et une CI depuis le **22/09/2026**. Avant cette date il n'avait
aucun test : les conventions ci-dessous sont récentes, elles se lisent ici plutôt que dans
un historique de fichiers.

| Suite | Commande | Où | Quoi |
|---|---|---|---|
| Unitaire et composants | `npm test` | `tests/unit/` | fonctions pures, Engines, rendu conditionnel |
| Bout en bout | `npm run test:e2e` | `tests/e2e/` | parcours réels, layout, persistance |

`npm run test:watch` relance la suite unitaire à chaque sauvegarde.

## Le test d'abord — règle du dépôt

**Toute logique non triviale ajoutée ou corrigée commence par un test qui échoue.** Ce n'est
pas une préférence de style : un test écrit après le code passe du premier coup, et un test
qui n'a jamais été rouge ne prouve rien. Le TDD rend l'étape rouge gratuite — elle est
rouge parce que le code n'existe pas encore.

Le cycle, dans cet ordre :

1. **Rouge.** Écrire le test, le lancer, **lire le message d'échec**. Un test qui échoue
   pour la mauvaise raison — import cassé, sélecteur qui n'existe pas, Engine non monté —
   ne garde rien : il rougira encore quand le code sera juste, et on le « réparera » en le
   vidant de son sens.
2. **Vert.** Le minimum de code qui le fait passer. Pas la généralisation, pas le cas
   suivant.
3. **Refactor.** La suite tient pendant qu'on range.

Pour un **bug**, l'étape rouge est la reproduction : le test qui échoue sur le code actuel
est la preuve qu'on a compris le symptôme. Écrire le correctif avant, c'est corriger une
hypothèse.

### Quand le test d'abord ne s'applique pas

| Le changement | Ce qui tient sa place |
|---|---|
| Une **valeur** de contenu (projet, article, compétence, parcours) | `npm run validate` — c'est le rôle de `dataConsistency.ts`, cf. `portfolio-content` |
| Un **parti pris visuel** : couleur, espacement, animation, mise en page | Aucun test ne juge ça. Bac à sable `/showcase` et œil humain, cf. `portfolio-art` |
| Un renommage, un déplacement de fichier, un changement de type | `tsc -b` guide, et la suite existante sert de filet |
| Du texte, un lien, une constante d'affichage | Rien. Y coller un test fige une valeur qui bougera |

Tout le reste — une branche, une boucle, un calcul, un effet, une route, une persistance,
une règle de tri ou de filtre — part avec son test, et il s'écrit avant.

## Quelle suite pour quoi

La ligne de partage est le **layout**. jsdom n'a pas de moteur de rendu : toute mesure y
répond zéro, aucune classe Tailwind ne s'applique, `getComputedStyle` ne calcule rien. Un
test qui dépend d'une position, d'un débordement ou d'un `overflow-hidden` **ne peut pas**
vivre dans la suite unitaire — il y passera toujours, y compris sur du code cassé.

| La question posée | La suite |
|---|---|
| Quelle branche React prend-il ? | unitaire |
| Le contexte propage-t-il la bonne valeur ? | unitaire |
| Cette fonction calcule-t-elle juste ? | unitaire |
| L'élément est-il au bon endroit, visible, cliquable ? | e2e |
| La préférence survit-elle à un rechargement ? | e2e |
| Le parcours complet mène-t-il où il faut ? | e2e |

Le bug du bouton de galerie (septembre 2026) est le cas d'école : un `useEffect` mesurait
`clientHeight` pendant la transition de page et plaçait le bouton hors de son parent
`overflow-hidden`. Aucun test jsdom ne pouvait le voir. Le test e2e qui le garde mesure des
`boundingBox()`, pas une présence dans le DOM : un élément poussé hors de son parent
**conserve une bounding box**, donc `toBeVisible()` reste vert sur ce bug précis.

## Écrire un test unitaire

Vitest 3, jsdom, Testing Library. Imports explicites — pas de `globals: true`.

```ts
import { describe, expect, it } from "vitest";
import { getContent } from "../../src/utils/translationUtils";

describe("getContent", () => {
    it("falls back to the universal key when the language is missing", () => {
        expect(getContent({ [UNIVERSAL_LANG]: "React" }, "fr")).toBe("React");
    });
});
```

Les tests sont **écrits en anglais**, comme le reste du code du dépôt, et chaque fichier
s'ouvre sur un bloc JSDoc qui dit ce que la couche testée tient debout — pas ce que le
fichier contient. Voir `tests/unit/engines.test.tsx` pour le patron.

**Tester la forme, pas la valeur.** Les tests lisent la couche de contenu réelle. Ils
doivent porter sur des invariants (le tri est décroissant, aucun label n'est dupliqué,
chaque média a un `alt`), jamais sur un titre ou un label écrit en dur : ajouter un projet
ne doit pas faire rougir une suite.

Pour un composant, monter les Engines dont il dépend — `LangEngine` avant `SearchEngine`,
qui le consomme :

```tsx
render(<LangEngine><ThemeEngine><Component /></ThemeEngine></LangEngine>);
```

`tests/setup.ts` comble ce que jsdom ne fournit pas et que les composants réclament au
premier rendu : `matchMedia` (lu au niveau module par `PageTransition` et `News`),
`ResizeObserver`, `IntersectionObserver`, `document.fonts.ready` (attendu par
`RetexViewer`), `innerText` (lu sans garde par `adjustFontSize`). Un composant qui plante
au montage dans un test est le plus souvent une API manquante de plus : l'ajouter là,
jamais contourner dans le test.

## Écrire un test e2e

Playwright, deux profils : `desktop` (1440×900) et `mobile` (Pixel 5). La suite tourne
contre le **serveur de dev**, pas un build de preview — le service worker de la PWA met en
cache d'un run à l'autre et rendrait un échec dépendant de l'ordre des tests.

Beaucoup de composants changent de forme au breakpoint `lg` : le retex affiche un aperçu
et son bouton au-dessus de 1024 px, une galerie empilée en dessous. Un test qui ne vaut que
pour une des deux formes le déclare :

```ts
test.skip(({ viewport }) => (viewport?.width ?? 0) < 1024, "desktop layout only");
```

**Les `id` du dépôt ne sont pas uniques.** `Dropdown` code les siens en dur et le composant
est monté trois fois par page ; `ArticleLayout` renumérote ses parts à chaque paragraphe.
Scoper le sélecteur (`#navbar-options #dropdown-button`) plutôt que d'espérer.

**Le navigateur headless démarre en anglais.** `getLocalLanguage()` lit
`navigator.language` faute de valeur stockée, donc un test qui bascule vers l'anglais ne
teste rien. Fixer la langue de départ, et seulement si elle est absente — `addInitScript`
se rejoue à chaque navigation et écraserait le choix que le rechargement doit vérifier :

```ts
await page.addInitScript(() => {
    if (!localStorage.getItem("lang")) localStorage.setItem("lang", "en");
});
```

## Garde responsive

`tests/e2e/responsive.spec.ts` parcourt chaque route (`/`, `/projects`, `/blog`,
`/credits`, un article) sur neuf viewports — un par tranche de breakpoint de largeur, de 360 à 1920 px,
plus un portable court en 1366×650 — et vérifie deux invariants sur tout le DOM :

| Invariant | Pourquoi il faut le mesurer élément par élément |
|---|---|
| **Aucun élément coupé par le bord de l'écran** | `.root, #root` posent `overflow-x: hidden` (`src/index.css`) : un bloc qui déborde ne crée jamais de scroll horizontal, il est coupé en silence. `scrollWidth` ne prouve rien |
| **Aucun texte sous 10 px** | L'échelle `--text-*` est en **pourcentages du parent** : un `text-3xs` (60 %) dans un `text-3xs` donne 7 px sans erreur. Le plancher attrape l'accident, pas le choix |

Ce qui n'est pas « coupé » : un élément tenu par un ancêtre qui défile ou masque
horizontalement (swipe, carrousel, illustration dans un conteneur `overflow-hidden`), et
tout ce qui est sous `aria-hidden`. Un débordement voulu se déclare donc **dans le
composant**, par son conteneur — jamais par une exception dans le test.

Deux réglages qui tiennent la garde debout :

- **`reducedMotion: "reduce"`**. Sans lui, `ScrollReveal` garde transparents et décalés les
  blocs qu'il n'a pas encore révélés, et le test les ignore — il est resté vert sur un
  Contact de 900 px de large tant que ce réglage manquait. Sous mouvement réduit, chaque
  bloc est à sa place de repos dès le départ.
- **Profil `desktop` seulement**. La matrice couvre déjà les largeurs de téléphone ; le
  profil `mobile` saute ces quatre tests.

La garde ne juge pas l'esthétique d'un breakpoint — ça reste l'œil, cf. `portfolio-art`.
Elle dit qu'aucune largeur ne **casse**. Une section neuve est couverte le jour où elle
est montée, sans rien écrire ; une règle propre à une section (colonnes côte à côte au-delà
de `md`, swipe en dessous) s'écrit en plus, dans le spec de la section.

Prouvée par mutation : un `min-w-[900px]` sur `#contact-container` et un `text-[45%]` sur
le copyright du footer la font rougir, chacun sur sa règle.

## Chromium

Playwright télécharge ses propres navigateurs ; ils **ne démarrent pas sur NixOS**, où le
site est développé. `playwright.config.ts` cherche donc un `chromium` système sur le PATH,
surchargeable par `CHROMIUM_PATH`, et ne laisse Playwright choisir le sien que sous `CI`.
Un `Chrome not found` ou un navigateur qui meurt au lancement vient de là, pas d'une
installation manquante.

## Boucler court

Relancer les 130 tests unitaires coûte deux secondes ; la suite e2e, une minute — dont
une trentaine de secondes pour la garde responsive. Pendant
un cycle, cibler :

```bash
npx vitest run tests/unit/utils.test.ts -t "adjustFontSize"
npx playwright test tests/e2e/projects.spec.ts --project=desktop
npx playwright test tests/e2e/projects.spec.ts --repeat-each=4   # chasse à l'instable
npx playwright test --ui                                          # inspection pas à pas
```

Et repasser la suite entière avant de rendre la main : un test vert isolé peut rougir en
compagnie des autres, `localStorage` et le serveur de dev étant partagés.

## Prouver qu'un test tient

Le TDD donne l'étape rouge gratuitement. Pour un test ajouté **après coup** — sur du code
déjà écrit — elle se paie à la main : introduire la régression que le test est censé
attraper, vérifier qu'il rougit, restaurer.

```bash
# muter, lancer, restaurer
npm test
git diff src/    # doit être vide après restauration
```

Le fix du bouton de galerie a été validé ainsi : 14/20 avant, 20/20 après, sur quatre
répétitions — ce qui a aussi révélé que le bug était intermittent. Un test e2e qui passe
une fois ne dit rien d'un bug de timing : `--repeat-each` tranche.

## CI

`.github/workflows/ci.yml`, sur `push` vers `dev` et `feed`, et sur toute pull request
vers `main`. Deux jobs : `checks` (build, lint, validate, unitaires) puis `e2e`.

- Node **24** sur le runner, comme en local. `jsdom` 30 exige Node ≥ 22.22 : sous Node 20,
  `npm ci` passe, le build passe, et seule l'étape `npm test` meurt.
- `npm run validate` est **bloquant**. C'est lui qui attrape un `relatedProjects` pointant
  sur un projet renommé ou un label de `getSkill()` mal orthographié.
- `npm run lint` est en `continue-on-error` : le dépôt porte trois erreurs préexistantes.
  À passer bloquant quand le compteur atteint zéro. Sur le runner le compte est juste —
  `.claude/worktrees/`, qui fausse le compteur en local, est gitignoré.
- Le job `e2e` installe le chromium de Playwright (`CI` désactive la recherche du
  navigateur système) et publie `playwright-report/` en artefact pendant 7 jours : c'est là
  qu'on lit un échec qui ne se reproduit pas en local.
- Le déploiement reste **manuel, depuis `main`** — cf. le skill `portfolio-deploy`. La CI
  ne publie rien.

## Lignes de base

Mesuré le 22/09/2026. Ces compteurs bougent avec le dépôt : les recompter plutôt que les
croire sur parole, et **mettre ce tableau à jour dès qu'ils changent pour de bon**.

| Commande | État de référence |
|---|---|
| `npm test` | **130 tests verts**, 8 fichiers — tout échec est une régression |
| `npm run test:e2e` | **77 passés, 23 ignorés**, environ 1 min — l'ignoré est attendu, pas un symptôme |
| `npm run build` (`tsc -b`) | **propre** — couvre aussi `tests/` via `tsconfig.test.json` |

Les 23 e2e ignorés le sont par `test.skip` sur le profil : 12 parce que le retex change de
forme à `lg` et qu'un test de la mise en page de bureau n'a rien à vérifier sur un profil
mobile, 5 parce que la garde responsive porte sa propre matrice de viewports et ne tourne
que sur `desktop`, 6 parce que la section carrière change de forme à `md` — ses colonnes
n'existent pas sur mobile, son swipe n'existe pas sur bureau (`career.spec.ts`).

## Avant de rendre la main

```bash
npm run lint && npm run build && npm run validate && npm test
```

Et `npm run test:e2e` dès que la modification touche au rendu, à une route, à un parcours
ou à une préférence. Pour un changement de mise en page, au minimum :

```bash
npx playwright test tests/e2e/responsive.spec.ts --project=desktop
```

Rapporter la sortie réelle, y compris l'étape rouge : « le test échouait avec *X*, il passe
maintenant » est ce qui distingue un test qui garde quelque chose d'un test décoratif.

Puis relire ce skill : s'il décrit encore le dépôt tel qu'il est — cf. la règle de
maintenance des skills dans `CLAUDE.md`.
