
// function closeStrings(word1: string, word2: string): boolean {
//     if (word1.length !== word2.length) return false;
//     const dict1: Record<string, number> = {};
//     const dict2: Record<string, number> = {};
//     for (let i = 0; i < word1.length; i++) {
//         if (word1 in dict1) {
//             dict1[word1[i]] += 1;
//         } else {
//             dict1[word1[i]] = 1;
//         }
//         if (word2 in dict2) {
//             dict2[word2[i]] += 1;
//         } else {
//             dict2[word2[i]] = 1;
//         }
//     }
//     const arr1: number[] = [];
//     const arr2: number[] = [];
//     for (const [key, value] of Object.entries(dict1)) {
//         if (key in dict2) return false;
//         arr1.push(value);
//         arr2.push(dict2[key])
//     }
//     arr1.sort();
//     arr2.sort();
//     return arr1.toString() === arr2.toString();
// };

// function closeStrings(word1: string, word2: string): boolean {
//     // check if two words have equals length, if no return false
//     if (word1.length !== word2.length) return false;
//     // declare first frequency map
//     const map1 = new Map<string, number>();
//     // declare second frequency map
//     const map2 = new Map<string, number>();
//     // iterate ower word length:
//     for (let i = 0; i < word1.length; i++) {
//         // calculate frequency of first word
//         map1.set(word1[i], map1.has(word1[i]) ? map1.get(word1[i]) ?? 0 + 1 : 1)
//         // claculate frequency of second word
//         map2.set(word2[i], map2.has(word2[i]) ? map2.get(word2[i]) ?? 0 + 1 : 1)
//     }
//     // declare array for first word
//     const arr1: number[] = [];
//     // declare array for second word
//     const arr2: number[] = [];
//     // iterate over first frequency map:
//     for (const [key, value] of map1) {
//         // if fsecond map don't have first map key, return false
//         if (!map2.has(key)) return false;
//         // push frequency value from first map to first array
//         arr1.push(value)
//         // push frequency value from second map to second array
//         let qtyDict2 = map2.get(key);
//         if (qtyDict2) arr2.push(qtyDict2);
//     }
//     // sort first array
//     arr1.sort()
//     // sort second array
//     arr2.sort()
//     // stringify arrays and check if results are equals, return true if yes, false otherwise
//     return arr1.toString() === arr2.toString();
// };

// function closeStrings(word1: string, word2: string): boolean {
//     if (word1.length !== word2.length) return false;
//     const map1 = new Map<string, number>();
//     const map2 = new Map<string, number>();
//     for (let i = 0; i < word1.length; i++) {
//         map1.set(word1[i], map1.get(word1[i]) ?? 1)
//         map2.set(word2[i], map2.get(word2[i]) ?? 1)
//     }
//     const sortedMap1 = new Map([...map1.entries()].sort());
//     const sortedMap2 = new Map([...map2.entries()].sort());
//     let diffCount = 2;
//     for (const [key, value] of sortedMap1) {
//         if (value in map2.values() === false)
//             if (sortedMap2.get(key) !== value) diffCount--;
//         if (diffCount == 0) return false;
//     };
//     return true;
// };

function closeStrings(word1: string, word2: string): boolean {
    if (word1.length !== word2.length) return false;
    // fill with every letter of the alphabet set to zero
    const w1c = new Array(26).fill(0);
    const w2c = new Array(26).fill(0);
    // fillout arrays
    for (let i = 0; i < word1.length; i++) {
        // user alpha location to increment 
        w1c[word1[i].charCodeAt(0) - 'a'.charCodeAt(0)]++
        w2c[word2[i].charCodeAt(0) - 'a'.charCodeAt(0)]++
    };
    console.log(w1c)
    // Validates all chars exists
    if (!w1c.every((val, idx) => (val !== 0) === (w2c[idx] !== 0))) return false;
    w1c.sort();
    w2c.sort();
    // Validate all qty is correct per entry
    return w1c.every((val, i) => val === w2c[i]);
}

import { assert } from 'chai';
let word1: string;
let word2: string;
let output: boolean;

word1 = "abc";
word2 = "bca"
output = true;
assert.equal(closeStrings(word1, word2), output);

word1 = "abbzzca";
word2 = "babzzcz";
output = false;
assert.equal(closeStrings(word1, word2), output);