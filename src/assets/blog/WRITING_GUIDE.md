# Guide de rédaction des articles de blog

Les articles sont des objets TypeScript `BlogPost` dans `src/assets/blog/`.
Le contenu est du **HTML inline** dans les strings `content`, stylisé automatiquement par le plugin `@tailwindcss/typography` (classes `prose`).

---

## Structure d'un article

```ts
import { BlogPost, BlogCategory } from '../dataTypes';
import { UNIVERSAL_LANG } from '../i18n';

export const monArticle: BlogPost = {
  slug: "mon-article",                        // URL : /blog/mon-article
  title: {
    [UNIVERSAL_LANG]: "English Title",
    fr: "Titre Français",
  },
  description: {
    [UNIVERSAL_LANG]: "Short description for cards and SEO.",
    fr: "Description courte pour les cards et le SEO.",
  },
  tags: {
    [UNIVERSAL_LANG]: ["Tag1", "Tag2"],
  },
  img: [imgRef1, imgRef2],                     // images référençables par [[image x]]
  coverImage: imgRef1,                         // optionnel, affiché en haut de l'article
  date: new Date(2025, 0, 15),                 // mois 0-indexé (0 = janvier)
  category: BlogCategory.ALGORITHM,            // RESEARCH | DEVELOPMENT | TUTORIAL | ALGORITHM | OPINION
  readingTime: 7,                              // en minutes, calculé manuellement (~200 mots/min)
  paragraphs: [ /* ... */ ],
  tableOfContents: { /* ... */ },              // optionnel
};
```

---

## Rédiger les paragraphs

Chaque entrée du tableau `paragraphs` est une section de l'article :

```ts
{
  context: "Titre de la section",   // rendu comme <h2>, sert aussi d'ancre pour la TOC
  content: {
    [UNIVERSAL_LANG]: "...",        // contenu HTML en anglais
    fr: "...",                      // contenu HTML en français
  },
}
```

- `context` = titre de section (rendu en `<h2>` avec un `id` auto-généré depuis le texte).
- `content` = corps HTML de la section. **Pas de `<h2>`** dans le content (c'est `context` qui s'en charge).
- Pour une intro sans titre, mettre `context: undefined` ou l'omettre.

---

## Balises HTML supportées et leur rendu

Le contenu est injecté dans une zone `prose` (Tailwind Typography). Voici les balises à utiliser et leur rendu visuel :

### Texte

| Balise | Usage | Rendu |
|--------|-------|-------|
| `<strong>texte</strong>` | Mise en gras | **Gras**, couleur quaternary, font semibold |
| `<em>texte</em>` | Italique | *Italique* |
| `<a href="url">texte</a>` | Lien | Couleur tertiaire, souligné au hover |

### Sous-titres (dans un paragraph)

| Balise | Usage |
|--------|-------|
| `<h3>Sous-titre</h3>` | Sous-section dans un paragraph |
| `<h4>Sous-sous-titre</h4>` | Niveau inférieur |

> Ne pas utiliser `<h1>` ni `<h2>` dans `content` — `<h2>` est géré par `context`.

### Listes

```html
<!-- Liste à puces -->
<ul>
  <li>Premier élément</li>
  <li>Deuxième élément</li>
</ul>

<!-- Liste numérotée -->
<ol>
  <li>Étape 1</li>
  <li>Étape 2</li>
</ol>
```

### Code

```html
<!-- Code inline -->
<code>maVariable</code>

<!-- Bloc de code avec coloration syntaxique -->
<pre><code class="language-python">def hello():
    print("world")</code></pre>
```

Languages supportés pour `class="language-xxx"` : `python`, `javascript`, `typescript`, `html`, `css`, `bash`, `json`, `sql`, etc.

> **Attention** : dans les blocs `<pre><code>`, échapper `<` en `&lt;` et `>` en `&gt;`.

### Citations

```html
<blockquote>
  Citation mise en forme avec bordure gauche tertiaire et italique.
</blockquote>
```

### Sauts de ligne

Utiliser `\n\n` dans la string TS pour séparer les blocs. Un simple `\n` crée un saut de ligne (`whitespace-pre-line` est actif).

---

## Insérer des images

Les images utilisent le pattern `[[image x]]` où `x` est l'index dans le tableau `img` du post :

```ts
// Dans la définition du post :
img: [monImage1, monImage2],

// Dans le content :
content: {
  [UNIVERSAL_LANG]: "Voici le diagramme :\n\n[[image 0]]\n\nComme on peut le voir...",
}
```

- `[[image 0]]` → affiche `img[0]`
- `[[image 1]]` → affiche `img[1]`
- Le pattern peut être placé n'importe où dans le texte, y compris entre deux phrases.
- L'image est rendue en pleine largeur avec coins arrondis et ombre.

---

## Table des matières (optionnel)

Si renseignée, une TOC sticky apparaît sur le côté droit (desktop). Chaque entrée doit correspondre à un `context` de paragraph :

```ts
tableOfContents: {
  [UNIVERSAL_LANG]: [
    { id: "introduction", text: "Introduction", level: 2 },
    { id: "what-is-mcts", text: "What is MCTS?", level: 2 },
  ],
  fr: [
    { id: "introduction", text: "Introduction", level: 2 },
    { id: "quest-ce-que-mcts", text: "Qu'est-ce que MCTS ?", level: 2 },
  ],
}
```

- `id` = slug du `context` (minuscules, accents retirés, espaces → tirets).
- `level` = 2 pour les sections principales (correspond aux `<h2>` générés par `context`).

---

## Enregistrer l'article

1. Créer le fichier dans `src/assets/blog/mon-article.ts`
2. L'ajouter au barrel `src/assets/blog/index.ts` :

```ts
import { monArticle } from './mon-article';

export const blogPosts: BlogPost[] = [
  monArticle,       // ajouter ici (ordre = plus récent en premier)
  mctsPathfinding,
];

export { monArticle, mctsPathfinding };
```

L'article sera automatiquement visible sur `/blog` et accessible sur `/blog/mon-article`.

---

## Checklist avant publication

- [ ] `slug` unique
- [ ] `title` et `description` renseignés en `[UNIVERSAL_LANG]` et `fr`
- [ ] `date` correcte (mois 0-indexé)
- [ ] `readingTime` estimé (~200 mots/min)
- [ ] `category` parmi les `BlogCategory` existantes
- [ ] `<` et `>` échappés en `&lt;`/`&gt;` dans les blocs `<pre><code>`
- [ ] Pas de `<h2>` dans `content` (utiliser `context` pour les titres)
- [ ] `tableOfContents` ids correspondent aux `context` slugifiés
- [ ] Article ajouté dans `index.ts`
- [ ] `npx tsc --noEmit` passe sans erreur
