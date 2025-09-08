<%-- 
    Document   : dashboard
    Created on : Jun 27, 2024, 1:01:31 PM
    Author     : plmin
--%>
<%@page import="Model.Task"%>
<%@page import="Model.TaskAssignment"%>
<%@page import="java.util.List"%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Dashboard</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Dashboard</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f0f0f0;
                padding: 20px;
            }
            h2 {
                color: #333;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
            }
            th, td {
                padding: 10px;
                text-align: left;
                border: 1px solid #ccc;
            }
            th {
                background-color: #007bff;
                color: white;
            }
            td {
                background-color: #fff;
            }
            a {
                color: #007bff;
                text-decoration: none;
                margin-left: 10px;
            }
        </style>
    </head>
    <body>
        <h2>Welcome to Your Dashboard</h2>

        <!-- Display tasks from session -->
        <h3>Your Tasks:</h3>
        <table border="1">
            <thead>
                <tr>
                    <th>Task ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Created Date</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <c:forEach var="task" items="${tasks}">
                    <tr>
                        <td>${task.taskId}</td>
                        <td>${task.title}</td>
                        <td>${task.description}</td>
                        <td>${task.createdDate}</td>
                        <td>${task.dueDate}</td>
                        <td>${task.status}</td>
                        <td>
                            <form action="CompleteTaskServlet" method="post">
                                <input type="hidden" name="taskId" value="${task.taskId}"/>
                                <input type="submit" value="Complete"/>
                            </form>
                        </td>
                    </tr>
                </c:forEach>
            </tbody>
        </table>

        <br/>
        <a href="logout.jsp">Logout</a>
    </body>
</html>
