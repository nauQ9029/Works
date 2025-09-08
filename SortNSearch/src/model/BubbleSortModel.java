/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model;

/**
 *
 * @author plmin
 */
public abstract class BubbleSortModel implements SortModel {
    private int[] array;
    
    public BubbleSortModel(int[] array) {
        this.array = array;
    }
    
    @Override
    public void generateArray(int size) {
        this.array = array;
    }
}
