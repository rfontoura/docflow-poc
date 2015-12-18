package br.com.dataeasy.visualizador.config;

import java.io.Serializable;
import java.util.Map;

/**
 * <b>Description:</b> Bean com informações a serem disponibilizadas no Javascript como um conjunto de configurações a serem passadas para o plugin
 * GroupDocsAnnotation do jQuery.<br>
 * <b>Project:</b> chronus-web <br>
 * <b>Company:</b> DataEasy Consultoria e Informática LTDA. <br>
 *
 * Copyright (c) 2015 DataEasy - Todos os direitos reservados.
 *
 * @author rafael.fontoura
 * @version Revision: $ Date: 10/11/2015
 */
@SuppressWarnings("serial")
public class InformacoesGroupDocs implements Serializable {
    private Map<String, String> localizedStrings;
    private String              thumbsImageBase64Encoded;

    public InformacoesGroupDocs() {
        super();
    }

    public Map<String, String> getLocalizedStrings() {
        return localizedStrings;
    }

    public void setLocalizedStrings(Map<String, String> localizedStrings) {
        this.localizedStrings = localizedStrings;
    }

    public String getThumbsImageBase64Encoded() {
        return thumbsImageBase64Encoded;
    }

    public void setThumbsImageBase64Encoded(String thumbsImageBase64Encoded) {
        this.thumbsImageBase64Encoded = thumbsImageBase64Encoded;
    }
}
