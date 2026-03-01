/**
 * @fileoverview MCTS Pathfinding blog post definition
 * Exploring Monte Carlo Tree Search algorithms for dynamic pathfinding
 */

import { BlogPost, BlogCategory } from '../dataTypes';
import { UNIVERSAL_LANG } from '../i18n';
import { projectsImages } from '../projects_images';

export const mctsPathfinding: BlogPost = {
  slug: "implementing-mcts-pathfinding",
  title: {
    [UNIVERSAL_LANG]: "Implementing MCTS for Intelligent Pathfinding",
    fr: "Implémentation de MCTS pour le Pathfinding Intelligent",
  },
  description: {
    [UNIVERSAL_LANG]: "Exploring Monte Carlo Tree Search algorithms for dynamic pathfinding in games and AI agents. A deep dive into the theory and practical implementation.",
    fr: "Exploration des algorithmes Monte Carlo Tree Search pour le pathfinding dynamique dans les jeux et les agents IA. Une plongée profonde dans la théorie et l'implémentation pratique.",
  },
  tags: {
    [UNIVERSAL_LANG]: ["MCTS", "Pathfinding", "AI", "Algorithms", "Game Development"],
  },
  img: [projectsImages.eew_algo],
  coverImage: projectsImages.eew_algo,
  date: new Date(2025, 0, 15),
  category: BlogCategory.ALGORITHM,
  readingTime: 7,
  paragraphs: [
    {
      context: "Introduction",
      content: {
        [UNIVERSAL_LANG]:
          "Monte Carlo Tree Search (MCTS) is a powerful algorithm that has revolutionized game AI, most notably in AlphaGo's historic victories. But its applications extend far beyond board games - it's an excellent tool for dynamic pathfinding in complex environments.",
        fr:
          "Le Monte Carlo Tree Search (MCTS) est un algorithme puissant qui a révolutionné l'IA dans les jeux, notamment lors des victoires historiques d'AlphaGo. Mais ses applications vont bien au-delà des jeux de plateau - c'est un excellent outil pour le pathfinding dynamique dans des environnements complexes.",
      },
    },
    {
      context: "What is MCTS?",
      content: {
        [UNIVERSAL_LANG]:
          "MCTS is a heuristic search algorithm that makes decisions by building a search tree through random sampling of the decision space. Unlike traditional pathfinding algorithms like A* or Dijkstra, MCTS doesn't require a complete understanding of the environment upfront.\n\n<strong>Key Advantages:</strong>\n<ul><li><strong>Adaptive</strong>: Adjusts strategy based on simulation results</li><li><strong>Anytime</strong>: Can be stopped at any time to return best current solution</li><li><strong>Domain-agnostic</strong>: Doesn't require hand-crafted heuristics</li></ul>",
        fr:
          "MCTS est un algorithme de recherche [[image 0]] heuristique qui prend des décisions en construisant un arbre de recherche par échantillonnage aléatoire de l'espace de décision. Contrairement aux algorithmes de pathfinding traditionnels comme A* ou Dijkstra, MCTS ne nécessite pas une compréhension complète de l'environnement au préalable.\n\n<strong>Avantages clés :</strong>\n<ul><li><strong>Adaptatif</strong> : Ajuste la stratégie en fonction des résultats de simulation</li><li><strong>Anytime</strong> : Peut être arrêté à tout moment pour retourner la meilleure solution courante</li><li><strong>Agnostique au domaine</strong> : Ne nécessite pas d'heuristiques manuelles</li></ul>",
      },
    },
    {
      context: "The Four Phases of MCTS",
      content: {
        [UNIVERSAL_LANG]:
          "<h3>1. Selection</h3>\nStarting from the root node, we traverse the tree by selecting child nodes based on a selection policy. The most common is <strong>UCB1 (Upper Confidence Bound)</strong>:\n\n<pre><code class=\"language-python\">import math\n\ndef ucb1(node, parent, exploration_param=1.41):\n    \"\"\"\n    Calculate UCB1 score for node selection.\n\n    Args:\n        node: Current node being evaluated\n        parent: Parent node\n        exploration_param: Exploration parameter (typically sqrt(2))\n\n    Returns:\n        UCB1 score\n    \"\"\"\n    if node.visits == 0:\n        return float('inf')\n\n    exploitation = node.value / node.visits\n    exploration = exploration_param * math.sqrt(\n        math.log(parent.visits) / node.visits\n    )\n\n    return exploitation + exploration</code></pre>\n\n<h3>2. Expansion</h3>\nWhen we reach a node that hasn't been fully explored, we add one or more child nodes representing possible next states.\n\n<pre><code class=\"language-python\">class MCTSNode:\n    def __init__(self, state, parent=None):\n        self.state = state\n        self.parent = parent\n        self.children = []\n        self.visits = 0\n        self.value = 0.0\n\n    def expand(self, action):\n        \"\"\"Expand tree by adding a new child node.\"\"\"\n        next_state = self.state.apply_action(action)\n        child = MCTSNode(next_state, parent=self)\n        self.children.append(child)\n        return child</code></pre>\n\n<h3>3. Simulation</h3>\nFrom the newly expanded node, we run a random simulation (rollout) to a terminal state or maximum depth. This gives us an estimate of the node's value.\n\n<pre><code class=\"language-python\">def simulate(node, max_depth=100):\n    \"\"\"\n    Simulate random playouts from node.\n\n    Args:\n        node: Starting node\n        max_depth: Maximum simulation depth\n\n    Returns:\n        Simulation reward\n    \"\"\"\n    state = node.state.clone()\n    depth = 0\n\n    while not state.is_terminal() and depth &lt; max_depth:\n        action = state.get_random_action()\n        state = state.apply_action(action)\n        depth += 1\n\n    return state.get_reward()</code></pre>\n\n<h3>4. Backpropagation</h3>\nWe propagate the simulation result back up the tree, updating visit counts and values for all ancestors.\n\n<pre><code class=\"language-python\">def backpropagate(node, reward):\n    \"\"\"\n    Backpropagate reward up the tree.\n\n    Args:\n        node: Leaf node where simulation started\n        reward: Simulation reward\n    \"\"\"\n    current = node\n    while current is not None:\n        current.visits += 1\n        current.value += reward\n        current = current.parent</code></pre>",
        fr:
          "<h3>1. Sélection</h3>\nEn partant du nœud racine, nous parcourons l'arbre en sélectionnant les nœuds enfants selon une politique de sélection. La plus courante est <strong>UCB1 (Upper Confidence Bound)</strong> :\n\n<pre><code class=\"language-python\">import math\n\ndef ucb1(node, parent, exploration_param=1.41):\n    \"\"\"\n    Calcule le score UCB1 pour la sélection de nœud.\n\n    Args:\n        node: Nœud courant évalué\n        parent: Nœud parent\n        exploration_param: Paramètre d'exploration (typiquement sqrt(2))\n\n    Returns:\n        Score UCB1\n    \"\"\"\n    if node.visits == 0:\n        return float('inf')\n\n    exploitation = node.value / node.visits\n    exploration = exploration_param * math.sqrt(\n        math.log(parent.visits) / node.visits\n    )\n\n    return exploitation + exploration</code></pre>\n\n<h3>2. Expansion</h3>\nQuand nous atteignons un nœud qui n'a pas été entièrement exploré, nous ajoutons un ou plusieurs nœuds enfants représentant les états suivants possibles.\n\n<pre><code class=\"language-python\">class MCTSNode:\n    def __init__(self, state, parent=None):\n        self.state = state\n        self.parent = parent\n        self.children = []\n        self.visits = 0\n        self.value = 0.0\n\n    def expand(self, action):\n        \"\"\"Étend l'arbre en ajoutant un nouveau nœud enfant.\"\"\"\n        next_state = self.state.apply_action(action)\n        child = MCTSNode(next_state, parent=self)\n        self.children.append(child)\n        return child</code></pre>\n\n<h3>3. Simulation</h3>\nDepuis le nœud nouvellement étendu, nous exécutons une simulation aléatoire (rollout) jusqu'à un état terminal ou une profondeur maximale. Cela nous donne une estimation de la valeur du nœud.\n\n<pre><code class=\"language-python\">def simulate(node, max_depth=100):\n    \"\"\"\n    Simule des parties aléatoires depuis le nœud.\n\n    Args:\n        node: Nœud de départ\n        max_depth: Profondeur maximale de simulation\n\n    Returns:\n        Récompense de simulation\n    \"\"\"\n    state = node.state.clone()\n    depth = 0\n\n    while not state.is_terminal() and depth &lt; max_depth:\n        action = state.get_random_action()\n        state = state.apply_action(action)\n        depth += 1\n\n    return state.get_reward()</code></pre>\n\n<h3>4. Rétropropagation</h3>\nNous propageons le résultat de la simulation en remontant l'arbre, en mettant à jour les compteurs de visites et les valeurs pour tous les ancêtres.\n\n<pre><code class=\"language-python\">def backpropagate(node, reward):\n    \"\"\"\n    Rétropropage la récompense dans l'arbre.\n\n    Args:\n        node: Nœud feuille où la simulation a commencé\n        reward: Récompense de simulation\n    \"\"\"\n    current = node\n    while current is not None:\n        current.visits += 1\n        current.value += reward\n        current = current.parent</code></pre>",
      },
    },
    {
      context: "Applying MCTS to Pathfinding",
      content: {
        [UNIVERSAL_LANG]:
          "For pathfinding, we define:\n\n<ul><li><strong>State</strong>: Agent position + environment state</li><li><strong>Actions</strong>: Possible movement directions (N, S, E, W, etc.)</li><li><strong>Reward</strong>: Distance to goal + penalties for obstacles/dangers</li></ul>\n\n<pre><code class=\"language-python\">class PathfindingState:\n    def __init__(self, position, goal, grid):\n        self.position = position\n        self.goal = goal\n        self.grid = grid\n\n    def get_reward(self):\n        \"\"\"Calculate reward based on distance to goal.\"\"\"\n        distance = manhattan_distance(self.position, self.goal)\n        if self.position == self.goal:\n            return 100.0\n        return -distance\n\n    def is_terminal(self):\n        \"\"\"Check if goal reached.\"\"\"\n        return self.position == self.goal\n\n    def get_actions(self):\n        \"\"\"Get valid neighboring positions.\"\"\"\n        x, y = self.position\n        candidates = [\n            (x+1, y), (x-1, y),\n            (x, y+1), (x, y-1)\n        ]\n        return [pos for pos in candidates\n                if self.grid.is_walkable(pos)]</code></pre>",
        fr:
          "Pour le pathfinding, nous définissons :\n\n<ul><li><strong>État</strong> : Position de l'agent + état de l'environnement</li><li><strong>Actions</strong> : Directions de mouvement possibles (N, S, E, O, etc.)</li><li><strong>Récompense</strong> : Distance au but + pénalités pour obstacles/dangers</li></ul>\n\n<pre><code class=\"language-python\">class PathfindingState:\n    def __init__(self, position, goal, grid):\n        self.position = position\n        self.goal = goal\n        self.grid = grid\n\n    def get_reward(self):\n        \"\"\"Calcule la récompense basée sur la distance au but.\"\"\"\n        distance = manhattan_distance(self.position, self.goal)\n        if self.position == self.goal:\n            return 100.0\n        return -distance\n\n    def is_terminal(self):\n        \"\"\"Vérifie si le but est atteint.\"\"\"\n        return self.position == self.goal\n\n    def get_actions(self):\n        \"\"\"Obtient les positions voisines valides.\"\"\"\n        x, y = self.position\n        candidates = [\n            (x+1, y), (x-1, y),\n            (x, y+1), (x, y-1)\n        ]\n        return [pos for pos in candidates\n                if self.grid.is_walkable(pos)]</code></pre>",
      },
    },
    {
      context: "Performance Considerations",
      content: {
        [UNIVERSAL_LANG]:
          "<h3>Time Complexity</h3>\nMCTS runs in <strong>O(n)</strong> where n is the number of iterations. Each iteration involves:\n<ul><li>Selection: O(log n) average case</li><li>Expansion: O(1)</li><li>Simulation: O(d) where d is simulation depth</li><li>Backpropagation: O(log n)</li></ul>\n\n<h3>Memory Usage</h3>\nThe tree grows with each iteration, but can be pruned by:\n<ul><li>Removing unlikely branches (low visit counts)</li><li>Limiting tree depth</li><li>Implementing transposition tables</li></ul>\n\n<h3>Optimizations</h3>\n<ol><li><strong>Parallelization</strong>: Run multiple simulations concurrently</li><li><strong>Progressive Widening</strong>: Limit child expansion based on visit count</li><li><strong>RAVE (Rapid Action Value Estimation)</strong>: Share information across similar states</li><li><strong>Domain-specific heuristics</strong>: Guide simulations with informed policies</li></ol>",
        fr:
          "<h3>Complexité temporelle</h3>\nMCTS s'exécute en <strong>O(n)</strong> où n est le nombre d'itérations. Chaque itération implique :\n<ul><li>Sélection : O(log n) en moyenne</li><li>Expansion : O(1)</li><li>Simulation : O(d) où d est la profondeur de simulation</li><li>Rétropropagation : O(log n)</li></ul>\n\n<h3>Utilisation mémoire</h3>\nL'arbre grandit à chaque itération, mais peut être élagué par :\n<ul><li>Suppression des branches improbables (faible nombre de visites)</li><li>Limitation de la profondeur de l'arbre</li><li>Implémentation de tables de transposition</li></ul>\n\n<h3>Optimisations</h3>\n<ol><li><strong>Parallélisation</strong> : Exécuter plusieurs simulations simultanément</li><li><strong>Élargissement progressif</strong> : Limiter l'expansion des enfants selon le nombre de visites</li><li><strong>RAVE (Rapid Action Value Estimation)</strong> : Partager l'information entre états similaires</li><li><strong>Heuristiques spécifiques au domaine</strong> : Guider les simulations avec des politiques informées</li></ol>",
      },
    },
    {
      context: "Real-World Applications",
      content: {
        [UNIVERSAL_LANG]:
          "Beyond games, MCTS excels in:\n\n<ul><li><strong>Robotics</strong>: Planning in uncertain environments</li><li><strong>Autonomous vehicles</strong>: Dynamic route planning</li><li><strong>Resource allocation</strong>: Optimizing complex schedules</li><li><strong>Procedural content generation</strong>: Creating balanced game levels</li></ul>",
        fr:
          "Au-delà des jeux, MCTS excelle dans :\n\n<ul><li><strong>Robotique</strong> : Planification dans des environnements incertains</li><li><strong>Véhicules autonomes</strong> : Planification dynamique d'itinéraires</li><li><strong>Allocation de ressources</strong> : Optimisation de plannings complexes</li><li><strong>Génération procédurale de contenu</strong> : Création de niveaux de jeu équilibrés</li></ul>",
      },
    },
    {
      context: "Conclusion",
      content: {
        [UNIVERSAL_LANG]:
          "MCTS provides a flexible, powerful approach to pathfinding that adapts to complex, dynamic environments. While it may be overkill for simple grid-based pathfinding, it shines in scenarios with:\n\n<ul><li>Partial observability</li><li>Dynamic obstacles</li><li>Complex reward structures</li><li>Multiple objectives</li></ul>\n\nThe algorithm's ability to balance exploration and exploitation makes it a valuable tool in any AI developer's toolkit.",
        fr:
          "MCTS offre une approche flexible et puissante du pathfinding qui s'adapte aux environnements complexes et dynamiques. Bien qu'il puisse être excessif pour un pathfinding simple sur grille, il brille dans les scénarios avec :\n\n<ul><li>Observabilité partielle</li><li>Obstacles dynamiques</li><li>Structures de récompense complexes</li><li>Objectifs multiples</li></ul>\n\nLa capacité de l'algorithme à équilibrer exploration et exploitation en fait un outil précieux dans la boîte à outils de tout développeur IA.",
      },
    },
    {
      context: "Further Reading",
      content: {
        [UNIVERSAL_LANG]:
          "<ul><li>Browne et al. (2012): \"A Survey of Monte Carlo Tree Search Methods\"</li><li>Silver & Veness (2010): \"Monte-Carlo Planning in Large POMDPs\"</li><li>Coulom (2006): \"Efficient Selectivity and Backup Operators in Monte-Carlo Tree Search\"</li></ul>",
        fr:
          "<ul><li>Browne et al. (2012) : \"A Survey of Monte Carlo Tree Search Methods\"</li><li>Silver & Veness (2010) : \"Monte-Carlo Planning in Large POMDPs\"</li><li>Coulom (2006) : \"Efficient Selectivity and Backup Operators in Monte-Carlo Tree Search\"</li></ul>",
      },
    },
  ],
  tableOfContents: {
    [UNIVERSAL_LANG]: [
      { id: "introduction", text: "Introduction", level: 2 },
      { id: "what-is-mcts", text: "What is MCTS?", level: 2 },
      { id: "the-four-phases-of-mcts", text: "The Four Phases of MCTS", level: 2 },
      { id: "applying-mcts-to-pathfinding", text: "Applying MCTS to Pathfinding", level: 2 },
      { id: "performance-considerations", text: "Performance Considerations", level: 2 },
      { id: "real-world-applications", text: "Real-World Applications", level: 2 },
      { id: "conclusion", text: "Conclusion", level: 2 },
      { id: "further-reading", text: "Further Reading", level: 2 },
    ],
    fr: [
      { id: "introduction", text: "Introduction", level: 2 },
      { id: "what-is-mcts", text: "Qu'est-ce que MCTS ?", level: 2 },
      { id: "the-four-phases-of-mcts", text: "Les quatre phases de MCTS", level: 2 },
      { id: "applying-mcts-to-pathfinding", text: "Application au Pathfinding", level: 2 },
      { id: "performance-considerations", text: "Considérations de performance", level: 2 },
      { id: "real-world-applications", text: "Applications concrètes", level: 2 },
      { id: "conclusion", text: "Conclusion", level: 2 },
      { id: "further-reading", text: "Lectures complémentaires", level: 2 },
    ],
  },
};
