# Sections et pages

Composant : `src/components/sections/<Nom>.tsx` — PascalCase
Barrel : `src/components/sections/index.ts` — **import en haut ET export nommé en bas**
Montage : le JSX d'une page dans `src/pages/`
Ancre : `id` du composant ↔ `navLinks` dans `src/assets/uiConstants.ts`

Il n'existe **aucun registre de sections**. La composition est du JSX écrit à la main dans
la page. Rien ne se branche automatiquement, et rien ne signale un oubli.

## Anatomie d'un ajout de section

Quatre fichiers, dans cet ordre :

1. **Le composant** dans `src/components/sections/`. Son élément racine porte
   `id="<ancre>"` en kebab-case si la section doit être atteignable depuis le menu.
2. **Le barrel** `src/components/sections/index.ts` : un `import` en haut, une entrée dans
   l'objet `export { … };` en bas. Les deux, sinon l'import depuis la page échoue.
3. **La page** qui le monte, dans `src/pages/`.
4. **`navLinks`** dans `src/assets/uiConstants.ts` si la section a une ancre.

## Le patron de montage

`src/pages/Home.tsx` est le modèle. Chaque section est enveloppée dans un `ScrollReveal`,
puis dans un conteneur qui porte le nom de la section suffixé `-container` :

```tsx
<ScrollReveal direction="up" delay={0.3}>
    <div id="testimonials-container"
        className={`
            ${styles.sectionContainer}
            overflow-visible
        `}
    > <Testimonials /> </div>
</ScrollReveal>
```

`ScrollReveal` prend `direction` (`'up' | 'down' | 'left' | 'right' | 'none'`) et `delay`
en secondes. Sur Home, les délais sont échelonnés de 0.2 à 0.4 pour décaler les apparitions.

**Deux `id` différents cohabitent** : celui du conteneur (`testimonials-container`, purement
structurel) et celui de l'élément racine du composant (`testimonials`, la cible de l'ancre).
Ne pas les confondre — c'est le second que `navLinks` vise.

Une section lourde se charge à la demande :

```tsx
const Testimonials = lazy(() => import("../components/sections/Testimonials"));
// puis, au montage :
<Suspense fallback={<SuspenseFallback />}><Testimonials /></Suspense>
```

## L'ancre est le seul lien entre le menu et la section

`navLinks` (`src/assets/uiConstants.ts`) est un tableau de `NavbarPattern`, un par famille
de routes. Une entrée du menu :

```ts
{
    content:
    {
        fr: "Témoignages",
        [UNIVERSAL_LANG]: "Testimonials",
    },
    link: "/#testimonials",
},
```

Le `"/#testimonials"` doit correspondre **exactement** à l'`id` de l'élément racine du
composant. Aucune vérification, ni à la compilation ni à l'exécution : un décalage donne un
lien de menu qui ne fait rien.

⚠️ Dans `navLinks`, **l'anglais est stocké sous `[UNIVERSAL_LANG]`, pas sous `en`** — c'est
le repli par défaut. Suivre cette convention plutôt que d'écrire une clé `en`.

`getCurrentNavigation()` (`src/utils/utils.ts`) surligne l'entrée courante en comparant
`window.location.hash` au lien. Un `id` qui ne correspond à aucun lien n'est jamais surligné.

## Ajouter une page

1. Le composant dans `src/pages/`, enveloppé dans `<PageTransition>`.
2. Le barrel `src/pages/index.tsx` — import puis `export { … }`.
3. **La route dans `src/components/AnimatedRoutes.tsx`**, seul endroit où les routes
   existent. `<Route path="/…" element={<MaPage />} />`, avant la route attrape-tout
   `path="/*"`.
4. Les constantes SEO dans `src/assets/seoConstants.ts`, sur le modèle de
   `HomeSEOConstants` (`title`, `description`, `keywords`, `ogUrl`, `canonical`).
5. `<MetaTags {...}/>` et `<StructuredData schema={[…]} />` en tête du JSX de la page.
6. **`staticPages` dans `scripts/generate-sitemap.js:21`** — les routes statiques y sont
   écrites à la main. Seuls les articles de blog sont découverts automatiquement.

## Pièges

- **Un composant ajouté sans son export de barrel** compile, mais n'est importable qu'en
  chemin profond. Cela casse la convention d'import du dépôt sans erreur visible.
- **Une nouvelle route ne sera pas dans le sitemap** tant qu'elle n'est pas dans
  `staticPages`.
- **Sur GitHub Pages, un lien profond vers une nouvelle route renvoie 404 à froid** : il n'y
  a pas de `public/404.html` de repli. La navigation interne fonctionne, l'accès direct non.
  Le signaler à l'utilisateur si la route doit être partagée.
- **La vue projet (retex) n'est pas une route** : c'est une modale pilotée par
  `RetexDisplayEngine`, et `Layout.tsx` masque navbar et footer quand un retex est affiché.
  Ne pas chercher de route à modifier pour la changer.
- **Ne pas écrire de texte dans le composant.** Toute chaîne visible vient de
  `src/assets/`, indexée par la langue courante. Le dépôt n'a aujourd'hui zéro chaîne en
  dur dans `components/` et `pages/` : ne pas être le premier à en introduire une.

## Vérifier

```bash
npm run lint && npm run build && npm run sitemap
```

Puis, à l'œil : l'ancre du menu descend bien sur la section, dans les deux thèmes et les
deux langues.
