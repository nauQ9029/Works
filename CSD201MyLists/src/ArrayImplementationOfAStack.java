/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author plmin
 */
import java.util.EmptyStackException;

class ArrayStack {

    protected Object[] a;
    int top, max;

    public ArrayStack() {
        this(50);
    }

    public ArrayStack(int max1) {
        max = max1;
        a = new Object[max];
        top = -1;
    }

    protected boolean grow() {
        int max1 = max + max / 2;
        Object[] a1 = new Object[max1];
        if (a1 == null) {
            return false;
        }
        for (int i = 0; i <= top; i++) {
            a1[i] = a[i];
        }
        a = a1;
        max = max1; // Update max to the new size
        return true;
    }

    public boolean isEmpty() {
        return (top == -1);
    }

    public boolean isFull() {
        return (top == max - 1);
    }

    public void clear() {
        top = -1;
    }

    public void push(Object x) {
        if (isFull() && !grow()) {
            return;
        }
        a[++top] = x;
    }

    Object top() throws EmptyStackException {
        if (isEmpty()) {
            throw new EmptyStackException();
        }
        return (a[top]);
    }

    public Object pop() throws EmptyStackException {
        if (isEmpty()) {
            throw new EmptyStackException();
        }
        Object x = a[top];
        top--;
        return (x);
    }
}

public class ArrayImplementationOfAStack {

    public static void main(String[] args) {
        ArrayStack stack = new ArrayStack(5);

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
