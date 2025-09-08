/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author plmin
 */
class TreeNode {

    int val;
    TreeNode left, right;

    TreeNode(int val) {
        this.val = val;
    }
}

class BST {

    TreeNode root;

    public void insert(int val) {
        root = insertRec(root, val);
    }

    private TreeNode insertRec(TreeNode root, int val) {
        if (root == null) {
            root = new TreeNode(val);
            return root;
        }
        if (val < root.val) {
            root.left = insertRec(root.left, val);
        } else if (val > root.val) {
            root.right = insertRec(root.right, val);
        }
        return root;
    }

    public void inorder() {
        inorderRec(root);
        System.out.println();
    }

    private void inorderRec(TreeNode root) {
        if (root != null) {
            inorderRec(root.left);
            System.out.print(root.val + " ");
            inorderRec(root.right);
        }
    }

    public void preorder() {
        preorderRec(root);
        System.out.println();
    }

    private void preorderRec(TreeNode root) {
        if (root != null) {
            System.out.print(root.val + " ");
            preorderRec(root.left);
            preorderRec(root.right);
        }
    }

    public void postorder() {
        postorderRec(root);
        System.out.println();
    }

    private void postorderRec(TreeNode root) {
        if (root != null) {
            postorderRec(root.left);
            postorderRec(root.right);
            System.out.print(root.val + " ");
        }
    }

    public static void main(String[] args) {
        BST bst = new BST();
        bst.insert(2);
        bst.insert(1);
        bst.insert(3);

        System.out.print("BST Inorder Traversal: ");
        bst.inorder();

        System.out.print("BST Preorder Traversal: ");
        bst.preorder();

        System.out.print("BST Postorder Traversal: ");
        bst.postorder();

        System.out.println("AVL Tree:");
        AVLTree avlTree = new AVLTree();
        avlTree.insert(9);
        avlTree.insert(5);
        avlTree.insert(10);
        avlTree.insert(0);
        avlTree.insert(6);
        avlTree.insert(11);
        avlTree.insert(-1);
        avlTree.insert(1);
        avlTree.insert(2);

        System.out.print("AVL Tree Inorder Traversal: ");
        avlTree.inorder();

        System.out.print("AVL Tree Preorder Traversal: ");
        avlTree.preorder();

        System.out.print("AVL Tree Postorder Traversal: ");
        avlTree.postorder();
    }
}

class AVLTree {

    private class AVLNode {

        int val, height;
        AVLNode left, right;

        AVLNode(int val) {
            this.val = val;
            height = 1;
        }
    }

    private AVLNode root;

    private int height(AVLNode node) {
        if (node == null) {
            return 0;
        }
        return node.height;
    }

    private int getBalance(AVLNode node) {
        if (node == null) {
            return 0;
        }
        return height(node.left) - height(node.right);
    }

    private AVLNode rightRotate(AVLNode y) {
        AVLNode x = y.left;
        AVLNode T2 = x.right;
        x.right = y;
        y.left = T2;
        y.height = Math.max(height(y.left), height(y.right)) + 1;
        x.height = Math.max(height(x.left), height(x.right)) + 1;
        return x;
    }

    private AVLNode leftRotate(AVLNode x) {
        AVLNode y = x.right;
        AVLNode T2 = y.left;
        y.left = x;
        x.right = T2;
        x.height = Math.max(height(x.left), height(x.right)) + 1;
        y.height = Math.max(height(y.left), height(y.right)) + 1;
        return y;
    }

    public void insert(int val) {
        root = insertRec(root, val);
    }

    private AVLNode insertRec(AVLNode node, int val) {
        if (node == null) {
            return new AVLNode(val);
        }
        if (val < node.val) {
            node.left = insertRec(node.left, val);
        } else if (val > node.val) {
            node.right = insertRec(node.right, val);
        } else {
            return node;
        }
        node.height = 1 + Math.max(height(node.left), height(node.right));
        int balance = getBalance(node);
        if (balance > 1 && val < node.left.val) {
            return rightRotate(node);
        }
        if (balance < -1 && val > node.right.val) {
            return leftRotate(node);
        }
        if (balance > 1 && val > node.left.val) {
            node.left = leftRotate(node.left);
            return rightRotate(node);
        }
        if (balance < -1 && val < node.right.val) {
            node.right = rightRotate(node.right);
            return leftRotate(node);
        }
        return node;
    }

    public void inorder() {
        inorderRec(root);
        System.out.println();
    }

    private void inorderRec(AVLNode node) {
        if (node != null) {
            inorderRec(node.left);
            System.out.print(node.val + " ");
            inorderRec(node.right);
        }
    }

    public void preorder() {
        preorderRec(root);
        System.out.println();
    }

    private void preorderRec(AVLNode node) {
        if (node != null) {
            System.out.print(node.val + " ");
            preorderRec(node.left);
            preorderRec(node.right);
        }
    }

    public void postorder() {
        postorderRec(root);
        System.out.println();
    }

    private void postorderRec(AVLNode node) {
        if (node != null) {
            postorderRec(node.left);
            postorderRec(node.right);
            System.out.print(node.val + " ");
        }
    }
}

/*
Binary Search Tree (BST):
Pros:
    Efficient search: Binary search trees offer efficient search operations (average case O(log n)) compared to linear data structures like arrays or linked lists (O(n)).
    Ordered structure: BSTs maintain order among elements, making them suitable for applications requiring sorted data.
    Support for range queries: BSTs support range queries efficiently, allowing operations like finding the minimum or maximum element in a range.
Cons:
    Unbalanced trees: Without balancing operations, BSTs can degenerate into unbalanced forms (e.g., skewed trees), leading to degradation in performance (worst-case O(n) for search).
    Performance degradation: In the worst-case scenario, when the tree is highly unbalanced, BST operations can degrade to linear time complexity, losing the advantage of logarithmic time complexity.

AVL Tree:
Pros:
    Self-balancing: AVL trees automatically maintain their balance during insertions and deletions, ensuring that the tree remains relatively balanced.
    Guaranteed logarithmic height: Due to self-balancing, AVL trees guarantee a logarithmic height, providing efficient search, insertion, and deletion operations (O(log n)).
    Improved worst-case performance: AVL trees offer improved worst-case performance compared to unbalanced BSTs, ensuring that no operation degrades beyond logarithmic time complexity.
Cons:
    Overhead: The additional balancing operations come with overhead in terms of memory and computational complexity.
    Complexity: Implementation and maintenance of AVL trees are more complex compared to simple BSTs.
*/