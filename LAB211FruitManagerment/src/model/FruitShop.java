/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author plmin
 */

public class FruitShop {
    private ArrayList<FruitModel> fruitList = new ArrayList<>();
    private Map<String, ArrayList<FruitModel>> orders = new HashMap<>();

    public void addFruit(FruitModel fruit) {
        fruitList.add(fruit);
    }

    public ArrayList<FruitModel> getFruitList() {
        return new ArrayList<>(fruitList);
    }

    public void createOrder(String customerName, ArrayList<FruitModel> orderItems) {
        orders.put(customerName, orderItems);
    }

    public Map<String, ArrayList<FruitModel>> getOrders() {
        return new HashMap<>(orders);
    }
}
