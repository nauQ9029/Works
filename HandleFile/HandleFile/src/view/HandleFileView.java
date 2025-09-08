package view;

import java.util.Scanner;
import control.HandleFileController;
import java.util.ArrayList;
import model.HandleFile;

public class HandleFileView {

    Scanner sc = new Scanner(System.in);
    HandleFileController control = new HandleFileController();

    public void menu() {
        int choice;
        do {
            System.out.println("-----------FILE PROCESSING-----------");
            System.out.println("1. Add Worker");
            System.out.println("2. Find perso info");
            System.out.println("3. Copy text to new file");
            System.out.println("4. Exit");
            System.out.println("-------------------------------------------");
            System.out.print("Input your choice: ");
            choice = sc.nextInt();

            switch (choice) {
                case 1:
                    System.out.println("-------Add Worker--------");
                    control.add();
                    break;

                case 2:
                    System.out.print("Enter money: ");
                    int money = sc.nextInt();
                    ArrayList<HandleFile> searchResults = control.search(money);
                    control.display(searchResults);
                    break;

                case 3:
                    System.out.println("--------Copy Text----------");
                    System.out.print("Enter source: ");
                    String sourcePath = sc.next();
                    System.out.print("Enter new file name: ");
                    String newFileName = sc.next();
                    control.copyTextToFile(sourcePath, newFileName);
                    break;

//                case 4:
//                    control.display();
//                    break;

                case 4:
                    System.out.println("GoodByeeeee");
                    break;

                default:
                    System.out.println("Invalid choice. Please select again.");
            }

        } while (choice != 4);
    }

}
