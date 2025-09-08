/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

import java.lang.System.Logger;
import java.lang.System.Logger.*;
import java.sql.*;
import java.util.*;
import java.util.function.Predicate;

/**
 *
 * @author hotaru
 */
public class PosterDB implements DatabaseInfo {
    
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
    
    public Poster getPoster(String postID) {
        Poster p = null;
        try (Connection c = getConnect()) {
            PreparedStatement pr = c.prepareStatement("Select * from DE180596");
            pr.setString(1, postID);
            ResultSet rs = pr.executeQuery();
            if (rs.next()) {
                String pID = rs.getString("postID");
                String title = rs.getString("title");
                String category = rs.getString("category");
                p = new Poster(pID, title, category);
            }
            c.close();
        }
        catch (Exception e) {
            e.printStackTrace();
       }
        return p;
    }
    
    public static ArrayList<Poster> listAll(){
          ArrayList<Poster> list= new ArrayList<Poster>();
          //Connection con = getConnect();
          try(Connection c = getConnect()) {
            PreparedStatement pr = c.prepareStatement("Select * from DE180596");
            ResultSet rs = pr.executeQuery();
            while(rs.next()){
                list.add(new Poster(rs.getNString("postID"), rs.getNString("title"), rs.getNString("category")));
            }
            c.close();
            return list;
        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(PosterDB.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        }   
          return null;
    }
    
    public static List<Poster> search(String category) {
        List<Poster> posts = new ArrayList<>();
        try (Connection con = getConnect()) {
            String query = "select * from DE180596 where category = ?";
            PreparedStatement stmt = con.prepareStatement(query);
            stmt.setString(1, category);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                posts.add(new Poster(rs.getString("postID"), rs.getString("title"), rs.getString("category")));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return posts;
    }
    
    public static void main(String args[]) {
        List<Poster> poster = PosterDB.search("Kinh tế");
        //ArrayList<Poster> poster = PosterDB.listAll();
        for (Poster p : poster) 
        {
            System.out.println(p);
        }
    }
}
