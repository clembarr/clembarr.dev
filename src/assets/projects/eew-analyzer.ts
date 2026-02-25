/**
 * @fileoverview EEW Analyzer project definition
 * Application for the Evolutionary Ecology of Words model
 */

import { Retex } from '../dataTypes';
import { UNIVERSAL_LANG } from '../i18n';
import { getSkill } from '../skillsIndex';
import { projectsImages, documents } from '../index';

export const eewAnalyzer: Retex = {
  title: {
    [UNIVERSAL_LANG]: "EEW Analyzer"
  },
  date: new Date(2025, 5),
  tools: [
    getSkill('Python'),
    getSkill('PyTorch'),
    getSkill('Numpy'),
    getSkill('Transformers'),
    getSkill('CUDA'),
  ],
  description: {
    fr:
    "Une application dédiée au modèle EEW, permettant de lancer des expérience et analyser les résultats à travers différentes métriques.",
    en:
    "A dedicated application for the EEW model, allowing to run experiments and analyze the results through different metrics.",
  },
  specs: {
    fr:
    "J'ai conçu une application dédiée pour le modèle Evolutionary Ecology of Words (EEW), refactorisant \
    une base de scripts en une architecture structurée en deux modules Python. Le premier module, centré \
    sur l'exécution des \"simulations\", intègre des <strong>classes spécialisées</strong> pour les acteurs de l'expérience, un <strong>système de \
    logging</strong> complet, et une <strong>intégration flexible de LLM</strong>. Un fichier de configuration centralisé permet à \
    l'utilisateur de <strong>personnaliser tous les paramètres</strong>. Le second module se concentre sur la valorisation \
    des données (graphiques, animations) et l'analyse de métriques clés comme <strong>l'émergence de nouveauté</strong> \
    et <strong>les dynamiques de dérivation sémantique</strong>, essentielles pour la recherche sur l'open-endedness. \
    Un <strong>outil d'analyse complet</strong> pour d'optimiser la collaboration future sur ce sujet.",
    en:
    "I designed a dedicated application for the Evolutionary Ecology of Words (EEW) model, refactoring \
    a base of scripts into a structured architecture with two Python modules. The first module, focused \
    on running the \"simulations\", integrates <strong>specialized classes</strong> for the experiment's \
    actors, a <strong>complete logging</strong> system, and a <strong>flexible LLM integration</strong>. \
    A centralized configuration file allows the user to <strong>customize all parameters</strong>. The \
    second module focuses on data valorization (graphics, animations) and the analysis of key metrics such as <strong>the emergence of novelty</strong> \
    and <strong>the dynamics of semantic derivation</strong>, essential for research on open-endedness. \
    A <strong>comprehensive analysis tool</strong> to optimize future collaboration on this topic."
  },
  notions: {
    fr: ["Intégration de LLM et prompt engineering", "Conception de métriques spéciales", "Valorisation de datasets JSON"],
    en: ["LLM integration and prompt engineering", "Design of special metrics", "Valorization of JSON datasets"],
  },
  tags: {
    fr: ["Data", "LLM", "Stage", "Recherche", "Professionnel", "IA", "POO", "Programmation orientée objet", "Logiciel"],
    en: ["Data", "LLM", "Intern", "Research", "Professional", "OOP", "Object-oriented programming", "Software", "Internship"],
    [UNIVERSAL_LANG]: ["AI", "BigData", "Simulation", "Integration", "Data science"]
  },
  img: [
    projectsImages.eew_algo,
    projectsImages.eew_prompts,
    projectsImages.eew_logs_file,
    projectsImages.eew_basic_visuals,
    projectsImages.eew_uml_simulation,
    projectsImages.eew_uml_makegraph
  ],
  additionalRessources: [
    {
      content: {
        fr: "Rapport de stage",
        en: "Internship report",
      },
      link: documents.eew_internship_report,
    },
    {
      content: {
        fr: "Rapport d'activité",
        en: "Activity report",
      },
      link: documents.eew_activity_report,
    }
  ]
};
