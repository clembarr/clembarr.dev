# Supprimer du contenu

La suppression est l'opération la plus risquée : les liens entre contenus sont des **chaînes
de caractères**, pas des références typées. Retirer un projet ne provoque aucune erreur de
compilation chez ceux qui le citent.

**Toujours passer par l'analyse d'impact avant de supprimer.**

## 1. Analyse d'impact

```bash
node .claude/skills/portfolio-content/scripts/inventory.js
grep -rn "<titre ou slug exact>" src/
```

Ce qui peut pointer vers l'élément supprimé :

| Élément supprimé | Références à nettoyer |
|---|---|
| Projet | `relatedProjects: ["Titre"]` dans les articles · son entrée de barrel · ses images |
| Article | `relatedPosts: ["slug"]` dans les projets · son entrée de barrel · `public/sitemap.xml` |
| Compétence | `getSkill('Label')` dans les projets — **casse au runtime** · `framework: "Label"` d'une autre compétence · son icône |
| Image | ses usages dans `coverImage`, `images`, `img` |
| Entrée de parcours | son logo dans `orga_icons` s'il n'est plus utilisé |

Confirmer avec l'utilisateur ce qui doit être supprimé et ce qui doit être re-pointé ailleurs.

## 2. Retirer les données

Dans le barrel `index.ts`, **trois** endroits — l'import, le tableau, l'export nommé. Oublier
l'export nommé ne casse rien de visible mais laisse une référence morte.

Puis supprimer le fichier de données lui-même.

## 3. Nettoyer les médias

```bash
node .claude/skills/portfolio-content/scripts/orphans.js
```

Pour chaque média devenu orphelin : retirer l'import et l'export `ProjectMedia` de `index.ts`,
puis supprimer le fichier. Demander avant — une image peut être gardée pour un contenu à venir.

## 4. Vérifier

```bash
bash .claude/skills/portfolio-content/scripts/check.sh
node .claude/skills/portfolio-content/scripts/orphans.js
git status
```

`check.sh` régénère le sitemap : après suppression d'un article, son URL doit avoir disparu de
`public/sitemap.xml`.

## Cas particulier : une URL publique disparaît

Supprimer un article retire `/blog/<slug>`, qui peut être indexé ou partagé. Le signaler à
l'utilisateur et proposer l'alternative : garder l'article et le retirer seulement des
listings, plutôt que le supprimer.
