/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Controller;

import Model.Student;
import Service.SInfoService;
import View.SInfoView;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

/**
 *
 * @author plmin
 */
public class SInfoController {

    private SInfoService SInfoService;
    private SInfoView SInfoView;
    private Scanner scanner;

    public SInfoController() {
        this.SInfoService = new SInfoService();
        this.SInfoView = new SInfoView();
        this.scanner = new Scanner(System.in);
    }

    public void execute() {
        List<Student> allStudent = new ArrayList<>();                           // Create list to store all student
        String choice = "Y";
        SInfoView.display();
        
        while (choice.equalsIgnoreCase("Y")) {
            List<Student> student = SInfoView.inputStudentInformation();
            allStudent.addAll(student);                                         // Add the entered student to the allStudent
            student = SInfoService.sortStudent(allStudent);                     // Sort allStudent list

            choice = scanner.nextLine();
            if (choice.equalsIgnoreCase("N")) {
                SInfoView.displayList(student);
                break;
            }
        }
    }
}
