class Node {
    int info;
    Node left, right;

    Node(int x) {
        info = x;
        left = right = null;
    }
}

class BSTree {
    Node root;

    BSTree() {
        root = null;
    }

    void insert(int x) {
        if (root == null) {
            root = new Node(x);
            return;
        }
        Node f = null;
        Node p = root;
        while (p != null) {
            if (p.info == x) {
                System.out.println("The key " + x + " already exists, no insertion");
                return;
            }
            f = p;
            if (x < p.info)
                p = p.left;
            else
                p = p.right;
        }
        if (x < f.info)
            f.left = new Node(x);
        else
            f.right = new Node(x);
    }

    Node search(int x) {
        return search(root, x);
    }

    Node search(Node p, int x) {
        if (p == null || p.info == x)
            return p;
        if (x < p.info)
            return search(p.left, x);
        else
            return search(p.right, x);
    }

    void deleteByMerging(int x) {
        root = deleteNodeByMerging(root, x);
    }

    Node deleteNodeByMerging(Node root, int x) {
        if (root == null)
            return null;
        if (x < root.info)
            root.left = deleteNodeByMerging(root.left, x);
        else if (x > root.info)
            root.right = deleteNodeByMerging(root.right, x);
        else {
            if (root.left == null)
                return root.right;
            else if (root.right == null)
                return root.left;
            Node temp = findMinimum(root.right);
            root.info = temp.info;
            root.right = deleteNodeByMerging(root.right, temp.info);
        }
        return root;
    }

    Node findMinimum(Node node) {
        while (node.left != null)
            node = node.left;
        return node;
    }

    void deleteByCopying(int x) {
        root = deleteNodeByCopying(root, x);
    }

    Node deleteNodeByCopying(Node root, int x) {
        if (root == null)
            return null;
        if (x < root.info)
            root.left = deleteNodeByCopying(root.left, x);
        else if (x > root.info)
            root.right = deleteNodeByCopying(root.right, x);
        else {
            if (root.left == null && root.right == null)
                return null;
            else if (root.left == null) {
                root = root.right;
            } else if (root.right == null) {
                root = root.left;
            } else {
                Node temp = findMaximum(root.left);
                root.info = temp.info;
                root.left = deleteNodeByCopying(root.left, temp.info);
            }
        }
        return root;
    }

    Node findMaximum(Node node) {
        while (node.right != null)
            node = node.right;
        return node;
    }

    void preOrder(Node p) {
        if (p != null) {
            System.out.print(p.info + " ");
            preOrder(p.left);
            preOrder(p.right);
        }
    }

    void inOrder(Node p) {
        if (p != null) {
            inOrder(p.left);
            System.out.print(p.info + " ");
            inOrder(p.right);
        }
    }

    void postOrder(Node p) {
        if (p != null) {
            postOrder(p.left);
            postOrder(p.right);
            System.out.print(p.info + " ");
        }
    }

    void visit(Node p) {
        System.out.print(p.info + " ");
    }
}

public class BinarySearchTree {
    public static void main(String[] args) {
        BSTree tree = new BSTree();
        tree.insert(50);
        tree.insert(30);
        tree.insert(70);
        tree.insert(20);
        tree.insert(40);
        tree.insert(60);
        tree.insert(80);

        System.out.println("Inorder traversal of the constructed tree:");
        tree.inOrder(tree.root);

        System.out.println("\nSearch for key 40:");
        Node searchedNode = tree.search(40);
        if (searchedNode != null)
            System.out.println("Key 40 found in the tree.");
        else
            System.out.println("Key 40 not found in the tree.");

        System.out.println("Delete node 30 by copying:");
        tree.deleteByCopying(30);
        System.out.println("Inorder traversal after deletion:");
        tree.inOrder(tree.root);

        System.out.println("\nDelete node 70 by merging:");
        tree.deleteByMerging(70);
        System.out.println("Inorder traversal after deletion:");
        tree.inOrder(tree.root);
    }
}






