// function findDifference(nums1: number[], nums2: number[]): number[][] {
//     return [
//         nums1.filter(a => (a in nums2 === false)),
//         nums2.filter(b => (b in nums1 === false))
//     ];
// }

// function findDifference(nums1: number[], nums2: number[]): number[][] {
//     let n1 = new Set<number>()
//     let n2 = new Set<number>()
//     let maxLen = Math.max(nums1.length, nums2.length)
//     for (let i = 0; i < maxLen; i++) {
//         if (nums1[i] !== undefined && !nums2.includes(nums1[i])) {
//             n1.add(nums1[i])
//         }
//         if (nums2[i] !== undefined && !nums1.includes(nums2[i])) {
//             n2.add(nums2[i])
//         }
//     }
//     return [Array.from(n1), Array.from(n2)]
// }

function findDifference(nums1: number[], nums2: number[]): number[][] {
    // Creating two Sets for both Array of numbers.
    const [ansSet1, ansSet2] = [new Set(nums1), new Set(nums2)];

    return [
        // Filtering the first Set by occurrences in the second Set via delete
        // we get a filtered Set for the second answer-item.
        [...ansSet1].filter(n => !ansSet2.delete(n)),
        [...ansSet2]
    ];
};

import { assert } from 'chai';
let nums1: number[];
let nums2: number[];
let output: number[][];
nums1 = [1, 2, 3];
nums2 = [2, 4, 6];
output = [
    [1, 3],
    [4, 6],
];

assert.equal(findDifference(nums1, nums2), output);

nums1 = [1, 2, 3, 3]
nums2 = [1, 1, 2, 2]
output = [[3], []];

assert.equal(findDifference(nums1, nums2), output);
