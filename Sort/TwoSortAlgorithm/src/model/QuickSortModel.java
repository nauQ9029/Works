package model;

import java.util.Random;

public class QuickSortModel {
    private int[] array;

    public void generateRandomArray(int size) {
        array = new int[size];
        Random random = new Random();
        int min = 1, max = 100;
        for (int i = 0; i < array.length; i++) {
            array[i] = random.nextInt(max - min + 1) + min;
        }
    }

    public int[] getArray() {
        return array;
    }

    public void quickSort(int start, int end) {
        if (end <= start) return;
        int pivot = partition(start, end);
        quickSort(start, pivot - 1);
        quickSort(pivot + 1, end);
    }

    private int partition(int start, int end) {
        int pivot = array[end];
        int i = start - 1;
        for (int j = start; j <= end - 1; j++) {
            if (array[j] < pivot) {
                i++;
                int temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
        i++;
        int temp = array[i];
        array[i] = array[end];
        array[end] = temp;
        return i;
    }
}
