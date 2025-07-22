let previous: Map<number, number> = new Map();


function tribonacci(n: number): number {
    if (n === 0) return 0;
    if (n === 1 || n === 2) return 1;
    if (previous.has(n)) return previous.get(n)!;
    const result: number = tribonacci(n - 1) + tribonacci(n - 2) + tribonacci(n - 3);
    previous.set(n, result);
    return result;
   
};

import { assert } from 'chai';
let n: number;
let output: number;

n = 4
output = 4
assert.equal(tribonacci(n), output);
