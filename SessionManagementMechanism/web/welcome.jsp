<%-- 
    Document   : welcome
    Created on : Jun 6, 2024, 1:40:50 PM
    Author     : plmin
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Home Page</title>
    </head>
    <body>
        <h2>Welcome, <%= request.getAttribute("username") %>!</h2>
    </body>
</html>
