/**
 * @fileoverview Ecograph project definition
 * Client application for visualizing climatic and GES emission data
 */

import { Retex } from '../dataTypes';
import { UNIVERSAL_LANG } from '../../utils/translationUtils';
import { getSkill } from '../../utils/assetsUtils';
import { projectsImages } from '../index';


export const ecograph: Retex = {
  title: {
    [UNIVERSAL_LANG]: "Ecograph"
  },
  coverImage: projectsImages.ecograph_home,
  description: {
    fr:
    "Ecograph aide les entreprises à se positionner géographiquement, en fonction de données climatiques et d'émission \
    de GES à travers le monde. Cette application permet de visualiser de lourdes masses d'informations, à travers plusieurs \
    vues, telles que des graphiques et des cartes.",
    en:
    "Ecograph helps companies to position themselves geographically, based on climatic and GES emission data around the world. \
    This app allows to visualize heavy masses of information, through several views, such as graphs and maps.",
  },
  tags: {
    fr: ["Visu.", "BD", "AGILE", "Collab", "Académique", "Universitaire", "Base de données", "POO"],
    en: ["DB", "Visu.", "AGILE", "Teamwork", "Academic", "University", "OOP"],
    [UNIVERSAL_LANG]: ["ORM", "Graph", "Graphs", "Data", "C#", "CS", "Fullstack"],
  },
  date: new Date(2024, 6),
  content: {
    specs: {
      en:
      "Ecograph is a university and collaborative project allowing companies to <strong>visualize and analyze\
      climatic and GES emission data</strong> around the world.\
      The graphical interface in C# .NET communicates with a backend Python-SQLServer, with SQLAlchemy as ORM.\
      The data is <strong>integrated from CSV datasets</strong>, available on large collections (e.g Our World in Data).\
      The goal was to provide <strong>a decision-making tool</strong> for a strategic positioning of companies facing\
      environmental challenges.<br>\
      This project required a solid and <strong>agile</strong> management in a team, including the meticulous\
      writing of the <strong>specification document</strong>, and the planning of tasks over the two weeks expected.",
      fr:
      "Ecograph est un projet universitaire et collaboratif permettant aux entreprises de <strong>visualiser\
      et d'analyser des données climatiques et d'émissions de GES</strong> à travers le monde.\
      L'interface graphique en C# .NET communique avec un backend Python-SQLServer, avec SQLAlchemy comme ORM.\
      Les données sont <strong>intégrées à partir de datasets</strong> CSV, disponibles sur les grands recueils (e.g Our World in Data).\
      L'objectif était de fournir <strong>un outil décisionnel</strong> pour un positionnement stratégique des\
      entreprises face aux enjeux environnementaux.<br>\
      Ce projet a nécessité une gestion solide et <strong>agile</strong> en équipe, dont la rédaction minutieuse du\
      <strong>dossier des spécifications</strong>, et la plannification des tâches sur les deux semaines prévues.",
    },
    notions: {
      en: [
        "Modelization and decision support",
        "Object-relational mapping",
        "Agile and DevOps management",
        "Project specifications and requirements documents"
      ],
      fr: [
        "Modélisation et aide à la décision",
        "Mapping relationnelle-objet",
        "Management agile et DevOps",
        "Cahier des charges et dossier de spécifications"
      ],
    },
    tools: [
      getSkill('.NET'),
      getSkill('Python'),
      getSkill('SQL Server'),
      getSkill('Git'),
    ],
    images: [
      projectsImages.ecograph_home,
      projectsImages.ecograph_visu,
      projectsImages.ecograph_gestion,
      projectsImages.ecograph_gantt
    ],
  },
};

