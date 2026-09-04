# Projets (retex)

Fichier : `src/assets/projects/<nom-projet>.ts` — kebab-case
Export : `export const <camelCase>: Retex` — acronymes capitalisés (`customCNN`)
Barrel : `src/assets/projects/index.ts` — **tableau `projects` ET export nommé**

## Questions à poser (en un seul tour)

**Obligatoire** — titre (sert de clé relationnelle, Title Case) · date (mois + année) ·
description courte fr/en · specs (le récit détaillé, fr/en, HTML autorisé) · notions acquises
(liste fr/en) · outils (labels de skills existants) · images.

**Optionnel** — tags fr/en/universel · projet favori (★ sur la home) · ressources externes
(dépôt GitHub, article, démo) · article de blog lié.

## Structure

```ts
import { Retex } from '../dataTypes';
import { UNIVERSAL_LANG } from '../../utils/translationUtils';
import { getSkill } from '../../utils/assetsUtils';
import { monProjetSchema, monProjetBench } from '../projects_images';

export const monProjet: Retex = {
  // --- Metadata : utilisees par les listings et le slider ---
  title: { [UNIVERSAL_LANG]: "Mon Projet" },   // CLE RELATIONNELLE
  date: new Date(2026, 0),                     // mois 0-indexe : 0 = janvier
  coverImage: monProjetSchema,                 // doit faire partie de content.images
  tags: {
    fr: ["Optim.", "Académique"],
    en: ["Optim.", "Academic"],
    [UNIVERSAL_LANG]: ["Rust", "Algo"],        // termes identiques dans les deux langues
  },
  description: { fr: "…", en: "…" },           // 2-3 lignes, affichee dans les cartes
  favorite: true,                              // optionnel

  // --- Content : charge uniquement a l'ouverture du retex ---
  content: {
    specs: { fr: "…<strong>…</strong>…", en: "…" },
    notions: { fr: ["…"], en: ["…"] },
    tools: [getSkill('Rust'), getSkill('Git')],  // labels EXACTS, cf. inventory.js
    images: [monProjetSchema, monProjetBench],
    additionalRessources: [                      // optionnel
      { content: { fr: "Répo GitHub", en: "GitHub Repo" }, link: "https://…" },
    ],
    relatedPosts: ["mon-article-slug"],          // optionnel, slug d'article existant
  }
};
```

`src/assets/projects/dummy-arrays.ts` est le meilleur modèle : compact et complet.

## Enregistrement dans le barrel

Trois endroits dans `src/assets/projects/index.ts` :

```ts
import { monProjet } from './mon-projet';        // 1. import
export const projects: Retex[] = [ …, monProjet ]; // 2. tableau
export { …, monProjet };                          // 3. export nomme
```

**L'ordre du tableau est l'ordre d'affichage par défaut**, et il est **curaté, pas
chronologique** — le commentaire « ordered by date » du fichier ne décrit pas la réalité
(VeridisQuo 2025-11 est premier, Custom CNN 2026-01 neuvième). L'utilisateur trie ensuite par
NEWEST/OLDEST dans l'interface. **Demander où insérer le projet** plutôt que de supposer.

## Pièges

- **Mois 0-indexé** : `new Date(2026, 0)` = janvier 2026.
- `coverImage` doit figurer dans `content.images`, sinon avertissement du validateur.
- `getSkill()` lève une erreur sur un label inconnu → si l'outil manque, ajouter d'abord la
  compétence (`references/skills.md`), ce qui demande une icône light **et** dark.
- Les chaînes multilignes utilisent `\` en fin de ligne : l'indentation suivante entre dans la
  chaîne. C'est sans effet visuel en HTML, mais ne pas ajouter d'espaces superflus.
- Importer `UNIVERSAL_LANG` depuis `translationUtils`, jamais depuis `assetsUtils`.

## Vérifier

```bash
bash .claude/skills/portfolio-content/scripts/check.sh
```
