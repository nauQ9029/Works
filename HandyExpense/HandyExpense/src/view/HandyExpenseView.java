package view;

import java.util.Scanner;
import control.HandyExpenseController;

public class HandyExpenseView {

    Scanner sc = new Scanner(System.in);

//    public void addExpenseFromUserInput() {
//        System.out.println("-------- Add an expense--------");
//        System.out.println("Enter Date (dd/MM/yyyy): ");
//        String dateStr = sc.nextLine();
//        System.out.println("Enter Amount: ");
//        double amount = sc.nextDouble();
//        sc.nextLine(); 
//        System.out.println("Enter content: ");
//        String content = sc.nextLine();
//        
//        HandyExpenseController control = new HandyExpenseController();
//        control.addExpense(dateStr, amount, content);
//    }

    public void menu() {
    HandyExpenseController control = new HandyExpenseController();
    int choice;
    do {
        System.out.println("=======Handy Expense program======");
        System.out.println("1. Add an expense");
        System.out.println("2. Display all expenses");
        System.out.println("3. Delete an expense");
        System.out.println("4. Quit");
        System.out.print("Your choice: ");
        choice = sc.nextInt();
        sc.nextLine(); 

        switch (choice) {
            case 1:
                control.addExpense();
                break;
            case 2:
                control.displayAll();
                break;
            case 3: 
                control.deleteExpense();
                break;
            case 4:
                System.out.println("Byeeeeeee");
                break;
        }
    } while (choice != 4);
}

}
