<%-- 
    Document   : DashBoard
    Created on : Jun 26, 2024, 11:53:00 PM
    Author     : plmin
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="Model.Customer" %>
<%@page import="jakarta.servlet.http.HttpSession" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Dashboard Page</title>
    </head>
    <body>
        <h2>Welcome, 
            <%
                HttpSession httpSession = request.getSession(false);
                if (httpSession != null && session.getAttribute("loggedIn") != null && (boolean) session.getAttribute("loggedIn")) {
                    Customer customer = (Customer) session.getAttribute("customer");
                    if (customer != null) {
                        out.print(customer.getUsername());
            %>
        </h2>
        <a href="Booking.jsp">Book a Room</a><br>
        <a href="ViewBookings.jsp">View Bookings</a><br>
        <% } %>
        <% } else { %>
        <h2>Welcome, Guest</h2>
        <% } %>
    </body>
</html>
