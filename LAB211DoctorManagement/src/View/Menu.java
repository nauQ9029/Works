/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package View;

import Model.Doctor;
import java.util.Map;

/**
 *
 * @author plmin
 */
public class Menu {

    public void displayMenu() {
        System.out.println("========= Doctor Management ==========");
        System.out.println("1. Add doctor");
        System.out.println("2. Update doctor");
        System.out.println("3. Delete doctor");
        System.out.println("4. Search doctor");
        System.out.println("5. Exit");
        System.out.print("Your option: ");
    }

    public void displaySearchResult(Map<String, Doctor> searchResults) {
        System.out.println("Search Results:");
        System.out.printf("%-5s %-10s %-15s %-15s%n", "Code", "Name", "Specialization", "Availability");
        for (Map.Entry<String, Doctor> entry : searchResults.entrySet()) {
            Doctor doctor = entry.getValue();
            System.out.printf("%-5s %-10s %-15s %-15s%n", doctor.getCode(),
                    doctor.getName(), doctor.getSpec(), doctor.getAvail());
        }
    }
}
