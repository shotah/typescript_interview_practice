let n: number;
let m: number;

function partions(n: number, m: number): number {
  // solve for the base case first!!!!
  if (n === 0) return 1;
  if (n < 0 || m === 0) return 0;
  return partions(n - m, m) + partions(n, m - 1);
}

n = 1;
m = 2;
// Output: 1
console.log(partions(n, m));

n = 2;
m = 3;
// Output: 2
console.log(partions(n, m));

n = 5;
m = 3;
// Output: 5
console.log(partions(n, m));

// n = 3;
// m = 3;
// // Output: 15
// console.log(partions(n, m));
