// Given n non-negative integers representing an elevation map where 
// the width of each bar is 1, compute how much water it can trap after raining.


// function trap(height: number[]): number {
//     let firstIndexTracker: number = 0;
//     let secondIndexTracker: number = 0;
//     let sumOfWater: number = 0;
//     for (let i = firstIndexTracker; i < height.length; i++) {
//         secondIndexTracker = Math.max(i, secondIndexTracker);
//         // capture current pool of water.
//         let sumOfLocalPool: number = 0;
//         if (height[i] <= 0) continue;
//         for (let j = secondIndexTracker; j < height.length; j++) {
//             console.log(height[i], height[j])
//             // dont bother if either are zero
//             //if (sumOfLocalPool === 0 && height[j] <= 0) break;
//             // j moves ahead until it matches the height of i.


//             if (height[j] < height[i]) {
//                 sumOfLocalPool += height[i] - height[j];
//                 console.log(height[i], height[j], sumOfLocalPool)
//             }


//             // as big as it can get.
//             if (sumOfLocalPool > 0 && height[j] >= height[i]) {
//                 console.log(height[i], height[j], sumOfLocalPool)
//                 console.log("added water and breaking", sumOfLocalPool, sumOfWater)
//                 sumOfWater += sumOfLocalPool;
//                 console.log("sum", sumOfWater)
//                 firstIndexTracker = j.valueOf();
//                 secondIndexTracker = j.valueOf();
//                 break;
//             }
//         }

//     }
//     return sumOfWater;
// };

// function trap(height: number[]): number {
//     let firstIndexTracker: number = 0;
//     let secondIndexTracker: number = 0;
//     let sumOfWater: number = 0;

//     // forward
//     for (let i = firstIndexTracker; i < height.length; i++) {
//         secondIndexTracker = Math.max(i, secondIndexTracker);
//         let sumOfLocalPool: number = 0;
//         if (height[i] <= 0) continue;
//         for (let j = secondIndexTracker; j < height.length; j++) {
//             if (height[j] < height[i]) {
//                 sumOfLocalPool += height[i] - height[j];
//                 console.log(height[i], height[j], sumOfLocalPool)
//             }
//             if (sumOfLocalPool > 0 && height[j] > height[i]) {
//                 sumOfWater += sumOfLocalPool;
//                 firstIndexTracker = j.valueOf();
//                 secondIndexTracker = j.valueOf();
//                 break;
//             }
//         }
//     }
//     // backward
//     firstIndexTracker = 0;
//     secondIndexTracker = 0;
//     let reversedHeight = height.reverse();
//     for (let i = firstIndexTracker; i < reversedHeight.length; i++) {
//         secondIndexTracker = Math.max(i, secondIndexTracker);
//         let sumOfLocalPool: number = 0;
//         if (reversedHeight[i] <= 0) continue;
//         for (let j = secondIndexTracker; j < reversedHeight.length; j++) {
//             console.log(reversedHeight[j], reversedHeight[i])
//             if (reversedHeight[j] < reversedHeight[i]) {
//                 sumOfLocalPool += reversedHeight[i] - reversedHeight[j];
//                 console.log(reversedHeight[i], reversedHeight[j], sumOfLocalPool)
//             }
//             if (sumOfLocalPool > 0 && reversedHeight[j] > reversedHeight[i]) {
//                 sumOfWater += sumOfLocalPool;
//                 firstIndexTracker = j.valueOf();
//                 secondIndexTracker = j.valueOf();
//                 break;
//             }
//         }
//     }
//     return sumOfWater;
// };

function trap(height: number[]): number {
    if (height.length === 0) {
        return 0
    }

    let water = 0
    let leftMax = 0
    let rightMax = 0
    let leftP = 0
    let rightP = height.length - 1

    while (leftP <= rightP) {
        leftMax = Math.max(leftMax, height[leftP])
        rightMax = Math.max(rightMax, height[rightP])
        if (leftMax < rightMax) {
            water += leftMax - height[leftP]
            leftP++
        } else {
            water += rightMax - height[rightP]
            rightP--
        }
    }
    return water
};


let height: number[] = [];

height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
// Output: 6
console.log(trap(height));

height = [4, 2, 0, 3, 2, 5]
// Output: 9
console.log(trap(height));

// height = [4, 2, 3]
// // Output: 1
// console.log(trap(height));
