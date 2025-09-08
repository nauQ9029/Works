/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package View;

import Common.Validation;
import Model.Student;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

/**
 *
 * @author plmin
 */
public class SInfoView {

    private Scanner scanner;
    private Validation validation;

    public SInfoView() {
        this.scanner = new Scanner(System.in);
        this.validation = new Validation(scanner);
    }

    public void display() {
        System.out.println("====== Collection Sort Program ======");
    }

    public List<Student> inputStudentInformation() {
        List<Student> students = new ArrayList<>();

        System.out.println("Please input student information");
        System.out.print("Name: ");
        String name = scanner.nextLine();
        System.out.print("Class: ");
        String classes = scanner.nextLine();
        float mark = validation.validateMark();
        students.add(new Student(name, mark, classes));
        System.out.print("Do you want to enter more student information?(Y/N): ");

        return students;
    }

    public void displayList(List<Student> students) {
        int i = 1;
        for (Student student : students) {
            System.out.println("\n-------------Student " + i++ + "-------------");
            System.out.println("Name: " + student.getName() + "\nClass: " + student.getClasses() + "\nMark: " + student.getMark());
        }
    }
}
