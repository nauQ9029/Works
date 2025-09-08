<%-- 
    Document   : Login
    Created on : Jun 26, 2024, 11:52:34 PM
    Author     : plmin
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Login Page</title>
    </head>
    <body>
        <h2>Login</h2>
        <form action="LoginServlet" method="post">
            Username: <input type="text" name="username"><br>
            Password: <input type="password" name="password"><br>
            <input type="submit" value="Login">
        </form>
        <p style="color:red;">
            <% if(request.getParameter("error") != null) { %>
            <%= request.getParameter("error") %>
            <% } %>
        </p>    
    </body>
</html>
