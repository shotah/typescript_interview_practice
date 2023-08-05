

function mergeAlternately(word1: string, word2: string): string {
    let result = "";
    let i = 0;
    while (i < word1.length && i < word2.length) {
        result += word1[i]
        result += word2[i]
        i++
    }
    if (i < word1.length) {
        result += word1.slice(i);
    }
    if (i < word2.length) {
        result += word2.slice(i);
    }
    return result;
};



let word1 = "abc", word2 = "pqr"
// Output: "apbqcr"
console.log(mergeAlternately(word1, word2));

word1 = "ab", word2 = "pqrs"
// Output: "apbqrs"
console.log(mergeAlternately(word1, word2));