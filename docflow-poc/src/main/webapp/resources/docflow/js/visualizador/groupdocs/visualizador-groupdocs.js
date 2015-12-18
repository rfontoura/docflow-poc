$(function() {
    var name = 'docs/756004-dzone-rc-141-nodejs.pdf';
    $.get(getContextPath() + '/GetFilePathHandler', {
        nomeArquivo : name
    }, function(infoString) {
        var info = JSON.parse(infoString);
        Visualizador.abrir(info);
    }).fail(function(e) {
        alert('Erro: ' + e);
    });
});

/**
 * Exibe mensagem de erro.
 * 
 * @param msg
 *            mensagem de erro.
 */
function exibirMessagemErro(msg) {
    alert("Erro: " + msg);
}

/**
 * Remoção de botões que não estarão disponíveis para usuário.
 */
function removerBotoes() {
    $('.import_file_uploader').remove();
    $('a[id="btnExport"]').parent().remove();
    $('a[id="btnExportWithoutComments"]').parent().remove();
}

/**
 * Importação dinâmica de JS ou CSS como em http://www.javascriptkit.com/javatutors/loadjavascriptcss.shtml.
 * 
 * @param nome
 *            nome do arquivo
 * @param tipo
 *            css ou js
 */
function carregarJsOuCss(nome, tipo) {
    if (tipo == "js") { // Javascript
        var fileref = document.createElement('script')
        fileref.setAttribute("type", "text/javascript")
        fileref.setAttribute("src", nome)
    } else if (tipo == "css") { // CSS
        var fileref = document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", nome)
    }

    if (typeof fileref != "undefined") {
        document.getElementsByTagName("head")[0].appendChild(fileref)
    }
}

/**
 * Abre widget do visualizador GroupDocs com componente de Annotations. Atualmente só exibe documentos, sem permitir trabalhar com anotações.
 * 
 * @param info
 *            informações sobre usuário e documento a visualizar.
 */
function visualizarDocumentoAnotacaoComId(info) {
    var annotationWidget = $('#' + Visualizador.ID_CONTAINER_VISUALIZADOR).groupdocsAnnotation({
        localizedStrings : info.localizedStrings,
        thumbsImageBase64Encoded : info.thumbsImageBase64Encoded || undefined,
        width : 0,
        height : 0,
        fileId : info.fileId,
        docViewerId : 'annotation-widget-doc-viewer',
        quality : 100,
        enableRightClickMenu : false,
        showHeader : true,
        showZoom : true,
        showPaging : true,
        showPrint : false,
        showFileExplorer : false,
        showThumbnails : true,
        showToolbar : false,
        openThumbnails : true,
        zoomToFitWidth : true,
        zoomToFitHeight : true,
        initialZoom : 100,
        preloadPagesCount : 0,
        enableSidePanel : false,
        scrollOnFocus : true,
        strikeOutColor : '#00000c',
        highlightColor : '#000017',
        underlineColor : '#FF0000',
        textFieldBackgroundColor : '#990000',
        enabledTools : 8191,
        connectorPosition : 0,
        saveReplyOnFocusLoss : false,
        clickableAnnotations : true,
        disconnectUncommented : false,
        enableStandardErrorHandling : true,
        strikeoutMode : 1,
        undoEnabled : true,
        anyToolSelection : true,
        tabNavigationEnabled : false,
        minimumImageWidth : 150,
        areaToolOptions : {
            pen : {
                width : 1,
                color : -65536,
                dashStyle : 0
            },
            brush : {
                color : -16711936
            }
        },
        polylineToolOptions : {
            pen : {
                width : 1,
                color : -65536,
                dashStyle : 0
            },
            brush : {
                color : -16711936
            }
        },
        arrowToolOptions : {
            pen : {
                width : 1,
                color : -65536,
                dashStyle : 0
            },
            brush : {
                color : -16711936
            }
        },
        distanceToolOptions : {
            pen : {
                color : -16776961
            }
        },
        sideboarContainerSelector : 'div.comments_sidebar_wrapper',
        usePageNumberInUrlHash : false,
        textSelectionSynchronousCalculation : true,
        variableHeightPageSupport : true,
        useJavaScriptDocumentDescription : true,
        isRightPanelEnabled : false,
        createMarkup : true,
        use_pdf : 'true',
        _mode : 'annotatedDocument',
        selectionContainerSelector : "[name='selection-content']",
        graphicsContainerSelector : '.annotationsContainer',
        userName : info.userName,
        userId : info.userId
    }).error(function(erro) {
        // TODO: tratar amigavelmente
        alert("erro annotation: " + erro);
    }).ready(function() {
        removerBotoes();
        atualizarLayout();

        var varTimeout;
        window.onresize = function() {
            clearTimeout(varTimeout);
            varTimeout = setTimeout(atualizarLayout, 250);
        };
    });
}

/**
 * Ajusta tamanho do visualizador conforme janela do usuário.
 */
function atualizarLayout() {
    $painelVisualizador = $('#' + Visualizador.ID_PAINEL_VISUALIZADOR);
    var alturaAtual = $painelVisualizador.height();

    if (alturaAtual < 70) {
        var altura = $(window).height() - 220;
        if (altura < 200) {
            altura = 200;
        }
        $painelVisualizador.css('height', altura);
    }
}

function redefinirTamanhoVisualizador() {
    var idPainel = "#" + Visualizador.ID_PAINEL_VISUALIZADOR;
    var $painel = $(idPainel + "_container");

    $painel.width($(window).width() * 0.95);
    $painel.height($(window).height() * 0.9);
    redimensionarElementosVisualizador();
}

function redimensionarElementosVisualizador() {
    var idPainel = "#" + Visualizador.ID_PAINEL_VISUALIZADOR;
    var $painel = $(idPainel + "_container");

    $(idPainel + "_shadow, " + idPainel + "_header").width($painel.width() - 2);
    $(idPainel + "_shadow").height($painel.height() - 2);

    var $painelContentScroller = $(idPainel + "_content_scroller");
    $painelContentScroller.width($painel.width() - 2);
    $painelContentScroller.height($painel.height() - 35);

    var $painelContent = $(idPainel + "_content");
    $painelContent.width($painel.width() - 30);
    $painelContent.height($painel.height() - 60);

    $(idPainel).width($painel.width() - 17);
}

function reconstruirDivPainelVisualizador() {
    var $containerVisualizador = $('#' + Visualizador.ID_CONTAINER_VISUALIZADOR);
    var $parent = $containerVisualizador.parent();
    $containerVisualizador.remove();
    $parent.append('<div id="' + Visualizador.ID_CONTAINER_VISUALIZADOR + '"></div>');
}

var Visualizador = {
    ID_CONTAINER_VISUALIZADOR : 'container-visualizador',
    ID_PAINEL_VISUALIZADOR : 'painelVisualizador',

    fecharPainel : function() {
        //RichFaces.$(Visualizador.ID_PAINEL_VISUALIZADOR).hide();
    },

    maximizar : function(idPainelVisualizador) {
        var idPainel = idPainelVisualizador || Visualizador.ID_PAINEL_VISUALIZADOR;
        //RichFaces.$(idPainel).hide();
        alert('TODO: implementar maximização.');
    },

    abrir : function(info) {
        if (info.mensagemErro) {
            exibirMessagemErro(info.mensagemErro);
        } else {
            reconstruirDivPainelVisualizador();
            redefinirTamanhoVisualizador();
            //RichFaces.$(Visualizador.ID_PAINEL_VISUALIZADOR).show();
            visualizarDocumentoAnotacaoComId(info);
        }
    },

    init : {
        /**
         * Carrega dinamicamente JS do Modernizr, dependência do GroupDocs.
         */
        configurarModernizrCssTransformers : function() {
            if (!window.Modernizr.csstransforms) {
                carregarJsOuCss(getBaseUrl() + '/resources/docflow/js/visualizador/groupdocs/turn.html4.min.js')
            }
        },

        configurarApplicationPath : function() {
            var urlBase = window.location.protocol + "//" + window.location.host + getContextPath() + '/';

            $.ui.groupdocsViewer.prototype.applicationPath = urlBase;
            $.ui.groupdocsViewer.prototype.useHttpHandlers = true;

            window.baseUrl = urlBase;
            window.isCaseSensitive = false;
            window.searchForSeparateWords = true;
        },

        /**
         * Configuração do GroupDocs.
         */
        configurarContainer : function() {
            var container = window.Container || new JsInject.Container();
            container.Register('PathProvider', function(c) {
                return jSaaspose.utils;
            }, true);
            window.Container = container;
            window.groupdocsAnnotationFrontEndVersion = function() {
                var gVersion = '1.1.0';
                var gUpDate = '2014.11.19';
                return 'GroupDocs.Annotation front-end v' + gVersion + ' updated by ' + gUpDate;
            };
        }
    }
};
