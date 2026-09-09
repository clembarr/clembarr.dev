# Mouvement

Constantes : `src/assets/motionConstants.ts`
Composants : `src/components/animations/ScrollReveal.tsx`, `PageTransition.tsx`
Keyframes CSS : `src/index.css`, l.313 à 825

Le mouvement de ce site a un **budget**, et c'est ce budget qui fait son caractère. Rien n'y
est spectaculaire ; tout y arrive calmement.

## Le budget

| Grandeur | Valeur | Où |
|---|---|---|
| Déplacement, transitions de page | **20 px** | `PageTransitionsConstants.INITIAL_Y` |
| Déplacement, apparition au défilement | **50 px** | `ScrollRevealConstants.INITIAL_POS` |
| Dérive ambiante | **4 px** | `GraphWidgetConstants.FLOAT_AMP_PX` |
| Soulèvement au survol | **4 px** | `hover:-translate-y-1` |
| Glissement d'un lien au survol | **6 px** | `hover:translate-x-1.5` |
| Tempo courant | **300 ms** | `defaultTransition` |
| Durées d'animation | **0,3 à 0,6 s** | `motionConstants.ts` |
| Le hero, seule exception | **700 ms** | `Hero.tsx` |

Rien ne voyage loin, rien ne dure longtemps. Le hero est délibérément **deux fois plus lent**
que le reste du site : c'est la première chose qu'on voit, elle se pose.

## La courbe

`EASE: "0.25 0.1 0.25 1"` dans les quatre blocs animés — c'est `ease`, la courbe par défaut
de CSS. Pas d'accélération dramatique, pas de dépassement.

Trois courbes sont pourtant définies dans `index.css` : `--ease-out`, `--ease-smooth` et
`--ease-bounce`. **`--ease-bounce` — la seule qui rebondit — n'est employée qu'une fois dans
tout le site** : sur le curseur du bouton de thème (`SwitchButton.tsx:85`, `duration-500`),
qui se change en lune avec ses cratères quand on passe en sombre.

C'est une règle utile à comprendre plutôt qu'à répéter : **la fantaisie est réservée au geste
qui change de monde.** Partout ailleurs, la courbe par défaut.

## Le survol

Deux gestes, jamais un troisième :

- **soulever** de 4 px — les cartes ;
- **glisser** de 6 px — les liens, dans la direction où pointe leur flèche (`→ Carrière`).

**Jamais d'agrandissement, jamais de rotation.** Une proposition qui fait grossir un élément
au survol ne vient pas de ce site.

S'y ajoute la hairline `transparent → accent → transparent` qui apparaît en `group-hover` sur
le bord d'une carte, avec un halo menthe en sombre seulement.

## Les trois exceptions

Le mouvement appuyé est autorisé, mais **jamais sur l'interface** — uniquement sur les
illustrations, où il raconte quelque chose :

1. **Le jeu de cartes** du slider de projets : `card-top-to-bottom` projette la carte à 200 %
   hors écran, la ramène de l'autre côté et la fait osciller en se posant. C'est une métaphore
   physique, pas une décoration.
2. **Les rafales de glitch** sur la figure en thème sombre : cycle de 9 s dont environ 7 s
   sans rien. Intermittent au point de se lire comme une ambiance. **Monochrome** — voir
   ci-dessous.
3. **Le rocher** de Sisyphe : 360° en 25 s linéaire, avec des saccades d'un demi-pixel pour
   qu'il ne soit pas parfaitement rond. À cette vitesse, c'est presque subliminal.

## Ce qui a été refusé

`index.css` contient une bibliothèque d'effets construite puis éteinte : `ascii-glitch` (la
seule aberration chromatique du projet), `scanline`, `hologram-flicker`, `data-corruption`,
`noise`, `matrix-rain`. **12 des 31 keyframes ne servent à rien**, et ce sont presque tous
les tape-à-l'œil.

Trois commentaires disent pourquoi :

> l.311 — *« No color shift — pure signal flicker. »*
> l.323 — *« Only brightness/contrast — no color drift. »*
> l.353 — *« different slice positions and timing to avoid lockstep with slice-1. »*

**Avant de proposer un effet, vérifier s'il est déjà là, éteint.** Le rallumer n'est pas une
idée neuve.

## Mouvement réduit

`prefers-reduced-motion` est respecté partout, et bien : le contenu apparaît **présent**, pas
fondu. `ScrollReveal` renvoie `{}` en position initiale — ni transformation ni opacité — et
les durées tombent à `0,01 s`. `PageTransition` supprime `initial` et `exit`, les routes
coupent net.

⚠️ La préférence est lue **une seule fois, à l'import du module**. La changer en cours de
session ne produit aucun effet. C'est un écart connu, à signaler plutôt qu'à corriger au
passage.

Toute animation neuve doit prévoir son cas réduit, dans le même esprit : présent, immobile,
pas atténué.

## Vérifier

```bash
npm run build
```

Puis à l'œil : dans les deux thèmes, et une fois avec la réduction de mouvement activée dans
le système.
