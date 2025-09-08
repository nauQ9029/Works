<%-- 
Document   : page
Created on : Jun 5, 2024, 10:34:40 PM
Author     : plmin
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Scope Page</title>
    </head>
    <body>
        <!-- Use the JavaBean with page scope -->
        <jsp:useBean id="pageMessage" class="Controller.testScope" scope="page" />
        <jsp:setProperty name="pageMessage" property="message" value="This is a message with page scope." />

        <!-- Display the message from the bean -->
        <p>Message: <jsp:getProperty name="pageMessage" property="message" /></p>

    </body>
</html>
