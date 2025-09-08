/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package main;
import controller.BubbleSortController;
import model.BubbleSortModel;
import view.BubbleSortView;
import model.QuickSortModel;
import view.Display;
import controller.QuickSortControl;
/**
 *
 * @author plmin
 */
public class Menu {

    public void displayMenu() {
        System.out.println("1. Bubble Sort");
        System.out.println("2. Quick Sort");
        System.out.println("3. Exit");
    }

    public void bubbleSort() {
        BubbleSortModel model = new BubbleSortModel();
        BubbleSortView view = new BubbleSortView();
        BubbleSortController controller = new BubbleSortController(model, view);

        int size = view.getArraySize();
        controller.generateAndSortArray(size);
    }

    public void quickSort() {
        QuickSortModel model = new QuickSortModel();
        Display view = new Display();
        QuickSortControl controller = new QuickSortControl(model, view);

        int size = view.getArraySize();
        controller.generateAndSortArray(size);
    }
}
