<%-- 
    Document   : result
    Created on : May 28, 2024, 3:41:42 PM
    Author     : plmin
--%>


<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="Model.PostModel" %>
<%@ page import="java.util.List" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Result</title>
    </head>
    <body>
        <h1>Search Results</h1>
        <%
            List<PostModel> posts = (List<PostModel>) request.getAttribute("posts");
            String category = request.getParameter("category");
            out.println("<p>Category searched: " + category + "</p>"); // Debugging line
            if (posts != null && !posts.isEmpty()) {
                for (PostModel post : posts) {
                    out.println("<p>ID: " + post.getPostID() + "</p>");
                    out.println("<p>Title: " + post.getTitle() + "</p>");
                    out.println("<p>Category: " + post.getCategory() + "</p>");
                    out.println("<hr>");
                }
            } else {
                out.println("<p>No posts found for this category.</p>");
            }
        %>
    </body>
</html>
