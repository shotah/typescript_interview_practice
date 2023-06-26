// Given an array of integers citations where citations[i] is the number of citations a researcher received for their ith paper, return the researcher's h-index.

// According to the definition of h-index on Wikipedia: The h-index is defined as the maximum value of h such that the given researcher has published at least h papers that have each been cited at least h times.



// Example 1:

// Input: citations = [3,0,6,1,5]
// Output: 3
// Explanation: [3,0,6,1,5] means the researcher has 5 papers in total and each of them had received 3, 0, 6, 1, 5 citations respectively.
// Since the researcher has 3 papers with at least 3 citations each and the remaining two with no more than 3 citations each, their h-index is 3.
// Example 2:

// Input: citations = [1,3,1]
// Output: 1

// function hIndex(citations: number[]): number {
//     console.log(citations);
//     let avg = Math.floor(citations.length / 2);
//     console.log(avg);
//     // gives you two:
//     citations.sort((a, b) => a - b);
//     // sorts the list in ascending order
//     console.log(citations);

//     return citations[avg];
//     // return the number just right of the avg
// };

function hIndex(citations: number[]): number {
    citations.sort((a, b) => b - a);
    let citationCount = 0;
    for (let i = 0; i < citations.length; i++) {
        if (citations[i] <= citationCount) {
            return citationCount;
        }
        citationCount++;
    }
    return citationCount;
};


let citations: number[] = [];
citations = [3, 0, 6, 1, 5]
// Output: 3
console.log(hIndex(citations));

citations = [1, 3, 1]
// Output: 1
console.log(hIndex(citations));

citations = [100]
// Output: 1
console.log(hIndex(citations));
