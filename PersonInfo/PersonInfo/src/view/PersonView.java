package view;

import java.util.Scanner;
import model.Person;

public class PersonView {

    private Scanner sc = new Scanner(System.in);

    public void displayPersonInfo(Person person) {
        System.out.println("\nInformation of Person you have entered:");
        System.out.println("Name: " + person.getName());
        System.out.println("Address: " + person.getAddress());
        System.out.println("Salary: " + person.getSalary());
    }
}
