<%-- 
    Document   : register
    Created on : Jun 27, 2024, 1:01:05 PM
    Author     : plmin
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Register Page</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f0f0f0;
                padding: 20px;
            }
            h2 {
                color: #333;
            }
            form {
                max-width: 300px;
                margin: 0 auto;
                background: #fff;
                padding: 20px;
                border: 1px solid #ccc;
                border-radius: 5px;
            }
            input[type=text], input[type=email], input[type=password] {
                width: calc(100% - 20px);
                padding: 10px;
                margin-bottom: 10px;
                border: 1px solid #ccc;
                border-radius: 3px;
            }
            input[type=submit] {
                background-color: #4CAF50;
                color: white;
                padding: 10px 20px;
                border: none;
                border-radius: 3px;
                cursor: pointer;
            }
            input[type=submit]:hover {
                background-color: #45a049;
            }
            a {
                color: #007bff;
                text-decoration: none;
                margin-left: 10px;
            }
        </style>
    </head>
    <body>
        <h2>Register</h2>
        <form action="RegisterUserServlet" method="post">
            Username: <input type="text" name="username"/><br/>
            Email: <input type="email" name="email"/><br/>
            Password: <input type="password" name="password"/><br/>
            <input type="submit" value="Register"/>
        </form>
        <a href="login.jsp">Login</a>
    </body>
</html>
