/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Common;

import java.util.Scanner;

/**
 *
 * @author plmin
 */
public class Validation {

    private Scanner scanner;

    public Validation(Scanner scanner) {
        this.scanner = scanner;
    }

    public float validateMark() {
        float mark = 0;
        boolean validMark = false;
        while (!validMark || mark <= 0 || mark > 10) {
            System.out.print("Mark: ");
            try {
                mark = Float.parseFloat(scanner.nextLine());
                if (mark <= 0 || mark > 10) {                                   // 
                    System.out.println("Invalid mark. Please enter a number between 0 and 10.");
                } else {
                    validMark = true;
                }
            } catch (NumberFormatException e) {
                System.out.println("Invalid mark. Please enter a valid number.");
            }
        }
        return mark;
    }
}
