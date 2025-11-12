package com.example.pe_prm392.models;

public class Book {
    private String name;
    private String type;
    private double price;
    private int quantity;

    public Book(String name, String type, double price, int quantity) {
        this.name = name;
        this.type = type;
        this.price = price;
        this.quantity = quantity;
    }
    public double getTotalValue() {
        return price * quantity;
    }
    public String getName() { return name; }
    public String getType() { return type; }
    public double getPrice() { return price; }
    public int getQuantity() { return quantity; }
}

