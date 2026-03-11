import { Retex } from '../dataTypes';
import { UNIVERSAL_LANG } from '../../utils/translationUtils';
import { getSkill } from '../../utils/assetsUtils';
import { customCNNArchi, customCNNCalibration, customCNNDemo, customCNNIRL, customCNNLosses, customCNNUniverse } from '../projects_images';

export const customCNN: Retex = {
    title: {
        [UNIVERSAL_LANG]: "Custom CNN"
    },
    date: new Date(2026, 1),
    coverImage: customCNNDemo,
    favorite: false,
    tags: {
        en: ["AI", "Vision", "Teamwork", "University", "Academic", "Mathematics", "Supervised Learning"],
        fr: ["IA", "Vision", "Équipe", "Universitaire", "Mathématiques", "Académique", "Entraînement supervisé"],
        [UNIVERSAL_LANG]: ["AI", "Computer Vision", "CNN", "Inference", "Training", "Archi"],
    },
    description: {
        fr: "Réseau de neurones convolutionel pour la détection d'objets. Également, Calibration d'une caméra de profondeur afin d'identifier des formes géométriques \
        dans l'espace.",
        en: "Convolutional neural network for object detection. Also, calibration of a depth sensitive camera to identify geometric forms in space."
    },
    content: {
        specs: {
            fr:
            "Ce réseau de neurones convolutionnel a été conçu pour la <strong>detection d'objets dans l'espaces</strong>. La pipeline complète comprend une <strong>extraction \
            des features en quatre couches convolutionnelles</strong>, dont le résultat est passé à <strong>un classificateur (score d'identification de l'objet) et un régresseur \
            (positionnement de l'objet dans l'espace)</strong>. Le but premier était le traitement de flux vidéo provenant d'une <strong>caméra RealSense D435i</strong> (avec capteur de profondeur),\
            le projet intègre donc un module de <strong>préprocessing (extraction des frames + redéfinission de la géométrie des images)</strong> pour optimiser l'inference. \
            Le modèle a été entraîné sur <strong>un dataset de quelques centaines d'images labelisées via LabelStudio</strong>, puis mis en concurence avec YOLOv11.",
            en:
            "This convolutional neural network has been designed for <strong>object detection in space</strong>. The pipeline embodies a <strong>feature extraction module with four \
            convolutional layers</strong>, whose output is passed to <strong>a classifier (object identification score) and a regressor (object positioning in space)</strong>. The \
            primary goal was the processing of video streams from a <strong>RealSense D435i camera</strong> (with depth sensor), so the project includes a <strong>preprocessing module \
            (frame extraction + redefinition of image geometry)</strong> to optimize inference. The model was trained on <strong>a dataset of a few hundred images labeled using LabelStudio</strong>,\
            and then compared with YOLOv11."
        },
        notions: {
            fr: [
            "Computer vision en 3D",
            "Inference en temps réel",
            "Techniques de réduction de loss",
            "Prétraitement d'images et segmentation",
            ],
            en: [
            "3D computer vision",
            "Real-time inference",
            "Loss reduction techniques",
            "Image pre-processing and segmentation",
            ],
        },
        tools: [
            getSkill('Python'),
            getSkill('PyTorch'),
            getSkill('CUDA'),
            getSkill('YOLO'),
            getSkill('OpenCV'),
            getSkill('Git'),
        ],
        images: [
            customCNNDemo,
            customCNNArchi,
            customCNNLosses,
            customCNNIRL,
            customCNNUniverse,
            customCNNCalibration,
        ],
    }
};
