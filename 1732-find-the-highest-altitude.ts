function largestAltitude(gain: number[]): number {
  let maxAlt = 0;
  let curAlt = 0;
  gain.forEach(step => {
    curAlt += step;
    maxAlt = Math.max(maxAlt, curAlt);
  });
  return maxAlt;
}

const gain = [-5, 1, 5, 0, -7];
const expected = 1;
console.log('got: ', largestAltitude(gain), '\nwant: ', expected);
