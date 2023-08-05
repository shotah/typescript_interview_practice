function reverseVowels(s: string): string {
    let result = s.split("");
    let vowels = ["a", "e", "i", "o", "u"];
    let stringsVowels = result.filter((ltr) => vowels.includes(ltr.toLowerCase())).reverse();
    for (let i = 0; i < result.length; i++) {
        if (vowels.includes(result[i].toLowerCase())) {
            let repLtr = stringsVowels.shift();
            if (typeof repLtr === "string") {
                result[i] = repLtr;
            }
        }
    }
    return result.join("");
};

let s = "hello";
// Output: "holle"
console.log(reverseVowels(s));