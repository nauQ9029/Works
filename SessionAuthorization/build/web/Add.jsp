<%-- 
    Document   : Add
    Created on : Jun 13, 2024, 1:26:32 PM
    Author     : plmin
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <h1>Add Student</h1>
        <form action="HandlingServlet" method="post">
            <input type="hidden" name="action" value="add">
            Name: <input type="text" name="name"><br>
            Gender: <input type="text" name="gender"><br>
            Date of Birth: <input type="date" name="dob"><br>
            Username: <input type="text" name="username"><br>
            Password: <input type="password" name="password"><br>
            <input type="submit" value="Add">
        </form>
    </body>
</html>
