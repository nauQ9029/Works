
import Controller.TextController;
import Model.TextModel;
import View.TextView;
import java.io.File;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author plmin
 */
public class Main {
    
    // input1.txt
    // input2.txt
    
    public static void main(String[] args) {
        TextModel model = new TextModel();
        TextView view = new TextView();
        TextController controller = new TextController(model, view);
        
        File inputFile = new File("S:\\PJ\\TextNormalize-LAB211\\input.txt");
        controller.execute();
    }
}
