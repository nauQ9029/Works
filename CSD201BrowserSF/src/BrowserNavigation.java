
import java.util.EmptyStackException;
import java.util.Scanner;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
/**
 *
 * @author plmin
 */
class WebPage {

    private String url;

    public WebPage(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }
}

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

    public Object top() throws EmptyStackException {
        if (isEmpty()) {
            throw new EmptyStackException();
        }
        return ((WebPage) head.info).getUrl();
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

public class BrowserNavigation {

    private LinkedStack backStack;
    private LinkedStack fowardStack;
    private WebPage currentPage;

    public BrowserNavigation() {
        backStack = new LinkedStack();
        fowardStack = new LinkedStack();
        
        // Initial web page
        this.currentPage = new WebPage("google.com");           // PROBLEM

    }

    public void goTo(String newUrl) {
        WebPage newWebPage = new WebPage(newUrl);

        if (!fowardStack.isEmpty()) {
            fowardStack = new LinkedStack();
        }
        
        backStack.push(newWebPage);
        currentPage = newWebPage;

    }

    public void goBack() {
        if (!backStack.isEmpty()) {
            fowardStack.push(currentPage);
            currentPage = (WebPage) backStack.pop();
        } else {
            System.out.println("No back URL available");
        }
    }

    public void goFoward() {
        if (!fowardStack.isEmpty()) {
            backStack.push(currentPage);
            currentPage = (WebPage) fowardStack.pop();
        } else {
            System.out.println("No foward URL available");
        }
    }

    public void enterURL() {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter URL: ");
        String newUrl = scanner.nextLine();
        goTo(newUrl);
    }
    
    
    // PROBLEM
    public String getCurrentPage() {
        return this.currentPage.getUrl();
    }

    public static void main(String[] args) {
        BrowserNavigation browser = new BrowserNavigation();

        Scanner scanner = new Scanner(System.in);
        int choice = 0;
        /*
        edge.goTo("google.com");
         */
        do {
            System.out.println("----------------------------------------");
            System.out.println("Browser");
            System.out.println("Current page: " + browser.getCurrentPage());
            System.out.println("1. Enter new web address");
            System.out.println("2. Go back");
            System.out.println("3. Go foward");
            System.out.println("4. Exit the browser");
            System.out.print("Enter option: ");

            choice = scanner.nextInt();

            switch (choice) {
                case 1:
                    browser.enterURL();
                    break;
                case 2:
                    browser.goBack();
                    break;
                case 3:
                    browser.goFoward();
                    break;
                case 4:
                    break;
                default:
                    System.out.println("Invalid choice!");
            }
        } while (choice != 4);
    }
}
