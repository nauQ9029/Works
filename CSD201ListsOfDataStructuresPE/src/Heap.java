/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author plmin
 */
class MinHeap {

    private int[] heap;
    private int size;
    private int capacity;

    public MinHeap(int capacity) {
        this.capacity = capacity;
        this.size = 0;
        this.heap = new int[capacity];
    }

    private int parent(int index) {
        return (index - 1) / 2;
    }

    private int leftChild(int index) {
        return 2 * index + 1;
    }

    private int rightChild(int index) {
        return 2 * index + 2;
    }

    private void swap(int index1, int index2) {
        int temp = heap[index1];
        heap[index1] = heap[index2];
        heap[index2] = temp;
    }

    public void insert(int value) {
        if (size >= capacity) {
            System.out.println("Heap is full");
            return;
        }

        size++;
        int index = size - 1;
        heap[index] = value;

        // Maintain heap property
        while (index != 0 && heap[parent(index)] > heap[index]) {
            swap(parent(index), index);
            index = parent(index);
        }
    }

    public int extractMin() {
        if (size <= 0) {
            System.out.println("Heap is empty");
            return -1; // or throw an exception
        }
        if (size == 1) {
            size--;
            return heap[0];
        }

        int min = heap[0];
        heap[0] = heap[size - 1];
        size--;
        minHeapify(0);
        return min;
    }

    private void minHeapify(int index) {
        int left = leftChild(index);
        int right = rightChild(index);
        int smallest = index;

        if (left < size && heap[left] < heap[index]) {
            smallest = left;
        }
        if (right < size && heap[right] < heap[smallest]) {
            smallest = right;
        }

        if (smallest != index) {
            swap(index, smallest);
            minHeapify(smallest);
        }
    }

    public void display() {
        for (int i = 0; i < size; i++) {
            System.out.print(heap[i] + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        MinHeap heap = new MinHeap(10);
        heap.insert(3);
        heap.insert(2);
        heap.insert(1);
        heap.insert(15);
        heap.insert(5);
        heap.insert(4);
        heap.insert(45);

        System.out.print("Min Heap: ");
        heap.display();

        System.out.println("Extracted min element: " + heap.extractMin());

        System.out.print("Min Heap after extraction: ");
        heap.display();
    }
}

/*
Heap:
Pros:
    Efficient insertion and deletion: Both insertion and deletion of elements in a heap have a time complexity of O(log n), where n is the number of elements in the heap.
    Efficient retrieval of minimum/maximum element: In a min-heap, the minimum element is always at the root, and in a max-heap, the maximum element is always at the root.
Retrieving the minimum/maximum element has a time complexity of O(1).
    Space efficiency: Heaps typically use an array-based implementation, which is space-efficient compared to other tree-based data structures like AVL trees or red-black trees.
Cons:
    Limited functionality: Heaps support a limited set of operations, primarily insertion, deletion, and retrieval of the minimum/maximum element. 
They do not support other operations like searching for a specific element efficiently.
    Lack of flexibility: Unlike balanced binary search trees (BSTs), heaps do not maintain any particular ordering of elements beyond the min-heap or max-heap property. 
They are primarily designed for priority queue operations and not for general-purpose storage and retrieval.
    Not suitable for all scenarios: While heaps excel at priority queue operations, they may not be the best choice for scenarios requiring frequent searches 
or updates of arbitrary elements.
*/