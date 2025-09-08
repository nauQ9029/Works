/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

/**
 *
 * @author plmin
 */
public class Internship extends Candidate {

    private String majors;
    private String semester;
    private String uniName;

    public Internship(int id, String firstName, String lastName, int DoB, String address, String phone,
            String email, int type, String majors, String semester, String uniName) {
        super(id, firstName, lastName, DoB, address, phone, email, type);
        this.majors = majors;
        this.semester = semester;
        this.uniName = uniName;
    }

    // Setters
    public void setMajors(String majors) {
        this.majors = majors;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }

    public void setUniName(String uniName) {
        this.uniName = uniName;
    }

    // Getters
    public String getMajors() {
        return majors;
    }

    public String getSemester() {
        return semester;
    }

    public String getUniName() {
        return uniName;
    }
    
    @Override
    public String toString() {
        return super.toString() + " | Major: " + majors + " | Semester: " + semester + " | University name: " + uniName;
    }
}
