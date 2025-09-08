/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Controller;

import Model.TextModel;
import View.TextView;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.util.Scanner;

/**
 *
 * @author plmin
 */
public class TextController {

    private TextModel model;
    private TextView view;

    // Constructor
    public TextController(TextModel model, TextView view) {
        this.model = model;
        this.view = view;
    }

    public void execute() {
        try {
            // Prompt user to enter file name
            String fileName = getFileNameFromUser();

            // Combine the entered file name with the base directory
            String filePath = fileName;

            File inputFile = new File(filePath);

            // Check to see if the file exists
            if (inputFile.exists() && inputFile.isFile() && fileName.endsWith(".txt")) {

                String input = readFromFile(inputFile);                         // Display input before normalize
                view.displayInput(input);
                String nText = readFromFile(inputFile);                         // Normalization of the text
                nText = model.oneSpace(nText);
                nText = model.signs(nText);
                nText = model.capital(nText);
                nText = model.endDot(nText);
                nText = model.quotesSpaceRev(nText);

                // Write the normalized text to the "output.txt" file
                writeToFile(nText, inputFile);

                // Display the normalized text on the console
                view.displayOutput(nText);
            } else {
                System.out.println("File does not exists.");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    // Prompt user to enter a file name
    private String getFileNameFromUser() {
        System.out.print("Enter the name of text file to normalize: ");
        try {
            // Create a BufferedReader to read user input
            BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));

            // Read the file name from the user
            return reader.readLine();
        } catch (IOException e) {
            e.printStackTrace();
            return "";
        }
    }

    // Read content from the file and return it as a String
    private String readFromFile(File inputFile) throws IOException {
        StringBuilder builder = new StringBuilder();

        try (BufferedReader reader = Files.newBufferedReader(inputFile.toPath())) {
            String line;
            while ((line = reader.readLine()) != null) {
                builder.append(line).append("\n");
            }
        }

        return builder.toString();
    }

    // Write the normalized text and create "output.txt" file 
    private String writeToFile(String text, File inputFile) throws IOException {
        // Get the parent directory of the input file
        File outputDirectory = new File("");
        outputDirectory.mkdirs();

        // Create the output file in the same directory as the input file
        String outputFilePath = outputDirectory.getAbsolutePath() + File.separator + "output.txt";

        try (BufferedWriter writer = new BufferedWriter(new FileWriter(outputFilePath))) {
            writer.write(text);
        }
        return outputFilePath;
    }
}
