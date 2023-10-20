const numKeys: {[key: number]: string} = {
  0: 'Zero',
  1: 'One',
  2: 'Two',
  3: 'Three',
  4: 'Four',
  5: 'Five',
  6: 'Six',
  7: 'Seven',
  8: 'Eight',
  9: 'Nine',
};

function switchItUp(intNumber: number): string {
  return numKeys[intNumber];
}

import {assert} from 'chai';

assert.equal(switchItUp(1), 'One');
assert.equal(switchItUp(3), 'Three');
assert.equal(switchItUp(5), 'Five');
