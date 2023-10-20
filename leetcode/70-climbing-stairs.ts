// You are climbing a staircase. It takes n steps to reach the top.
// Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

// function climbStairs(n: number): number {
//     if (n <= 3) return n;
//     return 2 * climbStairs(n - 2) + climbStairs(n - 3);
// };

// function climbStairs(n: number): number {
//     const numerator1 = 1 + Math.sqrt(5);
//     const denominator1 = 2 * Math.sqrt(5);
//     const term1 = numerator1 / denominator1;

//     const numerator2 = Math.sqrt(5) - 1;
//     const denominator2 = 2 * Math.sqrt(5);
//     const term2 = numerator2 / denominator2;

//     const base1 = numerator1 / 2;
//     const base2 = (1 - Math.sqrt(5)) / 2;

//     const result = term1 * Math.pow(base1, n) + term2 * Math.pow(base2, n);
//     return Math.round(result);
// };

function climbStairs(n: number): number {
  let one = 1;
  let two = 1;
  for (let i = 0; i < n - 1; i++) {
    const temp = one + two;
    one = two;
    two = temp;
  }
  return two;
}

let n: number;

n = 2;
// Output: 2
console.log(climbStairs(n));

n = 3;
// Output: 3
console.log(climbStairs(n));
