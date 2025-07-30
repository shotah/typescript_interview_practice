// https://leetcode.com/problems/delete-node-in-a-bst/
// 450. Delete Node in a BST
// TypeScript version: 5.8.3
import {assert} from 'chai';

// TreeNode definition
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

// Helper: insert value into BST
function insert(root: TreeNode | null, val: number): TreeNode {
  if (!root) return new TreeNode(val);
  if (val < root.val) root.left = insert(root.left, val);
  else root.right = insert(root.right, val);
  return root;
}

// Helper: build BST from array
function buildBST(arr: number[]): TreeNode | null {
  let root: TreeNode | null = null;
  for (const val of arr) {
    root = insert(root, val);
  }
  return root;
}

// Helper: in-order traversal to array
function inorder(root: TreeNode | null): number[] {
  if (!root) return [];
  return [...inorder(root.left), root.val, ...inorder(root.right)];
}

// Time complexity: O(h) where h is the height of the tree
// Space complexity: O(h) for the recursion stack
// Function to delete a node in a BST
// If the node to be deleted has two children, replace it with its inorder successor
// (the smallest node in the right subtree)
// If it has one child, replace it with that child
// If it has no children, simply remove it
// Returns the root of the modified tree
function deleteNode(root: TreeNode | null, key: number): TreeNode | null {
  if (!root) return null;
  if (key < root.val) {
    // Search in the left subtree
    root.left = deleteNode(root.left, key);
  } else if (key > root.val) {
    // Search in the right subtree
    root.right = deleteNode(root.right, key);
  } else {
    // Node with one child or no child
    if (!root.left) return root.right;
    if (!root.right) return root.left;

    // Node with two children: get the inorder successor (smallest in the right subtree)
    let minNode = root.right;
    // Find the minimum node in the right subtree
    while (minNode.left) {
      minNode = minNode.left;
    }
    root.val = minNode.val; // Copy the inorder successor's value
    root.right = deleteNode(root.right, minNode.val); // Delete the inorder successor
  }
  return root;
}

// Example test
let root = buildBST([5, 3, 6, 2, 4, 7]);
root = deleteNode(root, 3);
assert.deepEqual(
  inorder(root),
  [2, 4, 5, 6, 7],
  'Inorder after deleting 3 should match',
);

// Test deleting root
root = buildBST([5, 3, 6, 2, 4, 7]);
root = deleteNode(root, 5);
assert.deepEqual(
  inorder(root),
  [2, 3, 4, 6, 7],
  'Inorder after deleting 5 should match',
);
