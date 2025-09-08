<%-- 
    Document   : login.jsp
    Created on : Jan 11, 2023, 12:51:46 PM
    Author     : DELL
--%>

<%@page contentType="text/html" import="Model.*,java.util.*" pageEncoding="UTF-8"%>


<div class="login-page">
  <div class="form">
    <form class="register-form">
      <input type="text" placeholder="name"/>
      <input type="password" placeholder="password"/>
      <input type="text" placeholder="email address"/>
      <button>Create</button>
      <p class="message">Already registered? <a href="#">Sign In</a></p>
    </form>
      <form class="login-form" action ="login" method="GET">
        <input type="text" placeholder="username" name="user"/>
        <input type="password" placeholder="password" name="pass"/>
      <button>Login</button>
      <p class="message">Not registered? <a href="#">Create an account</a></p>
    </form>
  </div>
</div>
