---
name: portfolio-content
description: CRUD du contenu de clembarr.dev — ajouter, modifier, lister ou supprimer un projet (retex), un article de blog, une compétence (skill), une entrée de parcours (expérience, alternance, stage, formation, certification, bénévolat), une biographie, un widget "à propos", un lien "voir aussi"/footer, un réseau social, ou importer des images de contenu. À utiliser dès qu'il faut toucher à src/assets (projects/, blog/, skills.ts, contents.ts, uiConstants.ts, projects_images/, blog_images/). Also covers: add/edit/remove a project, blog post, skill, work experience, education entry, or content image on this portfolio.
---

# Contenu du portfolio — création, modification, suppression

Le contenu de ce site est du **TypeScript typé, pas du markdown**. Un ajout touche 3 à 6
fichiers dans un ordre précis. Ce skill décrit ce chemin et les règles qu'on ne peut pas
deviner en lisant un seul fichier.

## Règles d'or

1. **Aucun texte en dur dans les composants.** Tout contenu affiché vit dans `src/assets/`
   sous forme de `MultilingualContent` : `{ [UNIVERSAL_LANG]: "…", fr: "…", en: "…" }`.
   `UNIVERSAL_LANG` vaut `"0"` et sert quand le texte est identique dans les deux langues —
   il ne remplace pas une traduction manquante, il déclare une absence de besoin.

2. **Cycle d'import.** Les fichiers de `src/assets/` importent `UNIVERSAL_LANG` depuis
   `utils/translationUtils`, **jamais** depuis `utils/assetsUtils`. `assetsUtils` importe
   `blogPosts`, donc l'importer depuis un fichier de contenu crée un cycle : la constante vaut
   `undefined` à l'évaluation et la clé devient littéralement `"undefined"`. Le bug est masqué
   par le repli `Object.values(content)[0]` de `getContent()` — il ne se voit pas à l'écran.
   `getSkill` et `wrapInMedia` viennent bien de `assetsUtils`, eux ne posent pas ce problème.

3. **Les titres et les slugs sont des clés relationnelles.** `relatedProjects: ["EEW Analyzer"]`
   et `relatedPosts: ["eew-language-biases"]` matchent sur le `title[UNIVERSAL_LANG]` d'un
   projet et le `slug` d'un article. Les renommer casse les liens en silence.

4. **Ne jamais deviner un label de skill.** `getSkill('Rsut')` **lève une erreur**. Les labels
   sont hétérogènes (`Typescript`, `Cpp`, `C#`, `.NET`, `VSCode`, `SQL Server`, `PL/SQL`).
   Toujours lire la liste réelle via `inventory.js` avant d'écrire un `tools: [...]`.

5. **Styles** : réutiliser `src/style.tsx` avant d'écrire une classe Tailwind.

## Nomenclature

| Couche | Convention | Exemple |
|---|---|---|
| Fichier de données | kebab-case | `dummy-arrays.ts`, `eew-analyzer.ts` |
| Export de données | camelCase, acronymes capitalisés | `dummyArrays`, `customCNN`, `scalewayDeployment` |
| Fichier image | snake_case **préfixé projet** | `custom_cnn_archi.webp` |
| Import d'image | = nom du fichier sans extension | `import custom_cnn_archi from …` |
| Export `ProjectMedia` | camelCase du même nom | `customCNNArchi`, `customCNNIRL` |
| Icône (`GraphicAsset`) | `<nom>_icon` en snake_case | `pandas_icon` |
| Logo d'organisation | PascalCase | `CGILogo`, `NagoyaULogo` |
| `slug` | kebab-case ASCII minuscule | `eew-language-biases` |

Deux fichiers existants dérogent (`custom_cnn.ts`, `ecc_sae.ts`) : ne pas s'en inspirer, ne pas
les renommer non plus.

⚠️ Les objets `projectsImages` et `projectsMedia` sont **`@deprecated`**. Importer les exports
nommés individuels (`import { customCNNArchi } from '../projects_images'`) et ne rien ajouter
à ces deux objets, même si les fichiers existants les utilisent encore.

## Où aller selon la demande

| La demande porte sur… | Lire |
|---|---|
| projet, retex, réalisation | `references/projects.md` |
| article, blog, post | `references/blog.md` |
| compétence, skill, techno, outil | `references/skills.md` |
| expérience, alternance, stage, diplôme, certification, bénévolat | `references/career.md` |
| bio, "à propos", langues parlées, hobbies, lien "voir aussi", footer, réseau social | `references/misc.md` |
| image, capture, vidéo, illustration | `references/media.md` |
| supprimer quoi que ce soit | `references/delete.md` |

**Ne charger que le fichier concerné.**

## Déroulé

### 1. Inventaire — toujours en premier

```bash
node .claude/skills/portfolio-content/scripts/inventory.js [projects|blog|skills|career|media]
```

Donne les titres exacts, slugs pris, labels de skills valides et médias réutilisables. Sans ça,
on invente des identifiants qui ne compilent pas ou qui cassent des liens.

### 2. Questions — groupées, en un seul tour

Chaque fichier de référence liste les champs obligatoires et optionnels du type concerné.
Poser **toutes** les questions manquantes d'un coup, avec des valeurs par défaut proposées.

**Ne jamais rédiger le contenu éditorial à la place de l'utilisateur** — descriptions, specs,
paragraphes d'article. Proposer une reformulation ou une traduction fr↔en de ce qu'il a fourni,
oui ; inventer ce qu'il a fait, non.

### 3. Médias

```bash
bash .claude/skills/portfolio-content/scripts/add-media.sh <projects|blog> <prefixe> <fichier...>
```

Convertit en WebP, place le fichier au bon nom, et affiche les 2 fragments à insérer dans
`index.ts`. L'insertion se fait par édition, pas par le script. Chaque média a besoin d'un
`alt` rédigé : le validateur bloque sur un `alt` vide.

### 4. Écriture

Fichier de données **puis** enregistrement dans le barrel `index.ts` (tableau **et** export
nommé — les deux, l'oubli du second ne casse rien visiblement mais rompt l'accès direct).

### 5. Vérification — obligatoire avant de rendre la main

```bash
bash .claude/skills/portfolio-content/scripts/check.sh          # complet
bash .claude/skills/portfolio-content/scripts/check.sh --fast   # sans build de prod
```

Enchaîne lint du contenu, validation des données, sitemap et build. Le lint global du dépôt est
rapporté pour information : il porte des erreurs préexistantes hors contenu, il ne bloque pas.

Rapporter à l'utilisateur ce qui a été ajouté, les fichiers touchés, et les avertissements
restants. Ne pas committer : le skill s'arrête là.

## Validation

`src/assets/dataConsistency.ts` contrôle tout le contenu. Il tourne automatiquement dans la
console en `npm run dev`, et en ligne de commande via `npm run validate`.

- **Erreurs** (bloquantes) : lien cassé, champ obligatoire absent, `alt` vide, label de skill
  inconnu, slug dupliqué, catégorie invalide.
- **Avertissements** : traduction manquante, URL brute sans `alt`, slug hors kebab-case,
  `readingTime` absent.

Le dépôt part de **0 erreur et 33 avertissements**. Ne pas faire monter le nombre d'erreurs ;
si un ajout produit un avertissement, le mentionner à l'utilisateur.

En ajoutant un champ ou un type de contenu, **étendre le validateur en conséquence** — c'est
lui qui rend le CRUD sûr.
