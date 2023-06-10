// Given an m x n matrix, return all elements of the matrix in spiral order.

// function spiralOrder(matrix: number[][]): number[] {
//     const result: number[] = [];
//     let cords = [0, 0];
//     const visited = new Set();
//     result.push(matrix[cords[0]][cords[1]]);
//     visited.add(`${cords[0]}-${cords[1]}`);

//     const directions = ['right', 'down', 'left', 'up'];
//     let direction = 'right';

//     while (result.length < matrix.length * matrix[0].length) {
//         if (direction === 'right') {
//             if (cords[1] + 1 < matrix[0].length && visited.has(`${cords[0]}-${cords[1] + 1}`) === false) {
//                 cords[1] += 1;
//                 result.push(matrix[cords[0]][cords[1]]);
//                 visited.add(`${cords[0]}-${cords[1]}`);
//             } else {
//                 direction = directions[(directions.indexOf(direction) + 1) % directions.length];
//             }
//             continue;
//         }

//         if (direction === 'down') {
//             if (cords[0] + 1 < matrix.length && visited.has(`${cords[0] + 1}-${cords[1]}`) === false) {
//                 cords[0] += 1;
//                 result.push(matrix[cords[0]][cords[1]]);
//                 visited.add(`${cords[0]}-${cords[1]}`);
//             } else {
//                 direction = directions[(directions.indexOf(direction) + 1) % directions.length];
//             }
//             continue;
//         }

//         if (direction === 'left') {
//             if (cords[1] - 1 >= 0 && visited.has(`${cords[0]}-${cords[1] - 1}`) === false) {
//                 cords[1] -= 1;
//                 result.push(matrix[cords[0]][cords[1]]);
//                 visited.add(`${cords[0]}-${cords[1]}`);
//             } else {
//                 direction = directions[(directions.indexOf(direction) + 1) % directions.length];
//             }
//             continue;
//         }

//         if (direction === 'up') {
//             if (cords[0] - 1 >= 0 && visited.has(`${cords[0] - 1}-${cords[1]}`) === false) {
//                 cords[0] -= 1;
//                 result.push(matrix[cords[0]][cords[1]]);
//                 visited.add(`${cords[0]}-${cords[1]}`);
//             } else {
//                 direction = directions[(directions.indexOf(direction) + 1) % directions.length];
//             }
//             continue;
//         }

//     }
//     return result;
// };

function spiralOrder(matrix: number[][]): number[] {
    const result: number[] = [];
    let cords = [0, 0];
    const visited = new Set();
    result.push(matrix[cords[0]][cords[1]]);
    visited.add(`${cords[0]}-${cords[1]}`);

    const directions = ['right', 'down', 'left', 'up'];
    let direction = 'right';

    while (result.length < matrix.length * matrix[0].length) {
        if (direction === 'right') {
            if (cords[1] + 1 < matrix[0].length && visited.has(`${cords[0]}-${cords[1] + 1}`) === false) {
                cords[1] += 1;
                result.push(matrix[cords[0]][cords[1]]);
                visited.add(`${cords[0]}-${cords[1]}`);
            } else {
                direction = directions[(directions.indexOf(direction) + 1) % directions.length];
            }
            continue;
        }

        if (direction === 'down') {
            if (cords[0] + 1 < matrix.length && visited.has(`${cords[0] + 1}-${cords[1]}`) === false) {
                cords[0] += 1;
                result.push(matrix[cords[0]][cords[1]]);
                visited.add(`${cords[0]}-${cords[1]}`);
            } else {
                direction = directions[(directions.indexOf(direction) + 1) % directions.length];
            }
            continue;
        }

        if (direction === 'left') {
            if (cords[1] - 1 >= 0 && visited.has(`${cords[0]}-${cords[1] - 1}`) === false) {
                cords[1] -= 1;
                result.push(matrix[cords[0]][cords[1]]);
                visited.add(`${cords[0]}-${cords[1]}`);
            } else {
                direction = directions[(directions.indexOf(direction) + 1) % directions.length];
            }
            continue;
        }

        if (direction === 'up') {
            if (cords[0] - 1 >= 0 && visited.has(`${cords[0] - 1}-${cords[1]}`) === false) {
                cords[0] -= 1;
                result.push(matrix[cords[0]][cords[1]]);
                visited.add(`${cords[0]}-${cords[1]}`);
            } else {
                direction = directions[(directions.indexOf(direction) + 1) % directions.length];
            }
            continue;
        }
    }
    return result;
}

let matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
// Output: [1,2,3,6,9,8,7,4,5]
console.log(spiralOrder(matrix));

matrix = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]
// Output: [1,2,3,4,8,12,11,10,9,5,6,7]
console.log(spiralOrder(matrix));
