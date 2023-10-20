function doubleChar(str: string): string {
  return str
    .split('')
    .map(l => l + l)
    .join('');
}

import {assert} from 'chai';
assert.strictEqual(doubleChar('abcd'), 'aabbccdd');
assert.strictEqual(doubleChar('Adidas'), 'AAddiiddaass');
assert.strictEqual(doubleChar('1337'), '11333377');
assert.strictEqual(doubleChar('illuminati'), 'iilllluummiinnaattii');
assert.strictEqual(doubleChar('123456'), '112233445566');
assert.strictEqual(doubleChar('%^&*('), '%%^^&&**((');
