import { socialsIcons, documents, coreImages, menuIcons } from "./index";
import {
  SocialMedia,
  CreditMention,
  ContactForm,
  NavbarPattern,
  Country,
  ErrorMessage,
  Errors,
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
import { UNIVERSAL_LANG } from "../utils/translationUtils";
import { emailAPI } from "./configConstants";

export const CARD_TEXT_MAX_LINES = 5;

export const galleryControls: Array<GalleryControl> = [
  { action: GalleryAction.NAVIGATE_NEXT,  label: "Next",      binding: "→",   keys: ["ArrowRight"] },
  { action: GalleryAction.NAVIGATE_PREV,  label: "Prev",      binding: "←",   keys: ["ArrowLeft"] },
  { action: GalleryAction.ZOOM_IN,        label: "Zoom +",    binding: "+",   keys: ["+", "="] },
  { action: GalleryAction.ZOOM_OUT,       label: "Zoom -",    binding: "-",   keys: ["-", "_"] },
  { action: GalleryAction.RESET,          label: "Reset",     binding: "0",   keys: ["0"] },
  { action: GalleryAction.CLOSE,          label: "Close",     binding: "Esc", keys: ["Escape"] },
];

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
    context: AvailableSortOptions.AI,
    content: 
    {
      fr: "IA",
      en: "AI",
    },
  },
  {
    context: AvailableSortOptions.SOFTWARE,
    content: 
    {
      fr: "Logiciel",
      en: "Software",
    },
    abreviation:
    {
      content:
      {
        [UNIVERSAL_LANG]: "Soft.",
        fr: "Logi.",
      },
    }
  },
  {
    context: AvailableSortOptions.ALGORITHMIC,
    content: 
    {
      fr: "Algorithmie",
      en: "Algorithmic",
    },
    abreviation:
    {
      content:
      {
        [UNIVERSAL_LANG]: "Algo",
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
  },
  {
    context: AvailableSortOptions.WEB,
    content:
    {
      [UNIVERSAL_LANG]: "Web",
    },
  },
  {
    context: AvailableSortOptions.RESEARCH,
    content: 
    {
      fr: "Recherche",
      en: "Research",
    },
    abreviation:
    {
      content:
      {
        [UNIVERSAL_LANG]: "R&D",
      },
    }
  },
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
  {
    context: AvailableSortOptions.PERSONNAL,
    content: 
    {
      fr: "Personnels",
      en: "Personnal",
    },
    abreviation:
    {
      content:
      {
        [UNIVERSAL_LANG]: "Perso",
      },
    },
  },
  {
    context: AvailableSortOptions.ACADEMIC,
    content: 
    {
      fr: "Académiques",
      en: "Academic",
    },
    abreviation:  
    {
      content:
      {
        [UNIVERSAL_LANG]: "Acad.",
      },
    },
  },
  {
    context: AvailableSortOptions.PROFESSIONAL,
    content: 
    {
      fr: "Professionnels",
      en: "Professional",
    },
    abreviation:
    {
      content:
      {
        [UNIVERSAL_LANG]: "Pro",
      },
    },
  },
  {
    context: AvailableSortOptions.FAVORITE,
    content:
    {
      fr: "Favoris",
      en: "Favourites",
    },
    abreviation:
    {
      content:
      {
        [UNIVERSAL_LANG]: "Fav.",
      },
    },
  },
  {
    context: AvailableSortOptions.HARDWARE,
    content:
    {
      fr: "Matériel",
      en: "Hardware",
    },
    abreviation:
    {
      content:
      {
        [UNIVERSAL_LANG]: "Hard.",
      },
    },
  }
];

/** Store all the available blog sorting/filtering options. */
export const blogSortingOptions: Array<FilterOption> = [
  { 
    context: "ALL", 
    content: 
    { 
      fr: "Tous", 
      en: "All" 
    } 
  },
  { 
    context: "NEWEST",
    content: 
    { 
      fr: "Récents", 
      en: "Newest" 
    } 
  },
  { 
    context: "OLDEST",
    content: 
    { 
      fr: "Anciens", 
      en: "Oldest" 
    } 
  },
  { 
    context: BlogCategory.RESEARCH,
    content: 
    { 
      fr: "Recherche", 
      en: "Research" 
    } 
  },
  { 
    context: BlogCategory.DEVELOPMENT,
    content: 
    { 
      fr: "Développement", 
      en: "Development" 
    }, 
    abreviation: 
    { 
      content: 
      { 
        fr: "Dév", 
        en: "Dev" 
      } 
    } 
  },
  { 
    context: BlogCategory.TUTORIAL,
    content: 
    { 
      fr: "Tutoriel", 
      en: "Tutorial" 
    },         
    abreviation: 
    { 
      content: 
      { 
        fr: "Tuto", 
        en: "Tuto" 
      } 
    } 
  },
  { 
    context: BlogCategory.ALGORITHM,
    content: 
    { 
      fr: "Algorithmie", 
      en: "Algorithm" 
    },     
    abreviation: 
    { 
      content: 
      { 
        fr: "Algo", 
        en: "Algo" 
      } 
    } 
  },
  { 
    context: BlogCategory.OPINION,
    content: 
    { 
      fr: "Opinion", 
      en: "Opinion" 
    } 
  },
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
          fr: "Carrière",
          [UNIVERSAL_LANG]: "Career",
        },
        link: "/#career",
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
          [UNIVERSAL_LANG]: "Contact",
        },
        link: "/#contact",
      },
      {
        context: "1",
        content:
        {
          [UNIVERSAL_LANG]: "CV",
        },
        link: documents.curiculumVitae,
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
          [UNIVERSAL_LANG]: "Contact",
        },
        link: "/#contact",
      },
      {
        context: "1",
        content:
        {
          [UNIVERSAL_LANG]: "CV",
        },
        link: documents.curiculumVitae,
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
          [UNIVERSAL_LANG]: "Contact",
        },
        link: "/#contact",
      },
      {
        context: "1",
        content:
        {
          [UNIVERSAL_LANG]: "CV",
        },
        link: documents.curiculumVitae,
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
          [UNIVERSAL_LANG]: "Contact",
        },
        link: "/#contact",
      },
      {
        context: "1",
        content:
        {
          [UNIVERSAL_LANG]: "CV",
        },
        link: documents.curiculumVitae,
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
    link: "https://github.com/clembarr",
    at: "@clembarr",
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
      fr: "Croquis de Sisyphe",
      en: "Sisyphus sketch",
    },
    contentRef: coreImages.sysiphus,
    link: "https://www.google.com/search/about-this-image?img=H4sIAAAAAAAAAFMy5NLnePr3nIoAkwSjkoq5hZlJomlysm6KSWqyrolZkqWuhbllmm6SiamRpUmymZFxUgoAWMCsSTMAAAA&sa=X&ved=2ahUKEwjA-qCj4dqKAxUoVaQEHYJXNngQs6gLegQIDBAB",
  },
  {
    content:
    {
      fr: "Empreintes digitales",
      en: "Fingerprints",
    },
    contentRef: coreImages.hephaistos,
    link: "https://pin.it/3EXJ4aFFY",
  },
  {
    content: 
    {
      fr: "Silhouette ascii",
      en: "Ascii silhouette",
    },
    contentRef: coreImages.heroFigure,
    link: "https://pin.it/4LxNpn3hI",
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
  {
    content:
    {
      fr: "Icônes de compétences",
      en: "Skills icons",
    },
    link: "https://boxicons.com/",
  }
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
  },
  {
    error: Errors.MEDIA_TYPE_NOT_SUPPORTED,
    content: 
    {
      fr: "Le type de média n'est pas supporté.",
      en: "Media type is not supported.",
    },
  },
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
      fr: "Aucun article ne correspond à vos critères >_<",
      en: "No article matches your search criteria >_<",
    },
  },
  {
    context: "blogEmpty",
    content:
    {
      fr: "Les articles arrivent bientôt !",
      en: "Blog posts coming soon!",
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
    context: "1",
    content:
    {
      fr: "→ Curiculum vitae",
      en: "→ Resume"
    },
    link: documents.curiculumVitae.link
  },
  {
    context: "0",
    content:
    {
      fr: "→ Carrière",
      en: "→ Career"
    },
    link: "/#career"
  }
];


export const GALAXY_CLUSTER_COLORS: Record<string, string> = {
  WEB: '#7CFFC4',
  SOFTWARE: '#FF6B6B',
  DATABASE: '#4ECDC4',
  BIGDATA: '#FFE66D',
  FORMATING: '#A78BFA',
  OTHER: '#71cbb3',
};
/** Delay in milliseconds before the gallery keyboard hints fade out. */
export const GALLERY_HINTS_DELAY_MS = 5000;

/** Delay in ms before the hero illustration and text fade in on mount. */
export const HERO_FADE_DELAY_MS = 100;

/** Interval in ms between each character typed in the hero subtitle. */
export const HERO_TYPING_SPEED_MS = 50;

/** Interval in ms between each character deleted in the hero subtitle. */
export const HERO_BACKSPACE_SPEED_MS = 1;

/** Pause in ms after a subtitle is fully typed before backspacing begins. */
export const HERO_TYPING_PAUSE_MS = 4000;

/** Interval in ms between each card appearing in the projects slider stack. */
export const SLIDER_CARD_INTERVAL_MS = 200;

/** Per-card timeout multiplier in ms for the slider apparition end detection. */
export const SLIDER_CARD_APPARITION_TIMEOUT_MS = 400;

/** CSS perspective depth for the projects slider stack (px). */
export const SLIDER_PERSPECTIVE = '1000px';

/** CSS perspective depth for the projects listing grid (px). */
export const PROJECTS_LISTING_PERSPECTIVE = '2000px';
