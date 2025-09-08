/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

/**
 *
 * @author plmin
 */
public class Experience extends Candidate {

    private int ExpInYear;
    private String ProSkill;

    public Experience(int id, String firstName, String lastName, int DoB, String address,
            String phone, String email, int type, int ExpInYear, String ProSkill) {
        super(id, firstName, lastName, DoB, address, phone, email, type);
        this.ExpInYear = ExpInYear;
        this.ProSkill = ProSkill;
    }

    // Setters
    public void setExpInYear(int ExpInYear) {
        this.ExpInYear = ExpInYear;
    }

    public void setProSkill(String ProSkill) {
        this.ProSkill = ProSkill;
    }

    // Getters
    public int getExpInYear() {
        return ExpInYear;
    }

    public String getProSkill() {
        return ProSkill;
    }

    @Override
    public String toString() {
        return super.toString() + " | Experience: " + ExpInYear + " years | Professional Skill: " + ProSkill;
    }
}
