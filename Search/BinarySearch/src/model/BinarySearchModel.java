/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model;

import java.util.Arrays;
import java.util.Random;

/**
 *
 * @author plmin
 */
public class BinarySearchModel {

    private int[] array;
    
    public void generateRandomArray(int size, int maxValue) {
        Random random = new Random();
        array = new int[size];
        
        for (int i = 0; i < size; i++) {
            array[i] = random.nextInt(maxValue);
        }
    }

    public void sortArray() {
        Arrays.sort(array);
    }

    public int[] getArray() {
        return array;
    }
    
    public int findIndex(int searchNumber) {
        for (int i = 0; i < array.length; i++) {
            if (array[i] == searchNumber) {
                return i;
            }
        }
        return -1; // Not found
    }
}
