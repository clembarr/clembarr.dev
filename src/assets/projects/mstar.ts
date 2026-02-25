/**
 * @fileoverview MStar project definition
 * Monte Carlo Tree Search pathfinding algorithm
 */

import { Retex } from '../dataTypes';
import { UNIVERSAL_LANG } from '../i18n';
import { getSkill } from '../skillsIndex';
import { projectsImages } from '../index';

export const mstar: Retex = {
  title: {
    [UNIVERSAL_LANG]: "MStar"
  },
  description: {
    fr:
    "MStar (M*) est un algorithme de pathfinding développé en Java, sur le modèle du Monte Carlo Tree Search, appliqué à une \"IA\" joueuse.",
    en:
    "MStar (M*) is a pathfinding algorithm developed in Java, based on the Monte Carlo Tree Search, applied to an \"AI\" playing bot.",
  },
  tags: {
    fr: ["PC", "Machine learning", "POO", "IA", "Académique", "Universitaire", "Programmation concurrente", "Algorithmie", "Programmation fonctionnelle"],
    en: ["CP", "Machine learning", "OOP", "Algorithmic", "AI", "Academic", "University", "Parrallel programming", 'Functionnal programming'],
    [UNIVERSAL_LANG]: ["Algo", "Test", "Tests", "Monte Carlo", "Pathfinding"],
  },
  date: new Date(2024, 10),
  specs: {
    en:
    "In pairs, <strong>research and development of a Java algorithm</strong> determining the best move to play for a board game.\
    The goal was to win the <strong>bot tournament</strong>. <strong>Our pathfinder</strong> is inspired by A* and <strong>Monte Carlo Tree Search</strong>, exploring possible outcomes from a given move. A phase of <strong>backpropagation</strong> allows to give more or less\
    <strong>weight</strong> to each possible choice. The main challenge was to find <strong>a balance</strong> between exploration and exploitation\
    of the game tree. Given the size of the board and the limited execution time, we had to <strong>prune strategically</strong>. \
    A maximum of options were still explored, thanks to optimization strategies such as parallelization of the game tree analysis.",
    fr:
    "En binôme, <strong>recherche et élaboration d'un algorithme en Java</strong> determinant le meilleur coup à jouer pour un jeu de plateau.\
    Le but était de remporter <strong>le tournois</strong> des bots. <strong>Notre pathfinder</strong> s'inspire de A* et du <strong>Monte Carlo\
    Tree Search</strong>, explorant les possibles issues à partir d'un coup donné. Une phase de <strong>propagation inverse</strong> permet de donner plus ou moins\
    de <strong>poids</strong> à chaque choix possibles. La principale difficulté était de trouver <strong>un équilibre</strong> entre l'exploration et l'exploitation\
    de l'arbre de jeu. Sachant la taille du plateau et le temps d'exécution limité, il nous aura fallu <strong>élaguer de manière stratégique</strong>. \
    Un maximum d'options été tout de même explorées, grâce à des stratégies d'optimisation telles que la parallélisation de l'analyse de l'arbre de jeu.",
  },
  notions: {
    en: ["Concurrent programming,", "Machine learning,", "Comparison of existing algorithms,", "Results analysis and adaptation."],
    fr: ["Programmation concurente,", "Machine learning,", "Comparaison d'algorithmes,", "Analyse de résultats et adaptation."],
  },
  tools: [
    getSkill('Java'),
    getSkill('JUnit'),
    getSkill('Git'),
    getSkill('Bash'),
  ],
  img: [
    projectsImages.mstar_tournament_results,
    projectsImages.mstar_mcts_algo,
    projectsImages.mstar_end_board,
  ],
};
