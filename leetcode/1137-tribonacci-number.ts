// create map to store values
let previous: Map<number, number> = new Map();

function tribonacci(n: number): number {
  // 0 is 0
  if (n === 0) return 0;

  // 1 or 2 always returns 1
  if (n === 1 || n === 2) return 1;

  // Check memoization, and return memoization:
  if (previous.has(n)) return previous.get(n)!;

  // get result:
  const result: number =
    tribonacci(n - 1) + tribonacci(n - 2) + tribonacci(n - 3);
  // Set it to memoization
  previous.set(n, result);
  // return result...
  return result;
}

import {assert} from 'chai';
let n: number;
let output: number;

n = 4;
output = 4;
assert.equal(tribonacci(n), output);
