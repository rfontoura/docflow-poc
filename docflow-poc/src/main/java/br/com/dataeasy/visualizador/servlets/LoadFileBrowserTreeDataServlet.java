package br.com.dataeasy.visualizador.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import br.com.dataeasy.visualizador.excecoes.VisualizadorInfraException;
import br.com.dataeasy.visualizador.media.MediaType;

import com.groupdocs.annotation.exception.AnnotationException;

/**
 * <b>Description:</b>Servlet para carregamento da árvore de arquivos disponíveis para abrir no GroupDocs.<br>
 * <b>Project:</b> docflow4-web <br>
 * <b>Company:</b> DataEasy Consultoria e Informática LTDA. <br>
 *
 *    Copyright (c) 2015 DataEasy - Todos os direitos reservados.
 *
 * @author rafael.fontoura
 * @version Revision: $ Date: 14/10/2015
 */
@WebServlet(name = "LoadFileBrowserTreeDataServlet", urlPatterns = { "/document-viewer/LoadFileBrowserTreeDataHandler" })
public class LoadFileBrowserTreeDataServlet extends AnnotationServlet {

    private static final long serialVersionUID = 1L;

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        throw new UnsupportedOperationException();
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        try {
            writeOutput(MediaType.APPLICATION_JSON, response, annotationHandler.loadFileBrowserTreeDataHandler(request, response));
        } catch (AnnotationException e) {
            throw new VisualizadorInfraException("Problema ao carregar navegador de arquivos.", e);
        }
    }
}
