/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 *
 * @author plmin
 */
public class TextModel {

    // Trim whitespace at the start and end from the line
    public String oneSpace(String text) {
        text = text.trim().replaceAll(" +", " ");
        return text;
    }

    // Only one space after comma (,), dot (.), and colon (:)
    public String signs(String text) {
        char ch[] = {',', '.', ':'};
        for (char c : ch) {
            text = text.replace(" " + c, c + "");                       // "text ," -> "text,"
            text = text.replace(c + " ", c + "");                       // ". Text" -> ".Text"
            text = text.replace(c + "", c + " ");                       // ":text" -> ": text"
        }
        return text;
    }

    // First character of word after dot is in Uppercase and other words are in Lowercase
    public String capital(String text) {
        String[] sentences = text.split("\\.");
        StringBuilder builder = new StringBuilder();
        
        for (String sentence : sentences) {
            sentence = sentence.trim();
            if (!sentence.isEmpty()) {
                char firstCharacter = Character.toUpperCase(sentence.charAt(0));
                String remainingCharacter = sentence.substring(1).toLowerCase();
                
                builder.append(firstCharacter).append(remainingCharacter).append(". ");
            }
        }
        
        builder.setLength(builder.length() - 1);                        // Remove space added after the last dot
        
        return builder.toString();
    }

    // Must have dot at the end of text
    public String endDot(String text) {
        if (text.endsWith(".")) {
            return text;
        } else {
            return text + ".";
        }
    }

    // There are no spaces before and after sentence or word phrase in quotes ("")
    public String quotesSpaceRev(String text) {
        String regex = "([\"“])(\\S*)([\"“])";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(text);
        StringBuilder stringBuffer = new StringBuilder();
        while (matcher.find()) {
            matcher.appendReplacement(stringBuffer, "$1" + matcher.group(2).trim() + "$3");
        }
        matcher.appendTail(stringBuffer);
        return text = stringBuffer.toString();
    }
}
