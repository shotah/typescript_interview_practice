function maxArea(height: number[]): number {
    let result: number = 0;
    let left: number = 0;
    let right: number = height.length - 1;
    while (left < right) {
        result = Math.max(result, (right - left) * Math.min(height[left], height[right]));
        if (height[left] > height[right]) {
            right--
        } else {
            left++
        }
    }
    return result;
};

let height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
// Output: 49
console.log(maxArea(height));