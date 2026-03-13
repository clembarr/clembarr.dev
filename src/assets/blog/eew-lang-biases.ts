/**
 * @fileoverview EEW language biases case study blog post definition
 * Case study exploring the language biases in the Evolutionary Ecology of Words model
 */

import { BlogPost, BlogCategory } from '../dataTypes';
import { UNIVERSAL_LANG } from '../../utils/assetsUtils';
import { projectsImages } from '../projects_images';

export const eewLangBiases: BlogPost = {
    slug: "eew-language-biases",
    title: {
        [UNIVERSAL_LANG]: "Using Language Biases as Novelty Engines",
        fr: "Utilisation des biais linguistiques comme moteurs de nouveauté",
    },
    description: {
        [UNIVERSAL_LANG]: 
        `As LLMs are imbued with representations from the languages they use, my case study focuses on the impact of
        language biases on the dynamics of semantic derivation and the emergence of novel words.`,
        fr: 
        `Les LLMs sont imprégnés des représentations des langues qu'ils utilisent. Mon étude de cas se concentre sur l'impact 
        des biais linguistiques sur les dynamiques de dérivation sémantique et l'émergence de nouveaux mots.`,
    },
    tags: {
        [UNIVERSAL_LANG]: ["Data", "LLM", "ALife", "AI", "Semantic", "Game theory", "Artificial life", "Research", "Simulation", "Modeling", "Internship"],
        fr: ["Data", "LLM", "ALife", "AI", "Sémantique", "Théorie des jeux", "Vie artificielle", "Recherche", "Simulation", "Modélisation", "Stage"],
    },
    coverImage: projectsImages.eew_basic_visuals,
    img: [
        projectsImages.eew_algo, 
        projectsImages.eew_basic_visuals, 
        projectsImages.eew_lang_bias, 
        projectsImages.eew_lang_behaviors
    ],
    date: new Date(2025, 6, 12),
    category: BlogCategory.RESEARCH,
    readingTime: 10,
    paragraphs: [
        {
            title: {
                [UNIVERSAL_LANG]: "Introduction",
            },
            content: {
                [UNIVERSAL_LANG]:
                "Evolutionary Ecology of Words (EEW) is an artificial life experiment model, which involves ecosystems of words and their semantic\
                derivation using the rich linguistic expression and inference ability of LLMs. In March 2025, Pr. Reiji SUZUKI and his colleague \
                Pr. Takaya ARITA from the ALIFE-CORE laboratory (Nagoya University, Japan), published a paper upon the early stages of this new \
                experiment model, which is rooted in game theory. It aims to be a creativity benchmark for LLMs, as part of the research regarding \
                the open-endedness of artificial models.<br> \
                From April to June 2025, I had the chance to participate in the assessment of this model as \
                a research intern. My work mainly focused on the discovery of language biases, and their impact on the dynamics observed in the experiment.",
                fr:
                "Evolutionary Ecology of Words (EEW) est un modèle d'expérience de vie artificielle qui simule des écosystèmes de mots et leur dérivation\
                sémantique en exploitant les capacités linguistiques et d'inférence des LLM. En mars 2025, le Pr. Reiji SUZUKI et son collègue le Pr. Takaya ARITA\
                du laboratoire ALIFE-CORE (Université de Nagoya, Japon), ont publié un article sur les prémices de ce nouveau modèle ancré \
                dans la théorie des jeux. Visant à servir de benchmark de créativité pour les LLM, il s'inscrit dans la recherche sur l'indéterminisme des systèmes artificiels.<br>\
                D'avril à juin 2025, j'ai eu l'opportunité de participer à l'évaluation de ce modèle en tant que stagiaire de recherche. Mon travail a principalement porté \
                sur la découverte de biais linguistiques et sur l'étude de leur impact sur les dynamiques observées.",
            },
        },
        {
            title: {
                [UNIVERSAL_LANG]: "Evolutionary Ecology of Words",
            },
            content: {
                [UNIVERSAL_LANG]:
                "This experiment model works with <strong>animal species names</strong>, generated and judged by the chosen LLM. The model \
                decides which lives and dies according to <strong>a given criteria</strong> (e.g \" which one is stronger ?\" ). At the end of each step, \
                words have a chance to mutate, and that allows the <strong>semantic derivation</strong> of the overall population. The experiment is partly orchestrated thanks to <strong>a set of \
                four specific prompts, one for each phases</strong> : \
                <ul> \
                <li>a prefix context prompt to indicate the role that the model should bear,</li>\
                <li>the generation of <strong>initial populations</strong> of animal species names,</li>\
                <li>the judgment between two names to decide <strong>which one is stronger</strong>,</li>\
                <li>the generation of <strong>mutation possibilities</strong> related to a mutating word.</li>\
                </ul> \
                These three phases are the articulations that allow <strong>any state change within the population</strong> of words. [[image 0]]\n\
                The first available type of visual is a collection of graphs studying the B most present names over the steps. With this one, we can \
                observe <strong>the emergence of prey-predator dynamics, food chains, and even epidemic phenomena</strong>. \
                The second type of visual is a semantic graph that uses <strong>Sentence Transformers</strong> to vectorize names and <strong>UMAP</strong> to draw trajectories. \
                These trajectories <strong>materialize the semantic derivation from the initial population to the final one</strong>. \
                The more the distance between two plots, <strong>the less the two populations are semantically related</strong>. \
                With such a graph, we can identify <strong>semantic areas or fields</strong> and so observe <strong>dynamics of specialisation \
                (e.g types of species), exploration or exploitation of words and even concepts that could emerge</strong>. [[image 1]]",
                fr:
                "Ce modèle expérimental manipule des <strong>noms d'espèces animales</strong>, générés et jugés par un LLM. Le modèle \
                décide qui survit selon un <strong>critère donné</strong> (ex: \"lequel est le plus fort ?\"). À la fin de chaque itération, \
                les mots ont une chance de muter, permettant la <strong>dérivation sémantique</strong> globale de la population. L'expérience \
                est orchestrée par <strong>quatre prompts spécifiques</strong>, un par phase :\
                <ul> \
                <li>un prompt de contexte (<i>prefix</i>) pour définir le rôle du modèle,</li>\
                <li>la génération de la <strong>population initiale</strong>,</li>\
                <li>le jugement entre deux noms pour déterminer <strong>le gagnant</strong>,</li>\
                <li>la génération de <strong>possibilités de mutation</strong> pour un mot donné.</li>\
                </ul> \
                Ces phases permettent <strong>tout changement d'état au sein de la population</strong>. [[image 0]]\
                Le premier type de visuel générable étudie la fréquence des noms les plus présents. On y observe <strong>l'émergence de dynamiques proie-prédateur, de chaînes alimentaires et même de phénomènes épidémiques</strong>. \
                Le second est un graphique sémantique utilisant <strong>Sentence Transformers</strong> pour vectoriser les noms et <strong>UMAP</strong> pour tracer des trajectoires. \
                Ces trajectoires <strong>matérialisent la dérivation sémantique de la population initiale vers la population finale</strong>. \
                Plus les points sont espacés, moins les populations à ces instants T ont avoir entre elles. Avec ce type de graphique, on \
                peut identifier des <strong>espaces ou champs sémantiques</strong> et ainsi observer des <strong>dynamiques de spécialisation \
                (ex: types d'espèces), d'exploration ou d'exploitation</strong> de mots et même de <strong>concepts</strong> qui pourraient <strong>émerger</strong>. [[image 1]]\
                Dérrière la simplicité du concept, ce modèle vise observer, voir maximiser, l'agilité des LLMs et l'émergence de la nouveauté. C'est pourquoi l'analyse\
                des résultats est concentrée sur des métriques comme le nombre de nouveaux mots apparus ou encore la clusterisation des vecteurs moyens de population durant l'expérience.",
            },
        },
        {
            title: {
                [UNIVERSAL_LANG]: "Discovery of Language Biases",
                fr: "Découverte des biais linguistiques",
            },
            content: {
                [UNIVERSAL_LANG]:
                "On the premise that a language is imbued with the culture it comes from, I hypothesized that changing the prompt language \
                could open up different semantic fields. My experiments revealed major findings regarding the LLM's behavior:\n\n\
                1. <strong>Unique Trajectories per Language</strong>: Rather than simple translations, each language pushes the LLM to explore completely different areas of the semantic space. While some languages might show 'flatter' trajectories if less mastered by the model (like Chinese in my tests), others, such as French, yielded some of the best and most diverse results.\n\
                2. <strong>Semantic Divergence</strong>: Different translations of the same word (e.g., 'Blue Whale' in French vs. English) can have significantly different semantic vectors, leading to distinct evolutionary paths. [[image 2]]\n\n\
                These observations led to the development of a new metric: the <strong>Emergence Score</strong>. It measures the ratio between new mutations and the total population, allowing us to quantify the 'innovation' rate of a language model.",
                fr:
                "Les LLMs traitent le language naturel comme un espace vectoriel, où les mots sont des vecteurs dits 'sémantiques', dont les \
                propiétés transcrivent le sens. Partant du postulat qu'une langue est imprégnée de sa culture d'origine, j'ai émis l'hypothèse que changer\
                la langue des prompts pourrait ouvrir sur des champs sémantiques plus ou moins différents. \
                Mes expériences ont révélé des points majeurs sur le comportement du LLM :\n\n\
                1. <strong>Trajectoires uniques par langue</strong> : Plutôt que de simples traductions, chaque langue pousse le LLM à explorer des zones totalement différentes de l'espace sémantique. Si certaines langues peuvent montrer des trajectoires plus \"plates\" lorsqu'elles sont moins maîtrisées par le modèle (comme le chinois dans mes tests), d'autres, comme le français, ont donné parmi les meilleurs résultats en termes de diversité.\n\
                2. <strong>Divergence sémantique</strong> : Différentes traductions d'un même mot (ex: \"Baleine bleue\" en français vs anglais) peuvent avoir des vecteurs sémantiques très différents, menant à des chemins évolutifs distincts. [[image 2]]\n\n\
                Ces observations ont mené au développement d'une nouvelle métrique : le <strong>Emergence Score</strong>. Il mesure le ratio entre les nouvelles mutations et la population totale, permettant de quantifier le taux d'innovation d'un modèle.",
            },
        },
        {
            title: {
                [UNIVERSAL_LANG]: "Multilingualism as a Novelty Engine",
            },
            content: {
                [UNIVERSAL_LANG]:
                "The most exciting result came from <strong>multilingual experiments</strong>. By 'zig-zagging' between languages (e.g., prompting in French, then Russian, then Chinese), we observed a <strong>synergy effect</strong>.\n\n\
                Each language acts as a specialized lens, exploring different areas of the semantic space. While a single-language run might stagnate in a specific field, mixing languages prevents this 'semantic trapping'. \
                This approach significantly increased the <strong>emergence rate</strong> of novel species names, proving that <strong>language bias can be exploited as a tool for open-endedness</strong>.\n\n\
                The results were so consistent that I was invited to present them at the <strong>39th JSAI conference</strong> in Osaka, alongside Pr. Suzuki. [[image 3]]",
                fr:
                "Le résultat le plus probant est venu des <strong>expériences multilingues</strong>. En alternant entre les langues (ex: prompts en français, puis russe, puis chinois), nous avons observé un <strong>effet de synergie</strong>.\n\n\
                Chaque langue agit comme une lentille spécialisée, explorant différentes zones de l'espace sémantique. Là où une expérience unilingue peut stagner, le mélange des langues empêche ce \"piégeage sémantique\". \
                Cette approche a considérablement augmenté le <strong>taux d'émergence</strong> de nouveaux noms, prouvant que <strong>le biais linguistique peut être exploité comme un outil pour l'évolution sans fin</strong>.\n\n\
                Ces résultats ont été jugés suffisamment pertinents pour être présentés lors de la <strong>39ème conférence de la JSAI</strong> à Osaka, aux côtés du Pr. Suzuki. [[image 3]]",
            },
        },
        {
            title: {
                [UNIVERSAL_LANG]: "Conclusion",
            },
            content: {
                [UNIVERSAL_LANG]:
                "This research demonstrates that LLMs are not neutral vessels; they carry the 'worldview' of their training data. By understanding these biases, we can use them to build more creative and diverse artificial systems. \
                Beyond the research, this internship led to the development of <strong>EEW Analyzer</strong>, a specialized tool designed to maximize the analysis scope of these fascinating word ecosystems.",
                fr:
                "Cette recherche démontre que les LLM ne sont pas des outils neutres ; ils portent la \"vision du monde\" de leurs données d'entraînement. En comprenant ces biais, nous pouvons les utiliser pour construire des systèmes artificiels plus créatifs et diversifiés. \
                Au-delà de la recherche, ce stage a abouti au développement de <strong>EEW Analyzer</strong>, un outil spécialisé conçu pour maximiser la portée analytique de ces fascinants écosystèmes de mots.",
            },
        },
    ],
    tableOfContents: true,
    relatedProjects: ["EEW Analyzer"],
};
