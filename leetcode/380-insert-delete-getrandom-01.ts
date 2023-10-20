class RandomizedSet {
  randomSet = new Set<number>();
  constructor() {}

  insert(val: number): boolean {
    if (this.randomSet.has(val)) return false;
    if (this.randomSet.add(val)) return true;
    return false;
  }

  remove(val: number): boolean {
    if (this.randomSet.has(val)) {
      this.randomSet.delete(val);
      return true;
    }
    return false;
  }

  getRandom(): number {
    return [...this.randomSet][Math.floor(Math.random() * this.randomSet.size)];
  }
}

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */

const obj = new RandomizedSet();
console.log(obj);
const val = 1;
const param_1 = obj.insert(val);
console.log(param_1);
const param_2 = obj.remove(val);
console.log(param_2);
const param_3 = obj.getRandom();
console.log(param_3);
