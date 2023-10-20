function getGrade(a: number, b: number, c: number): string {
  const numAvg: number = (a + b + c) / 3;
  if (numAvg >= 90) return 'A';
  if (numAvg >= 80) return 'B';
  if (numAvg >= 70) return 'C';
  if (numAvg >= 60) return 'D';
  return 'F';
}

import {assert} from 'chai';
assert.strictEqual(getGrade(95, 90, 93), 'A');
assert.strictEqual(getGrade(100, 85, 96), 'A');
assert.strictEqual(getGrade(70, 70, 100), 'B');
assert.strictEqual(getGrade(70, 70, 70), 'C');
assert.strictEqual(getGrade(65, 70, 59), 'D');
assert.strictEqual(getGrade(44, 55, 52), 'F');
assert.strictEqual(getGrade(0, 0, 0), 'F');
