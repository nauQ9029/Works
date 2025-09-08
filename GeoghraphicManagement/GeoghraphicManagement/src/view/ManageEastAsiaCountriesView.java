package view;

import java.util.List;
import java.util.Scanner;
import model.EastAsiaCountries;

public class ManageEastAsiaCountriesView {
    
    private Scanner scanner;

    public ManageEastAsiaCountriesView() {
        this.scanner = new Scanner(System.in);
    }

    public void displayMenu() {
        System.out.println("1. Add information for a country");
        System.out.println("2. Display information of countries you have just input");
        System.out.println("3. Search information of countries by user-entered name");
        System.out.println("4. Display the names of countries by name ascending");
        System.out.println("5. Exit program");
        System.out.print("Enter your choice: ");
    }

    public int getUserChoice() {
        return scanner.nextInt();
    }

    public void displayExitMessage() {
        System.out.println("Exiting program. Goodbye!");
    }

    public void displayInvalidChoiceMessage() {
        System.out.println("Invalid choice. Please try again.");
    }

    public EastAsiaCountries getCountryInformationFromUser() {
    scanner.nextLine();  
    System.out.print("Enter Country Code: ");
    String code = scanner.nextLine();
    System.out.print("Enter Country Name: ");
    String name = scanner.nextLine();

    float area = 0.0f;
    boolean validInput = false;
    
    while (!validInput) {
        try {
            System.out.print("Enter Total Area: ");
            area = scanner.nextFloat();
            validInput = true;
        } catch (java.util.InputMismatchException e) {
            System.out.println("Invalid input. Please enter a valid float for Total Area.");
            scanner.nextLine();  // Consume invalid input
        }
    }
    
    scanner.nextLine(); 
    System.out.print("Enter Country Terrain: ");
    String terrain = scanner.nextLine();

    return new EastAsiaCountries(code, name, area, terrain);
}


    public String getCountryNameFromUser() {
        scanner.nextLine();  
        System.out.print("Enter Country Name: ");
        return scanner.nextLine();
    }

    public void displayCountryInformation(List<EastAsiaCountries> countries) {
        for (EastAsiaCountries country : countries) {
            country.display();
            System.out.println("------------------------------");
        }
    }
    
}
