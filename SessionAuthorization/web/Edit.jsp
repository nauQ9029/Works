<%-- 
    Document   : Edit
    Created on : Jun 13, 2024, 1:28:56 PM
    Author     : plmin
--%>
<%@ page import="DAO.StudentDAO" %>
<%@ page import="Model.Student" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <h1>Edit Student</h1>
        <c:if test="${student != null}">
            <form action="HandlingServlet?action=edit" method="post">
                <input type="hidden" name="id" value="${student.id}">
                Name: <input type="text" name="name" value="${student.name}"><br>
                Gender: <input type="text" name="gender" value="${student.gender}"><br>
                Date of Birth: <input type="date" name="dob" value="${student.dob}"><br>
                Username: <input type="text" name="username" value="${student.username}"><br>
                Password: <input type="password" name="password" value="${student.password}"><br>
                <input type="submit" value="Update">
            </form>
        </c:if>
        <c:if test="${student == null}">
            <p>Student not found or invalid ID.</p>
        </c:if>
    </body>
</html>
