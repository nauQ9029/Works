/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package controller;

import model.BinarySearchModel;
import view.BinarySearchView;

/**
 *
 * @author plmin
 */
public class BinarySearchController {
    private BinarySearchModel model;
    private BinarySearchView view;
    
    public BinarySearchController(BinarySearchModel model, BinarySearchView view) {
        this.model = model;
        this.view = view;
    }
    
    public void run() {
        int size = view.promptForArraySize();
        int searchNumber;

        model.generateRandomArray(size, 30);
        model.sortArray();

        view.displaySortedArray(model.getArray());
        
        searchNumber = view.promptForSearchNumber();

        int index = model.findIndex(searchNumber);

        view.displayIndex(index);
    
    }
    
}
