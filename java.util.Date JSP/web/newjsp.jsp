<%-- 
    Document   : newjsp
    Created on : May 16, 2024, 12:51:01 PM
    Author     : plmin
--%>

<%@page contentType="text/html" import = "java.util.Date" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <%-- MyFirstProgram.JSP --%>
        <% out.println("<h1>Hello there!</h1>"); %> <Br>
        <%= "Current date is " + new Date() %>
    </body>
</html>
