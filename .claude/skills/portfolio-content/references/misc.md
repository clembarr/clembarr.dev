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

Affichés dans la ligne footer `see-also`, tirés au hasard et plafonnés à
`FOOTER_SEE_ALSO_COUNT` (`uiConstants.ts`, 4). `prioritized: true` remonte le lien en tête.

```ts
{
  content: { fr: "Théo, développeur d'IA génératives", en: "Théo, generative AI developer" },
  link: "https://tcastillo.me",
  prioritized: true,      // optionnel
}
```

## Lignes de footer — `footerColumns`

Deux lignes horizontales (titre puis liens), discriminées par `context` (`navigation`,
`see-also`) que `Footer.tsx` lit pour choisir le rendu. Leur `content` pointe vers `navLinks`
(`uiConstants.ts`) et `sharedLinks`. **Ajouter une ligne demande de gérer son `context` dans
`Footer.tsx`** — ce n'est pas un simple ajout de données.

## Crédits — `uiConstants.ts` → `creditsMentions`

Listés par la page `/credits` (`src/pages/Credits.tsx`), une ligne par entrée : le nom, puis
le domaine de `link` en lien externe — un lien vers une page de recherche affichera donc
`google.com`, préférer l'URL de la source réelle.
Le footer n'en garde qu'un lien, `creditsLink` (`uiConstants.ts`), dont le libellé sert aussi
de titre à la page. `link` est la source créditée ; à défaut, le lien retombe sur la première
image de `contentRef` dans le thème actif.

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
