package Controller;

import Model.Student;
import Model.StudentDB;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

public class StudentServlet extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String action = request.getParameter("action");
        if (action != null) {
            switch (action) {
                case "add":
                    addStudent(request, response);
                    break;
                case "delete":
                    deleteStudent(request, response);
                    break;
                case "list":
                      listStudents(request, response);
                      break;
                case "listback":
                    viewStudents(request, response);
                    break;
                case "back":
                    goToLogin(request, response);
                    break;
              
                   
            }
        } else {
            listStudents(request, response);
        }
    }

    private void addStudent(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String name = request.getParameter("name");
        String gender = request.getParameter("gender");
        String dob = request.getParameter("dob");

        if (name == null || gender == null || dob == null) {
            request.setAttribute("error", "All fields are required.");
            RequestDispatcher dispatcher = request.getRequestDispatcher("addStudent.jsp");
            dispatcher.forward(request, response);
            return;
        }

        Student student = new Student(name, gender, dob);
        int id = StudentDB.newStudent(student);
        student.setId(id);

        request.setAttribute("student", student);
        RequestDispatcher dispatcher = request.getRequestDispatcher("addSuccess.jsp");
        dispatcher.forward(request, response);
    }

    private void deleteStudent(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String idStr = request.getParameter("id");
        try {
            int id = Integer.parseInt(idStr);
            int result = StudentDB.delete(id);
            if (result > 0) {
                request.setAttribute("message", "Student deleted successfully.");
            } else {
                request.setAttribute("message", "Student deletion failed.");
            }
        } catch (NumberFormatException e) {
            request.setAttribute("message", "Invalid student ID.");
        }

        listStudents(request, response);
    }

    private void listStudents(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String userID = null;
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("user".equals(cookie.getName())) {
                    userID = cookie.getValue();
                    break;
                }
            }
        }

        if (userID == null && request.getSession() != null) {
            userID = (String) request.getSession().getAttribute("user");
        }

        request.setAttribute("userID", userID);

        List<Student> list = StudentDB.listAll();
        request.setAttribute("students", list);

        RequestDispatcher dispatcher = request.getRequestDispatcher("listAll.jsp");
        dispatcher.forward(request, response);
    }
    private void viewStudents(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        List<Student> students = StudentDB.listAll();
        request.setAttribute("students", students);
        RequestDispatcher dispatcher = request.getRequestDispatcher("/listAll.jsp");
        dispatcher.forward(request, response);
    }

    private void goToLogin(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        RequestDispatcher dispatcher = request.getRequestDispatcher("/Login.jsp");
        dispatcher.forward(request, response);
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
        return "Handles student actions: add, delete, list";
    }
}
