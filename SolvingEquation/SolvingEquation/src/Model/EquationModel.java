/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author plmin
 */
public class EquationModel {
    private float a;
    private float b;

    public EquationModel(){
        
    }
    
    public EquationModel(float a, float b) {
        this.a = a;
        this.b = b;
    }
    
    // 
    public List<Float> calculateEquation(float a, float b) {
        List<Float> number = new ArrayList<>();
        
        if(a == 0) {
            return null;
        }
        float x = -b / a;
        number.add(x);
        
        
        return number;
    }
    
    //
    public List<Float> calculateQuadEquation(float a, float b, float c) {
        List<Float> number = new ArrayList<>();
        
        float discriminant = b * b - 4 * a * c;
        
        if (discriminant > 0) {
            // 2 real solutions
            float x1 = (-b + (float) Math.sqrt(discriminant)) / (2 * a);
            float x2 = (-b - (float) Math.sqrt(discriminant)) / (2 * a);
            
            number.add(x1);
            number.add(x2);
        } else if (discriminant == 0) {
            // Only 1 solution
            float x = -b / (2 * a);
            number.add(x);
        } else {
            // No real solution
            return null;
        }
        return number;
    }
}
