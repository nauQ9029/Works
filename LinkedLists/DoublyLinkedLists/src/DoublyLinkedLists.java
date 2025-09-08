/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author plmin
 */

class Node {
    String dataOfNode;
    Node pNext;
    Node pPrev;
    
    // Constructor
    Node(String inputData, Node inputNext, Node inputPrev) {
        dataOfNode = inputData;
        pNext = inputNext;
        pPrev = inputPrev;
    }
}

//Doubly linked lists structure
class DoublyLinkedLists {
    Node head, tail;
    
    // Constructor
    DoublyLinkedLists() {
        head = tail = null;
    }
    
    boolean isEmpty() {
        return(head == null);
    }
    
    void clear() {
        head = tail = null;
    }
    
    // Add STRING to the linked lists
    void add(String inputData) {
        Node node = new Node(inputData, null, null);
        if(head == null) {
            head = tail = node;
        }  else {
            tail.pNext = node;          // Set the previous node of the new node
            tail = node;
        }
    }
    
    // Add NODE to the linked lists
    void add(Node node) {
        if (head == null) {
            head = tail = node;
        } else {
            tail.pNext = node;          // Set the previous node of the new node
            tail = node;
        }
    }
    
    // Traverse and print out the data in the linked lists
    void traverseAndPrint() {
        Node tNode = head;
        while(tNode != null) {
            System.out.println(tNode.dataOfNode + " ");
            
            //Update the new node to the current one
            tNode = tNode.pNext;
        }
    }
    
    // Search for a specific data in the linked list
    Node search(String x) {
        Node tNode = head;
        while(tNode != null) {
            if(tNode.dataOfNode.equals(x)) {
                return tNode;
            }
            tNode = tNode.pNext;
        }
        return null;                    // Data not found
    }
    
    public static void main(String[] args) {
        System.out.println("My second demo of CSD course!");
        
        // Initialize object
        DoublyLinkedLists mDataStructure = new DoublyLinkedLists();
        
        // Add data
        mDataStructure.add("Merry ");
        mDataStructure.add("new ");
        mDataStructure.add("year!");
        
        // Print out the data
        mDataStructure.traverseAndPrint();
        
        // Search for data
        System.out.println("Searching for \"Merry \"");
        Node result = mDataStructure.search("Merry ");          // Space
        
        if(result != null) {
            System.out.println("Found: " + result.dataOfNode);
        } else {
            System.out.println("Not found");
        }
    }
}
