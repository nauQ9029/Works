package view;

import control.ComputerController;
import control.CalculateBMI;
import model.ComputerModel;

import java.util.Scanner;

public class ComputerView {

    private Scanner sc = new Scanner(System.in);
    private ComputerModel model;
    private ComputerController controller;
    private CalculateBMI bmiCalculator;

    public ComputerView() {
        this.model = new ComputerModel(0, "+");
        this.controller = new ComputerController(model, this);
        this.bmiCalculator = new CalculateBMI(this);
    }

    public double inputNum() {
        System.out.println("Input number: ");
        return sc.nextDouble();
    }

    public String inputOperator() {
        System.out.println("Input operator (+, -, *, /, =): ");
        return sc.next();
    }

    public void displayResult(double result) {
        System.out.println("Result: " + result);
    }

    public void run() {
        int choice;
        do {
            System.out.println("---------COMPUTER PROGRAM---------");
            System.out.println("1. Normal calculator");
            System.out.println("2. Calculator BMI index");
            System.out.println("3. Exit the program");
            System.out.println("-----------------------------------");
            System.out.print("Input your choice: ");

            choice = sc.nextInt();

            switch (choice) {
                case 1:
                    controller.calculate();
                    break;
                case 2:
                    bmiCalculator.calculateBMI();
                    break;
                case 3:
                    System.out.println("Byeeeee");
            }
        } while (choice != 3);
    }

    public double inputHeightBMI() {
        double height = 0;
        boolean isValidInput = false;

        do {
            try {
                System.out.println("Input your height (in cm): ");
                height = sc.nextDouble();
                isValidInput = true;
            } catch (Exception e) {
                System.out.println("Invalid input. Please enter a valid number for height.");
                sc.nextLine();
            }
        } while (!isValidInput);

        return height;
    }

    public double inputWeightBMI() {
        double weight = 0;
        boolean isValidInput = false;

        do {
            try {
                System.out.println("Input your weight (in kg): ");
                weight = sc.nextDouble();
                isValidInput = true;
            } catch (Exception e) {
                System.out.println("Invalid input. Please enter a valid number for weight.");
                sc.nextLine();
            }
        } while (!isValidInput);

        return weight;
    }
}
