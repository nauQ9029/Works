<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="Model.Poster" %>
<%@page import="java.util.ArrayList" %>
<!DOCTYPE html>
<html>
    <head>
        <title>All Posts</title>
    </head>
    
    <a class="nav-link" href="/your_project_path/listAllPosterServlet">All Poster</a>
    <a class="nav-link" href="/your_project_path/search">Search Poster</a>
    <body>
        <h2>All Posts</h2>
        <%
            ArrayList<Poster> posts = (ArrayList<Poster>) request.getAttribute("posts");
            if (posts != null && !posts.isEmpty()) {
        %>
        <table border="1">
            <tr>
                <th>Post ID</th>
                <th>Title</th>
                <th>Category</th>
            </tr>
            <%
                for (Poster post : posts) {
            %>
            <tr>
                <td><%= post.getPostID() %></td>
                <td><%= post.getTitle() %></td>
                <td><%= post.getCategory() %></td>
            </tr>
            <%
                }
            %>
        </table>
        <%
            } else {
        %>
        <p>No posts found.</p>
        <%
            }
        %>
    </body>
</html>
