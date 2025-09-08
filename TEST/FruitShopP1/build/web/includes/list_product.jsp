<%-- 
    Document   : list_product
    Created on : Dec 13, 2023, 8:48:11 AM
    Author     : Dell
--%>

<%@page contentType="text/html" import="Model.*,java.util.*" pageEncoding="UTF-8"%>

    <!-- Product Listings Section -->
    <div class="container">
        <% 
            ArrayList<Fruit> allFruits = FruitDB.listAll();
            int row = allFruits.size(); 
            for (Fruit o : allFruits)
                {
                    out.write("<div class='row'>");
                        out.write("<div class='col-md-4' align='center'>");
                            out.write("<div class='card'>");
                              out.write(" <div class='card-body'> <h5 class='card-title'> " + o.getProductName() + "</h5> <p class='card-text'>" + o.getDescription() +"</p> <p class='card-text'>Price: $" + o.getPrice() + "/kg</p> <a href='#' class='btn btn-primary'>Add to Cart</a></div>") ; 
                            out.write("</div>");
                        out.write("</div>");
                    out.write("</div");
                }
        %>
 
    </div>