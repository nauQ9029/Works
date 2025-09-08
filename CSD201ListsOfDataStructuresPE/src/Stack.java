/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author plmin
 */
class Stack {

    private int[] stack;
    private int top;
    private int maxSize;

    Stack(int maxSize) {
        this.maxSize = maxSize;
        stack = new int[maxSize];
        top = -1;
    }

    public void push(int val) {
        if (top == maxSize - 1) {
            System.out.println("Stack overflow");
            return;
        }
        stack[++top] = val;
    }

    public int pop() {
        if (top == -1) {
            System.out.println("Stack underflow");
            return -1;
        }
        return stack[top--];
    }

    public boolean isEmpty() {
        return top == -1;
    }

    public static void main(String[] args) {
        Stack stack = new Stack(5);
        stack.push(1);
        stack.push(2);
        stack.push(3);
        System.out.print("Stack: ");
        while (!stack.isEmpty()) {
            System.out.print(stack.pop() + " ");
        }
        System.out.println();
    }
}

/*
Stack:
Pros:
    LIFO (Last In, First Out) structure: Useful for applications where items need to be processed in the reverse order of their arrival.
    Simple implementation: Stack operations (push and pop) are easy to implement and understand.
Cons:
    Limited functionality: Stacks only support limited operations (push, pop, peek), making them suitable for specific use cases.
    Lack of flexibility: Stacks have a fixed size, and resizing them can be inefficient or not feasible.
*/
