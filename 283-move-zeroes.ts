function moveZeroes(nums: number[]): void {
    let i = 0;
    let zeroCount: number[] = [];
    while (i <= nums.length) {
        if (nums[i] === 0) {
            nums.splice(i, 1);
            zeroCount.push(0);
            continue;
        }
        i++
    }
    nums.push(...zeroCount);
    console.log(nums);
};


let nums = [0, 1, 0, 3, 12]
// Output: [1, 3, 12, 0, 0]
console.log(moveZeroes(nums));

nums = [0]
// Output: [0]
console.log(moveZeroes(nums));
