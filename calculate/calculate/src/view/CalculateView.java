package view;

import java.util.Scanner;
import control.Circle;
import control.Rectangle;
import control.Triangle;

public class CalculateView {
    Scanner sc = new Scanner(System.in);
    
    public void menu(){
            System.out.println("=======CALCULATE SHAPE PROGRAM=======");
            System.out.println("Please input side width of Rectangle: ");
            double width = sc.nextDouble();
            System.out.println("Please input side length of Rectangle: ");
            double length = sc.nextDouble();           
            System.out.println("Please input radius of Circle: ");
            double radius = sc.nextDouble();
            System.out.println("Please input side A of Triangle: ");
            double sideA = sc.nextDouble();
            System.out.println("Please input side B of Triangle: ");
            double sideB = sc.nextDouble();
            System.out.println("Please input side C of Triangle: ");
            double sideC = sc.nextDouble();
            
            Rectangle rec = new Rectangle(width, length);
            rec.printResult();
            
            Circle cir = new Circle(radius);
            cir.printResult();
            
            Triangle tri = new Triangle(sideA, sideB, sideC);
            tri.printResult();
            
            
    }
    
}
