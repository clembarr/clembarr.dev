import { socialsIcons, documents, coreImages, menuIcons } from "./index";
import {
  SocialMedia,
  CreditMention,
  ContactForm,
  NavbarPattern,
  Author,
  Country,
  ErrorMessage,
  Errors,
  EmailAPI,
  FlashMessage,
  Message,
  Hyperlink,
  SkillCategorie,
  AvailableSkillCategories,
  SkillSubcategorie,
  AvailableSkillSubcategories,
  AvailableSortOptions,
  SortOption,
  FilterOption,
  BlogCategory,
  GalleryControl,
  GalleryAction,
} from "./dataTypes";
import { UNIVERSAL_LANG } from "./i18n";

export const CARD_TEXT_MAX_LINES = 5;

export const galleryControls: Array<GalleryControl> = [
  { action: GalleryAction.NAVIGATE_NEXT,  label: "Next",      binding: "→",   keys: ["ArrowRight"] },
  { action: GalleryAction.NAVIGATE_PREV,  label: "Prev",      binding: "←",   keys: ["ArrowLeft"] },
  { action: GalleryAction.ZOOM_IN,        label: "Zoom +",    binding: "+",   keys: ["+", "="] },
  { action: GalleryAction.ZOOM_OUT,       label: "Zoom -",    binding: "-",   keys: ["-", "_"] },
  { action: GalleryAction.RESET,          label: "Reset",     binding: "0",   keys: ["0"] },
  { action: GalleryAction.CLOSE,          label: "Close",     binding: "Esc", keys: ["Escape"] },
];

export const PageTransitionsConstants = {
  DURATION: 0.4,
  REDUCED_MOTION_DURATION: 0.01,
  INITIAL_OPACITY: "0",
  INITIAL_Y: 20,
  ANIMATE_OPACITY: 1,
  ANIMATE_Y: "0",
  EXIT_OPACITY: "0",
  EXIT_Y: -20,
  EASE: "0.25 0.1 0.25 1", //space separated values
}

export const ScrollRevealConstants = {
  DURATION: 0.6,
  REDUCED_MOTION_DURATION: 0.01,
  INITIAL_POS: 50, //varies based on direction
  INITIAL_OPACITY: 0,
  ANIMATE_POS: 0,
  ANIMATE_OPACITY: 1,
  EASE: "0.25 0.1 0.25 1", //space separated values
}

export const ArticlesMotionConstants = {
  MOTION_OPACITY: 0,
  MOTION_Y: 20,
  ANIMATE_OPACITY: 1,
  ANIMATE_Y: 0,
  REDUCED_MOTION_TRANSITION_DURATION: 0.01,
  TRANSITION_DURATION: 0.5,
  TRANSITION_EASE: "0.25 0.1 0.25 1"
}

export const skillCategories: Array<SkillCategorie> = [
  {
    context: AvailableSkillCategories.LANGUAGE,
    content: 
    {
      fr: "Langages",
      en: "Languages",
    },
  },
  {
    context: AvailableSkillCategories.TOOL,
    content: 
    {
      fr: "Outils",
      en: "Tools",
    },
  },
  {
    context: AvailableSkillCategories.LIBRARY,
    content: 
    {
      fr: "Bibliothèques",
      en: "Libraries",
    },
  },
]

export const skillSubcategories: Array<SkillSubcategorie> = [
  {
    context: AvailableSkillSubcategories.WEB,
    parentCategory: AvailableSkillCategories.LANGUAGE,
    content: 
    {
      [UNIVERSAL_LANG]: "Web",
    },
  },
  {
    context: AvailableSkillSubcategories.DATABASE,
    parentCategory: AvailableSkillCategories.LANGUAGE,
    content: 
    {
      fr: "Base de données",
      en: "Database",
    },
  },
  {
    context: AvailableSkillSubcategories.BIGDATA,
    parentCategory: AvailableSkillCategories.LANGUAGE,
    content: 
    {
      [UNIVERSAL_LANG]: "Big Data",
    },
  },
  {
    context: AvailableSkillSubcategories.FORMATING,
    parentCategory: AvailableSkillCategories.LANGUAGE,
    content: 
    {
      fr: "Formatage",
      en: "Formating",
    },
  },
  {
    context: AvailableSkillSubcategories.SOFTWARE,
    parentCategory: AvailableSkillCategories.LANGUAGE,
    content: 
    {
      fr: "Logiciel",
      en: "Software",
    },
  },
]

/** Store all the available projects sort options and their 
 * displayed value. /!\ The order matters, as the four first 
 * options are displayed in the sorting bar. The rest is 
 * displayed in the sort options menu. */
export const sortOptions: Array<SortOption> = [
  {
    context: AvailableSortOptions.ALL,
    content: 
    {
      fr: "Tous",
      en: "All",
    },
  },
  {
    context: AvailableSortOptions.NEWEST,
    content: 
    {
      fr: "Récents",
      en: "Newest",
    },
    abreviation:
    {
      content:
      {
        [UNIVERSAL_LANG]: "Newest",
      },
    },
  },
  {
    context: AvailableSortOptions.OLDEST,
    content: 
    {
      fr: "Anciens",
      en: "Oldest",
    },
    abreviation:
    {
      content:
      {
        [UNIVERSAL_LANG]: "Oldest",
      },
    },
  },
  {
    context: AvailableSortOptions.DATA,
    content: 
    {
      fr: "Données",
      en: "Data",
    },
    abreviation:
    {
      content:
      {
        [UNIVERSAL_LANG]: "Data",
      },
    },
  },
  // {
  //   context: AvailableSortOptions.PERSONNAL,
  //   content: 
  //   {
  //     fr: "Personnels",
  //     en: "Personnal",
  //   },
  //   abreviation:
  //   {
  //     content:
  //     {
  //       [UNIVERSAL_LANG]: "Perso",
  //     },
  //   },
  // },
  {
    context: AvailableSortOptions.CP,
    content: 
    {
      fr: "Prog. concurrente",
      en: "Concurrent prog.",
    },
    abreviation:
    {
      content:
      {
        fr: "PC",
        en: "CP",
      },
    },
  },
  {
    context: AvailableSortOptions.EP,
    content: 
    {
      fr: "Prog. événementielle",
      en: "Event prog.",
    },
    abreviation:
    {
      content:
      {
        fr: "PE",
        en: "EP",
      },
    },
  },
  {
    context: AvailableSortOptions.FP,
    content: 
    {
      fr: "Prog. fonctionnelle",
      en: "Functional prog.",
    },
    abreviation:
    {
      content:
      {
        fr: "PF",
        en: "FP",
      },
    },
  },
  {
    context: AvailableSortOptions.OOP,
    content: 
    {
      fr: "Prog. objet",
      en: "Object prog.",
    },
    abreviation:
    {
      content:
      {
        fr: "POO",
        en: "OOP",
      },
    },
  },
  // {
  //   context: AvailableSortOptions.ACADEMIC,
  //   content: 
  //   {
  //     fr: "Académiques",
  //     en: "Academic",
  //   },
  //   abreviation:
  //   {
  //     content:
  //     {
  //       [UNIVERSAL_LANG]: "Acad",
  //     },
  //   },
  // },
  // {
  //   context: AvailableSortOptions.PROFESSIONAL,
  //   content: 
  //   {
  //     fr: "Professionnels",
  //     en: "Professional",
  //   },
  //   abreviation:
  //   {
  //     content:
  //     {
  //       [UNIVERSAL_LANG]: "Pro",
  //     },
  //   },
  // },
  {
    context: AvailableSortOptions.ALGORITHMIC,
    content: 
    {
      fr: "Algorithmie",
      en: "Algorithmic",
    },
  },
  {
    context: AvailableSortOptions.WEB,
    content:
    {
      [UNIVERSAL_LANG]: "Web",
    },
  },
];

/** Store all the available blog sorting/filtering options. */
export const blogSortingOptions: Array<FilterOption> = [
  { context: "ALL",                      content: { fr: "Tous", en: "All" } },
  { context: "NEWEST",                   content: { fr: "Récents", en: "Newest" } },
  { context: "OLDEST",                   content: { fr: "Anciens", en: "Oldest" } },
  { context: BlogCategory.RESEARCH,      content: { fr: "Recherche", en: "Research" } },
  { context: BlogCategory.DEVELOPMENT,   content: { fr: "Développement", en: "Development" }, abreviation: { content: { fr: "Dév", en: "Dev" } } },
  { context: BlogCategory.TUTORIAL,      content: { fr: "Tutoriel", en: "Tutorial" },         abreviation: { content: { fr: "Tuto", en: "Tuto" } } },
  { context: BlogCategory.ALGORITHM,     content: { fr: "Algorithmie", en: "Algorithm" },     abreviation: { content: { fr: "Algo", en: "Algo" } } },
  { context: BlogCategory.OPINION,       content: { fr: "Opinion", en: "Opinion" } },
];

/**
 * Store all the navigation links for each navbar patterns
 */
export const navLinks: Array<NavbarPattern> = [
  {
    route: '',
    links: [
      {
        content:
        {
          fr: "À propos",
          [UNIVERSAL_LANG]: "About",
        },
        link: "/#about",
      },
      {
        content:
        {
          fr: "Projets",
          [UNIVERSAL_LANG]: "Projects",
        },
        link: "/projects",
      },
      {
        content:
        {
          [UNIVERSAL_LANG]: "Blog",
        },
        link: "/blog",
      },
      {
        content:
        {
          fr: "Carrière",
          [UNIVERSAL_LANG]: "Career",
        },
        link: "/career",
      },
      {
        content:
        {
          [UNIVERSAL_LANG]: "Contact",
        },
        link: "/#contact",
      },
      {
        content:
        {
          [UNIVERSAL_LANG]: "CV",
        },
        link: documents.cv,
      },
    ],
  },
  {
    route: ['projects', 'project'],
    links: [
      {
        content:
        {
          fr: "Accueil",
          [UNIVERSAL_LANG]: "Home",
        },
        link: "/",
      },
      {
        content:
        {
          fr: "Projets",
          [UNIVERSAL_LANG]: "Projects",
        },
        link: "/projects",
      },
      {
        content:
        {
          [UNIVERSAL_LANG]: "Blog",
        },
        link: "/blog",
      },
      {
        content:
        {
          fr: "Carrière",
          [UNIVERSAL_LANG]: "Career",
        },
        link: "/career",
      },
      {
        content:
        {
          [UNIVERSAL_LANG]: "Contact",
        },
        link: "/#contact",
      },
      {
        content:
        {
          [UNIVERSAL_LANG]: "CV",
        },
        link: documents.cv,
      },
    ],
  },
  {
    route: 'blog',
    links: [
      {
        content:
        {
          fr: "Accueil",
          [UNIVERSAL_LANG]: "Home",
        },
        link: "/",
      },
      {
        content:
        {
          fr: "Projets",
          [UNIVERSAL_LANG]: "Projects",
        },
        link: "/projects",
      },
      {
        content:
        {
          [UNIVERSAL_LANG]: "Blog",
        },
        link: "/blog",
      },
      {
        content:
        {
          fr: "Carrière",
          [UNIVERSAL_LANG]: "Career",
        },
        link: "/career",
      },
      {
        content:
        {
          [UNIVERSAL_LANG]: "Contact",
        },
        link: "/#contact",
      },
      {
        content:
        {
          [UNIVERSAL_LANG]: "CV",
        },
        link: documents.cv,
      },
    ],
  },
  {
    route: 'career',
    links: [
      {
        content:
        {
          fr: "Accueil",
          [UNIVERSAL_LANG]: "Home",
        },
        link: "/",
      },
      {
        content:
        {
          fr: "Projets",
          [UNIVERSAL_LANG]: "Projects",
        },
        link: "/projects",
      },
      {
        content:
        {
          [UNIVERSAL_LANG]: "Blog",
        },
        link: "/blog",
      },
      {
        content:
        {
          fr: "Carrière",
          [UNIVERSAL_LANG]: "Career",
        },
        link: "/career",
      },
      {
        content:
        {
          [UNIVERSAL_LANG]: "Contact",
        },
        link: "/#contact",
      },
      {
        content:
        {
          [UNIVERSAL_LANG]: "CV",
        },
        link: documents.cv,
      },
    ],
  },
  {
    route: 'showcase',
    links: [
      {
        content:
        {
          fr: "Accueil",
          [UNIVERSAL_LANG]: "Home",
        },
        link: "/",
      },
      {
        content:
        {
          fr: "Projets",
          [UNIVERSAL_LANG]: "Projects",
        },
        link: "/projects",
      },
      {
        content:
        {
          [UNIVERSAL_LANG]: "Blog",
        },
        link: "/blog",
      },
      {
        content:
        {
          fr: "Carrière",
          [UNIVERSAL_LANG]: "Career",
        },
        link: "/career",
      },
      {
        content:
        {
          [UNIVERSAL_LANG]: "Contact",
        },
        link: "/#contact",
      },
      {
        content:
        {
          [UNIVERSAL_LANG]: "CV",
        },
        link: documents.cv,
      },
    ],
  },
  {
    route: 'glitch-demo',
    links: [
      {
        content:
        {
          fr: "Accueil",
          [UNIVERSAL_LANG]: "Home",
        },
        link: "/",
      },
      {
        content:
        {
          fr: "Projets",
          [UNIVERSAL_LANG]: "Projects",
        },
        link: "/projects",
      },
      {
        content:
        {
          [UNIVERSAL_LANG]: "Blog",
        },
        link: "/blog",
      },
      {
        content:
        {
          fr: "Carrière",
          [UNIVERSAL_LANG]: "Career",
        },
        link: "/career",
      },
      {
        content:
        {
          [UNIVERSAL_LANG]: "Contact",
        },
        link: "/#contact",
      },
      {
        content:
        {
          [UNIVERSAL_LANG]: "CV",
        },
        link: documents.cv,
      },
    ],
  },
];

/**
 * Store all the countries related to an available language or phone code
 */
export const countries: Array<Country> = [
  {
    symbol: "fr",
    label: "France",
    phoneCode: "+33",
  },
  {
    symbol: "en",
    label: "United States",
    phoneCode: "+1",
  },
  {
    symbol: "gb",
    label: "United Kingdom",
    phoneCode: "+44",
  },
  {
    symbol: "de",
    label: "Germany",
    phoneCode: "+49",
  },
  {
    symbol: "es",
    label: "Spain",
    phoneCode: "+34",
  },
  {
    symbol: "it",
    label: "Italy",
    phoneCode: "+39",
  },
  {
    symbol: "be",
    label: "Belgium",
    phoneCode: "+32",
  },
  {
    symbol: "nl",
    label: "Netherlands",
    phoneCode: "+31",
  },
  {
    symbol: "ch",
    label: "Switzerland",
    phoneCode: "+41",
  },
  {
    symbol: "dk",
    label: "Denmark",
    phoneCode: "+45",
  },
  {
    symbol: "ru",
    label: "Russia",
    phoneCode: "+7",
  },
  {
    symbol: "jp",
    label: "Japan",
    phoneCode: "+81",
  }
];

/**
 * Store all the social media links available for the app
 */
export const socialMedia: Array<SocialMedia> = [
  {
    label: "mail",
    icon: socialsIcons.mail_icon,
    link: "mailto:clementbarriere64@gmail.com",
    at: "clementbarriere64@gmail.com",
  },
  {
    label: "github",
    icon: socialsIcons.github_icon,
    link: "https://github.com/B-a-r-r",
    at: "@B-a-r-r",
  },
  {
    label: "linkedin",
    icon: socialsIcons.linkedin_icon,
    link: "https://www.linkedin.com/in/clement-barriere",
    at: "@clement-barriere",
  },
];

/**
 * Store all the credits mentions for the assets used in the app
 */
export const creditsMentions: Array<CreditMention> = [
  {
    content: 
    {
      fr: "Croquis de Sisyphe original",
      en: "Original Sisyphus sketch",
    },
    contentRef: coreImages.sysiphus,
    link: "https://www.google.com/search/about-this-image?img=H4sIAAAAAAAAAFMy5NLnePr3nIoAkwSjkoq5hZlJomlysm6KSWqyrolZkqWuhbllmm6SiamRpUmymZFxUgoAWMCsSTMAAAA&sa=X&ved=2ahUKEwjA-qCj4dqKAxUoVaQEHYJXNngQs6gLegQIDBAB",
  },
  {
    content: 
    {
      fr: "Croquis de Héphaïstos original",
      en: "Original Hephaistos sketch",
    },
    contentRef: coreImages.hephaistos,
    link: "https://fr.pinterest.com/pin/1080582504340139757/",
  },
  {
    content: 
    {
      fr: "Icones de menu et réseaux",
      en: "Menu and social medias icons",
    },
    contentRef: [
      menuIcons.arrow_up_icon, 
      menuIcons.burger_menu_icon, 
      menuIcons.chevron_icon, 
      menuIcons.close_menu_icon, 
      menuIcons.double_chevrons_icon,
      socialsIcons.github_icon, 
      socialsIcons.linkedin_icon, 
      socialsIcons.mail_icon
    ],
    link: "https://boxicons.com/",
  },
];

/**
 * Store the copyrigth mention for the app
 */
export const copyrigthText: Hyperlink = {
  content: {
    [UNIVERSAL_LANG]: `clembarr.dev © 2026,<br/>by Clément Barrière,<br/>under CC BY 4.0`,
  },
  link: "https://creativecommons.org/licenses/by/4.0/",
};

/**
 * Store the email API information
 */
const emailAPI: EmailAPI = {
  apiName: "emailjs",
  serviceId: "clembarr.dev_1234",
  templateId: "clembarr.dev_contact",
  publicKey: "XhGuv8Ll1Znl6NEuG",
};

/**
 * Store information on the author of the app
 */ 
export const author: Author = {
  firstName: "Clément",
  lastName: "Barrière",
};

/**
 * Store all the error messages for the app
 */
export const errorMessages: Array<ErrorMessage> = [
  {
    error: Errors.NOT_FOUND,
    content: 
    {
      fr: "La page à laquelle vous tentez d'accéder n'existe pas.<br/>",
      en: "The page you are trying to access does not exist.<br/>",
    },
  }
];

/** 
 * Store the available languages for the app
 */
export const availableLanguages: Array<Country> = [
  countries.find((country) => country.label === "France")!,
  countries.find((country) => country.label === "United States")!,
];

/**
 * Store the flash messages 
 */
export const flashMessages: Array<FlashMessage> = [
  {
    context: "theme",
    content: 
    {
      fr: "Le theme sombre arrive bientôt..",
      en: "Dark mode comming soon..",
    },
    type: "info",
  },
];

export const noDataMessages: Array<Message> = [
  {
    context: "projects",
    content:
    {
      fr: "Aucun projet ne correspond à vos critères >_<",
      en: "No project matches your search criteria >_<",
    },
  },
  {
    context: "projectImages",
    content:
    {
      fr: "Aucune image disponible.",
      en: "No available image.",
    },
  },
  {
    context: "blog",
    content:
    {
      fr: "Aucun article trouvé",
      en: "No articles found",
    },
  },
  {
    context: "blogEmpty",
    content:
    {
      fr: "Aucun article pour le moment",
      en: "No articles yet",
    },
  },
  {
    context: "blogEmptyHint",
    content:
    {
      fr: "Les articles arrivent bientôt !",
      en: "Blog posts coming soon!",
    },
  },
  {
    context: "blogNoResultsHint",
    content:
    {
      fr: "Essayez de modifier vos filtres",
      en: "Try adjusting your search or filters",
    },
  },
];

export const placeholderMessages: Array<Message> = [
  {
    context: "search",
    content: 
    {
      fr: "Entrez un mot-clé...",
      en: "Enter a keyword...",
    },
  },
  {
    context: "formFirstname",
    content: 
    {
      fr: "Prénom...",
      en: "Firstname...",
    },
  },
  {
    context: "formLastname",
    content: 
    {
      fr: "Nom...",
      en: "Lastname...",
    },
  },
  {
    context: "formEmail",
    content: 
    {
      [UNIVERSAL_LANG]: "Email...",
    },
  },
  {
    context: "formPhone",
    content: 
    {
      fr: "Téléphone...",
      en: "Phone...",
    },
  },
  {
    context: "formMessage",
    content: 
    {
      fr: "C'est à vous...",
      en: "What's on your mind...",
    },
  },
  {
    context: "dropdownSort",
    content: 
    {
      fr: "Autre",
      en: "Other",
    },
  },
  {
    context: "projectGalleryButton",
    content:
    {
      fr: "Voir la galerie",
      en: "View gallery",
    },
  },
  {
    context: "projectGalleryButtonEmpty",
    content:
    {
      fr: "Aucune image disponible",
      en: "No image available"
    }
  },
  {
    context: "ErrorPageBackButton",
    content:
    {
      fr: "Retour à l'accueil",
      en: "Back to home",
    },
  },
  {
    context: "loadingComponent",
    content:
    {
      fr: "Chargement du composant...",
      en: "Loading component...",
    },
  },
  {
    context: "searchBlog",
    content:
    {
      fr: "Rechercher un article...",
      en: "Search articles...",
    },
  },
  {
    context: "blogClearFilters",
    content:
    {
      fr: "Effacer les filtres",
      en: "Clear Filters",
    },
  },
  {
    context: "blogLoading",
    content:
    {
      fr: "Chargement des articles...",
      en: "Loading blog posts...",
    },
  },
  {
    context: "blogResultSingular",
    content:
    {
      fr: "article trouvé",
      en: "article found",
    },
  },
  {
    context: "blogResultPlural",
    content:
    {
      fr: "articles trouvés",
      en: "articles found",
    },
  },
  {
    context: "blogTitle",
    content:
    {
      [UNIVERSAL_LANG]: "Blog & Research",
    },
  },
  {
    context: "blogSubtitle",
    content:
    {
      fr: "Réflexions sur le développement logiciel, la recherche, les algorithmes et la technologie.",
      en: "Thoughts on software development, research, algorithms, and technology.",
    },
  },
  {
    context: "blogRelatedArticles",
    content:
    {
      fr: "Articles similaires",
      en: "Related Articles",
    },
  },
  {
    context: "blogReadMore",
    content:
    {
      fr: "Lire la suite →",
      en: "Read more →",
    },
  },
  {
    context: "blogBackToBlog",
    content:
    {
      fr: "← Retour au blog",
      en: "← Back to Blog",
    },
  },
  {
    context: "blogMinRead",
    content:
    {
      fr: "min de lecture",
      en: "min read",
    },
  },
  {
    context: "blogTableOfContents",
    content:
    {
      fr: "Table des matières",
      en: "Table of Contents",
    },
  },
  {
    context: "blogScrollProgress",
    content:
    {
      fr: "Progression",
      en: "Scroll Progress",
    },
  },
]

/**
 * Store all the information for the contact form
 */
export const contactForm: ContactForm = {
  title: 
  {
    fr: "N'hésitez pas<br/>à me contacter",
    en: "Feel free<br/>to contact me",
  },
  messageMinLength: 40,
  fields: 
  {
    firstname: placeholderMessages.find((message) => message.context === "formFirstname")!,
    lastname: placeholderMessages.find((message) => message.context === "formLastname")!,
    email: placeholderMessages.find((message) => message.context === "formEmail")!,
    phone: placeholderMessages.find((message) => message.context === "formPhone")!,
    message: placeholderMessages.find((message) => message.context === "formMessage")!,
  },
  mendatoryFields: [ "firstname", "lastname", "email", "message" ],
  alert: [
    {
      context: "email",
      content: 
      {
        fr: "Veuillez entrer une adresse email valide. (e.g mail@domaine.com)",
        en: "Please enter a valid email address. (e.g mail@domaine.com)",
      }
    },
    {
      context: "phone",
      content:
      {
        fr: "Veuillez entrer un numéro de téléphone valide, sans espaces, ou aucun. (e.g +33 0612345678)",
        en: "Please enter a valid phone number, without whitespaces, or none. (e.g +33 0612345678)",
      },
    },
    {
      context: "message",
      content:
      {
        fr: "Votre message est trop court. Il doit contenir au moins 80 caractères.",
        en: "Your message is too short. It should contain at least 80 characters.",
      },
    },
    {
      context: "cooldown",
      content:
      {
        fr: "Vous avez atteint le nombre maximum de requêtes autorisées. \
          Veuillez réessayer plus tard.",
        en: "You have reached the maximum number of requests allowed. \
          Please try again later.",
      },
    },
    {
      context: "apiError",
      content:
      {
        fr: "Oups, quelque chose s'est mal passé... Veuillez réessayer plus tard.",
        en: "Oops, something went wrong... Please try again later.",
      },
    },
    {
      context: "apiOK",
      content:
      {
        fr: "Votre message a bien été envoyé !",
        en: "Your message has been sent successfully!",
      },
    },
    {
      context: "mendatory",
      content:
      {
        fr: "champs obligatoires.",
        en: "mendatory fields.",
      },
    },
    {
      context: "submit",
      content:
      {
        fr: "Envoyer",
        en: "Submit",
      },
    },
    {
      context: "names",
      content:
      {
        fr: "Veuillez entrer votre nom et prénom.",
        en: "Please enter your first and last name.",
      },
    }
  ],
  emailAPI: emailAPI,
  submitCooldown: 30000,
  tentativeLimit: 2, 
  tentativeCooldown: 86400000, 
};

/**
 * Store all the information for the about section links.
 * context == "0" indicates another page redirection (<Link>) 
 * and context == "1" indicates an external link (<a>) 
 */
export const aboutLinks: Array<Hyperlink> = [
  {
    context: "0",
    content:
    {
      fr: "→ Carrière",
      en: "→ Career path",
    },
    link: documents.cv
  },
  {
    context: "1",
    content:
    {
      fr: "→ Curiculum vitae",
      en: "→ Resume"
    },
    link: "/career"
  },
];