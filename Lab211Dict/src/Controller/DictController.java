/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Controller;

import Model.DictModel;
import View.DictView;
import java.io.IOException;

/**
 *
 * @author plmin
 */
public class DictController {

    private DictModel model;
    private DictView view;

    public DictController(DictModel model, DictView view) {
        this.model = model;
        this.view = view;
    }

    public void processUserInput() throws IOException {
        view.displayMenu();
        String input = view.getInput();

        switch (input) {
            case "1":
                addWord();
                break;
            case "2":
                deleteWord();
                break;
            case "3":
                translateWord();
                break;
            case "4":
                System.out.println("Exiting program...");
                System.exit(0);
                break;
            default:
                view.displayMessage("Invalid option. Please try again.");
        }
    }

    private void addWord() throws IOException {
        view.displayMessage("Enter English word: ");
        String eng = view.getInput();
        view.displayMessage("Enter Vietnamese translation: ");
        String vi = view.getInput();
        model.addWord(eng, vi);
    }

    private void deleteWord() throws IOException {
        view.displayMessage("Enter English word to delete: ");
        String eng = view.getInput();
        model.removeWord(eng);
    }

    private void translateWord() throws IOException {
        view.displayMessage("Enter English word to translate: ");
        String eng = view.getInput();
        String translation = model.translate(eng);
        view.displayTranslation(translation);
    }
}
