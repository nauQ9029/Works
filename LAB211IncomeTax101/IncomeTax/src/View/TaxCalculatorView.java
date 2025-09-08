/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package View;

import Controller.TaxCalculator;
import Model.Child;
import Model.Income;
import Model.Parent;
import Model.Person;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class TaxCalculatorView {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // Get user input
        System.out.print("Enter your name: ");
        String name = scanner.nextLine();
        
        System.out.print("Enter your age: ");
        int age = scanner.nextInt();
        scanner.nextLine(); // Consume newline
        
        // Get incomes
        List<Income> incomes = new ArrayList<>();
        System.out.print("Enter the number of incomes: ");
        int numIncomes = scanner.nextInt();
        scanner.nextLine(); // Consume newline
        
        for (int i = 0; i < numIncomes; i++) {
            System.out.println("Income " + (i + 1) + ":");
            System.out.print("Source: ");
            String source = scanner.nextLine();
            System.out.print("Amount: ");
            double amount = scanner.nextDouble();
            scanner.nextLine(); // Consume newline
            incomes.add(new Income(source, amount));
        }
        
        // Get children
        List<Child> children = new ArrayList<>();
        System.out.print("Enter the number of children: ");
        int numChildren = scanner.nextInt();
        scanner.nextLine(); // Consume newline
        
        for (int i = 0; i < numChildren; i++) {
            System.out.println("Child " + (i + 1) + ":");
            System.out.print("Name: ");
            String childName = scanner.nextLine();
            System.out.print("Age: ");
            int childAge = scanner.nextInt();
            System.out.print("Is studying? (true/false): ");
            boolean isStudying = scanner.nextBoolean();
            scanner.nextLine(); // Consume newline
            children.add(new Child(childName, childAge, isStudying));
        }
        
        // Get parents
        List<Parent> parents = new ArrayList<>();
        System.out.print("Enter the number of parents: ");
        int numParents = scanner.nextInt();
        scanner.nextLine(); // Consume newline
        
        for (int i = 0; i < numParents; i++) {
            System.out.println("Parent " + (i + 1) + ":");
            System.out.print("Name: ");
            String parentName = scanner.nextLine();
            System.out.print("Age: ");
            int parentAge = scanner.nextInt();
            scanner.nextLine(); // Consume newline
            parents.add(new Parent(parentName, parentAge));
        }
        
        // Create Person object
        Person person = new Person(name, age, incomes, children, parents);
        
        // Call Controller
        double taxableIncome = TaxCalculator.calculateTaxableIncome(person);
        double tax = TaxCalculator.calculateTax(taxableIncome);
        
        // Display result
        System.out.println("Tax to be paid: " + tax);
    }
}