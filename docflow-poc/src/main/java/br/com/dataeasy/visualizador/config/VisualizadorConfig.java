package br.com.dataeasy.visualizador.config;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Locale;
import java.util.MissingResourceException;
import java.util.ResourceBundle;
import java.util.TimeZone;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import br.com.dataeasy.core.i18n.Messages;
import br.com.dataeasy.visualizador.excecoes.VisualizadorInfraException;
import br.com.dataeasy.visualizador.excecoes.VisualizadorNegocioException;
import br.com.dataeasy.visualizador.localization.LocalizacaoCustomizada;
import br.com.dataeasy.visualizador.localization.UTF8Control;

import com.groupdocs.annotation.data.connector.IConnector;
import com.groupdocs.annotation.exception.AnnotationException;
import com.groupdocs.annotation.handler.AnnotationHandler;
import com.groupdocs.annotation.localization.ILocalization;
import com.groupdocs.viewer.config.ServiceConfiguration;
import com.groupdocs.viewer.domain.path.EncodedPath;
import com.groupdocs.viewer.domain.path.GroupDocsPath;

/**
 * <b>Description:</b>Configurações centralizadas e inicializadas do Visualizador. Fornece acesso às configurações globais do componente.<br>
 * <b>Project:</b> docflow4-web <br>
 * <b>Company:</b> DataEasy Consultoria e Informática LTDA. <br>
 *
 * Copyright (c) 2015 DataEasy - Todos os direitos reservados.
 *
 * @author rafael.fontoura
 * @version Revision: $ Date: 16/06/2015
 */
// inicializa o bean na primeira requisição. Necessário para definir URL base da aplicação (acessa HttpServletRequest)
@Lazy
@Component
public class VisualizadorConfig {

    private static final Logger LOG = Logger.getLogger(VisualizadorConfig.class);

    @Autowired
    private ApplicationConfig   applicationConfig;

    @Autowired
    private HttpServletRequest  request;

    private AnnotationHandler   annotationHandler;
    protected ILocalization     localization;

    public AnnotationHandler getAnnotationHandler() {
        return annotationHandler;
    }

    public ApplicationConfig getApplicationConfig() {
        return applicationConfig;
    }

    @PostConstruct
    public void init() {
        try {
            this.annotationHandler = criarAnnotationHandler();
            applicationConfig.setWidgetId(Constantes.DIV_VISUALIZADOR);
            applicationConfig.setApplicationPath("http://localhost:8080/docflow");
        } catch (Exception e) {
            throw new VisualizadorInfraException("Problema ao inicializar infra do Visualizador.", e);
        }
    }

    /**
     * @return AnnotationHandler
     */
    private AnnotationHandler criarAnnotationHandler() {
        if (annotationHandler == null) {
            TimeZone.setDefault(Constantes.TIMEZONE_PADRAO);
            ServiceConfiguration serviceConfiguration = new ServiceConfiguration(applicationConfig);
            IConnector connector = null;
            try {
                // Necessário para formatação de Datas
                Locale.setDefault(new Locale("pt", "BR"));

                annotationHandler = new AnnotationHandler(serviceConfiguration, connector);
                this.localization = criarLocalizacao(annotationHandler.getLocalization());
            } catch (Exception e) {
                String msg = "Problema ao criar AnnotationHandler. O ApplicationConfig do GroupDocs foi carregado corretamente?";
                throw new VisualizadorInfraException(msg, e);
            }
        }
        return annotationHandler;
    }

    /**
     * Cria ILocalization a partir de configurações. Caso não tenha sido definida linguagem, é utilizado Inglês. ILocalization a localização com
     *
     * @param iLocalization a ILocalization padrão caso não tenha sido definida nas configurações.
     */
    private ILocalization criarLocalizacao(ILocalization iLocalizationPadrao) {
        ILocalization localization = iLocalizationPadrao;
        Locale locale = criarLocale();

        try {
            if (locale != null) {
                ResourceBundle resourceBundle = ResourceBundle.getBundle("groupdocs", locale, new UTF8Control());
                localization = new LocalizacaoCustomizada(resourceBundle);
            }
        } catch (MissingResourceException e) {
            LOG.error("Não foi encontrada localização \"" + locale + "\" para o GroupDocs. Impossível recuperar 'localization_" + locale
                    + ".properties'.");
        }
        return localization;
    }

    /**
     * Cria Locale a partir de configurações do GroupDocs.
     *
     * @return o Locale criado ou o padrão do sistema.
     */
    private Locale criarLocale() {
        Locale locale = new Locale("pt", "BR");
        String localization = applicationConfig.getLocalization();
        if (localization != null && localization.split("_").length == 2) {
            String[] partes = localization.split("_");
            locale = new Locale(partes[0], partes[1]);
        }

        return locale;
    }

    /**
     * Retorna as tags <script> e <link> para inicialização do GroupDocs.
     *
     * @param request o HttpServletRequest
     * @return String com tags <script> e <link>
     */
    public String getHeader(HttpServletRequest request) {
        try {
            return annotationHandler.getHeader(applicationConfig.getApplicationPath(), request);
        } catch (AnnotationException e) {
            throw new VisualizadorInfraException(e);
        }
    }

    /**
     * Retorna o script que faz chamada Javascript à inicialização e utilização do GroupDocs.
     *
     * @param caminhoArquivo o caminho completo do arquivo a ser aberto.
     * @return o script a ser renderizado na página.
     */
    public String getAnnotationScripts(String caminhoArquivo) {
        String userName = AnnotationHandler.ANONYMOUS_USERNAME;
        File arquivo;
        if (caminhoArquivo == null) {
            arquivo = new File(applicationConfig.getBasePath() + applicationConfig.getDefaultFileName());
        } else {
            arquivo = new File(caminhoArquivo);
        }
        GroupDocsPath path = new EncodedPath(arquivo.getAbsolutePath(), annotationHandler.getConfiguration());
        String initialPath = path.getPath();

        try {
            String userGuid = annotationHandler.getUserGuid(userName);
            return annotationHandler.getAnnotationScript(initialPath, userName, userGuid);
        } catch (AnnotationException e) {
            throw new VisualizadorInfraException(e);
        }
    }

    /**
     * Retorna InformacoesGroupDocs com informações do GroupDocs sobre localização.
     */
    public InformacoesGroupDocs getInformacoesGroupDocs() {
        InformacoesGroupDocs info = null;
        if (this.localization instanceof LocalizacaoCustomizada) {
            info = new InformacoesGroupDocs();
            LocalizacaoCustomizada localizacaoCustomizada = (LocalizacaoCustomizada) this.localization;
            info.setLocalizedStrings(localizacaoCustomizada.getValores());
            info.setThumbsImageBase64Encoded(localizacaoCustomizada.getLocalizedRightPanelImage());
        }
        return info;
    }

    /**
     * Retorna identificador do usuário no GroupDocs.
     *
     * @param nomeUsuario nome do usuário
     * @return o identificador de usuário utilizado pelo GroupDocs
     */
    public String getIdUsuario(String nomeUsuario) {
        try {
            return annotationHandler.getUserGuid(nomeUsuario);
        } catch (AnnotationException e) {
            throw new VisualizadorInfraException("Problema ao requisitar ID de usuário no GroupDocs.", e);
        }
    }

    /**
     * Retorna o ID de arquivo utilizado pelo GroupDocs para renderização no visualizador.
     *
     * @param caminhoArquivo caminho do arquivo original a ser visualizado
     * @param extensao a extensão do arquivo a utilizar
     * @return o identificador da imagem utilizado pelo GroupDocs
     */
    public String getIdArquivo(String caminhoArquivo, String extensao) {
        try {
            Path linkSimbolico = criarLinkSimbolico(caminhoArquivo, getExtensaoAUtilizar(caminhoArquivo, extensao));
            return new EncodedPath(linkSimbolico.toString(), annotationHandler.getConfiguration()).getPath();
        } catch (Exception e) {
            String msg = Messages.get("docflowViewerErroGeral", e.getClass().toString() + ": " + e.getMessage());
            throw new RuntimeException(msg, e);
        }
    }

    /**
     * Cria link simbólico que tenha extensão PDF ou outra reconhecível pelo GroupDocs.
     *
     * @param caminhoOriginal caminho original do arquivo
     * @return o link simbólico no sistema de arquivos com extensão PDF/TIF que aponta para o arquivo original.
     */
    private Path criarLinkSimbolico(String caminhoOriginal, String extensao) {
        Path target = Paths.get(caminhoOriginal.replace("\\", File.separator));
        String pathDiretorioTemp = System.getProperty("java.io.tmpdir");
        Path linkSimbolico = null;

        try {
            String nomeArquivo = FilenameUtils.getBaseName(caminhoOriginal);
            linkSimbolico = Paths.get(pathDiretorioTemp, nomeArquivo + "." + extensao);
            if (isLinkExistenteErrado(linkSimbolico, target)) {
                Files.delete(linkSimbolico);
            }

            if (Files.notExists(linkSimbolico, LinkOption.NOFOLLOW_LINKS)) {
                Files.createSymbolicLink(linkSimbolico, target);
            }
        } catch (IOException e) {
            throw new VisualizadorInfraException("Problema ao recuperar caminho do arquivo para visualização.", e);
        }
        return linkSimbolico;
    }

    /**
     * Recupera extensão a ser utilizada na geração do link simbólico.
     *
     * @param caminhoOriginal o caminho original do arquivo
     * @param extensao a extensão fornecida pelo usuário para criação do link simbólico
     * @throws VisualizadorNegocioException caso não se consiga definir uma extensão para criação do link simbólico
     */
    private String getExtensaoAUtilizar(String caminhoOriginal, String extensao) {
        String extensaoEncontrada = extensao;
        if (StringUtils.isEmpty(extensaoEncontrada)) {
            extensaoEncontrada = FilenameUtils.getExtension(caminhoOriginal);
            if (StringUtils.isEmpty(extensaoEncontrada)) {
                throw new RuntimeException(Messages.get("docflowViewerContentTypeInvalido"));
            }
        }

        return extensaoEncontrada;
    }

    /**
     * Verifica se existe link simbólico e se aponta para mesmo caminho do target.
     *
     * @param link o caminho do link simbólico
     * @param target o target considerado correto
     */
    private boolean isLinkExistenteErrado(Path link, Path target) {
        boolean resultado = false;
        if (Files.exists(link, LinkOption.NOFOLLOW_LINKS) && Files.isSymbolicLink(link)) {
            try {
                Path targetExistente = Files.readSymbolicLink(link);
                resultado = !target.equals(targetExistente);
            } catch (IOException e) {
                resultado = false;
            }
        }
        return resultado;
    }
}
