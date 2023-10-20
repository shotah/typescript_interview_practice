// function longestOnes(nums: number[], k: number): number {
//     let result = 0;
//     let left = 0;
//     let right = 0;
//     let zeroCount = 0;

//     while (right < nums.length) {
//         if (nums[right] === 0) {
//             zeroCount++;
//         }

//         while (zeroCount > k) {
//             if (nums[left] === 0) {
//                 zeroCount--;
//             }
//             left++;
//         }

//         result = Math.max(result, right - left + 1);
//         right++;
//     }
//     return result;
// };

function longestOnes(nums: number[], k: number): number {
  let left = 0,
    right = 0;
  for (; right < nums.length; right++) {
    if (nums[right] == 0) {
      k--;
    }
    if (k < 0) {
      if (nums[left] == 0) {
        k++;
      }
      left++;
    }
  }
  return right - left;
}

const nums = [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0],
  k = 2;
// Output: 6
console.log(longestOnes(nums, k));
