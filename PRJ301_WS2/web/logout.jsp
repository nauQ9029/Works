<%-- 
    Document   : logout
    Created on : Jun 27, 2024, 2:03:02 PM
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
        <%-- Invalidate the session and redirect to login page --%>
        <% 
            session.invalidate(); // Invalidate current session
            response.sendRedirect("login.jsp"); // Redirect to login page
        %>
    </body>
</html>
