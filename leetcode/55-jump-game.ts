// function canJump(nums: number[]): boolean {
//     if (nums.length === 1) return true;
//     let previousIndex = 0;
//     for (let i = 0; i <= nums.length; i) {
//         i = nums[i] + i;
//         if (i >= nums.length - 1) return true;
//         if (i === previousIndex) {
//             return false;
//         }
//         previousIndex = i;
//     }
//     return true;
// };

function canJump(nums: number[]): boolean {
  if (nums.length === 1) return true;
  let maxIndex = 0;
  for (let i = 0; i <= nums.length; i++) {
    if (i > maxIndex) return false;
    maxIndex = Math.max(maxIndex, nums[i] + i);
    if (maxIndex >= nums.length - 1) return true;
  }
  return true;
}

let nums = [2, 3, 1, 1, 4];
// Output: true
console.log(canJump(nums));

nums = [3, 2, 1, 0, 4];
// Output: false
console.log(canJump(nums));

nums = [0];
// Output: true
console.log(canJump(nums));

nums = [2, 0, 0];
// Output: true
console.log(canJump(nums));

nums = [2, 5, 0, 0];
// Output: true
console.log(canJump(nums));
