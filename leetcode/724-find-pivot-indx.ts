function pivotIndex(nums: number[]): number {
  let left = 0;
  let right = nums.reduce((a, b) => a + b) - nums[0];
  console.log(`left: ${left}, right: ${right}`);
  if (left === right) {
    return 0;
  }
  for (let i = 0; i < nums.length; i++) {
    left += nums[i];
    right -= nums[i + 1];
    console.log(`left: ${left}, right: ${right}`);
    if (left === right) {
      return i + 1;
    }
  }
  return -1;
}

import {assert} from 'chai';
// assert.equal(pivotIndex([1, 7, 3, 6, 5, 6]), 3);
// assert.equal(pivotIndex([1, 2, 3]), -1);

assert.equal(pivotIndex([2, 1, -1]), 0);
