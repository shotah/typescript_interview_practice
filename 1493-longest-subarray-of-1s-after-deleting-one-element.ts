// function longestSubarray(nums: number[]): number {
//     var combinedNums: number[] = []
//     var currentNumGrp = 0;
//     nums.forEach((num, idx) => {
//         if (num == 1) {
//             currentNumGrp++
//         } else {
//             combinedNums.push(currentNumGrp);
//             currentNumGrp = 0;
//         }

//         if (idx == nums.length - 1) {
//             combinedNums.push(currentNumGrp);
//         }
//     })
//     console.log(combinedNums)
//     var maxVal = 0;
//     if (combinedNums.length == 1) { return combinedNums[0] - 1 }
//     for (let i = 0; i < combinedNums.length - 1; i++) {
//         maxVal = Math.max((combinedNums[i] + combinedNums[i + 1]), maxVal);
//     }
//     return maxVal;
// };

// Sliding Window
function longestSubarray(nums: number[]): number {
  let lIdx = -1;
  let zeroPos = -1;
  let zeroCount = 0;
  let max = 0;
  for (let i = 0; i < nums.length; i++) {
    // See the break:
    if (nums[i] == 0) {
      // Check if second break:
      if (zeroCount == 1) {
        lIdx = zeroPos;
      } else {
        // mark as first break:
        zeroCount = 1;
      }
      zeroPos = i;
    }
    // remove lIdx from current postion and use that for value
    max = Math.max(max, i - lIdx - 1);
  }
  return max;
}

let nums: number[];
let output: number;

nums = [1, 1, 0, 1];
output = 3;

nums = [1, 1, 1];
output = 2;
console.log('returned: ', longestSubarray(nums));
console.log('expected: ', output);
