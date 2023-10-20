import {assert} from 'chai';

/** return the output array and ignore all non-op characters */
export function parse(data: string): number[] {
  let runningTotal = 0;
  return data.split('').reduce((acc, x: string) => {
    if (x === 'i') ++runningTotal;
    if (x === 'd') --runningTotal;
    if (x === 's') runningTotal *= runningTotal;
    if (x === 'o') {
      acc.push(runningTotal);
    }
    return acc;
  }, [] as number[]);
}

// import { parse } from "./solution";

// TODO Add your tests here
// describe("example", function () {
//     it("test", function () {
assert.deepEqual(parse('iiisdoso'), [8, 64]);
assert.deepEqual(parse('iiisxxxdoso'), [8, 64]);
//     });
// });
