/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model;

/**
 *
 * @author plmin
 */
public class CartItem {

    private final ServiceItem item;
    private final int quantity;

    public CartItem(ServiceItem item, int quantity) {
        this.item = item;
        this.quantity = quantity;
    }

    public ServiceItem getItem() {
        return item;
    }

    public int getQuantity() {
        return quantity;
    }
    
    
}
