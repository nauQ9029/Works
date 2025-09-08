/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package View;

import java.util.Scanner;

/**
 *
 * @author plmin
 */
public class CollectorView {

    private Scanner scanner;

    public CollectorView() {
        this.scanner = new Scanner(System.in);
    }

    public int[] getInputWasteAmount() {
        System.out.println("Enter the amount of garbage at each station in order by quantity (kg) as follows: ");
        String[] wasteInput = scanner.nextLine().split(" ");
        int[] wasteAmount = new int[wasteInput.length];

        for (int i = 0; i < wasteInput.length; i++) {
            wasteAmount[i] = Integer.parseInt(wasteInput[i]);
        }
        return wasteAmount;
    }
    
    public void displayCost(int totalCost) {
        System.out.println("The total cost is " + totalCost + " VND");
    }
}
