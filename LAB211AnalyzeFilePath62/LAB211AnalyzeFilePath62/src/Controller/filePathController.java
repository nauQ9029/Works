/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Controller;

import Model.filePathModel;
import View.filePathView;

/**
 *
 * @author plmin
 */
public class filePathController {

    private filePathView view;
    private filePathModel model;

    public filePathController(filePathView view, filePathModel model) {
        this.view = view;
        this.model = model;
    }

    public void execute() {
        String filePath = view.checkInputString(); // Get the file path from user input

        model = new filePathModel(filePath); // Initialize model with the file path obtained

        String disk = model.getDisk();
        String extension = model.getExtension();
        String fileName = model.getFileName();
        String path = model.getPath();
        String[] folders = model.getFolders();

        view.displayResult(disk, path, extension, fileName, folders);
    }
}
