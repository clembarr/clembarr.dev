# Iconographie et récit

Illustrations : `src/assets/illustrations/` — registre `index.tsx`
Icônes : `skills_icons/`, `menu_icons/`, `socials_icons/`, `orga_icons/`
Import technique des médias : `portfolio-content/references/media.md`

Trois familles d'images cohabitent, chacune avec sa loi. Une image neuve appartient à l'une
d'elles ou n'appartient pas au site.

## 1. Le dessin à l'encre

`sysiphus_working.png`, `sysiphus_working_2.png`, `sysiphus_boulder.png`,
`career_figure_*.webp`.

Trait griffé, hachures visibles, tramé grossier, **monochrome**, sur fond transparent. Ce
sont des dessins de main, avec leurs irrégularités. La version sombre n'est pas une autre
œuvre : c'est le même dessin **recoloré en menthe**.

Le rocher est dessiné **séparément** du pousseur, ce qui permet de l'animer seul
(`boulder-roll`, 25 s linéaire, `origin-[69.5%_32.8%]`). Une figure destinée à bouger se
découpe en calques dès le dessin.

## 2. La photographie de nuages

`background_landscape_light.webp` / `_dark.webp`.

Une mer de cumulus **vue de dessus**. Presque blanche et désaturée en clair, nuit d'orage en
sombre — la même formation, deux heures du jour. Elle est posée sur le `body` en
`background-size: cover` et `repeat-y`, sous un voile à 92–97 %.

C'est le sol du site et sa seule photographie d'ambiance. **Ne pas en ajouter une seconde** :
deux fonds photographiques se disputeraient la même fonction.

## 3. Le portrait

`about_portrait_light.jpg` / `_dark.jpg`. Une seule photo de personne sur tout le site :
studio, fond bleu-gris, costume sombre, regard direct dans l'objectif. Sobre, frontale, sans
mise en scène.

## Le hero est l'exception qui dit la vision

`index.tsx:10` importe le hero clair depuis **`sysiphus_working.png`** — le croquis à l'encre.
Le hero sombre est `hero_figure_dark.webp`, un **visage composé de caractères
typographiques**, en menthe.

Ce ne sont donc **pas deux versions d'une même image**, contrairement à toutes les autres
paires : ce sont deux œuvres différentes sur le même sujet, l'une faite à la main, l'autre
faite de langage. C'est le seul endroit où le site s'autorise cela, et c'est ce qui porte sa
thèse.

⚠️ `hero_figure_light.webp` existe sur le disque et **n'est importé nulle part**. Ne pas s'en
servir en croyant réparer un oubli sans demander.

## La loi du théme-pairing

**Tout ce que l'auteur contrôle est décliné clair/sombre. Ce qui appartient à un tiers ne
l'est pas.**

| Dossier | Paires | Règle |
|---|---|---|
| `skills_icons/` | 41 paires, 82 fichiers, **zéro exception** | `<techno>_icon_<theme>.svg` — chaque logo redessiné pour les deux thèmes, jamais un `filter: invert()` |
| `menu_icons/` | 6 paires | idem |
| `socials_icons/` | 3 paires | idem |
| `orga_icons/` | **aucune paire** | Logos d'écoles et d'entreprises, pris tels que fournis, compensés par `opacity-80` au rendu |

Ne pas inverser de force la marque de quelqu'un d'autre. Le retrait d'opacité est la réponse
honnête, et elle est déjà en place.

## Créer une figure qui appartient à la famille

1. **Choisir sa famille** — encre, photo de ciel, ou rien. Il n'y a pas de quatrième voie.
2. **Encre** : trait visible, hachures, monochrome, fond transparent, PNG. Découper en
   calques ce qui devra bouger.
3. **Décliner** : la version sombre est la même forme recolorée en `#7CFFC4`, pas un autre
   dessin — sauf à assumer l'exception du hero, ce qui se demande.
4. **Écrire un `alt` qui décrit ce qu'on voit**, pas « illustration du projet ».
5. **Importer** via `portfolio-content/references/media.md` — conversion, nommage, registre.

Ce qui n'appartient pas : l'aplat vectoriel plat, l'icône de bibliothèque générique en guise
d'illustration, la photo de banque d'images, la 3D, le dégradé décoratif.

## Vérifier

```bash
node .claude/skills/portfolio-content/scripts/orphans.js
```

Puis à l'œil, dans les deux thèmes : la figure tient-elle sur le fond nuageux clair **et** sur
le fond d'orage ?
