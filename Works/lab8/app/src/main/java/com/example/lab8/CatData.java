package com.example.lab8;

public class CatData {
    private String catName;
    private String catDescription;
    private int catImage;

    public CatData(String catName, String catDescription, int catImage) {
        this.catName = catName;
        this.catDescription = catDescription;
        this.catImage = catImage;
    }

    public String getCatName() {
        return catName;
    }

    public String getCatDescription() {
        return catDescription;
    }

    public int getCatImage() {
        return catImage;
    }
}
