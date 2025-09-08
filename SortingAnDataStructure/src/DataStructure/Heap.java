
package DataStructure;

import java.util.ArrayList;

class MaxHeap {
    private ArrayList<Integer> heap;

    public MaxHeap() {
        heap = new ArrayList<>();
    }

    public void insert(int key) {
        heap.add(key);
        int index = heap.size() - 1;
        heapifyUp(index);
    }

    private void heapifyUp(int index) {
        int parentIndex = (index - 1) / 2;
        while (index > 0 && heap.get(index) > heap.get(parentIndex)) {
            swap(index, parentIndex);
            index = parentIndex;
            parentIndex = (index - 1) / 2;
        }
    }

    public boolean search(int key) {
        return heap.contains(key);
    }

    public int delete(int key) {
        if (heap.isEmpty())
            return -1;

        int index = heap.indexOf(key);
        if (index == -1)
            return -1;

        int deletedKey = heap.get(index);
        heap.set(index, heap.get(heap.size() - 1));
        heap.remove(heap.size() - 1);

        heapifyDown(index);

        return deletedKey;
    }

    private void heapifyDown(int index) {
        int maxIndex = index;
        int leftChildIndex = 2 * index + 1;
        int rightChildIndex = 2 * index + 2;

        if (leftChildIndex < heap.size() && heap.get(leftChildIndex) > heap.get(maxIndex)) {
            maxIndex = leftChildIndex;
        }

        if (rightChildIndex < heap.size() && heap.get(rightChildIndex) > heap.get(maxIndex)) {
            maxIndex = rightChildIndex;
        }

        if (maxIndex != index) {
            swap(index, maxIndex);
            heapifyDown(maxIndex);
        }
    }

    private void swap(int i, int j) {
        int temp = heap.get(i);
        heap.set(i, heap.get(j));
        heap.set(j, temp);
    }

    public void printHeap() {
        for (int i : heap) {
            System.out.print(i + " ");
        }
        System.out.println();
    }
}

public class Heap {
    public static void main(String[] args) {
        MaxHeap maxHeap = new MaxHeap();
        maxHeap.insert(5);
        maxHeap.insert(3);
        maxHeap.insert(8);
        maxHeap.insert(2);
        maxHeap.insert(10);
        maxHeap.printHeap();

        System.out.println("Search 8: " + maxHeap.search(8));
        System.out.println("Search 4: " + maxHeap.search(4));

        maxHeap.delete(8);
        maxHeap.printHeap();
    }
}

