/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package bubblesort;

import controller.BubbleSortController;
import model.BubbleSortModel;
import view.BubbleSortView;

/**
 *
 * @author plmin
 */
public class Bubblesort {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        BubbleSortModel model = new BubbleSortModel();
        BubbleSortView view = new BubbleSortView();
        BubbleSortController controller = new BubbleSortController(model, view);

        int size = view.getArraySize();
        controller.generateAndSortArray(size);
    }
}
