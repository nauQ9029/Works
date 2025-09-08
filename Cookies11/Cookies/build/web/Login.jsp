<%@ page language="java" contentType="text/html; charset=US-ASCII" pageEncoding="US-ASCII"%>
<%@ page import="java.util.*, javax.servlet.http.*" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "https://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=US-ASCII">
    <title>Main page</title>
</head>
<body>
<%
    // Retrieve the user name from cookies
    String userName = null;
    Cookie[] cookies = request.getCookies();
    if (cookies != null) {
        for (Cookie cookie : cookies) {
            if ("user".equals(cookie.getName())) {
                userName = cookie.getValue();
            }
        }
    }

    // Check if user name is available in the session
    if (session != null) {
        String sessionUser = (String) session.getAttribute("user");
        if (sessionUser != null) {
            userName = sessionUser;
        }
    }

    // Redirect to login page if user is not logged in
    if (userName == null) {
        response.sendRedirect("index.html");
        return;
    }

    // Get session creation time
    Date createTime = new Date(session.getCreationTime());
    // Get last access time of this web page
    Date lastAccessTime = new Date(session.getLastAccessedTime());

    String title = "Welcome to my website";
    Integer visitCount = 0;
    String visitCountKey = "visitCount";
    String userIDKey = "userID";
    String userID = userName; // Set userID from the cookie or session

    // Check if this is a new visitor to your web page
    if (session.isNew()) {
        title = "Welcome to my website";
        session.setAttribute(userIDKey, userID);
        session.setAttribute(visitCountKey, visitCount);
    } else {
        visitCount = (Integer) session.getAttribute(visitCountKey);
        if (visitCount == null) {
            visitCount = 0;
        }
        visitCount = visitCount + 1;
        session.setAttribute(visitCountKey, visitCount);
    }
%>
    <h3>Hi <%= userName %>, Login successful.</h3>
    <h1>Session Tracking</h1>
    <table border="1">
        <tr bgcolor="#949494">
            <th>Session info</th>
            <th>Value</th>
        </tr>
        <tr>
            <td>id</td>
            <td><%= session.getId() %></td>
        </tr>
        <tr>
            <td>Creation Time</td>
            <td><%= createTime %></td>
        </tr>
        <tr>
            <td>Time of Last Access</td>
            <td><%= lastAccessTime %></td>
        </tr>
        <tr>
            <td>User ID</td>
            <td><%= userID != null ? userID : "Not found" %></td>
        </tr>
        <tr>
            <td>Number of visits</td>
            <td><%= visitCount %></td>
        </tr>
    </table>

    <br>
    <form action="StudentServlet" method="get">
        <input type="submit" value="List Student" name="list">
    </form>
    <br>
    <form action="AuthServlet" method="get">
    <input type="submit" value="Logout">
</form>
</body>
</html>
