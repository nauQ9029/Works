package com.example.fe.models;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class Product {
    @SerializedName("_id")
    public String id;
    public String name;
    private String sku;
    private String description;
    public double price;
    private Double salePrice;
    public int stockQuantity;
    public List<String> images;
    private String brand;

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getSku() {
        return sku;
    }

    public String getDescription() {
        return description;
    }

    public double getPrice() {
        return price;
    }

    public Double getSalePrice() {
        return salePrice;
    }

    public int getStockQuantity() {
        return stockQuantity;
    }

    public List<String> getImages() {
        return images;
    }

    public String getBrand() {
        return brand;
    }
}
