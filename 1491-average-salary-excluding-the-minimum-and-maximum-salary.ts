// You are given an array of unique integers salary where salary[i] is the salary of the ith employee.
// Return the average salary of employees excluding the minimum and maximum salary. Answers within 10-5 of the actual answer will be accepted.

function average(salary: number[]): number {
    let min = Math.min(...salary);
    let max = Math.max(...salary);
    delete salary[salary.indexOf(min)];
    delete salary[salary.indexOf(max)];
    return salary.reduce((a, b) => a + b) / (salary.length - 2);
};

let salary: number[] = [];

salary = [4000, 3000, 1000, 2000];
console.log(average(salary)); // 2500.00000