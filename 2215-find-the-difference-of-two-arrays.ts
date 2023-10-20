function findDifference(nums1: number[], nums2: number[]): number[][] {
    let resOne = [];
    let resTwo = [];

    return [resOne, resTwo];
}

import { assert } from 'chai';
let nums1: number[];
let nums2: number[];
let output: number[][];
(nums1 = [1, 2, 3]), (nums2 = [2, 4, 6]);
output = [
    [1, 3],
    [4, 6],
];
assert.equal(findDifference(nums1, nums2), output);

(nums1 = [1, 2, 3, 3]), (nums2 = [1, 1, 2, 2]);
output = [[3], []];

assert.equal(findDifference(nums1, nums2), output);
