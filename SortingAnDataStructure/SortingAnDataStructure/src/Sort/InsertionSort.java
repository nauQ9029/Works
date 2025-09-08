
package Sort;
//Complexity  O(n2)

public class InsertionSort {
    public void insertSort(int[] a) {
        int n = a.length;
        for (int i = 1; i < n; i++) {
            int x = a[i];
            int j = i;
            while (j > 0 && x < a[j - 1]) {
                a[j] = a[j - 1];
                j--;
            }
            a[j] = x;
        }
    }

    public static void main(String[] args) {
        InsertionSort sorter = new InsertionSort();
        
        int[] array = {5, 2, 4, 6, 1, 3};
        System.out.println("Array before sorting:");
        printArray(array);
        sorter.insertSort(array);
        System.out.println("Array after sorting:");
        printArray(array);
    }

    public static void printArray(int[] array) {
        for (int num : array) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}

