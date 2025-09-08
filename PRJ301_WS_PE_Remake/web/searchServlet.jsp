<%-- 
    Document   : searchPostIDServlet
    Created on : May 30, 2024, 12:00:15 AM
    Author     : plmin
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Search Category</title>
    </head>
    <body>
        <form action="searchPostServlet" method="get">
            <input type="text" id="category" name="category">
            <button type="submit">Search</button>
        </form>
    </body>
</html>
