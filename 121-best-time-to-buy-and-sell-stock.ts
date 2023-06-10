// You are given an array prices where prices[i] is the price of a given stock on the ith day.

// You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

// Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

// Sliding Window:
function maxProfit(prices: number[]): number {
    let min = prices[0]
    let max = 0
    prices.forEach(price => {
        min = Math.min(min, price)
        max = Math.max(max, price - min)
    })
    return max
};

let result = 0;

result = maxProfit([7, 1, 5, 3, 6, 4]);
console.log(result); // 5

result = maxProfit([7, 6, 4, 3, 1]);
console.log(result); // 0

result = maxProfit([1, 4, 2]);
console.log(result); // 3

result = maxProfit([2, 1, 2, 1, 0, 1, 2]);
console.log(result); // 2

result = maxProfit([3, 2, 6, 5, 0, 3]);
console.log(result); // 4

result = maxProfit([2, 1, 4]);
console.log(result); // 3