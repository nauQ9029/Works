<%-- 
    Document   : index
    Created on : May 29, 2024, 11:59:41 PM
    Author     : plmin
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Search Posts</title>
    </head>

    <!--<a class="nav-link" href="/your_project_path/listAllPosterServlet">All Poster</a>
    <a class="nav-link" href="/your_project_path/search">Search Poster</a> -->
    <body>
        <h2>All Posts</h2>
        <table border="1">
            <tr>
                <th>Post ID</th>
                <th>Title</th>
                <th>Category</th>
            </tr>
            <%
                List<Post> posts = (List<Post>) request.getAttribute("posts");
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
