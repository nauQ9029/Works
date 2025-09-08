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
public class EbankView {

    private Scanner scanner;

    public void languageChoice() {
        System.out.println("-------Login Program-------");
        System.out.println("1. Vietnamese \n2. English \n3. Exit");
        System.out.print("Please choice one option: ");
    }

    public void displayMessage(String message) {
        System.out.println(message);
    }

    public String getInput(String prompt) {
        System.out.print(prompt);
        return scanner.next();
    }
}
