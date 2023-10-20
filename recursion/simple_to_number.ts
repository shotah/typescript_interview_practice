function totalSum(base: number): number {
  // solve for the base case first!!!!
  if (base <= 0) return 0;
  return base + totalSum(base - 1);
}

let base: number;

base = 0;
// Output: 0
console.log(totalSum(base));

base = 3;
// Output: 6
console.log(totalSum(base));

base = 5;
// Output: 15
console.log(totalSum(base));
