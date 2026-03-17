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
    readingTime: 20,
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
                sémantique en exploitant les capacités linguistiques et d'inférence des LLMs. En mars 2025, le Pr. Reiji SUZUKI et son collègue le Pr. Takaya ARITA\
                du laboratoire ALIFE-CORE (Université de Nagoya, Japon), ont publié un article sur les prémices de ce nouveau modèle ancré \
                dans la théorie des jeux. Visant à servir de benchmark de créativité pour les LLMs, il s'inscrit dans la recherche sur l'indéterminisme des systèmes artificiels.<br>\
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
                (ex: types d'espèces), d'exploration ou d'exploitation</strong> de l'espace sémantique et même de <strong>concepts</strong> qui pourraient <strong>émerger</strong>. [[image 1]]\
                Dérrière la simplicité du concept, ce modèle vise à <strong>observer, voir maximiser, l'agilité des LLMs et l'émergence de la nouveauté</strong>. C'est pourquoi l'analyse\
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
                "Starting from the premise that <strong>a language is imbued with its originating culture</strong>, I hypothesized that changing the language of the prompts could <strong>open up more or less different semantic fields</strong>. \
                Working with animal species names made perfect sense: animals carry a different cultural load depending on the language and civilization that approaches them. \
                The snake, for example, symbolizes chaos and sin in Nordic and Christian traditions, but represents immortality and infinity in Buddhist, Mesoamerican and Australian cultures. \
                <strong>If language influences meaning at this level, it should also influence the generation behavior of the LLM</strong>.\n\
                To test this hypothesis, I selected <strong>four languages for their cultural and scriptural distance</strong>: English (reference language), French, Russian and Chinese. \
                As for the LLM, I used Gemma2 9b Instruct GGUF. Each language was subjected to about ten experiments, repeated three times.\n\n\
                The results were immediate and reproducible. Three observations stood out:\n\n\
                1. <strong>Changing language changes the trajectory.</strong> On the UMAP graph, each language produced a <strong>characteristic pattern</strong>. Experiments in French, Russian, Chinese and English systematically ended up in different areas of the semantic space. \n\n\
                2. <strong>The model gets lost in translation.</strong> For non-English base experiments, the LLM still tends to drift towards English. \
                Rather than a problem, this created something unexpected: <strong>multilingual ecosystems</strong>, where each translation brought diversity to the population.\n\n\
                3. <strong>The language itself carries semantic weight, not just the word.</strong> The clearest illustration: \"blue whales\" and \"baleine bleue\", \
                coexisting in the same population at the same generation, occupied <strong>clearly distinct positions on the UMAP graph</strong>, even though they refer to the same animal. \
                Translation is not semantically neutral. [[image 2]]",
                fr:
                "Partant du postulat <strong>qu'une langue est imprégnée de sa culture d'origine</strong>, \
                j'ai émis l'hypothèse que changer la langue des prompts pourrait <strong>ouvrir sur des champs sémantiques plus ou moins différents</strong>. \
                Travailler avec des noms d'espèces animales fait donc tout à fait sens : les animaux portent une charge culturelle différente selon la langue et la civilisation qui les aborde. \
                Le serpent, par exemple, symbolise le chaos et le péché dans les traditions nordiques et chrétiennes, mais représente l'immortalité et l'infini dans les cultures bouddhistes, méso-américaines et australiennes. \
                <strong>Si la langue influence le sens à ce niveau, elle devrait aussi influencer le comportement de génération du LLM</strong>.\n \
                Pour tester cette hypothèse, j'ai sélectionné <strong>quatre langues pour leur distance culturelle et scripturale</strong> : l'anglais (langue de référence), le français, le russe et le chinois. \
                Quant au LLM, j'employais Gemma2 9b Instruct GGUF. Chaque langue a fait l'objet d'une dizaine d'expériences, répétées trois fois.\n\n \
                Les résultats ont été immédiats et reproductibles. Trois observations se sont démarquées :\n\n \
                1. <strong>Changer de langue change la trajectoire.</strong> Sur le graphe UMAP, chaque langue a produit un <strong>motif caractéristique</strong>. \
                Les expériences en français, russe, chinois et anglais se retrouvaient systématiquement dans des zones différentes de l'espace sémantique. \n\n\
                2. <strong>Le modèle se perd dans la traduction.</strong> Pour les expériences non anglophones de base, le LLM tend tout de même à dériver vers l'anglais. \
                Plutôt qu'un problème, cela a créé quelque chose d'inattendu : des <strong>écosystèmes multilingues</strong>, où chaque traduction apportait de la diversité dans la population.\n\n\
                3. <strong>La langue elle-même porte un poids sémantique, pas seulement le mot.</strong> L'illustration la plus claire : \"blue whales\" et \"baleine bleue\", \
                coexistant dans la même population à la même génération, occupaient des <strong>positions clairement distinctes sur le graphe UMAP</strong>, bien que désignant le même animal. \
                La traduction n'est pas sémantiquement neutre. [[image 2]]",
            },
        },
        {
            title: {
                [UNIVERSAL_LANG]: "The Emergence Score",
                fr: "L'Emergence Score",
            },
            content: {
                [UNIVERSAL_LANG]:
                `Once the language bias was confirmed, a more precise question arose: is it actually useful? A simple translation of a word is not a new discovery — it is noise. \
                The raw emergence count was inevitably inflated by cross-language variants of the same name.\n\n\
                To go beyond that inflation, I developed a new metric: the <strong>Emergence Score</strong>. \
                It is defined as the ratio of genuine emergences — words appearing for the first time in the population — to the total number of mutations at a given generation. \
                A high score means the system is generating genuinely new words at a good rate, it is exploring. \
                A low score means mutations are recycling words already encountered — the system is stagnating within a known semantic field.\n\n\
                Correlating this score with the UMAP trajectory revealed a clear behavioral pattern: \
                <strong>peaks in the emergence score coincide with the trajectory entering a new semantic zone</strong>, \
                while drops correspond to the trajectory returning to or circling within previously explored territory.\n\n\
                Applied to the four languages, this metric yielded concrete, comparable results:\n\
                <ul>\
                <li><strong>Russian — avg. 399:</strong> the highest of all four. Experiments specialized deeply in terrestrial species, \
                with many distinct names within that single category. Strong exploitation of one semantic zone.</li>\
                <li><strong>French — avg. 352:</strong> the multilingual ecosystem (French, English, Latin spontaneously coexisting) produced the most diverse outcomes, \
                including the emergence of <strong>mythological species names</strong> — a category absent from all other languages.</li>\
                <li><strong>Chinese — avg. 247:</strong> experiments followed a sequential trajectory, specializing almost exclusively in whale species, \
                with a unique directional property not observed elsewhere.</li>\
                <li><strong>English — avg. 215:</strong> the lowest rate. Long, straight trajectories show good spatial exploration of the semantic space, \
                but without the diversity boost brought by multilingualism.</li>\
                </ul>`,
                fr:
                `Une fois le biais linguistique confirmé, une question plus précise s'est posée : est-ce un défaut du modèle ? \
                Une simple traduction n'est pas une découverte, c'est du bruit. \
                <strong>Le nombre brut d'émergences était inévitablement gonflé</strong> par ces variantes inter-langues d'un même nom.\n\n\
                Pour aller au-delà, j'ai développé une nouvelle métrique : l'<strong>Emergence Score</strong>. \
                Il est défini comme le ratio entre le nombre d'émergences de nouveaux mots et le nombre total de mutations à une génération donnée. \
                Un score élevé signifie que le système génère de nouveaux mots à un bon rythme, il explore. \
                Un score bas signifie que les mutations recyclent des mots déjà rencontrés, le système exploite un champs sémantique connu.\n\
                La corrélation entre ce score et la trajectoire UMAP a révélé un motif comportemental clair : \
                <strong>les pics du score coïncident avec l'entrée de la trajectoire dans une nouvelle zone sémantique</strong>, \
                tandis que les baisses correspondent à un retour ou à une circulation dans un territoire déjà exploré.\n\n\
                Appliqué aux quatre langues, cette métrique a donné des résultats concrets et comparables :\n\
                <ul>\
                <li><strong>Russe (moy. 399) :</strong> le plus élevé des quatre. Les expériences se sont spécialisées dans les espèces terrestres, \
                avec de nombreux noms distincts dans cette seule catégorie. <strong>Forte exploitation d'une zone sémantique unique</strong>.</li>\
                <li><strong>Français (moy. 352) :</strong> l'écosystème multilingue (français, anglais, latin coexistant spontanément) a produit les résultats les plus diversifiés, \
                incluant l'émergence de <strong>noms d'espèces mythologiques</strong>, une catégorie absente de toutes les autres langues.</li>\
                <li><strong>Chinois (moy. 247) :</strong> les expériences ont suivi une trajectoire séquentielle, se spécialisant presque exclusivement dans les espèces baleinières, \
                avec une propriété directionnelle unique non observée ailleurs.</li>\
                <li><strong>Anglais (moy. 215) :</strong> le taux le plus bas. De longues trajectoires rectilignes montrent une bonne exploration spatiale, \
                mais sans le gain de diversité apporté par le multilinguisme.</li>\
                </ul>`,
            },
        },
        {
            title: {
                [UNIVERSAL_LANG]: "Multilingualism as a Novelty Engine",
                fr: "Le multilinguisme comme moteur de nouveauté",
            },
            content: {
                [UNIVERSAL_LANG]:
`The clearest lesson from these results: <strong>mixing languages improves emergence diversity</strong>. Not by design — by nature. \
When prompting in French, the LLM naturally drifted into producing English and Latin names alongside French ones. \
This wasn't planned, but it produced richer and more diverse outcomes than any single-language experiment.\n\n\
The reason is structural: a semantic field doesn't contain infinite words. \
By staying too long in the same zone — whale species, terrestrial animals — the system runs out of novelties. \
Mutations start recycling names already encountered, emergence scores drop. \
<strong>Language switching breaks this stagnation</strong> by pushing the population into semantic zones it hadn't yet explored.\n\n\
This also works the other way around. Latin, which emerged spontaneously in some French experiments, proved to be an exception: \
highly productive for extinct species categories, it <strong>clusters tightly</strong> and rarely lets the trajectory escape once it settles in. \
An over-specialized language acts as a trap rather than an engine — the opposite of what multilingualism achieves.\n\n\
The broader takeaway: the language used to query the model isn't just a formatting choice. \
It actively shapes what the model generates, which semantic areas it visits, and how efficiently it explores them. \
Exploiting that deliberately — by switching languages across generations, for instance — \
<strong>is a viable strategy to sustain open-ended emergence</strong>. [[image 3]]\n\n\
These results were presented alongside Pr. Suzuki at the \
<strong>39th annual conference of the Japanese Society for Artificial Intelligence (JSAI 2025)</strong> in Osaka.`,
                fr:
`L'enseignement le plus clair de ces résultats : <strong>mélanger les langues améliore la diversité des émergences</strong>. Pas par conception — par nature. \
En invitant le LLM en français, il dérivait naturellement vers la production de noms en anglais et en latin en parallèle. \
Ce n'était pas planifié, mais cela produisait des résultats plus riches et plus diversifiés que n'importe quelle expérience monolingue.\n\n\
La raison est structurelle : un champ sémantique ne contient pas un nombre infini de mots. \
En restant trop longtemps dans la même zone — espèces baleinières, animaux terrestres — le système s'épuise en nouveautés. \
Les mutations commencent à recycler des noms déjà rencontrés, le score d'émergence chute. \
<strong>Le changement de langue brise cette stagnation</strong> en forçant la population vers des zones sémantiques encore inexplorées.\n\n\
Cela fonctionne également dans l'autre sens. Le latin, apparu spontanément dans certaines expériences françaises, s'est révélé être une exception : \
très productif pour les catégories d'espèces éteintes, il <strong>se clusterise de manière serrée</strong> et laisse rarement la trajectoire s'en échapper une fois établie. \
Une langue sur-spécialisée agit comme un piège plutôt que comme un moteur — l'inverse de ce que le multilinguisme permet d'atteindre.\n\n\
L'enseignement général : la langue utilisée pour interroger le modèle n'est pas un simple choix de formatage. \
Elle influence activement ce que le modèle génère, les zones sémantiques qu'il visite, et l'efficacité de son exploration. \
Exploiter cela délibérément — en alternant les langues entre les générations, par exemple — \
<strong>est une stratégie viable pour soutenir une émergence indéfinie</strong>. [[image 3]]\n\n\
Ces résultats ont été présentés aux côtés du Pr. Suzuki lors de la \
<strong>39ème conférence annuelle de la Société Japonaise pour l'Intelligence Artificielle (JSAI 2025)</strong> à Osaka.`,
            },
        },
        {
            title: {
                [UNIVERSAL_LANG]: "Conclusion",
            },
            content: {
                [UNIVERSAL_LANG]:
`This case study showed that LLMs are not language-neutral tools. The language used to prompt them leaves a mark — \
on what they generate, on how they explore a semantic space, on which categories of words naturally emerge. \
In the context of EEW, this bias turned out to be a resource rather than a problem.\n\n\
The practical output of this internship was twofold: a set of rigorous findings about language influence on LLM behavior, \
and a fully redesigned analysis application — <strong>EEW Analyzer</strong> — capable of running experiments, \
computing all described metrics, and generating visuals in real time. \
The language question, as noted in the research continuation plans, is far from closed. But the groundwork is there.`,
                fr:
`Cette étude de cas a montré que les LLMs ne sont pas des outils neutres vis-à-vis de la langue. \
La langue utilisée pour les interroger laisse une empreinte — sur ce qu'ils génèrent, sur la façon dont ils explorent un espace sémantique, \
sur les catégories de mots qui émergent naturellement. Dans le contexte d'EEW, ce biais s'est révélé être une ressource plutôt qu'un problème.\n\n\
Le résultat concret de ce stage était double : un ensemble de résultats rigoureux sur l'influence de la langue sur le comportement des LLMs, \
et une application d'analyse entièrement repensée — <strong>EEW Analyzer</strong> — capable de lancer des expériences, \
de calculer toutes les métriques décrites et de générer des visuels en temps réel. \
La question linguistique, comme indiqué dans les perspectives de recherche, est loin d'être close. Mais les bases sont posées.`,
            },
        },
    ],
    tableOfContents: true,
    relatedProjects: ["EEW Analyzer"],
};
