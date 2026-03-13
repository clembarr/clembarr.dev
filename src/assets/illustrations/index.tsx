import { GraphicAsset } from "../dataTypes";

import portrait_light from "./about_portrait_light.jpg";
import portrait_dark from "./about_portrait_dark.jpg";
import slider_figure_light from "./slider_figure_light.webp";
import slider_figure_dark from "./slider_figure_dark.webp";
import placeholder_retex_image from "./placeholder_retex_image.png";
import sysiphus_working from "./sysiphus_working.png";
import sysiphus_boulder from "./sysiphus_boulder.png";
import hero_figure_light from "./sysiphus_working.png";
import hero_figure_dark from "./hero_figure_dark.webp";
import career_figure_light from "./career_figure_light.webp";
import career_figure_dark from "./career_figure_dark.webp";

const sysiphus: GraphicAsset = {
  label: "sysiphus",
  content: {
    'light': sysiphus_working,
    'dark': sysiphus_working,
  },
  alt: "Sysiphus Sketch",
};

const sysiphusBoulder: GraphicAsset = {
  label: "sysiphusBoulder",
  content: {
    'light': sysiphus_boulder,
    'dark': sysiphus_boulder,
  },
  alt: "Sysiphus Boulder",
};

const hephaistos: GraphicAsset = {
  label: "hephaistos",
  content: {
    'light': slider_figure_light,
    'dark': slider_figure_dark,
  },
  alt: "Hephaistos Sketch",
};

const heroFigure: GraphicAsset = {
  label: "heroFigure",
  content: {
    'light': hero_figure_light,
    'dark': hero_figure_dark,
  },
  alt: "Hero Figure",
};

const portrait: GraphicAsset = {
  label: "author_portrait",
  content: {
    'light': portrait_light,
    'dark': portrait_dark,
  },
  alt: "Portrait of the author",
};

export const careerFigure: GraphicAsset = {
  label: "career_figure",
  content: {
    'light': career_figure_light,
    'dark': career_figure_dark,
  },
  alt: "Career Figure",
}

/**
 * @deprecated This file is deprecated and should not be used anymore. Please import illustrations individually.
 */
export const coreImages = {

  portrait,
  sysiphus,
  sysiphusBoulder,
  hephaistos,
  heroFigure,
  placeholder_retex_image,
};

