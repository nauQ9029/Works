/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package controller;

import dao.BookingDAO;
import dao.ServiceItemDAO;
import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import model.BookingDetails;
import model.CartItem;
import model.ServiceItem;
import model.User;

/**
 *
 * @author plmin
 */
public class ServicesCartServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet ServicesCartServlet</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet ServicesCartServlet at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        int itemId = Integer.parseInt(request.getParameter("itemId"));
        int quantity = Integer.parseInt(request.getParameter("quantity"));
        String rentalDate = request.getParameter("rentalDate");
        String rentalTime = request.getParameter("rentalTime");

        HttpSession session = request.getSession();
        User user = (User) session.getAttribute("userA");

        // Get service item details
        ServiceItem item = ServiceItemDAO.getItemById(itemId);

        // Validate bike rental requirements
        if (item.getServiceID() == 3) { // Bike rental
            BookingDAO bookingDAO = new BookingDAO();
            List<BookingDetails> activeBookings = bookingDAO.getActiveBookings(user.getIDAccount());

            // 1. Check if user has active booking
            if (activeBookings.isEmpty()) {
                session.setAttribute("error", "Bike rental requires an active hotel booking");
                response.sendRedirect("services_itemDetails.jsp?itemId=" + itemId);
                return;
            }

            // 2. Validate quantity doesn't exceed total adults
            int totalAdults = activeBookings.stream().mapToInt(BookingDetails::getAdult).sum();
            if (quantity > totalAdults) {
                session.setAttribute("error", "You can rent maximum " + totalAdults + " bikes (based on number of adults in your booking)");
                session.setAttribute("activeBookings", activeBookings);
                response.sendRedirect("services_itemDetails.jsp?itemId=" + itemId);
                return;
            }

            // 3. Validate rental date is within booking period
            try {
                LocalDate parsedDate = LocalDate.parse(rentalDate);
                boolean dateValid = activeBookings.stream()
                        .anyMatch(booking -> {
                            LocalDate checkIn = LocalDate.parse(booking.getCheckIn());
                            LocalDate checkOut = LocalDate.parse(booking.getCheckOut());
                            return !parsedDate.isBefore(checkIn) && !parsedDate.isAfter(checkOut);
                        });

                if (!dateValid) {
                    session.setAttribute("error", "Rental date must be within your stay period");
                    response.sendRedirect("services_itemDetails.jsp?itemId=" + itemId);
                    return;
                }
            } catch (DateTimeParseException e) {
                session.setAttribute("error", "Invalid date format");
                response.sendRedirect("services_itemDetails.jsp?itemId=" + itemId);
                return;
            }
        }

        // Process cart addition
        List<CartItem> cartItems = (List<CartItem>) session.getAttribute("cartItems");
        if (cartItems == null) {
            cartItems = new ArrayList<>();
        }

        boolean found = false;

        // Check if item is bike rental
        if (item.getServiceID() == 3) {
            // For bike rentals, replace existing item if exists
            cartItems.removeIf(ci -> ci.getItem().getItemID() == itemId);
            cartItems.add(new CartItem(item, quantity, rentalDate, rentalTime));
        } else {
            // For food/drinks, update quantity if exists
            for (CartItem c : cartItems) {
                if (c.getItem().getItemID() == itemId) {
                    // Create new CartItem with updated quantity
                    cartItems.remove(c);
                    cartItems.add(new CartItem(item, c.getQuantity() + quantity));
                    found = true;
                    break;
                }
            }

            if (!found) {
                cartItems.add(new CartItem(item, quantity));
            }
        }

        session.setAttribute("cartItems", cartItems);
        response.sendRedirect("services_cart.jsp");
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
