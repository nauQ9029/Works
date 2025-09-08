/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package controller;

import java.util.Map;
import java.util.Scanner;
import model.LNCCModel;
import view.LNCCView;

/**
 *
 * @author plmin
 */
public class LNCCController {

    private LNCCModel model;
    private LNCCView view;
    private Scanner scanner;

    public LNCCController() {
        this.model = new LNCCModel();
        this.view = new LNCCView();
        this.scanner = new Scanner(System.in);
    }

    public void run() {
        System.out.println("Enter content: ");
        String userInput = scanner.nextLine();
        
        // Process content
        model.processInput(userInput);
        
        // Display result
        view.displayFormattedResults(model.getWordCountMap(), model.getLetterCountMap());
    }
}
