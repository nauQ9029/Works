<%-- 
Document   : student
Created on : May 21, 2024, 3:12:39 PM
Author     : ASUS
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ page import="java.util.List" %>
<%@ page import="controller.Student" %>
<%@ page import="java.text.SimpleDateFormat" %>
<!DOCTYPE html>
<html>
    <head>
        <title>Student List</title>
    </head>
    <body>
        <form action="/work2/StudentServlet" method="post"> 
            Number of students: <input id="number" type="text" name="number"/>
            <input type="submit" value="gererate"/>  
        </form>
        <table border="1">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>DOB</th>
                </tr>
            </thead>
            <tbody>
                <%
                    List<Student> students = (List<Student>) request.getAttribute("students");
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                    if (students != null) {
                        for (Student student : students) {
                            out.println("<tr>");
                            out.println("<td>" + student.getId() + "</td>");
                            out.println("<td>" + student.getName() + "</td>");
                            out.println("<td><input type='checkbox' disabled " + (student.isGender() ? "checked" : "") + "></td>");
                            out.println("<td>" + sdf.format(student.getDob()) + "</td>");
                            out.println("</tr>");
                        }
                    }
                %>
            </tbody>
        </table>
    </body>
</html>