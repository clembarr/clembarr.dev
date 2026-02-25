# État de l'Art : Visualisations Innovantes

> **Document de recherche** - Concepts de matérialisation créative pour interfaces web
>
> Auteur: Claude | Date: Décembre 2025 | Version: 1.0

---

## Table des Matières

1. [Introduction](#introduction)
2. [Catégories de Visualisation](#catégories-de-visualisation)
3. [Concepts Naturels & Organiques](#1-concepts-naturels--organiques)
4. [Concepts Physiques & Scientifiques](#2-concepts-physiques--scientifiques)
5. [Concepts Géométriques & Mathématiques](#3-concepts-géométriques--mathématiques)
6. [Concepts Temporels & Narratifs](#4-concepts-temporels--narratifs)
7. [Concepts Interactifs & Expérientiels](#5-concepts-interactifs--expérientiels)
8. [Concepts Métaphoriques & Philosophiques](#6-concepts-métaphoriques--philosophiques)
9. [Analyse Comparative](#analyse-comparative)
10. [Références & Inspirations](#références--inspirations)
11. [Section Implémentation](#section-implémentation)

---

## Introduction

Ce document présente une analyse état de l'art des techniques de visualisation innovantes pour la présentation de données, compétences, parcours et projets dans un contexte de portfolio ou d'application web.

### Objectifs
- Explorer des métaphores visuelles originales
- Identifier des patterns réutilisables
- Proposer des concepts implémentables en React/TypeScript
- Maintenir l'accessibilité et la performance

### Critères d'Évaluation
| Critère | Description |
|---------|-------------|
| **Originalité** | Caractère unique et mémorable |
| **Lisibilité** | Clarté de l'information présentée |
| **Interactivité** | Richesse des interactions possibles |
| **Performance** | Faisabilité technique sans impact |
| **Accessibilité** | Inclusivité pour tous les utilisateurs |
| **Responsivité** | Adaptation aux différents écrans |

---

## Catégories de Visualisation

```
┌─────────────────────────────────────────────────────────────┐
│                    VISUALISATIONS                           │
├──────────────┬──────────────┬──────────────┬───────────────┤
│   NATUREL    │   PHYSIQUE   │  GÉOMÉTRIE   │   NARRATIF    │
├──────────────┼──────────────┼──────────────┼───────────────┤
│ • Arbre      │ • Gravité    │ • Fractales  │ • Livre       │
│ • Réseau     │ • Fluides    │ • Tessellation│ • Voyage     │
│ • Terrain    │ • Magnétisme │ • Origami    │ • Mémoire     │
│ • Écosystème │ • Ondes      │ • Polyèdres  │ • Rêve        │
└──────────────┴──────────────┴──────────────┴───────────────┘
```

---

## 1. Concepts Naturels & Organiques

### 1.1 🌳 Arbre de Croissance (Growth Tree)

**Concept**: Un arbre dont les branches représentent différents domaines d'expertise, avec des feuilles pour les compétences individuelles. L'arbre "pousse" au scroll.

**Métaphore**: Croissance organique, enracinement, ramification des connaissances.

**Caractéristiques**:
- Tronc = fondations (formation de base)
- Branches principales = domaines (Frontend, Backend, Data...)
- Branches secondaires = spécialisations
- Feuilles = compétences individuelles
- Fruits = projets réalisés
- Racines visibles = soft skills

**Interactions**:
- Zoom sur une branche pour explorer
- Saisons changeantes (thème clair/sombre)
- Animation de croissance progressive
- Feuilles qui tombent pour compétences obsolètes

**Cas d'usage**: Visualisation de parcours d'apprentissage, arbre de compétences RPG-style.

```
         🍎 Projet
        /
    ┌──🌿 React
    │  └──🌿 TypeScript
────┼──────── Frontend ────
    │  ┌──🌿 CSS
    │  └──🌿 Animation
    │
   ═╪═ TRONC (Formation)
    │
────┴──────── Backend ─────
       ┌──🌿 Python
       └──🌿 Rust
```

---

### 1.2 🕸️ Réseau Neuronal Vivant

**Concept**: Un réseau de neurones interconnectés où chaque nœud pulse et transmet de l'énergie aux nœuds connectés.

**Métaphore**: Pensée, connexions mentales, synapses.

**Caractéristiques**:
- Nœuds = concepts/compétences
- Connexions = relations entre concepts
- Impulsions lumineuses = activité/utilisation
- Clusters = domaines d'expertise
- Intensité = niveau de maîtrise

**Interactions**:
- Clic sur un nœud déclenche une cascade
- Survol révèle les connexions
- Recherche illumine le chemin vers le concept

**Inspiration**: Visualisations de réseaux de neurones, graphes de connaissances.

---

### 1.3 🌊 Terrain Topographique

**Concept**: Une carte topographique où l'altitude représente le niveau d'expertise, avec des "sommets" pour les domaines maîtrisés.

**Métaphore**: Exploration, conquête, cartographie des savoirs.

**Caractéristiques**:
- Montagnes = expertises fortes
- Vallées = domaines en apprentissage
- Rivières = flux de travail/pipelines
- Chemins = parcours d'apprentissage
- Points d'intérêt = projets

**Interactions**:
- Navigation 3D ou vue aérienne
- Lignes de niveau interactives
- Zoom sur les régions
- Mode "randonnée" guidée

---

### 1.4 🦠 Écosystème Cellulaire

**Concept**: Des cellules vivantes qui se divisent, fusionnent et évoluent, représentant l'évolution des compétences.

**Métaphore**: Vie, évolution, adaptation.

**Caractéristiques**:
- Cellules = compétences
- Division = spécialisation
- Fusion = compétences combinées
- Membrane = catégories
- Noyau = compétence centrale
- Organites = sous-compétences

**Interactions**:
- Observer la mitose au survol
- Voir l'historique d'évolution
- Simulation d'écosystème en temps réel

---

### 1.5 🌸 Jardin Génératif

**Concept**: Un jardin où chaque plante représente un projet, avec des fleurs qui s'épanouissent selon leur maturité.

**Métaphore**: Cultivation, patience, floraison.

**Caractéristiques**:
- Graines = idées initiales
- Pousses = projets en cours
- Fleurs = projets terminés
- Variété de plantes = types de projets
- Pollinisation = collaboration

---

## 2. Concepts Physiques & Scientifiques

### 2.1 ⚛️ Modèle Atomique

**Concept**: Structure atomique où le noyau représente l'expertise principale et les électrons les compétences satellites.

**Métaphore**: Structure fondamentale, orbites, énergie.

**Caractéristiques**:
- Noyau = domaine principal
- Électrons = compétences associées
- Couches électroniques = niveaux d'expérience
- Liaisons = connexions entre domaines
- Isotopes = variations/spécialisations

**Interactions**:
- Excitation des électrons au survol
- Ionisation (ajout/retrait)
- Fusion de noyaux (domaines combinés)

---

### 2.2 🌀 Champ Gravitationnel

**Concept**: Des objets massifs (compétences principales) qui déforment l'espace-temps et attirent des objets plus petits.

**Métaphore**: Influence, attraction, relativité.

**Caractéristiques**:
- Masse = importance/maîtrise
- Orbites = compétences dépendantes
- Trous noirs = domaines d'expertise profonde
- Ondes gravitationnelles = impact sur l'écosystème

**Interactions**:
- Déformation visuelle de l'espace
- Simulation de trajectoires
- Collision/fusion d'éléments

---

### 2.3 💧 Simulation de Fluides

**Concept**: Des flux de liquide coloré qui s'écoulent et se mélangent, représentant les domaines de compétence.

**Métaphore**: Fluidité, adaptation, mélange.

**Caractéristiques**:
- Couleurs = domaines
- Densité = expertise
- Turbulences = périodes d'apprentissage intense
- Confluence = interdisciplinarité

**Interactions**:
- Verser de nouveaux fluides
- Agiter le conteneur
- Observer les patterns de mélange

**Technologie**: WebGL, shaders GLSL, simulations Navier-Stokes simplifiées.

---

### 2.4 🧲 Champ Magnétique

**Concept**: Des lignes de champ magnétique qui connectent des pôles, visualisant les relations entre concepts.

**Métaphore**: Attraction/répulsion, polarité, force invisible.

**Caractéristiques**:
- Pôles = concepts centraux
- Lignes de champ = relations
- Intensité = force de la relation
- Domaines = zones d'influence

**Interactions**:
- Déplacer les pôles
- Visualiser les perturbations
- Limaille de fer interactive

---

### 2.5 🌈 Spectre de Diffraction

**Concept**: Un prisme qui décompose la "lumière" des compétences en un spectre de couleurs.

**Métaphore**: Analyse, décomposition, diversité.

**Caractéristiques**:
- Lumière blanche = profil global
- Couleurs = compétences individuelles
- Intensité = niveau de maîtrise
- Bandes d'absorption = lacunes

---

### 2.6 ⚡ Circuit Électrique

**Concept**: Un circuit où l'énergie (données) circule à travers des composants (compétences).

**Métaphore**: Flux, transformation, conductivité.

**Caractéristiques**:
- Résistances = difficultés
- Condensateurs = stockage de connaissances
- Transistors = décisions
- LED = outputs/projets

---

## 3. Concepts Géométriques & Mathématiques

### 3.1 🔷 Tessellation de Penrose

**Concept**: Un pavage apériodique où les tuiles représentent des compétences qui s'imbriquent sans jamais se répéter exactement.

**Métaphore**: Complexité, unicité, patterns cachés.

**Caractéristiques**:
- Tuiles = compétences
- Patterns = domaines émergents
- Symétrie locale = cohérence
- Apériodicité = unicité du parcours

**Interactions**:
- Zoom infini sur les patterns
- Recherche de motifs spécifiques
- Animation de construction

---

### 3.2 📐 Origami Interactif

**Concept**: Une feuille de papier qui se plie pour révéler différentes facettes du profil.

**Métaphore**: Transformation, révélation, art.

**Caractéristiques**:
- Plis = transitions
- Faces = catégories
- Étapes = progression
- Figure finale = profil complet

**Interactions**:
- Déplier/replier
- Voir les étapes intermédiaires
- Choisir différentes figures

---

### 3.3 🎲 Polyèdres Platoniciens

**Concept**: Des solides de Platon (tétraèdre, cube, octaèdre, dodécaèdre, icosaèdre) dont chaque face représente un aspect.

**Métaphore**: Perfection, harmonie, dimensions multiples.

**Caractéristiques**:
- Tétraèdre (4) = fondamentaux
- Cube (6) = domaines principaux
- Octaèdre (8) = compétences techniques
- Dodécaèdre (12) = projets
- Icosaèdre (20) = soft skills

**Interactions**:
- Rotation 3D
- Dépliage en patron
- Transformation entre polyèdres

---

### 3.4 🌀 Fractales Interactives

**Concept**: Des fractales (Mandelbrot, Julia, Sierpinski) où le zoom révèle des détails infinis.

**Métaphore**: Complexité, auto-similarité, profondeur.

**Types possibles**:
- **Ensemble de Mandelbrot**: Zoom sur les compétences
- **Triangle de Sierpinski**: Hiérarchie de compétences
- **Courbe de Koch**: Frontières floues entre domaines
- **Arbre fractal**: Structure d'apprentissage

**Interactions**:
- Zoom infini
- Navigation par couleurs
- Points d'intérêt aux coordonnées spécifiques

---

### 3.5 📊 Diagramme de Voronoi

**Concept**: Partitionnement de l'espace basé sur la distance aux points (compétences).

**Métaphore**: Territoire, influence, frontières.

**Caractéristiques**:
- Points générateurs = compétences clés
- Cellules = zones d'influence
- Arêtes = frontières entre domaines
- Couleurs = catégories

**Interactions**:
- Déplacer les points
- Ajouter/supprimer des générateurs
- Animation de croissance

---

### 3.6 🔺 Transformation de Möbius

**Concept**: Une bande de Möbius où le parcours n'a qu'une seule face, symbolisant la continuité.

**Métaphore**: Infini, continuité, paradoxe.

**Caractéristiques**:
- Surface non-orientable
- Parcours sans fin
- Transition fluide entre "faces"

---

## 4. Concepts Temporels & Narratifs

### 4.1 📚 Livre Interactif

**Concept**: Un livre dont les pages tournent pour révéler l'histoire professionnelle.

**Métaphore**: Narration, chapitres de vie, mémoire.

**Caractéristiques**:
- Chapitres = périodes
- Pages = événements
- Illustrations = projets
- Marque-pages = moments clés
- Index = navigation rapide

**Interactions**:
- Feuilleter les pages
- Zoom sur les illustrations
- Annotations marginales

---

### 4.2 🎬 Bobine de Film

**Concept**: Une pellicule de cinéma qui défile, chaque frame représentant un moment.

**Métaphore**: Cinéma, mémoire, temps qui passe.

**Caractéristiques**:
- Frames = événements
- Bobines = années
- Montage = sélection
- Bande son = contexte

**Interactions**:
- Lecture/pause
- Avance/retour rapide
- Zoom sur une frame

---

### 4.3 🗺️ Carte au Trésor

**Concept**: Une carte ancienne avec un parcours marqué par des X, menant à des trésors (réalisations).

**Métaphore**: Aventure, découverte, quête.

**Caractéristiques**:
- Îles = domaines
- Chemins = parcours
- X = projets/réalisations
- Monstres marins = défis
- Boussole = direction actuelle

**Interactions**:
- Dérouler la carte
- Suivre le chemin
- Découvrir les trésors

---

### 4.4 🎭 Théâtre/Scène

**Concept**: Une scène de théâtre avec des actes et des scènes représentant la carrière.

**Métaphore**: Performance, rôles, spectacle.

**Caractéristiques**:
- Actes = grandes périodes
- Scènes = projets
- Personnages = compétences
- Décors = contextes
- Éclairages = focus

---

### 4.5 🏛️ Musée Personnel

**Concept**: Un musée virtuel avec des salles thématiques exposant les réalisations.

**Métaphore**: Collection, exposition, préservation.

**Caractéristiques**:
- Salles = catégories
- Œuvres = projets
- Cartels = descriptions
- Audio-guide = narration
- Boutique = téléchargements

**Interactions**:
- Visite virtuelle 3D
- Zoom sur les œuvres
- Parcours guidés

---

### 4.6 📻 Radio/Podcast Timeline

**Concept**: Une radio vintage où chaque station représente une période/thématique.

**Métaphore**: Ondes, fréquences, écoute.

**Caractéristiques**:
- Cadran = navigation temporelle
- Stations = thématiques
- Grésillement = transitions
- Jingles = moments clés

---

## 5. Concepts Interactifs & Expérientiels

### 5.1 🎮 RPG Character Sheet

**Concept**: Une fiche de personnage de jeu de rôle avec stats, équipement et quêtes.

**Métaphore**: Jeu, progression, aventure.

**Caractéristiques**:
- Stats = compétences (FOR, DEX, INT, WIS, CHA)
- Niveau = expérience
- Équipement = outils
- Quêtes = projets
- Inventaire = certifications
- Arbre de talents = spécialisations

**Interactions**:
- Allocation de points
- Équiper/déséquiper
- Journal de quêtes

---

### 5.2 🎹 Piano/Instrument de Musique

**Concept**: Un instrument où chaque note représente une compétence, jouant une mélodie unique.

**Métaphore**: Harmonie, composition, talent.

**Caractéristiques**:
- Notes = compétences
- Accords = combinaisons
- Mélodie = parcours
- Tempo = rythme de carrière

**Interactions**:
- Jouer les notes
- Écouter des compositions
- Créer des morceaux

---

### 5.3 🧩 Puzzle Dynamique

**Concept**: Un puzzle dont les pièces s'assemblent pour former l'image complète du profil.

**Métaphore**: Assemblage, complétude, vue d'ensemble.

**Caractéristiques**:
- Pièces = compétences/expériences
- Bords = connexions
- Image finale = profil complet
- Pièces manquantes = objectifs

**Interactions**:
- Drag & drop
- Rotation des pièces
- Aide contextuelle

---

### 5.4 🌡️ Dashboard Météo

**Concept**: Une station météo où les conditions représentent l'état actuel des projets/compétences.

**Métaphore**: Climat, prévisions, conditions.

**Caractéristiques**:
- Température = activité
- Pression = charge de travail
- Précipitations = défis
- Ensoleillement = succès
- Prévisions = roadmap

---

### 5.5 🔬 Microscope/Télescope

**Concept**: Un instrument optique permettant de zoomer du macro au micro sur les compétences.

**Métaphore**: Exploration, échelles, découverte.

**Caractéristiques**:
- Grossissements = niveaux de détail
- Échantillons = projets
- Lames = catégories
- Annotations = descriptions

---

## 6. Concepts Métaphoriques & Philosophiques

### 6.1 ☯️ Yin-Yang Dynamique

**Concept**: Un symbole Yin-Yang où les deux forces représentent des aspects complémentaires (technique/créatif, front/back).

**Métaphore**: Équilibre, dualité, harmonie.

**Caractéristiques**:
- Yin = aspects techniques
- Yang = aspects créatifs
- Points = spécialités opposées
- Rotation = évolution

---

### 6.2 🏔️ Iceberg de Compétences

**Concept**: Un iceberg où la partie visible représente les compétences démontrées et la partie immergée les compétences latentes.

**Métaphore**: Profondeur, potentiel caché, fondations.

**Caractéristiques**:
- Partie émergée = compétences visibles
- Partie immergée = compétences profondes
- Ligne de flottaison = perception
- Courants = influences

**Interactions**:
- Plonger sous l'eau
- Voir les proportions
- Explorer les profondeurs

---

### 6.3 🎭 Masques Superposés

**Concept**: Des masques qui se superposent, chacun révélant une facette différente.

**Métaphore**: Identités multiples, rôles, authenticité.

**Caractéristiques**:
- Masques = rôles professionnels
- Superposition = polyvalence
- Retrait = révélation

---

### 6.4 🌅 Lever/Coucher de Soleil

**Concept**: Un cycle jour/nuit représentant l'évolution d'une journée type ou d'une carrière.

**Métaphore**: Cycles, renouveau, temps.

**Caractéristiques**:
- Aube = débuts
- Midi = pic d'activité
- Crépuscule = maturité
- Étoiles = réalisations brillantes

---

### 6.5 🧘 Mandala Génératif

**Concept**: Un mandala qui se dessine progressivement, représentant l'harmonie des compétences.

**Métaphore**: Méditation, centrage, complétude.

**Caractéristiques**:
- Centre = core values
- Cercles = niveaux d'expertise
- Patterns = domaines
- Symétrie = équilibre

**Interactions**:
- Colorier le mandala
- Observer la construction
- Méditation guidée

---

### 6.6 🌌 Multivers/Dimensions Parallèles

**Concept**: Des univers parallèles représentant différents chemins de carrière possibles.

**Métaphore**: Possibilités, choix, destins alternatifs.

**Caractéristiques**:
- Univers principal = parcours actuel
- Univers parallèles = alternatives
- Portails = points de bifurcation
- Convergences = compétences communes

---

## Analyse Comparative

### Tableau de Synthèse

| Concept | Originalité | Complexité | Interactivité | Performance | Score |
|---------|:-----------:|:----------:|:-------------:|:-----------:|:-----:|
| Arbre de Croissance | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 13 |
| Réseau Neuronal | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | 14 |
| Terrain Topo | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | 13 |
| Modèle Atomique | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 14 |
| Fluides | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ | 16 |
| Tessellation | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | 14 |
| Fractales | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | 17 |
| Livre Interactif | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 13 |
| RPG Sheet | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 16 |
| Iceberg | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 14 |
| Mandala | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | 15 |

### Recommandations par Cas d'Usage

| Cas d'Usage | Concepts Recommandés |
|-------------|---------------------|
| **Portfolio développeur** | RPG Sheet, Arbre, Réseau Neuronal |
| **CV interactif** | Livre, Timeline Film, Iceberg |
| **Présentation skills** | Mandala, Tessellation, Atomique |
| **Parcours académique** | Carte au Trésor, Terrain, Arbre |
| **Projets créatifs** | Fluides, Fractales, Jardin |
| **Entreprise/startup** | Circuit, Dashboard Météo, Polyèdres |

---

## Références & Inspirations

### Bibliothèques & Outils

- **Three.js** - 3D WebGL
- **D3.js** - Visualisations de données
- **p5.js** - Art génératif
- **Framer Motion** - Animations React
- **GSAP** - Animations avancées
- **Regl** - WebGL fonctionnel
- **Paper.js** - Graphiques vectoriels

### Artistes & Designers

- **Refik Anadol** - Data sculptures
- **Casey Reas** - Art génératif (Processing)
- **Zach Lieberman** - openFrameworks
- **Memo Akten** - AI art
- **Joshua Davis** - Design génératif

### Ressources Académiques

- *"The Grammar of Graphics"* - Leland Wilkinson
- *"Visualizing Data"* - Ben Fry
- *"Generative Design"* - Hartmut Bohnacker
- *"The Nature of Code"* - Daniel Shiffman

### Sites d'Inspiration

- [Awwwards](https://www.awwwards.com)
- [Codrops](https://tympanus.net/codrops)
- [Experiments with Google](https://experiments.withgoogle.com)
- [Chrome Experiments](https://www.chromeexperiments.com)
- [Codepen](https://codepen.io)

---

## Section Implémentation

> **Note**: Cette section est préparée pour des implémentations futures sur demande.

### 🚀 Composants Prêts à Implémenter

Chaque concept ci-dessous peut être implémenté sur demande. Référencez le code du concept pour une implémentation.

#### Priorité Haute (Recommandés)

| Code | Nom | Difficulté | Temps estimé |
|------|-----|------------|--------------|
| `NAT-01` | Arbre de Croissance | ⭐⭐ | 4-6h |
| `NAT-02` | Réseau Neuronal Vivant | ⭐⭐⭐ | 6-8h |
| `PHY-01` | Modèle Atomique | ⭐⭐ | 4-6h |
| `GEO-04` | Fractales Interactives | ⭐⭐⭐⭐ | 8-12h |
| `NAR-01` | Livre Interactif | ⭐⭐ | 4-6h |
| `EXP-01` | RPG Character Sheet | ⭐⭐⭐ | 6-8h |
| `MET-02` | Iceberg de Compétences | ⭐⭐ | 3-4h |

#### Priorité Moyenne

| Code | Nom | Difficulté | Temps estimé |
|------|-----|------------|--------------|
| `NAT-03` | Terrain Topographique | ⭐⭐⭐⭐ | 10-14h |
| `NAT-05` | Jardin Génératif | ⭐⭐⭐ | 6-8h |
| `PHY-03` | Simulation de Fluides | ⭐⭐⭐⭐⭐ | 12-16h |
| `GEO-01` | Tessellation de Penrose | ⭐⭐⭐ | 6-8h |
| `GEO-02` | Origami Interactif | ⭐⭐⭐ | 6-8h |
| `GEO-05` | Diagramme de Voronoi | ⭐⭐ | 4-6h |
| `NAR-03` | Carte au Trésor | ⭐⭐⭐ | 6-8h |
| `MET-05` | Mandala Génératif | ⭐⭐⭐ | 6-8h |

#### Priorité Exploratoire

| Code | Nom | Difficulté | Temps estimé |
|------|-----|------------|--------------|
| `NAT-04` | Écosystème Cellulaire | ⭐⭐⭐⭐ | 10-14h |
| `PHY-02` | Champ Gravitationnel | ⭐⭐⭐⭐ | 8-12h |
| `PHY-04` | Champ Magnétique | ⭐⭐⭐ | 6-8h |
| `GEO-03` | Polyèdres Platoniciens | ⭐⭐⭐ | 6-8h |
| `NAR-05` | Musée Personnel | ⭐⭐⭐⭐ | 10-14h |
| `EXP-02` | Piano Interactif | ⭐⭐⭐ | 6-8h |
| `MET-06` | Multivers | ⭐⭐⭐⭐⭐ | 14-20h |

### 📋 Template de Demande d'Implémentation

Pour demander l'implémentation d'un concept, utilisez ce format:

```
Implémente le composant [CODE] - [NOM]

Contexte d'utilisation: [description]
Données à afficher: [type de données]
Préférences:
- [ ] Animation au scroll
- [ ] Interaction souris
- [ ] Mode responsive
- [ ] Thème adaptatif
- [ ] Accessibilité renforcée
```

### 🔧 Stack Technique Prévue

```typescript
// Dépendances communes
import { motion } from 'framer-motion';      // Animations
import * as THREE from 'three';               // 3D (si nécessaire)
import { useContext, useRef } from 'react';   // React hooks
import { ThemeContext } from '../theme';      // Thème adaptatif

// Structure type
interface ComponentProps {
  data: DataItem[];
  className?: string;
  interactive?: boolean;
  animated?: boolean;
}
```

### 📁 Structure de Fichiers Prévue

```
src/components/showcase/
├── index.ts                    # Barrel exports
├── OrbitingSkills.tsx          # ✅ Implémenté
├── InfinityTimeline.tsx        # ✅ Implémenté
├── HexagonGrid.tsx             # ✅ Implémenté
├── PerspectiveCards.tsx        # ✅ Implémenté
├── FlowingPath.tsx             # ✅ Implémenté
├── MathSpiral.tsx              # ✅ Implémenté
│
├── GrowthTree.tsx              # 🔜 NAT-01
├── NeuralNetwork.tsx           # 🔜 NAT-02
├── AtomicModel.tsx             # 🔜 PHY-01
├── FractalExplorer.tsx         # 🔜 GEO-04
├── InteractiveBook.tsx         # 🔜 NAR-01
├── RPGCharacterSheet.tsx       # 🔜 EXP-01
├── IcebergSkills.tsx           # 🔜 MET-02
└── ...
```

---

## Changelog

| Version | Date | Modifications |
|---------|------|---------------|
| 1.0 | Déc 2025 | Document initial avec 24 concepts |

---

*Document généré pour le projet clembarr.dev*
*Licence: Usage interne - Portfolio personnel*
