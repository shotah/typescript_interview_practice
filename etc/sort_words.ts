function sortWordsByQty(input_list: string[]): string[] {
  const dict: Record<string, number> = {};
  input_list.forEach(word => {
    if (word in dict) {
      dict[word] += 1;
    } else {
      dict[word] = 1;
    }
  });
  input_list.sort((a, b) => dict[b] - dict[a]);
  return input_list.filter((w, i) => input_list.indexOf(w) === i);
}

const input_list = [
  'hello',
  'world',
  'world',
  'world',
  'hi',
  'hi',
  'hi',
  'hi',
  'bye',
  'goodbye',
  'night',
  'day',
  'day',
];

console.log(sortWordsByQty(input_list));
