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
public class filePathView {

    private Scanner scanner = new Scanner(System.in);

    public String checkInputString() {
        Scanner sc = new Scanner(System.in);
        while (true) {
            System.out.println("Please input Path: ");
            String result = sc.nextLine().trim();
            if (result.length() == 0) {
                System.err.println("The path is empty, please re-enter.");
            } else if (!result.matches("^[a-zA-Z]:\\\\(?:[^\\\\\\/:*?\"<>|\\r\\n]+\\\\)*[^\\\\\\/:*?\"<>|\\r\\n]*$")) {
                System.err.println("Invalid path format. Please enter a valid file path.");
            } else {
                return result;
            }
        }
    }

    public void displayResult(String disk, String path, String extension, String fileName, String[] folders) {
        System.out.println("----- Result Analysis -----");
        System.out.println("Disk: " + disk);
        System.out.println("Extension: " + extension);
        System.out.println("File Name: " + fileName);
        System.out.println("Path: " + path);
        System.out.print("Folders: ");
        for (String folder : folders) {
            System.out.print("[" + folder + "]");
        }
    }
}
