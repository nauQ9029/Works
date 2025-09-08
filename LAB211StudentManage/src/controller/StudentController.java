
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
import java.util.stream.Collectors;
import java.util.Iterator;

import model.StudentModel;
import view.StudentView;

/**
 *
 * @author plmin
 */
public class StudentController {

    private StudentModel model;
    private StudentView view;
    private List<StudentModel> students;
    private Scanner scanner;

    public StudentController(StudentModel model, StudentView view) {
        this.model = model;
        this.view = view;
        this.students = new ArrayList<>();
    }

    public void execute() {
        int choice;
        Scanner scanner = new Scanner(System.in);
        do {
            view.Menu();
            choice = scanner.nextInt();
            switch (choice) {
                case 1:
                    create();
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
                case 5:
                    break;
                default:
                    System.out.println("Invalid choice! Please re-enter.");
            }
        } while (choice != 5);
        scanner.close();
    }

    public void create() {
        Scanner scannerA = new Scanner(System.in);
        System.out.print("ID: ");
        int ID = scannerA.nextInt();
        scannerA.nextLine();
        System.out.print("Name: ");
        String StudentName = scannerA.nextLine();
        System.out.print("Semester: ");
        int Semester = scannerA.nextInt();
        scannerA.nextLine();
        System.out.print("Course: ");
        String CourseName = scannerA.nextLine();

        // Create new student
        StudentModel newStudent = new StudentModel(ID, StudentName, Semester, CourseName);
        // Add the new student to the list
        students.add(newStudent);
    }

    public void findNSort() {
        if (students.isEmpty()) {
            System.out.println("List empty.");
            return;
        }
        Scanner scannerB = new Scanner(System.in);

        System.out.print("Enter student name: ");
        String searchTerm = scannerB.nextLine().toLowerCase();

        List<StudentModel> matchingStudents = students.stream()
                .filter(student -> student.getStudentName().toLowerCase().contains(searchTerm))
                .collect(Collectors.toList());

        if (matchingStudents.isEmpty()) {
            System.out.println("No matching students found.");
            return;
        }

        System.out.println("Matching students sorted by name:");
        for (StudentModel student : matchingStudents) {
            System.out.println("Name: " + student.getStudentName() + ", Semester: " + student.getSemester()
                    + ", Course name: " + student.getCourseName());
        }
    }

    public void updateOrDelete() {
        if (students.isEmpty()) {
            System.out.println("List empty.");
            return;
        }
        Scanner scannerC = new Scanner(System.in);

        System.out.print("Enter student ID: ");
        int studentID = scannerC.nextInt();
        scannerC.nextLine();

        Iterator<StudentModel> iterator = students.iterator();
        boolean studentFound = false;

        while (iterator.hasNext()) {
            StudentModel student = iterator.next();
            if (student.getID() == studentID) {
                studentFound = true;
                System.out.println("Found student with ID:" + studentID);
                System.out.println("Do you want to update or delete this data?");
                System.out.println("1. Update");
                System.out.println("2. Delete");
                System.out.print("Enter option: ");
                int choice2 = scannerC.nextInt();
                scannerC.nextLine();

                switch (choice2) {
                    case 1:
                        System.out.println("Enter new data for this ID:");
                        System.out.print("Name: ");
                        String newName = scannerC.nextLine();

                        System.out.print("Semester: ");
                        int newSemester = scannerC.nextInt();
                        scannerC.nextLine();
                        System.out.print("Course: ");
                        String newCourseName = scannerC.next();
                        scannerC.nextLine();

                        System.out.println("Data of " + studentID + " updated successfully.");

                        student.setStudentName(newName);
                        student.setSemester(newSemester);
                        student.setCourseName(newCourseName);

                        break;
                    case 2:
                        System.out.println("Delete data for this ID:");
                        System.out.println("Are you sure to delete? (Y) (N)");
                        String YNChoice = scannerC.next();
                        if ("Y".equals(YNChoice) || "y".equals(YNChoice)) {
                            iterator.remove();
                            System.out.println("Data of " + studentID + " deleted successfully.");
                        } else {
                            return;
                        }
                        break;
                    default:
                        System.out.println("Invalid choice!");
                }
            }
        }
    }

    public void report() {
        if (students.isEmpty()) {
            System.out.println("List empty.");
            return;
        }

        // Store the total courses for each student
        Map<Integer, Integer> totalCoursesMap = new HashMap<>();

        // Count the total courses 
        for (StudentModel student : students) {
            int studentID = student.getID();
            totalCoursesMap.put(studentID, totalCoursesMap.getOrDefault(studentID, 0) + 1);
        }

        // Display
        System.out.println("Student report: ");
        System.out.println("ID |(Student Name)-(Course Name)-(Total Course)");
        for (StudentModel student : students) {
            int studentID = student.getID();
            int totalCourses = totalCoursesMap.getOrDefault(studentID, 0);

            System.out.printf("%2d | %-15s | %-5s | %-2d%n", studentID, student.getStudentName(), student.getCourseName(), totalCourses);
            
            /*System.out.println(studentID + " | "
                    + student.getStudentName() + " | "
                    + student.getCourseName() + " | "
                    + totalCourses);
            */
        }
    }

}
