/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model;

/**
 *
 * @author plmin
 */
public class BubbleSortModel {
    private int[] array;
    public void setArray(int[] array) {
        this.array = array;
    }
    
    public int[] getArray() {
        return array;
    }

    public void sortArray() {
        int n = array.length;
        boolean swapped;
        
        do {
            swapped = false;
            for (int i = 1; i < n; i++) {
                if (array[i - 1] > array[i]) {
                    // Hoan doi 2 phan tu neu chung theo thu tu dao nguoc,
                    // Neu khong thi giu nguyen vi tri cua 2 phan tu va next
                    int temp = array[i - 1];
                    array[i - 1] = array[i];
                    array[i] = temp;
                    swapped = true;
                }
            }
        } while (swapped);
    }
}
