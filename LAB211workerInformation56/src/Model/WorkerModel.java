/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

import java.util.Date;

/**
 *
 * @author plmin
 */
public class WorkerModel {

    private String id;
    private String name;
    private int age;
    private double salary;
    private String workLocation;
    private Date date;
    private SalaryModel salaryModel;

    public WorkerModel() {

    }

    public WorkerModel(String id, String name, int age, double salary, String workLocation, Date date, SalaryModel salaryModel) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.salary = salary;
        this.workLocation = workLocation;
        this.date = date;
        this.salaryModel = salaryModel;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(int salary) {
        this.salary = salary;
    }

    public String getWorkLocation() {
        return workLocation;
    }

    public void setWorkLocation(String workLocation) {
        this.workLocation = workLocation;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public SalaryModel getSalaryModel() {
        return salaryModel;
    }

    public void setSalaryModel(SalaryModel salaryModel) {
        this.salaryModel = salaryModel;
    }

}
