/**
 * @fileoverview Votator project definition
 * Front-end React application for voting tournaments
 */

import { Retex } from '../dataTypes';
import { UNIVERSAL_LANG } from '../i18n';
import { getSkill } from '../skillsIndex';
import { projectsImages } from '../index';

export const votator: Retex = {
  title: {
    [UNIVERSAL_LANG]: "Votator",
  },
  date: new Date(2025, 2),
  tools: [
    getSkill('React'),
    getSkill('Typescript'),
    getSkill('Axios'),
    getSkill('Tailwind'),
  ],
  description: {
    fr: "Votator est une application front-end React qui permet aux utilisateurs de se connecter, suivre et participer à des tournois de vote sur diverses thématiques.",
    en: "Votator is a front-end application built with React that allows users to log in, track, and participate in voting tournaments on various topics."
  },
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
  tags: {
    en: ["Front", "API", "EP", "Asynchronous", "Event programming", "Academic"],
    fr: ["Front", "API", "PE", "Asynchrone", "Programmation événementielle", "Académique"],
    [UNIVERSAL_LANG]: ["Axios", "Async", "Web"],
  },
  img: [
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
      link: "https://github.com/B-a-r-r/Votator",
    },
  ]
};
