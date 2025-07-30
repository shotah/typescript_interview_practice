// function gcdOfStrings(str1: string, str2: string): string {
//     let result = "";
//     // let shortStr = str1.length < str2.length ? str1 : str2;
//     let longestWindow = 0;
//     // lets move the first pointer forward
//     for (let ptrOne = 0; ptrOne <= str1.length; ptrOne++) {
//         // we move second pointer backwards first
//         for (let ptrTwo = str1.length; ptrTwo > 0; ptrTwo--) {
//             if (str2.includes(str1.substring(ptrOne, ptrTwo))) {
//                 if (ptrTwo - ptrOne > longestWindow) {
//                     longestWindow = ptrTwo - ptrOne;
//                     result = str1.substring(ptrOne, ptrTwo)
//                     break;
//                 }
//             }
//         }
//     }
//     return result;
// };

function gcdOfStrings(str1: string, str2: string): string {
  if (str1 + str2 !== str2 + str1) return '';
  if (str1 === str2) return str1;
  if (str1.length > str2.length)
    return gcdOfStrings(str1.substring(str2.length), str2);
  return gcdOfStrings(str1, str2.substring(str1.length));
}

let str1 = 'ABCABC',
  str2 = 'ABC';
// Output: "ABC"
console.log(gcdOfStrings(str1, str2));

(str1 = 'ABABAB'), (str2 = 'ABAB');
// Output: "AB"
console.log(gcdOfStrings(str1, str2));
