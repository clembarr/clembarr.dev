# Articles de blog

Fichier : `src/assets/blog/<slug>.ts` — kebab-case, **identique au `slug`**
Export : `export const <camelCase>: BlogPost`
Barrel : `src/assets/blog/index.ts` — **tableau `blogPosts` ET export nommé**
URL publique : `/blog/<slug>` — reprise automatiquement dans le sitemap

## Questions à poser (en un seul tour)

**Obligatoire** — titre fr/en · slug · date · catégorie · description fr/en · image de
couverture · paragraphes (titre + contenu, fr/en).

**Optionnel** — tags · temps de lecture en minutes · table des matières (`tableOfContents`) ·
projets liés · images illustrant le corps de l'article.

Catégories disponibles (`BlogCategory`) : `RESEARCH` · `DEVELOPMENT` · `TUTORIAL` ·
`ALGORITHM` · `OPINION`.

## Structure

```ts
import { BlogPost, BlogCategory } from '../dataTypes';
import { UNIVERSAL_LANG } from '../../utils/translationUtils';   // PAS assetsUtils
import { monArticleCover, monArticleSchema } from '../projects_images';

export const monArticle: BlogPost = {
  slug: "mon-article",                       // = nom du fichier, kebab-case ASCII
  title: { [UNIVERSAL_LANG]: "…", fr: "…" },
  description: { [UNIVERSAL_LANG]: "…", fr: "…" },
  tags: { [UNIVERSAL_LANG]: ["LLM", "ALife"], fr: ["LLM", "Vie artificielle"] },
  coverImage: monArticleCover,
  img: [monArticleSchema],                   // images citees dans le corps
  date: new Date(2026, 2, 14),               // mois 0-indexe
  category: BlogCategory.RESEARCH,
  readingTime: 12,                           // minutes
  tableOfContents: true,
  paragraphs: [
    {
      title: { [UNIVERSAL_LANG]: "Introduction" },
      content: { [UNIVERSAL_LANG]: "…<br>…", fr: "…" },
    },
  ],
  relatedProjects: ["EEW Analyzer"],         // titre EXACT d'un projet existant
};
```

## Contenu des paragraphes

`content` accepte du **HTML en chaîne**, rendu après passage par `DOMPurify` :
`<strong>`, `<em>`, `<br>`, `<ul>/<li>`, `<a href>`, `<code>`, `<pre>`.

Prism.js colore les blocs de code (thème VS Code Dark Modern) — langages préchargés :
javascript, typescript, jsx, tsx, python, css, json, bash, sql.

Si `tableOfContents: true`, les entrées sont construites à partir des `title` de paragraphes :
un paragraphe sans titre n'apparaît pas dans le sommaire.

## Enregistrement dans le barrel

```ts
import { monArticle } from './mon-article';
export const blogPosts: BlogPost[] = [ monArticle, … ];  // plus recent en premier
export { …, monArticle };
```

`src/assets/blog/index.ts` contient aussi un **template vide en commentaire** en fin de fichier.

## Sitemap

`scripts/generate-sitemap.js` relit les fichiers de `src/assets/blog/` et extrait `slug` et
`date` **par regex**, sans compiler. Deux conséquences :

- la date doit garder la forme littérale `new Date(2026, 2, 14)` — une date calculée ou
  importée d'une constante ne sera pas détectée ;
- un fichier sans `slug` est ignoré en silence.

`npm run sitemap` après tout ajout ou suppression d'article (inclus dans `check.sh`).

## Pièges

- **Le fichier existant `eew-lang-biases.ts` porte le slug `eew-language-biases`** : divergence
  historique, ne pas la reproduire. Ne pas la corriger non plus, l'URL est publique et indexée.
- Importer `UNIVERSAL_LANG` depuis `translationUtils` — `eew-lang-biases.ts` utilisait
  `assetsUtils`, ce qui produisait une clé `"undefined"` (corrigé).
- `relatedProjects` référence le **titre** d'un projet, `relatedPosts` (côté projet) référence
  un **slug**. Les deux sens sont indépendants : renseigner celui qu'on veut voir affiché.
- Les images d'articles peuvent vivre dans `projects_images/` (c'est le cas de l'article
  existant) ou dans `blog_images/`. Préférer `blog_images/` pour un contenu purement éditorial.

## Vérifier

```bash
bash .claude/skills/portfolio-content/scripts/check.sh
grep "<loc>" public/sitemap.xml     # le nouveau slug doit apparaitre
```
