function uniqueOccurrences(arr: number[]): boolean {
    let dict: Record<string, number> = {};
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] in dict) {
            dict[arr[i]] += 1;
        } else {
            dict[arr[i]] = 1;
        }
    }
    let alreadySeen: number[] = [];
    for (const key in dict) {
        if (alreadySeen.includes(dict[key])) {
            return false;
        }
        alreadySeen.push(dict[key]);
    }
    return true;
};

import { assert } from 'chai';
let arr: number[];
let output: boolean;

arr = [1, 2, 2, 1, 1, 3]
output = true
assert.equal(uniqueOccurrences(arr), output);
