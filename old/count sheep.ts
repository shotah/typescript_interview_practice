export function countSheep(num: number): string {
  return [...Array(num + 1)]
    .map((_, i) => (i !== 0 ? `${i} sheep...` : ''))
    .join('');
}

console.log(countSheep(4));

import {assert} from 'chai';

assert.equal(countSheep(0), '');
assert.equal(countSheep(1), '1 sheep...');
assert.equal(countSheep(2), '1 sheep...2 sheep...');
assert.equal(countSheep(3), '1 sheep...2 sheep...3 sheep...');
assert.equal(countSheep(4), '1 sheep...2 sheep...3 sheep...4 sheep...');
