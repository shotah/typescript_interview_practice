// function candy(ratings: number[]): number {
//     let candies: number[] = new Array(ratings.length).fill(1);
//     for (let i = 1; i < ratings.length; i++) {
//         if (ratings[i] > ratings[i - 1]) {
//             candies[i] = candies[i - 1] + 1;
//         }
//     }
//     for (let i = ratings.length - 2; i >= 0; i--) {
//         if (ratings[i] > ratings[i + 1]) {
//             candies[i] = Math.max(candies[i], candies[i + 1] + 1);
//         }
//     }
//     return candies.reduce((a, b) => a + b);
// };

function candy(ratings: number[]): number {
    let candies: number[] = new Array(ratings.length).fill(1);
    ratings.forEach((rating, idx) => {
        if (rating > ratings[idx - 1]) {
            candies[idx] = Math.max(candies[idx], candies[idx - 1] + 1);
        }
    })
    for (let i = ratings.length - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1]) {
            candies[i] = Math.max(candies[i], candies[i + 1] + 1);
        }
    }
    console.log(candies)
    return candies.reduce((a, b) => a + b);
};

let ratings = [1, 0, 2]
// Output: 5
console.log(candy(ratings))

ratings = [1, 2, 2]
// Output: 4
console.log(candy(ratings))

ratings = [1, 2, 87, 87, 87, 2, 1];
// Output: 13
console.log(candy(ratings))

ratings = [1, 6, 10, 8, 7, 3, 2]
// Output: 18
console.log(candy(ratings))
