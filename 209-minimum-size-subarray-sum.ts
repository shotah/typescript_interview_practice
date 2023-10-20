// Given an array of positive integers nums and a positive integer target, return the minimal length of a
// subarray
// whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.

// WORKS, but starts over again, so it times out.
// function minSubArrayLen(target: number, nums: number[]): number {
//     let minLen: number = 0;
//     let sumOfArray: number = 0;
//     for (let firstIdx = 0; firstIdx < nums.length; firstIdx++) {
//         for (let secondIdx = firstIdx; secondIdx < nums.length; secondIdx++) {
//             sumOfArray += nums[secondIdx];
//             if (sumOfArray >= target) {
//                 if (minLen === 0) {
//                     minLen = secondIdx + 1 - firstIdx;
//                 };
//                 minLen = Math.min(minLen, secondIdx + 1 - firstIdx);
//                 sumOfArray = 0;
//                 break
//             }
//         }
//         sumOfArray = 0;
//     }
//     return minLen;
// };

// function minSubArrayLen(target: number, nums: number[]): number {
//     let maxArr: number = 0;
//     let firstIndex: number = 0;
//     let sumOfArray: number = 0;
//     let arrCounter: number = 0;
//     for (let i = 0; i < nums.length; i++) {
//         if (nums[i] > target) continue;
//         console.log(sumOfArray, target, nums[i], nums[firstIndex]);
//         sumOfArray += nums[i];
//         arrCounter++
//         if (sumOfArray > target) {
//             sumOfArray -= nums[firstIndex];
//             firstIndex++;
//             arrCounter--;
//         };
//         // console.log(sumOfArray, arrCounter);
//         maxArr = Math.max(maxArr, arrCounter);
//     }
//     if (sumOfArray < target) return 0;
//     return maxArr;
// };

// WORKS but the SUM arrow funciton times out.
// function minSubArrayLen(target: number, nums: number[]): number {
//     let minLen: number = 0;
//     for (let firstIdx = 1; firstIdx <= nums.length; firstIdx++) {
//         for (let secondIdx = 1; secondIdx <= nums.length; secondIdx++) {
//             const subArr = [...nums].splice(firstIdx - 1, secondIdx);
//             console.log(subArr);
//             const subArrVal = subArr.reduce((a, b) => a + b);
//             if (subArrVal >= target) {
//                 if (minLen === 0) {
//                     minLen = secondIdx;
//                 }
//                 minLen = Math.min(minLen, secondIdx);
//                 console.log("target: ", target, "sum: ", subArrVal, "minLen: ", minLen)
//                 break;
//             };
//         };
//     };
//     return minLen;
// };

// function minSubArrayLen(target: number, nums: number[]): number {
//     let minLen: number = 0;
//     let sumOfArray: number = 0;
//     let secondPointer: number = 0;
//     for (let firstIdx = 0; firstIdx < nums.length; firstIdx++) {
//         for (let secondIdx = secondPointer; secondIdx < nums.length; secondIdx++) {
//             secondPointer = secondIdx;
//             //console.log("inner adding: ", nums[secondIdx]);
//             if (firstIdx === secondIdx) {
//                 sumOfArray = nums[firstIdx];
//             } else {
//                 sumOfArray += nums[secondIdx];
//             };
//             console.log("first: ", firstIdx, "second: ", secondIdx, "sum: ", sumOfArray, "minLen: ", minLen);
//             // console.log("sum: ", sumOfArray)
//             if (sumOfArray >= target) {
//                 if (minLen === 0) {
//                     minLen = secondIdx + 1 - firstIdx;
//                 };
//                 minLen = Math.min(minLen, secondIdx + 1 - firstIdx);
//                 // console.log("first: ", firstIdx, "second: ", secondIdx);
//                 //console.log("target: ", target, "sum: ", sumOfArray, "minLen: ", minLen);
//                 //console.log("inner removing: ", nums[firstIdx]);
//                 sumOfArray -= nums[firstIdx];
//                 //sumOfArray = 0;
//                 break
//             }

//         }
//         //console.log("outer removing: ", nums[firstIdx]);
//         sumOfArray -= nums[firstIdx];
//         // sumOfArray = 0;
//     }
//     return minLen;
// };

// function minSubArrayLen(target: number, nums: number[]): number {
//     let minLen: number = 0;
//     let sum: number = 0;
//     let secondPointer: number = 0;
//     for (let firstIdx = 0; firstIdx < nums.length; firstIdx++) {
//         for (let secondIdx = secondPointer; secondIdx < nums.length; secondIdx++) {
//             secondPointer = secondIdx;
//             sum += nums[secondIdx];
//             if (sum >= target) {
//                 if (minLen === 0) {
//                     minLen = secondIdx + 1 - firstIdx;
//                 };
//                 minLen = Math.min(minLen, secondIdx + 1 - firstIdx);
//                 console.log("first: ", firstIdx, "second: ", secondIdx, "sum: ", sum, "minLen: ", minLen);
//                 sum -= nums[secondIdx];
//                 break;
//             }
//         }
//         sum -= nums[firstIdx];
//     };
//     return minLen;
// };

// function minSubArrayLen(target: number, nums: number[]): number {
//     let i = 0, j = 0, sum = 0, min = Infinity, n = nums.length;
//     while (j <= n) {
//         if (sum >= target) {
//             min = Math.min(j - i, min);
//             sum -= nums[i++];
//         }
//         else sum += nums[j++];
//     }
//     return min === Infinity ? 0 : min;
// };

function minSubArrayLen(target: number, nums: number[]): number {
  let minLength = Infinity;
  let windowSum = 0;
  for (
    let windowEnd = 0, windowStart = 0;
    windowEnd < nums.length;
    windowEnd++
  ) {
    windowSum += nums[windowEnd];

    // calculate the sum until windowSum is >= target
    // if so, enter this while loop
    while (windowSum >= target) {
      // take the minLength
      // we do (windowEnd - windowStart + 1) because
      // if for example windowStart = 0 and windowEnd = 0
      // we have one element, but if we don't add the one, it will
      // not count it as one
      minLength = Math.min(minLength, windowEnd - windowStart + 1);

      // keep decreasing windowSum until it is less than target again
      // and for each time you decrease, check if the new sum still meets
      // our condition (windowSum >= target). If so, then we might have a new minLength
      windowSum -= nums[windowStart];

      // shrink the window
      windowStart++;
    }
  }

  if (minLength === Infinity) return 0;
  return minLength;
}

let target: number;
let nums: number[];

// target = 7, nums = [2, 3, 1, 2, 4, 3]
// // Output: 2
// console.log("result: ", minSubArrayLen(target, nums));

// target = 4, nums = [1, 4, 4]
// // Output: 1
// console.log("result: ", minSubArrayLen(target, nums));

// target = 11, nums = [1, 1, 1, 1, 1, 1, 1, 1]
// // Output: 0
// console.log("result: ", minSubArrayLen(target, nums));

// target = 15, nums = [5, 1, 3, 5, 10, 7, 4, 9, 2, 8];
// // Output: 2
// console.log("result: ", minSubArrayLen(target, nums));

// target = 15, nums = [2, 14]
// // Output: 2
// console.log("result: ", minSubArrayLen(target, nums));

// target = 7, nums = [1, 1, 1, 1, 7]
// // Output: 1
// console.log("result: ", minSubArrayLen(target, nums));

// target = 11, nums = [1, 2, 3, 4, 5]
// // // Output: 3
// console.log("result: ", minSubArrayLen(target, nums));

(target = 15), (nums = [1, 2, 3, 4, 5]);
// // Output: 5
console.log('result: ', minSubArrayLen(target, nums));
