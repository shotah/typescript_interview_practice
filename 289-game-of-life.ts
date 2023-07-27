/**
 Do not return anything, modify board in-place instead.
 */

//  Any live cell with fewer than two live neighbors dies as if caused by under-population.
//  Any live cell with two or three live neighbors lives on to the next generation.
//  Any live cell with more than three live neighbors dies, as if by over-population.
//  Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

// function gameOfLife(board: number[][]): void {
//     let newBoard = JSON.parse(JSON.stringify(board));
//     // depth
//     for (let i = 0; i < board.length; i++) {
//         // width
//         for (let j = 0; j < board[0].length; j++) {
//             let isAlive = (board[i][j] === 1);
//             let neighborCount = (board?.[i - 1]?.[j - 1] || 0) + (board?.[i - 1]?.[j] || 0) + (board?.[i - 1]?.[j + 1] || 0) +
//                 (board?.[i]?.[j - 1] || 0) + (board?.[i]?.[j + 1] || 0) +
//                 (board?.[i + 1]?.[j - 1] || 0) + (board?.[i + 1]?.[j] || 0) + (board?.[i + 1]?.[j + 1] || 0)
//             // console.log("isAlive: ", isAlive, "cell: ", i, j, "neighbors: ", neighborCount);
//             if (isAlive && neighborCount < 2) {
//                 // console.log("kill cell will too few neighbors", i, j);
//                 newBoard[i][j] = 0;
//             } else if (isAlive === false && neighborCount === 3) {
//                 // console.log("make alive with exactly 3 neighbors", i, j);
//                 newBoard[i][j] = 1;
//             } else if (isAlive && neighborCount > 3) {
//                 // console.log("kill because of over population", i, j);
//                 newBoard[i][j] = 0;
//             }
//         }
//     }
//     // depth
//     for (let i = 0; i < board.length; i++) {
//         // width
//         for (let j = 0; j < board[0].length; j++) {
//             board[i][j] = newBoard[i][j];
//         }
//     };
//     // board = newBoard;
//     // board = JSON.parse(JSON.stringify(newBoard));
//     // console.log(newBoard);
//     // console.log(board);
// };

function gameOfLife(board: number[][]): void {
    // let newBoard = JSON.parse(JSON.stringify(board));
    let newBoard: number[][] = [[]];
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            newBoard[i][j] = board[i][j];
        }
    };
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            let isAlive = (board[i][j] === 1);
            let neighborCount = (board?.[i - 1]?.[j - 1] || 0) + (board?.[i - 1]?.[j] || 0) + (board?.[i - 1]?.[j + 1] || 0) +
                (board?.[i]?.[j - 1] || 0) + (board?.[i]?.[j + 1] || 0) +
                (board?.[i + 1]?.[j - 1] || 0) + (board?.[i + 1]?.[j] || 0) + (board?.[i + 1]?.[j + 1] || 0)
            if (neighborCount < 2) {
                newBoard[i][j] = 0;
            } else if (neighborCount === 3) {
                newBoard[i][j] = 1;
            } else if (neighborCount > 3) { newBoard[i][j] = 0 };
        }
    }
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            board[i][j] = newBoard[i][j];
        }
    };
};

let board: number[][];

board = [[0, 1, 0], [0, 0, 1], [1, 1, 1], [0, 0, 0]]
// Output: [[0,0,0],[1,0,1],[0,1,1],[0,1,0]]
gameOfLife(board);

