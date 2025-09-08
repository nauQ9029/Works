/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package View;

import Common.Validation;
import Controller.TaxController;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

/**
 *
 * @author plmin
 */
public class TaxView {

    private TaxController controller;
    private Validation validation;
    private Scanner scanner;

    public TaxView(TaxController controller) {
        this.controller = controller;
        this.validation = new Validation();
        this.scanner = new Scanner(System.in);
    }

    public void getInputAndCal() {
        System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Income tax calculator ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        
        //
        System.out.print("Enter total income: ");
        double totalIncome = scanner.nextDouble();

        //
        System.out.print("\nEnter number of dependent children: ");
        int numChildren = scanner.nextInt();

        // Input children ages and their studying status
        List<Integer> childAge = new ArrayList<>();
        List<Boolean> childStudyingStatus = new ArrayList<>();
        for (int i = 0; i < numChildren; i++) {
            System.out.print("\nEnter age of child " + (i + 1) + ": ");
            int age = scanner.nextInt();
            childAge.add(age);
            System.out.print("Is child " + (i + 1) + " studying? (true/false): ");
            boolean studying = scanner.nextBoolean();
            childStudyingStatus.add(studying);
        }
        
        //
        System.out.print("Enter number of siblings: ");
        int numSibling = scanner.nextInt();

        List<Integer> parentAges = new ArrayList<>();
        for (int i = 0; i < 2; i++) {
            System.out.print("Enter age of parent " + (i + 1) + ": ");
            parentAges.add(scanner.nextInt());
        }

        if (validation.validateInput(totalIncome, numChildren, childAge, childStudyingStatus, numSibling, parentAges)) {
            controller.calTax(totalIncome, numChildren, childAge, childStudyingStatus, numSibling, parentAges);
        } else {
            System.out.println("Invalid input. Please try again.");
        }
    }
    
    public void display(double TaxAmount) {
        System.out.println("Tax to be paid: " + TaxAmount);
    }
}
