// 11. Container With Most Water
// https://leetcode.com/problems/container-with-most-water/

function maxArea(height: number[]): number {
  let result = 0;
  let left = 0;
  let right: number = height.length - 1;
  while (left < right) {
    result = Math.max(
      result,
      (right - left) * Math.min(height[left], height[right]),
    );
    if (height[left] > height[right]) {
      right--;
    } else {
      left++;
    }
  }
  return result;
}

const height = [1, 8, 6, 2, 5, 4, 8, 3, 7];
// Output: 49
console.log(maxArea(height));
