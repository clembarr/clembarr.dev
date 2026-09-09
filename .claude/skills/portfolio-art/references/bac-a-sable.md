# Le bac à sable

Branche : `sandbox` — **ne merge jamais vers `main`**
Page : `src/pages/Showcase.tsx` — supprimée de `main`, récupérable dans l'historique
Composants : `src/components/showcase/` — supprimé le 2026-03-17 (`91071c3`)
Référence historique : `git show 8f8749f:src/pages/Showcase.tsx`

Ce bac à sable a existé et il fonctionnait. Le rôle de ce document est de le remonter, pas
d'en inventer un autre.

## Ce qu'il contenait

`src/pages/Showcase.tsx` se décrivait comme *« A gallery of creative ways to present
information »*. Elle montait 16 composants expérimentaux, alimentés par les **vraies données**
du site (`skills`, `careerTimeline`) et par une palette dérivée du thème courant.

`src/components/showcase/` en contenait 17 : `SkillGalaxy`, `SkillTreeRPG`, `OrbitingSkills`,
`MathSpiral`, `HexagonGrid`, `FlowingPath`, `GhostPath`, `TypographicAxis`, `SilentTrack`,
`PerspectiveCards`, `BreadcrumbSequence`, et **six variantes de frise** — `InfinityTimeline`,
`SnakeTimeline`, `TickerTimeline`, `AccordionTimeline`, `StaircaseTimeline`, plus celle qui a
été retenue.

Six frises construites pour une seule expédiée. C'est la méthode : **construire beaucoup,
regarder, jeter.**

## Pourquoi une branche à part

L'atelier vivait autrefois dans l'arbre principal, et il a fini supprimé en bloc parce qu'il
avait accumulé dix-sept composants dont un seul servait.

**Le bac à sable vit désormais sur `sandbox`, branchée depuis `main`, et qui ne remonte
jamais.** Les variantes retenues sont reportées à la main sur `dev` ; les autres meurent avec
la branche. Deux propriétés qui découlent de ce choix :

- `/showcase` et `src/components/showcase/` **n'existent jamais sur la branche publiée** —
  impossible de mettre l'atelier en ligne par accident ;
- il n'y a plus de cimetière à vider : on repart de `main` à chaque campagne.

Le modèle de branches du dépôt devient : `dev` (code) et `feed` (contenu) alimentent `main`,
qui est publiée ; `sandbox` est un cul-de-sac assumé. Voir `portfolio-deploy`.

## Vestiges encore en place sur `main`

Deux traces subsistent et facilitent la remise en route :

- `src/assets/uiConstants.ts:598` déclare toujours un `NavbarPattern` avec
  `route: 'showcase'` — la navigation de la page est donc déjà écrite ;
- `src/components/sections/Skills.tsx:5` garde l'import commenté
  `// import SkillGalaxy from "../showcase/SkillGalaxy";`.

## Ouvrir une campagne

```bash
git checkout main && git pull
git checkout -b sandbox      # ou : git checkout sandbox && git rebase main
```

1. Créer `src/components/showcase/` et son barrel `index.ts`.
2. Créer `src/pages/Showcase.tsx`. Pour retrouver la mise en page d'origine — un composant par
   section, son titre, et les vraies données :
   ```bash
   git show 8f8749f:src/pages/Showcase.tsx
   ```
3. L'exporter depuis `src/pages/index.tsx`.
4. Ajouter la route dans `src/components/AnimatedRoutes.tsx`, **avant** l'attrape-tout
   `path="/*"` :
   ```tsx
   <Route path="/showcase" element={<Showcase />} />
   ```
5. Ne **pas** toucher à `staticPages` dans `scripts/generate-sitemap.js` : la page est un
   atelier, elle n'a pas à être indexée — et de toute façon elle ne quittera pas `sandbox`.

Le détail mécanique — barrels, conventions de composant, vérification — relève de
`portfolio-dev/references/sections.md`.

## Lancer les variantes en parallèle

C'est le seul endroit de ce projet où des agents gagnent leur place : les variantes sont
**indépendantes**, le travail est **volumineux et jetable**, et le jugement reste visuel et
humain. Ailleurs, un skill dans la session courante fait mieux.

**Un agent par variante, chacun dans son propre worktree git** (`isolation: "worktree"`).
Plusieurs agents sur une même copie de travail se marcheraient dessus : c'est l'isolation qui
rend le parallélisme possible, pas la branche.

Prendre des agents **neufs**, pas des forks : un fork hérite de toute la conversation et coûte
cher, alors qu'un agent froid n'a besoin que de ce skill — il est écrit pour ça.

Chaque brief contient, au minimum :

- **le problème de lecture** à résoudre, formulé à l'étape 1 du protocole ;
- l'ordre de **charger le skill `portfolio-art`** avant d'écrire quoi que ce soit, et
  `portfolio-dev/references/style-code.md` pour la mise en forme du code ;
- **l'angle propre à cette variante**, et l'interdiction d'en explorer un autre — c'est ce qui
  garantit que les propositions divergent au lieu de converger vers la même moyenne ;
- **un seul composant** à produire, dans `src/components/showcase/`, alimenté par les vraies
  données, décliné dans les deux thèmes ;
- l'interdiction de toucher à `src/pages/`, `src/components/sections/`, `src/index.css` et
  `src/style.tsx` — l'atelier ne modifie pas le site.

Trois angles franchement différents valent mieux que six nuances d'une même idée. Si deux
briefs peuvent être décrits par la même phrase, il n'y a qu'une variante.

**Récupérer** ensuite chaque composant depuis son worktree vers `sandbox`, l'ajouter au
barrel, et le monter dans `Showcase.tsx` à la suite des autres.

## Regarder et décider

```bash
npm run dev
```

Trois exigences, chacune pour une raison :

**Les vraies données.** Une frise testée sur trois entrées fictives ment sur ce qu'elle fera
avec quinze entrées réelles, dont certaines ont des titres longs et des logos manquants.

**Les deux thèmes.** Une proposition qui n'a pas été vue en sombre n'a pas été vue. Le site a
deux mondes ; une variante doit tenir dans les deux, ou assumer de n'exister que dans l'un.

**Le petit écran.** C'est là que les visualisations denses meurent.

Présenter ce que chaque variante **résout** et ce qu'elle **coûte** — densité, lisibilité,
poids, comportement en mouvement réduit — puis s'arrêter et attendre. **Aucune intégration
sans accord explicite.**

## Après la décision

**La variante retenue** est reportée sur `dev` et implémentée pour de bon avec
`portfolio-dev` : mise en forme, barrel, point de montage, ancre de navigation. Elle passera
ensuite sur `main` et en ligne via `portfolio-deploy`.

**Les autres ne sont pas triées, elles sont abandonnées avec la branche.** C'est tout
l'intérêt du cul-de-sac : rien à nettoyer, rien à décider une seconde fois.

Si une variante mérite d'être gardée sous le coude sans être expédiée, le dire explicitement
et laisser `sandbox` en place — mais ne pas la faire entrer sur `dev` « en attendant ».

## Vérifier

Sur `sandbox`, avant de présenter :

```bash
npm run lint && npm run build
```

`/showcase` ne doit apparaître ni dans le sitemap ni dans la navigation publique du site
déployé — et `sandbox` ne doit jamais figurer dans un merge vers `main`.
