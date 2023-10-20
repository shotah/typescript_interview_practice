function lengthOfLastWord(s: string): number {
  return s.trim().split(' ').slice(-1)[0]?.length || 0;
}

const s = '  fly me   to   the  moon   ';
console.log(lengthOfLastWord(s));
