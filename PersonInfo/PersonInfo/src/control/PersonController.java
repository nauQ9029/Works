package control;

import java.util.Scanner;
import model.Person;

public class PersonController {

    private Scanner sc = new Scanner(System.in);
    private Person[] persons;

    public PersonController(int numPersons) {
        this.persons = new Person[numPersons];
    }

    public void inputPersonInfo(int index) {
        System.out.print("Name: ");
        String name = sc.next();
        System.out.print("Address: ");
        String address = sc.next();
        double salary;
        while (true) {
            try {
                System.out.print("Salary: ");
                salary = Double.parseDouble(sc.next());
                if (salary < 0) {
                    throw new Exception("Salary must be a positive number.");
                }
                break;
            } catch (NumberFormatException e) {
                System.out.println("Salary must be a number.");
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        }
        persons[index] = new Person(name, address, (int) salary);
    }

    public Person[] sortBySalary() throws Exception {
        if (persons == null || persons.length == 0) {
            throw new Exception("Can't Sort Person");
        }
        int n = persons.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (persons[j].getSalary() > persons[j + 1].getSalary()) {
                    Person temp = persons[j];
                    persons[j] = persons[j + 1];
                    persons[j + 1] = temp;
                }
            }
        }
        return persons;
    }

    public Person[] getPersons() {
        return persons;
    }
}
