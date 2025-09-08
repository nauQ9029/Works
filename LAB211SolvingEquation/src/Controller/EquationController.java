/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Controller;

import Model.EquationModel;
import View.EquationView;
import Model.Number;
import java.util.List;

/**
 *
 * @author plmin
 */
public class EquationController {

    private EquationModel equationModel;
    private Number number;
    private EquationView equationView;

    public EquationController() {
        this.equationModel = new EquationModel();
        this.number = new Number();
        this.equationView = new EquationView();
    }

    public void execute() {
        while (true) {
            equationView.displayMenu();                         // Display menu
            int option = equationView.getUserOption();          // Get user choice

            switch (option) {
                case 1:
                    superlativeEquation();
                    break;
                case 2:
                    quadraticEquation();
                    break;
                case 3:
                    System.out.println("Exit the program...");
                    System.exit(0);
                default:
                    System.out.println("Invalid option.");
            }
        }
    }

    public void superlativeEquation() {
        System.out.println("----- Calculate Superlative Equation -----");
        while (true) {
            String inputA = equationView.getInput("Enter A: ");
            String inputB = equationView.getInput("Enter B: ");

            if (number.checkInput(inputA) && number.checkInput(inputB)) {
                float a = Float.parseFloat(inputA);                                 // A -> a
                float b = Float.parseFloat(inputB);                                 // B -> b
                List<Float> results = equationModel.calculateEquation(a, b);
                equationView.displayNumberInfo(results);
                return;
            } else {
                System.out.println("Invalid input. Coefficients must be a number");
            }
        }
    }

    public void quadraticEquation() {
        System.out.println("----- Calculate Quadratic Equation -----");
        while (true) {
            String inputA = equationView.getInput("Enter coefficient A: ");
            String inputB = equationView.getInput("Enter coefficient B: ");
            String inputC = equationView.getInput("Enter coefficient C: ");

            if (number.checkInput(inputA) && number.checkInput(inputB) && number.checkInput(inputC)) {
                float a = Float.parseFloat(inputA);
                float b = Float.parseFloat(inputB);
                float c = Float.parseFloat(inputC);
                List<Float> results = equationModel.calculateQuadEquation(a, b, c);
                equationView.displayNumberInfo(results);
                return;
            } else {
                System.out.println("Invalid input. Coefficients must be valid numbers.");
            }
        }

    }
}
