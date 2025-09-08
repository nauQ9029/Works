<%-- 
    Document   : Delete
    Created on : Jun 13, 2024, 1:47:04 PM
    Author     : plmin
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <%
            List<Student> students = (List<Student>) request.getAttribute("students");
            User user = (User) request.getSession().getAttribute("user");
        %>
        <h1>List of Students</h1>
        <table border="1">
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                <th>Username</th>
                <th>Password</th>
                    <% if (user != null && user.isAdmin()) { %>
                <th>Actions</th>
                    <% } %>
            </tr>
            <% for (Student student : students) { %>
            <tr>
                <td><%= student.getId() %></td>
                <td><%= student.getName() %></td>
                <td><%= student.getGender() %></td>
                <td><%= new java.text.SimpleDateFormat("yyyy-MM-dd").format(student.getDob()) %></td>
                <td><%= student.getUsername() %></td>
                <td><%= student.getPassword() %></td>
                <% if (user != null && user.isAdmin()) { %>
                <td>
                    <a href="HandlingServlet?action=edit&id=<%= student.getId() %>">Edit</a>
                    <a href="HandlingServlet?action=delete&id=<%= student.getId() %>">Delete</a>
                </td>
                <% } %>
            </tr>
            <% } %>
        </table>
        <% if (user != null && user.isAdmin()) { %>
        <a href="Add.jsp">Add New Student</a>
        <% } %>
    </body>
</html>
