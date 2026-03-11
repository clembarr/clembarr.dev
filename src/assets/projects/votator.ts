/**
 * @fileoverview Votator project definition
 * Front-end React application for voting tournaments
 */

import { Retex } from '../dataTypes';
import { UNIVERSAL_LANG } from '../../utils/translationUtils';
import { getSkill } from '../../utils/assetsUtils';
import { projectsImages } from '../index';

export const votator: Retex = {
  title: {
    [UNIVERSAL_LANG]: "Votator"
  },
  date: new Date(2025, 2),
  coverImage: projectsImages.votator_active_bracket,
  tags: {
    en: ["Web", "React", "Frontend", "UI/UX", "Academic"],
    fr: ["Web", "React", "Frontend", "Interface utilisateur", "Académique"],
    [UNIVERSAL_LANG]: ["TypeScript", "Tailwind", "Responsive"],
  },
  description: {
    fr: "Une application front-end React pour le suivit et la participation à des tournois de vote sur diverses thématiques. Un système de logging \
    permet aux utilisateurs de se connecter et consulter les données du serveur distant en temps réel.",
    en: "A front-end React application for tracking and participating in voting tournaments on various topics. A logging system \
    allows users to log in and view data from the remote server in real time."
  },
  content: {
    specs: {
      fr:
      "Votator est un front en React permettant aux utilisateurs de <strong>se connecter, suivre et \
      participer</strong> à des tournois de vote sur diverses thématiques. En m'appuyant sur <strong>la documentation \
      de l'API REST du serveur distant</strong> et sur la bibliothèque <strong>Axios</strong>, j'ai mis en place la \
      gestion des <strong>requêtes asynchrones</strong> et l'adaptation des interfaces selon les évennements utilisateurs et le \
      le calendrier des tournois. Il était important de <strong>prévoir les possibles actions</strong> des utilisateurs pour gérer \
      l'ensemble des cas et des retours du serveur. Ce qui amène à se soucier de <strong>l'accesibilité</strong>, et notamment \
      l'importance de tenir l'utilisateur informé, en cas d'erreur par exemple. Des concepts clés du développement \
      avec React ont dû être appliqués, tels que la gestion d'états, de contextes, des effets et autres <strong>hooks fondamentaux</strong>.",
      en:
      "Votator is a front-end application built with React that allows users to <strong>log in, track, \
      and participate</strong> in voting tournaments on various topics. Relying on <strong>the documentation \
      of the REST API of the remote server</strong> and the <strong>Axios</strong> library, I implemented \
      the management of <strong>asynchronous requests</strong> and the adaptation of interfaces according \
      to user events and the tournament schedule. It was important to <strong>anticipate possible user \
      actions</strong> to handle all cases and server responses. This also raises concerns about \
      <strong>accessibility</strong>, particularly the importance of keeping the user informed, in case of an error for \
      example. Key concepts of development with React had to be applied, such as state management, context, \
      effects, and other <strong>fundamental hooks</strong>."
    },
    notions: {
      fr: ["Gestion de sessions utilisateur", "Communication via API REST", "Requêtes asynchrones et codes HTTP", "Architecture modulaire et microservices"],
      en: ["User session management", "Communication via REST API", "Asynchronous requests and HTTP codes", "Modular architecture and microservices"],
    },
    tools: [
      getSkill('React'),
      getSkill('Typescript'),
      getSkill('Axios'),
      getSkill('Tailwind'),
    ],
    images: [
      projectsImages.votator_home,
      projectsImages.votator_closed_ones,
      projectsImages.votator_active_bracket,
      projectsImages.votator_past_round,
      projectsImages.votator_swagger,
    ],
    additionalRessources: [
      {
        content: {
          fr: "Répo GitHub",
          en: "GitHub Repo",
        },
        link: "https://github.com/clembarr/Votator",
      },
    ]
  }
};
