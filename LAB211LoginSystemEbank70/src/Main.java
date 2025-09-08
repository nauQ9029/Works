
import Controller.EbankController;
import Model.EbankModel;
import View.EbankView;
import java.util.Scanner;

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
        EbankView view = new EbankView();
        EbankModel model = new EbankModel();
        Scanner scanner = new Scanner(System.in);
        EbankController controller = new EbankController(view, model, scanner);
        controller.execute();
    }
}
