
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
/**
 *
 * @author plmin
 */
public class Test {

    public List<Country> readCSVFile(String filePath) {
        List<Country> countries = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) { // Đọc file
            String line;
            while ((line = br.readLine()) != null) {
                String[] data = line.split(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)", -1);
                String countryCode = data[0].trim();
                // String
                int rank = Integer.parseInt((data[1].trim()));
                String name = data[3].trim();
                String GPD = data[4].trim();
                countries.add(new Country(countryCode, rank, name, GPD));
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
        return countries;
    }

    public static void main(String[] args) {
        List<Country> list = new ArrayList<>();
        Test test = new Test();
        list = test.readCSVFile("S:\\PJ\\Java\\CSD201PE1\\GDP2022.csv");
        for (Country co : list) {
            System.out.println(co.toString());
        }
    }
}
