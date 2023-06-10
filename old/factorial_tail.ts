
const factorials = (num: number): number => {
    let fact: number = num;
    for (let n: number = 1; n < num; n++) {
        fact *= n;
    }
    console.log(`fact: ${fact}`)
    return fact;
}

const reverseNumArr = (num: number): number[] => {
    const rev = num.toString().split('').reverse().map(x => parseInt(x));
    console.log(`rev: ${rev}`);
    return rev;
}

const countZeros = (numArr: number[]): number => {
    const zeros = numArr.reduce((acc, x) => x === 0 ? ++acc : acc, 0);
    console.log(`zeros: ${zeros}`);
    return zeros;
}

export const zeroes = (base: number, num: number) => {
    return countZeros(reverseNumArr(factorials(num)));
};


import { expect } from "chai";

let expected = 2;
let actual = zeroes(10, 10);
expect(actual).to.eql(expected);

expected = 3;
actual = zeroes(16, 16);
expect(actual).to.eql(expected);
