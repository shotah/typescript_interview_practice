// You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, 
// representing the number of elements in nums1 and nums2 respectively.
// Merge nums1 and nums2 into a single array sorted in non-decreasing order.
// The final sorted array should not be returned by the function, but instead be stored inside the array nums1.
// To accommodate this, nums1 has a length of m + n, where the first m elements denote the 
// elements that should be merged, and the last n elements are set to 0 and should be ignored. nums2 has a length of n.



function merge(nums1: number[], m: number, nums2: number[], n: number): void {
    nums2.forEach((nums2num, nums2index) => { nums1[m + nums2index] = nums2num })
    nums1 = nums1.sort();
};


let nums1 = [1, 2, 3, 0, 0, 0], m = 3, nums2 = [2, 5, 6], n = 3
console.log(merge(nums1, m, nums2, n))

// Output: [1,2,2,3,5,6]
// Explanation: The arrays we are merging are [1,2,3] and [2,5,6].
// The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.


/**
 Do not return anything, modify nums1 in-place instead.
 */
// function merge(nums1: number[], m: number, nums2: number[], n: number): void {
//     let nums1Index = m - 1;
//     let nums2Index = n - 1;
//     let mergedIndex = m + n - 1;

//     while (nums2Index >= 0) {
//         // Checks if num1 last number is greater than nums2 number
//         // Moves nums1 to back of array with merged index
//         if (nums1Index >= 0 && nums1[nums1Index] > nums2[nums2Index]) {
//             nums1[mergedIndex] = nums1[nums1Index];
//             nums1Index--;
//         // Else moves nums2 number to back of array
//         // and moves to next nums2 number to check
//         } else {
//             nums1[mergedIndex] = nums2[nums2Index];
//             nums2Index--;
//         }
//         // Move insert index up one.
//         mergedIndex--;
//     }
// };

