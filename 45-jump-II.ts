function jump(nums: number[]): number {
  if (nums.length === 1) return 0;
  let maxIndex = 0;
  let steps = 0;
  let currentMax = 0;
  for (let i = 0; i <= nums.length; i++) {
    if (i > maxIndex) {
      steps++;
      maxIndex = currentMax;
    }
    currentMax = Math.max(currentMax, nums[i] + i);
    if (maxIndex >= nums.length - 1) return steps;
  }
  return steps;
}

let nums = [2, 3, 1, 1, 4];
// Output: true
console.log(jump(nums));

nums = [3, 2, 1, 0, 4];
// Output: false
console.log(jump(nums));
