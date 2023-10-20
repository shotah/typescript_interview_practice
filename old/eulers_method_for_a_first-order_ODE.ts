export class G964 {
  public static exEuler = (n: number): number => {
    // your code
    return n;
  };
}

import { assert } from 'chai';

function testing(n: number, expected: number) {
  assert.equal(G964.exEuler(n), expected);
}

testing(1, 0.5);
testing(10, 0.026314);
testing(17, 0.015193);
testing(50, 0.005073);
testing(100, 0.002524);
