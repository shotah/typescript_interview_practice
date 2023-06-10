function lengthOfLastWord(s: string): number {
    return s.trim().split(' ').slice(-1)[0]?.length || 0;
};


let s = '  fly me   to   the  moon   '
console.log(lengthOfLastWord(s));
