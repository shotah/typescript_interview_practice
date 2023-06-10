// function canConstruct(ransomNote: string, magazine: string): boolean {
//     if (ransomNote.length > magazine.length) return false;
//     let magPointer = 0;
//     let tracker = '';
//     for (let i = 0; i < ransomNote.length; i++) {
//         for (let j = magPointer; j < magazine.length; j++) {
//             if (ransomNote[i] === magazine[j]) {
//                 tracker = tracker.concat(magazine[j]);
//                 magPointer = j + 1;
//                 break
//             }
//         }
//     }
//     return ransomNote === tracker;
// };

function canConstruct(ransomNote: string, magazine: string): boolean {
    if (ransomNote.length > magazine.length) return false;
    const tracker = new Map<string, number>();
    magazine.split('').forEach(l => {
        tracker.set(l, (tracker.get(l) || 0) + 1)
    })
    let hasValues = true;
    ransomNote.split('').forEach(l => {
        if ((tracker.get(l) || 0) >= 1) {
            tracker.set(l, (tracker.get(l) || 0) - 1)
        } else {
            hasValues = false
            return;
        }

    })
    return hasValues;
};

let ransomNote = "a", magazine = "b"
// output: false
console.log(canConstruct(ransomNote, magazine));

ransomNote = "aa", magazine = "ab"
// output: false
console.log(canConstruct(ransomNote, magazine));

ransomNote = "aa", magazine = "aab"
// output: true
console.log(canConstruct(ransomNote, magazine));

ransomNote = "aab", magazine = "baa"
// output: true
console.log(canConstruct(ransomNote, magazine));
