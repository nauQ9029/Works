/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package view;

import java.util.Map;

/**
 *
 * @author plmin
 */
public class LNCCView {

    public void displayFormattedResults(Map<String, Integer> wordCountMap, Map<Character, Integer> letterCountMap) {
        // Display word count
        int wordCount = 0;
        System.out.print("{");
        for (Map.Entry<String, Integer> entry : wordCountMap.entrySet()) {
            // add coma if they key is equal to index
            if (wordCount > 0) {
                System.out.print(", ");
            }
            //{a = x, b = y}
            System.out.printf("%s = %d", entry.getKey(), entry.getValue());
            wordCount++;
        }
        System.out.print("}");

        //Display letter count
        int letterCount = 0;
        System.out.print("\n{");
        for (Map.Entry<Character, Integer> entry : letterCountMap.entrySet()) {
            if (letterCount > 0) {
                System.out.print(", ");
            }
            System.out.printf("%c = %d", entry.getKey(), entry.getValue());
            letterCount++;
        }
        System.out.println("}");
    }
}
