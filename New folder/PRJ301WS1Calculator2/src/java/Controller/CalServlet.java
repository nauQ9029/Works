/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package Controller;

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
public class CalServlet extends HttpServlet {

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
            out.println("<title>Servlet CalServlet</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet CalServlet at " + request.getContextPath() + "</h1>");
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
//        processRequest(request, response);
        int num1 = Integer.parseInt(request.getParameter("num1"));
        int num2 = Integer.parseInt(request.getParameter("num2"));
        String operator = request.getParameter("operator");
        int result = 0;
        String mess = null;
        switch (operator) {
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "*":
                result = num1 * num2;
                break;
            case "/":
                if (num2 == 0) {
                    mess = "Cannot divide by zero!";
                } else {
                    result = num1 / num2;
                }
                break;
        }
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("<html><body>");
        out.println("<h1>Calculator</h1>");
        out.println("<form><table>");
        out.println("<tr>"
                        + "<td>First:</td>"
                        + "<td><input type=\"text\" value=\"" + num1 + "\" > </td>"
                  + "</tr>");
        out.println("<tr>"
                        + "<td>Second:</td>"
                        + "<td><input type=\"text\" value=\"" + num2 + "\" > </td>"
                  + "</tr>");
        out.println("<tr>"
                        + "<td>Operator:</td>"
                        + "<td>"
                            + "<select name=\"operator\">\n" +
        "                            <option value=\"+\">+</option>\n" +
        "                            <option value=\"-\">-</option>\n" +
        "                            <option value=\"*\">*</option>\n" +
        "                            <option value=\"/\">/</option>\n" +
"                              </select>"
                        + "</td>"
                  + "</tr>");
        if (mess != null) {
            out.println("<tr>" +
                    "<td>Result: </td>" +
                    "<td><input type=\"text\" value=\""+ mess +"\" > </td>"
                  + "</tr>");
        }
        else{
            out.println("<tr>" +
                        "<td>Result: </td>" +
                        "<td><input type=\"text\" value=\""+ result +"\" > </td>"
                      + "</tr>");
        }
        out.println("</form></table>");
        out.println("</body></html>");
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
        processRequest(request, response);
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
