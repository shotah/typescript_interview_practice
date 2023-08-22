function compress(chars: string[]): number {
    let curLength: number = 0;
    let pre: string = "";
    let i = 0;
    while (i <= chars.length) {
        // console.log(chars[i])
        if (chars[i] === pre) {
            chars.splice(i, 1)
            curLength++
            continue
        }
        if (curLength > 1) {
            let stringLength = curLength.toString().split("");
            console.log(stringLength);
            chars.splice(i, 0, ...stringLength)
            i += stringLength.length;
        }
        pre = chars[i]
        curLength = 1;
        i++
    }
    console.log(chars);
    return chars.length;
};


let chars = ["a", "a", "b", "b", "c", "c", "c"]
// Output: Return 6, and the first 6 characters of the input array should be: ["a","2","b","2","c","3"]
console.log(compress(chars));

chars = ["a", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b"]
// Output: Return 4, and the first 4 characters of the input array should be: ["a","b","1","2"].
console.log(compress(chars));

chars = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"]
console.log(chars.length);
console.log(compress(chars));
