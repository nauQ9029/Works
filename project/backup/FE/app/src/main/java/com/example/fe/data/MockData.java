package com.example.fe.data;

import com.example.fe.models.Product;
import java.util.ArrayList;
import java.util.List;

public class MockData {
    public static List<Product> getMockProducts() {
        List<Product> products = new ArrayList<>();

        products.add(new Product("1", "Goldfish", "https://example.com/goldfish.png", 12.99));
        products.add(new Product("2", "Clownfish", "https://example.com/clownfish.png", 9.49));
        products.add(new Product("3", "Guppy", "https://example.com/guppy.png", 5.99));
        products.add(new Product("4", "Koi", "https://example.com/koi.png", 18.50));
        products.add(new Product("5", "Betta", "https://example.com/betta.png", 7.20));

        return products;
    }
}
