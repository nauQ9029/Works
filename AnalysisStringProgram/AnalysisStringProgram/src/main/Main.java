package main;

import model.AnalysisModel;
import view.AnalysisView;

import java.util.HashMap;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        AnalysisModel controller = new AnalysisModel();
        AnalysisView view = new AnalysisView();

        String input = view.getInputString();
        
        HashMap<String, List<Integer>> numberAnalysis = controller.analyzeNumbers(input);
        HashMap<String, StringBuilder> characterAnalysis = controller.analyzeCharacters(input);

        view.displayResult(numberAnalysis, characterAnalysis);
    }
}
