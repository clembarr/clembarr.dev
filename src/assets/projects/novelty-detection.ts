/**
 * @fileoverview Novelty Detection project definition
 * Stream novelty-detection structure built from a research paper: a Bloom filter
 * modelled on the fruit fly olfactory circuit, Rust core with Python bindings.
 */

import { Retex } from '../dataTypes';
import { UNIVERSAL_LANG } from '../../utils/translationUtils';
import { getSkill } from '../../utils/assetsUtils';
import { ffbfArchitecture, ffbfBench, ffbfNoveltyMapOverTime, ffbfMemory } from '../projects_images';

export const noveltyDetection: Retex = {
  title: {
    fr: "Détection de Nouveauté",
    en: "Novelty Detection",
  },
  date: new Date(2026, 7),
  coverImage: ffbfBench,
  favorite: true,
  tags: {
    fr: ["Data", "Biomim", "Recherche", "Innovation", "Personnel", "Visu"],
    en: ["Data", "Biomim", "Research", "Innovation", "Personal", "Viz"],
    [UNIVERSAL_LANG]: ["Rust", "Python", "PyO3", "Hash", "Neuro"],
  },
  description: {
    fr: "Une structure de données pour suivre, sur un flux continu, ce qui est déjà connu et ce qui est nouveau. Elle généralise, oublie ce qui cesse d'arriver, et tient dans une mémoire de taille fixe. Inspirée du cerveau de la mouche. Cœur Rust, librairie Python pour la visualisation et les benchmarks.",
    en: "A data structure to track, over a continuous stream, what is already known and what is new. It generalises, forgets what stops coming, and fits in fixed-size memory. Inspired by the fruit fly brain. Rust core, Python library for visualisation and benchmarks.",
  },
  content: {
    specs: {
      fr:
        "<strong>Conception et implémentation, à partir d'un papier de recherche, d'une structure de détection de nouveauté sur flux.</strong> Un filtre de Bloom classique répond « cet élément est-il dans l'ensemble ? » par oui ou non. Inspiré du cerveau de la mouche, celui-ci répond « ai-je vu quelque chose de <em>similaire</em>, et récemment ? », entre 0 et 1." +
        "<br>Une telle structure surveille un flux trop gros pour être conservé en entier et en isole ce qui sort de l'ordinaire : séquences inédites en analyse génomique, activité anormale dans des journaux, documents jamais vus." +
        "<br>Elle apporte trois sensibilités. La <strong>nuance</strong> : la nouveauté est un dégradé, pas un « connu / inconnu ». La <strong>distance</strong> : plus une entrée ressemble à ce qui est stocké, plus sa nouveauté est faible. Le <strong>temps</strong> : une entrée revue après une longue absence paraît plus nouvelle qu'une entrée revue à l'instant." +
        "<br>Pour cela elle <strong>oublie</strong> : les traces anciennes s'effacent toutes seules. Sans cet oubli le filtre se sature et finit par tout trouver familier. La mémoire garde une taille fixe, quelle que soit la longueur du flux." +
        "<br><strong>Cœur en Rust, exporté en librairie Python</strong> pour la visualisation et les benchmarks.",
      en:
        "<strong>Design and implementation of a stream novelty-detection structure, built from a research paper.</strong> A classic Bloom filter answers « is this item in the set? » with a yes or no. Inspired by the fruit fly brain, this one answers « have I seen anything <em>similar</em>, and recently? », between 0 and 1." +
        "<br>A structure like this watches a stream too large to keep in full and picks out what departs from the ordinary: novel sequences in genomic analysis, abnormal activity in logs, documents never seen before." +
        "<br>It brings three sensitivities. <strong>Shade</strong>: novelty is a gradient, not a « known / unknown ». <strong>Distance</strong>: the more an input resembles what is stored, the lower its novelty. <strong>Time</strong>: an input seen again after a long gap feels newer than one seen a moment ago." +
        "<br>For that it <strong>forgets</strong>: old traces fade on their own. Without forgetting the filter saturates and ends up finding everything familiar. The memory keeps a fixed size, whatever the stream length." +
        "<br><strong>Rust core, exported as a Python library</strong> for visualisation and benchmarks.",
    },
    notions: {
      fr: [
        "Appropriation d'un papier de recherche",
        "Stockage conceptuel et ensemble fixe",
        "Innovation par biomimétisme",
        "Définition de librairies Python en Rust",
      ],
      en: [
        "Taking ownership of a research paper",
        "Conceptual storage over a fixed set",
        "Innovation through biomimicry",
        "Defining Python libraries in Rust",
      ],
    },
    tools: [
      getSkill('Rust'),
      getSkill('Python'),
      getSkill('Numpy'),
      getSkill('Matplotlib'),
      getSkill('Git'),
    ],
    images: [
      ffbfBench,
      ffbfArchitecture,
      ffbfNoveltyMapOverTime,
      ffbfMemory,
    ],
    additionalRessources: [
      {
        content: { fr: "Répo GitHub", en: "GitHub repo" },
        link: "https://github.com/clembarr/ffbf-novelty-detector",
      },
      {
        content: { fr: "Démo interactive", en: "Interactive demo" },
        link: "https://clembarr.github.io/ffbf-novelty-detector/assets/ffbf-bench.html",
      },
      {
        content: { fr: "Papier de recherche", en: "Research paper" },
        link: "https://www.pnas.org/doi/full/10.1073/pnas.1814448115",
      },
    ],
  }
};
