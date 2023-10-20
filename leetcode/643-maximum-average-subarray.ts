// function findMaxAverage(nums: number[], k: number): number {
//     if (nums.length === 1 && k === 1) return nums[0];
//     let result = 0;
//     for (let i = 0; i <= nums.length - k; i++) {
//         result = Math.max(result, (nums.slice(i, i + k).reduce((a, b) => a + b) / k));
//     }
//     return result;
// };

function findMaxAverage(nums: number[], k: number, sum = 0, max = 0): number {
  for (let i = 0; i < k; i++) {
    sum += nums[i];
  }
  max = sum / k;
  for (let i = k; i < nums.length; i++) {
    sum += nums[i] - nums[i - k];
    max = Math.max(max, sum / k);
  }
  return max;
}

let nums = [1, 12, -5, -6, 50, 3],
  k = 4;
// Output: 12.75000
console.log(findMaxAverage(nums, k));

(nums = [5]), (k = 1);
// Output: 12.75000
console.log(findMaxAverage(nums, k));

(nums = [0, 1, 1, 3, 3]), (k = 4);
// expected 2.00000
// got: 1.23
console.log(findMaxAverage(nums, k));

nums = [
  8860, -853, 6534, 4477, -4589, 8646, -6155, -5577, -1656, -5779, -2619, -8604,
  -1358, -8009, 4983, 7063, 3104, -1560, 4080, 2763, 5616, -2375, 2848, 1394,
  -7173, -5225, -8244, -809, 8025, -4072, -4391, -9579, 1407, 6700, 2421, -6685,
  5481, -1732, -8892, -6645, 3077, 3287, -4149, 8701, -4393, -9070, -1777, 2237,
  -3253, -506, -4931, -7366, -8132, 5406, -6300, -275, -1908, 67, 3569, 1433,
  -7262, -437, 8303, 4498, -379, 3054, -6285, 4203, 6908, 4433, 3077, 2288,
  9733, -8067, 3007, 9725, 9669, 1362, -2561, -4225, 5442, -9006, -429, 160,
  -9234, -4444, 3586, -5711, -9506, -79, -4418, -4348, -5891,
];
k = 93;
// expected -594.58065
// got: 0.00000
console.log(findMaxAverage(nums, k));
