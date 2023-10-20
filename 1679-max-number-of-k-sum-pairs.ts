// function maxOperations(nums: number[], k: number): number {
//     let count = 0;
//     let matchFound = true;
//     while (matchFound) {
//         matchFound = false;
//         console.log(nums);
//         for (let i = 0; i < nums.length; i++) {
//             console.log(nums[i]);
//             for (let j = 1; j < nums.length; j++) {
//                 console.log(nums[j]);
//                 console.log("sum: ", (nums[i] + nums[j]));
//                 if ((nums[i] + nums[j]) === k && i !== j) {
//                     count++;
//                     console.log(nums[i], nums[j]);
//                     nums.splice(i, 1);
//                     // since first splice removes one, we need to deccrement by one to get J.
//                     nums.splice(j - 1, 1);
//                     matchFound = true;
//                     break;
//                 }
//             }
//             if (matchFound === true) {
//                 break
//             };
//         }
//     }
//     return count;
// };

// function maxOperations(nums: number[], k: number): number {
//     // Not optimum solution as sorting is occuring.
//     nums.sort((a, b) => a - b);
//     let left = 0;
//     let right = nums.length - 1;
//     let count = 0;

//     while (left < right) {
//         const sum = nums[left] + nums[right];
//         if (sum == k) {
//             count++;
//             right--;
//             left++;
//         } else if (sum > k) {
//             right--;
//         } else {
//             left++;
//         }
//     }
//     return count;
// };

// function maxOperations(nums: number[], k: number): number {
//     const mapping: any = new Map(nums.map(obj => [obj, obj]));
//     // console.log(mapping.get(1))
//     let count = 0
//     for (const [key, value] of mapping) {
//         const target = k - value
//         console.log(value, target, k);
//         if (mapping.get(target)) {
//             count++
//             mapping.delete(target);
//             console.log(mapping);
//         }
//     }
//     return count
// };

// function maxOperations(nums: number[], k: number): number {
//     let counts: Map<number, number> = new Map();
//     let pairs: number[][] = [];
//     for (let i: number = 0; i < nums.length; i++) {
//         const complement = k - nums[i];
//         if (counts.get(complement) || 0 > 0) {
//             pairs.push([nums[i], complement]);
//             counts.set(complement, counts.get(complement)! - 1); // Decrement count of complement
//         } else {
//             counts.set(nums[i], (counts.get(nums[i]) ?? 0) + 1); // Increment count of nums[i]
//         }
//     }
//     return pairs.length;
// }

function maxOperations(nums: number[], k: number): number {
  const counts: Map<number, number> = new Map();
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    const complement = k - nums[i];
    if (counts.get(complement)! > 0) {
      count++;
      // Mark complement as used, and update complement count.
      counts.set(complement, counts.get(complement)! - 1);
    } else {
      // Increment how many complemnts this array contains.
      counts.set(nums[i], (counts.get(nums[i]) || 0) + 1);
    }
    console.log(counts);
  }
  return count;
}

let nums = [1, 2, 3, 4],
  k = 5;
// Output: 2
console.log(maxOperations(nums, k));

(nums = [3, 1, 3, 4, 3]), (k = 6);
// Output: 1
console.log(maxOperations(nums, k));
