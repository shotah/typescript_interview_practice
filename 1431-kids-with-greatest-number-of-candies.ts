function kidsWithCandies(candies: number[], extraCandies: number): boolean[] {
    let maxCandies = Math.max(...candies);
    return candies.map(kidsCandies => kidsCandies + extraCandies >= maxCandies);
};

let candies = [2, 3, 5, 1, 3], extraCandies = 3
Output: [true, true, true, false, true]
console.log(kidsWithCandies(candies, extraCandies));