/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Controller;

import Model.ContactModel;
import View.ContactView;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

/**
 *
 * @author plmin
 */
public class ContactController {

    private List<ContactModel> contacts;
    private Scanner scanner;
    private ContactView contactView;

    public ContactController() {
        this.contacts = new ArrayList<>();
        this.scanner = new Scanner(System.in);
        this.contactView = new ContactView();
    }

    public void execute() {
        while(true) {
            int choice = contactView.displayMenu();

            switch (choice) {
                case 1:
                    addContact();
                    break;
                case 2:
                    displayAllContact();
                    break;
                case 3:
                    deleteContact();
                    break;
                case 4:
                    System.out.println("Exitting the program...");
                    System.exit(0);
                    break;
                default:
                    System.out.println("Invalid choice!");
                    break;
            }
        }
    }

    // Add a contact
    public void addContact() {
        System.out.println("-------- Add a Contact --------");

        String fullName;
        String firstName;
        String lastName;

        // Ensure a valid name is entered
        while (true) {
            System.out.print("Enter Name: ");
            fullName = scanner.nextLine();
            String[] nameParts = fullName.split(" ");
            if (nameParts.length >= 2) {
                firstName = nameParts[0];
                lastName = nameParts[1];
                break;
            } else {
                System.out.println("Invalid name format. Please enter both first name and last name.");
            }
        }

        // Proceed to other inputs
        String group = validateInput("Group");
        String address = validateInput("Address");

        // Ensure a valid phone number is entered
        String phone;
        do {
            phone = validateInput("Phone");
        } while (!isValidPhoneNumber(phone));

        // Add contact to the list
        int newID = contacts.isEmpty() ? 1 : contacts.get(contacts.size() - 1).getID() + 1;
        ContactModel newContact = new ContactModel(newID, fullName, group, address, phone, lastName, firstName);
        contacts.add(newContact);

        System.out.println("Contact added successfully!");
    }

    public void displayAllContact() {
        System.out.println("--------------------------------- Display all Contact ----------------------------");

        if (contacts.isEmpty()) {
            System.out.println("No contacts available.");
        } else {
            ContactView view = new ContactView();
            view.displayAll(contacts);
        }
    }

    public void deleteContact() {
        System.out.println("------- Delete a Contact -------");
        System.out.println("Enter ID: ");
        int idToDelete = scanner.nextInt();

        // Find the contact with the given ID
        ContactModel contactToDelete = null;
        for (ContactModel contact : contacts) {
            if (contact.getID() == idToDelete) {
                contactToDelete = contact;
                break;
            }
        }

        // Check if contact with the given ID exists
        if (contactToDelete != null) {
            contacts.remove(contactToDelete);
            System.out.println("Successful");
        } else {
            System.out.println("No contact found with the given ID.");
        }
    }

    private String validateInput(String field) {
        String input;
        do {
            System.out.print("Enter " + field + ": ");
            input = scanner.nextLine();
            if (input.trim().isEmpty()) {
                System.out.println(field + " cannot be empty. Please enter a valid " + field + ".");
            } else {
                return input;
            }
        } while (true);
    }

    // Implement phone number validation logic based on the specified formats
    private boolean isValidPhoneNumber(String phoneNumber) {
        String[] validPhoneFormats = {
            "\\d{10}",                                  // 1234567890
            "\\d{3}-\\d{3}-\\d{4}",                     // 123-456-7890
            "\\d{3}-\\d{3}-\\d{4} x\\d+",               // 123-456-7890 x1234
            "\\d{3}-\\d{3}-\\d{4} ext\\d+",             // 123-456-7890 ext1234
            "\\(\\d{3}\\)-\\d{3}-\\d{4}",               // (123)-456-7890
            "\\d{3}\\.\\d{3}\\.\\d{4}",                 // 123.456.7890
            "\\d{3} \\d{3} \\d{4}"                      // 123 456 7890
        };

        // Return true if valid, false otherwise
        for (String format : validPhoneFormats) {
            if (phoneNumber.matches(format)) {
                return true;
            }
        }

        // Prompt the user to enter a valid phone number if user input the wrong format
        System.out.println("""
                       Please input Phone flow:
                        1234567890
                        123-456-7890
                        123-456-7890 x1234
                        123-456-7890 ext1234
                        (123)-456-7890
                        123.456.7890
                        123 456 7890""");
        return false;
    }
}
