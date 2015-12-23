package br.com.dataeasy.visualizador.servlets;

import java.io.IOException;
import java.io.InputStream;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import br.com.dataeasy.visualizador.excecoes.VisualizadorInfraException;

import com.groupdocs.annotation.exception.AnnotationException;

/**
 * <b>Description:</b>Servlet que fornece arquivos CSS para o GroupDocs.<br>
 * <b>Project:</b> docflow4-web <br>
 * <b>Company:</b> DataEasy Consultoria e Informática LTDA. <br>
 *
 *    Copyright (c) 2015 DataEasy - Todos os direitos reservados.
 *
 * @author rafael.fontoura
 * @version Revision: $ Date: 14/10/2015
 */
@WebServlet(name = "GetCssServlet", urlPatterns = { "/GetCssHandler" })
public class GetCssServlet extends AnnotationServlet {
    private static final long serialVersionUID = 1L;

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Content-type", "text/css");

        try {
            writeOutput((InputStream) annotationHandler.getCssHandler(request.getParameter("script"), request, response), response);
        } catch (AnnotationException e) {
            throw new VisualizadorInfraException("Problema ao carregar CSS.", e);
        }
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        throw new UnsupportedOperationException();
    }
}
