/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author plmin
 */
class Queue {

    private int[] queue;
    private int front, rear, size;

    Queue(int maxSize) {
        queue = new int[maxSize];
        front = 0;
        rear = -1;
        size = 0;
    }

    public void enqueue(int val) {
        if (size == queue.length) {
            System.out.println("Queue overflow");
            return;
        }
        rear = (rear + 1) % queue.length;
        queue[rear] = val;
        size++;
    }

    public int dequeue() {
        if (isEmpty()) {
            System.out.println("Queue underflow");
            return -1;
        }
        int val = queue[front];
        front = (front + 1) % queue.length;
        size--;
        return val;
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public static void main(String[] args) {
        Queue queue = new Queue(5);
        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);
        System.out.print("Queue: ");
        while (!queue.isEmpty()) {
            System.out.print(queue.dequeue() + " ");
        }
        System.out.println();
    }
}

/*
Pros:
    FIFO (First In, First Out) structure: Suitable for scenarios where items need to be processed in the same order as their arrival.
    Versatile: Queues can be used in various scenarios, such as task scheduling, message passing, etc.
Cons:
    Limited functionality: Similar to stacks, queues support only a limited set of operations (enqueue, dequeue).
    Fixed size: Like stacks, traditional queues have a fixed size, which can be a limitation in some cases.
*/
