import { MultilingualContent, MultilingualContentArray } from "../utils/translationUtils";
export type { MultilingualContent, MultilingualContentArray };

/**
 * @interface PlacedTag
 * @description Stores the computed position and measured dimensions of a placed tag.
 * @property tag - The original tag string.
 * @property x - The x-coordinate of the top-left corner of the tag.
 * @property y - The y-coordinate of the top-left corner of the tag.
 * @property w - The width of the tag.
 * @property h - The height of the tag.
 */
export interface PlacedTag {
  tag: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

/**
 * @interface SkillNode
 * @description Represents a skill in the SkillGalaxy, with position, size, cluster, color and icon information for visualization.
 * @property id - The unique identifier of the skill.
 * @property label - The label or name of the skill.
 * @property x - The x-coordinate of the skill's position.
 * @property y - The y-coordinate of the skill's position.
 * @property size - The size of the skill's circle.
 * @property cluster - The cluster or category to which the skill belongs.
 * @property color - The color of the skill's circle.
 * @property icon - The icon associated with the skill.
 */
export interface SkillNode {
  id: string;
  label: string;
  x: number;
  y: number;
  size: number;
  cluster: string;
  color: string;
  icon?: string;
};

/**
 * @interface SkillLink
 * @description Represents a link between two skills in the SkillGalaxy, with source and target skill IDs and a type for categorization.
 * @property source - The ID of the source skill.
 * @property target - The ID of the target skill.
 * @property type - The type of the link, which can be 'framework' or 'career' to indicate the nature of the relationship between the skills.
 */
export interface SkillLink {
  source: string;
  target: string;
  type: string;
}

/**
 * @interface GalaxyLink
 * @description The props expected by the SkillGalaxy component, including arrays of skill nodes and links, and an optional className for styling.
 * @property source - The ID of the source skill.
 * @property target - The ID of the target skill.
 * @property type - The type of the link, which can be 'framework' or 'career' to indicate the nature of the relationship between the skills.
 */
export type GalaxyLink = {
  source: string;
  target: string;
  type: 'framework' | 'career';
};

/**
 * @interface SkillGalaxyProps
 * @description The props expected by the SkillGalaxy component, including arrays of skill nodes and links, and an optional className for styling.
 * @property nodes - An array of SkillNode objects representing the skills to be displayed in the galaxy.
 * @property links - An array of GalaxyLink objects representing the relationships between the skills.
 * @property className - An optional string for additional CSS classes to style the component.
 */
export type SkillGalaxyProps = {
  nodes: SkillNode[];
  links: GalaxyLink[];
  className?: string;
};

/** 
 * @enum CareerEntryType
 * @description The career entry types supported by the app. 
*/
export enum CareerEntryType {
  EDUCATION = "EDUCATION",
  EXPERIENCE = "EXPERIENCE",
  CERTIFICATION = "CERTIFICATION",
  VOLUNTEERING = "VOLUNTEERING",
}

/**
 * @interface CareerEntry
 * @description Structure of a career timeline entry.
 */
export interface CareerEntry {
  type: CareerEntryType;
  title: MultilingualContent;
  icon?: string;
  organization: MultilingualContent;
  period: MultilingualContent;
  description: MultilingualContent;
  tags?: string[];
}

/** The skill categories supported by the app. */
export enum AvailableSkillCategories {
  LANGUAGE = "LANGUAGE",
  TOOL = "TOOL",
  LIBRARY = "LIBRARY",
}
export interface SkillCategorie extends Omit<Message, "context"> {
  context: AvailableSkillCategories;
}

/** The skill subcategories supported by the app. */
export enum AvailableSkillSubcategories {
  WEB = "WEB",
  SOFTWARE = "SOFTWARE",
  DATABASE = "DATABASE",
  BIGDATA = "BIGDATA",
  FORMATING = "FORMATING",
}
export interface SkillSubcategorie extends Omit<Message, "context"> {
  context: AvailableSkillSubcategories;
  parentCategory: AvailableSkillCategories;
}

/** The projects sort options supported by the app. */
export enum AvailableSortOptions {
  ALL = "ALL",
  ALGORITHMIC = "ALGORITHMIC",
  NEWEST = "NEWEST",
  OLDEST = "OLDEST",
  CP = "CP",
  EP = "EP",
  OOP = "OOP",
  ACADEMIC = "ACADEMIC",
  PERSONNAL = "PERSONNAL",
  PROFESSIONAL = "PROFESSIONAL",
  DATA = "DATA",
  WEB = "WEB",
  FP = "FP",
  AI = "AI",
  RESEARCH = "RESEARCH",
  SOFTWARE = "SOFTWARE",
  FAVORITE = "FAVORITE",
  HARDWARE = "HARDWARE",  
}

/**
 * Generic filter option used by Sortingbar and DropdownSort.
 */
export interface FilterOption extends Omit<Message, "context"> {
  context: string;
  abreviation?: Message;
}

/**
 * Project-specific sort option with a narrower context type.
 */
export interface SortOption extends FilterOption {
  context: AvailableSortOptions;
}

/**
 * Available information for a graphic asset.
 */
export interface GraphicAsset {
  label: string;
  content: {[theme: string]: string};
  alt: string;
}

export enum Errors {
  NOT_FOUND = 404,
  MEDIA_TYPE_NOT_SUPPORTED = 500,
}

/** Identifiers for project media types. */
export enum MediaType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  GIF = "GIF"
}

/**
 * Structure of a project media asset.
 */
export interface ProjectMedia {
  url: string;
  type: MediaType;
  alt?: string;
  poster?: string;
}

/**
 * Structure of a project overview and available information. 
 * These are the metadata needed for listings and sliders.
 */
export interface Project {
  title: MultilingualContent;
  description: MultilingualContent;
  tags: MultilingualContentArray;
  coverImage: string | ProjectMedia;
  date: Date;
  favorite?: boolean;
  img?: string[] | ProjectMedia[]; // Kept for backward compatibility
}

/**
 * Detailed content of a project/retex.
 */
export interface RetexContent {
  specs: MultilingualContent;
  notions: MultilingualContentArray;
  tools: Skill[];
  images: string[] | ProjectMedia[];
  additionalRessources?: Hyperlink[];
  relatedPosts?: string[];
}

/**
 * Complete project structure combining metadata and detailed content.
 */
export interface Retex extends Project {
  content: RetexContent;
}

/**
 * Data structure to represent a country
*/
export interface Country {
  symbol: string;
  label: string;
  phoneCode: string;
}

/**
 * Available information for a social media link.
 */
export interface SocialMedia {
  label: string;
  icon: GraphicAsset;
  link: string;
  at: string;
}

/**
 * Available properties for a biography text.
 */
export interface Biography extends Message {
  title: MultilingualContent;
  active: boolean;
}

/**
 * Available properties for a displayed skill.
 */
export interface Skill {
  label: string;
  icon: GraphicAsset;
  category: SkillCategorie;
  subcategory?: SkillSubcategorie;
  framework?: string;
  link?: string;
  weight?: number;
}

/**
 * Pattern of a credit mention.
 */
export interface CreditMention extends Hyperlink{
  contentRef: GraphicAsset | GraphicAsset[];
  author?: Author;
}

/**
 * Available properties for a message with a hyperlink.
 */
export interface Hyperlink extends Message {
  link: string | MultilingualContent | Hyperlink;
}

/**
 * Represent the available information on the email API
 */
export interface EmailAPI {
  apiName: string;
  serviceId: string;
  templateId: string;
  publicKey: string;
}

/**
 * Represent the structure of a contact form for the app.
 */
export interface ContactForm {
  title: MultilingualContent;
  messageMinLength?: number;
  fields: {[field: string]: Message};
  mendatoryFields: string[];
  alert: Message[];
  emailAPI: EmailAPI; 
  submitCooldown: number; 
  tentativeLimit: number; 
  tentativeCooldown: number; 
}

/**
 * Information on a navbar pattern
 */
export interface NavbarPattern {
  route: string | string[];
  links: Hyperlink[];
}

/**
 * Displayable information about an author
 */
export interface Author {
  firstName: string;
  lastName: string;
  mail?: string;
  phone?: string
  location?: string;
}

/** 
 * Stored message pattern 
*/
export interface Message {
  context?: string;
  content: MultilingualContent;
}

/**
 * Displayable information about an error.
 */
export interface ErrorMessage extends Message {
  error: Errors;
}

/**
 * Displayable information about a flash message in a particular context.
 */
export interface FlashMessage extends Message {
  context: string;
  type: "error" | "info" | "ok";
}

/**
 * Structure of a footer column.
 */
export interface FooterColumn {
  title: MultilingualContent;
  context: string;
  content: Hyperlink[] | CreditMention[] | NavbarPattern[];
}

/** Identifiers for gallery viewer actions. */
export enum GalleryAction {
  NAVIGATE_NEXT = "NAVIGATE_NEXT",
  NAVIGATE_PREV = "NAVIGATE_PREV",
  ZOOM_IN = "ZOOM_IN",
  ZOOM_OUT = "ZOOM_OUT",
  RESET = "RESET",
  CLOSE = "CLOSE",
}

/**
 * A keyboard/UI control for the gallery viewer.
 */
export interface GalleryControl {
  action: GalleryAction;
  label: string;
  binding: string;
  keys: string[];
}

/** Blog post categories supported by the app. */
export enum BlogCategory {
  RESEARCH = "RESEARCH",
  DEVELOPMENT = "DEVELOPMENT",
  TUTORIAL = "TUTORIAL",
  ALGORITHM = "ALGORITHM",
  OPINION = "OPINION",
}

/**
 * Structure of a table of contents item.
 */
export interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

/**
 * A paragraph/section of a blog post.
 */
export interface PostParagraph {
  title?: MultilingualContent;
  content: MultilingualContent;
}

/**
 * Complete blog post structure.
 */
export interface BlogPost extends Project {
  slug: string;
  coverImage: string | ProjectMedia;
  readingTime?:number;
  category: BlogCategory;
  paragraphs: PostParagraph[];
  tableOfContents?: boolean;
  relatedProjects?: string[];
}

/**
 * Structure of SEO constants for a page.
 */
export interface SEOConstants {
  title: string;
  description: string;
  keywords: string[];
  ogUrl: string;
  canonical: string;
}

/**
 * A spoken language with multilingual label and proficiency level.
 */
export interface LanguageLevel {
  label: MultilingualContent;
  level: MultilingualContent;
}

/**
 * Structure of a widget in the about section.
 */
export interface AboutWidget {
  id: string;
  title: MultilingualContent;
  content: MultilingualContent | MultilingualContentArray | LanguageLevel[];
}

/**
 * Context type for the retex display engine.
 * Holds the title of the currently displayed retex and its setter.
 */
export interface RetexContextType {
  displayedRetexTitle: string | undefined;
  setDisplayedRetex: React.Dispatch<React.SetStateAction<string | undefined>>;
}
