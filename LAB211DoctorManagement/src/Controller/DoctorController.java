/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Controller;

import Model.Doctor;
import View.Menu;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

/**
 *
 * @author plmin
 */
public class DoctorController {

    private Map<String, Doctor> doctorDatabase;
    private Menu menu;
    private Scanner scanner;

    public DoctorController() {
        this.doctorDatabase = new HashMap<>();
        this.menu = new Menu();
        this.scanner = new Scanner(System.in);
    }

    public DoctorController(Map<String, Doctor> doctorDatabase, Menu menu, Scanner scanner) {
        this.doctorDatabase = doctorDatabase;
        this.menu = menu;
        this.scanner = scanner;
    }

    public void execute() {
        boolean exit = false;
        do {
            menu.displayMenu();
            int choice = scanner.nextInt();
            switch (choice) {
                case 1:
                    addDoc();
                    break;
                case 2:
                    updateDoc();
                    break;
                case 3:
                    deleteDoc();
                    break;
                case 4:
                    searchDoc();
                    break;
                case 5:
                    System.out.println("Exiting the program...");
                    exit = true;
                    break;
                default:
                    System.out.println("Invalid option!");
                    break;
            }
        } while (!exit);
    }

    public void addDoc() {
        System.out.println("--------- Add Doctor ----------");
        scanner.nextLine();
        System.out.print("Enter Code: ");
        String code = scanner.nextLine();

        System.out.print("Enter Name: ");
        String name = scanner.nextLine();

        System.out.print("Enter Specialization: ");
        String specialization = scanner.nextLine();

        System.out.print("Enter Availability: ");
        int availability = scanner.nextInt();
        scanner.nextLine();

        Doctor doctor = new Doctor(code, name, specialization, availability);

        try {
            if (doctorDatabase.containsKey(code)) {
                System.out.println("Doctor with the same code already exists. Please use a unique code.");
            } else {
                doctorDatabase.put(code, doctor);
                System.out.println("Doctor added successfully!");
            }
        } catch (Exception e) {
            System.out.println("An error occurred: " + e.getMessage());
        }
    }

    public void updateDoc() {
        System.out.println("--------- Update Doctor ----------");
        scanner.nextLine();
        System.out.print("Enter Code: ");
        String code = scanner.nextLine();

        if (doctorDatabase.containsKey(code)) {
            System.out.print("Enter New Name: ");
            String name = scanner.nextLine();

            System.out.print("Enter New Specialization: ");
            String specialization = scanner.nextLine();

            System.out.print("Enter New Availability: ");
            int availability = scanner.nextInt();

            Doctor updatedDoctor = new Doctor(code, name, specialization, availability);

            try {
                doctorDatabase.put(code, updatedDoctor);
                System.out.println("Doctor updated successfully!");
            } catch (Exception e) {
                System.out.println("An error occurred: " + e.getMessage());
            }
        } else {
            System.out.println("Doctor with code " + code + " does not exist.");
        }
    }

    public void deleteDoc() {
        System.out.println("--------- Delete Doctor ----------");
        scanner.nextLine();
        System.out.print("Enter Code: ");
        String code = scanner.nextLine();

        if (doctorDatabase.containsKey(code)) {
            try {
                doctorDatabase.remove(code);
                System.out.println("Doctor deleted successfully!");
            } catch (Exception e) {
                System.out.println("An error occurred: " + e.getMessage());
            }
        } else {
            System.out.println("Doctor with code " + code + " does not exist.");
        }
    }

    public void searchDoc() {
        scanner.nextLine();
        System.out.println("--------- Search Doctor ----------");
        System.out.println("List of doctors:");
        for (Doctor doctor : doctorDatabase.values()) {
            doctor.display();
        }
        
        System.out.print("Enter Code: ");
        String searchInput = scanner.nextLine();

        Map<String, Doctor> searchResults = new HashMap<>();
        for (Map.Entry<String, Doctor> entry : doctorDatabase.entrySet()) {
            Doctor doctor = entry.getValue();
            if (doctor.getCode().equalsIgnoreCase(searchInput) || doctor.getSpec().equalsIgnoreCase(searchInput)) {
                searchResults.put(entry.getKey(), doctor);
            }
        }

        menu.displaySearchResult(searchResults);
    }
}
