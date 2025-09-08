/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

import static Model.DatabaseInfo.DBURL;
import static Model.DatabaseInfo.DRIVERNAME;
import static Model.DatabaseInfo.PASSDB;
import static Model.DatabaseInfo.USERDB;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author plmin
 */
public class PostDB implements DatabaseInfo {

    public static Connection getConnect() {
        try {
            Class.forName(DRIVERNAME);
        } catch (ClassNotFoundException e) {
            System.out.println("Error loading driver" + e);
        }
        try {
            Connection con = DriverManager.getConnection(DBURL, USERDB, PASSDB);
            return con;
        } catch (SQLException e) {
            System.out.println("Error: " + e);
        }
        return null;
    }

    public Post getPost(String postID) {
        Post p = null;
        try (Connection con = getConnect()) {
            PreparedStatement stmt = con.prepareStatement("Select * from posts");
            stmt.setString(1, postID);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                String pID = rs.getString("postID");
                String title = rs.getString("title");
                String category = rs.getString("category");
                p = new Post(pID, title, category);
            }
            con.close();
        } catch (Exception ex) {
            Logger.getLogger(PostDB.class.getName()).log(Level.SEVERE, null, ex);
        }
        return p;
    }

    public static ArrayList<Post> listAll() {
        ArrayList<Post> list = new ArrayList<Post>();
        //Connection con = getConnect();
        try (Connection con = getConnect()) {
            PreparedStatement stmt = con.prepareStatement("Select * from posts");
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                list.add(new Post(rs.getString("postID"), rs.getString("title"), rs.getString("category")));
            }
            con.close();
            return list;
        } catch (Exception ex) {
            Logger.getLogger(PostDB.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }
    
    public static List<Post> search(String category) {
        List<Post> post = new ArrayList<>();
        try(Connection con = getConnect()) {
            String query = "Select * from posts where category = ?";
            PreparedStatement stmt  = con.prepareStatement(query);
            stmt.setString(1, category);
            ResultSet rs =  stmt.executeQuery();
            while(rs.next()) {
                post.add(new Post(rs.getString("postID"), rs.getString("title"), rs.getString("category")));
            }
        } catch (SQLException ex) {
            Logger.getLogger(PostDB.class.getName()).log(Level.SEVERE, null, ex);
        }
        return post;
    }
    
    public static void main(String args[]) {
        List<Post> post = PostDB.search("Kinh tế");
        //ArrayList<Post> post = PostDB.listAll();
        for(Post p : post) {
            System.out.println(p);
        }
    }
}
