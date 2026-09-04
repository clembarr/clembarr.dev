# Images et vidéos de contenu

| Dossier | Pour |
|---|---|
| `src/assets/projects_images/` | captures et schémas de projets (et, historiquement, d'articles) |
| `src/assets/blog_images/` | illustrations purement éditoriales — **vide aujourd'hui** |
| `src/assets/illustrations/` | visuels de l'interface (hero, fonds, portraits) — hors CRUD contenu |
| `src/assets/skills_icons/`, `orga_icons/`, `socials_icons/` | icônes `GraphicAsset` — via `add-icon.sh`, cf. `skills.md` / `career.md` |
| `src/assets/menu_icons/` | icônes d'interface — hors CRUD contenu |

## Import assisté

Deux scripts selon la nature du média :

```bash
# images de contenu -> ProjectMedia
bash .claude/skills/portfolio-content/scripts/add-media.sh <projects|blog> <prefixe> <fichier...>

# icones et logos -> GraphicAsset (light + dark)
bash .claude/skills/portfolio-content/scripts/add-icon.sh <orga|skills|socials> <nom> <fichier...>
```

`add-media.sh` :

- convertit PNG/JPG/TIF/BMP en **WebP qualité 82** (ImageMagick) ;
- copie SVG, MP4, GIF et WebP sans conversion ;
- renomme en `<prefixe>_<sujet>.<ext>`, snake_case minuscule ;
- affiche les **2 fragments** à insérer dans `index.ts`.

`add-icon.sh` convertit de même, mais **laisse les SVG en SVG** (les vectoriser en WebP leur
ferait perdre leur scalabilité), gère la paire light/dark, et produit un `GraphicAsset` — en
PascalCase pour `orga_icons` (`ESIEALogo`), en snake_case `<nom>_icon` pour les deux autres.

Aucun des deux n'édite le TypeScript : les fragments sont appliqués par édition.

## Nomenclature

| | Convention | Exemple |
|---|---|---|
| Fichier | `<prefixe_projet>_<sujet>.webp` | `custom_cnn_archi.webp` |
| Import | nom du fichier sans extension | `custom_cnn_archi` |
| Export | camelCase, acronymes capitalisés | `customCNNArchi`, `customCNNIRL` |

Le préfixe regroupe tous les médias d'un projet : `dummy_arrays`, `custom_cnn`, `ecc`, `eew`,
`gpgtool`, `ecograph`, `mstar`, `votator`, `scaleway`, `veridisquo`.

## Enregistrement

Dans le `index.ts` du dossier :

```ts
import custom_cnn_archi from "./custom_cnn_archi.webp";      // 1. import

export const customCNNArchi: ProjectMedia = {                // 2. export nomme
    url: custom_cnn_archi,
    type: MediaType.IMAGE,                                   // ou VIDEO pour un .mp4
    alt: "Schema d'architecture du CNN, detaillant les blocs spatial et frequentiel."
}
```

⚠️ **Ne rien ajouter aux objets `projectsImages` et `projectsMedia`** : ils sont annotés
`@deprecated` (`projects_images/index.ts`). Les fichiers existants les utilisent encore
(`dummy-arrays.ts`, `eew-lang-biases.ts`) — c'est de la dette, pas un modèle.

## Le `alt` est obligatoire

Le validateur **bloque** sur un `alt` vide. Il doit décrire ce que montre l'image pour
quelqu'un qui ne la voit pas — pas « capture du projet », mais ce qu'on y lit.
À rédiger avec l'utilisateur, comme le reste du contenu éditorial.

Une image passée en **chaîne d'URL brute** (au lieu d'un `ProjectMedia`) reste acceptée pour
compatibilité mais déclenche un avertissement : elle ne porte aucun `alt`. C'est l'origine de
la majorité des 33 avertissements actuels.

## Vidéos

`type: MediaType.VIDEO`, fichier `.mp4` copié tel quel. Champ `poster` optionnel pour la
vignette. Exemples : `veridisquoOutput`, `customCNNDemo`.

Le cache PWA plafonne à 10 Mo par fichier (`vite.config.ts`) — au-delà, l'asset n'est pas
préchargé hors ligne.

## Audit

```bash
node .claude/skills/portfolio-content/scripts/orphans.js
```

Signale les fichiers présents mais non importés, les imports vers un fichier absent, et les
exports `ProjectMedia` que plus rien ne référence dans `src/`. Rapport consultatif : un média
inutilisé peut être volontaire.
