// function countBits(n: number): number[] {
//   const bitsCountArray: number[] = new Array(n + 1).fill(0);
//   for (let i = 1; i <= n; i++) {
//     console.log(`Processing number: ${i}`);
//     // checking if the number is odd (i & 1)
//     let leastSignificantBit = i & 1;
//     console.log(`i: ${i}, leastSignificantBit: ${leastSignificantBit}`);
//     // Right shift to find the most significant bit
//     let mostSignificantBit = i >> 1;
//     // The number of bits in i is the number of bits in the most significant bit plus the least significant bit
//     let bitsCount = bitsCountArray[mostSignificantBit];
//     bitsCountArray[i] = bitsCount + leastSignificantBit;
//   }
//   return bitsCountArray;
// }

function countBits(n: number): number[] {
  const bitsCountArray: number[] = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    bitsCountArray[i] = bitsCountArray[i >> 1] + (i & 1);
  }
  return bitsCountArray;
}

import {assert} from 'chai';
let n: number;
let output: number[];

n = 5;
output = [0, 1, 1, 2, 1, 2];
assert.deepEqual(countBits(n), output);
