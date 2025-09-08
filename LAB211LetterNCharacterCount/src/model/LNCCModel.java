/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model;

import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;

/**
 *
 * @author plmin
 */
public class LNCCModel {

    private Map<Character, Integer> letterCountMap;
    private Map<String, Integer> wordCountMap;

    private int charCount;

    // Constructor initialize data structure
    public LNCCModel() {
        letterCountMap = new HashMap<>();
        wordCountMap = new HashMap<>();
        charCount = 0;
    }

    public void processInput(String input) {
        letterCountMap.clear();
        wordCountMap.clear();
        charCount = input.length();

        // Tokenize the input string
        StringTokenizer tokenizer = new StringTokenizer(input);

        while (tokenizer.hasMoreTokens()) {
            String token = tokenizer.nextToken();

            // Count letter in each token
            for (int i = 0; i < token.length(); i++) {
                char letter = Character.toLowerCase(token.charAt(i));
                letterCountMap.put(letter, letterCountMap.getOrDefault(letter, 0) + 1);
            }

            // Count word
            wordCountMap.put(token, wordCountMap.getOrDefault(token, 0) + 1);
        }
    }

    public Map<Character, Integer> getLetterCountMap() {
        return new HashMap<>(letterCountMap);
    }

    public Map<String, Integer> getWordCountMap() {
        return new HashMap<>(wordCountMap);
    }

    public int getCharCount() {
        return charCount;
    }
}
