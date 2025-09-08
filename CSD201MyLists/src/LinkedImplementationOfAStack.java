/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author plmin
 */
import java.util.EmptyStackException;

class Node {
    public Object info;
    public Node next;

    public Node(Object x, Node p) {
        info = x;
        next = p;
    }

    public Node(Object x) {
        this(x, null);
    }
}

class LinkedStack {
    protected Node head;

    public LinkedStack() {
        head = null;
    }

    public boolean isEmpty() {
        return (head == null);
    }

    public void push(Object x) {
        head = new Node(x, head); // This line invokes the constructor causing the NoSuchMethodError
    }

    public Object top() throws EmptyStackException {
        if (isEmpty()) {
            throw new EmptyStackException();
        }
        return head.info;
    }

    public Object pop() throws EmptyStackException {
        if (isEmpty()) {
            throw new EmptyStackException();
        }
        Object x = head.info;
        head = head.next;
        return x;
    }
}

public class LinkedImplementationOfAStack {
    public static void main(String[] args) {
        LinkedStack stack = new LinkedStack();

        // Push elements onto the stack
        stack.push(1);
        stack.push(2);
        stack.push(3);

        // Display the top element
        try {
            System.out.println("Top element: " + stack.top());
        } catch (EmptyStackException e) {
            System.out.println("Stack is empty");
        }

        // Pop elements from the stack
        try {
            System.out.println("Popped element: " + stack.pop());
            System.out.println("Popped element: " + stack.pop());
            System.out.println("Popped element: " + stack.pop());
            System.out.println("Popped element: " + stack.pop()); // This should throw an EmptyStackException
        } catch (EmptyStackException e) {
            System.out.println("Stack is empty");
        }
    }
}