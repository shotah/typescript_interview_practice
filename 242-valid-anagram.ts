// Given two strings s and t, return true if t is an anagram of s, and false otherwise.
// An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
// typically using all the original letters exactly once.

// function isAnagram(s: string, t: string): boolean {
//     if (s.length !== t.length) return false;
//     let result = true;
//     s.split('').forEach((char) => {
//         if (t.includes(char) === false) {
//             result = false;
//         }
//         t = t.replace(char, '');
//     });
//     return result;
// };

function isAnagram(s: string, t: string): boolean {
    if (s.length !== t.length) return false;
    let result = true;
    const sMap = new Map();
    const tMap = new Map();
    s.split('').forEach((char) => {
        if (sMap.has(char)) {
            sMap.set(char, sMap.get(char) + 1);
        } else {
            sMap.set(char, 1);
        }
    });
    t.split('').forEach((char) => {
        if (tMap.has(char)) {
            tMap.set(char, tMap.get(char) + 1);
        } else {
            tMap.set(char, 1);
        }
    });
    sMap.forEach((value, key) => {
        if (tMap.has(key) === false || tMap.get(key) !== value) {
            result = false;
        }
    });
    return result;
}


console.log(isAnagram('anagram', 'nagaram'));
// Output: true

console.log(isAnagram('rat', 'car'));
// Output: false

console.log(isAnagram('a', 'ab'));
// Output: false
