<%-- 
    Document   : Booking
    Created on : Jun 26, 2024, 11:53:28 PM
    Author     : plmin
--%>

<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ page import="java.util.List" %>
<%@ page import="Model.Customer" %>
<%@ page import="jakarta.servlet.http.HttpSession" %>
<%@ page import="DAO.RoomDAO" %>
<%@ page import="Model.Room" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Booking Page</title>
    </head>
    <body>
        <h2>Check Room Availability</h2>
        <form action="BookingServlet" method="post">
            Room ID: <input type="text" name="roomId"><br>
            Booking Date: <input type="date" name="bookingDate"><br>
            Start Time: <input type="time" name="startTime"><br>
            End Time: <input type="time" name="endTime"><br>
            Purpose: <input type="text" name="purpose"><br>
            <input type="submit" value="Check Availability">
        </form>
        <p style="color:red;">
            <% if(request.getParameter("error") != null) { %>
            <%= request.getParameter("error") %>
            <% } %>
        </p>    

        <% HttpSession sessionObj = request.getSession(false);
           if (sessionObj != null && sessionObj.getAttribute("loggedIn") != null && (boolean) sessionObj.getAttribute("loggedIn")) {
               Customer customer = (Customer) sessionObj.getAttribute("customer");
               if (customer != null) { %>
        <h3>Welcome, <%= customer.getUsername() %></h3>
        <%
            // Display room availability details
            RoomDAO roomDAO = new RoomDAO();
            List<Room> rooms = roomDAO.getAllRooms();
            if (rooms != null && !rooms.isEmpty()) {
                out.println("<h4>Available Rooms:</h4>");
                out.println("<ul>");
                for (Room room : rooms) {
                    out.println("<li>Room ID: " + room.getId() + ", Room Number: " + room.getRoomNumber() + "</li>");
                }
                out.println("</ul>");
            } else {
                out.println("<p>No rooms available.</p>");
            }
        %>
        <% } else { %>
        <p>Please <a href="Login.jsp">login</a> to book a room.</p>
        <% } %>
        <% } else { %>
        <p>Please <a href="Login.jsp">login</a> to book a room.</p>
        <% } %>
    </body>
</html>
