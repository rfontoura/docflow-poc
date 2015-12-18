package br.com.dataeasy.visualizador.servlets;

import static com.groupdocs.annotation.common.Utils.toJson;

import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import br.com.dataeasy.visualizador.media.MediaType;

import com.groupdocs.annotation.domain.response.StatusResult;
import com.groupdocs.annotation.exception.AnnotationException;

/**
 * @author Aleksey Permyakov
 */
@WebServlet(name = "GetPdfVersionOfDocumentServlet", urlPatterns = { "/document-annotation/GetPdfVersionOfDocumentHandler" })
public class GetPdfVersionOfDocumentServlet extends AnnotationServlet {
    
    private static final long serialVersionUID = 1L;
    
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        throw new UnsupportedOperationException();
    }
    
    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            response.setHeader("Content-type", "application/json;charset=UTF-8");
            
            response.getOutputStream().write(annotationHandler.getPdfVersionOfDocumentHandler(request, response).toString().getBytes());
        } catch (AnnotationException e) {
            Logger.getLogger(this.getClass().getName()).log(Level.SEVERE, MESSAGE_HANDLER_THROWS, e.getMessage());
            writeOutput(MediaType.APPLICATION_JSON, response, toJson(new StatusResult(false, e.getMessage())));
        }
    }
}
