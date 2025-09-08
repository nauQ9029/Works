/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Scanner;
import model.StudentModel;
import view.StudentView;

/**
 *
 * @author plmin
 */
public class StudentController {

    private StudentModel model;
    private StudentView view;
    private Scanner scanner;

    public StudentController(StudentModel model, StudentView view) {
        this.model = model;
        this.view = view;
        this.scanner = new Scanner(System.in);
    }

    public void execute() {
        while (true) {
            int choice = view.Menu();
            scanner.nextLine();
            switch (choice) {
                case 1:
                    createStudent();
                    break;
                case 2:
                    findNSort();
                    break;
                case 3:
                    updateOrDelete();
                    break;
                case 4:
                    report();
                    break;
            }
        }
    }

    private void createStudent() {
        System.out.println("Enter student information:");

        // Get user input
        System.out.print("ID: ");
        int id = scanner.nextInt();
        scanner.nextLine();             // Consume the newline character
        System.out.print("Name: ");
        String name = scanner.nextLine();
        System.out.print("Semester: ");
        int semester = scanner.nextInt();
        scanner.nextLine();
        System.out.print("Course: ");
        String course = scanner.nextLine();

        // Create a new student
        StudentModel newStudent = new StudentModel(id, name, semester, course);

        // Add the student to the model
        model.addStudent(newStudent);

        System.err.println("Student created successfully!");

    }

    private void findNSort() {
        System.out.print("Enter a part of student name to search: ");
        String searchTerm = scanner.nextLine();

        ArrayList<StudentModel> result = new ArrayList<>();

        // Find students with the given search term
        for (StudentModel student : model.getStudentList()) {
            if (student.getStudentName().contains(searchTerm)) {
                result.add(student);
            }
        }

        // Sort the result by student name
        Collections.sort(result, Comparator.comparing(StudentModel::getStudentName));

        // Display the sorted result
        for (StudentModel student : result) {
            view.printStudentDetails(student);
        }
    }

    private void updateOrDelete() {
        System.out.print("Enter student ID to update/delete: ");
        int studentId = scanner.nextInt();
        scanner.nextLine(); // Consume the newline character

        StudentModel studentToUpdateOrDelete = null;

        // Find the student with the given ID
        for (StudentModel student : model.getStudentList()) {
            if (student.getID() == studentId) {
                studentToUpdateOrDelete = student;
                break;
            }
        }

        if (studentToUpdateOrDelete == null) {
            System.out.println("Student not found with ID: " + studentId);
            return;
        }

        System.out.print("Do you want to update (U) or delete (D) the student? ");
        String choice = scanner.nextLine().toUpperCase();

        if (choice.equals("U")) {
            updateStudent(studentToUpdateOrDelete);
        } else if (choice.equals("D")) {
            // Delete the student
            model.getStudentList().remove(studentToUpdateOrDelete);
            System.out.println("Student deleted successfully!");
        } else {
            System.out.println("Invalid choice. No changes made.");
        }
    }
    
    private void updateStudent(StudentModel Student) {
        
    }

    private void report() {

    }
}
