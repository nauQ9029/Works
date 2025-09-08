/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

/**
 *
 * @author plmin
 */
public interface DatabaseInfo {

    public static String DRIVERNAME = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
    public static String DBURL = "jdbc:sqlserver://nauQ;databaseName=Loginn;encrypt=false;trustServerCertificate=false;loginTimeout=30;";
    public static String USERDB = "sa";
    public static String PASSDB = "123";

    public static Connection getConnection() throws SQLException, ClassNotFoundException {
        // Load the SQL Server JDBC driver
        Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
        // Establish connection
        return DriverManager.getConnection(JDBC_URL, DB_USER, DB_PASSWORD);
    }
}
