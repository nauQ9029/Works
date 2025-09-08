/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
import model.FruitModel;
import model.FruitShop;
import view.FruitView;

/**
 *
 * @author plmin
 */
public class FruitController {

    private FruitModel model;
    private FruitView view;
    private FruitShop fruitShop;
    private ArrayList<FruitModel> fruits = new ArrayList<>();
    private Scanner scanner;

    public FruitController() {
        this.model = new FruitModel();
        this.view = new FruitView();
        this.fruits = new ArrayList<>();
        this.fruitShop = new FruitShop();

        fruits.add(new FruitModel("10", "Apple", 1.0, 100, "US"));
        fruits.add(new FruitModel("11", "Orange", 1.5, 100, "England"));
        fruits.add(new FruitModel("12", "Banana", 0.75, 100, "Russia"));
        fruits.add(new FruitModel("13", "Coffee", 8, 50, "US"));
        fruits.add(new FruitModel("14", "Watermelon", 1.5, 50, "Spain"));
        fruits.add(new FruitModel("15", "Durian", 0.75, 50, "Malaysia"));

    }

    public FruitController(FruitModel model, FruitView view, ArrayList<FruitModel> fruits) {
        this.model = model;
        this.view = view;
        this.fruits = fruits;
    }

    public void execute() {
        int choice;
        Scanner scanner = new Scanner(System.in);

        while (true) {
            view.Menu();
            choice = scanner.nextInt();
            switch (choice) {
                case 1:
                    createFruit();
                    break;
                case 2:
                    viewOrder();
                    break;
                case 3:
                    shopping();
                    break;
                case 4:
                    System.exit(0);
                default:
                    System.out.println("Invalid choice!");
            }
        }
    }

    public void createFruit() {
        Scanner scannerA = new Scanner(System.in);
        do {
            System.out.println("Fruit ID: ");
            String fruitID = scannerA.nextLine();
            System.out.println("Fruit name: ");
            String fruitName = scannerA.nextLine();
            System.out.println("Price: ");
            double price = scannerA.nextDouble();
            scannerA.nextLine();
            System.out.println("Quantity: ");
            int quantity = scannerA.nextInt();
            scannerA.nextLine();
            System.out.println("Origin: ");
            String origin = scannerA.nextLine();

            // Create new fruit
            FruitModel newFruit = new FruitModel(fruitID, fruitName, price, quantity, origin);

            // Add new fruit into the list
            fruits.add(newFruit);

            view.displayFruit((ArrayList<FruitModel>) fruits);
            System.out.println("Do you want to continue? (Y) (N)");
        } while (scannerA.nextLine().equalsIgnoreCase("Y"));
    }

    public void viewOrder() {
        Map<String, ArrayList<FruitModel>> orders = fruitShop.getOrders();

        if (orders.isEmpty()) {
            System.out.println("--------------------\nNo order yet.");
        } else {
            for (Map.Entry<String, ArrayList<FruitModel>> entry : orders.entrySet()) {
                String customerName = entry.getKey();
                ArrayList<FruitModel> orderItems = entry.getValue();

                System.out.println("Customer: " + customerName);
                view.displayOrders(orderItems, calculateTotalAmount(orderItems));
                System.out.println();
            }
        }
    }

    private double calculateTotalAmount(ArrayList<FruitModel> orderItems) {
        double totalAmount = 0;
        for (FruitModel fruit : orderItems) {
            totalAmount += fruit.getAmount();
        }
        return totalAmount;
    }

    public void shopping() {
        if (fruits.isEmpty()) {
            System.out.println("No fruits available for ordering.");
            return;
        }

        view.displayAllFruit(fruits);

        ArrayList<FruitModel> orderItems = new ArrayList<>();
        Scanner scanner = new Scanner(System.in);

        do {
            System.out.print("Enter the item number to order: ");
            int selectedItem = scanner.nextInt();

            if (selectedItem <= 0 || selectedItem > fruits.size()) {
                System.out.println("Invalid item number. Please try again.");
                continue;
            }

            FruitModel selectedFruit = fruits.get(selectedItem - 1);

            System.out.println("You selected: " + selectedFruit.getFruitName());
            System.out.print("Please input quantity: ");
            int quantity = scanner.nextInt();

            selectedFruit = new FruitModel(
                    selectedFruit.getFruitID(),
                    selectedFruit.getFruitName(),
                    selectedFruit.getPrice(),
                    quantity,
                    selectedFruit.getOrigin()
            );

            orderItems.add(selectedFruit);

            System.out.print("Do you want to order more items? (Y/N): ");
        } while (scanner.next().equalsIgnoreCase("Y"));

        System.out.print("Enter customer name: ");
        String customerName = scanner.next();

        fruitShop.createOrder(customerName, orderItems);
        System.out.println("Order placed successfully.");
    }
}
