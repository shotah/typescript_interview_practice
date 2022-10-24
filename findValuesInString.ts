/*
ACME's String Builders division have come up with a new metric for the cost of constructing strings! It works as follows:

Find all distinct characters that appear in the string. For each of those characters, 

* count the number of occurrences.
* Square each of those counts. 
* Sum all those squares to get the value of the string.

For example, the string "abacaba" contains 4 'a's, 2 'b's, and 1 'c'. Thus, its value is 4x4 + 2x2 + 1x1 = 21.

Write a function cost that accepts a string, str, and returns the integer value of the cost.
def cost(str)
*/
// const createSet = (strArr) => {
//     return strArr.reduce((acc, val) => {
//         if (!acc.has(val)) {
//             acc.add(val);
//         }
//         return acc;
//     }, new Set());
// }

// const getCounts = (paramSet, strArr) => {
//     const resultObjs = {};
//     strArr.map(val => {
//         if (paramSet.has(val)) {
//             resultObjs[val] = resultObjs[val] ? resultObjs[val] + 1 : resultObjs[val] = 1;
//         }
//     });
//     return resultObjs;
// };

// const squareAndSum = (paramSet, countArr) => {
//     let result = 0;
//     paramSet.forEach(val => {
//         result += (countArr[val] ** 2)
//     });
//     return result;
// };

// const cost = (str) => {
//     const strArr = str.split('')
//     const paramSet = createSet(strArr);
//     const countArr = getCounts(paramSet, strArr);
//     const result = squareAndSum(paramSet, countArr);
//     return result;
// };

// type result = {
//     [key: string]: number
// }

// const cost = (str: string): number => {
//     const r: result = {};
//     [...str].forEach((e: string) => r[e] = r[e] ? ++r[e] : 1);
//     return Object.entries(r).reduce((acc, e) => acc += (e[1] ** 2), 0);
// };


const cost = (str: string): number => {
    return Object.entries(
        [...str].reduce<Record<string, number>>((a, e) => {
            a[e] = a[e] ? ++a[e] : 1
            return a;
        }, {})
    ).reduce<number>((b, n) => b += (n[1] ** 2), 0);
};

import { expect } from "chai";

expect(cost('4c9219dc73c0f4511264fcffb63f04de')).to.eql(94);
expect(cost('1331b7b6ba60c6516ca3b8bd4f384ede')).to.eql(94);
expect(cost('e3ae663e786bd4c1477a8f4cd152be6f')).to.eql(84);
expect(cost('671a1f51c2277d464452344612b94e90')).to.eql(102);
expect(cost('6dacacfdd431da08d1a8e0bdb2ae069e')).to.eql(104);