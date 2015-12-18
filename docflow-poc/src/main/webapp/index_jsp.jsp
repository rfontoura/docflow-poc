<%-- 
    Document   : index
    Created on : May 19, 2014, 12:35:58 AM
    Author     : Aleksey Pemyakov
--%>
<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>

<head>
    <meta charset="utf-8">
    <title>GroupDocs Annotation for Java Sample</title>
    
    <!-- Coisas do JSF -->
    <script type="text/javascript" src="/docflow/org.richfaces.resources/javax.faces.resource/org.richfaces.staticResource/4.2.2.Final/PackedCompressed/jquery.js"></script>
    <script type="text/javascript" src="/docflow/org.richfaces.resources/javax.faces.resource/org.richfaces.staticResource/4.2.2.Final/PackedCompressed/packed/packed.js"></script>
    <link type="text/css" rel="stylesheet" href="/docflow/org.richfaces.resources/javax.faces.resource/org.richfaces.staticResource/4.2.2.Final/PackedCompressed/DEFAULT/packed/packed.css" />
    <link type="text/css" rel="stylesheet" href="/docflow/javax.faces.resource/css/main/main.css.jsf" />
    <script type="text/javascript" src="/docflow/javax.faces.resource/js/main/main.js.jsf"></script>
    <script type="text/javascript" src="/docflow/javax.faces.resource/js/richfaces/popupPanel/popup.js.jsf"></script>
    <script type="text/javascript" src="/docflow/javax.faces.resource/js/jquery/menuAcoes/menu_acoes.js.jsf"></script>
    <script type="text/javascript" src="/docflow/javax.faces.resource/js/richfaces/richSelect/richSelectFunctions.js.jsf"></script>
    <script type="text/javascript" src="/docflow/javax.faces.resource/js/jquery/dropotron/jquery.dropotron.min.js.jsf"></script>
    <link type="text/css" rel="stylesheet" href="/docflow/javax.faces.resource/css/jquery/jscrollpane/jquery.jscrollpane.css.jsf" />
    <script type="text/javascript" src="/docflow/javax.faces.resource/js/jquery/mousewheel/jquery.mousewheel.js.jsf"></script>
    <script type="text/javascript" src="/docflow/javax.faces.resource/js/jquery/jscrollpane/jquery.jscrollpane.min.js.jsf"></script>
    <!-- Fim de Coisas do JSF -->
    
    <script type="text/javascript" src="<%=request.getContextPath()%>/resources/docflow/js/visualizador/groupdocs/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/resources/docflow/js/visualizador/groupdocs/jquery-ui-1.10.3.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/resources/docflow/js/visualizador/groupdocs/knockout-3.0.0.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/resources/docflow/js/visualizador/groupdocs/turn.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/resources/docflow/js/visualizador/groupdocs/modernizr.2.6.2.Transform2d.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/resources/docflow/js/visualizador/groupdocs/util.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/resources/docflow/js/visualizador/groupdocs/visualizador-groupdocs.js"></script>
    <script type="text/javascript">
    	Visualizador.init.configurarModernizrCssTransformers();
    </script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/resources/docflow/js/visualizador/groupdocs/installableViewer.min.js"></script>
    <script type="text/javascript">
    	Visualizador.init.configurarApplicationPath();
    </script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/resources/docflow/js/visualizador/groupdocs/GroupdocsViewer.all.min.js"></script>
    
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resources/docflow/css/visualizador/groupdocs/bootstrap-groupdocs.min.css" />
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resources/docflow/css/visualizador/groupdocs/GroupdocsViewer.all.min.css" />
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resources/docflow/css/visualizador/groupdocs/jquery-ui-1.10.3.dialog.min.css" />
    <script type="text/javascript" src="<%=request.getContextPath()%>/resources/docflow/js/visualizador/groupdocs/jquery.tinyscrollbar.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/resources/docflow/js/visualizador/groupdocs/GroupdocsAnnotation.all.min.js"></script>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resources/docflow/css/visualizador/groupdocs/Annotation.min.css" />
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resources/docflow/css/visualizador/groupdocs/Annotation.Toolbox.min.css" />
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resources/docflow/css/visualizador/groupdocs/fixes.css" />
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resources/docflow/css/visualizador/groupdocs/visualizador.css" />
    <!--  -->
    <!--[if IE]>
    <style type="text/css">
        input[type="text"].input_search {
            padding-right: 30px;
            width: 65px;
        }
    </style>
    <![endif]-->
    <!--[if IE 9]>
    <style type="text/css">
        span.input_search_clear {
            left: 140px;
        }
    </style>
    <![endif]-->
    <script type="text/javascript">
    	Visualizador.init.configurarContainer();
    </script>
</head>

<body>
    <div id="container-visualizador"></div>
</body>
</html>