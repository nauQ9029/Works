/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package LoginDAO;


import Controller.DBContext;
import Model.Account;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
/**
 *
 * @author MINH CHIEN
 */
public class LoginDAO {
    Connection con = null;
    PreparedStatement ps = null;
    ResultSet rs = null;
    public Account checkLogin(String username,String password){
        try{
            String query = "select * from account where username =? and password = ?" ;
            con = new DBContext().getConnect();
            ps = con.prepareStatement(query);
            ps.setString(1,username);
            ps.setString(2, password);
            rs = ps.executeQuery();
            while(rs.next()){
                Account a = new Account(rs.getString(1),rs.getString(2));
                return a;
            }
        }catch (Exception e){
            
        }
        return null;
}
}
