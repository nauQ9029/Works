<%-- 
    Document   : student
    Created on : May 22, 2024, 10:50:06 PM
    Author     : plmin
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.util.List"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="Controller.Student"%>

<!DOCTYPE html>
<html>
    <head>
        <title>Student list</title>
    </head>
    <body>
        <form actions="/PRJ301_2_JSP/StudentServlet" method="post">
            Number of student: <input id="number" type="text" name="number"/>
            <input type="submit" value="generate"/>
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
