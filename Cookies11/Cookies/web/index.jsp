<%-- 
    Document   : index
    Created on : Jun 13, 2024, 2:03:07 PM
    Author     : CO THAO
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <form action="AuthServlet" method="post">
    Username: <input type="text" name="user"><br>
    Password: <input type="password" name="pwd"><br>
    <input type="submit" value="Login">
</form>
    </body>
</html>
