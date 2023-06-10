const nextPairs = (x: number): number[] => { return [2 * x + 1, 3 * x + 1] }

export function dblLinear(n: number): number {
  const linearArr: number[] = [...Array(n + 1)].reduce((a, _, i) => { return a = [...a, ...nextPairs(a[i])] }, [1]);
  const filteredLinearArr: number[] = [...new Set([...linearArr.sort((a, b) => a - b)])]
  if (n === 100) { console.log(filteredLinearArr.slice(85)) }
  return [...new Set([...linearArr.sort((a, b) => a - b)])][n];
}

dblLinear(100)

import { assert } from "chai";

assert.strictEqual(dblLinear(10), 22);
assert.strictEqual(dblLinear(20), 57);
assert.strictEqual(dblLinear(30), 91);
assert.strictEqual(dblLinear(100), 447);
assert.strictEqual(dblLinear(13448), 186988);
