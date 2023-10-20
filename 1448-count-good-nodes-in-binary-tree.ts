/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function goodNodes(root: TreeNode | null): number {
  // there is no tree so there can be no good nodes
  if (!root) return 0;

  const max = root.val;
  return dfs(root, max);
}

function dfs(node: TreeNode, max: number): number {
  //leaf node, nothing to add here
  if (!node) return 0;

  let isGood: 0 | 1 = 0;
  if (node.val >= max) {
    //if node is >= max that means this is a good node... add one to the count + get the new max
    isGood = 1;
    max = node.val;
  }

  return dfs(node?.left!, max) + dfs(node?.right!, max) + isGood;
}

const root = [3, 1, 4, 3, null, 1, 5];
// Output: 4

// Output: [1, 3, 4]
console.log(goodNodes(root));
