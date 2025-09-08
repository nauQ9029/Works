package Controller;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

public class AuthServlet extends HttpServlet {

    private final Map<String, String> users = new HashMap<>();
    
    @Override
    public void init() throws ServletException {
        // Add users
        users.put("kleqing", "28122004");
        users.put("admin", "admin");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Handle logout
        handleLogout(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Handle login
        handleLogin(request, response);
    }

    private void handleLogin(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String user = request.getParameter("user");
        String pwd = request.getParameter("pwd");

        // Check if user exists and password matches
        if (users.containsKey(user) && users.get(user).equals(pwd)) {
            HttpSession session = request.getSession();
            session.setAttribute("user", user);
            // Set session timeout to 30 minutes
            session.setMaxInactiveInterval(30 * 60);
            // Add cookie
            Cookie userName = new Cookie("user", user);
            userName.setMaxAge(30 * 60);
            response.addCookie(userName);

            // Redirect user to appropriate page with URL rewriting
            String targetURL;
            if ("admin".equals(user)) {
                targetURL = "Login.jsp"; // Admin page
            } else {
                targetURL = "Login.jsp"; // User page or other
            }

            String encodedURL = response.encodeRedirectURL(targetURL);
            response.sendRedirect(encodedURL);

        } else {
            // Authentication failed, show error message
            RequestDispatcher rd = getServletContext().getRequestDispatcher("index.jsp");
            PrintWriter out = response.getWriter();
            out.println("<font color=red>User name or password is wrong.</font>");
            rd.include(request, response);
        }
    }

    private void handleLogout(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html");
        Cookie loginCookie = null;
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("user")) {
                    loginCookie = cookie;
                    break;
                }
            }
        }
        if (loginCookie != null) {
            loginCookie.setMaxAge(0);
            response.addCookie(loginCookie);
        }
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        String encodedURL = response.encodeRedirectURL("index.jsp");
        response.sendRedirect(encodedURL);
    }

    @Override
    public String getServletInfo() {
        return "Handles login and logout functionalities";
    }
}
