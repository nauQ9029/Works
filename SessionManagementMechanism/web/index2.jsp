<%-- 
    Document   : index2
    Created on : Jun 6, 2024, 1:47:19 PM
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
        <form action="UrlRewriteServlet" method="post">
            Username: <input type="text" name="username"/><br/>
            <input type="submit" value="Login with URL Rewriting"/>
        </form>
    </body>
</html>
