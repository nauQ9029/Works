/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author plmin
 */
import java.util.Scanner;

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
        head = new Node(x, head);
    }

    public Object top() {
        if (isEmpty()) {
            throw new EmptyStackException();
        }
        return head.info;
    }

    public Object pop() {
        if (isEmpty()) {
            throw new EmptyStackException();
        }
        Object x = head.info;
        head = head.next;
        return x;
    }
}

class EmptyStackException extends RuntimeException {
    // Exception for empty stack
}

class BrowserSimulation {

    private LinkedStack backStack;
    private LinkedStack forwardStack;
    protected String currentURL;

    public BrowserSimulation() {
        backStack = new LinkedStack();
        forwardStack = new LinkedStack();
        currentURL = "google.com";                                              // Default page
    }

    public void navigateTo(String url) {
        backStack.push(currentURL);
        forwardStack = new LinkedStack();                                       // Clear forward stack
        currentURL = url;
        System.out.println("Navigated to: " + url);
    }

    public void goBack() {
        if (!backStack.isEmpty()) {                                             // Checking to see if it is empty
            forwardStack.push(currentURL);                                      // If not, push currentURL up to forward stack
            currentURL = (String) backStack.pop();                              // Pop the top URL from backStack, assign to the current URL
            System.out.println("Back to: " + currentURL);                       // Prints out the output
        } else {
            System.out.println("Go back not available. Empty stack.");
        }
    }

    public void goForward() {
        if (!forwardStack.isEmpty()) {
            backStack.push(currentURL);
            currentURL = (String) forwardStack.pop();
            System.out.println("Forward to: " + currentURL);
        } else {
            System.out.println("Go forward not available. Empty stack.");
        }
    }

    public String getCurrentURL() {
        return currentURL;
    }
}

public class LinkedListStackBrowserBF {

    public static void main(String[] args) {
        BrowserSimulation browser = new BrowserSimulation();
        Scanner scanner = new Scanner(System.in);

        while (true) {
            System.out.println("----------------------------------------");
            System.out.println("Browser");
            System.out.println("Current page: " + browser.currentURL);
            System.out.println("1. Enter URL");
            System.out.println("2. Go back");
            System.out.println("3. Go forward");
            System.out.println("4. Exit");

            System.out.print("Enter your choice: ");
            int choice = scanner.nextInt();

            switch (choice) {
                case 1:
                    System.out.print("Enter URL: ");
                    String newURL = scanner.next();
                    browser.navigateTo(newURL);
                    break;
                case 2:
                    browser.goBack();
                    break;
                case 3:
                    browser.goForward();
                    break;
                case 4:
                    System.out.println("Exiting the program.");
                    System.exit(0);
                    break;
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        }
    }
}
