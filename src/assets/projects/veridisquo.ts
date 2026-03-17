/**
 * @fileoverview VeridisQuo project definition
 * State-of-the-art neural network for deepfake detection using hybrid information aggregation
 */

import { Retex } from '../dataTypes';
import { UNIVERSAL_LANG } from '../../utils/translationUtils';
import { getSkill, wrapInMedia } from '../../utils/assetsUtils';
import { projectsImages } from '../index';
import { MediaType } from '../dataTypes';
import { projectsMedia } from '../projects_images';

export const veridisquo: Retex = {
  title: {
    [UNIVERSAL_LANG]: "VeridisQuo"
  },
  date: new Date(2025, 11),
  coverImage: projectsMedia.veridisquoOutput,
  favorite: true,
  tags: {
    en: ["AI", "Vision", "Maths", "Security", "Personal", "Mathematics"],
    fr: ["IA", "Vision", "Maths", "Sécurité", "Personnel", "Mathématiques"],
    [UNIVERSAL_LANG]: ["XAI", "Deep Learning", "Computer Vision", "Perso"],
  },
  description: {
    fr: "Réseau de neurones hybride pour la détection de deepfakes. Combine analyses fréquentielle et spatiale, classification flottante\
    et met en évidence les zones suspectes grâce à Grad-CAM.",
    en: "Deepfakes detection hybrid neural network. Combines frequency and spatial analysis, floating classification and lighten up\
    suspicious areas in videos."
  },
  content: {
    specs: {
      fr:
      "VeridisQuo est <strong>un réseau de neurones hybride pour la détection de deefakes</strong> vidéos. Il combine <strong>analyse spatiale (via EfficientNet-B4) et\
      fréquentielle (FFT + DCT)</strong>. Cela lui permet de détecter des incohérences structurelles, et des artéfactes de génération ou de compression \
      dans chaque frame des vidéos. La solution embarque donc également un système de <strong>preprocessing (extraction des frames + detection des visages \
      avec YOLO)</strong>. La pipeline possède deux sorties : une <strong>classification flottante des résultats des analyses (avec aggrégation préalable)</strong>, ainsi qu'une <strong>heat-map \
      des mise en évidence des zones suspectes</strong> sur la vidéo originale générée avec Grad-CAM. Le <strong>grand nombre d'hyperparamètres</strong> (centralisés) \
      rend le modèle robuste et facilement adaptable. Enfin Le modèle a été entrainé sur <strong>un dataset de 7000 vidéos</strong>.",
      en:
      "VeridisQuo is a <strong>hybrid neural network for deepfakes detection</strong>. It combines a <strong>spatial (via EfficientNet-B4) analysis \
      and a frequency (FFT + DCT) analysis</strong>. This allows to detect structural incoherences, generation or compression artifacts in each frame \
      of videos. The solution also includes a <strong>preprocessing system (frame extraction + face detection with YOLO)</strong>. The pipeline has two \
      outputs: a <strong>floating classification of the analysis results (with prior aggregation)</strong>, and a <strong>heat-map of the suspicious \
      areas</strong> on the original video generated with Grad-CAM. The <strong>large number of hyperparameters</strong> (centralized) makes the model \
      robust and easily adaptable. Finally, the model was trained on <strong>a dataset of 7000 videos</strong>."
    },
    notions: {
      fr: [
        "Computer vision et caractérisation des deepfakes",
        "IA expliquable (XAI)",
        "Aggregation d'informations hybrides",
        "Optimisation du transit des calculs sur hardware",
      ],
      en: [
        "Computer vision and deepfake characterization",
        "Explainable AI (XAI)",
        "Hybrid information aggregation",
        "Hardware compute transit optimization",
      ],
    },
    tools: [
      getSkill('Python'),
      getSkill('PyTorch'),
      getSkill('CUDA'),
      getSkill('YOLO'),
      getSkill('HuggingFace'),
      getSkill('Git'),
    ],
    images: [
      projectsMedia.veridisquoOutput,
      wrapInMedia(projectsImages.veridisquo_pipeline, MediaType.IMAGE, "Model processing pipeline"),
      wrapInMedia(projectsImages.veridisquo_front, MediaType.IMAGE, "XAI visualization interface"),
      wrapInMedia(projectsImages.veridisquo_trainloss, MediaType.IMAGE, "XAI visualization interface"),
    ],
    additionalRessources: [
      {
        content: {
          fr: "Répo GitHub",
          en: "GitHub Repo",
        },
        link: "https://github.com/VeridisQuo-orga/VeridisQuo",
      },
    ]
  }
};
