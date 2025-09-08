/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

/**
 *
 * @author plmin
 */
public class Doctor {

    private String code;
    private String name;
    private String spec;
    private int avail;

    public Doctor() {

    }

    public Doctor(String code, String name, String spec, int avail) {
        this.code = code;
        this.name = name;
        this.spec = spec;
        this.avail = avail;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSpec() {
        return spec;
    }

    public void setSpec(String spec) {
        this.spec = spec;
    }

    public int getAvail() {
        return avail;
    }

    public void setAvail(int avail) {
        this.avail = avail;
    }

    public void display() {
        System.out.printf("%-7s %-20s %-20s %-7s\n", code, name, spec, avail);
    }
}
