/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model;

import java.util.ArrayList;

/**
 *
 * @author plmin
 */
public class StudentModel {

    private int ID;
    private String StudentName;
    private int Semester;
    private String CourseName;

    private ArrayList<StudentModel> studentList = new ArrayList<>();

    // Initialize constructors
    public StudentModel(int ID, String StudentName, int Semester, String CourseName) {
        this.ID = ID;
        this.StudentName = StudentName;
        this.Semester = Semester;
        this.CourseName = CourseName;
    }

    public void addStudent(StudentModel student) {
        studentList.add(student);
    }

    public Iterable<StudentModel> getStudentList() {
        return studentList;
    }

    // Getters and Setters
    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public String getStudentName() {
        return StudentName;
    }

    public void setStudentName(String StudentName) {
        this.StudentName = StudentName;
    }

    public int getSemester() {
        return Semester;
    }

    public void setSemester(int Semester) {
        this.Semester = Semester;
    }

    public String getCourseName() {
        return CourseName;
    }

    public void setCourseName(String CourseName) {
        this.CourseName = CourseName;
    }

    @Override
    public String toString() {
        return "ID: " + ID + ", Name: " + StudentName + ", Semester: " + Semester + ", Course: " + CourseName;
    }

}
