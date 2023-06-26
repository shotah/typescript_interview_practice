// function productExceptSelf(nums: number[]): number[] {
//     const len = nums.length;
//     if (len <= 1) return [0];
//     const result: number[] = [];
//     const firstArr: number[] = [];
//     let lastNum: number | undefined = nums.shift();
//     for (let i = 0; i < len; i++) {
//         result.push([...firstArr, ...nums].reduce((a, b) => a * b))
//         firstArr.push((lastNum ? lastNum : 0));
//         lastNum = nums.shift();
//     }
//     return result;
// };

function productExceptSelf(nums: number[]): number[] {
    const result: number[] = Array(nums.length).fill(1)
    const numsLen: number = nums.length
    const curr: number[] = Array(2).fill(1)
    for (let i: number = 1; i < numsLen; i++) {
        curr[0] *= nums[i - 1]
        curr[1] *= nums[numsLen - i]
        result[i] *= curr[0]
        result[numsLen - i - 1] *= curr[1]
    }
    return result
};

let nums: number[] = [];

nums = [1, 2, 3, 4]
// Output: [24,12,8,6]
console.log(productExceptSelf(nums))

nums = [-1, 1, 0, -3, 3]
// Output: [0,0,9,0,0]
console.log(productExceptSelf(nums))

