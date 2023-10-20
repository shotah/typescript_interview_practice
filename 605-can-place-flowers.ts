// function canPlaceFlowers(flowerbed: number[], n: number): boolean {
//     if (n === 0) { return true };
//     for (let i = 0; i < flowerbed.length; i++) {
//         if (flowerbed[i] === 0 && !flowerbed[i - 1] && !flowerbed[i + 1]) {
//             console.log(flowerbed[i - 1], flowerbed[i], flowerbed[i + 1])
//             flowerbed[i] = 1;
//             n--;
//         }
//         if (n === 0) { return true };
//     }
//     return false;
// };

function canPlaceFlowers(flowerbed: number[], n: number): boolean {
  let count = 0;
  for (let i = 0; i < flowerbed.length; i++) {
    if (flowerbed[i] === 0 && !flowerbed[i - 1] && !flowerbed[i + 1]) {
      flowerbed[i] = 1;
      count++;
    }
  }
  return count >= n;
}

let flowerbed = [1, 0, 0, 0, 1],
  n = 1;
true;
console.log(canPlaceFlowers(flowerbed, n));

(flowerbed = [1, 0, 0, 0, 1]), (n = 2);
false;
console.log(canPlaceFlowers(flowerbed, n));

(flowerbed = [1, 0, 0, 0, 0, 1]), (n = 2);
false;
console.log(canPlaceFlowers(flowerbed, n));

(flowerbed = [1, 0, 0, 0, 1, 0, 0]), (n = 2);
false;
console.log(canPlaceFlowers(flowerbed, n));
