
import Controller.CollectorController;
import Model.CollectorModel;
import View.CollectorView;

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
        CollectorModel model = new CollectorModel();
        CollectorView view = new CollectorView();
        CollectorController controller = new CollectorController(model, view);
        controller.execute();
    }
}
