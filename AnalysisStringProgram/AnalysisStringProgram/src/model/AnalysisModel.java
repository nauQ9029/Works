package model;

import controller.Analysis;

import java.util.HashMap;
import java.util.List;

public class AnalysisModel {
    private Analysis analysisString;

    public AnalysisModel() {
        analysisString = new Analysis();
    }

    public HashMap<String, List<Integer>> analyzeNumbers(String input) {
        return analysisString.getNumber(input);
    }

    public HashMap<String, StringBuilder> analyzeCharacters(String input) {
        return analysisString.getCharacter(input);
    }
}
