function toAlternatingCase(s: string): string {
  return s
    .split('')
    .map(l => (l === l.toUpperCase() ? l.toLowerCase() : l.toUpperCase()))
    .join('');
}

import {assert} from 'chai';

assert.equal(toAlternatingCase('hello world'), 'HELLO WORLD');
assert.equal(toAlternatingCase('HeLLo WoRLD'), 'hEllO wOrld');
assert.equal(toAlternatingCase('1a2b3c4d5e'), '1A2B3C4D5E');
