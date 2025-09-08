
package Sort;
//Complexity  O(n2)

public class BubbleSort {

    public void bubbleSort(int[] array) {
        int n = array.length;
        boolean swapped;

        do {
            swapped = false;
            for (int i = 0; i < n - 1; i++) {
                if (array[i] > array[i + 1]) {
                    swap(array, i, i + 1);
                    swapped = true;
                }
            }
        } while (swapped);
    }

    private void swap(int[] array, int i, int j) {
        int temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    public void printArray(int[] array) {
        for (int num : array) {
            System.out.print(num + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        BubbleSort sorter = new BubbleSort();
        System.out.println("Original array:");
        sorter.printArray(arr);

        sorter.bubbleSort(arr);

        System.out.println("Sorted array:");
        sorter.printArray(arr);
    }
}
