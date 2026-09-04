# Parcours (expériences, formations, certifications, bénévolat)

Fichier : `src/assets/contents.ts` — tableau `careerTimeline`
Logos : `src/assets/orga_icons/`
Rendu : `src/components/sections/CareerTimeline.tsx`

## Questions à poser

**Obligatoire** — type d'entrée · intitulé fr/en · organisation fr/en · période fr/en ·
description fr/en.

**Optionnel** — logo de l'organisation · tags fr/en · ressources liées (rapport, attestation).

Types (`CareerEntryType`) :

| Enum | Valeur affichée | Usage |
|---|---|---|
| `EXPERIENCE` | `EXP.` | emploi, alternance, stage, job d'été |
| `EDUCATION` | `EDUC.` | diplôme, cursus |
| `CERTIFICATION` | `CERTIF.` | brevet, certification |
| `VOLUNTEERING` | `VOLUNTEERING` | bénévolat |

## Structure

```ts
{
  type: CareerEntryType.EXPERIENCE,
  title:        { fr: "Ingénieur logiciel en Alternance", en: "Software Engineer in Apprenticeship" },
  organization: { fr: "CGI", en: "CGI" },
  icon: CGILogo,                                    // optionnel
  period:       { fr: "Sept. 2025\nSept. 2026", en: "Sept. 2025\nSept. 2026" },
  description:  { fr: "…", en: "…" },
  tags:         { fr: ["Alt.", "Agile"], en: ["Apprenticeship", "Agile"] },
  ressources: [                                     // optionnel
    { content: { fr: "Rapport de stage", en: "Internship report" }, link: "…" },
  ],
}
```

**Le `\n` dans `period` est significatif** : il sépare début et fin sur deux lignes dans la
timeline. Une entrée ponctuelle n'en met pas (`{ fr: "2022", en: "2022" }`).

Le tableau est ordonné **du plus récent au plus ancien** — ici l'ordre est réellement
chronologique, contrairement au barrel des projets.

## Ajouter un logo d'organisation

Fichier dans `src/assets/orga_icons/`, casse d'origine conservée (`CGI_logo.png`,
`nagoya_u_logo.png`, `iut_info_logo.png`), puis :

```ts
import ACME_logo from "./ACME_logo.png";

export const ACMELogo: GraphicAsset = {      // PascalCase
  label: "ACME",
  content: { 'light': ACME_logo, 'dark': ACME_logo },   // dupliquer si une seule variante
  alt: "ACME Logo",
};
```

Et l'importer dans `contents.ts` :

```ts
import { CGILogo, …, ACMELogo } from "./orga_icons";
```

Les deux clés `light` et `dark` sont obligatoires même pour un logo unique.

## Vérifier

```bash
node .claude/skills/portfolio-content/scripts/inventory.js career
bash .claude/skills/portfolio-content/scripts/check.sh --fast
```
