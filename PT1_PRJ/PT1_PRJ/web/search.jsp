<%-- 
    Document   : search
    Created on : May 28, 2024, 3:52:15 PM
    Author     : hotaru
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Search ID</title>
    </head>
    <body>
        <form action="searchPosterServlet" method="get">
            <input type="text" id="category" name="category">
            <button type="submit">Search</button>
        </form>
    </body>
</html>
