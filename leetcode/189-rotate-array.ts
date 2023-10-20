/**
 Do not return anything, modify nums in-place instead.
 */
// function rotate(nums: number[], k: number): void {
//     [...Array(k).keys()].forEach(_ => { nums.push(nums.shift() || 0) });
// };

function rotate(nums: number[], k: number): void {
  nums.unshift(...nums.splice(-(k % nums.length)));
}

const nums = [1, 2, 3, 4, 5, 6, 7],
  k = 3;
console.log(rotate(nums, k));
