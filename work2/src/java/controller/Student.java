
package controller;
import java.util.Date;

public class Student {
    private int id;
    private String name;
    private boolean gender; // assuming true for male, false for female
    private Date dob;

    public Student(int id, String name, boolean gender, Date dob) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.dob = dob;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public boolean isGender() {
        return gender;
    }

    public Date getDob() {
        return dob;
    }
}
