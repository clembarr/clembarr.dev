import cv_fr from "./CV-informatique-FR.pdf";
import cv_en from "./CV-informatique-EN.pdf";
import eew_internship_report from "./RapportStageBUT2-BARRIERE-2025-4.pdf";
import eew_activity_report from "./InternshipActivityReport-BARRIERE-2025-3.pdf";
import { UNIVERSAL_LANG } from "../../utils/translationUtils";
import { Hyperlink } from "../dataTypes";

export const curiculumVitae: Hyperlink = {
  content: {
    [UNIVERSAL_LANG]: "CV",
  },
  link: {
    [UNIVERSAL_LANG]: cv_en,
    fr: cv_fr,
  },
};

export const eewInternshipReport: Hyperlink = {
  content: {
    [UNIVERSAL_LANG]: "EEW Internship Report",
  },
  link: {
    [UNIVERSAL_LANG]: eew_internship_report,
    fr: eew_internship_report,
  },
};

export const eewActivityReport: Hyperlink = {
  content: {
    [UNIVERSAL_LANG]: "EEW Activity Report",
  },
  link: {
    [UNIVERSAL_LANG]: eew_activity_report,
    fr: eew_activity_report,
  },
};

export const documents = {
  curiculumVitae,
  eewInternshipReport,
  eewActivityReport
  
}