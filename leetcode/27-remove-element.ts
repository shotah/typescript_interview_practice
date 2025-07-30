// function removeElement(nums: number[], val: number): number {
//     return nums.filter(num => num !== val).length;
// };

// function removeElement(nums: number[], val: number): number {
//   const indexes: number[] = [];
//   nums.forEach((num, index) => {
//     if (num === val) {
//       indexes.push(index);
//     }
//   });
//   indexes.reverse().forEach(index => {
//     nums.splice(index, 1);
//   });
//   return nums.length;
// }

function removeElement(nums: number[], val: number): number {
  let k = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      // Move the non-val element to the front of the array
      nums[k] = nums[i];
      k++;
    }
  }
  nums.length = k; // Truncate the array to only the valid elements
  return k;
}

import {assert} from 'chai';
// Test cases for removeElement function
// Test 1
let arr1 = [3, 2, 2, 3];
let expected1 = [2, 2];
let result1 = removeElement(arr1, 3);
assert.strictEqual(result1, expected1.length, 'Length should match');
assert.deepEqual(arr1, expected1, 'Array contents should match');

// Test 2
let arr2 = [0, 1, 2, 2, 3, 0, 4, 2];
let expected2 = [0, 1, 3, 0, 4];
let result2 = removeElement(arr2, 2);
assert.strictEqual(result2, expected2.length, 'Length should match');
assert.deepEqual(arr2, expected2, 'Array contents should match');
