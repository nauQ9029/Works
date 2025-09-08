/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package view;

import java.util.ArrayList;
import model.FruitModel;

/**
 *
 * @author plmin
 */
public class FruitView {

    public void Menu() {
        System.out.println("----------------------------------------");
        System.out.println("FRUIT SHOP SYSTEM");
        System.out.println("1. Create fruit");
        System.out.println("2. View order");
        System.out.println("3. Shopping");
        System.out.println("4. Exit");
        System.out.print("Enter option: ");
    }

    public void displayFruit(ArrayList<FruitModel> fruits) {

        System.out.printf("%-10s | %-15s | %-10s | %-10s | %-10s%n", "Fruit ID",
                "Fruit name", "Price", "Quantity", "Origin");
        for (FruitModel fruit : fruits) {
            System.out.printf("%-10s | %-15s | %-10.2f | %-10d | %-10s%n", fruit.getFruitID(),
                    fruit.getFruitName(), fruit.getPrice(), fruit.getQuantity(), fruit.getOrigin());
        }
    }

    public void displayOrders(ArrayList<FruitModel> orders, double totalAmount) {
        System.out.printf("%-10s | %-8s | %-5s | %-5s%n", "Product", "Quantity", 
                "Price", "Amount");

        for (FruitModel fruit : orders) {
            System.out.printf("%-10s | %-8d | %-5.2f | %-5.2f%n", 
                    fruit.getFruitName(), fruit.getQuantity(), fruit.getPrice(), fruit.getAmount());
        }

        System.out.println("Total: " + totalAmount + "$");
    }

    public void displayAllFruit(ArrayList<FruitModel> fruits) {
        System.out.println("List of fruits: ");
        System.out.println("Item  | Fruit Name |  Origin  | Price");

        for (int i = 0; i < fruits.size(); i++) {
            FruitModel fruit = fruits.get(i);
            System.out.printf("%-5d | %-10s | %-8s | %-5.2f$\n", i + 1, fruit.getFruitName(), fruit.getOrigin(), fruit.getPrice());
        }

    }
}
