class WeightObj {
    name: string;
    value: number;
    constructor(name: string) {
        this.name = name;
        this.value = name.split('').reduce((a, x) => a + parseInt(x), 0);
    }
}

export function orderWeight(str: string): string {
    const weights: any[] = str.trim().split(/\s+/).map((x: string) => new WeightObj(x));
    weights.sort((a, b) => (a.value > b.value) ? 1 : (a.value === b.value) ? ((a.name > b.name) ? 1 : -1) : -1);
    return weights.map((x) => x.name).join(' ');
}


import { assert } from "chai";

assert.strictEqual(orderWeight("103 123 4444 99 2000"), "2000 103 123 4444 99");
assert.strictEqual(orderWeight("2000 10003 1234000 44444444 9999 11 11 22 123"), "11 11 2000 10003 22 123 1234000 44444444 9999");
assert.strictEqual(orderWeight("  2000 10003 1234000 44444444   9999 11 11 22 123  "), "11 11 2000 10003 22 123 1234000 44444444 9999");

