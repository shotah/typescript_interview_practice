function strStr(haystack: string, needle: string): number {
  if (needle === '') return 0;
  let index = -1;
  if (haystack.includes(needle)) {
    index = haystack.indexOf(needle);
  }
  return index;
}

let haystack = 'hello';
let needle = 'll';

haystack = 'sadbutsad';
needle = 'sad';
console.log(strStr(haystack, needle)); // 0

haystack = 'helloworld';
needle = 'world';
console.log(strStr(haystack, needle)); // 0
