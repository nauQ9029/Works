<%-- 
    Document   : scopes
    Created on : Jun 5, 2024, 10:03:58 PM
    Author     : plmin
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Test Scope</title>
    </head>
    <body>
        <!-- Page Scope -->
        <jsp:useBean id="pageBean" class="Controller.testScope" scope="page" />
        <jsp:setProperty name="pageBean" property="message" value="Page Scope Bean" />
        Page Bean Message: <jsp:getProperty name="pageBean" property="message" /><br/>

        <!-- Request Scope -->
        <jsp:useBean id="requestBean" class="Controller.testScope" scope="request" />
        <jsp:setProperty name="requestBean" property="message" value="Request Scope Bean" />
        Request Bean Message: <jsp:getProperty name="requestBean" property="message" /><br/>

        <!-- Session Scope -->
        <jsp:useBean id="sessionBean" class="Controller.testScope" scope="session" />
        <jsp:setProperty name="sessionBean" property="message" value="Session Scope Bean" />
        Session Bean Message: <jsp:getProperty name="sessionBean" property="message" /><br/>

        <!-- Application Scope -->
        <jsp:useBean id="applicationBean" class="Controller.testScope" scope="application" />
        <jsp:setProperty name="applicationBean" property="message" value="Application Scope Bean" />
        Application Bean Message: <jsp:getProperty name="applicationBean" property="message" /><br/>
    </body>
</html>
