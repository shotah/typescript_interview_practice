function topKFrequent(nums: number[], k: number): number[] {
    const priceMap = new Map<string, number>();
    nums.forEach((num) => {
        let strNum: string = num.toString();
        if (priceMap.get(strNum)) {
            priceMap.set(strNum,
                priceMap.get(strNum) as number + 1
            );
        } else {
            priceMap.set(strNum, 1);
        }
    });
    const sortedMap = [...priceMap].sort((a, b) => b[1] - a[1]);
    const result = sortedMap.slice(0, k);
    return result.map((item) => parseInt(item[0]));
};

let nums: number[] = [];
let k: number = 0;

nums = [1, 1, 1, 2, 2, 3], k = 2
// Output: [1, 2]
console.log(topKFrequent(nums, k));


nums = [1], k = 1
// Output: [1]
console.log(topKFrequent(nums, k));

nums = [3, 2, 2, 1, 1, 1], k = 2
// Output: [1, 2]
console.log(topKFrequent(nums, k));