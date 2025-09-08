/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package view;

import java.util.Scanner;
import model.StudentModel;

/**
 *
 * @author plmin
 */
public class StudentView {
    
    private Scanner scanner;
    
    public int Menu() {
        System.out.println("WELCOME TO STUDENT MANAGEMENT");
        System.out.println("1. Create");
        System.out.println("2. Find and Sort");
        System.out.println("3. Update/Delete");
        System.out.println("4. Report");
        System.out.println("5. Exit");
        System.out.print("Enter option: ");
        return scanner.nextInt();
    }

    public void printStudentDetails(StudentModel student) {
        
    }
    
    public void createMenu() {
        
    }
}
