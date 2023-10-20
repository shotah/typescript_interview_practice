function plusOne(digits: number[]): number[] {
  const lastDigit = (digits.pop() || 0) + 1;
  // deals with single values
  if (lastDigit.toString().length == 1) {
    digits.push(lastDigit);
    return digits;
  }
  // deals with multi values:
  const prevDigits = lastDigit.toString().split('');
  const lastDigits: number[] = [];
  lastDigits.unshift(Number(prevDigits[1]));
  let prevDigit = (digits.pop() || 0) + Number(prevDigits[0]);
  while (prevDigit.toString().length > 1) {
    const prevDigits = prevDigit.toString().split('');
    lastDigits.unshift(Number(prevDigits[1]));
    prevDigit = (digits.pop() || 0) + Number(prevDigits[0]);
  }
  lastDigits.unshift(Number(prevDigit));
  lastDigits.forEach(n => digits.push(Number(n)));
  return digits;
}

let digits = [1, 2, 3];
// Output: [1,2,4]
console.log(plusOne(digits));

digits = [4, 3, 2, 1];
// Output: [4,3,2,2]
console.log(plusOne(digits));

digits = [9];
// Output: [1,0]
console.log(plusOne(digits));

digits = [9, 9];
// Output: [1,0,0]
console.log(plusOne(digits));
