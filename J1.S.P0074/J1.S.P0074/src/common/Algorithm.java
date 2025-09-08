package common;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import model.FileModel;


public class Algorithm {

    Validation validation = new Validation();
    FileModel filePath=new FileModel();
    
    public void checkPath() {
        System.out.println("---------- Check Path ----------");
        System.out.print("Enter Path: ");
        filePath.setPath(validation.checkInputString()); 
        File file = new File(filePath.getPath());
        if (file.exists() && file.isFile()) {
            System.out.println("Path to File.");
        } else if (file.exists() && file.isDirectory()) {
            System.out.println("Path to Directory");
        } else {
            System.out.println("Path doesn't exist");
        }
    }

    public void getAllFileNameJavaInDirectory() {
        System.out.println("------- Get file name with type java -------");
        ArrayList<String> listFileName = new ArrayList<>();
        System.out.print("Enter Path: ");
        filePath.setPath(validation.checkInputString()); 
        File file = new File(filePath.getPath());
        if (file.exists() && file.isDirectory()) {
            File[] listFile = file.listFiles();
            for (File listFile1 : listFile) {
                if (listFile1.isFile() && listFile1.getName().endsWith(".java")) {
                    listFileName.add(listFile1.getName());
                }
            }
        } else {
            System.out.println("Path doesn't exist");
            return;
        }
        System.out.println("Result " + listFileName.size() + " file!");
        for (int i = 0; i < listFileName.size(); i++) {
            System.out.println(listFileName.get(i));
        }
    }

    public void getFileWithSizeGreaterThanInput() {
        System.out.println("--------- Get file with size greater than input ---------");
        System.out.print("Enter Size(Integer): ");
        int size = validation.checkInputInt();
        System.out.print("Enter Path: ");
        filePath.setPath(validation.checkInputString()); 

        File file = new File(filePath.getPath());
        if (file.exists() && file.isDirectory()) {
            File[] listFile = file.listFiles();
            for (File listFile1 : listFile) {
                if (listFile1.isFile() && listFile1.length() > size) {
                    System.out.println(listFile1.getName());
                }
            }
        } else {
            System.out.println("Path doesn't exist");
        }
    }

    public void appendContentToFile()  {
        System.out.println("------ Write more content to file ------");
        System.out.print("Enter Content: ");
        String content = validation.checkInputString();
        System.out.print("Enter Path: ");
        filePath.setPath(validation.checkInputString()); 
        File file = new File(filePath.getPath());
        if (file.exists() && file.isFile()) {
            try {
                FileWriter fileWriter = null;
                fileWriter = new FileWriter(file);
                BufferedWriter writer = new BufferedWriter(fileWriter);
                writer.append(content);
                writer.close();
                System.out.println("Write done");           
            } catch (IOException ex) {
                Logger.getLogger(Algorithm.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else {
            System.out.println("Path doesn't exist");
        }
    }

    public void countCharacter()  {
        System.out.println("---- Read file an count characters ----");
        System.out.print("Enter Path: ");
        filePath.setPath(validation.checkInputString()); 
        File file = new File(filePath.getPath());
        if (file.exists() && file.isFile()) {
            FileReader fileReader = null;
            try {
                fileReader = new FileReader(file);
            } catch (FileNotFoundException ex) {
                Logger.getLogger(Algorithm.class.getName()).log(Level.SEVERE, null, ex);
            }
            BufferedReader reader = new BufferedReader(fileReader);
            String line = null;
            try {
                line = reader.readLine();
            } catch (IOException ex) {
                Logger.getLogger(Algorithm.class.getName()).log(Level.SEVERE, null, ex);
            }
            int count = 0;
            while (line != null) {
                String[] parts = line.split(" ");
                for (String w : parts) {
                    count++;
                }
                try {
                    line = reader.readLine();
                } catch (IOException ex) {
                    Logger.getLogger(Algorithm.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
            System.out.println("Total: " + count);
        } else {
            System.out.println("Path doesn't exist");
        }
    }

}
