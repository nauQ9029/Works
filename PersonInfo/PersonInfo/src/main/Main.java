package main;

import control.PersonController;
import model.Person;
import view.PersonView;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter the number of persons: ");
        int numPersons = scanner.nextInt();
        scanner.nextLine(); 

        PersonController controller = new PersonController(numPersons);
        PersonView view = new PersonView();

        System.out.println("=====Management Person programer=====");
        for (int i = 0; i < numPersons; i++) {
            try {
                controller.inputPersonInfo(i);
            } catch (Exception e) {
                System.out.println("Error: " + e.getMessage());
                i--; 
            }
        }

        try {
            Person[] sortedPersons = controller.sortBySalary();
            for (Person person : sortedPersons) {
                if (person != null) {
                    view.displayPersonInfo(person);
                    System.out.println();
                }
            }
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
