function gridPath(n: number, m: number, paths: number = 0): number {
    // solve for the base case first!!!!
    if (n === 1 || m === 1) return 1;
    return gridPath(n, m - 1) + gridPath(n - 1, m);
}

let n: number;
let m: number;

n = 1;
m = 1;

// Output: 0
console.log(gridPath(n, m));

n = 2;
m = 2;
// Output: 2
console.log(gridPath(n, m));

n = 3;
m = 3;
// Output: 15
console.log(gridPath(n, m));