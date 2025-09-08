/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Controller;

import Model.SalaryModel;
import Model.SalaryStatus;
import Model.WorkerModel;
import View.WorkerView;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Scanner;

/**
 *
 * @author plmin
 */
public class WorkerController {

    private List<WorkerModel> workers;
    private WorkerView workerView;
    private Scanner scanner;
    private DateFormat dateFormat;

    public WorkerController() {
        this.scanner = new Scanner(System.in);
        this.workerView = new WorkerView();
        this.workers = new ArrayList<>();
        this.dateFormat = new SimpleDateFormat("dd/MM/yyyy");
    }

    public void execute() {
        while (true) {
            int choice = workerView.displayMenu();

            switch (choice) {
                case 1:
                    addWorker();
                    break;
                case 2:
                    changeSalary(SalaryStatus.UP);
                    break;
                case 3:
                    changeSalary(SalaryStatus.DOWN);
                    break;
                case 4:
                    displayInfo();
                    break;
                case 5:
                    System.out.println("Exiting the program...");
                    System.exit(0);
                    break;
                default:
                    System.out.println("Invalid choice!");
                    break;
            }
        }
    }

    public void addWorker() {
        System.out.println("--------- Add Worker ----------");
        System.out.print("Enter ID: ");
        String id = scanner.nextLine();
        System.out.print("Enter Name: ");
        String name = scanner.nextLine();
        int age;
        do {
            System.out.print("Enter Age: ");
            age = scanner.nextInt();
            scanner.nextLine();                                                 // Consume newline

            if (age < 18 || age > 50) {
                System.out.println("Age must be between 18 and 50.");
            }
        } while (age < 18 || age > 50);
        System.out.print("Enter Salary: ");
        double salary = scanner.nextDouble();
        scanner.nextLine();                                                     // Consume newline
        System.out.print("Enter work location: ");
        String workLocation = scanner.nextLine();
        Date currentDate = new Date();

        // Create a new SalaryModel for the worker
        SalaryModel salaryModel = new SalaryModel(id, SalaryStatus.UP, salary, currentDate);

        // Create newWorker object and add to list
        WorkerModel newWorker = new WorkerModel(id, name, age, salary, workLocation, currentDate, salaryModel);
        workers.add(newWorker);

        System.out.println("Worker added successfully.");
    }

    public void changeSalary(SalaryStatus status) {
        System.out.println("------- Up/Down Salary --------");
        System.out.print("Enter Code: ");
        String code = scanner.nextLine();
        System.out.print("Enter Salary: ");
        double amount = scanner.nextDouble();
        scanner.nextLine();                                                     // Consume newline

        // Find the worker with the given code
        WorkerModel workerToUpdate = null;
        for (WorkerModel worker : workers) {
            if (worker.getId().equals(code)) {
                workerToUpdate = worker;
                break;
            }
        }

        // Update the worker's salary information
        if (workerToUpdate != null) {
            System.out.print("Do you want to change the date? (Y | N): ");
            String changeDateInput = scanner.nextLine();
            if (changeDateInput.equalsIgnoreCase("Y")) {
                boolean validDateEntered = false;
                Date date = null;
                while (!validDateEntered) {
                    System.out.print("Enter new date (dd/MM/yyyy): ");
                    String dateString = scanner.nextLine();
                    try {
                        date = dateFormat.parse(dateString);
                        validDateEntered = true;                                // If parsing succeeds, mark as valid and exit loop
                    } catch (ParseException e) {
                        System.out.println("Invalid date format. Please enter date in the format dd/MM/yyyy.");
                    }
                }
                workerToUpdate.getSalaryModel().setDateSalary(date);
            }
            SalaryModel salary = workerToUpdate.getSalaryModel();
            salary.setAmount(amount);
            salary.setStatus(status);
            System.out.println("Salary adjusted successfully.");
        } else {
            System.out.println("Worker with code " + code + " not found.");
        }
    }
    
    // bruh
    public void displayInfo() {
        workerView.displaySalaryInfo(workers);
    }
}
