function reverseVowels(s: string): string {
  const result = s.split('');
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const stringsVowels = result
    .filter(ltr => vowels.includes(ltr.toLowerCase()))
    .reverse();
  for (let i = 0; i < result.length; i++) {
    if (vowels.includes(result[i].toLowerCase())) {
      const repLtr = stringsVowels.shift();
      if (typeof repLtr === 'string') {
        result[i] = repLtr;
      }
    }
  }
  return result.join('');
}

const s = 'hello';
// Output: "holle"
console.log(reverseVowels(s));
