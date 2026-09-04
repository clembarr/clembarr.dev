# Bio, widgets, liens et réseaux sociaux

Tout est dans `src/assets/contents.ts`, sauf les réseaux sociaux (`uiConstants.ts`) et le SEO
(`seoConstants.ts`).

## Biographie — `bioText`

```ts
{
  title:   { fr: "Explorer, créer et partager.", en: "Explore, create and share." },
  content: { fr: "…<strong>…</strong>…", en: "…" },
  active: true,        // une seule entree active a la fois
}
```

Le tableau sert de réserve de variantes : **une seule doit avoir `active: true`**, c'est celle
qui est rendue. Le validateur bloque s'il n'y en a aucune, avertit s'il y en a plusieurs.

## Widgets « à propos » — `aboutWidgets`

L'`id` est une clé technique (clé React et handle de lookup) : unique, en kebab-case.
Le champ `content` accepte **trois formes** selon le widget :

```ts
{ id: "currently", title: {…}, content: { fr: "texte", en: "text" } }              // texte
{ id: "hobbies",   title: {…}, content: { fr: ["Natation"], en: ["Swimming"] } }   // liste
{ id: "lang",      title: {…}, content: [                                          // langues
    { label: { fr: "🇫🇷 Français", en: "🇫🇷 French" }, level: { fr: "Natif", en: "Native" } },
]}
```

Widgets actuels : `currently` · `future` · `hobbies` · `interests` · `lang`.

## Liens « voir aussi » — `sharedLinks`

Affichés dans la colonne footer `see-also`. `prioritized: true` remonte le lien en tête.

```ts
{
  content: { fr: "Théo, développeur d'IA génératives", en: "Théo, generative AI developer" },
  link: "https://tcastillo.me",
  prioritized: true,      // optionnel
}
```

## Colonnes de footer — `footerColumns`

Trois colonnes, discriminées par `context` (`navigation`, `credits`, `see-also`) que
`Footer.tsx` lit pour choisir le rendu. Leur `content` pointe vers `navLinks`,
`creditsMentions` (tous deux dans `uiConstants.ts`) et `sharedLinks`. **Ajouter une colonne
demande de gérer son `context` dans `Footer.tsx`** — ce n'est pas un simple ajout de données.

## Réseaux sociaux — `uiConstants.ts` → `socialMedia`

```ts
{ label: "github", icon: socialsIcons.github_icon, link: "https://github.com/clembarr", at: "@clembarr" }
```

Le `label` est **en minuscules** ici (`mail`, `github`, `linkedin`) — c'est un identifiant
technique, pas un affichage. `at` est la mention lisible (`@clembarr`, ou l'adresse complète
pour `mail`), `link` l'URL cliquable (`mailto:` pour le courriel).

Icônes dans `src/assets/socials_icons/` : `<réseau>_icon_light.svg` + `_dark.svg`, mêmes règles
que les icônes de skills (cf. `references/skills.md`).

## SEO — `seoConstants.ts`

Un objet `SEOConstants` par page — `HomeSEOConstants`, `ProjectSEOConstants`,
`BlogSEOConstants` (`title`, `description`, `keywords`, `ogUrl`, `canonical`). À mettre à jour
si une nouvelle route publique apparaît.

Les articles et projets individuels n'ont **pas** de constante propre : leur JSON-LD est
généré à la volée par `generateBlogPostSchema(post)` et `generateProjectSchema(project)` à
partir des données du contenu. Rien à faire de plus en ajoutant un article.

## Vérifier

```bash
bash .claude/skills/portfolio-content/scripts/check.sh --fast
```
