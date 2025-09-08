/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package View;

import Controller.CCRMController;
import Model.Task;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Scanner;

/**
 *
 * @author plmin
 */
public class CCRMView {

    private CCRMController controller;

    public CCRMView(CCRMController controller) {
        this.controller = controller;
    }

    public void execute() {
        Scanner scanner = new Scanner(System.in);
        int option;
        do {
            menu();
            System.out.print("Enter option: ");
            option = scanner.nextInt();
            switch (option) {
                case 1:
                    addTasks();
                    break;
                case 2:
                    deleteTasks();
                    break;
                case 3:
                    displayTasks();
                    break;
                case 4:
                    System.out.println("Exiting the program...");
                    System.exit(0);
                default:
                    System.out.println("Invalid option!");
                    break;
            }
        } while (option != 4);
    }

    public void menu() {
        System.out.println("========= Task program =========");
        System.out.println("1. Add Task \n2. Delete task \n3. Display Task \n4. Exit");
    }

    public void addTasks() {
        Scanner scanner = new Scanner(System.in);
        System.out.println("------------Add Task---------------");
        System.out.print("Requirement Name: ");
        String requirementName = scanner.nextLine();
        System.out.print("Task Type: ");
        int taskTypeID = scanner.nextInt();
        scanner.nextLine();
        System.out.print("Date: ");
        String dateString = scanner.nextLine();
        System.out.print("From: ");
        Double planFrom = scanner.nextDouble();
        System.out.print("To: ");
        Double planTo = scanner.nextDouble();
        scanner.nextLine();
        System.out.print("Assignee: ");
        String assignee = scanner.nextLine();
        System.out.print("Reviewer: ");
        String reviewer = scanner.nextLine();

        try {
            Date date = new SimpleDateFormat("dd-MM-yyyy").parse(dateString); // Parse the date string
            int taskId = controller.addTask(requirementName, taskTypeID, date, planFrom, planTo, assignee, reviewer);
            System.out.println("Successfully added task ID " + taskId + ".");
        } catch (IllegalArgumentException e) {
            System.out.println("Failed to add task. " + e.getMessage());
        } catch (ParseException e) {
            System.out.println("Failed to parse date. Please enter date in the format dd-MM-yyyy.");
        }
    }

    public void deleteTasks() {
        Scanner scanner = new Scanner(System.in);
        System.out.println("---------Delete Task------");
        System.out.print("ID: ");
        String taskId = scanner.nextLine();

        try {
            controller.deleteTask(taskId);
            System.out.println("Succesfully deleted task ID " + taskId + ".");
        } catch (IllegalArgumentException e) {
            System.out.println("Failed to delete task. " + e.getMessage() + ".");
        }
    }

    public void displayTasks() {
        System.out.println("----------------------------------------- Task ---------------------------------------");
        System.out.printf("%-5s %-20s %-10s %-10s %-5s %-10s %-10s", "ID", "Name", "Task Type", "Date", "Time", "Assignee", "Reviewer");
        System.out.println("");
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");

        for (Model.Task task : controller.getDataTasks()) {
            String dateString = dateFormat.format(task.getDate());
            double time = task.getPlanTo() - task.getPlanFrom();
            String taskTypeName = getTaskTypeName(task.getTaskTypeID());
            System.out.printf("%-5d %-20s %-10s %-10s %-5s %-10s %-10s\n",
                    task.getId(), task.getRequirementName(), taskTypeName,
                    dateString, time,
                    task.getAssignee(), task.getReviewer());
        }
    }
    
    // Get the task type name based on its ID (1-Code, 2-Test, 3-Design, 4-Review)
    private String getTaskTypeName(int taskTypeID) {
    switch (taskTypeID) {
        case 1:
            return Task.TaskType.CODE.getName();
        case 2:
            return Task.TaskType.TEST.getName();
        case 3:
            return Task.TaskType.DESIGN.getName();
        case 4:
            return Task.TaskType.REVIEW.getName();
        default:
            return "Unknown";
    }
}
}
