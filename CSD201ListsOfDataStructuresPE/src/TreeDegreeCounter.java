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

    public TreeNode(int val) {
        this.val = val;
        left = right = null;
    }
}

public class TreeDegreeCounter{

    public int getDegree(TreeNode root) {
        if (root == null)
            return 0;
        if (root.left == null && root.right == null)
            return 0; // Leaf node
        else if (root.left == null || root.right == null)
            return 1; // Node with one child
        else
            return 2; // Node with two children
    }

    // Sample method to count degrees in the entire tree
    public int countDegrees(TreeNode root) {
        if (root == null)
            return 0;
        int count = getDegree(root);
        count += countDegrees(root.left);
        count += countDegrees(root.right);
        return count;
    }

    // Sample method to create a BST (Binary Search Tree)
    public TreeNode insert(TreeNode root, int val) {
        if (root == null)
            return new TreeNode(val);
        if (val < root.val)
            root.left = insert(root.left, val);
        else if (val > root.val)
            root.right = insert(root.right, val);
        return root;
    }

    // Sample method to create an AVL tree (Balanced Binary Search Tree)
    public TreeNode insertAVL(TreeNode root, int val) {
        if (root == null)
            return new TreeNode(val);
        if (val < root.val) {
            root.left = insertAVL(root.left, val);
        } else if (val > root.val) {
            root.right = insertAVL(root.right, val);
        }
        // Update height and balance factor for AVL tree (not included in this sample)
        return root;
    }

    public static void main(String[] args) {
        TreeDegreeCounter counter = new TreeDegreeCounter();

        // Create a BST
        TreeNode bstRoot = null;
        int[] bstValues = { 50, 30, 70, 20, 40, 60, 80 };
        for (int val : bstValues) {
            bstRoot = counter.insert(bstRoot, val);
        }

        // Count degrees in the BST
        int bstDegreeCount = counter.countDegrees(bstRoot);
        System.out.println("Degree count in BST: " + bstDegreeCount);

        // Create an AVL tree (Balanced BST)
        TreeNode avlRoot = null;
        int[] avlValues = { 50, 30, 70, 20, 40, 60, 80 };
        for (int val : avlValues) {
            avlRoot = counter.insertAVL(avlRoot, val);
        }

        // Count degrees in the AVL tree
        int avlDegreeCount = counter.countDegrees(avlRoot);
        System.out.println("Degree count in AVL tree: " + avlDegreeCount);
    }
}

