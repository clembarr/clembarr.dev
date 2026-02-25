import { skillsIcons } from "./index";
import { skillCategories, skillSubcategories } from "./constants";
import {
  Message,
  Biography,
  Skill,
  AvailableSkillCategories,
  AvailableSkillSubcategories,
  Hyperlink,
  CareerEntry,
  CareerEntryType,
} from "./dataTypes";

/** All the skill to display and their related information. */
export const skills: Array<Skill> = [
  {
    label: "React",
    icon: skillsIcons.react_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LANGUAGE)!,
    subcategory: skillSubcategories.find((subcategory) => subcategory.context === AvailableSkillSubcategories.WEB)!,
    framework: "Javascript",
    link: 'https://react.dev/',
    weight: 8
  },
  {
    label: "Typescript",
    icon: skillsIcons.typescript_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LANGUAGE)!,
    subcategory: skillSubcategories.find((subcategory) => subcategory.context === AvailableSkillSubcategories.WEB)!,
    framework: "Javascript",
    link: 'https://www.typescriptlang.org/',
    weight: 8
  },
  {
    label: "Python",
    icon: skillsIcons.python_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LANGUAGE)!,
    subcategory: skillSubcategories.find((subcategory) => subcategory.context === AvailableSkillSubcategories.SOFTWARE)!,
    link: "https://www.python.org/",
    weight: 9
  },
  {
    label: "Java",
    icon: skillsIcons.java_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LANGUAGE)!,
    subcategory: skillSubcategories.find((subcategory) => subcategory.context === AvailableSkillSubcategories.SOFTWARE)!,
    link: 'https://www.java.com/',
    weight: 8
  },
  {
    label: "VSCode",
    icon: skillsIcons.vscode_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.TOOL)!,
    link: 'https://code.visualstudio.com/',
    weight: 8
  },
  {
    label: "Docker",
    icon: skillsIcons.docker_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.TOOL)!,
    link: 'https://www.docker.com/'
  },
  {
    label: "Git",
    icon: skillsIcons.git_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.TOOL)!,
    link: 'https://git-scm.com/',
    weight: 9
  },
  {
    label: "GnuPG",
    icon: skillsIcons.gnupg_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LIBRARY)!,
    link: 'https://www.gnupg.org/'
  },
  {
    label: "Tailwind",
    icon: skillsIcons.tailwind_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LANGUAGE)!,
    subcategory: skillSubcategories.find((subcategory) => subcategory.context === AvailableSkillSubcategories.WEB)!,
    link: 'https://tailwindcss.com/'
  },
  {
    label: "Markdown",
    icon: skillsIcons.markdown_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LANGUAGE)!,
    subcategory: skillSubcategories.find((subcategory) => subcategory.context === AvailableSkillSubcategories.FORMATING)!,
    link: 'https://www.markdownguide.org/'
  },
  {
    label: "SQL",
    icon: skillsIcons.sql_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LANGUAGE)!,
    subcategory: skillSubcategories.find((subcategory) => subcategory.context === AvailableSkillSubcategories.DATABASE)!,
    link: 'https://fr.wikipedia.org/wiki/Structured_Query_Language'
  },
  {
    label: "Pandas",
    icon: skillsIcons.pandas_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LIBRARY)!,
    subcategory: skillSubcategories.find((subcategory) => subcategory.context === AvailableSkillSubcategories.BIGDATA)!,
    link: 'https://pandas.pydata.org/'
  },
  {
    label: "Numpy",
    icon: skillsIcons.numpy_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LIBRARY)!,
    subcategory: skillSubcategories.find((subcategory) => subcategory.context === AvailableSkillSubcategories.BIGDATA)!,
    link: 'https://numpy.org/'
  },
  {
    label: "Symfony",
    icon: skillsIcons.symfony_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LANGUAGE)!,
    subcategory: skillSubcategories.find((subcategory) => subcategory.context === AvailableSkillSubcategories.WEB)!,
    framework: "PHP",
    link: 'https://symfony.com/'
  },
  {
    label: "PHP",
    icon: skillsIcons.php_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LANGUAGE)!,
    subcategory: skillSubcategories.find((subcategory) => subcategory.context === AvailableSkillSubcategories.WEB)!,
    link: 'https://www.php.net/'
  },
  {
    label: "Debian",
    icon: skillsIcons.debian_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.TOOL)!,
    link: 'https://www.debian.org/'
  },
  {
    label: "Rust",
    icon: skillsIcons.rust_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LANGUAGE)!,
    subcategory: skillSubcategories.find((subcategory) => subcategory.context === AvailableSkillSubcategories.SOFTWARE)!,
    link: 'https://www.rust-lang.org/'
  },
  {
    label: "Latex",
    icon: skillsIcons.latex_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LANGUAGE)!,
    subcategory: skillSubcategories.find((subcategory) => subcategory.context === AvailableSkillSubcategories.FORMATING)!,
    link: 'https://www.latex-project.org/'
  },
  {
    label: "MySQL",
    icon: skillsIcons.mysql_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.TOOL)!,
    link: 'https://www.mysql.com/'
  },
  {
    label: "Bash",
    icon: skillsIcons.bash_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LANGUAGE)!,
    link: 'https://www.gnu.org/software/bash/'
  },
  {
    label: ".NET",
    icon: skillsIcons.dotnet_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LANGUAGE)!,
    subcategory: skillSubcategories.find((subcategory) => subcategory.context === AvailableSkillSubcategories.SOFTWARE)!,
    framework: "C#",
    link: 'https://dotnet.microsoft.com/'
  },
  {
    label: "Javascript",
    icon: skillsIcons.js_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LANGUAGE)!,
    subcategory: skillSubcategories.find((subcategory) => subcategory.context === AvailableSkillSubcategories.WEB)!,
    link: 'https://developer.mozilla.org/fr/docs/Web/JavaScript'
  },
  {
    label: "C",
    icon: skillsIcons.c_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LANGUAGE)!,
    subcategory: skillSubcategories.find((subcategory) => subcategory.context === AvailableSkillSubcategories.SOFTWARE)!,
    link: 'https://fr.wikipedia.org/wiki/C_(langage)'
  },
  {
    label: "Cpp",
    icon: skillsIcons.cplusplus_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LANGUAGE)!,
    subcategory: skillSubcategories.find((subcategory) => subcategory.context === AvailableSkillSubcategories.SOFTWARE)!,
    framework: "C",
    link: 'https://fr.wikipedia.org/wiki/C%2B%2B'
  },
  {
    label: "Figma",
    icon: skillsIcons.figma_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.TOOL)!,
    link: 'https://www.figma.com/'
  },
  {
    label: "Go",
    icon: skillsIcons.go_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LANGUAGE)!,
    subcategory: skillSubcategories.find((subcategory) => subcategory.context === AvailableSkillSubcategories.WEB)!,
    link: 'https://golang.org/'
  },
  {
    label: "C#",
    icon: skillsIcons.csharp_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LANGUAGE)!,
    subcategory: skillSubcategories.find((subcategory) => subcategory.context === AvailableSkillSubcategories.SOFTWARE)!,
    framework: "C",
    link: 'https://docs.microsoft.com/fr-fr/dotnet/csharp/'
  },
  {
    label: "CustomTK",
    icon: skillsIcons.customtkinter_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LIBRARY)!,
    link: 'https://github.com/TomSchimansky/CustomTkinter'
  },
  {
    label: "Matplotlib",
    icon: skillsIcons.matplotlib_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LIBRARY)!,
    link: 'https://matplotlib.org/'
  },
  {
    label: "CUDA",
    icon: skillsIcons.cuda_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LIBRARY)!,
    link: 'https://developer.nvidia.com/cuda-toolkit'
  },
  {
    label: "PyTorch",
    icon: skillsIcons.pytorch_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LIBRARY)!,
    link: 'https://pytorch.org/'
  }, 
  {
    label: "Transformers",
    icon: skillsIcons.hugging_face_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LIBRARY)!,
    link: 'https://huggingface.co/docs/transformers/index'
  },
  {
    label: "JUnit",
    icon: skillsIcons.junit_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LIBRARY)!,
    link: 'https://junit.org/junit5/'
  },
  {
    label: "SQL Server",
    icon: skillsIcons.sqlserver_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LIBRARY)!,
    link: 'https://docs.microsoft.com/en-us/sql/sql-server/?view=sql-server-ver15'
  },
  {
    label: "Twig",
    icon: skillsIcons.twig_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LIBRARY)!,
    link: 'https://twig.symfony.com/doc/3.x/'
  },
  {
    label: "PL/SQL",
    icon: skillsIcons.sql_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LIBRARY)!,
    link: 'https://www.oracle.com/database/technologies/appdev/plsql.html'
  },
  {
    label: "Axios",
    icon: skillsIcons.axios_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LIBRARY)!,
    link: 'https://axios-http.com/docs/intro'
  },
  {
    label: "Unittest",
    icon: skillsIcons.unittest_icon,
    category: skillCategories.find((category) => category.context === AvailableSkillCategories.LIBRARY)!,
    link: 'https://docs.python.org/3/library/unittest.html'
  }
];

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
        in computer science, at the University Institute of Technology (IUT) of Bordeaux, France.",
      },
      active: true,
    }
];

/** Shared links, mainly displayed in the footer. */
export const sharedLinks: Array<Hyperlink> = [
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
      en: "Zao, video games developer",
    },
    link: "https://zaofromage.github.io/portfolio",
  },
  {
    content:
    {
      fr: "Antoine, développeur d'API",
      en: "Antoine, API developer",
    },
    link: "https://labian0.github.io",
  },
  {
    content:
    {
      fr: "Alexandre, développeur d'algorithmes",
      en: "Alexandre, algorithms developer",
    },
    link: "https://carcroks.github.io",
  },
  {
    content:
    {
      fr: "Mathieu, data engineer",
      en: "Mathieu, engénieur data",
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
  }
];

/** Encarts de tags affichés dans la section About, entre le titre et les paragraphes. */
export const aboutTags = [
  { label: { fr: "Domaine", en: "Domain" }, tags: { fr: ["Dev Web", "IA", "Data"], en: ["Web Dev", "AI", "Data"] } },
  { label: { fr: "Hobbies", en: "Hobbies" }, tags: { fr: ["Musique", "Jeux vidéo", "Open Source"], en: ["Music", "Video Games", "Open Source"] } },
];

/** Les deux encarts textuels de la section About : présentation personnelle et projet actuel. */
export const aboutSections = [
  {
    title: { fr: "À propos de moi", en: "About me" },
    content: {
      fr:
        "Principalement intéressé par le développement d'outils intelligents, je cherche avant tout à lier <strong>utilité</strong> et <strong>accessibilité</strong> dans mes projets. \
        Mon objectif est de permettre au plus grand nombre de profiter des technologies utilitaires avancées. \
        <br/><br/> \
        La programmation est un art, nous permettant de matérialiser nos idées. J'en suis passionné depuis plusieurs années, \
        et mes nombreuses inspirations ont forgées <strong>ma polyvalence</strong>, qui fait aujourd'hui ma force.",
      en:
        "Mainly interested in the development of <strong>intelligent</strong> tools, I seek to link <strong>utility</strong> and <strong>accessibility</strong> in my projects. \
        My goal is to allow as many people as possible to benefit from advanced utility technologies.\
        <br/><br/> \
        Programming is an art that brings abstractions of the mind to life. I have been passionate about it for several years, \
        and my inspirations have forged <strong>my versatility</strong>, one of my key assets today.",
    },
  },
  {
    title: { fr: "Mon projet", en: "My project" },
    content: {
      fr:
        "Je prépare actuellement un Bachelor Universitaire de Technologie (<strong>BUT</strong>) \
        en informatique, à l'Institut Universitaire de Technologie (IUT) de Bordeaux, France.",
      en:
        "I am currently preparing a University Bachelor of Technology (<strong>BUT</strong>) \
        in computer science, at the University Institute of Technology (IUT) of Bordeaux, France.",
    },
  },
];

/** Page title and subtitle for the Career page. */
export const careerPageContent = {
  title: {
    fr: "Mon Parcours",
    en: "My Career Path",
  },
  subtitle: {
    fr: "Formation, expériences et projets marquants",
    en: "Education, experiences and notable projects",
  },
};

/** Career timeline entries, sorted from most recent to oldest. */
export const careerTimeline: Array<CareerEntry> = [
  {
    type: CareerEntryType.EXPERIENCE,
    title: {
      fr: "Stage développeur full-stack",
      en: "Full-stack developer internship",
    },
    organization: {
      fr: "Entreprise Tech",
      en: "Tech Company",
    },
    period: {
      fr: "Avr. 2025 — Juil. 2025",
      en: "Apr. 2025 — Jul. 2025",
    },
    description: {
      fr: "Développement d'une application web interne avec React, TypeScript et Node.js. Mise en place de tests unitaires et d'intégration continue.",
      en: "Development of an internal web application with React, TypeScript and Node.js. Implementation of unit tests and continuous integration.",
    },
    tags: ["React", "TypeScript", "Node.js", "Docker"],
  },
  {
    type: CareerEntryType.CERTIFICATION,
    title: {
      fr: "Certification Cloud Fundamentals",
      en: "Cloud Fundamentals Certification",
    },
    organization: {
      fr: "Fournisseur Cloud",
      en: "Cloud Provider",
    },
    period: {
      fr: "Fév. 2025",
      en: "Feb. 2025",
    },
    description: {
      fr: "Certification couvrant les fondamentaux du cloud computing : virtualisation, conteneurisation, services managés et bonnes pratiques de sécurité.",
      en: "Certification covering cloud computing fundamentals: virtualization, containerization, managed services and security best practices.",
    },
    tags: ["Cloud", "DevOps", "Docker"],
  },
  {
    type: CareerEntryType.PROJECT,
    title: {
      fr: "Portfolio personnel",
      en: "Personal portfolio",
    },
    organization: {
      fr: "Projet personnel",
      en: "Personal project",
    },
    period: {
      fr: "Sept. 2024 — Présent",
      en: "Sep. 2024 — Present",
    },
    description: {
      fr: "Conception et développement de ce portfolio avec React, TypeScript et Tailwind CSS. Intégration de fonctionnalités avancées : animations, blog, PWA, SEO.",
      en: "Design and development of this portfolio with React, TypeScript and Tailwind CSS. Integration of advanced features: animations, blog, PWA, SEO.",
    },
    tags: ["React", "TypeScript", "Tailwind", "Vite"],
  },
  {
    type: CareerEntryType.EDUCATION,
    title: {
      fr: "BUT Informatique",
      en: "Bachelor of Technology in Computer Science",
    },
    organization: {
      fr: "IUT de Bordeaux",
      en: "IUT of Bordeaux",
    },
    period: {
      fr: "Sept. 2022 — Juin 2025",
      en: "Sep. 2022 — Jun. 2025",
    },
    description: {
      fr: "Formation couvrant le développement logiciel, le web, les bases de données, l'algorithmique, la gestion de projet et le travail en équipe.",
      en: "Program covering software development, web, databases, algorithms, project management and teamwork.",
    },
    tags: ["Java", "Python", "SQL", "Web", "Agile"],
  },
  {
    type: CareerEntryType.VOLUNTEERING,
    title: {
      fr: "Bénévole — Initiation au code",
      en: "Volunteer — Coding introduction",
    },
    organization: {
      fr: "Association locale",
      en: "Local association",
    },
    period: {
      fr: "Jan. 2023 — Juin 2023",
      en: "Jan. 2023 — Jun. 2023",
    },
    description: {
      fr: "Animation d'ateliers d'initiation à la programmation pour des lycéens. Création de supports pédagogiques adaptés et accompagnement individuel.",
      en: "Running introductory programming workshops for high school students. Creating adapted educational materials and individual mentoring.",
    },
    tags: ["Python", "Scratch"],
  },
  {
    type: CareerEntryType.EDUCATION,
    title: {
      fr: "Baccalauréat général",
      en: "High School Diploma",
    },
    organization: {
      fr: "Lycée",
      en: "High School",
    },
    period: {
      fr: "Sept. 2019 — Juin 2022",
      en: "Sep. 2019 — Jun. 2022",
    },
    description: {
      fr: "Baccalauréat général avec spécialités Mathématiques et Numérique & Sciences Informatiques (NSI).",
      en: "General diploma with Mathematics and Computer Science specialties.",
    },
    tags: ["Python", "C"],
  },
];

/**
 * EMPTY RETEX TEMPLATE:
 * ---------------------
 * 
  {
    title: 
    {
      fr: "",
      en: "",
    },
    date: new Date(2025, 6),
    tools: [
    ],
    description:
    {
      fr:
      "",
    },
    specs:
    {
      fr: 
      "",
    },
    notions:
    {
      fr: [],
    },
    tags:
    {
      en: [],
    },
    img: [
    ],
    additionalRessources: [
      {
        content: 
        {
          fr: "",
          en: "",
        },
        link: "",
      },
    ]
  },
 */
