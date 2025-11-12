package com.example.fe.models;

public class Product {
    private String id;
    private String name;
    private String imageUrl;
    private double price;

    public Product(String id, String name, String imageUrl, double price) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.price = price;
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public String getImageUrl() { return imageUrl; }
    public double getPrice() { return price; }
}
