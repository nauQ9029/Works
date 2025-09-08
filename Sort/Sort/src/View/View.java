package View;

public class View {

    public void displayMenu() {
        System.out.println("Sorting Program Menu:");
        System.out.println("1. Bubble Sort");
        System.out.println("2. Quick Sort");
        System.out.println("0. Exit");
    }

    public void displayArray(int[] array) {
        for (int num : array) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}
