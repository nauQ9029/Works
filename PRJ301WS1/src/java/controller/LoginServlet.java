/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 *
 * @author plmin
 */
public class LoginServlet extends HttpServlet {

    private String validUsername;
    private String validPassword;

    @Override
    public void init() throws ServletException {
        validUsername = getServletConfig().getInitParameter("validUsername");
        validPassword = getServletConfig().getInitParameter("validPassword");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String name = request.getParameter("user");
        String pass = request.getParameter("pass");

        if (name.equals(validUsername) && pass.equals(validPassword)) {
            request.getRequestDispatcher("WelcomeServlet").forward(request, response);
        } else {
            response.sendRedirect("login.html");
        }
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }
}
