/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package doublelinkedlist.shoppingcart;

/**
 *
 * @author plmin
 */
class Product {

    String name;
    double price;
    int quantity;
    
    //Constructor
    public Product(String name, int quantity, double price) {
        this.name = name;
        this.quantity = quantity;
        this.price = price;
    }
    
    @Override
    public String toString() {
        return name;
    }
}

class Node {

    Product product;
    int quantity;
    double price;
    Node pNext;
    Node pPrev;

    // Constructor
    Node(Product product, int quantity) {
        this.product = product;
        this.quantity = quantity;
        this.price = product.price;
        this.pNext = null;
        this.pPrev = null;
    }
}

class ShopCart {

    Node head, tail;

    public ShopCart() {
        this.head = this.tail = null;
    }

    // Add product to cart
    public void add(Product product, int quantity) {
        Node tNode = new Node(product, quantity);

        if (head == null) {
            head = tNode;
        } else {
            
            // Create a temporary (current) varible to store the current node
            Node current = head;
            
            // Traverse and checking to see if the pNext node is null to store data
            while (current.pNext != null) {                     
                current = current.pNext;
            }
            
            // Set the previous node of the new node
            current.pNext = tNode;                              
            tNode.pPrev = current;

            // Notify user that the product has been added to the cart
            System.out.println(quantity + " " + product.name + " sucessfully added to the cart!");
        }
    }

    //Remove product from the cart
    public void remove(Product product, int quantity) {
        Node current = head;
        while (current != null) {
            
            // Check to see if the current product exists in the cart
            if (current.product.equals(product)) {
                
                // Check to see if the quantity to removce is greater or equal to the quantity of the exists one
                if (current.quantity <= quantity) {
                    
                    // Checking node positions
                    if (current.pPrev != null) {
                        current.pPrev.pNext = current.pNext;
                    } else {
                        head = current.pNext;
                    }
                    if (current.pNext != null) {
                        current.pNext.pPrev = current.pPrev;
                    }
                    System.out.println("\n" + quantity + " " + product.name + " sucessfully removed from the cart!");
                    return;
                } else {                                        
                    // Check if  the quantity is less than the quantity of the exists one
                    current.quantity -= quantity;
                    System.out.println("\n" + quantity + " " + product.name + " sucessfully removed from the cart!");
                    return;
                }
            }
            current = current.pNext;
        }
        
        //Not found
        System.out.println("\nProduct not found in the cart.");   
    }
    
    // Adjust quantity of a product in the cart
    public void adjust(Product product, int quantity, int newQuantity) {
        Node current = head;
        while(current != null) {
            
            // Check to see if the current product exists in the cart
            if(current.product.equals(product)) {
                
                // Change quantity to the new value
                current.quantity = newQuantity;
                
                System.out.println();
                System.out.println(current.product + " selected for quantity adjustment.");
                System.out.println("Old quantity: " + quantity);    
                System.out.println("New quantity: " + newQuantity);
                return;
            }
            current = current.pNext;
        }
        // Not found
        System.out.println("\nProduct not found in the cart.");   
    }
    
    // Display products added in the cart
    public void display() {
        Node current = head;
        double totalPrice = 0.0;
        
        System.out.println("\n    In cart: ");
        
        while(current != null) {
            totalPrice += current.quantity * current.product.price;
            // x(quantity) abc(product) | xyz(price) $ each
            System.out.println("    " + current.quantity + " " + current.product + " | " + current.price + " $ each");
            current = current.pNext;
        }
        System.out.println("    -----> Total: " + totalPrice);
    }
}

// COMPLETED
public class DoubleLinkedListsShoppingCart {
    public static void main(String[] args) {
        ShopCart cart = new ShopCart();
        
        Product GPU = new Product("NVIDIA GeForce RTX™ 4090", 2, 2275);                   // :)))
        Product CPU = new Product("Intel Core i7-13700K", 1, 364.99);
        Product RAM = new Product("G.Skill Trident Z5 Neo RGB DDR5-6000 16GB", 4, 112.99);
        Product MotherBoard = new Product("MSI PRO B760M-P DDR4 ProSerie", 1, 99.99);
        Product Case = new Product("Corsair Obsidian 1000D", 1, 139.99);
        Product SSD = new Product("SK Hynix Platinum P41", 4, 61.19);
        Product PS5 = new Product("PlayStation 5 Console", 2, 499.99);
        Product SteamDeck = new Product("Steam Deck 1TB OLED", 5, 569);
        
        cart.add(GPU, 2);
        cart.add(CPU, 1);
        cart.add(RAM, 4);
        cart.add(MotherBoard, 1);
        cart.add(Case, 1);
        cart.add(SSD, 4);
        cart.add(PS5, 2);
        cart.add(SteamDeck, 5);
        
        cart.display();
        
        cart.remove(PS5, 1);
        
        cart.adjust(SteamDeck, 5, 3);
        cart.adjust(SSD, 4, 7);
        
        cart.remove(SteamDeck, 1);
        
        cart.display();
    }
}
