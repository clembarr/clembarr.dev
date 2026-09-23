/**
 * @fileoverview Neural novelty detection blog post definition
 * Fundamental research on the fruit fly olfactory circuit and what it changes
 * for Bloom-filter-like data structures, from personal reading notes.
 */

import { BlogPost, BlogCategory } from '../dataTypes';
import { UNIVERSAL_LANG } from '../../utils/translationUtils';
import { ffbfArchitecture, ffbfNoveltyMapOverTime, ffbfDrift, ffbfBench } from '../projects_images';

export const neuralNoveltyDetection: BlogPost = {
    slug: "neural-novelty-detection",
    title: {
        [UNIVERSAL_LANG]: "An Innovative Data Structure for Novelty Detection",
        fr: "Une structure de données innovante pour la détection de nouveauté",
    },
    description: {
        [UNIVERSAL_LANG]:
            "The olfactory circuit of Drosophila melanogaster is one of the most completely mapped sensory " +
            "pathways we have, and buried in it sits a complete novelty detector. What tens of millions of " +
            "years of evolution converged on turns out to answer a question our Bloom filters cannot even ask.",
        fr:
            "Le circuit olfactif de Drosophila melanogaster est l'une des voies sensorielles les mieux " +
            "cartographiées dont nous disposons, et on y trouve un détecteur de nouveauté complet. Ce vers " +
            "quoi des dizaines de millions d'années d'évolution ont convergé répond à une question que nos " +
            "filtres de Bloom ne savent même pas poser.",
    },
    tags: {
        [UNIVERSAL_LANG]: ["Research", "Neuroscience", "Biomimicry", "Data structures", "Bloom filter", "Hash", "Drosophila", "Personal"],
        fr: ["Recherche", "Neurosciences", "Biomimétisme", "Structures de données", "Filtre de Bloom", "Hash", "Drosophile", "Personnel"],
    },
    coverImage: ffbfArchitecture,
    img: [
        ffbfArchitecture,
        ffbfNoveltyMapOverTime,
        ffbfDrift,
        ffbfBench,
    ],
    date: new Date(2026, 8, 23),
    category: BlogCategory.RESEARCH,
    readingTime: 12,
    tableOfContents: true,
    paragraphs: [
        {
            title: {
                [UNIVERSAL_LANG]: "Mapping a Fly's Brain",
                fr: "Cartographier un cerveau de mouche",
            },
            content: {
                [UNIVERSAL_LANG]:
                    "<em>Drosophila melanogaster</em>, the common fruit fly, carries roughly a hundred thousand neurons. " +
                    "That is little enough to be tractable and enough to produce real behaviour, which is why its brain is " +
                    "among the very few mapped down to individual synapses. Its <strong>olfactory pathway</strong> is the " +
                    "best documented part of it: we know how many receptor types feed it, how they are wired to the next " +
                    "stage, and which single output neuron carries which signal." +
                    "<br>Buried in that circuit is something a computer scientist does not expect to find: a complete, " +
                    "working <strong>novelty detector</strong>. Not a classifier, not a memory of past odours, but a " +
                    "mechanism that answers, continuously and in constant space, <em>have I smelled anything like this, " +
                    "and recently?</em>" +
                    "<br>Two papers put that in focus. In 2017, Hattori and colleagues showed that the activity of one " +
                    "specific output neuron of the mushroom body encodes novelty, and that the signal is suppressed as the " +
                    "animal familiarises with a stimulus. In 2018, Dasgupta, Sheehan, Stevens and Navlakha read the same " +
                    "circuit as a <strong>data structure</strong> and published <a href=\"https://www.pnas.org/doi/full/10.1073/pnas.1814448115\" " +
                    "target=\"_blank\" rel=\"noreferrer\"><em>A neural data structure for novelty detection</em></a>." +
                    "<br>What follows is what I took from reading them, in that order: first the wonder, then the mechanism, " +
                    "then what it does to a structure I thought I knew well. The code came much later, and it is the shortest " +
                    "part of the story.",
                fr:
                    "<em>Drosophila melanogaster</em>, la mouche du vinaigre, compte environ cent mille neurones. Assez peu " +
                    "pour être traitable, assez pour produire un comportement réel : c'est la raison pour laquelle son " +
                    "cerveau fait partie des très rares à être cartographiés jusqu'à la synapse. Sa <strong>voie " +
                    "olfactive</strong> en est la portion la mieux documentée : on sait combien de types de récepteurs " +
                    "l'alimentent, comment ils sont câblés à l'étage suivant, et quel neurone de sortie porte quel signal." +
                    "<br>Dans ce circuit se cache quelque chose qu'un informaticien ne s'attend pas à trouver : un " +
                    "<strong>détecteur de nouveauté</strong> complet et fonctionnel. Pas un classifieur, pas une mémoire des " +
                    "odeurs passées, mais un mécanisme qui répond, en continu et à espace constant, à la question " +
                    "<em>ai-je senti quelque chose de semblable, et récemment ?</em>" +
                    "<br>Deux articles ont mis cela en lumière. En 2017, Hattori et ses collègues montrent que l'activité " +
                    "d'un neurone de sortie précis du corps pédonculé encode la nouveauté, et que ce signal est réprimé à " +
                    "mesure que l'animal se familiarise avec un stimulus. En 2018, Dasgupta, Sheehan, Stevens et Navlakha " +
                    "relisent le même circuit comme une <strong>structure de données</strong> et publient " +
                    "<a href=\"https://www.pnas.org/doi/full/10.1073/pnas.1814448115\" target=\"_blank\" rel=\"noreferrer\">" +
                    "<em>A neural data structure for novelty detection</em></a>." +
                    "<br>Ce qui suit est ce que j'en ai retiré, dans cet ordre : l'émerveillement d'abord, le mécanisme " +
                    "ensuite, puis ce que cela fait à une structure que je croyais bien connaître. Le code est venu " +
                    "beaucoup plus tard, et c'est la partie la plus courte de l'histoire.",
            },
        },
        {
            title: {
                [UNIVERSAL_LANG]: "What Evolution Settled On",
                fr: "Ce que l'évolution a trouvé",
            },
            content: {
                [UNIVERSAL_LANG]:
                    "Before any mechanism, it is worth sitting with what this circuit actually achieves, because the " +
                    "constraints it works under are ones no engineer would accept." +
                    "<br>A fly has <strong>no room for a database</strong>. It cannot keep a list of the odours it has met, " +
                    "it gets no labelled training set, it has no second pass over the data, and a rotten fruit will not wait " +
                    "for a batch job. Whatever it does must run in milliseconds, once, on a stream that never ends, in a " +
                    "space fixed at birth. Under those constraints, evolution converged on something remarkable." +
                    "<br><strong>It answers a harder question than membership.</strong> Not <em>is this odour in my set</em>, " +
                    "which on a stream is rarely the useful question, but <em>how unfamiliar is this</em>, on a scale, " +
                    "relative to the recent past." +
                    "<br><strong>It is brutally economical.</strong> For any given odour, around 95% of the cells in the " +
                    "recognition stage stay completely silent. The signature of a smell is a few dozen active cells out of " +
                    "two thousand. Nothing else about the odour is kept." +
                    "<br><strong>Familiarity is not a list, it is a state.</strong> The whole olfactory experience of the " +
                    "animal lives in the strength of a few hundred synapses. There is no key, no stored item, no comparison " +
                    "against anything. Reading the score is reading the wear on a handful of connections." +
                    "<br><strong>Generalisation comes for free.</strong> Because the wiring is random but fixed, two odours " +
                    "that are chemically close light up overlapping cells. Meeting one therefore makes the other <em>partly " +
                    "known</em>, without either ever having been compared to the other. The circuit does not compute " +
                    "similarity, it inherits it from its own geometry." +
                    "<br><strong>Forgetting is the same mechanism as learning.</strong> Not a garbage collector, not a " +
                    "maintenance pass: the connections that learning pushes down drift back up on their own. Novelty " +
                    "returning over time is not a feature added on top, it is what the mechanism does when left alone." +
                    "<br>A structure that generalises, forgets, works in one pass without labels and never grows: written as " +
                    "a specification, that reads like a wish list. It has been running in an insect for tens of millions of " +
                    "years.",
                fr:
                    "Avant tout mécanisme, il vaut la peine de s'arrêter sur ce que ce circuit réussit, parce qu'il travaille " +
                    "sous des contraintes qu'aucun ingénieur n'accepterait." +
                    "<br>Une mouche n'a <strong>pas la place d'une base de données</strong>. Elle ne peut pas conserver la " +
                    "liste des odeurs rencontrées, elle ne reçoit aucun jeu d'entraînement annoté, elle n'a pas de second " +
                    "passage sur les données, et un fruit pourri n'attendra pas un traitement par lots. Ce qu'elle fait doit " +
                    "tenir en quelques millisecondes, une seule fois, sur un flux qui ne s'arrête jamais, dans un espace fixé " +
                    "à la naissance. Sous ces contraintes, l'évolution a convergé vers quelque chose de remarquable." +
                    "<br><strong>Le circuit répond à une question plus difficile que l'appartenance.</strong> Non pas " +
                    "<em>cette odeur est-elle dans mon ensemble</em>, qui sur un flux est rarement la question utile, mais " +
                    "<em>à quel point m'est-elle étrangère</em>, sur une échelle, au regard du passé récent." +
                    "<br><strong>Il est d'une économie brutale.</strong> Pour une odeur donnée, environ 95% des cellules de " +
                    "l'étage de reconnaissance restent totalement muettes. La signature d'une odeur, c'est quelques dizaines " +
                    "de cellules actives sur deux mille. Rien d'autre n'est conservé." +
                    "<br><strong>La familiarité n'est pas une liste, c'est un état.</strong> Toute l'expérience olfactive de " +
                    "l'animal tient dans la force de quelques centaines de synapses. Pas de clé, pas d'élément stocké, " +
                    "aucune comparaison avec quoi que ce soit. Lire le score, c'est lire l'usure de quelques connexions." +
                    "<br><strong>La généralisation est gratuite.</strong> Comme le câblage est aléatoire mais figé, deux " +
                    "odeurs chimiquement proches allument des cellules qui se recouvrent. Rencontrer l'une rend donc l'autre " +
                    "<em>partiellement connue</em>, sans qu'elles aient jamais été comparées. Le circuit ne calcule pas une " +
                    "similarité, il l'hérite de sa propre géométrie." +
                    "<br><strong>Oublier, c'est le même mécanisme qu'apprendre.</strong> Pas un ramasse-miettes, pas une " +
                    "passe de maintenance : les connexions que l'apprentissage fait descendre remontent d'elles-mêmes. Le " +
                    "retour de la nouveauté avec le temps n'est pas une fonctionnalité ajoutée par-dessus, c'est ce que fait " +
                    "le mécanisme quand on le laisse tranquille." +
                    "<br>Une structure qui généralise, qui oublie, qui travaille en une passe sans annotation et qui ne " +
                    "grossit jamais : rédigé comme un cahier des charges, cela ressemble à une liste de souhaits. Cela " +
                    "tourne dans un insecte depuis des dizaines de millions d'années.",
            },
        },
        {
            title: {
                [UNIVERSAL_LANG]: "The Circuit, Stage by Stage",
                fr: "Le circuit, étage par étage",
            },
            content: {
                [UNIVERSAL_LANG]:
                    "The pathway has three stages before the read-out, and each one does exactly one thing." +
                    "<br><strong>1. Capture.</strong> The fly has 50 types of <strong>olfactory receptor neurons</strong> " +
                    "(ORNs). An odour is therefore encoded, at the entrance, as a <strong>50-dimensional vector</strong>: one " +
                    "firing rate per receptor type." +
                    "<br><strong>2. Normalisation.</strong> The ORNs fire information to 50 types of <strong>projection " +
                    "neurons</strong> (PNs), whose responses are normalised so that the <em>mean firing rate of the PNs is " +
                    "nearly the same for all odours and all odour concentrations</em>. This is a gain control stage, and it " +
                    "matters more than it looks: it factors <strong>concentration</strong> out of the signal. What reaches the " +
                    "next stage is the identity of a smell, not how strong it was." +
                    "<br><strong>3. Sparse random projection.</strong> The PNs project onto about <strong>2 000 Kenyon " +
                    "cells</strong> (KCs), housed in a structure called the <strong>mushroom body</strong>. The matrix between " +
                    "PNs and KCs is parsed randomly: <em>each KC randomly selects about 6 PNs and sums up their firing " +
                    "rates</em>. Nothing is learned here. The wiring is arbitrary, and it is fixed." +
                    "<br><strong>4. Winner-takes-all.</strong> Each KC provides feedforward excitation to a " +
                    "<strong>single inhibitory neuron</strong>, which in turn sends feedback inhibition to <em>all</em> the " +
                    "KCs. The result of that one loop is a competition: only the <strong>top 5 to 10%</strong> of the " +
                    "highest-rate KCs fire in response to the odour, and the remaining 95% are silenced." +
                    "<br>That surviving 5% <strong>is the odour's tag</strong>, and here is the sentence that reframed " +
                    "everything for me: in this circuit, the neurobiological <code>tag</code> is the computer science " +
                    "<code>hash</code>. A sparse point in a 2 000-dimensional space. Two very different odours will have " +
                    "little to no overlap in their active KCs, and two similar ones will share most of theirs. The " +
                    "<strong>hash function is the wiring itself</strong>, and because it is random and fixed, it preserves " +
                    "distance instead of destroying it. That is the opposite of what we ask of a cryptographic hash." +
                    "<br><strong>5. Read-out.</strong> The output of the mushroom body is carried by 34 <strong>mushroom body " +
                    "output neurons</strong> (MBONs), which perform many different functions on the same tag. One of them, " +
                    "<strong>MBON-α'3</strong>, can be triggered by about 350 specific KCs, and it is the one Hattori and " +
                    "colleagues showed encodes a <strong>novelty signal</strong>, suppressed as the animal familiarises. For a " +
                    "given odour, roughly <strong>20 KCs</strong> among those 350 are active." +
                    "<br><strong>6. The learning rule.</strong> This is the whole of it. A neuron called " +
                    "<strong>PPL1-α'3</strong> releases dopamine locally, which modifies the strength of the 350 " +
                    "KC → MBON-α'3 synapses, in two opposite directions at once:" +
                    "<ul>" +
                    "<li>the synapses made by the 20 <strong>activated</strong> KCs <strong>weaken</strong>,</li>" +
                    "<li>those made by the <strong>non-active</strong> KCs <strong>strengthen</strong>.</li>" +
                    "</ul>" +
                    "The activity of the MBON is then simply the <strong>weighted sum of its inputs</strong>: the activity of " +
                    "each KC multiplied by its synaptic strength. Nothing more." +
                    "<br>Follow that through and familiarisation falls out of it. Repeated exposure to an odour depresses its " +
                    "active KCs, so the MBON-α'3 response to that odour drops: it has become familiar. But the second half of " +
                    "the rule is the elegant part, and it is easy to skim past. Because the <em>non-active</em> synapses " +
                    "strengthen at the same time, growing familiar with one thing <strong>raises the novelty response of " +
                    "everything with a non-overlapping hash</strong>. The circuit does not merely learn what it has seen, it " +
                    "sharpens its contrast against everything it has not. [[image 0]]",
                fr:
                    "La voie compte trois étages avant la lecture, et chacun fait exactement une chose." +
                    "<br><strong>1. Capture.</strong> La mouche possède 50 types de <strong>neurones récepteurs " +
                    "olfactifs</strong> (ORNs). Une odeur est donc encodée, à l'entrée, comme un <strong>vecteur de dimension " +
                    "50</strong> : un taux de décharge par type de récepteur." +
                    "<br><strong>2. Normalisation.</strong> Les ORNs transmettent l'information à 50 types de " +
                    "<strong>neurones de projection</strong> (PNs), dont les réponses sont normalisées de sorte que le " +
                    "<em>taux de décharge moyen des PNs soit à peu près le même pour toutes les odeurs et toutes les " +
                    "concentrations</em>. C'est un étage de contrôle de gain, et il compte plus qu'il n'y paraît : il " +
                    "évacue la <strong>concentration</strong> du signal. Ce qui atteint l'étage suivant, c'est l'identité " +
                    "d'une odeur, pas son intensité." +
                    "<br><strong>3. Projection aléatoire creuse.</strong> Les PNs projettent sur environ <strong>2 000 " +
                    "cellules de Kenyon</strong> (KCs), logées dans une structure appelée <strong>corps pédonculé</strong>. " +
                    "La matrice entre PNs et KCs est parcourue aléatoirement : <em>chaque KC sélectionne au hasard environ " +
                    "6 PNs et somme leurs taux de décharge</em>. Rien n'est appris ici. Le câblage est arbitraire, et il est " +
                    "figé." +
                    "<br><strong>4. Winner-takes-all.</strong> Chaque KC envoie une excitation feedforward à un " +
                    "<strong>unique neurone inhibiteur</strong>, qui renvoie en retour de l'inhibition à <em>toutes</em> les " +
                    "KCs. Cette seule boucle produit une compétition : seuls les <strong>5 à 10% les plus actifs</strong> " +
                    "déchargent en réponse à l'odeur, les 95% restants sont éteints." +
                    "<br>Ces 5% survivants <strong>sont le tag de l'odeur</strong>, et voici la phrase qui a tout recadré " +
                    "pour moi : dans ce circuit, le <code>tag</code> neurobiologique est le <code>hash</code> informatique. " +
                    "Un point creux dans un espace à 2 000 dimensions. Deux odeurs très différentes n'auront presque aucun " +
                    "recouvrement de KCs actives, deux odeurs proches en partageront l'essentiel. La <strong>fonction de " +
                    "hachage, c'est le câblage lui-même</strong>, et comme il est aléatoire et figé, il " +
                    "<em>préserve</em> la distance au lieu de la détruire. C'est l'inverse de ce que l'on demande à un hash " +
                    "cryptographique." +
                    "<br><strong>5. Lecture.</strong> La sortie du corps pédonculé est portée par 34 <strong>neurones de " +
                    "sortie</strong> (MBONs), qui remplissent des fonctions très diverses à partir du même tag. L'un d'eux, " +
                    "<strong>MBON-α'3</strong>, peut être déclenché par environ 350 KCs spécifiques, et c'est celui dont " +
                    "Hattori et ses collègues ont montré qu'il encode un <strong>signal de nouveauté</strong>, réprimé à " +
                    "mesure que l'animal se familiarise. Pour une odeur donnée, environ <strong>20 KCs</strong> parmi ces " +
                    "350 sont actives." +
                    "<br><strong>6. La règle d'apprentissage.</strong> Elle tient tout entière ici. Un neurone nommé " +
                    "<strong>PPL1-α'3</strong> libère localement de la dopamine, qui modifie la force des 350 synapses " +
                    "KC → MBON-α'3, dans deux directions opposées à la fois :" +
                    "<ul>" +
                    "<li>les synapses des 20 KCs <strong>activées</strong> s'<strong>affaiblissent</strong>,</li>" +
                    "<li>celles des KCs <strong>non actives</strong> se <strong>renforcent</strong>.</li>" +
                    "</ul>" +
                    "L'activité du MBON est alors simplement la <strong>somme pondérée de ses entrées</strong> : l'activité " +
                    "de chaque KC multipliée par sa force synaptique. Rien de plus." +
                    "<br>Déroulez cela et la familiarisation en découle. Une exposition répétée à une odeur déprime ses KCs " +
                    "actives, donc la réponse de MBON-α'3 à cette odeur baisse : elle est devenue familière. Mais la seconde " +
                    "moitié de la règle est la partie élégante, et on la survole facilement. Parce que les synapses " +
                    "<em>non actives</em> se renforcent dans le même temps, se familiariser avec une chose " +
                    "<strong>augmente la réponse de nouveauté de tout ce dont le hash ne la recoupe pas</strong>. Le circuit " +
                    "n'apprend pas seulement ce qu'il a vu, il aiguise son contraste avec tout ce qu'il n'a pas vu. " +
                    "[[image 0]]",
            },
        },
        {
            title: {
                [UNIVERSAL_LANG]: "What It Changes for a Bloom Filter",
                fr: "Ce que ça change pour un filtre de Bloom",
            },
            content: {
                [UNIVERSAL_LANG]:
                    "Now put that circuit next to the structure it most resembles." +
                    "<br>A <strong>Bloom filter</strong>, described by Burton Howard Bloom in 1970, is a probabilistic " +
                    "implementation of the abstract type <em>Set</em>. It holds a bit array <em>T</em> of size <em>m</em> and " +
                    "a collection of <em>k</em> hash functions. To add an element you set the bits at the positions its " +
                    "hashes point to. To test one you recompute the same hashes and check that every bit is at 1. Its " +
                    "correctness is stated as a membership test with an asymmetry: <em>possibly in the set</em>, or " +
                    "<em>certainly not in the set</em>. There is <strong>never a false negative</strong>, but there can be " +
                    "false positives, because several elements may share bits." +
                    "<br>Its great virtue is that its <strong>memory footprint is fixed and independent of the number of " +
                    "elements</strong>. Its limits are just as structural: the false positive rate climbs as the filter fills, " +
                    "and natively, <strong>elements cannot be removed</strong>." +
                    "<br>The mapping the paper proposes is almost a substitution. The <strong>weights</strong> of the " +
                    "<em>m</em> KC → MBON-α'3 synapses are the <em>m</em> <strong>bits</strong> of the filter. Every odour " +
                    "activates <em>n</em> KCs among the <em>m</em>, and the corresponding bits are pushed toward 0. MBON-α'3 " +
                    "plays the part of the <strong>hash function</strong> read-out, computing the weighted sum of its inputs " +
                    "as the novelty response. A normalisation step then restricts the value to [0, 1]." +
                    "<br>And that substitution buys three things a bit array cannot express." +
                    "<br><strong>Continuously valued novelty.</strong> Novelty is no longer <em>is new</em> or <em>is " +
                    "known</em>. The value places a difference on a <strong>spectrum</strong>, with shades in between. A " +
                    "boolean cannot be graded." +
                    "<br><strong>Distance sensitivity.</strong> The value depends on the variety already present in the " +
                    "structure: smaller for elements similar to what is stored, larger as they differ. The paper verifies it " +
                    "directly, using the <strong>euclidean distance</strong> between odour vectors: the more two vectors " +
                    "share activated KCs, the lower the novelty response when they are fed one after the other. The response " +
                    "for an element can, in effect, be <strong>predicted from the previous one</strong>. In a classical " +
                    "filter, a near-duplicate and a total stranger are both simply absent." +
                    "<br><strong>Time sensitivity.</strong> If the same or a similar odour was last experienced a long time " +
                    "ago, its novelty should be larger than if it had been met a moment ago. The mechanism is the one from the " +
                    "previous section: the corresponding synapses have already climbed back high, so triggering them again " +
                    "cannot depress them as sharply." +
                    "<br>One detail in the paper stayed with me, because it separates the mechanism from its presentation: " +
                    "the <strong>normalisation does not affect performance</strong>, and <em>is not necessarily required " +
                    "within the biological circuitry</em>. Bounding the score in [0, 1] is a convenience for whoever reads " +
                    "it, not a part of how it works." +
                    "<br>The last consequence is the one I find hardest to argue with. If similar items met recently must " +
                    "score lower than similar items met long ago, then old data has to <strong>slowly degrade or be " +
                    "evacuated</strong> from the filter over time. That is not a nicety: in lifelong learning, where the " +
                    "database is not of fixed size but grows continuously, a filter that never forgets <strong>fills up to " +
                    "the point where every bit is reset to zero</strong>, and from then on finds everything familiar. " +
                    "Removal, which a native Bloom filter cannot do at all, is here not an added operation but a property of " +
                    "the circuit: the weights drift back on their own." +
                    "<br>Two figures from my own implementation, built later, put numbers on the last two points. The first " +
                    "places fifty log lines by meaning and shades them by novelty at four moments of a stream: what the " +
                    "filter covers is a <em>region</em>, not a list, and that region moves. [[image 1]] The second runs the " +
                    "same stream twice. With forgetting on, routine traffic and anomalies trade places and cross. With " +
                    "forgetting off, routine novelty moves from 0.07 to 0.08 over the whole run, about 36 times slower: the " +
                    "saturation failure, measured. [[image 2]]",
                fr:
                    "Plaçons maintenant ce circuit à côté de la structure dont il se rapproche le plus." +
                    "<br>Un <strong>filtre de Bloom</strong>, décrit par Burton Howard Bloom en 1970, est une implémentation " +
                    "probabiliste du type abstrait <em>Ensemble</em>. Il tient dans un tableau de bits <em>T</em> de taille " +
                    "<em>m</em> et une collection de <em>k</em> fonctions de hachage. Pour ajouter un élément, on met à 1 les " +
                    "cases désignées par ses hash. Pour le tester, on recalcule les mêmes hash et on vérifie que tous les " +
                    "bits sont à 1. Sa correction s'énonce comme un test d'appartenance asymétrique : <em>possiblement dans " +
                    "l'ensemble</em>, ou <em>assurément pas dans l'ensemble</em>. Il n'y a <strong>jamais de faux " +
                    "négatif</strong>, mais il peut y avoir des faux positifs, car plusieurs éléments peuvent avoir des bits " +
                    "en commun." +
                    "<br>Sa grande vertu est que sa <strong>taille en mémoire est fixe et indépendante du nombre " +
                    "d'éléments</strong>. Ses limites sont tout aussi structurelles : le taux de faux positifs grimpe à " +
                    "mesure que le filtre se remplit, et nativement, les <strong>éléments ne peuvent pas être " +
                    "retirés</strong>." +
                    "<br>La correspondance proposée par le papier est presque une substitution. Les <strong>poids</strong> " +
                    "des <em>m</em> synapses KC → MBON-α'3 sont les <em>m</em> <strong>bits</strong> du filtre. Chaque odeur " +
                    "active <em>n</em> KCs parmi les <em>m</em>, et les bits correspondants sont poussés vers 0. MBON-α'3 " +
                    "tient le rôle de la lecture de la <strong>fonction de hachage</strong>, en calculant la somme pondérée " +
                    "de ses entrées comme réponse de nouveauté. Une étape de normalisation restreint ensuite la valeur à " +
                    "[0, 1]." +
                    "<br>Et cette substitution achète trois choses qu'un tableau de bits ne sait pas exprimer." +
                    "<br><strong>Une nouveauté à valeur continue.</strong> La nouveauté n'est plus « est nouveau » ou « est " +
                    "connu ». La valeur place une différence sur un <strong>spectre</strong>, avec des nuances entre les " +
                    "deux. Un booléen ne se gradue pas." +
                    "<br><strong>La sensibilité à la distance.</strong> La valeur dépend de la variété déjà présente dans la " +
                    "structure : plus faible pour des éléments semblables à ce qui est stocké, plus élevée à mesure qu'ils " +
                    "s'en écartent. Le papier le vérifie directement, à la <strong>distance euclidienne</strong> entre " +
                    "vecteurs d'odeurs : plus deux vecteurs partagent de KCs activées, plus la réponse de nouveauté est " +
                    "basse lorsqu'on les présente l'un après l'autre. La réponse pour un élément peut, de fait, être " +
                    "<strong>prédite depuis la précédente</strong>. Dans un filtre classique, un quasi-doublon et un " +
                    "inconnu total sont tous les deux simplement absents." +
                    "<br><strong>La sensibilité au temps.</strong> Si la même odeur, ou une odeur proche, a été rencontrée " +
                    "pour la dernière fois il y a longtemps, sa nouveauté doit être plus grande que si elle venait d'être " +
                    "sentie. Le mécanisme est celui de la section précédente : les synapses concernées sont déjà remontées " +
                    "haut, donc les déclencher à nouveau ne peut plus les déprimer aussi franchement." +
                    "<br>Un détail du papier m'est resté, parce qu'il sépare le mécanisme de sa présentation : la " +
                    "<strong>normalisation n'affecte pas la performance</strong>, et <em>n'est pas nécessairement requise " +
                    "dans le circuit biologique</em>. Borner le score dans [0, 1] est un confort pour qui le lit, pas une " +
                    "pièce du fonctionnement." +
                    "<br>La dernière conséquence est celle qu'il m'est le plus difficile de contester. Si des éléments " +
                    "proches rencontrés récemment doivent scorer plus bas que des éléments proches rencontrés il y a " +
                    "longtemps, alors les vieilles données doivent <strong>se dégrader lentement ou être évacuées</strong> " +
                    "du filtre au fil du temps. Ce n'est pas un raffinement : en apprentissage continu, où la base n'a pas " +
                    "une taille fixe mais grossit sans fin, un filtre qui n'oublie jamais <strong>se remplit jusqu'à ce que " +
                    "tous ses bits soient remis à zéro</strong>, et trouve dès lors tout familier. Le retrait, qu'un filtre " +
                    "de Bloom natif ne sait pas faire du tout, n'est ici pas une opération ajoutée mais une propriété du " +
                    "circuit : les poids remontent d'eux-mêmes." +
                    "<br>Deux figures issues de ma propre implémentation, construite plus tard, mettent des chiffres sur ces " +
                    "deux derniers points. La première place cinquante lignes de log selon leur sens et les teinte par " +
                    "nouveauté à quatre moments d'un flux : ce que le filtre couvre est une <em>région</em>, pas une liste, " +
                    "et cette région se déplace. [[image 1]] La seconde rejoue le même flux deux fois. Avec l'oubli activé, " +
                    "trafic de routine et anomalies échangent leurs places et se croisent. Avec l'oubli coupé, la nouveauté " +
                    "de la routine passe de 0,07 à 0,08 sur tout le parcours, environ 36 fois plus lentement : la " +
                    "saturation, mesurée. [[image 2]]",
            },
        },
        {
            title: {
                [UNIVERSAL_LANG]: "FFBF Is Born",
                fr: "La naissance de FFBF",
            },
            content: {
                [UNIVERSAL_LANG]:
                    "Reading a paper is not the same as understanding a mechanism, and I wanted to feel this one move. So the " +
                    "notes turned into pseudo-code before they turned into anything else." +
                    "<br>The first sketches were two blocks on a canvas: a <code>hash</code> procedure that put the Kenyon " +
                    "cells into a running competition, and an <code>inhibition neuron</code> that applied a deficit " +
                    "coefficient to every cell other than the one that had just fired to it. I was modelling the circuit " +
                    "<em>as a circuit</em>, with its feedback loop, because that is how the biology describes it." +
                    "<br>Implementing it dissolved that loop. An iterative competition where the winner suppresses everyone " +
                    "else converges on the same fixed point as a <strong>direct top-k selection</strong>, so the inhibitory " +
                    "neuron, which had a whole pseudo-code block of its own, became one line of sorting. It is the clearest " +
                    "lesson I took from the exercise: a faithful transcription of a biological circuit is not always the " +
                    "right implementation of it, and telling the mechanism from its biological packaging is most of the work." +
                    "<br>What I did keep, deliberately, is the one thing that looks like an implementation detail and is not: " +
                    "each cell's random draw of input dimensions is <strong>frozen once, at creation</strong>. Redraw it on " +
                    "every call and you still have a hash, but the distance sensitivity is gone, and with it the entire " +
                    "reason to prefer this over a bit array." +
                    "<br>The result is <strong>FFBF</strong>, a Fruit Fly Bloom Filter: a Rust core, Python bindings, a " +
                    "handful of plotting helpers, and an interactive bench where you can send a stimulus and watch the " +
                    "winners fire and the memory take the dent. [[image 3]]" +
                    "<br>The structure itself, what it costs and what it is good for, is a separate story: it lives in the " +
                    "<a href=\"/projects\">Novelty Detection project</a> and in the " +
                    "<a href=\"https://github.com/clembarr/ffbf-novelty-detector\" target=\"_blank\" rel=\"noreferrer\">" +
                    "repository</a>.",
                fr:
                    "Lire un papier n'est pas comprendre un mécanisme, et je voulais sentir celui-ci bouger. Les notes sont " +
                    "donc devenues du pseudo-code avant de devenir autre chose." +
                    "<br>Les premières esquisses tenaient en deux blocs sur un canvas : une procédure <code>hash</code> qui " +
                    "mettait les cellules de Kenyon en compétition dans une boucle, et un <code>inhibition neuron</code> qui " +
                    "appliquait un coefficient de déficit à toutes les cellules sauf celle qui venait de lui décharger. Je " +
                    "modélisais le circuit <em>comme un circuit</em>, avec sa boucle de rétroaction, parce que c'est ainsi " +
                    "que la biologie le décrit." +
                    "<br>L'implémentation a dissous cette boucle. Une compétition itérative où le gagnant réprime tous les " +
                    "autres converge vers le même point fixe qu'une <strong>sélection top-k directe</strong> : le neurone " +
                    "inhibiteur, qui avait son propre bloc de pseudo-code, est devenu une ligne de tri. C'est la leçon la " +
                    "plus nette que j'ai tirée de l'exercice : une transcription fidèle d'un circuit biologique n'en est pas " +
                    "toujours la bonne implémentation, et distinguer le mécanisme de son emballage biologique constitue " +
                    "l'essentiel du travail." +
                    "<br>Ce que j'ai gardé, délibérément, c'est la seule chose qui ressemble à un détail d'implémentation " +
                    "sans en être un : le tirage aléatoire des dimensions d'entrée de chaque cellule est <strong>figé une " +
                    "fois, à la création</strong>. Retirez-le à chaque appel et vous avez toujours un hash, mais la " +
                    "sensibilité à la distance a disparu, et avec elle toute la raison de préférer ceci à un tableau de bits." +
                    "<br>Le résultat s'appelle <strong>FFBF</strong>, pour Fruit Fly Bloom Filter : un cœur en Rust, des " +
                    "bindings Python, quelques fonctions de tracé, et un banc interactif où l'on envoie un stimulus pour " +
                    "voir les gagnants s'allumer et la mémoire encaisser son creux. [[image 3]]" +
                    "<br>La structure elle-même, ce qu'elle coûte et ce à quoi elle sert, est une autre histoire : elle vit " +
                    "dans le <a href=\"/projects\">projet Détection de Nouveauté</a> et dans le " +
                    "<a href=\"https://github.com/clembarr/ffbf-novelty-detector\" target=\"_blank\" rel=\"noreferrer\">" +
                    "dépôt</a>.",
            },
        },
        {
            title: {
                [UNIVERSAL_LANG]: "Conclusion",
                fr: "Conclusion",
            },
            content: {
                [UNIVERSAL_LANG]:
                    "Biomimicry has a reputation for copying shapes: a wing, a shell, a burr turned into a hook. What " +
                    "happened here is different, and I think more useful. Nothing about a fly was copied. What was read was a " +
                    "<strong>set of constraints</strong> and the answer evolution gave them." +
                    "<br>The interesting part is that the answer was available all along. Random projection, aggressive " +
                    "sparsification, learning as wear on a fixed set of weights: none of that needed to be discovered. It " +
                    "needed to be <em>recognised as a data structure</em>. The circuit had been described for years before " +
                    "someone wrote it down with an <em>m</em>, an <em>n</em> and a complexity. And once written that way, it " +
                    "answers a question our version of the structure had quietly decided not to ask, because the version we " +
                    "had could not answer it." +
                    "<br>That is the part worth keeping, beyond this one circuit. A biological system under hard constraints " +
                    "is a <strong>solved instance of a problem we may have posed badly</strong>. It cannot afford our " +
                    "assumptions: no unbounded memory, no labels, no second pass, no offline maintenance window. Reading one " +
                    "carefully is less about inspiration than about noticing which of our assumptions were never necessary." +
                    "<br>Which leaves me with the figure I keep returning to. The mushroom body has <strong>34 output " +
                    "neurons</strong>. We read one of them here, and found a novelty detector with fixed memory, " +
                    "generalisation and forgetting. The other 33 compute other functions on the very same tag, from the very " +
                    "same sparse code. What structures are sitting in those, waiting to be written down with an <em>m</em> " +
                    "and an <em>n</em>?",
                fr:
                    "Le biomimétisme a une réputation de copie de formes : une aile, une coquille, une bardane devenue " +
                    "crochet. Ce qui s'est passé ici est différent, et je le crois plus utile. Rien de la mouche n'a été " +
                    "copié. Ce qui a été lu, c'est un <strong>jeu de contraintes</strong> et la réponse que l'évolution leur " +
                    "a donnée." +
                    "<br>Le plus intéressant, c'est que cette réponse était disponible depuis toujours. Projection aléatoire, " +
                    "sparsification agressive, apprentissage comme usure d'un ensemble fixe de poids : rien de tout cela " +
                    "n'avait à être découvert. Il fallait le <em>reconnaître comme une structure de données</em>. Le circuit " +
                    "était décrit depuis des années avant que quelqu'un l'écrive avec un <em>m</em>, un <em>n</em> et une " +
                    "complexité. Et écrit ainsi, il répond à une question que notre version de la structure avait " +
                    "discrètement renoncé à poser, parce que celle que nous avions ne savait pas y répondre." +
                    "<br>C'est ce qu'il faut garder, au-delà de ce seul circuit. Un système biologique sous forte contrainte " +
                    "est une <strong>instance résolue d'un problème que nous avons peut-être mal posé</strong>. Il ne peut " +
                    "pas s'offrir nos hypothèses : pas de mémoire illimitée, pas d'annotation, pas de second passage, pas de " +
                    "fenêtre de maintenance hors ligne. En lire un attentivement relève moins de l'inspiration que du " +
                    "repérage de celles de nos hypothèses qui n'étaient jamais nécessaires." +
                    "<br>Ce qui me laisse avec le chiffre sur lequel je reviens sans cesse. Le corps pédonculé compte " +
                    "<strong>34 neurones de sortie</strong>. Nous en avons lu un ici, et nous y avons trouvé un détecteur de " +
                    "nouveauté à mémoire fixe, avec généralisation et oubli. Les 33 autres calculent d'autres fonctions sur " +
                    "le même tag, depuis le même code creux. Quelles structures dorment là-dedans, en attendant qu'on les " +
                    "écrive avec un <em>m</em> et un <em>n</em> ?",
            },
        },
    ],
    relatedProjects: ["Novelty Detection"],
};
