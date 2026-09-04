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

## Conventions rédactionnelles

Établies en septembre 2026 ; les entrées antérieures ne les respectent pas toutes.

**Titre : concis et explicite, sans le statut.** `Ingénieur IA et Radiocomms`, pas
`Ingénieur LLM et Radiocommunications en Alternance`. Le statut (alternance, stage) va dans
les **tags**, pas dans le titre — `Alternance` en fr, `Apprenticeship` en en. Les entrées de
formation (`EDUCATION`) ne portent pas ce tag, seulement les expériences.

⚠️ `Chercheur ALife en Stage` (Nagoya) déroge encore : le titre contient le statut alors que
`Stage` est déjà dans ses tags. À proposer à la correction si l'occasion se présente.

**La spécialité ne va que dans la description.** Le titre porte l'intitulé du diplôme ou du
poste (`Ingénieur Informatique`), la description précise la spécialisation.

**Organisation : `<Nom>, <Ville>`.** `CGI, Bordeaux`, `Thales, Cholet`, `ESIEA, Paris`.

**Le pays n'apparaît que pour le lecteur étranger**, et seulement si la ville ne se situe pas
d'elle-même :

| | fr | en |
|---|---|---|
| Ville internationalement connue | `ESIEA, Paris` | `ESIEA, Paris` |
| Ville peu connue hors de France | `Thales, Cholet` | `Thales, Cholet, France` |
| Organisation à l'étranger | `…, Nagoya University, Japon` | `…, Nagoya University, Japan` |

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

```bash
bash .claude/skills/portfolio-content/scripts/add-icon.sh orga <nom> <fichier>
```

Convertit en WebP, place le fichier et affiche les fragments à insérer.

Nommage : `<nom>_logo.webp` en snake_case minuscule (`esiea_logo.webp`, `thales_logo.webp`).
Les fichiers plus anciens gardent leur casse d'origine (`CGI_logo.png`, `JDB_logo.png`) — ne
pas s'en inspirer pour les nouveaux.

`orga_icons/index.ts` n'a **pas d'objet agrégé**, contrairement à `skills_icons` : deux
insertions suffisent, l'import et l'export nommé. Puis :

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

Les deux clés `light` et `dark` sont obligatoires même pour un logo unique. La plupart des
logos d'entreprise portent leur propre fond (cercle ESIEA, carré Thales) et fonctionnent tels
quels dans les deux thèmes — regarder l'image avant de conclure qu'il faut deux variantes.

**Vérifier que le fichier source existe** avant de le promettre : le chemin donné par
l'utilisateur peut être approximatif (`thales-icon.jpg` alors que le fichier est
`thales-logo.jpg`).

## Vérifier

```bash
node .claude/skills/portfolio-content/scripts/inventory.js career
bash .claude/skills/portfolio-content/scripts/check.sh --fast
```
