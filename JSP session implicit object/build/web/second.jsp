<%-- 
    Document   : second
    Created on : May 16, 2024, 1:36:31 PM
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
        <%   
  
        String name=(String)session.getAttribute("user");
        out.print("Hello "+name);  
  
        %>   
    </body>
</html>
