package control;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Scanner;
import model.HandleFile;

public class HandleFileController {

    private ArrayList<HandleFile> fileList = new ArrayList<>();
    private Scanner sc = new Scanner(System.in);

    public void loadData() {
        try {
            BufferedReader br = new BufferedReader(new FileReader("file.txt"));
            String line;
            while ((line = br.readLine()) != null) {
                String[] space = line.split("\\s+"); 
                if (space.length == 4) { 
                    fileList.add(new HandleFile(space[0], space[1], space[2], Integer.parseInt(space[3])));
                }
            }
            br.close();
        } catch (Exception e) {
            System.out.println("Error reading file: " + e.getMessage());
        }
    }

    public void display(ArrayList<HandleFile> list) {
    if (list.isEmpty()) {
        System.out.println("Empty");
        return;
    }

    System.out.println("ID\tName\tLocation\tSalary");
    for (HandleFile file : list) {
        System.out.println(file.toString());
    }
}

    public void saveFile(ArrayList<HandleFile> ar) {
        try {
            BufferedWriter bw = new BufferedWriter(new FileWriter("file.txt"));
            for (HandleFile file : ar)
                bw.write(file.toString() + "\n");
            bw.close();
        } catch (Exception e) {
            System.out.println("Cannot write file: " + e.getMessage());
        }
    }

    public void add() {
        System.out.println("Input your ID: ");
        String ID = sc.next();
        System.out.println("Input your name: ");
        String name = sc.next();
        System.out.println("Input your work location: ");
        String workLocation = sc.next();
        int salary;
        do {
            System.out.println("Input salary (must be greater than or equal to 0): ");
            salary = sc.nextInt();

        } while (salary < 0);

        fileList.add(new HandleFile(ID, name, workLocation, salary));
        saveFile(fileList);
    }

    public ArrayList<HandleFile> search(int minSalary) {
        ArrayList<HandleFile> rs = new ArrayList<>();
        for (HandleFile t : fileList) {
            if (t.getSalary() >= minSalary) { 
                rs.add(t);
            }
        }
        Collections.sort(rs, Comparator.comparingInt(HandleFile::getSalary));
        return rs;
    }
    
     public void copyTextToFile(String sourcePath, String newFileName) {
        try {
            File sourceFile = new File(sourcePath);
            if (!sourceFile.exists()) {
                System.out.println("Path does not exist");
                return;
            }

            File newFile = new File(newFileName);
            if (newFile.exists()) {
                System.out.println("File with the same name already exists.");
                return;
            }

            BufferedReader reader = new BufferedReader(new FileReader(sourcePath));
            BufferedWriter writer = new BufferedWriter(new FileWriter(newFile));

            String line;
            while ((line = reader.readLine()) != null) {
                writer.write(line);
                writer.newLine();
            }

            reader.close();
            writer.close();

            System.out.println("Copy done...");
        } catch (Exception e) {
            System.out.println("Cannot copy: " + e.getMessage());
        }

}
}
