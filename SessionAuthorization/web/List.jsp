<%-- 
    Document   : List
    Created on : Jun 13, 2024, 12:13:54 AM
    Author     : plmin
--%>
<%@page import="java.util.List"%>
<%@page import="Model.User"%>
<%@page import="Model.Student"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <h1>List of Students</h1>
        <c:if test="${isAdmin}">
            <a href="Add.jsp">Add New Student</a>
        </c:if>
        <table border="1">
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                    <c:if test="${isAdmin}">
                    <th>Actions</th>
                    </c:if>
            </tr>
            <c:forEach var="student" items="${students}">
                <tr>
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.gender}</td>
                    <td><fmt:formatDate value="${student.dob}" pattern="yyyy-MM-dd"/></td>
                    <c:if test="${isAdmin}">
                        <td>
                            <a href="HandlingServlet?action=delete&id=${student.id}">Delete</a>
                        </td>
                    </c:if>
                </tr>
            </c:forEach>
        </table>
    </body>
</html>
