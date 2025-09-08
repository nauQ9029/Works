/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

/**
 *
 * @author plmin
 */
public class Number {

    // Parse the input floatString as floating pointer number
    public boolean checkInput(String floatString) {
        try {
            Float.parseFloat(floatString);
            return true;                                    // Return true if succeed
        } catch (NumberFormatException e) {
            return false;                                   // Else return false
        }
    }
    
    // Checking odd or even num
    public boolean isOdd(float number) {
        return number % 2 != 0;
    }
    
    // Checking perfect square num
    public boolean isPerfectSquare(float number) {
        float sqrt = (float) Math.sqrt(number);
        return sqrt - Math.floor(sqrt) == 0;
    }
}
