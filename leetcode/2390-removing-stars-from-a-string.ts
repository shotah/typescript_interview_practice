function removeStars(s: string): string {
  let output: string[] = [];
  s.split('').forEach(char => {
    if (char === '*') {
      output.pop();
    } else {
      output.push(char);
    }
  });
  return output.join('');
}

let s: string;
let expected: string;

import {assert} from 'chai';
s = 'leet**cod*e';
expected = 'lecoe';
let o = removeStars(s);
console.log(o);
assert.equal(o, expected);

// s = "leet**cod*e"
// output = "lecoe";
// assert.equal(removeStars(s), output);
