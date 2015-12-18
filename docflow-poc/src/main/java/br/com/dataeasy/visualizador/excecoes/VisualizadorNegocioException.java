package br.com.dataeasy.visualizador.excecoes;


/**
 * <b>Description:</b>Exceção de negócio relacionada a problemas do Visualizador de Documentos.<br>
 * <b>Project:</b> docflow4-web <br>
 * <b>Company:</b> DataEasy Consultoria e Informática LTDA. <br>
 *
 * Copyright (c) 2015 DataEasy - Todos os direitos reservados.
 *
 * @author rafael.fontoura
 * @version Revision: $ Date: 17/08/2015
 */
@SuppressWarnings("serial")
public class VisualizadorNegocioException extends RuntimeException {

    public VisualizadorNegocioException(String mensagem, Throwable causa) {
        super(mensagem, causa);
    }

    public VisualizadorNegocioException(String message) {
        super(message);
    }
}
