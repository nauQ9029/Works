package control;

import model.Shape;

public class Circle extends Shape{
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }
    
    public double getRadius() {
        return radius;
    }

    public void setRadius(double radius) {
        this.radius = radius;
    }

    @Override
    public double area() {
        double area = Math.PI * (double)Math.pow(radius, 2);
        return area;
    }

    @Override
    public double perimeter() {
        double perimeter = Math.PI * 2 * radius;
        return perimeter;
    }

    @Override
    public void printResult() {
        System.out.println("-------Circle-------");
        System.out.println("Radius: " + radius);
        System.out.println("Area: " + area());
        System.out.println("Perimeter: " + perimeter());
    }
    
    

    
}
