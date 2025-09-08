package Sort;
//Mergesort makes partitioning as simple as possible and concentrates on merging sorted halves of an array into one sorted array

//Complexity is O(nlogn)

public class MergeSort {

    private int[] array;

    public MergeSort(int[] array) {
        this.array = array;
    }

    public void mergeSort(int p, int r) {
        if (p < r) {
            int q = (p + r) / 2;
            mergeSort(p, q);
            mergeSort(q + 1, r);
            merge(p, q, r);
        }
    }

    private void merge(int p, int q, int r) {
        int n1 = q - p + 1;
        int n2 = r - q;

        int[] left = new int[n1];
        int[] right = new int[n2];

        for (int i = 0; i < n1; i++) {
            left[i] = array[p + i];
        }
        for (int j = 0; j < n2; j++) {
            right[j] = array[q + 1 + j];
        }

        int i = 0, j = 0, k = p;
        while (i < n1 && j < n2) {
            if (left[i] <= right[j]) {
                array[k] = left[i];
                i++;
            } else {
                array[k] = right[j];
                j++;
            }
            k++;
        }

        while (i < n1) {
            array[k] = left[i];
            i++;
            k++;
        }

        while (j < n2) {
            array[k] = right[j];
            j++;
            k++;
        }
    }

    public void display() {
        for (int num : array) {
            System.out.print(num + " ");
        }
    }

    public static void main(String[] args) {
        int[] array = {7, 3, 5, 9, 11, 8, 6, 15, 10, 12, 14};
        MergeSort mergeSort = new MergeSort(array);
        mergeSort.mergeSort(0, array.length - 1);
        mergeSort.display();
    }
}

