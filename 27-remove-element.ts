// function removeElement(nums: number[], val: number): number {
//     return nums.filter(num => num !== val).length;
// };

function removeElement(nums: number[], val: number): number {
  const indexes: number[] = [];
  nums.forEach((num, index) => {
    if (num === val) {
      indexes.push(index);
    }
  });
  indexes.reverse().forEach(index => {
    nums.splice(index, 1);
  });
  return nums.length;
}

let result = 0;

result = removeElement([3, 2, 2, 3], 3);
console.log(result);

result = removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2);
console.log('expects: [0,1,4,0,3]');
console.log(result);
