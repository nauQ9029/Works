/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package View;

import Model.SalaryModel;
import Model.WorkerModel;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Scanner;

/**
 *
 * @author plmin
 */
public class WorkerView {

    private Scanner scanner;
    private DateFormat dateFormat;

    public WorkerView() {
        this.scanner = new Scanner(System.in);
        this.dateFormat = new SimpleDateFormat("dd/MM/yyyy");
    }

    public int displayMenu() {
        System.out.println("======== Worker Management =========");
        System.out.println("1. Add Worker");
        System.out.println("2. Up salary");
        System.out.println("3. Down salary");
        System.out.println("4. Display Information salary");
        System.out.println("5. Exit");
        System.out.print("Enter option: ");
        return scanner.nextInt();
    }

    public void displaySalaryInfo(List<WorkerModel> workers) {
        System.out.println("--------------------Display Information Salary-----------------------");
        System.out.printf("%-8s %-8s %-8s %-10s %-8s %-15s%n",
                "Code", "Name", "Age", "Salary", "Status", "Date");
        for (WorkerModel worker : workers) {
            SalaryModel salaryModel = worker.getSalaryModel();
            System.out.printf("%-8s %-8s %-8d %-10s %-8s %-15s%n",
                    worker.getId(), worker.getName(), worker.getAge(),
                    salaryModel.getAmount(), salaryModel.getStatus(), dateFormat.format(salaryModel.getDateSalary()));
        }
    }
}
