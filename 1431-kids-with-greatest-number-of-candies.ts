function kidsWithCandies(candies: number[], extraCandies: number): boolean[] {
  const maxCandies = Math.max(...candies);
  return candies.map(kidsCandies => kidsCandies + extraCandies >= maxCandies);
}

const candies = [2, 3, 5, 1, 3],
  extraCandies = 3;
[true, true, true, false, true];
console.log(kidsWithCandies(candies, extraCandies));
