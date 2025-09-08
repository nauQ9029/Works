/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

/**
 *
 * @author plmin
 */
public class Fresher extends Candidate {

    private String graduationDate;
    private String graduationRank;
    private String education;

    public Fresher(int id, String firstName, String lastName, int DoB, String address, String phone,
            String email, int type, String graduationDate, String graduationRank, String education) {
        super(id, firstName, lastName, DoB, address, phone, email, type);
        this.graduationDate = graduationDate;
        this.graduationRank = graduationRank;
        this.education = education;
    }

    // Setters
    public void setGraduationDate(String graduationDate) {
        this.graduationDate = graduationDate;
    }

    public void setGraduationRank(String graduationRank) {
        this.graduationRank = graduationRank;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    // Getters
    public String getGraduationDate() {
        return graduationDate;
    }

    public String getGraduationRank() {
        return graduationRank;
    }

    public String getEducation() {
        return education;
    }

    @Override
    public String toString() {
        return super.toString() + " | Graduation Date: " + graduationDate + " | Graduation Rank: " + graduationRank + " | Education: " + education;
    }
}
