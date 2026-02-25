/**
 * @fileoverview Ecograph project definition
 * Client application for visualizing climatic and GES emission data
 */

import { Retex } from '../dataTypes';
import { UNIVERSAL_LANG } from '../i18n';
import { getSkill } from '../skillsIndex';
import { projectsImages } from '../index';

export const ecograph: Retex = {
  title: {
    [UNIVERSAL_LANG]: "Ecograph"
  },
  description: {
    fr:
    "Ecograph aide les entreprises à se positionner géographiquement, en fonction de données climatiques et d'émission de GES à travers le monde. Cette application permet de visualiser de lourdes masses d'informations, à travers plusieurs vues, telles que des graphiques et des cartes.",
    en:
    "Ecograph helps companies to position themselves geographically, based on climatic and GES emission data around the world. This app allows to visualize heavy masses of information, through several views, such as graphs and maps.",
  },
  tags: {
    fr: ["Visualisation", "BD", "Collab", "Académique", "Universitaire", "Base de données", "POO"],
    en: ["DB", "Visualization",  "Teamwork", "Academic", "University", "DB", "OOP"],
    [UNIVERSAL_LANG]: ["ORM", "Graph", "Graphs", "Data", "C#", "CS", "Fullstack"],
  },
  date: new Date(2024, 6),
  specs: {
    en:
    "As part of a team of 5 developers, I co-developed Ecograph, \
    a client application allowing companies to <strong>visualize and analyze \
    climatic and GES emission data</strong>. I participated \
    in the design of the graphical interface in C# and the implementation of the \
    backend in Python (with SQLAlchemy and SQL Server), integrating CSV datasets \
    to feed the database. This project allowed me to strengthen my skills \
    in writing <strong>specification documents</strong> and project management and, \
    planning in a team. The goal was to provide <strong>a \
    decision-making tool</strong> for a strategic positioning of companies facing \
    environmental challenges.",
    fr:
    "Au sein d'une équipe de 5 développeurs, j'ai co-développé Ecograph, \
    une application cliente permettant aux entreprises <strong>de visualiser et \
    d'analyser des données climatiques et d'émissions de GES</strong>. J'ai participé \
    à la conception de l'interface graphique en C# .NET et à l'implémentation du \
    backend en Python (avec SQLAlchemy et SQL Server), en intégrant des datasets \
    CSV pour alimenter la base. Ce projet m'a permis de renforcer mes compétences \
    en rédaction des <strong>dossiers de spécifications</strong> et gestion de projet \
    en équipe. L'objectif était de fournir <strong>un \
    outil décisionnel</strong> pour un positionnement stratégique des entreprises \
    face aux enjeux environnementaux.",
  },
  notions: {
    en: [
      "Filling a database from CSV files",
      "Teamwork and Git management",
      "Linking interfaces between back and front ends",
      "Writing specifications and requirements documents"
    ],
    fr: [
      "Remplissage d'une BD à partir de fichiers CSV",
      "Management de projet et gestion du Git",
      "Liaison entre les différentes technos du projet",
      "Cahier des charges et dossier de spécifications"
    ],
  },
  tools: [
    getSkill('.NET'),
    getSkill('Python'),
    getSkill('SQL Server'),
    getSkill('Git'),
  ],
  img: [
    projectsImages.ecograph_home,
    projectsImages.ecograph_gestion,
    projectsImages.ecograph_gantt
  ],
};
