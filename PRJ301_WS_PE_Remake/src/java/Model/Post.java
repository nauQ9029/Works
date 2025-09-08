/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

/**
 *
 * @author plmin
 */
public class Post {
    private String postID;
    private String title;
    private String category;

    public Post() {}
    public Post(String postID, String title, String category) {
        this.category = category;
        this.postID = postID;
        this.title = title;
    }
    
    public void setPostID(String postID) {
        this.postID = postID;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getPostID() {
        return postID;
    }

    public String getTitle() {
        return title;
    }

    public String getCategory() {
        return category;
    }

    @Override
    public String toString() {
        return "Poster{" + "postID=" + postID + ", title=" + title + ", category=" + category + '}';
    }
}
