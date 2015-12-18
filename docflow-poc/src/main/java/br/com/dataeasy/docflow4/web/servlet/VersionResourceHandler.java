package br.com.dataeasy.docflow4.web.servlet;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.faces.application.Resource;
import javax.faces.application.ResourceHandler;
import javax.faces.application.ResourceHandlerWrapper;
import javax.faces.application.ResourceWrapper;

public class VersionResourceHandler extends ResourceHandlerWrapper {

    private ResourceHandler wrapped;

    public VersionResourceHandler(ResourceHandler wrapped) {
        this.wrapped = wrapped;
    }

    @Override
    public Resource createResource(String resourceName) {
        return createResource(resourceName, null, null);
    }

    @Override
    public Resource createResource(String resourceName, String libraryName) {
        return createResource(resourceName, libraryName, null);
    }

    @Override
    public Resource createResource(String resourceName, String libraryName, String contentType) {
        final Resource resource = super.createResource(resourceName, libraryName, contentType);

        if (resource == null) {
            return null;
        }

        return new ResourceWrapper() {

            @Override
            public String getRequestPath() {
                String requestPath = super.getRequestPath();

                boolean isRecursoDoVisualizador = requestPath.contains("/visualizador/groupdocs/");
                if (requestPath.contains("PackedCompressed") || isRecursoDoVisualizador) {
                    String requestResultante = requestPath;
                    if (isRecursoDoVisualizador) {
                        requestResultante = tratarRequestPathGroupDocs(requestPath);
                    }

                    return requestResultante;
                } else {
//                    String versao = DocflowBusinessFactory.getInstance().getVersaoSistema().getBuildName();
                    String versao = "1_0_0";
                    return requestPath + "&v=" + versao;
                }
            }

            /**
             * Ajusta requisições de arquivos JS do GroupDocs, pois internamente eles chamam imagens e fontes e estas chamadas fariam chamadas a
             * recurso JSF, incorrendo em erro nestas requisições.
             *
             * @param requestPath o requestPath original. Ex.:
             *            '/docflow/javax.faces.resource/js/visualizador/groupdocs/GroupdocsViewer.all.min.js.jsf?ln=docflow'
             * @return o requestPath modificado. Ex.: '/docflow/resources/docflow/js/visualizador/groupdocs/GroupdocsViewer.all.min.js'
             */
            private String tratarRequestPathGroupDocs(String requestPath) {
                String regex = "(.+?)javax.faces.resource(.+?).jsf\\?ln=(.+)";
                Matcher matcher = Pattern.compile(regex).matcher(requestPath);
                String requestPathResultante = requestPath;
                if (matcher.find()) {
                    requestPathResultante = matcher.group(1) + "resources/" + matcher.group(3) + matcher.group(2);
                }
                return requestPathResultante;
            }

            @Override
            // Necessary because this is missing in ResourceWrapper (will be fixed in JSF 2.2).
            public String getResourceName() {
                return resource.getResourceName();
            }

            @Override
            // Necessary because this is missing in ResourceWrapper (will be fixed in JSF 2.2).
            public String getLibraryName() {
                return resource.getLibraryName();
            }

            @Override
            // Necessary because this is missing in ResourceWrapper (will be fixed in JSF 2.2).
            public String getContentType() {
                return resource.getContentType();
            }

            @Override
            public Resource getWrapped() {
                return resource;
            }
        };
    }

    @Override
    public ResourceHandler getWrapped() {
        return wrapped;
    }

}
