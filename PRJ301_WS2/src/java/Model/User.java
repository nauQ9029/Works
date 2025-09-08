/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

import DAO.TaskAssignmentDAO;
import DAO.UserDAO;
import java.util.Date;

/**
 *
 * @author plmin
 */
public class User {

    private int userId;
    private String username;
    private String email;
    private String password;
    private Date registrationDate;

    public User() {
    }

    public User(int userId, String username, String email, String password, Date registrationDate) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.password = password;
        this.registrationDate = registrationDate;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(Date registrationDate) {
        this.registrationDate = registrationDate;
    }

    public void doCompleteTask(int taskId) {
        TaskAssignmentDAO taskAssignmentDAO = new TaskAssignmentDAO();
        taskAssignmentDAO.completeTask(this.userId, taskId);
    }

    public void registerUser() {
        UserDAO userDAO = new UserDAO();
        userDAO.registerUser(this);
    }

    @Override
    public String toString() {
        return "User{" + "userId=" + userId + ", username=" + username + ", email=" + email + ", password=" + password + ", registrationDate=" + registrationDate + '}';
    }
}
