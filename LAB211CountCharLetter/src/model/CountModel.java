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
public class CountModel {

    private Map<Character, Integer> letterCount;
    private Map<String, Integer> wordCount;

    private int charCount;

    // Constructor
    public CountModel() {
        letterCount = new HashMap<>();
        wordCount = new HashMap<>();
        charCount = 0;
    }
    
    public void processInput(String input) {
        charCount = input.length();

        // Tokenize the input string
        StringTokenizer tokenizer = new StringTokenizer(input);
        
        while (tokenizer.hasMoreTokens()) {     // Loop through token and update count
            String token = tokenizer.nextToken();

            // Count letter in each token
            for (int i = 0; i < token.length(); i++) {
                char letter = Character.toLowerCase(token.charAt(i));   // Case-insensitivity
                letterCount.put(letter, letterCount.getOrDefault(letter, 0) + 1);
            }

            // Count word
            wordCount.put(token, wordCount.getOrDefault(token, 0) + 1);
        }
    }
    
    // Getters
    public Map<Character, Integer> getLetterCountMap() {
        return new HashMap<>(letterCount);
    }

    public Map<String, Integer> getWordCountMap() {
        return new HashMap<>(wordCount);
    }

    public int getCharCount() {
        return charCount;
    }
}
