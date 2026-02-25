/**
 * @fileoverview Dummy Arrays project definition
 * Associative data structure implemented in Rust and Go with benchmark comparison
 */

import { Retex } from '../dataTypes';
import { UNIVERSAL_LANG } from '../i18n';
import { getSkill } from '../skillsIndex';
import { projectsImages } from '../index';

export const dummyArrays: Retex = {
  title: {
    [UNIVERSAL_LANG]: "Dummy Arrays"
  },
  date: new Date(2025, 0),
  tools: [
    getSkill('Rust'),
    getSkill('Go'),
    getSkill('Python'),
    getSkill('Matplotlib'),
  ],
  description: {
    fr:
    "La Dummy Array est une structure de données associative. Implémenter en Rust et en Go, nous avons \
    réaliser un benchmark sur leurs performances et optimiser leur conception pour une meilleure efficacité.",
    en:
    "The Dummy Array is an associative data structure. Implemented in Rust and Go, we conducted a \
    benchmark on their performance and optimized their design for better efficiency.",
  },
  specs: {
    fr:
    "En binôme, <strong>conception et implémentation d'une structure de données associative</strong> (Dummy Arrays) en Rust et \
    en Go, avec pour objectif de comparer leurs performances via <strong>un benchmark</strong>. En charge de la version \
    Rust, j'ai exploité les spécificités du langage — gestion stricte de la mémoire, compilateur exigeant \
    et bas niveau — pour <strong>optimiser l'efficacité et la complexité algorithmique</strong>. \
    Ce travail m'a permis d'analyser finement les structures natives de Rust (comme HashMap ou Vec), \
    <strong>d'évaluer leurs trade-offs</strong>, et de présenter une comparaison rigoureuse des performances entre les deux \
    implémentations. Une expérience formatrice en optimisation système, benchmarking et collaboration \
    technique.",
    en:
    "In pairs, <strong>Design and implementation of an associative data structure</strong> (Dummy Arrays) in Rust and \
    Go, with the aim of comparing their performance through <strong>a benchmark</strong>. In charge of the Rust version, \
    I leveraged the language's specificities — strict memory management, demanding compiler \
    and low-level — to <strong>optimize efficiency and algorithmic complexity</strong>. \
    This work allowed me to finely analyze Rust's native structures (such as HashMap or Vec), \
    <strong>evaluate their trade-offs</strong>, and present a rigorous comparison of the performance between the two \
    implementations. A formative experience in system optimization, benchmarking, and collaboration \
    techniques.",
  },
  notions: {
    fr: ["Conception de structures de données", "Analyse des performances", "Gestion mémoire rigoureuse"],
    en: ["Data structures design", "Performance analysis", "Strict memory management"],
  },
  tags: {
    en: ["Structures", "Optimization", "Benchmarking", "Academic", "Systems", "FP"],
    fr: ["Structures", "Optimisation", "Benchmarking", "Académique", "Systèmes", "FP"],
    [UNIVERSAL_LANG]: ["Rust", "Go", "OS", "Algo"],
  },
  img: [
    projectsImages.dummy_arrays_code
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
};
