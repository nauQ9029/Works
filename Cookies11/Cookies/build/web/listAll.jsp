<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="Model.Student" %>
<%@ page import="java.util.List" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Student List</title>
</head>
<body>
    <h1>Student List</h1>
    <table border="1">
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>Action</th>
        </tr>
        <% 
            List<Student> list = (List<Student>) request.getAttribute("students");
            if (list != null) {
                for (Student studentObj : list) {
        %>
        <tr>
            <td><%= studentObj.getId() %></td>
            <td><%= studentObj.getName() %></td>
            <td><%= studentObj.getGender() %></td>
            <td><%= studentObj.getDob() %></td>
            <td>
                <form action="StudentServlet" method="post" style="display:inline;">
                    <input type="hidden" name="action" value="delete">
                    <input type="hidden" name="id" value="<%= studentObj.getId() %>">
                    <input type="submit" value="Delete">
                </form>
            </td>
        </tr> 
        <% 
                }
            } else {
        %>
        <tr>
            <td colspan="5">No students found.</td>
        </tr>
        <% 
            }
        %>
    </table>
    <form action="StudentServlet" method="get">
    <input type="hidden" name="action" value="back">
    <input type="submit" value="Back">
</form>
    <br>
    <form action="addStudent.jsp" method="get">
        <input type="submit" value="Add Student">
    </form>
    <form action="AuthServlet" method="get">
    <input type="submit" value="Logout">
</form>
</body>
</html>
