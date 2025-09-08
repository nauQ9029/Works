/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package view;

import java.util.Arrays;
import java.util.Scanner;
import controller.BinarySearchController;

/**
 *
 * @author plmin
 */
public class BinarySearchView {
    private Scanner scanner;

    public BinarySearchView() {
        scanner = new Scanner(System.in);
    }

    public int promptForArraySize() {
        System.out.print("Enter the number of the array: ");
        return scanner.nextInt();
    }

    public int promptForSearchNumber() {
        System.out.print("Enter the search value: ");
        return scanner.nextInt();
    }

    public void displaySortedArray(int[] array) {
        System.out.println("Sorted Array: " + Arrays.toString(array));
    }

    public void displayIndex(int index) {
        if (index != -1) {
            //int searchN = controller.BinarySearchController;
            System.out.println("Found " + "at index: " + index); //Incompleted
        } else {
            System.out.println("Search number not found in the array.");
        }
    }
}
