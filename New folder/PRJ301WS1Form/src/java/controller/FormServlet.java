/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package controller;

import jakarta.servlet.RequestDispatcher;
import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 *
 * @author plmin
 */
public class FormServlet extends HttpServlet {

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
        //processRequest(request, response);
        String name = request.getParameter("user");
        String pass = request.getParameter("pass");

        if (name.equals(validUsername) && pass.equals(validPassword)) {
            request.getRequestDispatcher("WelcomeServlet").forward(request, response);
        } else {
            response.sendRedirect("index.html");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        String n = request.getParameter("userName");
        String p = request.getParameter("userPass");

        if (p.equals("servlet")) {
            RequestDispatcher rd = request.getRequestDispatcher("servlet2");
            rd.forward(request, response);
        } else {
            out.print("Sorry UserName or Password Error!");
            RequestDispatcher rd = request.getRequestDispatcher("/index.html");
            rd.include(request, response);
        }
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }
}
