/**
 * @fileoverview EEW language biases case study blog post definition
 * Case study exploring the language biases in the Evolutionary Ecology of Words model
 */

import { BlogPost, BlogCategory } from '../dataTypes';
import { UNIVERSAL_LANG } from '../../utils/assetsUtils';
import { eewAlgo, eewBasicVisuals, eewLangBehaviors, eewLangBias, eewLangBiasTraj, eewLangTraj, eewTrajDyna, eewTrajEmergeScore, projectsImages } from '../projects_images';

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
        eewAlgo,
        eewBasicVisuals,
        eewLangTraj,
        eewLangBiasTraj,
        eewLangBias,
        eewTrajEmergeScore,
        eewLangBehaviors,
        eewTrajDyna,
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
                "This experimental model manipulates <strong>animal species names</strong>, generated and judged by an LLM. The model \
                decides who survives according to a <strong>given criterion</strong> (e.g. \"which one is stronger?\"). At the end of each iteration, \
                words have a chance to mutate, allowing the overall <strong>semantic derivation</strong> of the population.\n\
                EEW is rooted in <strong>evolutionary game theory</strong>, but **indeterministic**. The model doesn't choose a winner at random: \
                it draws from its <strong>internal representations of the world</strong> (biological hierarchies, \
                prey-predator relationships, cultural contexts). Each competition is an inference task, and the emerging dynamics are \
                a direct reflection of the model's **alignment**.\n\n\
                At the heart of this research lies the concept of <strong>open-endedness</strong>: the ability of a system to produce \
                <strong>continuous novelty</strong>. Most AI systems are designed to converge towards a correct answer. EEW provides the ground \
                for another question: can an LLM sustain a system that <strong>never stops generating new things</strong>? It's not about whether the results are realistic, but whether they are creative.\n\n\
                The experiment is orchestrated by <strong>four specific prompts</strong>, one per phase:\
                <ul> \
                <li>a context prompt (<i>prefix</i>) to define the model's role,</li>\
                <li>the generation of the <strong>initial population</strong>,</li>\
                <li>the judgment between two names to determine <strong>the winner</strong>,</li>\
                <li>the generation of <strong>mutation possibilities</strong> for a given word.</li>\
                </ul> \
                These four phases allow for <strong>any state change within the population</strong>. Despite the apparent simplicity of the concept, \
                the model generates dynamics that have never been explicitly programmed: <strong>prey-predator cycles, food chains, \
                epidemic phenomena, and even the spontaneous emergence of extinct species</strong>. [[image 0]]\
                The first type of generable visual studies the frequency of the most present names. It shows <strong>the emergence of prey-predator dynamics, \
                food chains and even epidemic phenomena</strong>. \
                The second is a semantic graph using <strong>Sentence Transformers</strong> to vectorize the names and <strong>UMAP</strong> to plot trajectories. \
                These trajectories <strong>materialize the semantic derivation from the initial population to the final population</strong>. \
                The more spaced out the points are, the less the populations at these T instants have to do with each other. With this type of graph, we can identify <strong>semantic spaces or fields</strong> and thus observe <strong>specialization dynamics \
                (e.g. species types), exploration or exploitation</strong> of the semantic space and even <strong>concepts</strong> that could <strong>emerge</strong>. [[image 1]]\
                This model aims to <strong>observe, and ideally maximize, the agility of LLMs and the emergence of novelty</strong>. \
                That's why the analysis focuses on metrics like the number of new words appeared per generation or the clustering of population mean vectors in the semantic space; measuring a <strong>creative output rather than an accuracy</strong>.",
                fr:
                "Ce modèle expérimental manipule des <strong>noms d'espèces animales</strong>, générés et jugés par un LLM. Le modèle \
                décide qui survit selon un <strong>critère donné</strong> (ex: \"lequel est le plus fort ?\"). À la fin de chaque itération, \
                les mots ont une chance de muter, permettant la <strong>dérivation sémantique</strong> globale de la population.\n\
                EEW s'inscrit dans la <strong>théorie évolutive des jeux</strong>, mais **indéterministe**. Le modèle ne choisit pas un vainqueur au hasard : \
                il puise dans ses <strong>représentations internes du monde</strong> (hiérarchies biologiques, \
                relations proie-prédateur, contextes culturels). Chaque compétition est une tâche d'inférence, et les dynamiques émergentes sont \
                le reflet direct de **l'alignement** du modèle.\n\n\
                Au cœur de cette recherche se trouve le concept d'<strong>open-endedness</strong> (non-déterminisme) : la capacité d'un système à produire \
                <strong>une nouveauté continue</strong>. La plupart des systèmes d'IA sont conçus pour converger vers une réponse correcte. EEW fournit le terrain \
                pour une autre question : un LLM peut-il soutenir un système qui <strong>ne cesse jamais de générer de nouvelles choses</strong> ? Il ne s'agit \
                pas de savoir si les résultats sont réalistes, mais s'ils sont créatifs.\n\n\
                L'expérience est orchestrée par <strong>quatre prompts spécifiques</strong>, un par phase :\
                <ul> \
                <li>un prompt de contexte (<i>prefix</i>) pour définir le rôle du modèle,</li>\
                <li>la génération de la <strong>population initiale</strong>,</li>\
                <li>le jugement entre deux noms pour déterminer <strong>le gagnant</strong>,</li>\
                <li>la génération de <strong>possibilités de mutation</strong> pour un mot donné.</li>\
                </ul> \
                Ces quatre phases permettent <strong>tout changement d'état au sein de la population</strong>. Malgré la simplicité apparente du concept, \
                le modèle génère des dynamiques qui n'ont jamais été explicitement programmées : <strong>cycles proie-prédateur, chaînes alimentaires, \
                phénomènes épidémiques, et même l'émergence spontanée d'espèces disparues</strong>. [[image 0]]\
                Le premier type de visuel générable étudie la fréquence des noms les plus présents. On y observe <strong>l'émergence de dynamiques proie-prédateur, \
                de chaînes alimentaires et même de phénomènes épidémiques</strong>. \
                Le second est un graphique sémantique utilisant <strong>Sentence Transformers</strong> pour vectoriser les noms et <strong>UMAP</strong> pour tracer des trajectoires. \
                Ces trajectoires <strong>matérialisent la dérivation sémantique de la population initiale vers la population finale</strong>. \
                Plus les points sont espacés, moins les populations à ces instants T ont à voir entre elles. Avec ce type de graphique, on \
                peut identifier des <strong>espaces ou champs sémantiques</strong> et ainsi observer des <strong>dynamiques de spécialisation \
                (ex: types d'espèces), d'exploration ou d'exploitation</strong> de l'espace sémantique et même de <strong>concepts</strong> qui pourraient <strong>émerger</strong>. [[image 1]]\
                Ce modèle vise à <strong>observer, et idéalement maximiser, l'agilité des LLMs et l'émergence de la nouveauté</strong>. \
                C'est pourquoi l'analyse se concentre sur des métriques comme le nombre de nouveaux mots apparus par génération ou la clusterisation \
                des vecteurs moyens de population dans l'espace sémantique; mesurer une <strong>production créative plutôt qu'une précision</strong>.",
            },
        },
        {
            title: {
                [UNIVERSAL_LANG]: "Discovery of Language Biases",
                fr: "Découverte des biais linguistiques",
            },
            content: {
                [UNIVERSAL_LANG]:
                "A single word, translated into different languages, can have more or less <strong>different meanings \
                or cultural representations</strong>. The theme of animal species is very demonstrative of this \
                phenomenon. Taking legends and myths as exemples, the snake is a rather negative animal \
                in Nordic and Christian folklore - symbolizing chaos and sin - but it is also a symbol of \
                immortality and infinity in Buddhist, Mesoamerican and Australian cultures. \n In the context \
                of Evolutionary Ecology of Words, we were trying to <strong>maximize the emergence of novelties</strong>. \
                These divergent representations could not only feed the experiment of rich folklore, but \
                also provide <strong>a link between distant cultures</strong>. Consequently, it could renew the number of \
                new possibilities and allow a sustained growth of emerging novelties along experiments. \
                The basic hypothesis of this study was therefore that <strong>a language should be imbued \
                with cultural representations carried by the words that compose it. And if language influences \
                the meaning of words at this level, it should also influence the generation behavior of the LLM.</strong>\n\n\
                Four languages have been selected to compare experiment results: English (initial \
                language of the experiment), Russian, Chinese, and French. Those languages \
                implement <strong>different character mechanics, different ways to write, and come from \
                more or less different cultures</strong>. And the chosen LLM was Gemma2 9b Instruct GGUF. \n \
                The first results showed dramatically different trajectory patterns. \
                They were promising, as simply changing the language of the prompts produced <strong>something \
                different</strong>. Moreover, it is now clear that the model has difficulties \
                dealing with other languages than English. It seems that every experiment with other \
                languages <strong>tends to emerge at least English, or even more foreign languages</strong>. Which \
                led to the development of <strong>multilingual ecosystems</strong>. [[image 2]]\
                Interestingly, we could not only locate semantic areas for species \
                categories, but also <strong>areas relative to the languages themselves</strong>. If we look at a single \
                case, we observe that two translations of a single word have different locations, even \
                though the population at these generations were dominated by the same specie \
                category. This phenomenon can also be observed on a larger scale, with \
                the presence of entire species categories areas located according to the language. \
                At this point, we assume that the language bias is visible: <strong>languages themselves \
                have strong semantic values</strong>. [[image 3]] [[image 4]]",
                fr:
                "Un même mot, traduit dans différentes langues, peut avoir des significations ou <strong>des représentations culturelles plus ou moins différentes</strong>. \
                Le thème des espèces animales est très démonstratif de ce phénomène. Prenant les légendes et les mythes comme exemples, le serpent est un animal \
                plutôt négatif dans le folklore nordique et chrétien - symbolisant le chaos et le péché - mais il est aussi un symbole d'immortalité et d'infini \
                dans les cultures bouddhistes, mésoaméricaines et australiennes. \n Dans le contexte de Evolutionary Ecology of Words, nous cherchions à \
                <strong>maximiser l'émergence de nouveautés</strong>. Ces représentations divergentes pourraient non seulement alimenter l'expérience de riches folklores, \
                mais aussi fournir <strong>un lien entre des cultures éloignées</strong>. Par conséquent, cela pourrait renouveler le nombre de possibilités nouvelles et\
                permettre une croissance soutenue des nouveautés émergentes au fil des expériences. \
                L'hypothèse de base de cette étude était donc qu'<strong>une langue devrait être imprégnée des représentations culturelles portées par les mots qui la composent. \
                Et si la langue influence le sens des mots à ce niveau, elle devrait aussi influencer le comportement de génération du LLM.</strong>\n\n\
                Quatre langues ont été sélectionnées pour comparer les résultats des expériences : l'anglais (langue de référence), le russe, le chinois et le français. \
                Ces langues mettent en œuvre <strong>des mécaniques de caractères, des façons d'écrire, et proviennent de cultures plus ou moins différentes</strong>. \
                Et le LLM choisi était Gemma2 9b Instruct GGUF. \n Les premiers résultats ont montré des motifs de trajectoire drastiquement différents. \
                Ils étaient prometteurs, car le simple fait de changer la langue des prompts produisait <strong>quelque chose de différent</strong>. De plus, il est maintenant \
                clair que le modèle a des difficultés à traiter d'autres langues que l'anglais. Il semble que chaque expérience avec d'autres langues <strong>ait tendance à faire\
                émerger au moins l'anglais, voire plus de langues étrangères</strong>. Ce qui a conduit au développement <strong>d'écosystèmes multilingues</strong>. [[image 2]]\
                Fait intéressant, nous avons pu localiser non seulement des zones sémantiques pour les catégories d'espèces, mais aussi <strong>des zones relatives aux langues\
                elles-mêmes</strong>. Si l'on regarde un cas unique, on observe que deux traductions d'un même mot ont des emplacements différents, même si la population à ces \
                générations était dominée par la même catégorie d'espèce. Ce phénomène peut aussi être observé à plus grande échelle, avec la présence de zones entières de catégories\
                d'espèces situées selon la langue. À ce stade, nous admettons que le biais linguistique est visible : <strong>les langues elles-mêmes ont de fortes valeurs sémantiques</strong>. \
                [[image 3]] [[image 4]]",
            },
        },
        {
            title: {
                [UNIVERSAL_LANG]: "The Emergence Score",
                fr: "L'Emergence Score",
            },
            content: {
                [UNIVERSAL_LANG]:
                "The question was then to tell <strong>whether this bias was a result jammer or not</strong>. Can \
                \"simple translations\" be considered as relevant emerging novelties ? Confronted with \
                this question, we decided to return to the basics: counting the emergencies. In other \
                words, what influence do languages, and by extent multilingual ecosystems, have on \
                the emergence of novelties ?  \n\n\
                Firstly, experiments with languages other than English got better emergence rates. \
                But the raw emergence count was inevitably inflated by cross-language variants of the same name. \
                To go beyond that, I developed a new metric: the emergence score. It is the ratio of the number of \
                emergencies by the number of mutations at a certain generation. In the context of novelty's emergence \
                maximization, it reflects the <strong>efficiency of this generation</strong>. \n Keep turning in the same \
                semantic field, and the possibilities of emergence will narrow; there aren't an infinite \
                number of new words. <strong>A high score therefore means that the possibilities range is \
                wide, and conversely, a low score *may* mean that there are not many words left to \
                emerge</strong>. \n For a single trial, we can so correlate the evolution of this score over \
                generations, with the behavior of its semantic trajectory. And experiments showed that the emergence of new languages had \
                <strong>durable effects on mutations and species diversity</strong> (not only the same species translated). \
                The conclusion of such an observation is that <strong>zig-zagging between languages helps to open \
                ecosystems and to explore new horizons</strong>. Moreover, the French experiment showed \
                a rich multilingual ecosystem, which led to promising and more **abstract** \
                emergences, such as mythological species. [[image 5]]",
                fr:
                "La question était alors de savoir <strong>si ce biais était un frein à l'émergence ou pas</strong>. Peut-on considérer les \"simples traductions\" comme\
                des nouveautés émergentes pertinentes ? Confronté à cette question, nous avons décidé de revenir à l'essentiel : compter les émergences. En d'autres \
                termes, quelle influence les langues, et par extension les écosystèmes multilingues, ont-elles sur l'émergence de nouveautés ?  \n\n\
                Premièrement, les expériences avec des langues autres que l'anglais ont obtenu de meilleurs taux d'émergence. Mais le comptage brut des émergences était\
                inévitablement gonflé par les variantes inter-langues d'un même nom. Pour aller au-delà, j'ai développé une nouvelle métrique : le score d'émergence. \
                C'est le ratio du nombre d'émergences par le nombre de mutations à une certaine génération. Dans le contexte de la maximisation de l'émergence de nouveauté, \
                il reflète l'<strong>efficacité de cette génération</strong>. \n Tourner en rond dans le même champ sémantique, et les possibilités d'émergence se réduiront; il n'y a pas\
                un nombre infini de nouveaux mots. <strong>Un score élevé signifie donc que le champ des possibilités est large, et inversement, un score bas *peut* signifier qu'il\
                n'y a pas beaucoup de mots restants à émerger</strong>. \n On peut ainsi corréler l'évolution de ce score au fil des générations, avec le comportement de la \
                trajectoire de chaque essai. Et les expériences ont montré que l'émergence de nouvelles langues avait <strong>des conséquences durables sur les mutations et la diversité des espèces</strong>\
                (pas seulement les mêmes espèces traduites). La conclusion d'une telle observation est que <strong>zigzaguer entre les langues aide à ouvrir les écosystèmes et à explorer de nouveaux\
                horizons</strong>. De plus, l'expérience française a montré un riche écosystème multilingue, qui a conduit à des émergences prometteuses et plus **abstraites**,\
                telles que des espèces mythologiques. [[image 5]]",
            },
        },
        {
            title: {
                [UNIVERSAL_LANG]: "Multilingualism as a Novelty Engine",
                fr: "Le multilinguisme comme moteur de nouveauté",
            },
            content: {
                [UNIVERSAL_LANG]:
                "In addition to the influence on emergencies, <strong>languages showed different and specific \
                generation behaviors</strong>. In fact, each language seemed to follow patterns. \
                <ul>\
                <li>Russian (emergence avg. **399**) : the most *productive*. Experiments showed a specialization in terrestrial species, but\
                with many distinct names in this single category. And the major part of them were russian names. This indicates a <strong>strong \
                exploitation of the semantic field</strong>, without necessarily multilingualism.</li>\
                <li>French (emergence avg. **352**) : the most *diverse* results. Experiments with this language showed spontaneous multilingual ecosystem \
                (French, English, Latin, Swedish, Italian..). This led to promising and more **abstract** emergences, such as mythological species, a \
                category absent from all other languages. <strong>It is a good balance between exploration and exploitation</strong>.</li>\
                <li>Chinese (emergence avg. **247**) : the most *sequential* trajectory. Experiments with this language showed a specialization almost exclusively in whale species. \
                Moreover, unlike the other languages, <strong>english struggled to emerge</strong> and more generally, <strong>the semantic weights of other languages were very low</strong>. So Chinese \
                may have kind of a <strong>conservative behavior</strong>.</li>\
                <li>English (emergence avg. **215**) : the *least* productive. Long and straight trajectories showed a good spatial exploration, \
                but <strong>without the gain of diversity provided by multilingualism</strong>.</li>\
                </ul>\
                These results describe the behaviors according to each of the four prompts languages. But without even expecting it, other languages that appeared also showed \
                unique properties. For example, Latin, which almost emerged in every experiments, is <strong>an over-specialized</strong> language in extinct species. It is highly productive for this category, but \
                it <strong>clusters tightly and rarely lets the trajectory escape once it settles in</strong>. There is also Scandinavian, which only appeared in the French experiment,\
                with the emergence of mythological species (I can flex I have dropped Jörmungand btw :) ). [[image 7]]",
                fr:
                "En plus de l'influence sur les émergences, <strong>les langues ont montré des comportements de génération différents et spécifiques</strong>. En fait, chaque langue semblait suivre des motifs. \
                <ul>\
                <li>Russe (moy. émergence **399**) : le plus *productif*. Les expériences ont montré une spécialisation dans les espèces terrestres, mais avec de nombreux noms distincts dans cette catégorie \
                unique. Et la majeure partie d'entre eux étaient des noms russes. Cela indique une <strong>forte exploitation du champ sémantique</strong>, sans nécessairement de multilinguisme.</li>\
                <li>Français (moy. émergence **352**) : les résultats les plus *diversifiés*. Les expériences avec cette langue ont montré un écosystème multilingue spontané (français, anglais, latin, suédois, \
                italien..). Cela a conduit à des émergences prometteuses et plus **abstraites**, telles que des espèces mythologiques, une catégorie absente de toutes les autres langues. <strong>C'est un bon \
                équilibre entre exploration et exploitation</strong>.</li>\
                <li>Chinois (moy. émergence **247**) : la trajectoire la plus *séquentielle*. Les expériences avec cette langue ont montré une spécialisation presque exclusivement dans les espèces de baleines. \
                De plus, contrairement aux autres langues, <strong>l'anglais a eu du mal à émerger</strong> et plus généralement, <strong>les poids sémantiques des autres langues étaient très faibles</strong>. \
                Le chinois peut donc avoir un comportement plutôt <strong>conservateur</strong>.</li>\
                <li>Anglais (moy. émergence **215**) : le *moins* productif. Des trajectoires longues et droites ont montré une bonne exploration spatiale, mais <strong>sans le gain de diversité fourni par le \
                multilinguisme</strong>.</li>\
                </ul>\
                Ces résultats décrivent les comportements selon chacune des quatre langues de prompts. Mais sans même s'y attendre, d'autres langues qui apparaissaient montraient des propriétés uniques. \
                Par exemple, le latin, qui a presque émergé dans toutes les expériences, est <strong>un langage sur-spécialisé</strong> dans les espèces éteintes. Il est très productif pour cette catégorie, mais \
                il <strong>forme des clusters très serrés et laisse rarement la trajectoire s'échapper une fois qu'elle s'y installe</strong>. Il y a aussi le scandinave, qui n'est apparu que dans l'expérience française, \
                avec l'émergence d'espèces mythologiques (je peux flex d'avoir drop Jörmungand d'ailleurs :) ). [[image 7]]",
            },
        },
        {
            title: {
                [UNIVERSAL_LANG]: "Conclusion",
            },
            content: {
                [UNIVERSAL_LANG]:
                "Evolutionary Ecology of Words is a powerful model to explore the creativity capabilities of LLMs, and highlight their biases. \
                The discovery of language biases and their influence on the dynamics of the experiment is a first step in its assessment. \
                As far as we know now, the languages are great novelty engines and using them can leverage different strategies to sustain open-ended emergence. \
                However, it is important to note that the results of this case study are strongly influenced by the LLM itself (translation quality, other cultural biases, etc.). \
                For instance, a little experiment has been conducted at the end of the internship with another LLM (Llama 9b it) which focused on african terrestrial species, \
                while Gemma2 focused more on marine species. \n\
                These results has been integrated to the research on EEW, and presented at the 39th annual conference of the Japanese Society for Artificial Intelligence \
                (JSAI 2025) in Osaka. The next steps would be to compare more LLMs, and to focus more on abstract concepts emergence, which may have more potential \
                for open-endedness with natural languages. This raises new challenges: with more and more parameters, how to detect, measure and visualize the emergence of concepts ?",
                fr:
                "Evolutionary Ecology of Words est un modèle puissant pour explorer les capacités créatives des LLMs, et mettre en lumière leurs biais. \
                La découverte des biais linguistiques et de leur influence sur les dynamiques de l'expérience est une première étape dans son évaluation. \
                Pour autant que nous le sachions aujourd'hui, les langues sont de grands moteurs de nouveauté et les utiliser peut permettre différentes stratégies \
                pour soutenir une émergence indéfinie. Cependant, il est important de noter que les résultats de cette étude de cas sont fortement influencés \
                par le LLM lui-même (qualité de traduction, autres biais culturels, etc.). Par exemple, une petite expérience a été menée à la fin du stage avec \
                un autre LLM (Llama 9b it) qui s'est concentré sur les espèces terrestres africaines, tandis que Gemma2 s'est davantage concentré sur les espèces marines. \n\
                Ces résultats ont été intégrés à la recherche sur EEW, et présentés lors de la 39ème conférence annuelle de la Société Japonaise pour l'Intelligence \
                Artificielle (JSAI 2025) à Osaka. Les prochaines étapes seraient de comparer plus de LLMs, et de se concentrer davantage sur l'émergence de concepts \
                abstraits, qui peuvent avoir plus de potentiel pour l'indéterminisme avec le langage naturel. Ce qui pose de nouveaux défis : avec de plus en plus de paramètres, \
                comment détecter, mesurer et visualiser l'émergence de concepts ?",
            },
        },
    ],
    tableOfContents: true,
    relatedProjects: ["EEW Analyzer"],
};
