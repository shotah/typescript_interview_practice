
// function minimumTotal(triangle: number[][]): number {
//     let totalSum: number = 0;
//     let columnIndex: number = 0;
//     for (let i = 0; i < triangle.length; i++) {
//         if (triangle?.[i]?.[columnIndex + 1] && triangle?.[i]?.[columnIndex] - triangle?.[i]?.[columnIndex + 1] > 0) {
//             console.log(triangle?.[i]?.[columnIndex] + 1)
//             totalSum += triangle?.[i]?.[columnIndex + 1];
//             columnIndex++
//         } else {
//             console.log(triangle?.[i]?.[columnIndex])
//             totalSum += triangle?.[i]?.[columnIndex];
//         }
//         console.log(totalSum);
//     };
//     return totalSum;
// };

// function minimumTotal(triangle: number[][]): number {
//     let sums: number[][];
//     for (let i = 0; i < triangle.length; i++) {
//         for (let j = 0; j < triangle[i].length; j++) {

//         }
//     };
// };

function minimumTotal(triangle: number[][]): number {
    if (triangle.length === 1) return triangle[0][0];
    for (let row: number = triangle.length - 2; row >= 0; row--) {
        for (let col: number = 0; col < triangle[row].length; col++) {
            triangle[row][col] += Math.min(triangle[row + 1][col], triangle[row + 1][col + 1]);
        }
    }
    return triangle[0][0];
};

let triangle: number[][];

triangle = [[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]
// Output: 11
console.log(minimumTotal(triangle));

triangle = [[-1], [2, 3], [1, -1, -3]]
// Output: -1
console.log(minimumTotal(triangle));
