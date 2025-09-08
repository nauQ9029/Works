/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package binarysearch;

import controller.BinarySearchController;
import model.BinarySearchModel;
import view.BinarySearchView;

/**
 *
 * @author plmin
 */
public class main {
    public static void main(String[] args) {
        BinarySearchModel model = new BinarySearchModel();
        BinarySearchView view = new BinarySearchView();
        BinarySearchController controller = new BinarySearchController(model, view);
        
        controller.run();
    }
}
