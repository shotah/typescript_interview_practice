class root {
  val: number;
  left: root | null;
  right: root | null;

  constructor(
    val: number = 0,
    left: root | null = null,
    right: root | null = null,
  ) {
    this.val = val;
    this.left = left;
    this.right = right;
  }

  
}

function dfs(root: root | null, target: number): root | null {
  if (!root) return null;
  if (root.val == target) return root;

  let left = dfs(root.left, target);
  if (left != null) return left;
  return dfs(root.right, target);
}

let testRoot = new root(1, new root(2, new root(4), new root(5)), new root(3));
console.log(testRoot);
let result = dfs(testRoot, 5);
console.log(result);
