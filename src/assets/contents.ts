import {
  Message,
  Biography,
  Hyperlink,
  FooterColumn,
  AboutWidget,
  CareerEntry,
  CareerEntryType,
} from "./dataTypes";
import { navLinks, creditsMentions } from "./constants";
import { CGILogo, ESIEALogo, FNMNSLogo, IUTInfoLogo, JDBLogo, LGPLogo, NagoyaULogo, ThalesLogo } from "./orga_icons";

// Re-export skills from its new dedicated file
export { skills } from './skills';

// Projects are now defined in separate files and re-exported
export { projects } from './projects';

/** The messages displayed under the main title in the Hero section
 * (with the writting machine effect). */
export const subtitleMessages: Array<Message> = [
    {
      content:
      {
        fr: "Développeur et créateur.",
        en: "Developer and creator.",
      }
    },
    {
      content:
      {
        fr: "De nouveaux projets arrivent !",
        en: "New projects are coming!",
      }
    },
    {
      content:      {
        fr: "La recherche avance !",
        en: "Research ongoing!",
      }
    },
    {
      content: 
      {
        fr: "Bienvenue sur mon portfolio.",
        en: "Welcome to my portfolio.",
      }
    },
];

/** Store the bigraphy templates, the first one having the property 'active' to 
 * true will be displayed. */
export const bioText: Array<Biography> = [
    {
      title: 
      {
        fr: "Explorer, créer et partager.",
        en: "Explore, create and share.",
      },
      content: {
        fr:
        "Passionné de recherche autour des <strong>systèmes complexes</strong>, notamment en <strong>IA cognitive et évolutive</strong>. \
        Plus généralement, je suis un <strong>ingénieur</strong> d'outils intelligents, alliant <strong>utilité</strong> et <strong>accessibilité</strong>.",
        en:
        "Passionate about research on <strong>complex systems</strong>, especially in <strong>cognitive and evolutionary AI</strong>. \
        More generally, I'm an <strong>engineer</strong> of intelligent tools, combining <strong>utility</strong> and <strong>accessibility</strong>.",
      },
      active: true,
    },
];

/** Shared links, mainly displayed in the footer. */
export const sharedLinks: Array<Hyperlink> = [
  {
    content:
    {
      fr: "Elias, développeur cybersécurité",
      en: "Elias, cybersecurity developer",
    },
    link: "https://eliasgauthier.fr",
  },
  {
    content: 
    {
      fr: "Théo, développeur d'IA génératives",
      en: "Théo, generative AI developer",
    },
    link: "https://tcastillo.me",
    prioritized: true,
  },
  {
    content:
    {
      fr: "Zao, développeur de jeux vidéo",
      en: "Zao, game developer",
    },
    link: "https://zaofromage.github.io/portfolio",
  },
  {
    content:
    {
      fr: "Antoine, spécialiste des microservices",
      en: "Antoine, microservices specialist",
    },
    link: "https://labian0.github.io",
  },
  {
    content:
    {
      fr: "Alexandre, concepteur d'algorithmes",
      en: "Alexandre, algorithms conceptor",
    },
    link: "https://carcroks.github.io",
  },
  {
    content:
    {
      fr: "Mathieu, ingénieur data",
      en: "Mathieu, data engineer",
    },
    link: "https://matjay.me",
  },
  {
    content:
    {
      fr: "Rodolphe, développeur de bots",
      en: "Rodolphe, bots developer",
    },
    link: "https://rodolphent.github.io/",
  },
  {
    content:
    {
      fr: "Gurvan, développeur de logiciels",
      en: "Gurvan, software developer",
    },
    link: "https://www.gdumarchat.dev/",
  },
  {
    content:
    {
      fr: "Rémi, entrepreneur innovant",
      en: "Rémi, innovative entrepreneur",
    },
    link: "https://remipuigsech.fr",
  }
];

/** Footer columns definition, mapping each column to its title, context and content. */
export const footerColumns: FooterColumn[] = [
  {
    title: { fr: "Navigation", en: "Navigation" },
    context: "navigation",
    content: navLinks,
  },
  {
    title: { fr: "Crédits", en: "Credits" },
    context: "credits",
    content: creditsMentions,
  },
  {
    title: { fr: "Voir aussi", en: "See also" },
    context: "see-also",
    content: sharedLinks,
  },
];

/** About section widgets titles and content. */
export const aboutWidgets: Array<AboutWidget> = [
  {
    id: "currently",
    title: 
    {
      fr: "Actuellement",
      en: "Currently",
    },
    content:
    {
      fr: "En <strong>cycle ingénieur</strong> à l'<strong>ESIEA Paris</strong>, spécialité IA et Data. <strong>Apprenti</strong> chez Thales à Cholet.",
      en: "In an <strong>engineering programme</strong> at <strong>ESIEA Paris</strong>, majoring in AI and Data. <strong>Apprentice</strong> at Thales in Cholet.",
    },
  },
  {
    id: "future",
    title: 
    {
      fr: "Pour l'avernir",
      en: "For the future",
    },
    content:
    {
      fr: "Devenir <strong>ingénieur</strong> en IA et modélisation, puis un <strong>rechercheur</strong> en <strong>vie artificielle</strong> et systèmes complexes.",
      en: "Become an <strong>engineer</strong> in AI and modeling, then a <strong>researcher</strong> in <strong>artificial life</strong> and complex systems.",
    },
  },
  {
    id: "hobbies",
    title: {
      fr: "Hobbies",
      en: "Hobbies",
    },
    content: {
      fr: ["Natation", "Philo", "Cuisine", "Musique"],
      en: ["Swimming", "Philo", "Cooking", "Music"],
    }
  },
  {
    id: "interests",
    title: {
      fr: "Intérêts",
      en: "Interests",
    },
    content: {
      fr: ["ALife", "IA", "Modélisation", "Logiciel"],
      en: ["ALife", "AI", "Modeling", "Software"],
    }
  },
  {
    id: "lang",
    title: {
      fr: "Langues",
      en: "Languages",
    },
    content: [
      {
        label: { fr: "🇫🇷 Français", en: "🇫🇷 French" },
        level: { fr: "Natif", en: "Native" },
      },
      {
        label: { fr: "🇬🇧 Anglais", en: "🇬🇧 English" },
        level: { fr: "Courant (C1)", en: "Fluent (C1)" },
      },
      {
        label: { fr: "🇪🇸 Espagnol", en: "🇪🇸 Spanish" },
        level: { fr: "Avancé (B1+)", en: "Advanced (B1+)" },
      }
    ]
  }
];

/** Career timeline entries, sorted from most recent to oldest. */
export const careerTimeline: Array<CareerEntry> = [
  {
    type: CareerEntryType.EXPERIENCE,
    title: {
      fr: "Ingénieur IA et Radiocomms",
      en: "AI and Radiocomms Engineer",
    },
    organization: {
      fr: "Thales, Cholet",
      en: "Thales, Cholet, France",
    },
    icon: ThalesLogo,
    period: {
      fr: "Sept. 2026\nAoût 2029",
      en: "Sept. 2026\nAug. 2029",
    },
    description: {
      fr: "Recherche, prototypage et benchmarking de solutions LLM appliquées à la synchronisation \
      de radiocommunications. Habilitation défense.",
      en: "Research, prototyping and benchmarking of LLM solutions applied to radiocommunication \
      synchronization. Defense security clearance.",
    },
    tags: {
      fr: ["Alternance", "LLM", "Agile", "Recherche", "TSI"],
      en: ["Apprenticeship", "LLM", "Agile", "Research", "SIP"],
    }
  },
  {
    type: CareerEntryType.EDUCATION,
    title: {
      fr: "Ingénieur Informatique",
      en: "Engineer's Degree in Computer Science",
    },
    organization: {
      fr: "ESIEA, Paris",
      en: "ESIEA, Paris",
    },
    icon: ESIEALogo,
    period: {
      fr: "Sept. 2026\nAoût 2029",
      en: "Sept. 2026\nAug. 2029",
    },
    description: {
      fr: "Cycle ingénieur à l'École Supérieure d'Informatique et d'Électronique Automatique, \
      spécialité intelligence artificielle et science des données.",
      en: "Engineering programme at the École Supérieure d'Informatique et d'Électronique Automatique, \
      majoring in artificial intelligence and data science.",
    },
    tags: {
      fr: ["IA", "Méca", "Management", "CTI"],
      en: ["AI", "Mech.", "Management", "CTI"],
    }
  },
  {
    type: CareerEntryType.EXPERIENCE,
    title: {
      fr: "Ingénieur logiciel",
      en: "Software Engineer",
    },
    organization: {
      fr: "CGI, Bordeaux",
      en: "CGI, Bordeaux",
    },
    icon: CGILogo,
    period: {
      fr: "Sept. 2025\nAoût 2026",
      en: "Sept. 2025\nAug. 2026",
    },
    description: {
      fr: "R&D sur le projet Grand Angle, ERP à destination des collectivités territoriales. Affecté au module de gestion du cycle de vie des flux financiers \
      et des échanges PES.",
      en: "R&D on Grand Angle, an ERP for local governments. Assigned to the financial flow lifecycle management module and PES exchanges.",
    },
    tags: {
      fr: ["Alternance", "Agile", "Conception"],
      en: ["Apprenticeship", "Agile", "Design"],
    }
  },
  {
    type: CareerEntryType.EXPERIENCE,
    title: {
      fr: "Chercheur ALife en Stage",
      en: "ALife Researcher Intern",
    },
    icon: NagoyaULogo,
    organization: {
      fr: "ALIFE-CORE, Nagoya University, Japon",
      en: "ALIFE-CORE, Nagoya University, Japan",
    },
    period: {
      fr: "Avr. 2025\nJuin 2025",
      en: "Apr. 2025\nJun. 2025",
    },
    description: {
      fr: "Évaluation d'un modèle d'expérience utilisant des LLMs, pour mesurer l'émergence de nouveautés. Étude de cas sur les biais de langage existant \
      dans ce modèle, dans le cadre de la recherche sur le non-déterminisme des systèmes artificiels.",
      en: "Evaluation of an experience model using LLMs, to measure the emergence of novelties. Case study on existing language biases \
      in this model, within the context of research on the non-determinism of artificial systems.",
    },
    tags: {
      fr: ["Stage", "Recherche", "ALife", "Modelisation", "International"],
      en: ["Internship", "Research", "ALife", "Modeling", "Abroad"],
    }
  },
  {
    type: CareerEntryType.EDUCATION,
    title: {
      fr: "BUT Informatique",
      en: "Bachlor's degree in Computer Science",
    },
    icon: IUTInfoLogo,
    organization: {
      fr: "IUT de Bordeaux",
      en: "IUT of Bordeaux",
    },
    period: {
      fr: "2023\n2026",
      en: "2023\n2026",
    },
    description: {
      fr: "Bachelor Universitaire de Technologie en Informatique, parcours \"développement d'applications\" (A).",
      en: "University Bachelor of Technology in Computer Science, specialized in \"application development\".",
    },
    tags: {
      fr: ["Conception", "FullStack", "Management"],
      en: ["Design", "FullStack", "Management"],
    }
  },
  {
    type: CareerEntryType.EXPERIENCE,
    title: {
      fr: "Sauveteur Aquatique",
      en: "Aquatic Lifeguard",
    },
    icon: LGPLogo,
    organization: {
      fr: "Le Grand Périgueux",
      en: "Le Grand Périgueux",
    },
    period: {
      fr: "Juin 2023\nAoût 2023",
      en: "Jun. 2023\nAug. 2023",
    },
    description: {
      fr: "Secourisme et surveillance de la baignade en équipe, bobologie, prévention et sensibilisation du public.\
      Contrôle qualité sur les équipements et infrastructures.",
      en: "First aid and swimming surveillance in a team, first aid, prevention and public awareness.\
      Quality control on equipments and infrastructures.",
    },
    tags: {
      fr: ["Secourisme", "Équipe", "Décision"],
      en: ["First Aid", "Teamwork", "Awareness"],
    }
  },
  {
    type: CareerEntryType.CERTIFICATION,
    title: {
      fr: "BNSSA",
      en: "BNSSA",
    },
    icon: FNMNSLogo,
    organization: {
      fr: "Fédération Nationale des Maîtres Nageurs Sauveteurs",
      en: "National Federation of Swimming Instructors and Lifeguards",
    },
    period: {
      fr: "2022",
      en: "2022",
    },
    description: {
      fr: "Brevet National de Secourisme et de Sauvetage Aquatique, niveau de secoursisme PSE1 : bobologie, réanimation cardio-pulmonaire, problèmes \
      respiratoires, circulatoires, neurologiques, traumatismes, etc. Sauvetage à la nage de victimes et législation relative à la sécurité en milieu aquatique.",
      en: "National Certificate of First Aid and Aquatic Rescue, level of first aid PSE1: first aid, cardiopulmonary resuscitation, respiratory, circulatory, \
      neurological problems, trauma, etc. Swimming rescue of victims and legislation related to safety in aquatic environments.",
    },
    tags: {
      fr: ["Natation", "Équipe"],
      en: ["Swimming", "Teamwork"],
    }
  },
  {
    type: CareerEntryType.EDUCATION,
    title: {
      fr: "BAC Général Maths et Informatique",
      en: "BAC Mathematics and Computer Science",
    },
    icon: JDBLogo,
    organization: {
      fr: "Lycée Jay de Beaufort, Périgueux",
      en: "Lycée Jay de Beaufort, Périgueux, France",
    },
    period: {
      fr: "2020\n2023",
      en: "2020\n2023",
    },
    description: {
      fr: "BAC général maths, phhysique-chimie, et informatique (NSI), puis spécialité maths et informatique (NSI) en terminale. \
      Mention Bien obtenue, option maths expertes.",
      en: "Highschool degree in maths, physics-chemistry, and computer science (NSI), then specialization in maths and computer science (NSI) \
      in the final year. Graduated with honors, with advanced maths option.",
    },
  },
];
