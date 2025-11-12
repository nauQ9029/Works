package com.example.classwork2.model;

public class Product {
    private int id;
    private String name;
    private String description;
    private double price;
    private String productImage;

    public Product() {}

    public Product(String name) {
        this.name = name;
    }

    public Product(int id, String name, String description, double price, String productImage) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.productImage = productImage;
    }
    public Product(int id, String name, String description, double price) {
        this(id, name, description, price, null);
    }

    // Getters & Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public String getProductImage() {
        return productImage;
    }

    public void setProductImage(String productImage) {
        this.productImage = productImage;
    }
}
