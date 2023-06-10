// Given a string s and an integer k, return the maximum number of vowel letters in any substring of s with length k.
// Vowel letters in English are 'a', 'e', 'i', 'o', and 'u'.

const V = new Set(['a', 'e', 'i', 'o', 'u']);

// function maxVowels(s: string, k: number): number {
//     let max = 0;
//     let count = 0;
//     let start = 0;
//     for (let i = 0; i < s.length; i++) {
//         if (V.has(s[i])) {
//             count++;
//         }
//         if (i - start + 1 === k) {
//             max = Math.max(max, count);
//             if (V.has(s[start])) {
//                 count--;
//             }
//             start++;
//         }
//     }
//     return max;
// }

function maxVowels(s: string, k: number): number {
    let max = 0;
    let count = 0;
    for (let i = 0; i < s.length; i++) {
        if (V.has(s[i])) {
            count++;
        }
        if (i >= k && V.has(s[i - k])) {
            count--;
        }
        max = Math.max(max, count);
    };
    return max;
}

console.log(maxVowels('abciiidef', 3));
// Output: 3

console.log(maxVowels('aeiou', 2));
// Output: 2

console.log(maxVowels('leetcode', 3));
// Output: 2
