function solution(queries) {
  const storage = [];
  const result = [];
  for (let i = 0; i < queries.length; i++) {
    if (queries[i][0] === 'ADD') {
      storage.push(queries[i][1]);
      result.push('');
    } else if (queries[i][0] === 'REMOVE') {
      const index = storage.indexOf(queries[i][1]);
      console.log('removing:', queries[i][1], 'at index:', index);
      if (index !== -1) {
        delete storage[index];
        result.push('true');
      } else {
        result.push('false');
      }
    } else if (queries[i][0] === 'EXISTS') {
      result.push(`${storage.includes(queries[i][1])}`);
    } else if (queries[i][0] === 'GET_NEXT') {
      let flagFound = false;
      const sortedStorage = storage.sort((l, r) => r - l);
      console.log(sortedStorage);
      for (let j = storage.length; j >= 0; j--) {
        if (Number(sortedStorage[j]) > Number(queries[i][1])) {
          result.push(sortedStorage[j]);
          flagFound = true;
          break;
        }
      }
      if (!flagFound) {
        result.push('');
      }
    }
  }
  return result;
}

// queries = [["ADD", "1"],
// ["ADD", "2"],
// ["ADD", "5"],
// ["ADD", "2"],
// ["EXISTS", "2"],
// ["EXISTS", "5"],
// ["EXISTS", "1"],
// ["EXISTS", "4"],
// ["EXISTS", "3"],
// ["EXISTS", "0"]]

// console.log(solution(queries));

// queries = [["ADD", "1"],
// ["ADD", "2"],
// ["ADD", "2"],
// ["ADD", "3"],
// ["EXISTS", "1"],
// ["EXISTS", "2"],
// ["EXISTS", "3"],
// ["REMOVE", "2"],
// ["REMOVE", "1"],
// ["EXISTS", "2"],
// ["EXISTS", "1"]]

// // GOT:
// // [
// //   '',      '',
// //   '',      '',
// //   'true',  'true',
// //   'true',  'true',
// //   'false', 'true',
// //   'true'
// // ]

// // EXPECTED:
// // ["", "", "", "", "true", "true", "true", "true", "true", "true", "false"]
// console.log(solution(queries));

queries = [
  ['ADD', '0'],
  ['ADD', '1'],
  ['ADD', '1'],
  ['ADD', '11'],
  ['ADD', '22'],
  ['ADD', '3'],
  ['ADD', '5'],
  ['GET_NEXT', '0'],
  ['GET_NEXT', '1'],
  ['REMOVE', '1'],
  ['GET_NEXT', '1'],
  ['ADD', '0'],
  ['ADD', '1'],
  ['ADD', '2'],
  ['ADD', '1'],
  ['GET_NEXT', '1'],
  ['GET_NEXT', '2'],
  ['GET_NEXT', '3'],
  ['GET_NEXT', '5'],
];

console.log(solution(queries));
