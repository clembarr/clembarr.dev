/**
 * @fileoverview Dummy Arrays project definition
 * Associative data structure implemented in Rust and Go with benchmark comparison
 */

import { Retex } from '../dataTypes';
import { UNIVERSAL_LANG } from '../../utils/translationUtils';
import { getSkill } from '../../utils/assetsUtils';
import { projectsMedia } from '../projects_images';

export const dummyArrays: Retex = {
  title: {
    [UNIVERSAL_LANG]: "Dummy Arrays"
  },
  date: new Date(2025, 0),
  coverImage: projectsMedia.dummyArraysScheme,
  tags: {
    en: ["Structures", "Optim.", "Benchmark", "Academic", "University", "Systems", "FP", "Memory"],
    fr: ["Structures", "Optim.", "Benchmark", "Académique", "Univeristaire", "Systèmes", "PF", "Mémoire"],
    [UNIVERSAL_LANG]: ["Rust", "Go", "OS", "Algo", "Sys", "QEMU"],
  },
  description: {
    fr: "Structure de données associative, implémentée en Rust et en Go, nous avons pour réaliser un benckmark des\
    trade-offs de leurs performances respectives. Nous avons ensuite optimisé leur conception pour une meilleure efficacité.",
    en: "Associative data structure, implemented in Rust and Go, we conducted a benchmark to compare their respective performance trade-offs. \
    We then optimized their design for better efficiency."
  },
  content: {
    specs: {
      fr:
      "En binôme, <strong>conception et implémentation d'une structure de données associative</strong>, les Dummy Arrays, en Rust et \
      en Go. L'objectif était de faire <strong>un benchmark</strong> pour comparer leurs performances. En charge de la version \
      Rust, j'ai exploité les spécificités du langage: gestion stricte de la mémoire, compilateur exigeant \
      et bas niveau. <strong>Optimiser l'efficacité et la complexité algorithmique</strong> a nécessité une fine\
      analyse des structures natives de Rust (comme HashMap ou Vec), afin <strong>d'évaluer leurs trade-offs</strong>.\
      Nous avons présenter une comparaison rigoureuse des performances entre les deux implémentations. \
      Une expérience formatrice en optimisation système, benchmarking et <strong>collaboration technique</strong>.",
      en:
      "In a team, <strong>design and implementation of an associative data structure</strong>, the Dummy Arrays, in Rust and \
      Go. The aim was to conduct a <strong>benchmark</strong> to compare their performance. In charge of the Rust version, \
      I leveraged the language's specificities: strict memory management, demanding compiler \
      and low-level. <strong>Optimizing efficiency and algorithmic complexity</strong> required a fine\
      analysis of Rust's native structures (such as HashMap or Vec), in order to <strong>evaluate their trade-offs</strong>.\
      We presented a rigorous comparison of the performances between the two implementations. \
      A training experience in system optimization, benchmarking and <strong>technical collaboration</strong>.",
    },
    notions: {
      fr: ["Conception d'une structure de données", "Analyse des performances", "Gestion mémoire rigoureuse", "Environnement virtuel QEMU"],
      en: ["Data structure design", "Performance analysis", "Strict memory management", "Virtual environment using QEMU"],
    },
    tools: [
      getSkill('Rust'),
      getSkill('Go'),
      getSkill('C'),
      getSkill('Git'),
    ],
    images: [
      projectsMedia.dummyArraysScheme,
      projectsMedia.dummyArraysBench,
      projectsMedia.dummyArraysOptim,
      projectsMedia.dummyArraysCode
    ],
    additionalRessources: [
      {
        content: {
          fr: "Répo GitHub",
          en: "GitHub Repo",
        },
        link: "https://github.com/labian0/dummy-array",
      },
    ]
  }
};
