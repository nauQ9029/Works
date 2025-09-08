/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author plmin
 */
class ListNode {

    int val;
    ListNode next;

    ListNode(int val) {
        this.val = val;
    }
}

class LinkedList {

    ListNode head;

    public void insert(int val) {
        ListNode newNode = new ListNode(val);
        if (head == null) {
            head = newNode;
        } else {
            ListNode temp = head;
            while (temp.next != null) {
                temp = temp.next;
            }
            temp.next = newNode;
        }
    }

    public void display() {
        ListNode temp = head;
        while (temp != null) {
            System.out.print(temp.val + " ");
            temp = temp.next;
        }
        System.out.println();
    }

    public static void main(String[] args) {
        LinkedList list = new LinkedList();
        list.insert(1);
        list.insert(2);
        list.insert(3);
        System.out.print("Linked List: ");
        list.display();
    }
}

/*
Linked List:
Pros:
    Dynamic size: Linked lists can grow or shrink in size during execution.
    Easy insertion and deletion: Adding or removing elements from a linked list is relatively fast and straightforward, especially compared to arrays.
    No need for contiguous memory: Linked lists do not require contiguous memory allocation, making them suitable for dynamic memory allocation.
Cons:
    Access time: Accessing elements in a linked list by index (random access) is slower compared to arrays because it requires traversing the list from the beginning.
    Extra memory overhead: Each element in a linked list requires extra memory for storing the reference/pointer to the next element.
*/

