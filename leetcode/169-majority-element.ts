// function majorityElement(nums: number[]): number {
//     const numQty = new Map<number, number>();
//     let largest: number[] = [];
//     nums.forEach(num => {
//         numQty.set(num, (numQty.get(num) || 0) + 1);
//     })
//     numQty.forEach((qty, num) => {
//         if (qty > largest[1] || largest[1] === undefined) {
//             largest = [num, qty]
//         }
//     })
//     return largest[0]
// };

function majorityElement(nums: number[]): number {
  const numQty = new Map<number, number>();
  let largest: number[] = [];
  nums.forEach(num => {
    numQty.set(num, (numQty.get(num) || 0) + 1);
    const qty = numQty.get(num) || 0;
    if (qty > largest[1] || largest[1] === undefined) {
      largest = [num, qty];
    }
  });
  return largest[0];
}

const nums = [2, 2, 1, 1, 1, 2, 2];
console.log(majorityElement(nums));
