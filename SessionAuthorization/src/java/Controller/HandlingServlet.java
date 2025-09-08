package Controller;

import DAO.StudentDAO;
import DAO.UserDAO;
import Model.Student;
import Model.User;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.List;

public class HandlingServlet extends BaseServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String action = request.getParameter("action");
        if (action == null) {
            action = "";
        }

        switch (action) {
            case "login":
                handleLogin(request, response);
                break;
            case "list":
                handleList(request, response);
                break;
            case "edit":
                handleEdit(request, response);
                break;
            case "delete":
                handleDelete(request, response);
                break;
            case "add":
                handleAdd(request, response);
                break;
            default:
                response.sendRedirect("Login.jsp");
                break;
        }
    }

    private void handleLogin(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        if ("POST".equalsIgnoreCase(request.getMethod())) {
            String username = request.getParameter("username");
            String password = request.getParameter("password");

            UserDAO uDAO = new UserDAO();
            User u = uDAO.getUser(username, password);
            if (u != null) {
                HttpSession session = request.getSession();
                session.setAttribute("user", u);
                response.sendRedirect("HandlingServlet?action=list");
            } else {
                String mess = "Incorrect username or password";
                request.setAttribute("mess", mess);
                request.getRequestDispatcher("Login.jsp").forward(request, response);
            }
        } else {
            request.getRequestDispatcher("Login.jsp").forward(request, response);
        }
    }

    private void handleList(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        if (!isAdmin(request) && !isUser(request)) {
            response.sendRedirect("HandlingServlet?action=login");
            return;
        }

        StudentDAO sDAO = new StudentDAO();
        List<Student> students = sDAO.getAll();

        // Add this attribute for JSTL conditional check
        request.setAttribute("isAdmin", isAdmin(request));

        // Filter student details based on user role
        students.forEach(student -> {
            if (!isAdmin(request)) {
                student.setUsername("*****"); // Replace with appropriate masking
                student.setPassword("*****"); // Replace with appropriate masking
            }
        });

        request.setAttribute("students", students);
        RequestDispatcher dispatcher = request.getRequestDispatcher("List.jsp");
        dispatcher.forward(request, response);
    }

    private void handleEdit(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        if (!isAdmin(request)) {
            response.sendRedirect("HandlingServlet?action=login");
            return;
        }

        if ("POST".equalsIgnoreCase(request.getMethod())) {
            try {
                int id = Integer.parseInt(request.getParameter("id"));
                String name = request.getParameter("name");
                String gender = request.getParameter("gender");
                String dob = request.getParameter("dob");
                String username = request.getParameter("username");
                String password = request.getParameter("password");

                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                Student student = new Student(id, name, gender, sdf.parse(dob), username, password);

                StudentDAO studentDAO = new StudentDAO();
                studentDAO.updateStudent(student);

                response.sendRedirect("HandlingServlet?action=list");
            } catch (Exception e) {
                e.printStackTrace();
                response.sendRedirect("error.jsp");
            }
        } else {
            try {
                int id = Integer.parseInt(request.getParameter("id"));
                StudentDAO studentDAO = new StudentDAO();
                Student student = studentDAO.getStudentById(id);
                if (student != null) {
                    request.setAttribute("student", student);
                    request.getRequestDispatcher("Edit.jsp").forward(request, response);
                } else {
                    response.sendRedirect("error.jsp");
                }
            } catch (Exception e) {
                e.printStackTrace();
                response.sendRedirect("error.jsp");
            }
        }
    }

    private void handleDelete(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        if (!isAdmin(request)) {
            response.sendRedirect("HandlingServlet?action=login");
            return;
        }

        try {
            int id = Integer.parseInt(request.getParameter("id"));

            StudentDAO studentDAO = new StudentDAO();
            studentDAO.deleteStudent(id);

            response.sendRedirect("HandlingServlet?action=list");
        } catch (Exception e) {
            e.printStackTrace();
            response.sendRedirect("error.jsp");
        }
    }

    private void handleAdd(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        if (!isAdmin(request)) {
            response.sendRedirect("HandlingServlet?action=login");
            return;
        }

        if ("POST".equalsIgnoreCase(request.getMethod())) {
            try {
                String name = request.getParameter("name");
                String gender = request.getParameter("gender");
                String dob = request.getParameter("dob");
                String username = request.getParameter("username");
                String password = request.getParameter("password");

                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                Student student = new Student(0, name, gender, sdf.parse(dob), username, password);

                StudentDAO studentDAO = new StudentDAO();
                studentDAO.addStudent(student);

                response.sendRedirect("HandlingServlet?action=list");
            } catch (Exception e) {
                e.printStackTrace();
                response.sendRedirect("error.jsp");
            }
        } else {
            request.getRequestDispatcher("Add.jsp").forward(request, response);
        }
    }

    private void showHomePage(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.sendRedirect("index.jsp");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    public String getServletInfo() {
        return "Handling Servlet";
    }
}
