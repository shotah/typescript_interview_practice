
class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
    }
}

function makeNodes(roots: (number | null)[]): TreeNode {
    // roots.reverse();
    let rootNode: TreeNode;
    let newNode: TreeNode;
    let prevNode: TreeNode | null = null;
    for (let i = 0; i < roots.length; i++) {
        newNode = new TreeNode(roots[i]!)
        if (!prevNode) {
            rootNode = newNode;
        } else {
            if (i % 2 === 0) {
                prevNode.right = newNode;
            } else {
                prevNode.left = newNode;
            }
        }
        prevNode = newNode;
    }
    return rootNode!;
}

// function rightSideView(root: TreeNode | null): (number | undefined)[] {
//     if (!root) return [];
//     let result: (number | undefined)[] = [];
//     result.push(root?.val);
//     let current = root;
//     while (current?.right) {
//         current = current?.right;
//         result.push(current?.val);
//     }
//     return result;
// };

function rightSideView(root: TreeNode | null): (number | undefined)[] {
    const result: (number | undefined)[] = [];
    const queue = [root];
    if (!root) return [];
    while (queue.length > 0) {
        const size = queue.length;
        for (let i = 0; i < size; i++) {
            const current = queue.shift();
            if (i === size - 1) result.push(current?.val);
            if (current?.left) queue.push(current.left);
            if (current?.right) queue.push(current.right);
        }
    }
    return result;
};

let roots = [1, 2, 3, null, 5, null, 4]
let root = makeNodes(roots);

// Output: [1, 3, 4]
console.log(rightSideView(root));
