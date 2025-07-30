// Example: Find all single values in an array
function findAllSingles(nums: number[]): number[] {
  const count: Record<number, number> = {};
  for (const num of nums) {
    count[num] = (count[num] || 0) + 1;
  }
  return Object.keys(count)
    .filter(key => count[+key] === 1)
    .map(Number);
}

// fully optimized solution
function optimizedFindAllSingles(nums: number[]): number[] {
  const singles = new Set<number>();
  const multiples = new Set<number>();
  for (const num of nums) {
    if (multiples.has(num)) continue;
    if (singles.has(num)) {
      singles.delete(num);
      multiples.add(num);
    } else {
      singles.add(num);
    }
  }
  return Array.from(singles);
}

function singleNumber(nums: number[]): number {
  let result = 0;
  for (const num of nums) {
    result ^= num; // XOR operation
  }
  return result;
}

import {assert} from 'chai';
let nums: number[];
let output: number;

nums = [2, 2, 1];
output = 1;
assert.deepEqual(singleNumber(nums), output);
