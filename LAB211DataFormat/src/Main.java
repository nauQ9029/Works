
import Controller.FormatController;
import Model.Format;
import View.FormatView;

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
        Format formatModel = new Format();
        FormatView formatView = new FormatView();
        FormatController formatController = new FormatController(formatModel, formatView);
        formatController.execute();
    }
}
