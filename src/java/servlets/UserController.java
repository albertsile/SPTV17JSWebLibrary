/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import entity.Book;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.io.Writer;
import java.util.Calendar;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.json.JsonReader;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import session.BookFacade;
import util.EncryptPass;

/**
 *
 * @author Aillak
 */
@WebServlet(name = "UserController", urlPatterns = {
    "/createBook",

})
public class UserController extends HttpServlet {
@EJB private BookFacade bookFacade;

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
        request.setCharacterEncoding("UTF-8");
        String json = "";
        JsonObjectBuilder job = Json.createObjectBuilder();
        //EncryptPass ep = new EncryptPass();
        String path = request.getServletPath();
        switch (path){
            case "/createBook":
                JsonReader jsonReader = Json.createReader(request.getReader());
                JsonObject jsonObject = jsonReader.readObject();
                String name = jsonObject.getString("name");
                String author = jsonObject.getString("author");
                String publishedYear = jsonObject.getString("publishedYear");
                String quantity = jsonObject.getString("quantity");
                String price = jsonObject.getString("price");
                if(null == name || "".equals(name)
                        || null == author || "".equals(author)
                        || null == publishedYear || "".equals(publishedYear)
                        || null == quantity || "".equals(quantity)
                        || null == price || "".equals(price)){
                    job.add("actionStatus", "false")
                            .add("user", "null")
                            .add("authStatus", "false")
                            .add("data", "null");
                    try (Writer writer = new StringWriter()){
                        Json.createWriter(writer).write(job.build());
                        json = writer.toString();
                    }
                    break;
                }
                Book book = new Book(
                        name,
                        author,
                        publishedYear,
                        Integer.parseInt(quantity),
                        Integer.parseInt(price),
                        Calendar.getInstance().getTime(),
                        true
                );
                bookFacade.create(book);
                
                job.add("actionStatus", "true")
                            .add("user", "null")
                            .add("authStatus", "true")
                            .add("data", "null");
                try (Writer writer = new StringWriter()){
                    Json.createWriter(writer).write(job.build());
                    json = writer.toString();
                }
                break;
        }
        if(json != null && !"".equals(json)){
            try (PrintWriter out = response.getWriter()) {
                out.println(json);
            }
        }
        /*
        try (PrintWriter out = response.getWriter()) {
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet UserController</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet UserController at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
        */
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
        processRequest(request, response);
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
