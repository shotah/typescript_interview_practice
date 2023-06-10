// Given an integer array nums sorted in non-decreasing order, remove some duplicates in-place such that each unique element appears at most twice. The relative order of the elements should be kept the same.
// Since it is impossible to change the length of the array in some languages, you must instead have the result be placed in the first part of the array nums. More formally, if there are k elements after removing the duplicates, then the first k elements of nums should hold the final result. It does not matter what you leave beyond the first k elements.
// Return k after placing the final result in the first k slots of nums.
// Do not allocate extra space for another array. You must do this by modifying the input array in-place with O(1) extra memory.

// function removeDuplicates(nums: number[]): number {
//     let dupCounter = 0;
//     let pastNum: number | undefined;
//     nums.forEach((num, idx) => {
//         if (num === pastNum) {
//             dupCounter++;
//         } else {
//             pastNum = num;
//             dupCounter = 0;
//         }
//         if (dupCounter >= 2) {
//             delete nums[idx]
//         }
//     })
//     nums = nums.flat();
//     console.log(nums);
//     return nums.length;
// };

function removeDuplicates(nums: number[]): number {
    let i = 0;
    nums.forEach(num => {
        if (i < 2 || num > nums[i - 2]) {
            nums[i] = num;
            i++;
        }
    });
    return i;
};

let nums = [1, 1, 1, 2, 2, 3]
console.log(removeDuplicates(nums))
// Output: 5, nums = [1,1,2,2,3,_]