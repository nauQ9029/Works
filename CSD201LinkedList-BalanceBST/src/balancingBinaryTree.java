import java.util.LinkedList;
import java.util.Queue;

/* TODO:
Missing the cheking class to see which node is making the tree unbalanced
Not yet fully understadning

*/


// Tree node
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode(int val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

// Binray tree node
class BinaryTree {
    TreeNode root;

    BinaryTree() {
        root = null;
    }

    void insert(int val) {
        root = insertRec(root, val);
    }
    
    // Recursive method to insert a value into the binary tree
    TreeNode insertRec(TreeNode root, int val) {
        if (root == null) {
            root = new TreeNode(val);
            return root;
        }

        if (val < root.val)
            root.left = insertRec(root.left, val);
        else if (val > root.val)
            root.right = insertRec(root.right, val);

        return root;
    }

    // Checking if the tree is balanced method
    boolean isBalanced(TreeNode root) {
        if (root == null)
            return true;

        int leftHeight = getHeight(root.left);
        int rightHeight = getHeight(root.right);

        // Return the
        return Math.abs(leftHeight - rightHeight) <= 1 && isBalanced(root.left) && isBalanced(root.right);
    }

    // Method to get the height of A node in the tree
    int getHeight(TreeNode node) {
        if (node == null)
            return 0;

        return Math.max(getHeight(node.left), getHeight(node.right)) + 1;
    }

    // Balancing the tree
    void balanceTree() {
        if (isBalanced(root)) {
            System.out.println("The tree is already balanced.");
            return;
        }

        Queue<TreeNode> nodes = new LinkedList<>();
        inOrderTraversal(root, nodes);

        root = buildBalancedBST(nodes, 0, nodes.size() - 1);
    }

    // In-order Traversal to store nodes in a queue
    void inOrderTraversal(TreeNode node, Queue<TreeNode> nodes) {
        if (node == null)
            return;

        inOrderTraversal(node.left, nodes);
        nodes.add(node);
        inOrderTraversal(node.right, nodes);
    }

    // Method to build a balanced BST from a queue
    TreeNode buildBalancedBST(Queue<TreeNode> nodes, int start, int end) {
        if (start > end)
            return null;

        int mid = (start + end) / 2;

        TreeNode node = nodes.poll();
        node.left = buildBalancedBST(nodes, start, mid - 1);
        node.right = buildBalancedBST(nodes, mid + 1, end);

        return node;
    }

    // Output
    void printInOrder(TreeNode node) {
        if (node == null)
            return;

        printInOrder(node.left);
        System.out.print(node.val + " ");
        printInOrder(node.right);
    }
}


public class balancingBinaryTree {
    public static void main(String[] args) {
        BinaryTree tree = new BinaryTree();
        tree.insert(44);
        tree.insert(17);
        tree.insert(32);
        tree.insert(78);
        tree.insert(50);
        tree.insert(48);
        tree.insert(62);
        tree.insert(54);
        tree.insert(88);

        System.out.println("Original Tree:");
        tree.printInOrder(tree.root);
        System.out.println();

        if (!tree.isBalanced(tree.root)) {
            System.out.println("The tree is unbalanced.");
            tree.balanceTree();
            System.out.println("Balanced Tree:");
            tree.printInOrder(tree.root);
        } else {
            System.out.println("The tree is already balanced.");
        }
    }
}
