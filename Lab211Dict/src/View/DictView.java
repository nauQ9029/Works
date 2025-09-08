/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package View;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 *
 * @author plmin
 */
public class DictView {

    public void displayMenu() {
        System.out.println("1. Add word");
        System.out.println("2. Delete word");
        System.out.println("3. Translate word");
        System.out.println("4. Exit");
        System.out.print("Select an option: ");
    }

    public String getInput() throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        return reader.readLine();
    }

    public void displayTranslation(String translation) {
        System.out.println("Translation: " + translation);
    }

    public void displayMessage(String message) {
        System.out.println(message);
    }
}
