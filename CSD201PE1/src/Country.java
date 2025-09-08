/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author plmin
 */
public class Country {

    private String countryCode;
    private int rank;
    private String name;
    private String GPD;

    public Country() {
    }

    public Country(String countryCode, int rank, String name, String GPD) {
        this.countryCode = countryCode;
        this.rank = rank;
        this.name = name;
        this.GPD = GPD;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public void setContryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public int getRank() {
        return rank;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGPD() {
        return GPD;
    }

    public void setGPD(String GPD) {
        this.GPD = GPD;
    }

    @Override
    public String toString() {
        return "Country: " + countryCode + " | Rank: " + rank + " | Name: " + name + " | GPD: " + GPD;
    }

    private double parseGPD(String GPD) {
        try {
            return Double.parseDouble(GPD.replace(",", "").replaceAll("\"", ""));
        } catch (Exception e) {
            return 0.0;
        }
    }

    public int compareTo(Country other) {
        return this.countryCode.compareTo(other.countryCode);
    }
}
