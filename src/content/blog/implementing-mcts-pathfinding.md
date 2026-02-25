---
title:
  0: "Implementing MCTS for Intelligent Pathfinding"
  fr: "Implémentation de MCTS pour le Pathfinding Intelligent"
description:
  0: "Exploring Monte Carlo Tree Search algorithms for dynamic pathfinding in games and AI agents. A deep dive into the theory and practical implementation."
  fr: "Exploration des algorithmes Monte Carlo Tree Search pour le pathfinding dynamique dans les jeux et les agents IA. Une plongée profonde dans la théorie et l'implémentation pratique."
date: 2025-01-15
category: ALGORITHM
tags:
  - MCTS
  - Pathfinding
  - AI
  - Algorithms
  - Game Development
published: true
coverImage: "/assets/blog/mcts-cover.jpg"
---

# Implementing MCTS for Intelligent Pathfinding

Monte Carlo Tree Search (MCTS) is a powerful algorithm that has revolutionized game AI, most notably in AlphaGo's historic victories. But its applications extend far beyond board games - it's an excellent tool for dynamic pathfinding in complex environments.

## What is MCTS?

MCTS is a heuristic search algorithm that makes decisions by building a search tree through random sampling of the decision space. Unlike traditional pathfinding algorithms like A* or Dijkstra, MCTS doesn't require a complete understanding of the environment upfront.

### Key Advantages

- **Adaptive**: Adjusts strategy based on simulation results
- **Anytime**: Can be stopped at any time to return best current solution
- **Domain-agnostic**: Doesn't require hand-crafted heuristics

## The Four Phases of MCTS

### 1. Selection

Starting from the root node, we traverse the tree by selecting child nodes based on a selection policy. The most common is **UCB1 (Upper Confidence Bound)**:

```python
import math

def ucb1(node, parent, exploration_param=1.41):
    """
    Calculate UCB1 score for node selection.

    Args:
        node: Current node being evaluated
        parent: Parent node
        exploration_param: Exploration parameter (typically sqrt(2))

    Returns:
        UCB1 score
    """
    if node.visits == 0:
        return float('inf')

    exploitation = node.value / node.visits
    exploration = exploration_param * math.sqrt(
        math.log(parent.visits) / node.visits
    )

    return exploitation + exploration
```

### 2. Expansion

When we reach a node that hasn't been fully explored, we add one or more child nodes representing possible next states.

```python
class MCTSNode:
    def __init__(self, state, parent=None):
        self.state = state
        self.parent = parent
        self.children = []
        self.visits = 0
        self.value = 0.0

    def expand(self, action):
        """Expand tree by adding a new child node."""
        next_state = self.state.apply_action(action)
        child = MCTSNode(next_state, parent=self)
        self.children.append(child)
        return child
```

### 3. Simulation

From the newly expanded node, we run a random simulation (rollout) to a terminal state or maximum depth. This gives us an estimate of the node's value.

```python
def simulate(node, max_depth=100):
    """
    Simulate random playouts from node.

    Args:
        node: Starting node
        max_depth: Maximum simulation depth

    Returns:
        Simulation reward
    """
    state = node.state.clone()
    depth = 0

    while not state.is_terminal() and depth < max_depth:
        action = state.get_random_action()
        state = state.apply_action(action)
        depth += 1

    return state.get_reward()
```

### 4. Backpropagation

We propagate the simulation result back up the tree, updating visit counts and values for all ancestors.

```python
def backpropagate(node, reward):
    """
    Backpropagate reward up the tree.

    Args:
        node: Leaf node where simulation started
        reward: Simulation reward
    """
    current = node
    while current is not None:
        current.visits += 1
        current.value += reward
        current = current.parent
```

## Applying MCTS to Pathfinding

For pathfinding, we define:

- **State**: Agent position + environment state
- **Actions**: Possible movement directions (N, S, E, W, etc.)
- **Reward**: Distance to goal + penalties for obstacles/dangers

```python
class PathfindingState:
    def __init__(self, position, goal, grid):
        self.position = position
        self.goal = goal
        self.grid = grid

    def get_reward(self):
        """Calculate reward based on distance to goal."""
        distance = manhattan_distance(self.position, self.goal)
        if self.position == self.goal:
            return 100.0
        return -distance

    def is_terminal(self):
        """Check if goal reached."""
        return self.position == self.goal

    def get_actions(self):
        """Get valid neighboring positions."""
        x, y = self.position
        candidates = [
            (x+1, y), (x-1, y),
            (x, y+1), (x, y-1)
        ]
        return [pos for pos in candidates
                if self.grid.is_walkable(pos)]
```

## Performance Considerations

### Time Complexity

MCTS runs in **O(n)** where n is the number of iterations. Each iteration involves:
- Selection: O(log n) average case
- Expansion: O(1)
- Simulation: O(d) where d is simulation depth
- Backpropagation: O(log n)

### Memory Usage

The tree grows with each iteration, but can be pruned by:
- Removing unlikely branches (low visit counts)
- Limiting tree depth
- Implementing transposition tables

### Optimizations

1. **Parallelization**: Run multiple simulations concurrently
2. **Progressive Widening**: Limit child expansion based on visit count
3. **RAVE (Rapid Action Value Estimation)**: Share information across similar states
4. **Domain-specific heuristics**: Guide simulations with informed policies

## Real-World Applications

Beyond games, MCTS excels in:

- **Robotics**: Planning in uncertain environments
- **Autonomous vehicles**: Dynamic route planning
- **Resource allocation**: Optimizing complex schedules
- **Procedural content generation**: Creating balanced game levels

## Conclusion

MCTS provides a flexible, powerful approach to pathfinding that adapts to complex, dynamic environments. While it may be overkill for simple grid-based pathfinding, it shines in scenarios with:

- Partial observability
- Dynamic obstacles
- Complex reward structures
- Multiple objectives

The algorithm's ability to balance exploration and exploitation makes it a valuable tool in any AI developer's toolkit.

## Further Reading

- Browne et al. (2012): "A Survey of Monte Carlo Tree Search Methods"
- Silver & Veness (2010): "Monte-Carlo Planning in Large POMDPs"
- Coulom (2006): "Efficient Selectivity and Backup Operators in Monte-Carlo Tree Search"

## Code Repository

Full implementation available at: [github.com/B-a-r-r/mcts-pathfinding](https://github.com/B-a-r-r)

---

*Questions or comments? Feel free to reach out!*
