<%-- 
    Document   : index
    Created on : May 28, 2024, 3:41:02 PM
    Author     : plmin
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Posts</title>
    </head>
    <body>
        <h1>Search Posts by Category</h1>
        <form action="PostServlet" method="GET">
            <label for="category">Category:</label>
            <input type="text" id="category" name="category">
            <input type="hidden" name="action" value="searchByCategory">
            <input type="submit" value="Search">
        </form>
    </body>
</html>
