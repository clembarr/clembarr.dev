# Style d'écriture du code

Il n'y a **ni Prettier ni `.editorconfig`** dans ce dépôt. Les conventions ne vivent que
dans les fichiers. Les chiffres ci-dessous sont mesurés sur les 104 fichiers de `src/`.

**Règle première : s'aligner sur le fichier qu'on modifie.** Le tableau ne tranche que pour
un fichier neuf.

| Point | Convention | Mesure |
|---|---|---|
| Indentation | **4 espaces** | 63 fichiers contre 29 en 2 espaces |
| Point-virgule | **oui**, imports compris | 477 contre 182 |
| Guillemets | **doubles** `"` | 420 contre 222 |
| Égalité | **`===`** | 229 contre 7 |
| Composant | `const X = () => {}` puis `export default X` en fin de fichier | 43 contre 8 |
| Contexte / Engine | export nommé : `export { XEngine, XContext };` | les 5 Engines |
| Langue du code | **anglais** — identifiants, commentaires, JSDoc | tout `src/` |

Le français n'existe que comme **donnée**, dans `src/assets/`. Jamais dans un identifiant,
jamais dans un commentaire.

## JSDoc — la description est collée au tag

C'est le marqueur le plus reconnaissable de ce dépôt, et celui qu'on rate le plus souvent :
la description est **sur la même ligne que le tag**, pas en dessous.

```ts
/**
 * @function getLocalLanguage Get the language used by the user
 * @returns the symbol of local language (ex: 'fr')
 */
```

Par nature de symbole :

- **Fonction** : `@function <nom> <description>`, puis `@param`, puis `@returns`.
- **Composant** : `@component <Nom>` puis `@description` sur les lignes suivantes.
- **Type, interface, enum** : `@interface <Nom>` ou `@enum <Nom>`, `@description`, puis une
  ligne `@property <nom> - <description>` par champ.

Documenter systématiquement les fonctions exportées. Une fonction locale de trois lignes
n'a pas besoin de JSDoc.

## JSX — la signature visuelle

`className` est un **template literal multiligne**, une intention par ligne. Les variantes
responsive se groupent sur **une seule ligne, du plus grand écran au plus petit, la valeur
sans préfixe en dernier** :

```tsx
2xl:text-3xl xl:text-2xl lg:text-xl md:text-xl text-lg
```

C'est du desktop-first à l'écriture pour un rendu mobile-first à l'exécution. Écrire
`text-lg md:text-xl lg:text-2xl` produit exactement le même site et un fichier qui ne
ressemble à aucun autre du dépôt.

Autres marqueurs :

- **`id="kebab-case"` sur les conteneurs** (135 occurrences). Ce n'est pas décoratif : les
  ancres de navigation ciblent ces `id`, et plusieurs composants les utilisent pour mesurer
  ou ajuster le DOM.
- **Couleurs en syntaxe Tailwind v4** : `text-(--color-quaternary)`, `bg-(--color-secondary)`.
  Jamais `[var(--color-x)]`, jamais de hexadécimal en dur.
- **Composer avec `src/style.tsx`** : `${styles.sectionContainer}` en première ligne du
  template, puis les classes propres au composant.
- Sous-fonctions de rendu déclarées dans le corps du composant, puis mémoïsées :
  `useMemo(() => textWidget("currently"), [currentLang])`.
- Contextes consommés par déstructuration : `const { currentLang } = useContext(LangContext);`

## Fautes de frappe figées dans des noms publics

À respecter, pas à corriger : ce sont des clés que `tsc` ne rattrapera pas toutes.

| Nom | Où | Occurrences |
|---|---|---|
| `ressources` | champ de `CareerEntry` dans `dataTypes.ts` | 8 |
| `titleAdditionnalStyle` | prop d'`AboutWidget` | 6 |
| `scaleway-deployement.ts` | fichier de projet | 2 |
| `curiculumVitae` | export de `src/assets/documents/index.ts` | 1 |

## Squelette de composant

Point de départ pour un fichier neuf. Il applique tout ce qui précède.

```tsx
import styles from "../../style";
import { useContext } from "react";
import { LangContext } from "../language";
import { ThemeContext } from "../theme/ThemeEngine";

/**
 * @component Testimonials
 * @description Testimonials section. Reads its entries from the content layer and
 * renders one card per testimonial, adapting logo and colors to the active theme.
 */
const Testimonials = () => {
    const { currentLang } = useContext(LangContext);
    const { currentTheme } = useContext(ThemeContext);

    return (
        <div id="testimonials"
            className={`
                ${styles.flexCol}
                ${styles.sizeFull}
                2xl:space-y-8 xl:space-y-6 lg:space-y-5 md:space-y-4 space-y-3
                text-(--color-quaternary)
            `}
        >
            <h2 className={`${styles.heading2}`}> {sectionTitle[currentLang]} </h2>
            <span className={`${styles.line}`} />

            <p className={`
                ${styles.paragraph}
                2xl:text-xl xl:text-lg md:text-md text-2xs
            `}
            > {sectionBody[currentLang]} </p>
        </div>
    );
};

export default Testimonials;
```

Un contexte suit le patron `Engine` :

```tsx
import { createContext, useState, ReactNode, useEffect } from "react";

interface ExampleContextType {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

const ExampleContext = createContext<ExampleContextType>({
    value: "",
    setValue: () => {},
});

const ExampleEngine = ({ children }: { children: ReactNode }) => {
    const [value, setValue] = useState<string>("");

    useEffect(() => {
        // side effect kept here, never in the consumers
    }, [value]);

    return (
        <ExampleContext.Provider value={{ value, setValue }}>
            {children}
        </ExampleContext.Provider>
    )
}

export { ExampleEngine, ExampleContext };
```

## Vérifier

```bash
npm run lint && npm run build
```
