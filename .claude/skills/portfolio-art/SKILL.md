---
name: portfolio-art
description: Direction artistique de clembarr.dev — juger si une proposition visuelle appartient à ce site, puis créer dedans. À utiliser dès qu'il est question d'identité visuelle, de parti pris esthétique, d'ambiance, de « ça fait générique » ou « ça ne va pas avec le reste », d'une nouvelle façon de présenter une information (frise, visualisation, carte, mise en page), d'une refonte visuelle, d'une illustration ou d'une icône à créer, ou d'un audit de cohérence de l'ensemble du site. Répond aussi à « propose-moi une variante », « rends ça plus vivant », « qu'est-ce qui cloche visuellement ». Pour la mécanique du style (tokens, classes, breakpoints), passer par portfolio-dev ; pour une valeur de contenu, par portfolio-content. Also covers: art direction, visual identity, look and feel, design critique, propose visual alternatives, does this fit the site, redesign a section's appearance, create an illustration in the site's style.
---

# Direction artistique — clembarr.dev

Ce skill ne décrit pas comment le style fonctionne : `portfolio-dev` le fait. Il dit **ce que
ce site veut dire**, et donne de quoi juger si une proposition lui appartient.

L'ordre compte. Juger d'abord, créer ensuite. Une proposition qu'on ne sait pas refuser n'a
pas de direction.

## La thèse, en trois idées

**On regarde depuis au-dessus des nuages.** Le `body` porte une photographie en fond
(`--background-image`), une mer de cumulus vue de dessus : presque blanche en clair, nuit
d'orage en sombre. Le contenu flotte par-dessus derrière un voile à 92–97 %
(`--color-layout-bg`). Ce n'est pas une texture, c'est une position du spectateur — de
l'altitude, du recul. Tout ce qu'on ajoute flotte à cette hauteur.

**Le travail est un effort répété, pas un exploit.** Sisyphe est le personnage du site.
`src/assets/illustrations/index.tsx:10` importe le hero clair depuis `sysiphus_working.png` :
un croquis à l'encre, trait griffé, hachures visibles. Son rocher tourne sur 25 secondes en
linéaire, autour d'une origine mesurée à la main (`origin-[69.5%_32.8%]`,
`HeroIllustration.tsx:93`), avec des saccades d'un demi-pixel pour qu'il ne soit pas
parfaitement rond. Le site parle de recherche et d'itération. Il ne se vante pas.

**La matière première est le langage.** Le hero sombre est un visage humain entièrement
composé de caractères typographiques. Ce n'est pas la même image recolorée que le clair :
**ce sont deux œuvres différentes sur le même sujet**, l'une dessinée à la main, l'autre
faite de signes. La bio dit la même chose autrement : « Explorer, créer et partager ».

## La discipline est la signature

C'est la section à lire avant toute proposition, et la seule qui empêche vraiment la dérive.

**Une identité maximaliste complète est construite dans ce dépôt — et éteinte.** Ce n'est pas
un oubli, c'est un jugement, et il est écrit :

| Ce qui existe et ne sert pas | Où |
|---|---|
| `ascii-glitch` — la **seule** aberration chromatique du projet, avec un cyan `#00d4ff` qu'on ne trouve nulle part ailleurs | `index.css:655` |
| `scanline`, `hologram-flicker`, `data-corruption`, `noise`, `matrix-rain` | `index.css:697` à `798` |
| `.neon-text`, `gradientText` + `gradient-shift` (un titre chatoyant) | `index.css:834`, `style.tsx` |
| `glass`, `glassCard`, `glassNav`, `glassModal`, `card`, `cardElevated`, les quatre boutons, `heroHeading` | `style.tsx`, importés par aucun composant |
| `SkillConstellation.tsx` — 311 lignes de canvas fait main | `components/visualizations/`, importé par rien |
| `GALAXY_CLUSTER_COLORS` — six couleurs pour une vue « galaxy » inexistante | `uiConstants.ts:1179` |

**12 des 31 keyframes sont morts, et ce sont presque tous les maximalistes.**

Et trois commentaires défendent explicitement l'absence d'effet :

> `index.css:311` — *« No color shift — pure signal flicker. »*
> `index.css:323` — *« Only brightness/contrast — no color drift. »*
> `index.css:353` — *« different slice positions and timing to avoid lockstep with slice-1. »*

L'auteur savait à quoi ressemble un glitch RGB. Il l'a écrit, puis a gardé la version
monochrome, et a noté pourquoi.

**La règle qui en découle : avant de proposer un effet, vérifier s'il a déjà été écrit ici et
refusé.** Proposer une aberration chromatique, une pluie de matrice ou un titre à dégradé
mouvant, ce n'est pas apporter une idée neuve — c'est rallumer une idée jugée. Si l'effet est
dans cette table, le dire plutôt que l'implémenter.

## Ce qui appartient, ce qui n'appartient pas

Des critères vérifiables, à passer sur toute proposition. Un « non » suffit à la renvoyer.

| Question | Pourquoi |
|---|---|
| L'image est-elle **dessinée à la main ou photographiée** ? | Ce site n'a aucun aplat vectoriel décoratif. Ses images sont de l'encre ou de la photo |
| Existe-t-elle **dans les deux dialectes**, pas seulement « en plus sombre » ? | Voir la section suivante |
| Le mouvement **sert-il la lecture** ? | Le budget est de 20 à 50 px. Au-delà, c'est de la décoration |
| Le vert reste-t-il **l'accent unique** ? | Une seconde couleur d'accent dilue la seule qu'il y a |
| Réemploie-t-elle le **vocabulaire existant** avant d'en inventer ? | Voir `## Le vocabulaire` |

Ce qui trahit la direction, à refuser en nommant le critère :

- un dégradé multicolore, ou toute aberration chromatique ;
- une ombre portée **colorée** en thème clair (les ombres y sont neutres, à 4–10 %) ;
- un halo, un néon ou une lueur en thème clair — les `--glow-*` n'existent qu'en sombre, et
  c'est voulu ;
- une illustration vectorielle plate, type *corporate memphis* ;
- un emoji dans l'interface ;
- un survol qui **agrandit** — ici on soulève de 4 px ou on glisse de 6, jamais plus ;
- une barre de titre **pleine largeur** — la marque du site fait deux tiers ;
- des coins très arrondis hors des pastilles : `lg` pour les boutons et champs, `xl` pour les
  cartes, `2xl` pour les modales, `full` seulement pour les tags.

## Les deux dialectes

Ce ne sont pas deux thèmes, ce sont **deux mondes**. La preuve dépasse la palette : les
composants rendent un **DOM différent** selon le thème.

- `Layout.tsx:34` ne monte `.cyber-grid` que si `isDark` — une trame de 50 px en menthe à
  ~1 % d'opacité effective, derrière tout le site.
- `HeroIllustration.tsx` rend des éléments distincts : en sombre un bloom
  `filter: blur(180px)` à 8 % plus `ascii-pulse` ; en clair aucune lueur, mais un second
  calque — le rocher — qui tourne.
- `ProjectsSlider.tsx` n'ajoute ses calques de glitch qu'en sombre.
- Les bordures **changent de nature** : gris neutre en clair, teintées menthe en sombre. En
  mode sombre, chaque arête du site est filetée de phosphore.

**Le clair est Sisyphe au crayon sur papier. Le sombre est le terminal du même type à deux
heures du matin.** Même contenu, deux mondes écrits.

La règle unique à retenir : **tout élément neuf existe deux fois**, et la version sombre
n'est pas la claire assombrie. Détail des palettes dans `references/palettes.md`.

## Le vocabulaire

Réemployer avant d'inventer. Ces idiomes sont la grammaire du site.

- **La marque** : une barre d'accent de **deux tiers de large**, 3 à 5 px, sous les titres
  (`styles.line`, `style.tsx:28`). Jamais pleine largeur.
- **La formule d'accent**, l'idiome le plus réutilisé du dépôt : `bg-accent/10` +
  `border-accent/20` + `text-accent`, `rounded-full` (`styles.tag`, `style.tsx:183`).
- **La hairline qui apparaît au survol** : un dégradé `transparent → accent → transparent`
  de 2 à 3 px, opacité 0 → 100 au `group-hover`. Sur les cartes de projet comme sur la frise.
- **Le soulèvement** : `hover:-translate-y-1` sur les cartes, `hover:translate-x-1.5` sur les
  liens — qui glissent dans la direction où pointe leur flèche.
- **L'échelle de verre** : opacité et flou montent **ensemble** avec l'importance, de 5 %
  (décor) à 95 % et `blur-xl` (modale).
- **La hiérarchie est un seul écart de graisse** : Montserrat à 350 pour le texte, 800 pour
  les titres. Pas de contraste serif/sans, pas de couleur de titre. Hind Vadodara est
  réservée à ce qui est **interactif ou insisté** : liens de nav, `animatedLink`, entrée
  active du sommaire, `<strong>` dans les articles.

## Protocole — rien n'entre sans validation

L'auteur travaille par variantes : six frises construites pour une seule retenue. Le rôle de
ce protocole est de rendre ce mouvement possible sans polluer le site.

### 1. Nommer le problème de lecture

Avant de dessiner : qu'est-ce qui se lit mal aujourd'hui ? Une proposition qui ne répond à
aucun problème est une décoration, et se juge mal.

### 2. Construire plusieurs variantes, jamais une seule

C'est la méthode du dépôt. Une variante unique ne se compare à rien et emporte l'adhésion par
défaut. Deux ou trois, franchement différentes, valent mieux que trois nuances d'une même.

### 3. Les monter dans `/showcase`, sur la branche `sandbox`

**Jamais dans `src/pages/` ni `src/components/sections/`, et jamais sur `dev` ou `main`.**
`sandbox` est un cul-de-sac : elle ne remonte jamais, donc l'atelier ne peut pas partir en
ligne par accident. Voir `references/bac-a-sable.md` — qui décrit aussi comment lancer
plusieurs variantes en parallèle, un agent par variante dans son propre worktree.

Chaque variante est alimentée par les **vraies données** du site (`skills`, `careerTimeline`,
`projects`) et présentée **dans les deux thèmes** — une proposition qui n'a pas été vue en
sombre n'a pas été vue.

### 4. Présenter et attendre

Le site est public et c'est l'identité de quelqu'un. **Aucune intégration sans accord
explicite.** Présenter ce que chaque variante résout et ce qu'elle coûte, puis s'arrêter.

### 5. Après décision

La variante retenue est reportée sur `dev` et implémentée pour de bon avec `portfolio-dev`,
puis publiée via `portfolio-deploy`. **Les autres sont abandonnées avec la branche** — rien à
trier, rien à décider deux fois.

C'est ce qui manquait à l'ancien atelier : `showcase/` vivait dans l'arbre principal et avait
accumulé 17 composants avant d'être supprimé en bloc le 2026-03-17.

## Auditer la cohérence

Pour un passage d'ensemble, dans cet ordre :

1. **Les deux thèmes, les deux langues.** Home, un projet, un article, le formulaire.
2. **Chaque figure a-t-elle ses deux variantes ?** La règle : tout ce que l'auteur contrôle
   est décliné clair/sombre — les 41 logos techniques le sont sans exception. Les marques de
   tiers ne le sont pas et sont compensées par `opacity-80`. Ne pas inverser de force le logo
   d'autrui.
3. **Aucun token de couleur dans un seul bloc** — `.light` et `.dark` déclarent les mêmes
   noms. Mécanique dans `portfolio-dev/references/styling.md`.
4. **Le vert reste-t-il l'accent unique ?** Chercher toute seconde couleur d'accent apparue.
5. **Une famille visuelle étrangère s'est-elle glissée ?** Un aplat vectoriel, une ombre
   colorée, un arrondi hors échelle.

Rapporter ce qui dévie **et la règle qu'il enfreint**. Ne rien corriger d'office : un écart
peut être un choix.

## Frontière avec les deux autres skills

| La demande | Le skill |
|---|---|
| « ajoute mon stage au parcours » — une valeur de contenu | `portfolio-content` |
| « cette couleur n'est pas déclarée en sombre » — un mécanisme | `portfolio-dev` |
| « est-ce que ce bloc va avec le reste », « propose une autre frise » | ce skill |

Une proposition validée s'implémente **avec `portfolio-dev`** : c'est lui qui porte la mise
en forme du code, les couplages et la vérification.
