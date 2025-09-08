/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author plmin
 */

/* TODO:
    - Somehow make the data stores in an AVL tree and make it run
    - Re-balances the tree after each addition (if  necessary)
    - Search succesful
 */
class Contact {

    String name;
    String phone;
    String email;

    public Contact(String name, String phone, String email) {
        this.name = name;
        this.phone = phone;
        this.email = email;
    }

    @Override
    public String toString() {
        return String.format("%-15s %-10s %-25s", name, phone, email);
    }
}

class AVLTreeNode {

    Contact contact;
    AVLTreeNode left;
    AVLTreeNode right;
    int height;

    public AVLTreeNode(Contact contact) {
        this.contact = contact;
        this.height = 1;
    }
}

// Insert a new contact into the tree while ensure the tree is balanced
class AVLTree {

    AVLTreeNode root;

    // Insert a contact into the AVL tree
    private AVLTreeNode insert(AVLTreeNode node, Contact contact) {
        if (node == null) {
            return new AVLTreeNode(contact);
        }

        // Insertion
        if (contact.name.compareTo(node.contact.name) < 0) {
            node.left = insert(node.left, contact);
        } else if(contact.name.compareTo(node.contact.name) > 0) {
            node.right = insert(node.right, contact);
        } else {                                                
            return node;
        }

        // Update height of this ancestor node
        // Height of the current node = max height of its left and right subtrees + 1
        node.height = 1 + Math.max(height(node.left), height(node.right));

        // Balance the tree
        int balance = getBalance(node);

        // Left Left Case
        if (balance > 1 && contact.name.compareTo(node.left.contact.name) < 0) {
            return rightRotate(node);
        }

        // Right Right Case
        if (balance < -1 && contact.name.compareTo(node.right.contact.name) > 0) {
            return leftRotate(node);
        }

        // Left Right Case
        if (balance > 1 && contact.name.compareTo(node.left.contact.name) > 0) {
            node.left = leftRotate(node.left);
            return rightRotate(node);
        }

        // Right Left Case
        if (balance < -1 && contact.name.compareTo(node.right.contact.name) < 0) {
            node.right = rightRotate(node.right);
            return leftRotate(node);
        }

        return node;                                            // No rotation is needed
    }

    // Get height of the tree
    private int height(AVLTreeNode node) {
        if (node == null) {
            return 0;
        }
        return node.height;
    }

    // Get balance factor
    private int getBalance(AVLTreeNode node) {
        if (node == null) {
            return 0;
        }
        return height(node.left) - height(node.right);
    }

    // Right rotate subtree rooted with y
    private AVLTreeNode rightRotate(AVLTreeNode y) {
        AVLTreeNode x = y.left;
        AVLTreeNode T2 = x.right;

        // Perform rotation
        x.right = y;
        y.left = T2;

        // Update heights
        y.height = Math.max(height(y.left), height(y.right)) + 1;
        x.height = Math.max(height(x.left), height(x.right)) + 1;

        return x;                                           // Return new root
    }

    // Left rotate subtree rooted with x
    private AVLTreeNode leftRotate(AVLTreeNode x) {
        AVLTreeNode y = x.right;
        AVLTreeNode T2 = y.left;

        y.left = x;
        x.right = T2;

        x.height = Math.max(height(x.left), height(x.right)) + 1;
        y.height = Math.max(height(y.left), height(y.right)) + 1;

        return y;                                           // Return new root
    }

    // Insert a contact
    public void insert(Contact contact) {
        root = insert(root, contact);
    }
    
    // Print all contacts
    public void printAllContacts() {
        printInOrder(root);
    }

    // In-order traversal to print contacts
    private void printInOrder(AVLTreeNode node) {
        if (node != null) {
            printInOrder(node.left);
            System.out.println(node.contact);
            printInOrder(node.right);
        }
    }

    // Search for a contact by name
    public Contact search(String name) {
        AVLTreeNode current = root;
        while (current != null) {
            if (name.compareTo(current.contact.name) == 0) {
                return current.contact;
            } else if (name.compareTo(current.contact.name) < 0) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return null;                                        // Contact not found
    }
}

public class AVLTreeContact {

    public static void main(String[] args) {
        AVLTree contactBook = new AVLTree();
        
        contactBook.insert(new Contact("George Wright", "555-0107", "george.wright@email.com"));
        contactBook.insert(new Contact("Hannah Torres", "555-0108", "hannah.torres@email.com"));
        contactBook.insert(new Contact("Alice Johnson", "555-0101", "alice.johnson@email.com"));
        contactBook.insert(new Contact("Jenny Adams", "555-0110", "jenny.adams@email.com"));
        contactBook.insert(new Contact("Bob Smith", "555-0102", "bob.smith@email.com"));
        contactBook.insert(new Contact("Fiona Campbell", "555-0106", "fiona.campbell@email.com"));
        contactBook.insert(new Contact("Charlie Davis", "555-0103", "charlie.davis@email.com"));
        contactBook.insert(new Contact("Diana Hayes", "555-0104", "diana.hayes@email.com"));
        contactBook.insert(new Contact("Ian Scott", "555-0109", "ian.scott@email.com"));
        contactBook.insert(new Contact("Ethan Moore", "555-0105", "ethan.moore@email.com"));
        


        System.out.println("All Sorted Contacts:");
        contactBook.printAllContacts();
        System.out.println("");
        String searchName = "Ian Scott";
        Contact foundContact = contactBook.search(searchName);
        if (foundContact != null) {
            System.out.println("Contact found:\n" + foundContact);
        } else {
            System.out.println("Contact with name '" + searchName + "' not found.");
        }
    }
}
