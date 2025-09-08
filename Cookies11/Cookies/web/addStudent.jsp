<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>New Student</title>
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

        // Check if user is admin
        boolean isAdmin = "admin".equals(userName);
    %>

    <h1>Add New Student</h1>

    <% if (!isAdmin) { %>
        <p>Không thể truy cập Add Student vì bạn không phải là admin!</p>
    <% } else { %>
        <form action="StudentServlet" method="post">
            <input type="hidden" name="action" value="add">
            Name: <input type="text" name="name" required> <br>
            Gender: 
            <select name="gender">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="LGBT">LGBT</option>
                <option value="Other">Other</option>
            </select> <br>
            Date of Birth: <input type="text" name="dob" placeholder="dd/MM/yyyy" required> <br>
            <input type="submit" value="Add Student">
        </form>
    <% } %>

</body>
</html>
