package common;

import java.util.Scanner;

public class Validation {

    Scanner scanner = new Scanner(System.in);

    public int checkInputIntLimit(int min, int max) {
        while (true) {
            try {
                int result = Integer.parseInt(scanner.nextLine().trim());
                if (result < min || result > max) {
                    throw new NumberFormatException();

                }
                return result;
            } catch (NumberFormatException e) {
                System.err.println("Please input number in rage [" + min + ", " + max + "]");
                System.out.print("Enter again: ");
            }
        }
    }
    public String checkInputString() {
        while (true) {
            try {
                String result = scanner.nextLine().trim();
                return result;
            } catch (NumberFormatException ex) {
                System.err.println("Not empty");
            }
        }
    }

    public int checkInputInt() {
        while (true) {
            try {
                int result = Integer.parseInt(scanner.nextLine());
                return result;
            } catch (NumberFormatException ex) {
                System.err.println("Size is digit");
            }
        }
    }
}
