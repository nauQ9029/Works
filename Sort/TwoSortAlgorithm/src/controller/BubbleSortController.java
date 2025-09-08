/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package controller;

import java.util.Random;
import model.BubbleSortModel;
import view.BubbleSortView;

/**
 *
 * @author plmin
 */
public class BubbleSortController {

    private BubbleSortModel model;
    private BubbleSortView view;

    public BubbleSortController(BubbleSortModel model, BubbleSortView view) {
        this.model = model;
        this.view = view;
    }

    public void generateAndSortArray(int size) {
        int[] array = generateRandomArray(size);
        model.setArray(array);

        view.displayArray(array, "Unsorted Array: ");

        model.sortArray();

        int[] sortedArray = model.getArray();
        view.displayArray(sortedArray, "Sorted Array: ");
    }

    private int[] generateRandomArray(int size) {
        Random random = new Random();
        int[] array = new int[size];
        for (int i = 0; i < size; i++) {
            array[i] = random.nextInt(15);
        }
        return array;
    }
}
