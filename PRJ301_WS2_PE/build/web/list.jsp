<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>All Components</title>
    </head>
    <body>
        <h2>All Components</h2>
        <table border="1">
            <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Brand</th>
            </tr>
            <%
                List<Component> components = (List<Component>) request.getAttribute("components");
                if (components != null && !components.isEmpty()) {
                    for (Component component : components) {
            %>
            <tr>
                <td><%= component.getId() %></td>
                <td><%= component.getProduct() %></td>
                <td><%= component.getBrand() %></td>
            </tr>
            <%
                    }
                } else {
            %>
            <tr>
                <td colspan="3">No components found.</td>
            </tr>
            <%
                }
            %>
        </table>
    </body>
</html>
