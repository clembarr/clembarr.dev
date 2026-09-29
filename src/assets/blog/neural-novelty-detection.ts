/**
 * @fileoverview Neural novelty detection blog post definition
 * Fundamental research on the fruit fly olfactory circuit and what it changes
 * for Bloom-filter-like data structures, from personal reading notes.
 */

import { BlogPost, BlogCategory } from '../dataTypes';
import { UNIVERSAL_LANG } from '../../utils/translationUtils';
import { ffbfArchitecture } from '../projects_images';
import { bloomFilterFlyVariant, notesBrainstoFFBF } from '../blog_images';

export const neuralNoveltyDetection: BlogPost = {
    slug: "neural-novelty-detection",
    title: {
        [UNIVERSAL_LANG]: "An Innovative Data Structure for Novelty Detection",
        fr: "Une structure de données innovante pour la détection de nouveauté",
    },
    description: {
        [UNIVERSAL_LANG]:
            "The fruit fly's olfactory circuit is one of the few sensory neural networks we have managed to map. " +
            "Studying mechanisms that have traversed millions of years of evolution reveals new solutions to complex " +
            "data representation problems.",
        fr:
            "Le circuit olfactif de la mouche est l'un des seuls réseaux de neurones sensoriels que nous avons réussi à cartographier. " +
            "L'étude de mécanismes, ayant traversés des millions d'années d'évolution, " +
            "révèle de nouvelles solutions à des problèmes complexes de représentation de données.",
    },
    tags: {
        [UNIVERSAL_LANG]: ["Research", "Neuroscience", "Biomimicry", "Data", "Personal"],
        fr: ["Recherche", "Neurosciences", "Biomimétisme", "Data", "Personnel"],
    },
    coverImage: ffbfArchitecture,
    date: new Date(2026, 8, 23),
    category: BlogCategory.RESEARCH,
    readingTime: 9,
    tableOfContents: true,
    img: [bloomFilterFlyVariant, notesBrainstoFFBF],
    paragraphs: [
        {
            title: {
                [UNIVERSAL_LANG]: "Mapping a Fly's Brain",
                fr: "Cartographie de cerveau de la mouche",
            },
            content: {
                [UNIVERSAL_LANG]:
                    "The fruit fly has about a hundred thousand neurons. Few enough to be tractable, but enough to produce effective behaviour. " +
                    "Relatively incredible, for us who build AI models with billions of parameters. " +
                    "That is why its brain is one of the very few to be almost entirely mapped. " +
                    "Today we focus on the <strong>olfactory system</strong>: how many types of receptors feed it, how they are wired, and which output neuron carries which signal." +
                    "<br><br>" +
                    "Through this sensory pathway (this circuit), the fly is able to <strong>classify, memorise, and be surprised</strong> by the odours it perceives. " +
                    "An odour arrives as a vector whose dimensions project onto the olfactory neurons. This is followed by a chain reaction " +
                    "of random projection and triggering of inhibitory neurons, which results in a pattern being drawn in the brain's novelty characterisation area, which in turn produces the signal to be memorised. " +
                    "<br>" +
                    "In 2017, Hattori at al. show that the activity of a specific output neuron encodes novelty, and " +
                    "that this signal is suppressed as the animal familiarises with the source stimulus. In 2018, Dasgupta, Sheehan, Stevens and Navlakha " +
                    "reinterpret the same circuit as a <strong>data structure</strong> and publish " +
                    "<a href=\"https://www.pnas.org/doi/full/10.1073/pnas.1814448115\" target=\"_blank\" rel=\"noreferrer\"><em>A neural data structure for novelty detection</em></a>.",
                fr:
                    "La mouche à fruit compte environ cent mille neurones. Assez peu pour être traitable, mais assez pour produire un comportement efficace. " +
                    "Ce qui est relativement incroyable, pour nous qui construisont des modèles d'IA avec des milliards de paramètres. " +
                    "C'est pourquoi son cerveau fait partie des très rares à être presque entièrement cartographiés. " +
                    "Aujourd'hui on s'intéresse au <strong>système olfactif</strong> : combien de types de récepteurs " +
                    "l'alimentent, comment ils sont câblés, et quel neurone de sortie porte quel signal." +
                    "<br><br>" +
                    "À travers cette voie sensorielle (ce circuit), la mouche est capable de <strong>classifier, de mémoriser, et de s'étonner</strong> des odeurs perçues. " +
                    "Une odeur arrive sous forme d'un vecteur dont les dimensions se projètent sur des neuronnes odorants. S'en suit une réaction en chaîne " +
                    "de projection aléatoire et de déclenchement de neurones inhibiteurs, qui aboutit au dessin d'un patterne dans la zone cérébrale de caractérisation " +
                    "de la nouveauté, qui produit à son tour le signal à mémoriser. " +
                    "<br>" +
                    "En 2017, Hattori et al. montrent que l'activité d'un neurone de sortie précis encode la nouveauté, et " +
                    "que ce signal est réprimé à mesure que l'animal se familiarise avec un stimulus. En 2018, Dasgupta, Sheehan, Stevens et Navlakha " +
                    "relisent le même circuit comme une <strong>structure de données</strong> et publient " +
                    "<a href=\"https://www.pnas.org/doi/full/10.1073/pnas.1814448115\" target=\"_blank\" rel=\"noreferrer\"><em>A neural data structure for novelty detection</em></a>."
            },
        },
        {
            title: {
                [UNIVERSAL_LANG]: "What Evolution Settled On",
                fr: "Ce que l'évolution a trouvé",
            },
            content: {
                [UNIVERSAL_LANG]:
                    "Before any mechanism, it is worth pausing on the <strong>enormous constraints</strong> under which this circuit works. " +
                    "<br>" +
                    "The brain has a limited and fixed space. The fly cannot retain the odours it encounters, it receives no annotated training set, no supervision. " +
                    "Everything must fit in a few milliseconds per input, on <strong>a stream that never stops</strong>, and <strong>without exhausting its energy</strong>. " +
                    "<br>Evolution has therefore converged on a remarkably optimised system." +
                    "<br><br>" +
                    "Knowing that we are working here on streams in a detection system, the question of the mere presence or absence of the data " +
                    "is not really relevant. But <strong>\"how foreign is it?\"</strong>, that is an important metric to pick up <strong>signals of interest</strong>. " +
                    "For a given odour, about 95% of the neurons in the dedicated brain area remain completely silent. The <strong>tag</strong> of an odour (the equivalent of a hash in computer science) is only a few dozen " +
                    "out of 2000. Nothing else is retained." +
                    "<br>" +
                    "<strong>Familiarity is a state.</strong> The entire olfactory experience of " +
                    "the animal is contained in the strength of a few hundred synapses. No key, no stored element, " +
                    "no comparison with anything. <strong>The score simply reflects the wear state of a few synaptic connections</strong>. " +
                    "Because the wiring is random but fixed, two chemically close odours have tags that overlap. Encountering one makes the other " +
                    "<em>partially known</em>, without them ever having been compared; this is the notion of resemblance. The circuit does not compute a " +
                    "similarity, <strong>generalisation</strong> is inherited from the system's operation." +
                    "Finally, in the circuit, <strong>forgetting</strong> is not a suppression, but a progressive overwriting. " +
                    "The return of novelty over time is linked to the system's natural <strong>entropy</strong>." +
                    "<br><br>" +
                    "A structure that generalises, forgets, works in one pass and never " +
                    "grows: that looks like a list of ambitious requirements. " +
                    "Yet it has been running in an insect for tens of millions of years.",
                    
                fr:
                    "Avant tout mécanisme, il vaut la peine de s'arrêter sur ce les <strong>contraintes de sobriété énormes</strong>." +
                    "sous lesquelles ce circuit travail. " +
                    "<br>" +
                    "Le cerveau a un espace limité et fixe. La mouche ne peut pas conserver les odeurs rencontrées, elle ne reçoit aucun jeu d'entraînement annoté, pas de supervision. " +
                    "Tout doit tenir en quelques millisecondes par entrant, sur <strong>un flux qui ne s'arrête jamais</strong>, et <strong>sans épuiser son énergie</strong>. " +
                    "<br>L'évolution a donc convergé vers un système remarquablement optimisé." +
                    "<br><br>" +
                    "Sachant que l'on travaille ici sur des flux dans un système de détection, la question de la simple présence ou non de la donnée " +
                    "n'est pas vraiment pertinente. Mais <strong>\"à quel point est-elle étrangère ?\"</strong>, ça c'est une métrique importante pour relever les <strong>signaux d'intérêt</strong>. " +
                    "Pour une odeur donnée, environ 95% des neurones de la zone cérébrale dédiée restent totalement muets. Le <strong>tag</strong> d'une odeur (équivalent du hash en informatique), c'est quelques dizaines " +
                    "seulement sur 2000. Rien d'autre n'est conservé." +
                    "<br>" +
                    "<strong>La familiarité est un état.</strong> Toute l'expérience olfactive de " +
                    "l'animal tient dans la force de quelques centaines de synapses. Pas de clé, pas d'élément stocké, " +
                    "aucune comparaison avec quoi que ce soit. <strong>Le score traduit simplement l'état d'usure de quelques connexions synaptiques</strong>. " +
                    "Comme le câblage est aléatoire mais figé, deux odeurs chimiquement proches ont des tags qui se recouvrent. Rencontrer l'une rend donc l'autre " +
                    "<em>partiellement connue</em>, sans qu'elles aient jamais été comparées; c'est la notion de ressemblance . Le circuit ne calcule pas une " +
                    "similarité, <strong>la généralisation</strong> est héritée du fonctionnement du système." +
                    "Enfin, dans le circuit, <strong>l'oubli</strong> n'est pas une suppréssion, mais un écrasement progressif. " +
                    "Le retour de la nouveauté avec le temps est lié à <strong>l'entropie</strong> naturelle du système." +
                    "<br><br>" +
                    "Une structure qui généralise, oublie, travaille en une passe et ne " +
                    "grossit jamais : cela ressemble à une liste d'exigences ambitieuses. " +
                    "Pourtant cela tourne dans un insecte depuis des dizaines de millions d'années.",
            },
        },
        {
            title: {
                [UNIVERSAL_LANG]: "Processing Details",
                fr: "Détails du traitement",
            },
            content: {
                [UNIVERSAL_LANG]:
                    "The fly has 50 types of <strong>olfactory receptor neurons</strong> (ORN). An odour arrives as a <strong>50-dimensional vector</strong>. " +
                    "The ORNs transmit the information to 50 types of <strong>projection neurons</strong> (PN), whose responses are normalised so that the average depression rate of the PNs is roughly the same for all odours and all concentrations. " +
                    "This process allows for gain control and <strong>evacuates concentration from the equation, leaving only the identity</strong> of the odour. " +
                    "Finally, a phase of <strong>random projection</strong> allows the PNs to project onto about <strong>2,000 Kenyon cells</strong> (KC), housed in a structure called the <strong>mushroom body</strong>. " +
                    "The projection matrix between PN and KC is randomly traversed: each KC randomly selects about 6 PNs and sums their depression rates. " +
                    "<br>" +
                    "That's the transfer of the olfactory stimulus, and the fixing of its wiring." +
                    "<br><br>" +
                    "Next, the competition. Each KC sends feedforward excitation to a <strong>single inhibitory neuron</strong>, which in turn inhibits all other KCs. At the end of this loop, only the <strong>5 to 10% most active</strong> " +
                    "depress in response to the odour, the remaining 95% are turned off. " +
                    "<br>These 5% survivors <strong>are the tag of the odour</strong>. A hollow point in a 2,000-dimensional space. Two very different odours will have almost no overlap of active KCs, while two close odours will share most of them. " +
                    "<br><br>" +
                    "The output of the mushroom body is carried by 34 <strong>output neurons</strong> (MBONs), which perform very diverse functions from the same tag. One of them, <strong>MBON-α'3</strong>, can be triggered by about 350 specific KCs, and it is the one that Hattori and colleagues showed encodes a <strong>novelty signal</strong>. " +
                    "For a given odour, about <strong>20 KCs</strong> among these 350 are active. A neuron named <strong>PPL1-α'3</strong> locally releases dopamine, which modifies the strength of the 350 <strong>KC → MBON-α'3 synapses</strong>, in two opposite directions at once:" +
                    "<ul>" +
                    "<li>the synapses of the 20 <strong>activated</strong> KCs <strong>weaken</strong>,</li>" +
                    "<li>those of the <strong>inactive</strong> KCs <strong>strengthen</strong>.</li>" +
                    "</ul>" +
                    "The activity of the MBON is then simply the <strong>weighted sum of its inputs</strong>, the activity of each KC multiplied by its synaptic strength. It is <strong>this state of the <em>weights</em> that determines the novelty score</strong>. " +
                    "Repeated exposure to an odour depresses its active KCs, and the response of MBON-α'3 to that odour decreases: it has become familiar.",
                    
                fr:
                    "La mouche possède 50 types de <strong>neurones récepteurs " +
                    "olfactifs</strong> (ORN). Une odeur arrive comme un <strong>vecteur de dimension " +
                    "50</strong>. Les ORNs transmettent l'information à 50 types de " +
                    "<strong>neurones de projection</strong> (PN), dont les réponses sont normalisées de sorte que le " +
                    "taux de dépression moyen des PNs soit à peu près le même pour toutes les odeurs et toutes les " +
                    "concentrations. Ce processus permet de contrôler le gain et <strong>d'évacuer la concentration de l'équationn, " +
                    "pour ne concerver que l'identité</strong> de l'odeur. " +
                    "Enfin, une phase de <strong>projection aléatoire</strong> permet la projection des PNs sur environ <strong>2 000 " +
                    "cellules de Kenyon</strong> (KC), logées dans une structure appelée <strong>mushroom body</strong>. " +
                    "La matrice de projection entre PN et KC est parcourue aléatoirement : chaque KC sélectionne au hasard environ " +
                    "6 PNs et somme leurs taux de dépression. " +
                    "<br>" +
                    "Voilà pour le transfert du stimulus olfactif, et pour la fixation de son cablage." +
                    "<br><br>" +
                    "Ensuite, la compétition. Chaque KC envoie une excitation feedforward à un " +
                    "<strong>unique neurone inhibiteur</strong>, qui inhibe en retour toutes les autres " +
                    "KCs. À la fin de cette boucle,seuls les <strong>5 à 10% les plus actifs</strong> " +
                    "déprécient en réponse à l'odeur, les 95% restants sont éteints. " +
                    "<br>Ces 5% survivants <strong>sont le tag de l'odeur</strong>. " +
                    "Un point creux dans un espace à 2 000 dimensions. Deux odeurs très différentes n'auront presque aucun " +
                    "recouvrement de KCs actives, alors que deux odeurs proches en partageront l'essentiel. " +
                    "<br><br>" +
                    "La sortie du mushroom body est portée par 34 <strong>neurones de " +
                    "sortie</strong> (MBONs), qui remplissent des fonctions très diverses à partir du même tag. L'un d'eux, " +
                    "<strong>MBON-α'3</strong>, peut être déclenché par environ 350 KCs spécifiques, et c'est celui dont " +
                    "Hattori et ses collègues ont montré qu'il encode un <strong>signal de nouveauté</strong>. " +
                    "Pour une odeur donnée, environ <strong>20 KCs</strong> parmi ces " +
                    "350 sont actives. Un neurone nommé " +
                    "<strong>PPL1-α'3</strong> libère localement de la dopamine, qui modifie la force des 350 <strong>synapses " +
                    "KC → MBON-α'3</strong>, dans deux directions opposées à la fois :" +
                    "<ul>" +
                    "<li>les synapses des 20 KCs <strong>activées</strong> s'<strong>affaiblissent</strong>,</li>" +
                    "<li>celles des KCs <strong>non actives</strong> se <strong>renforcent</strong>.</li>" +
                    "</ul>" +
                    "L'activité du MBON est alors simplement la <strong>somme pondérée de ses entrées</strong>, l'activité " +
                    "de chaque KC multipliée par sa force synaptique. C'est <strong>cet état des <em>poids</em> qui détermine le score de nouveauté</strong>." +
                    "Une exposition répétée à une odeur déprime ses KCs actives, et la réponse de MBON-α'3 à cette odeur baisse : elle est devenue familière.", 
            },
        },
        {
            title: {
                [UNIVERSAL_LANG]: "Biomimetic Engineering",
                fr: "Ingénierie biomimétique",
            },
            content: {
                [UNIVERSAL_LANG]:
                    "A <strong>Bloom filter</strong> is a probabilistic implementation of the abstract type <em>Set</em>. " +
                    "It holds a bit array of size <em>m</em> and <em>k</em> hash functions. To add an element, you set to 1 the bits its hashes point to. To test membership, you check that these bits are all at 1. " +
                    "<br>" +
                    "The answer is asymmetric: possibly in the set, or certainly not in the set. There is <strong>never a false negative, but false positives</strong> are possible, because several elements can share bits. " +
                    "<br>" +
                    "Its great virtue is a <strong>fixed memory footprint, independent of the number of elements</strong>. But false positives climb as it fills, and <strong>elements cannot be removed</strong>. " +
                    "It is a structure that saturates and has no nuance: it tests membership, not the degree of resemblance or how long ago." +
                    "<br><br>" +
                    "Dasgupta et al. notice that the fly's circuit has exactly the shape of a Bloom filter:" +
                    "<ul>" +
                    "<li>the <strong>bits</strong> are the weights of the KC → MBON-α'3 synapses,</li>" +
                    "<li>the <strong>hashing</strong> is the random PN → KC projection followed by the competition, the tag being the surviving KCs,</li>" +
                    "<li><strong>insertion</strong> is the dopamine pushing the weights of the active KCs toward 0,</li>" +
                    "<li>the <strong>query</strong> is the weighted sum computed by MBON-α'3, normalised to [0, 1].</li>" +
                    "</ul>" +
                    "<strong>The bits become weights.</strong> Novelty is no longer \"known\" or \"maybe unknown\", but a <strong>continuous score</strong>. " +
                    "<br>" +
                    "<strong>The hash becomes distance-sensitive</strong>, two close odours have tags that overlap. " +
                    "The paper checks this at the <strong>Euclidean distance</strong>: the more KCs two odours share, the lower the novelty of the second after the first. " +
                    "<br>" +
                    "As the weights of inactive KCs rise, sensitivity to an odour encountered long ago rises back to being completely novel. This implements <strong>time sensitivity</strong>." +
                    "<br><br>" +
                    "The usefulness of adapting such a structure is in analysing the evolution of a stream, more than controlling which elements pass. " +
                    "In addition to being <strong>frugal</strong> in memory, computation time and complexity." +
                    "<br>" +
                    "In <strong>anomaly detection</strong> (logs, network traffic, sensors), a new but close-to-routine event gets a low score, a truly foreign event stands out. The graded score allows sorting alerts rather than suffering them. " +
                    "<br>" +
                    "In <strong>continual learning</strong>, where the base grows endlessly, a filter that never forgets <strong>saturates</strong> and ends up finding everything familiar. " +
                    "Here, the weights rise on their own, and <strong>the structure follows the drift of what is normal</strong>. " +
                    "<br>" +
                    "But <strong>let's remain critical</strong>, it should be noted that this structure remains sensitive to <strong>hyperparameters</strong> (tag size, forgetting speed), and that the measure is only " +
                    "global, <strong>at the scale of the set</strong>, and says nothing about one individual element to another.",
                fr:
                    "Un <strong>filtre de Bloom</strong> est une implémentation probabiliste du type abstrait <em>Ensemble</em>. " +
                    "Il tient dans un tableau de <em>m</em> bits et <em>k</em> fonctions de hachage. Pour ajouter un élément, on met à 1 les cases désignées par ses hash. Pour tester l'appartenance, on vérifie que ces cases sont toutes à 1. " +
                    "<br>" +
                    "La réponse est asymétrique : possiblement dans l'ensemble, ou assurément pas dans l'ensemble. Il n'y a <strong>jamais de faux négatif, mais des faux positifs</strong> sont possibles, car plusieurs éléments peuvent partager des bits. " +
                    "<br>" +
                    "Sa grande vertu est une <strong>taille en mémoire fixe, indépendante du nombre d'éléments</strong>. Mais les faux positifs augmentent à mesure qu'il se remplit, et <strong>les éléments ne peuvent pas être retirés</strong>. " +
                    "C'est une structure qui sature et ne nuance rien : elle teste l'appartenance, pas le degré de ressemblance ni l'ancienneté." +
                    "[[image 0]]" +
                    "Dasgupta et al. remarquent que le circuit de la mouche a exactement la forme d'un filtre de Bloom :" +
                    "<ul>" +
                    "<li>les <strong>bits</strong> sont les poids des synapses KC → MBON-α'3,</li>" +
                    "<li>le <strong>hachage</strong> est la projection aléatoire PN → KC suivie de la compétition, le tag étant les KCs survivantes,</li>" +
                    "<li>l'<strong>insertion</strong> est la dopamine qui pousse vers 0 les poids des KCs actives,</li>" +
                    "<li>la <strong>requête</strong> est la somme pondérée calculée par MBON-α'3, normalisée dans [0, 1].</li>" +
                    "</ul>" +
                    "<strong>Les bits deviennent des poids.</strong> La nouveauté n'est plus « connu » ou « peut être inconnu », mais un <strong>score continu</strong>. " +
                    "<br>" +
                    "<strong>Le hash devient sensible à la distance</strong>, deux odeurs proches ont des tags qui se recouvrent. " +
                    "Le papier le vérifie d'ailleurs à la <strong>distance euclidienne</strong> : plus deux odeurs partagent de KCs, plus la nouveauté de la seconde est basse après la première. " +
                    "<br>" +
                    "Comme les poids des KCs inactives remontent, la sensibilité à une odeur rencontrée il y a longtemps remonte jusqu'à redevenir totalement nouvelle. Ce qui impélmente <strong>la sensibilité au temps</strong>." +
                    "<br><br>" +
                    "L'utilité de l'adaptation d'une telle structure c'est l'analyse de l'évolution d'un flux, plus que le contrôle des éléments qui passent. " +
                    "En plus de faire preuve de <strong>sobriété</strong> en matière de mémoire, de temps de calcul et de complexité." +
                    "<br>" +
                    "En <strong>détection d'anomalies</strong> (logs, trafic réseau, capteurs), un événement inédit mais proche de la routine obtient un score faible, un événement réellement étranger ressort. Le score gradué permet de trier les alertes plutôt que de les subir. " +
                    "<br>" +
                    "En <strong>apprentissage continu</strong>, où la base grossit sans fin, un filtre qui n'oublie jamais <strong>sature</strong> et finit par tout trouver familier. " +
                    "Ici, les poids remontent d'eux-mêmes, et <strong>la structure suit la dérive de ce qui est normal</strong>. " +
                    "<br>" +
                    "Mais <strong>restons critique</strong>, il faut cependant relever que cette structure reste sensible aux <strong>hyperparamètres</strong> (taille du tag, vitesse d'oubli), et que la mesure n'est que " +
                    "globale, <strong>à l'achelle de l'ensemble</strong>, et ne dit rien d'un élément individuel à l'autre." 
            },
        },
        {
            title: {
                [UNIVERSAL_LANG]: "Conclusion",
                fr: "Conclusion",
            },
            content: {
                [UNIVERSAL_LANG]:
                    "Fundamental research has once again given us excellent reasons to turn to nature and its mechanisms optimised by millions of years of selection. " +
                    "<br>" +
                    "From a set of <strong>constraints</strong> (fixed space, discovery, continuous perception...), evolution has converged on a specialised, high-performing and frugal system. " +
                    "Although we have only looked at the olfactory circuit, we have already been able to greatly <strong>capitalise</strong> on it, and <strong>optimise</strong> our data structures. " +
                    "<br>" +
                    "This reading has personally fascinated me. That is why I launched the project \"<a href=\"https://clembarr.dev/projects\">FFBF</a>\" (Fruit Fly Bloom Filter), " +
                    "the complete implementation of Dasgupta et al.'s proposal. " +
                    "[[image 1]]",
                fr:
                    "La <strong>recherche fondamentale</strong> nous aura une nouvelle fois donné d'excellentes raisons de nous tourner vers " +
                    "la nature et ses mécanismes optimisés par des millions d'années de sélection. " +
                    "<br>" +
                    "D'un ensemble de <strong>contraintes</strong> (espace fixe, découverte, ressenti continu...), l'évolution a convergée vers un système spécialisé, permformant et économe. " +
                    "Bien que nous ne nous soyons penché que sur le circuit olfactif, nous avons déjà pu énormément <strong>capitaliser</strong> dessus, et <strong>optimiser</strong> nos structures de données. " +
                    "<br>" +
                    "Cette lecture m'aura personnellement faciné. C'est la raison pour lquelle j'ai lancé le projet \"<a href=\"https://clembarr.dev/projects\">FFBF</a>\" (Fruit Fly Bloom Filter), " +
                    "l'implémentation complète de la proposition de Dasgupta et al. " +
                    "[[image 1]]",
            },
        },
    ],
    relatedProjects: ["Novelty Detection"],
};
