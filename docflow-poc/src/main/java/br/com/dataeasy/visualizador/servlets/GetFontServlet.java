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
 * <b>Description:</b>Servlet que fornece fontes para o GroupDocs.<br>
 * <b>Project:</b> docflow4-web <br>
 * <b>Company:</b> DataEasy Consultoria e Informática LTDA. <br>
 *
 *    Copyright (c) 2015 DataEasy - Todos os direitos reservados.
 *
 * @author rafael.fontoura
 * @version Revision: $ Date: 14/10/2015
 */
@WebServlet(name = "GetFontServlet", urlPatterns = { "/fonts/*" })
public class GetFontServlet extends AnnotationServlet {

    private static final long serialVersionUID = 1L;

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Content-type", "application/x-font-woff");

        String[] split = request.getRequestURI().split("/");
        if (split.length > 0) {
            try {
                writeOutput((InputStream) annotationHandler.getFontHandler(split[split.length - 1], request, response), response);
            } catch (AnnotationException e) {
                throw new VisualizadorInfraException("Problema ao carregar fonte.", e);
            }
        }
    }
}
