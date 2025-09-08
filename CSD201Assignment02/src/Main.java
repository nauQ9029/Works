
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Scanner;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
/**
 *
 * @author plmin
 */
public class Main {
    private HashMap<String, Book> bookMap;
    private int collisions;

    public Main() {
        this.bookMap = new HashMap<>();
        this.collisions = 0;
    }

    public static void main(String[] args) {
        Main main = new Main();
        main.loadBooks("Books.csv");

        Scanner scanner = new Scanner(System.in);

        while (true) {
            System.out.println("\nMenu:");
            System.out.println("1. Search book");
            System.out.println("2. Print data and collisions encountered");
            System.out.println("3. Exit");
            System.out.print("Choose your option: ");

            int choice = scanner.nextInt();
            scanner.nextLine(); // Consume newline character

            switch (choice) {
                case 1:
                    main.searchByISBN(scanner);
                    break;
                case 2:
                    main.printAllBooks();
                    break;
                case 3:
                    System.out.println("Exiting program.");
                    return;
                default:
                    System.out.println("Invalid option. Please choose again.");
            }
        }
    }

    private void loadBooks(String filename) {
        try (BufferedReader br = new BufferedReader(new FileReader(filename))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] data = line.split(";");
                if (data.length == 8) {
                    String ISBN = data[0].replaceAll("\"", "").trim();
                    String title = data[1].replaceAll("\"", "").trim();
                    String author = data[2].replaceAll("\"", "").trim();
                    String yearOfPublication = data[3].replaceAll("\"", "").trim();
                    String publisher = data[4].replaceAll("\"", "").trim();
                    Book book = new Book(ISBN, title, author, yearOfPublication, publisher);
                    bookMap.put(ISBN, book);
                    if (bookMap.containsKey(ISBN)) {
                        collisions++;
                    }
                    bookMap.put(ISBN, book);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void searchByISBN(Scanner scanner) {
        System.out.print("Enter ISBN to search: ");
        String searchISBN = scanner.nextLine().trim();
        Book foundBook = bookMap.get(searchISBN);
        if (foundBook != null) {
            System.out.print("Book found: " + foundBook);
        } else {
            System.out.print("Book not found for ISBN: " + searchISBN);
        }
    }

    private void printAllBooks() {
        System.out.println("All Books:");
        for (Book book : bookMap.values()) {
            System.out.println(book);
        }
        System.out.println("Number of collisions: " + collisions);
    }
}