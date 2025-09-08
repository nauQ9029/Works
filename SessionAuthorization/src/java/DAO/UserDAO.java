/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package DAO;

import Connect.DBContext;
import Model.User;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

/**
 *
 * @author plmin
 */
public class UserDAO extends DBContext {

    public User getUser(String usernameInput, String passwordInput) {
        String sql = "select * from [User] where username = ? and password = ?";
        User user = null; //!!

        try {
            if (con != null) {
                PreparedStatement pre = con.prepareStatement(sql);
                pre.setString(1, usernameInput);
                pre.setString(2, passwordInput);

                ResultSet resultSet = pre.executeQuery();
                while (resultSet.next()) {
                    int id = resultSet.getInt("id");
                    String username = resultSet.getString("username");
                    String password = resultSet.getString("password");
                    String role = resultSet.getString("role");

                    user = new User(id, username, password, role);
                }
            }
        } catch (Exception e) {
            System.out.println("Error: " + e);
        }
        return user;
    }
}
