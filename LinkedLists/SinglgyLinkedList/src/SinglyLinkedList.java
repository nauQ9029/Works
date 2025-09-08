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

    // Constructor
    Node(String inputData, Node inputPNext) {
        dataOfNode = inputData;
        pNext = inputPNext;
    }
}

// Linked list Data Structure
class MyFirstEverDataStructure {
    Node head, tail;
    
    // Constructor
    MyFirstEverDataStructure() {
        // Empty linked list
        head = tail = null;
    }

    boolean isEmpty() {
        return (head == null);
    }

    void clear() {
        head = tail = null;
    }
    
    // Add a STRING to the linked list
    void add(String inputString) {
        Node node = new Node(inputString, null);
        if(head == null) {
            head = tail = node;
        } else {
            tail.pNext = node;
            tail = node;
        }
    }
    // Add a NODE to the linked list
    void add(Node node) {
        if(head == null) {
            head = tail = node;
        } else {
            tail.pNext = node;
            tail = node;
        }
    }
    
    // Traverse and print out data in the linked list
    void traverseAndPrint() {
        Node tNode = head;
        while (tNode != null) {
            String data = tNode.dataOfNode;
            System.out.print(data);
            
            // Update tNode to the next node
            tNode = tNode.pNext;
        }
    }
    
    // Search for a specific data in the linked list
    Node search(int x) {
        Node tNode = head;
        while(tNode != null) {
            if(tNode.dataOfNode.equals(x)) {
                return tNode;
            }
        }
        return null;
    }

    public static void main(String[] args) {
        System.out.println("My first demo of CSD course!");
        
        //Initialize my DS Oject
        MyFirstEverDataStructure mDataStructure = new MyFirstEverDataStructure();
        
        // Add data
        mDataStructure.add("Happy ");
        mDataStructure.add("New ");
        mDataStructure.add("Year!");
        
        // Print the linked list
        mDataStructure.traverseAndPrint();
    }
}
