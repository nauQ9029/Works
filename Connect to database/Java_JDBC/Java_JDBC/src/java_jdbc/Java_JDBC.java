package java_jdbc;

import java.sql.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class Java_JDBC {  
    
    public static Connection getConnectionWithSqlJdbc() throws Exception 
    {
        Connection con = null;
        String dbUser = "sa"; 
        String dbPassword = "123";
        String port ="1433";
        String IP = "127.0.0.1";
        String ServerName ="nauQ";
        String DBName ="School";
        String driverClass = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
        
        String dbURL = "jdbc:sqlserver://nauQ;databaseName=School;encrypt=false;trustServerCertificate=false;loginTimeout=30"; 
        //String dbURL = "jdbc:sqlserver://DESKTOP-UEDQ7P6\\HOATNTT;databaseName=School;encrypt=false;trustServerCertificate=false;loginTimeout=30";         
        try{
            Class.forName(driverClass);
            //DriverManager.registerDriver(new com.microsoft.sqlserver.jdbc.SQLServerDriver());
            con = DriverManager.getConnection(dbURL,dbUser,dbPassword);        
        } catch( SQLException e) {
            System.out.println("Error: " + e);
        }
        return con;
    }
    
    
    public static void getResult_Select(Connection con) throws Exception
    {   
        Statement stmt =null;
        ResultSet rs = null;
        try{ 
            stmt = con.createStatement();
            rs= stmt.executeQuery("Select Id, Name from Student " );
            while(rs.next()){
                System.out.println (rs.getInt("Id") + " Ten SV: " + rs.getString("Name"));
            }
            
	} catch(Exception e) {
            System.out.println("Error: " + e);           
	} 
        finally{
            stmt.close();
            rs.close();
            con.close();
        }        
    }
    public static void getResult_Insert(Connection con) throws Exception
    {   
        PreparedStatement stmt =null;
        try{ 
            stmt=con.prepareStatement("Insert into Student(name, gender) output inserted.id values(?,?)");
            stmt.setString(1, "Nguyen Van A");
            stmt.setString(2, "M");
            ResultSet rs=stmt.executeQuery();
            if(rs.next()){
                int id=rs.getInt(1);
                System.out.println("id =" + id);
            }
         
	} catch(Exception e) {
            System.out.println("Error: " + e);           
	} 
        finally{
            stmt.close();
            con.close();
        }        
    }
    public static void getResult_Update(Connection con) throws Exception
    {   
        PreparedStatement stmt =null;
        try{ 
            stmt=con.prepareStatement("Update Student set name=?, gender=? where id =?");
            stmt.setString(1, "Nguyen Thi Anh");
            stmt.setString(2, "F");
            stmt.setInt(3, 100);
            int rc=stmt.executeUpdate();
            if (rc == 1)  System.out.println("Update sucessfully");
            con.close();
                       
	} catch(Exception e) {
            System.out.println("Error: " + e);           
	} 
        finally{
            stmt.close();
            con.close();
        }        
    }
    
    public static void getResult_CallFunction(Connection con) throws Exception
    {   
        CallableStatement cstmt =null;
        ResultSet rs = null;
        try{ 
            //Preparing a CallableStatement to call a function
            cstmt = con.prepareCall("{? = call getDob(?)}");
            //Registering the out parameter of the function (return type)
            cstmt.registerOutParameter(1, Types.DATE);
            //Setting the input parameters of the function
            cstmt.setInt(2, 100);
            //Executing the statement
            cstmt.execute();
            System.out.print("Date of birth: "+cstmt.getDate(1));           
            
	} catch(Exception e) {
            System.out.println("Error: " + e);           
	} 
        finally{
            cstmt.close();
            //rs.close();
            con.close();
        }        
    }
    public static void main(String[] args) throws Exception  {        
        Connection con = getConnectionWithSqlJdbc(); 
        getResult_Select(con);
        //getResult_Update(con);
        //getResult_CallFunction(con);
        //getResult_Insert(con);
        

    }
    
}
