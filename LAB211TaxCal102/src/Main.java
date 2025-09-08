
import Controller.TaxController;
import View.TaxView;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author plmin
 */
public class Main {
    public static void main(String[] args) {
        TaxController controller = new TaxController();
        TaxView view = new TaxView(controller); // Pass the TaxController object to the TaxView constructor
        controller.execute();
    }
}


