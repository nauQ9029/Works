/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package view;

import java.util.Arrays;

/**
 *
 * @author plmin
 */
public class BubbleSortView {

    public void displayArray(int[] array, String message) {
        System.out.println(message + Arrays.toString(array));
    }

    public int getArraySize() {
        System.out.println("Enter the number of array : ");
        java.util.Scanner scanner = new java.util.Scanner(System.in);
        return scanner.nextInt();
    }
}
