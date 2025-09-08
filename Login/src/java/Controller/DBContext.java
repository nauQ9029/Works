/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 *
 * @author MINH CHIEN
 */
public class DBContext {
    
    public  Connection getConnect() throws Exception{
       try{ 
            Class.forName(DRIVERNAME); 
	} catch(ClassNotFoundException e) {
            System.out.println("Error loading driver" + e);
	}
        try{            
            Connection con = DriverManager.getConnection(DBURL,USERDB,PASSDB);
            return con;
        }
        catch(SQLException e) {
            System.out.println("Error: " + e);
        }
        return null;
    }
    
    private final String DRIVERNAME = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
    private final String DBURL = "jdbc:sqlserver://nauQ;databaseName=Loginn;encrypt=false;trustServerCertificate=false;loginTimeout=30;";
    private final String USERDB = "sa";
    private final String PASSDB = "123";
}
