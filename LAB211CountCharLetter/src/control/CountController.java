/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package control;

import java.util.Scanner;
import model.CountModel;
import view.CountView;

/**
 *
 * @author plmin
 */
public class CountController {

    private CountModel model;
    private CountView view;
    private Scanner scanner;

    // Constructor
    public CountController() {
        this.model = new CountModel();
        this.view = new CountView();
        this.scanner = new Scanner(System.in);
    }
    
    public void run() {
        System.out.println("Enter content: ");
        String userInput = scanner.nextLine();
        
        // Process content input and update the model
        model.processInput(userInput);
        
        // Display results
        view.displayFormattedResults(model.getWordCountMap(), model.getLetterCountMap());
    }
}
