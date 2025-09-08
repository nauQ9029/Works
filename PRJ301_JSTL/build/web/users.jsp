<%-- 
    Document   : users
    Created on : Jun 18, 2024, 10:57:54 AM
    Author     : plmin
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Users List Page</title>
    </head>
    <body>
        <h1>List of Users</h1>
        <table border="1">
            <tr>
                <th>Name</th>
                <th>Age</th>
            </tr>
            <c:forEach var="user" items="${users}">
                <tr>
                    <td><c:out value="${user.name}"/></td>
                <td><c:out value="${user.age}"/></td>
                </tr>
            </c:forEach>
        </table>
        <br>
        <a href="index.jsp">Back to Home</a>
    </body>
</html>
