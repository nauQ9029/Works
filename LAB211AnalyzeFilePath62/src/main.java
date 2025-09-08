
import Controller.filePathController;
import Model.filePathModel;
import View.filePathView;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
/**
 *
 * @author plmin
 */
public class main {

    public static void main(String[] args) {
        filePathView view = new filePathView();
        filePathModel model;
        filePathController controller;

        // Create controller
        controller = new filePathController(view, null);

        // Execute the controller
        controller.execute();
    }
}
