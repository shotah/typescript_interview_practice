// function maxProfit(prices: number[]): number {
//     let runningMax = 0;
//     let runMin = prices[0]
//     let runMax = 0
//     let previousPrice = prices[0]
//     prices.forEach((price, i) => {
//         if (previousPrice < price) {
//             runMin = Math.min(runMin, price)
//             runMax = Math.max(runMax, price - runMin)
//             console.log('prePrice', previousPrice, 'price', price, 'runMin', runMin, 'runMax', runMax);
//             console.log('getting the min and max of our run', runMax)
//         }
//         if (previousPrice > price || i === prices.length - 1) {
//             runningMax += runMax;
//             console.log('selling and getting profit', runningMax);
//             runMax = 0;
//             runMin = price;
//         }
//         previousPrice = price;
//     })
//     return runningMax;
// };

function maxProfit(prices: number[]): number {
    let maxProfit = 0;
    prices.forEach((price, idx) => {
        if (price > prices[idx - 1]) {
            maxProfit += price - prices[idx - 1]
        }
    })
    return maxProfit;
}

let prices: number[] = [];

// prices = [7, 1, 5, 3, 6, 4]
// // Output: 7
// console.log(maxProfit(prices))

// prices = [1, 2, 3, 4, 5]
// // Output: 4
// console.log(maxProfit(prices))

// prices = [7, 6, 4, 3, 1]
// // Output: 0
// console.log(maxProfit(prices))

prices = [6, 1, 3, 2, 4, 7]
// Output: 7
console.log(maxProfit(prices))