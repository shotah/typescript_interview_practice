function minReorder(n: number, connections: number[][]): number {
  // Build an adjacency list for the graph.
  // We'll store both directions: (from -> to) as positive, (to -> from) as negative.
  // This way, we can tell if an edge needs to be reversed when traversing.
  const graph: Map<number, number[]> = new Map();
  for (const [from, to] of connections) {
    if (!graph.has(from)) graph.set(from, []);
    if (!graph.has(to)) graph.set(to, []);
    graph.get(from)!.push(to); // original direction (needs reversal if traversed)
    // The negative sign is a trick to encode the direction of the edge.
    graph.get(to)!.push(-from); // reverse direction (doesn't need reversal)
  }

  let count = 0;
  const visited = new Set<number>();

  // DFS traversal from city 0
  function dfs(city: number) {
    visited.add(city);
    for (const neighbor of graph.get(city)!) {
      const absNeighbor = Math.abs(neighbor);
      if (!visited.has(absNeighbor)) {
        // If neighbor is positive, it's an original edge and needs to be reversed
        if (neighbor > 0) count++;
        dfs(absNeighbor);
      }
    }
  }

  dfs(0);
  return count;
}

import {assert} from 'chai';

// Example test cases for a different problem (findDifference) were here by mistake.
// Let's add proper tests for minReorder instead:

// Test 1: Example from LeetCode
let n = 6;
let connections = [
  [0, 1],
  [1, 3],
  [2, 3],
  [4, 0],
  [4, 5],
];
// Expected output: 3 (minimum number of edges to reverse)
assert.equal(minReorder(n, connections), 3);

// Test 2: All roads already lead to city 0
n = 5;
connections = [
  [1, 0],
  [2, 0],
  [3, 0],
  [4, 0],
];
// Expected output: 0
assert.equal(minReorder(n, connections), 0);

// Test 3: All roads go away from city 0
n = 3;
connections = [
  [0, 1],
  [1, 2],
];
// Expected output: 2
assert.equal(minReorder(n, connections), 2);
