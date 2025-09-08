package controller;

import Model.Model;
import View.View;
import java.util.Scanner;

public class Controller {

    private final Model model;
    private final View view;

    public Controller(Model model, View view) {
        this.model = model;
        this.view = view;
    }

    public void sort() {
        Scanner scanner = new Scanner(System.in);

        int choice;
        do {
            view.displayMenu();
            System.out.print("Enter your choice (0 to exit): ");
            choice = scanner.nextInt();

            switch (choice) {
                case 1:
                    BubbleSort();
                    break;
                case 2:
                    QuickSort();
                    break;
                case 0:
                    System.out.println("Exiting program....");
                    break;
                default:
                    System.out.println("Invalid choice. Please enter a valid option.");
            }
        } while (choice != 0);

    }

    private void BubbleSort() {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter the number of elements in the array: ");
        int arraySize = scanner.nextInt();

        System.out.println("Unsorted array : ");
        int[] array = model.generateRandomArray(arraySize);

        view.displayArray(array);

        int n = array.length;
        boolean swapped;

        do {
            swapped = false;
            for (int i = 1; i < n; i++) {
                if (array[i - 1] > array[i]) {
                    int temp = array[i - 1];
                    array[i - 1] = array[i];
                    array[i] = temp;
                    swapped = true;
                }
            }
        } while (swapped);

        System.out.println("Sorted Array (Bubble Sort):");
        view.displayArray(array);
    }

    private void QuickSort() {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter the number of elements in the array: ");
        int arraySize = scanner.nextInt();

        System.out.println("Unsorted array : ");
        int[] array = model.generateRandomArray(arraySize);

        view.displayArray(array);

        model.quickSort(array, 0, array.length - 1);

        System.out.println("Sorted Array (Quick Sort):");
        view.displayArray(array);
    }

    public static void main(String[] args) {
        Model model = new Model();
        View view = new View();
        Controller controller = new Controller(model, view);

        controller.sort();
    }
}
