/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

import java.sql.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author plmin
 */
public class PostDB implements Post {

    public static Connection getConnect() {
        Connection con = null;
        try {
            Class.forName(DRIVERNAME);
            con = DriverManager.getConnection(DBURL, USERDB, PASSDB);
            System.out.println("Database connection established successfully!");
        } catch (ClassNotFoundException e) {
            System.out.println("Error loading driver: " + e);
        } catch (SQLException e) {
            System.out.println("Error connecting to database: " + e);
        }
        return con;
    }

    public PostModel getPost(String postID) {
        PostModel p = null;
        try (Connection c = getConnect()) {
            PreparedStatement pr = c.prepareStatement("Select * from PRJ301_DE180596");
            pr.setString(1, postID);
            ResultSet rs = pr.executeQuery();
            if (rs.next()) {
                String pID = rs.getString("postID");
                String title = rs.getString("title");
                String category = rs.getString("category");
                p = new PostModel(pID, title, category);
            }
            c.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return p;
    }

    public static List<PostModel> search(String postID) {
        List<PostModel> posts = new ArrayList<>();
        try (Connection con = getConnect()) {
            if (con != null) {
                String query = "select * from PRJ301_DE180596";
                PreparedStatement stmt = con.prepareStatement(query);
                ResultSet rs = stmt.executeQuery();
                while (rs.next()) {
                    posts.add(new PostModel(rs.getString("PostId"), rs.getString("Title"), rs.getString("Category")));
                }
            } else {
                System.out.println("Connection object is null.");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return posts;
    }

    public static ArrayList<PostModel> listAll() {
        ArrayList<PostModel> list = new ArrayList<PostModel>();
        //Connection con = getConnect();
        try (Connection c = getConnect()) {
            PreparedStatement pr = c.prepareStatement("Select * from PRJ301_DE180596");
            ResultSet rs = pr.executeQuery();
            while (rs.next()) {
                list.add(new PostModel(rs.getNString("postID"), rs.getNString("title"), rs.getNString("category")));
            }
            c.close();
            return list;
        } catch (Exception ex) {
            java.util.logging.Logger.getLogger(PostDB.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        }
        return null;
    }

    public static void main(String args[]) {
        ArrayList<PostModel> post = PostDB.listAll();
        for (PostModel p : post) {
            System.out.println(p);
        }
    }
}
