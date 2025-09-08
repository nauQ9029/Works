/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package DAO;

import java.sql.Connection;
import Connect.DBContext;
import Model.Student;
import java.util.ArrayList;
import java.util.List;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Date;
import java.sql.SQLException;

/**
 *
 * @author plmin
 */
public class StudentDAO extends DBContext {

    public StudentDAO() {
        super();
    }

    public List<Student> getAll() {
        String sql = "SELECT * FROM Student";
        List<Student> list = new ArrayList<>();
        try {
            Connection con = this.getConnection();
            if (con != null) {
                PreparedStatement pre = con.prepareStatement(sql);
                ResultSet resultSet = pre.executeQuery();
                while (resultSet.next()) {
                    int id = resultSet.getInt("id");
                    String name = resultSet.getString("name");
                    String gender = resultSet.getString("gender");
                    Date dob = resultSet.getDate("dob");
                    String username = resultSet.getString("username");
                    String pass = resultSet.getString("pass");

                    Student student = new Student(id, name, gender, dob, username, pass);
                    list.add(student);
                }
                con.close();
            }
        } catch (Exception e) {
            System.out.println("Error: " + e);
        }
        return list;
    }

    public Student getStudentById(int id) {
        Student student = null;
        String query = "SELECT * FROM Students WHERE id = ?";
        try {
            PreparedStatement preparedStatement = getConnection().prepareStatement(query);
            preparedStatement.setInt(1, id);
            ResultSet rs = preparedStatement.executeQuery();
            if (rs.next()) {
                student = new Student();
                student.setId(rs.getInt("id"));
                student.setName(rs.getString("name"));
                student.setGender(rs.getString("gender"));
                student.setDob(rs.getDate("dob"));
                student.setUsername(rs.getString("username"));
                student.setPassword(rs.getString("password")); // Ensure column name matches
            } else {
                System.out.println("Student not found for ID: " + id);
                // Optionally, throw an exception or handle this case as needed
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return student;
    }

    public void addStudent(Student student) {
        String sql = "INSERT INTO Student (name, gender, dob, username, pass) VALUES (?, ?, ?, ?, ?)";

        try {
            if (con != null) {
                PreparedStatement pre = con.prepareStatement(sql);
                pre.setString(1, student.getName());
                pre.setString(2, student.getGender());
                pre.setDate(3, new java.sql.Date(student.getDob().getTime()));
                pre.setString(4, student.getUsername());
                pre.setString(5, student.getPassword());
                pre.executeUpdate();
                con.close();
            }
        } catch (Exception e) {
            System.out.println("Error: " + e);
        }
    }

    public void updateStudent(Student student) {
        String sql = "UPDATE Student SET name = ?, gender = ?, dob = ?, username = ?, pass = ? WHERE id = ?";

        try {
            if (con != null) {
                PreparedStatement pre = con.prepareStatement(sql);
                pre.setString(1, student.getName());
                pre.setString(2, student.getGender());
                pre.setDate(3, new java.sql.Date(student.getDob().getTime()));
                pre.setString(4, student.getUsername());
                pre.setString(5, student.getPassword());
                pre.setInt(6, student.getId());
                pre.executeUpdate();
                con.close();
            }
        } catch (Exception e) {
            System.out.println("Error: " + e);
        }
    }

    public void deleteStudent(int id) {
        String sql = "DELETE FROM Student WHERE id = ?";

        try {
            if (con != null) {
                PreparedStatement pre = con.prepareStatement(sql);
                pre.setInt(1, id);
                pre.executeUpdate();
                con.close();
            }
        } catch (Exception e) {
            System.out.println("Error: " + e);
        }
    }

    public static void main(String[] args) {
        StudentDAO sDAO = new StudentDAO();
        List<Student> students = sDAO.getAll();
        for (Student student : students) {
            System.out.println(student);
        }
    }
}
