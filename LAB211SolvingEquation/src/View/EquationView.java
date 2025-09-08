/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package View;

import java.util.List;
import java.util.Scanner;
import Model.Number;

/**
 *
 * @author plmin
 */
public class EquationView {

    Scanner scanner;
    private Number number;

    public EquationView() {
        this.scanner = new Scanner(System.in);
        this.number = new Number();
    }

    // Display menu
    public void displayMenu() {
        System.out.println("========= Equation Program =========");
        System.out.println("1. Calculate Superlative Equation");
        System.out.println("2. Calculate Quadratic Equation");
        System.out.println("3. Exit");
    }

    // Get user option
    public int getUserOption() {
        System.out.print("Select option: ");
        return scanner.nextInt();
    }

    // Get input of the user option
    public String getInput(String prompt) {
        System.out.print(prompt);
        return scanner.next();
    }

    public void displayResults(List<Float> results) {
        if (results != null && !results.isEmpty()) {
            System.out.println("Results: " + results);
            displayNumberInfo(results);
        } else {
            System.out.println("No solution");
        }
    }

    public void displayNumberInfo(List<Float> numbers) {
        System.out.print("Number is Odd: ");
        for (Float number : numbers) {
            if (!this.number.isOdd(number)) {
                System.out.print(number + " ");
            }
        }
        
        System.out.print("\nNumber is Even: ");
        for (Float number : numbers) {
            if(this.number.isOdd(number)) {
                System.out.print(number + " ");
            }
        }
        
        System.out.print("\nNumber is Perfect Square: ");
        for(Float number : numbers) {
            if(this.number.isPerfectSquare(number)) {
                System.out.print(number + " ");
            }
        }
        
        System.out.println("");
    }

    public void closeScanner() {
        scanner.close();
    }
}
