<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="Model.Student" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Added Form</title>
</head>
<body>
    <h1>Student Added Successfully</h1>

    <jsp:useBean id="student" class="Model.Student" scope="request" />

    <p>ID: <jsp:getProperty name="student" property="id" /></p>
    <p>Name: <jsp:getProperty name="student" property="name" /></p>
    <p>Gender: <jsp:getProperty name="student" property="gender" /></p>
    <p>Date of Birth: <jsp:getProperty name="student" property="dob" /></p>

    <form action="StudentServlet" method="get">
        <input type="hidden" name="action" value="list">
        <input type="submit" value="View Students" name="listback">
    </form>
</body>
</html>
