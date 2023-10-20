export class G964 {
  public static primeFactors = (n: number): string => {
    return G964.formatFactors(G964.listFactors(n));
  };

  private static listFactors = (n: number): number[] => {
    const factors: number[] = [];
    let divisor = 2;
    while (n > 1) {
      if (n % divisor === 0) {
        factors.push(divisor);
        n = n / divisor;
      } else {
        divisor++;
      }
    }
    return factors;
  };

  private static formatFactors = (factors: number[]): string => {
    let factorCount = 1;
    let lastFactor = 0;
    return factors.reduce(
      (acc: string, factor: number, idx: number): string => {
        if (factor !== lastFactor) {
          if (lastFactor !== 0) {
            acc +=
              factorCount > 1
                ? `(${lastFactor}**${factorCount})`
                : `(${lastFactor})`;
          }
          if (idx === factors.length - 1) {
            acc += `(${factor})`;
          }
          factorCount = 0;
        }
        ++factorCount;
        lastFactor = factor;
        return acc;
      },
      ''
    );
  };
}

import {assert} from 'chai';

const convertStringToAny: any = (str: string) => {
  return str;
};

function testing(n: number, expected: string) {
  assert.equal(
    convertStringToAny(G964.primeFactors(n)),
    convertStringToAny(expected)
  );
}

// describe("Fixed Tests", function () {
//     it("Basic tests primeFactors", function () {
testing(7775460, '(2**2)(3**3)(5)(7)(11**2)(17)');
testing(7919, '(7919)');
testing(17 * 17 * 93 * 677, '(3)(17**2)(31)(677)');
//     });
// });
