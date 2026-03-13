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
import { CGILogo, FNMNSLogo, IUTInfoLogo, JDBLogo, LGPLogo, NagoyaULogo } from "./orga_icons";

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
        fr: "Développer un futur libre et équitable.",
        en: "Develop the future, free and fair.",
      },
      content: {
        fr:
          "Passionné par le développement d'outils intelligents, je lie <strong>utilité</strong> et <strong>accessibilité</strong> dans mes projets. \
          La programmation est un art, et <strong>ma polyvalence</strong> fait aujourd'hui ma force.",
        en:
          "Passionate about building intelligent tools, I combine <strong>utility</strong> and <strong>accessibility</strong> in my projects. \
          Programming is an art, and <strong>my versatility</strong> is one of my key assets today.",
      },
      active: true,
    },
    {
      title: 
      {
        fr: "Développer un futur libre et équitable.",
        en: "Develop the future, free and fair.",
      },
      content:
      {
        fr: 
        "Principalement intéressé par le développement d'outils intelligents, je cherche avant tout à lier <strong>utilité</strong> et <strong>accessibilité</strong> dans mes projets. \
        Mon objectif est de permettre au plus grand nombre de profiter des technologies utilitaires avancées. \
        <br/><br/> \
        La programmation est un art, nous permettant de matérialiser nos idées. J'en suis passionné depuis plusieurs années, \
        et mes nombreuses inspirations ont forgées <strong>ma polyvalence</strong>, qui fait aujourd'hui ma force. \
        <br/><br/>   \
        Je prépare actuellement un Bachelor Universitaire de Technologie (<strong>BUT</strong>) \
        en informatique, à l'Institut Universitaire de Technologie (IUT) de Bordeaux, France.",
        en: 
        "Mainly interested in the development of <strong>intelligent</strong> tools, I seek to link <strong>utility</strong> and <strong>accessibility</strong> in my projects. \
        My goal is to allow as many people as possible to benefit from advanced utility technologies.\
        <br/><br/> \
        Programming is an art that brings abstractions of the mind to life. I have been passionate about it for several years, \
        and my inspirations have forged <strong>my versatility</strong>, one of my key assets today. \
        <br/><br/>   \
        I am currently preparing a University Bachelor of Technology (<strong>BUT</strong>) \
        en informatique, à l'Institut Universitaire de Technologie (IUT) de Bordeaux, France.",
      },
      active: false,
    },
    {
      title:
      {
        fr: "Un développeur polyvalent, passionné par les outils intelligents.",
        en: "A versatile developer, passionate about intelligent tools.",
      },
      content:
      {
        fr: 
        "Je suis un développeur polyvalent, passionné par la création d'outils intelligents qui allient utilité et accessibilité. \
        Depuis plusieurs années, je m'efforce de maîtriser divers langages et technologies pour concrétiser mes idées. \
        Actuellement étudiant en Bachelor Universitaire de Technologie (BUT) en informatique à l'IUT de Bordeaux, je cherche à repousser les limites de ce que je peux créer et partager avec le monde.",
        en: 
        "I am a versatile developer, passionate about creating intelligent tools that combine utility and accessibility. \
        For several years, I have been striving to master various languages and technologies to bring my ideas to life. \
        Currently a student in a University Bachelor of Technology (BUT) in computer science at the IUT of Bordeaux, I seek to push the boundaries of what I can create and share with the world.",
      },
      active: false,
    },
];

/** Shared links, mainly displayed in the footer. */
export const sharedLinks: Array<Hyperlink> = [
  {
    content:
    {
      fr: "Elias, developpeur cybersécurité",
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
      fr: "Mathieu, engénieur data",
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
      fr: "Gurvan, developpeur de logiciels",
      en: "Gurvan, software developer",
    },
    link: "https://www.gdumarchat.dev/",
  },
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
      fr: "En dernière année <strong>BUT Informatique</strong> à <strong>l'IUT de Bordeaux.</strong>",
      en: "In my last year of <strong>Bachelor degree in Computer Science</strong> at the <strong>IUT of Bordeaux.</strong>",
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
      fr: "Entrer en <strong>école d'ingénieur</strong> et, à terme, faire de la <strong>recherche</strong> sur les systèmes complexes et la modélisation.",
      en: "Enter engineering school and, ultimately, do <strong>research</strong> on complex systems and modeling.",
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
        level: { fr: "Notions (A2)", en: "Basic (A2)" },
      }
    ]
  }
];

/** Career timeline entries, sorted from most recent to oldest. */
export const careerTimeline: Array<CareerEntry> = [
  {
    type: CareerEntryType.EXPERIENCE,
    title: {
      fr: "Ingénieur logiciel en Alternance",
      en: "Software Engineer in Apprenticeship",
    },
    organization: {
      fr: "CGI",
      en: "CGI",
    },
    icon: CGILogo,
    period: {
      fr: "Sept. 2025\nJuil. 2025",
      en: "Apr. 2025\nJul. 2025",
    },
    description: {
      fr: "R&D sur le projet Grand Angle, ERP à destination des collectivités territoriales. Affecté au module de gestion du cycle de vie des flux financiers \
      et des échanges PES.",
      en: "R&D on Grand Angle, an ERP for local governments. Assigned to the financial flow lifecycle management module and PES exchanges.",
    },
    tags: {
      fr: ["Alt.", "Agile", "Conception"],
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
