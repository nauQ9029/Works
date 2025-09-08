/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author plmin
 */
class Node {

    int info;
    Node next;

    Node() {
    }

    Node(int x, Node p) {
        info = x;
        next = p;
    }
}

class MyList {

    Node head, tail;

    MyList() {
        head = tail = null;
    }

    boolean isEmpty() {
        return (head == null);
    }

    void clear() {
        head = tail = null;
    }

    void add(int x) {
        if (isEmpty()) {
            head = tail = new Node(x, null);
        } else {
            Node q = new Node(x, null);
            tail.next = q;
            tail = q;
        }
    }

    void traverse() {
        Node p = head;
        while (p != null) {
            System.out.print("  " + p.info);
            p = p.next;
        }
        System.out.println();
    }

    Node search(int x) {
        Node p = head;
        while (p != null) {
            if (p.info == x) {
                return p;
            }
            p = p.next;
        }
        return null; // If not found
    }

    void dele(int x) {
        if (isEmpty()) {
            System.out.println("List is empty");
            return;
        }
        if (head.info == x) { // If x is the first element
            head = head.next;
            if (head == null) // If there's only one element
            {
                tail = null;
            }
            return;
        }
        Node p = head;
        while (p.next != null) {
            if (p.next.info == x) {
                p.next = p.next.next;
                if (p.next == null) // If x was the last element
                {
                    tail = p;
                }
                return;
            }
            p = p.next;
        }
        System.out.println("Element " + x + " not found");
    }
}

public class SinglyLinkedList {
    public static void main(String[] args) {
        // Create a new MyList instance
        MyList list = new MyList();

        // Add some elements to the list
        list.add(10);
        list.add(20);
        list.add(30);
        list.add(40);

        // Traverse the list and print its contents
        System.out.println("List elements:");
        list.traverse(); // Corrected method call

        // Search for an element in the list
        int searchElement = 20;
        Node result = list.search(searchElement);
        if (result != null) {
            System.out.println("Element " + searchElement + " found in the list.");
        } else {
            System.out.println("Element " + searchElement + " not found in the list.");
        }

        // Delete an element from the list
        int deleteElement = 30;
        System.out.println("Deleting element " + deleteElement + " from the list:");
        list.dele(deleteElement);

        // Traverse the list after deletion
        System.out.println("List elements after deletion:");
        list.traverse();
    }
}

