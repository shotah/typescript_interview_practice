function fullJustify(words: string[], maxWidth: number): string[] {
  const result: string[] = [];
  let currentLineLength = 0;
  let currentLineWords: string[] = [];
  let currentSpaces = 0;
  for (let i = 0; i < words.length; i++) {
    currentLineWords.push(words[i]);
    currentSpaces = currentLineWords.length - 1;
    currentLineLength += words[i].length;

    // Handles when we need to make a line
    if (currentLineLength + currentSpaces + words[i + 1]?.length >= maxWidth) {
      const missingSpaces = maxWidth - currentLineLength;
      const evenlySpacedSpaces = missingSpaces / (currentLineWords.length - 1);
      // TODO: distribute odd spaces
      let oddSpaces = missingSpaces % (currentLineWords.length - 1);
      const joiner: string = ' '?.repeat(evenlySpacedSpaces);
      const lineToPush: string = currentLineWords.reduce(
        (acc, word, idx): any => {
          if (idx === currentLineWords.length - 1) return (acc += word);
          if (oddSpaces >= 1) {
            acc += word + joiner + ' ';
            oddSpaces--;
          } else {
            acc += word + joiner;
          }
          return acc;
        },
        ''
      );
      result.push(lineToPush);
      console.log(
        currentLineLength,
        currentSpaces,
        maxWidth,
        currentLineWords,
        missingSpaces,
        oddSpaces,
        `"${joiner}"`
      );
      currentLineLength = 0;
      currentLineWords = [];
      currentSpaces = 0;
      continue;
    }

    // Deal with the potenial last line:
    if (words[i + 1] === undefined) {
      // TODO: use current line words instead of words[i]
      if (currentLineWords.length === 1) {
        result.push(words[i] + ' '?.repeat(maxWidth - words[i].length));
      } else {
        const missingSpaces = maxWidth - currentLineLength;
        const evenlySpacedSpaces =
          missingSpaces / (currentLineWords.length - 1);
        // TODO: distribute odd spaces
        let oddSpaces = missingSpaces % (currentLineWords.length - 1);
        const joiner: string = ' '?.repeat(evenlySpacedSpaces);
        const lineToPush: string = currentLineWords.reduce(
          (acc, word, idx): any => {
            if (idx === currentLineWords.length - 1) return (acc += word);
            if (oddSpaces >= 1) {
              acc += word + joiner + ' ';
              oddSpaces--;
            } else {
              acc += word + joiner;
            }
            return acc;
          },
          ''
        );
        result.push(lineToPush);
      }
    }
  }
  return result;
}

let words: string[];
let maxWidth: number;

words = ['This', 'is', 'an', 'example', 'of', 'text', 'justification.'];
maxWidth = 16;
// Output:
// [
//    "This    is    an",
//    "example  of text",
//    "justification.  "
// ]
console.log(fullJustify(words, maxWidth));

(words = ['What', 'must', 'be', 'acknowledgment', 'shall', 'be']),
  (maxWidth = 16);
['What   must   be', 'acknowledgment  ', 'shall be        '];
