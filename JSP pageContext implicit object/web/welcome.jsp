<%-- 
    Document   : welcome
    Created on : May 16, 2024, 1:56:43 PM
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
        String name=request.getParameter("uname");  
        out.print("Welcome "+name);  

        pageContext.setAttribute("user",name,PageContext.SESSION_SCOPE);    

        %> 

        <a href="second.jsp">second jsp page</a>
    </body>
</html>
