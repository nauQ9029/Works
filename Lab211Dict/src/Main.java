
import Controller.DictController;
import Model.DictModel;
import View.DictView;
import java.io.IOException;

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
        DictModel dictModel = new DictModel();
        DictView dictView = new DictView();
        DictController dictController = new DictController(dictModel, dictView);
        
        try {
            while (true) {
                dictController.processUserInput();
                if (dictView.getInput().equals("4")) {
                    break;
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
