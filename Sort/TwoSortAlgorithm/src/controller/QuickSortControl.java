package controller;

import java.util.Scanner;
import model.QuickSortModel;
import view.Display;

public class QuickSortControl {

    public QuickSortControl(QuickSortModel model, Display view) {
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Input the size of the array: ");
        int arraySize = sc.nextInt();
        
        QuickSortModel model = new QuickSortModel();
        Display view = new Display();
        
        model.generateRandomArray(arraySize);
        
        System.out.println("Unsorted array: ");
        view.display(model.getArray());

        model.quickSort(0, arraySize - 1);

        System.out.println("Sorted array: ");
        view.display(model.getArray());
    }
}
