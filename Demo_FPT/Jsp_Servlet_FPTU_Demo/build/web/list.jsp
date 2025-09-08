<%@page contentType="text/html" import="Model.*,java.util.*" pageEncoding="utf-8" %>
<% response.setCharacterEncoding("UTF-8"); %>
<%@ include file="/includes/header.jsp" %>
<jsp:useBean id="list" class="java.util.ArrayList" scope="request"/>
<jsp:useBean id="student" class="Model.Student" scope="session"/>
<!-- start the middle column -->
    <section>
        <h1>Student List</h1>
    <Table border="1">
        <TR><TH>ID</th><TH>Name</th><TH>Gender</th><TH>DOB</th><TH>Update</th><TH>Delete</th></TR>

        <% 
            
            for(Object o:list){
                //student=(Model.Student)o;
                request.setAttribute("student",(Model.Student)o);
            %>            
                <tr>
                    <td><jsp:getProperty property="id" name="student" /></td>
                    <td><jsp:getProperty property="name" name="student" /></td>
                    <td><jsp:getProperty property="gender" name="student" /></td>
                    <td><jsp:getProperty property="dob" name="student" /></td>
                    <td><a href='update?id=<jsp:getProperty property="id" name="student" />'>Update</a></td>
                    <td><a href='delete?id=<jsp:getProperty property="id" name="student" />'>Delete</a></td>
                </tr> 
            <%
            }
            %>
    </table><HR>
    <A href="create">Add more..</a>
    </section>

</div>
</div>
<!-- end the middle column -->

<%@ include file="/includes/column_left_home.jsp" %>
<%@ include file="/includes/footer.jsp" %>
