package control;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Scanner;
import model.Expense;

public class HandyExpenseController {

    ArrayList<Expense> expenseList = new ArrayList<>();
    Scanner sc = new Scanner(System.in);

    public void loadData() {
        try {
            BufferedReader br = new BufferedReader(new FileReader("expense.txt"));
            String line;
            while ((line = br.readLine()) != null) {
                String[] space = line.split("\t");
                if (space.length == 4) {
                    expenseList.add(new Expense(Integer.parseInt(space[0]),space[1], Double.parseDouble(space[2]), space[3]));
                }
            }
            br.close();
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }

    public void displayAll() {
        System.out.println("---------Display all expenses------------");
        System.out.println("ID\tDate\tAmount\t\tContent");
        
        for (Expense p : expenseList) {
            System.out.println(p.toString());
        }
    }

    public void saveExpense() {
        try {
            BufferedWriter bw = new BufferedWriter(new FileWriter("expense.txt"));
            for (Expense expense : expenseList) {
                bw.write(expense.toString() + "\n");
            }
            bw.close();
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }

    public void deleteExpense() {
    System.out.println("--------Delete an expense------");
    System.out.println("Enter ID: ");
    int ID = sc.nextInt();
    boolean found = false;
    for (int i = 0; i < expenseList.size(); i++) {
        Expense exp = expenseList.get(i);
        if (exp.getID() == ID) {
            expenseList.remove(i);
            found = true;
            System.out.println("Delete an expense successful");
            break;
        }
    }
    if (!found) {
        System.out.println("Delete an expense fail: Expense not found");
    }
    saveExpense();
}

    public void addExpense() {
        System.out.println("-------- Add an expense--------");
        System.out.println("Enter Date (dd/MM/yyyy): ");
        String dateStr = sc.nextLine();
        System.out.println("Enter Amount: ");
        double amount = sc.nextDouble();
        sc.nextLine(); 
        System.out.println("Enter content: ");
        String content = sc.nextLine();
        
        saveExpense();
        
    }
}
