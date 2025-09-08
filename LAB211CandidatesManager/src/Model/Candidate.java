/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

/**
 *
 * @author plmin
 */
public abstract class Candidate {

    protected int id;
    protected String firstName;
    protected String lastName;
    protected int DoB;
    protected String address;
    protected String phone;
    protected String email;
    protected int type;

    public Candidate(int id, String firstName, String lastName, int DoB,
            String address, String phone, String email, int type) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.DoB = DoB;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.type = type;
    }

    // Setters
    public void setId(int id) {
        this.id = id;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setDoB(int DoB) {
        this.DoB = DoB;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setType(int type) {
        this.type = type;
    }

    // Getters
    public int getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public int getDoB() {
        return DoB;
    }

    public String getAddress() {
        return address;
    }

    public String getPhone() {
        return phone;
    }

    public String getEmail() {
        return email;
    }

    public int getType() {
        return type;
    }
    
    @Override
    public String toString() {
        return this.firstName + " " + this.lastName + "|" + this.DoB + "|" + this.address
                + "|" + this.phone + "|" + this.email + "|" + this.type;
    }
}
