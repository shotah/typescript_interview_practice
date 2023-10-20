// Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

// Each row must contain the digits 1-9 without repetition.
// Each column must contain the digits 1-9 without repetition.
// Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
// Note:

// A Sudoku board (partially filled) could be valid but is not necessarily solvable.
// Only the filled cells need to be validated according to the mentioned rules.

// function isValidSudoku(board: string[][]): boolean {
//     // valid by row:
//     for (let i = 0; i < board.length; i++) {
//         let validate = new Set();
//         for (let j = 0; j < board[i].length; j++) {
//             let entry = board[i][j]
//             if (entry !== ".") {
//                 if (validate.has(entry) === false) {
//                     validate.add(entry);
//                 } else {
//                     return false;
//                 }
//             };
//         }
//     }
//     // valid by column:
//     for (let i = 0; i < board[0].length; i++) {
//         let validate = new Set();
//         for (let j = 0; j < board.length; j++) {
//             let entry = board[j][i]
//             if (entry !== ".") {
//                 if (validate.has(entry) === false) {
//                     validate.add(entry);
//                 } else {
//                     console.log('found dup in column')
//                     return false;
//                 }
//             };
//         }
//     }
//     // valid by 3x3:
//     for (let x = 0; x < board.length; x += 3) {
//         for (let y = 0; y < board[0].length; y += 3) {
//             let validate = new Set();
//             // get your 3x3 values
//             let array = [
//                 board[x][y],         // 0,0
//                 board[x][y + 1],     // 0,1
//                 board[x][y + 2],     // 0,2
//                 board[x + 1][y],     // 1,0
//                 board[x + 1][y + 1], // 1,1
//                 board[x + 1][y + 2], // 1,2
//                 board[x + 2][y],     // 2,0
//                 board[x + 2][y + 1], // 2,1
//                 board[x + 2][y + 2], // 2,2
//             ]
//             for (let i = 0; i < array.length; i++) {
//                 let entry = array[i];
//                 if (entry !== ".") {
//                     if (validate.has(entry) === false) {
//                         validate.add(entry);
//                     } else {
//                         console.log('found dup in square')
//                         return false;
//                     }
//                 };
//             }

//         }
//     }
//     return true;
// };

function isValidSudoku(board: string[][]): boolean {
  const set = new Set();

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const cell = board[i][j];
      if (cell === '.') continue;
      const row = `row: ${i}, value: ${cell}`;
      const column = `column: ${j}, value: ${cell}`;
      const boxNumber = 3 * Math.floor(i / 3) + Math.floor(j / 3);
      const box = `boxNumber: ${boxNumber}, value: ${cell}`;
      if (set.has(row) || set.has(column) || set.has(box)) return false;
      set.add(row).add(column).add(box);
    }
  }
  return true;
}

let board: string[][];

board = [
  ['5', '3', '.', '.', '7', '7', '.', '.', '.'],
  ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
  ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
  ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
  ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
  ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
  ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
  ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
  ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
];
// Output: false
console.log(isValidSudoku(board));

board = [
  ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
  ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
  ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
  ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
  ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
  ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
  ['7', '6', '.', '.', '.', '.', '2', '8', '.'],
  ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
  ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
];
// Output: false
console.log(isValidSudoku(board));

board = [
  ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
  ['6', '.', '3', '1', '9', '5', '.', '.', '.'],
  ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
  ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
  ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
  ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
  ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
  ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
  ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
];
// Output: false
console.log(isValidSudoku(board));

board = [
  ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
  ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
  ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
  ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
  ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
  ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
  ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
  ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
  ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
];
// Output: true
console.log(isValidSudoku(board));

// board = [
//     ["8", "3", ".", ".", "7", ".", ".", ".", "."]
//     , ["6", ".", ".", "1", "9", "5", ".", ".", "."]
//     , [".", "9", "8", ".", ".", ".", ".", "6", "."]
//     , ["8", ".", ".", ".", "6", ".", ".", ".", "3"]
//     , ["4", ".", ".", "8", ".", "3", ".", ".", "1"]
//     , ["7", ".", ".", ".", "2", ".", ".", ".", "6"]
//     , [".", "6", ".", ".", ".", ".", "2", "8", "."]
//     , [".", ".", ".", "4", "1", "9", ".", ".", "5"]
//     , [".", ".", ".", ".", "8", ".", ".", "7", "9"]]
// // Output: false
// console.log(isValidSudoku(board));
