/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

/**
 *
 * @author plmin
 */

public class DictModel {
    private HashMap<String, String> dictionary;

    public DictModel() {
        dictionary = new HashMap<>();
        loadData();
    }

    public void addWord(String eng, String vi) {
        dictionary.put(eng, vi);
        updateDatabase();
    }

    public void removeWord(String eng) {
        if (dictionary.containsKey(eng)) {
            dictionary.remove(eng);
            updateDatabase();
        }
    }

    public String translate(String eng) {
        return dictionary.getOrDefault(eng, "Not found");
    }

    private void loadData() {
        try (BufferedReader reader = new BufferedReader(new FileReader("dictionary.txt"))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(",");
                dictionary.put(parts[0], parts[1]);
            }
        } catch (IOException e) {
            System.out.println("Error reading dictionary file.");
        }
    }

    private void updateDatabase() {
        try (FileWriter writer = new FileWriter("dictionary.txt")) {
            for (String key : dictionary.keySet()) {
                writer.write(key + "," + dictionary.get(key) + "\n");
            }
        } catch (IOException e) {
            System.out.println("Error updating dictionary file.");
        }
    }
}
