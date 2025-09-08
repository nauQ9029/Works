package view;

import java.util.Scanner;
import control.WorkerControl;

public class WorkerView {
    WorkerControl control = new WorkerControl();
    
    Scanner sc = new Scanner(System.in);
    String status;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    
    public void menu() {
        int choice;
        do {
            System.out.println("-----------WORKER MANAGEMENT-----------");
            System.out.println("1. Add Worker");
            System.out.println("2. Up Salary");
            System.out.println("3. Down Salary");
            System.out.println("4. Display information salary");
            System.out.println("5. Exit");
            System.out.println("-------------------------------------------");
            System.out.print("Input your choice: ");
            choice = sc.nextInt();

            switch (choice) {
                case 1:
                    System.out.println("-------Add Worker--------");
                    control.addWorker();
                    break;

                case 2:
                    System.out.println("--------Up/Down Salary---------");
                    System.out.println("Enter ID: ");
                    String ID = sc.next();
                    control.increaseSalary(ID);
                    status = "UP";
                    break;

                case 3:
                    System.out.println("Enter ID: ");
                    String deID = sc.next();
                    control.decreaseSalary(deID);
                    
                    status = "DOWN";
                    break;

                case 4:
                    control.display();
                    break;

                case 5:
                    System.out.println("GoodByeeeee");
                    break;

                default:
                    System.out.println("Invalid choice. Please select again.");
            }

        } while (choice != 5);
    }
}
