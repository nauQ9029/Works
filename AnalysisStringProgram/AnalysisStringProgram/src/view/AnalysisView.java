package view;

import model.AnalysisModel;

import java.util.HashMap;
import java.util.List;
import java.util.Scanner;

public class AnalysisView {

    public void displayResult(HashMap<String, List<Integer>> numberAnalysis, HashMap<String, StringBuilder> characterAnalysis) {
        System.out.println("-----Result Analysis------");
        System.out.println("Perfect Square Numbers: " + numberAnalysis.get("squareNumbers"));
        System.out.println("Odd Numbers: " + numberAnalysis.get("oddNumbers"));
        System.out.println("Even Numbers: " + numberAnalysis.get("evenNumbers"));
        System.out.println("All Numbers: " + numberAnalysis.get("numbers"));
        System.out.println("Uppercase Characters: " + characterAnalysis.get("uppercaseCharacters"));
        System.out.println("Lowercase Characters: " + characterAnalysis.get("lowercaseCharacters"));
        System.out.println("Special Characters: " + characterAnalysis.get("specialCharacters"));
        System.out.println("All Characters: " + characterAnalysis.get("allCharacters"));
    }

    public String getInputString() {
        Scanner scanner = new Scanner(System.in);
        System.out.println("===== Analysis String program ====");
        System.out.println("Input String: ");
        return scanner.nextLine();
    }
}
