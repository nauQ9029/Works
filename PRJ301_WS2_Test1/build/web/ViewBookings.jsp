<%-- 
    Document   : ViewBookings
    Created on : Jun 27, 2024, 1:35:07 AM
    Author     : plmin
--%>

<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="jakarta.servlet.http.HttpSession" %>
<%@ page import="DAO.BookingDAO" %>
<%@ page import="Model.Booking" %>
<%@ page import="Model.Customer" %>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>View Bookings</title>
    </head>
    <body>
        <h2>View Bookings</h2>
        <table border="1">
            <thead>
                <tr>
                    <th>Booking ID</th>
                    <th>Customer ID</th>
                    <th>Room ID</th>
                    <th>Booking Date</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Purpose</th>
                </tr>
            </thead>
            <tbody>
                <% BookingDAO bookingDAO = new BookingDAO(); %>
                <% List<Booking> bookings = bookingDAO.getAllBookings(); %>
                <% for (Booking booking : bookings) { %>
                <tr>
                    <td><%= booking.getId() %></td>
                    <td><%= booking.getCustomerId() %></td>
                    <td><%= booking.getRoomId() %></td>
                    <td><%= booking.getBookingDate() %></td>
                    <td><%= booking.getStartTime() %></td>
                    <td><%= booking.getEndTime() %></td>
                    <td><%= booking.getPurpose() %></td>
                </tr>
                <% } %>
            </tbody>
        </table>
    </body>
</html>
