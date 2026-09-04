# Compétences (skills)

Fichier : `src/assets/skills.ts` — tableau `skills`
Icônes : `src/assets/skills_icons/` — **deux SVG obligatoires, light et dark**

Une compétence ajoutée devient immédiatement utilisable dans `getSkill('Label')` depuis les
projets, et apparaît dans la SkillGalaxy et les filtres.

## Questions à poser

**Obligatoire** — label (casse exacte, c'est la clé de lookup) · catégorie · icône light + dark.

**Optionnel** — sous-catégorie · framework parent · lien officiel · poids (0-10, influence la
taille du nœud dans la visualisation).

Catégories (`AvailableSkillCategories`) : `LANGUAGE` · `TOOL` · `LIBRARY`
Sous-catégories (`AvailableSkillSubcategories`) : `WEB` · `SOFTWARE` · `DATABASE` · `BIGDATA` · `FORMATING`

## Structure

```ts
{
  label: "Svelte",                       // CLE de lookup, casse exacte
  icon: skillsIcons.svelte_icon,
  category: skillCategories.find((category) => category.context === AvailableSkillCategories.LANGUAGE)!,
  subcategory: skillSubcategories.find((subcategory) => subcategory.context === AvailableSkillSubcategories.WEB)!,
  framework: "Javascript",               // doit etre un label de skill existant
  link: 'https://svelte.dev/',
  weight: 7,
}
```

Le `.find(...)!` renvoie `undefined` silencieusement si le `context` est mal écrit — le
validateur détecte le cas (`Category could not be resolved`).

## Ajouter l'icône

Deux fichiers SVG, snake_case minuscule :

```
src/assets/skills_icons/svelte_icon_light.svg
src/assets/skills_icons/svelte_icon_dark.svg
```

Puis trois insertions dans `src/assets/skills_icons/index.ts` :

```ts
import svelte_light from "./svelte_icon_light.svg";     // 1. imports
import svelte_dark from "./svelte_icon_dark.svg";

export const svelte_icon: GraphicAsset = {              // 2. GraphicAsset (snake_case)
  label: "Svelte",
  content: { 'light': svelte_light, 'dark': svelte_dark },
  alt: "Svelte Icon",
};

export const skillsIcons = { …, svelte_icon };          // 3. objet agrege
```

Si une seule variante existe, dupliquer la même source sur les deux thèmes — c'est ce que fait
`CGILogo`. Les deux clés sont obligatoires, le ThemeEngine les lit par nom.

## Pièges

- **Les labels sont hétérogènes** : `Typescript` (s minuscule), `Cpp`, `C#`, `.NET`, `VSCode`,
  `SQL Server`, `PL/SQL`, `CustomTK`, `HuggingFace`. Lire `inventory.js skills` avant d'écrire.
- Deux labels ne différant que par la casse : `getSkill()` est sensible à la casse, le
  validateur émet un avertissement.
- `parentCategory` des sous-catégories vaut `LANGUAGE` partout et **n'est lu par aucun
  composant**. Pandas/Numpy (LIBRARY + BIGDATA) déclenchent un avertissement informatif — c'est
  attendu, ne pas « corriger ».
- Retirer une compétence casse tout projet qui l'utilise via `getSkill()` : vérifier d'abord
  avec `grep -rn "getSkill('Label')" src/assets/projects/`.

## Vérifier

```bash
node .claude/skills/portfolio-content/scripts/inventory.js skills
bash .claude/skills/portfolio-content/scripts/check.sh --fast
```
