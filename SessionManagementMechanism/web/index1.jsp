<%-- 
    Document   : index
    Created on : Jun 6, 2024, 1:40:16 PM
    Author     : plmin
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Login Page</title>
    </head>
    <body>
        <h2>Login</h2>
        <form action="CookieServlet" method="post">
            Username: <input type="text" name="username"/><br/>
            <input type="submit" value="Login with Cookies"/>
        </form>
    </body>
</html>
