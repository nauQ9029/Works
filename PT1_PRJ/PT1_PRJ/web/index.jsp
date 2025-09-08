<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="Model.*" %>
<%@page import="java.util.*" %>
<!DOCTYPE html>
<html>
    <head>
        <title>All Posts</title>
    </head>
    <body>
        <h2>All Posts</h2>
        <table border="1">
            <tr>
                <th>Post ID</th>
                <th>Title</th>
                <th>Category</th>
            </tr>
            <%
                List<Poster> posts = (List<Poster>) request.getAttribute("posts");
                if (posts != null && !posts.isEmpty()) {
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
