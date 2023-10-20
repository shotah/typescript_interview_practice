// function increasingTriplet(nums: number[]): boolean {
//     for (let i = 1; i < nums.length - 1; i++) {
//         if (nums[i - 1] < nums[i] && nums[i] < nums[i + 1]) {
//             return true;
//         }
//     }
//     return false;
// };

function increasingTriplet(nums: number[]): boolean {
  let max = Number.MAX_SAFE_INTEGER;
  let min = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] <= min) {
      min = nums[i];
      continue;
    }
    if (nums[i] <= max) {
      max = nums[i];
      continue;
    }
    return true;
  }
  return false;
}

let nums = [1, 2, 3, 4, 5];
true;
console.log(increasingTriplet(nums));

nums = [5, 4, 3, 2, 1];
false;
console.log(increasingTriplet(nums));

nums = [2, 1, 5, 0, 4, 6];
true;
console.log(increasingTriplet(nums));

nums = [20, 100, 10, 12, 5, 13];
true;
console.log(increasingTriplet(nums));
