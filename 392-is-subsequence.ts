function isSubsequence(s: string, t: string): boolean {
    if (s.length < 1) return true;
    let sIdx = 0
    for (let tIdx = 0; tIdx < t.length; tIdx++) {
        if (s[sIdx] === t[tIdx]) {
            if (sIdx === s.length - 1) return true;
            sIdx++
        };
    }
    return false;
};

let s = "abc", t = "ahbgdc"
// Output: true
console.log(isSubsequence(s, t))

s = "axc", t = "ahbgdc"
// Output: false
console.log(isSubsequence(s, t))

s = "", t = "ahbgdc"
// Output: true
console.log(isSubsequence(s, t))

s = "aaaaaa", t = "bbaaaa";
// Output: false
console.log(isSubsequence(s, t))
