package control;

import model.Shape;

public class Rectangle extends Shape{

    private double width, length;

    public Rectangle(double width, double length) {
        this.width = width;
        this.length = length;
    }

    public double getWidth() {
        return width;
    }

    public void setWidth(double width) {
        this.width = width;
    }

    public double getLength() {
        return length;
    }

    public void setLength(double length) {
        this.length = length;
    }
    

    @Override
    public double area() {
        double area = width * length;
        return area;
    }

    @Override
    public double perimeter() {
        double perimeter = (width + length) *2;
        return perimeter;
    }

    @Override
    public void printResult() {
        System.out.println("-------Rectagle-------");
        System.out.println("Width: " + width);
        System.out.println("Length: " + length);
        System.out.println("Area: " + area());
        System.out.println("Perimeter: " + perimeter());
    }
    

}
