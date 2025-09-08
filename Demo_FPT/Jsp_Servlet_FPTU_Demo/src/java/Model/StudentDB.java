
package Model;

import java.sql.*;

import java.util.ArrayList;
import java.util.function.Predicate;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.naming.*;
import javax.sql.DataSource;

public class StudentDB implements DatabaseInfo{
    public static Connection getConnect(){
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
    /*public static Connection getConnect(){
        try{
            Context initContext = new InitialContext();
            Context envContext = (Context) initContext.lookup("java:/comp/env");
                    DataSource ds = (DataSource) envContext.lookup("jdbc/mydb");
                    return ds.getConnection();
        } catch (SQLException | NamingException ex){
            System.out.println("Error: " + ex);
        }
        return null;
    }*/
    public static Student getStudent(int id){
        Student s=null;
        try(Connection con=getConnect()) {
            PreparedStatement stmt=con.prepareStatement("Select name, gender,dob from Student where id=?");
            stmt.setInt(1, id);
            ResultSet rs=stmt.executeQuery();
            if(rs.next()){
                String name=rs.getString(1);
                String gender=rs.getString(2);
                Date dob=rs.getDate(3);
                s=new Student(id,name,gender,dob);
            }
            con.close();
        } catch (Exception ex) {
            Logger.getLogger(StudentDB.class.getName()).log(Level.SEVERE, null, ex);
        }
        return s;
    }
//--------------------------------------------------------------------------------------------
    public static Student login(String username) throws Exception{
        Student s=null;
        Connection con=getConnect();
        try{
            PreparedStatement stmt=con.prepareStatement("Select id, name, gender, dob, pass from Student where username=?");
            stmt.setString(1, username);
            ResultSet rs=stmt.executeQuery();
            if(rs.next()){
                int id = rs.getInt(1);
                String name=rs.getString(2);
                String gender=rs.getString(3);
                Date dob=rs.getDate(4);
                String pass = rs.getString(5);
                s=new Student(id,name,gender,dob,username,pass);
            }
            
        } catch (Exception ex) {
            Logger.getLogger(StudentDB.class.getName()).log(Level.SEVERE, null, ex);
        }
        finally {con.close();}
        return s;
    }
    
    public static int newStudent(Student s){
        int id=-1;
        try(Connection con=getConnect()) {
            PreparedStatement stmt=con.prepareStatement("Insert into Student(name, gender,dob) output inserted.id values(?,?,?)");
            stmt.setString(1, s.getName());
            stmt.setString(2, s.getGender().substring(0,1));
            stmt.setDate(3, s.getDateOB());
            ResultSet rs=stmt.executeQuery();
            if(rs.next()){
                id=rs.getInt(1);
            }
            con.close();
        } catch (Exception ex) {
            Logger.getLogger(StudentDB.class.getName()).log(Level.SEVERE, null, ex);
        }
        return id;
    }
//-----------------------------------------------------------------------------------
    public static Student update(Student s){
        try(Connection con=getConnect()) {
            PreparedStatement stmt=con.prepareStatement("Update Student set name=?, gender=?,dob=? where id =?");
            stmt.setString(1, s.getName());
            stmt.setString(2, s.getGender().substring(0,1));
            stmt.setDate(3, s.getDateOB());
            stmt.setInt(4, s.getId());
            int rc=stmt.executeUpdate();
            con.close();
            return s;
        } catch (Exception ex) {
            Logger.getLogger(StudentDB.class.getName()).log(Level.SEVERE, null, ex);
            throw new RuntimeException("Invalid data");
        }
    }
//--------------------------------------------------------------------------------
        public static int delete(int id){
         try(Connection con=getConnect()) {
            PreparedStatement stmt=con.prepareStatement("Delete Student where id =?");
            stmt.setInt(1, id);
            int rc=stmt.executeUpdate();
            con.close();
            return rc;
        } catch (Exception ex) {
            Logger.getLogger(StudentDB.class.getName()).log(Level.SEVERE, null, ex);
        }   
        return 0;
    }
//--------------------------------------------------------------------------------------------
        public static ArrayList<Student> search(Predicate<Student> p){
            ArrayList<Student> list=listAll();
            ArrayList<Student> res= new ArrayList<Student>();
            for(Student s:list)
                if(p.test(s)) res.add(s);
            return res;
        }
//--------------------------------------------------------------------------------------------
        public static ArrayList<Student> listAll(){
          ArrayList<Student> list= new ArrayList<Student>();
          //Connection con = getConnect();
          try(Connection con=getConnect()) {
            PreparedStatement stmt=con.prepareStatement("Select id, name, gender, dob from Student");
            ResultSet  rs=stmt.executeQuery();
            while(rs.next()){
                list.add(new Student(rs.getInt(1),rs.getString(2),rs.getString(3),rs.getDate(4)));
            }
            con.close();
            return list;
        } catch (Exception ex) {
            Logger.getLogger(StudentDB.class.getName()).log(Level.SEVERE, null, ex);
        }   
          return null;
        }
//--------------------------------------------------------------------------------------------
    public static void main(String[] a){
        ArrayList<Student> list = StudentDB.listAll();
        for (Student item: list) 
        {
            System.out.println(item);
        }
    }
//---------------------------------------------------------------------------
}
