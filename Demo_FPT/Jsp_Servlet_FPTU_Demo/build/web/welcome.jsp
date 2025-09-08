<%@page contentType="text/html" import="Model.*,java.util.*" pageEncoding="utf-8" %>
<% response.setCharacterEncoding("UTF-8"); %>
<%@ include file="/includes/header.jsp" %>
<jsp:useBean id="student" class="Model.Student" scope="session"/>
<!-- start the middle column -->

                <section>
                <%                  
                    
                    out.write("<h1>Welcome "+student.getName()+" to FPT University</h1>");
                %>             
                   
               
                </section>

            </div>
</div>
<!-- end the middle column -->

<%@ include file="/includes/column_left_home.jsp" %>
<%@ include file="/includes/footer.jsp" %>

