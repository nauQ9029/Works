/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package View;

import java.util.Scanner;

/**
 *
 * @author plmin
 */
public class FormatView {

    private Scanner scanner;

    public FormatView() {
        scanner = new Scanner(System.in);
    }
    public void menu() {
        System.out.println("====== Validate Progaram ======");
    }
    public String getPhoneInput() {
        System.out.print("Phone number: ");
        return scanner.nextLine();
    }

    public String getMailInput() {
        System.out.print("Email: ");
        return scanner.nextLine();
    }

    public String getDateInput() {
        System.out.print("Date: ");
        return scanner.nextLine();
    }

    public void displayMessage(String message) {
        System.out.println(message);
    }

    public void closeScanner() {
        scanner.close();
    }
}
