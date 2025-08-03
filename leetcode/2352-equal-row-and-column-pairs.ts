// Find a row and column that are identical:
function equalPairs(grid: number[][]): number {
  let count = 0;
  for (let c = 0; c < grid[0].length; c++) {
    let col: number[] = [];
    for (let r = 0; r < grid.length; r++) {
      col.push(grid[r][c]);
      if (grid[r].toString() === col.toString()) count++;
    }
  }
  return count;
}

import {assert} from 'chai';
let grid: number[][];
let output: number;

grid = [
  [3, 2, 1],
  [1, 7, 6],
  [2, 7, 7],
];
output = 1;
assert.equal(equalPairs(grid), output);
