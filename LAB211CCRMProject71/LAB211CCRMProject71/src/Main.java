
import Controller.CCRMController;
import View.CCRMView;

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
        CCRMController controller = new CCRMController();
        CCRMView view = new CCRMView(controller);
        view.execute();
    }
}
