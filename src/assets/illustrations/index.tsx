import { GraphicAsset } from "../dataTypes";

import portrait from "./about_portrait.jpg";
import slider_figure_light from "./slider_figure_light.webp";
import slider_figure_dark from "./slider_figure_dark.webp";
import placeholder_retex_image from "./placeholder_retex_image.png";
import sysiphus_working from "./sysiphus_working.png";
import sysiphus_boulder from "./sysiphus_boulder.png";
import hero_figure_light from "./sysiphus_working.png";
import hero_figure_dark from "./hero_figure_dark.webp";

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

export const coreImages = {

  portrait,
  sysiphus,
  sysiphusBoulder,
  hephaistos,
  heroFigure,
  placeholder_retex_image

};

