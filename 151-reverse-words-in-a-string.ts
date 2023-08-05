// function reverseWords(s: string): string {
//     return s.split(" ").filter(grp => grp !== "").reverse().join(" ");
//     // let result: string[] = [];
//     // let sSplit = s.split(" ");
//     // sSplit.forEach((grp) => {
//     //     if (grp === "") {
//     //         return;
//     //     }
//     //     result.push(grp);
//     // });
//     // console.log(result)
//     // return result.reverse().join(" ");
// };

function reverseWords(s: string): string {
    return s.split(" ").filter(grp => grp !== "").reverse().join(" ");
};

let s = "the sky is blue"
Output: "blue is sky the"
console.log(reverseWords(s));

s = "  hello world  "
Output: "world hello"
console.log(reverseWords(s));

s = "a good   example"
Output: "example good a"
console.log(reverseWords(s));