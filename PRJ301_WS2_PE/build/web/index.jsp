<%-- 
    Document   : index
    Created on : May 30, 2024, 1:08:08 PM
    Author     : plmin
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <h2>All Components</h2>
        <table border="1">
            <tr>
                <th>Id</th>
                <th>Product</th>
                <th>Brand</th>
            </tr>
            <%
                List<Component> components = (List<Component>) request.getAttribute("components");
                if (posts != null && !components.isEmpty()) {
                    for (Component component : components) {
            %>
            <tr>
                <td><%= component.getId() %></td>
                <td><%= component.getProduct() %></td>
                <td><%= component.getBrand() %></td>
            </tr>
            <%
                }
            %>
        </table>
        <%
            } else {
        %>
        <p>No component found.</p>
        <%
            }
        %>
    </body>
</html>
