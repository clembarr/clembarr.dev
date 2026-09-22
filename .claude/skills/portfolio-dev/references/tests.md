# Tests

Le dépôt porte deux suites et une CI depuis le 22/09/2026. Avant cette date il n'avait
aucun test : les conventions ci-dessous sont récentes, elles se lisent ici plutôt que dans
un historique de fichiers.

| Suite | Commande | Où | Quoi |
|---|---|---|---|
| Unitaire et composants | `npm test` | `tests/unit/` | fonctions pures, Engines, rendu conditionnel |
| Bout en bout | `npm run test:e2e` | `tests/e2e/` | parcours réels, layout, persistance |

`npm run test:watch` relance la suite unitaire à chaque sauvegarde.

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

## Chromium

Playwright télécharge ses propres navigateurs ; ils **ne démarrent pas sur NixOS**, où le
site est développé. `playwright.config.ts` cherche donc un `chromium` système sur le PATH,
surchargeable par `CHROMIUM_PATH`, et ne laisse Playwright choisir le sien que sous `CI`.
Un `Chrome not found` ou un navigateur qui meurt au lancement vient de là, pas d'une
installation manquante.

## Vérifier qu'un test tient

Un test écrit après le code passe du premier coup — c'est normal, et ça ne prouve rien.
**Le casser volontairement est la seule preuve** : introduire la régression qu'il est censé
attraper, vérifier qu'il rougit, restaurer.

```bash
# muter, lancer, restaurer
npm test
git diff src/    # doit être vide après restauration
```

Le fix du bouton de galerie a été validé ainsi : 14/20 avant, 20/20 après, sur quatre
répétitions — ce qui a aussi révélé que le bug était intermittent.

## CI

`.github/workflows/ci.yml`, sur `push` vers `dev` et `feed`, et sur toute pull request
vers `main`. Deux jobs : `checks` (build, lint, validate, unitaires) puis `e2e`.

- `npm run validate` est **bloquant**. C'est lui qui attrape un `relatedProjects` pointant
  sur un projet renommé ou un label de `getSkill()` mal orthographié.
- `npm run lint` est en `continue-on-error` : le dépôt porte trois erreurs préexistantes.
  À passer bloquant quand le compteur atteint zéro. Sur le runner le compte est juste —
  `.claude/worktrees/`, qui fausse le compteur en local, est gitignoré.
- Le déploiement reste **manuel, depuis `main`** — cf. le skill `portfolio-deploy`. La CI
  ne publie rien.
