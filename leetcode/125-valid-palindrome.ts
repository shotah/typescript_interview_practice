function isPalindrome(s: string): boolean {
  const formatted = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  console.log(formatted);
  for (let i = 0; i < formatted.length / 2; i++) {
    if (formatted[i] !== formatted[formatted.length - 1 - i]) return false;
  }
  return true;
}

let s = 'A man, a plan, a canal: Panama';
// output: true
console.log(isPalindrome(s));

s = 'race a car';
// output: false
console.log(isPalindrome(s));

s = ' ';
// output: true
console.log(isPalindrome(s));

s = '0P';
// output: false
console.log(isPalindrome(s));
