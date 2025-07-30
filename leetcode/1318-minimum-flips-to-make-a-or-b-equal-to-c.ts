// Given 3 positives numbers a, b and c. Return the minimum flips required in some bits of a and b to make ( a OR b == c ). (bitwise OR operation).
// Flip operation consists of change any single bit 1 to 0 or change the bit 0 to 1 in their binary representation.

function minFlips(a: number, b: number, c: number): number {
  return 0;
}

import {assert} from 'chai';
let a = 4,
  b = 2,
  c = 7;
let output = 1;
assert.deepEqual(minFlips(a, b, c), output);
