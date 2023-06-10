export function sumDigits(n: number): number {
    return Array.from(Math.abs(n).toString()).map(Number).reduce((a, x) => a += x, 0)
}

// Since Node 10, we're using Mocha.
// You can use `chai` for assertions.
// import chai from "chai";
const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;

assert.equal(sumDigits(10), 1);
assert.equal(sumDigits(99), 18);
assert.equal(sumDigits(-32), 5);

