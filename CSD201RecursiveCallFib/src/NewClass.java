/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author plmin
 */
public class NewClass {
    
    // Compute a fibonacci number by a normal for loop
    /* 
    static int fibByRecursive(int n) {
        int a = 0, b = 1, c;
        if (n == 0) {
            return a;       
        }
        for (int i = 2 ;i <= n; i++) {
            c = a + b;
            a = b;
            b = c;
            System.out.print(a + " ");
        }
        return b;
    }
    */
    
    // Compute a fibonacci by recursive call, function saved (Do not store data, time consuming)
    // Binary recusive
    /*
    static int fib(int n) {
        if(n <= 1) {
            return n;
        }
        return fib(n - 1) + fib(n - 2);                     // 50 will not be calculate
    }
    */

    // Compute a fibonacci by linear recusive
    
    static int linearFibRecursion(int n, int a, int b) {
        if (n <= 2) {
            return b;
        } else {
            return linearFibRecursion(n-1, b, a + b);
        }
    }
    
    public static void main(String args[]) {
        int a = 0;
        int b = 1;
        int n = 15;                         
        System.out.println(linearFibRecursion(n, a, b));
    }
}
