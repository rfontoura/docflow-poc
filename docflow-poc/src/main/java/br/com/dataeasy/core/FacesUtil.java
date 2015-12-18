package br.com.dataeasy.core;

import java.io.InputStream;
import java.util.Collection;
import java.util.Iterator;
import java.util.Locale;

import javax.el.MethodExpression;
import javax.el.ValueExpression;
import javax.faces.application.FacesMessage;
import javax.faces.application.NavigationHandler;
import javax.faces.application.ViewHandler;
import javax.faces.component.UIParameter;
import javax.faces.component.UIViewRoot;
import javax.faces.context.FacesContext;
import javax.faces.event.ActionEvent;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public final class FacesUtil {

    private FacesUtil() {
    }

    /**
     * Destroi a sessão corrente do usuario.
     *
     * @param ctx - FacesContext
     */
    public static void sessionDestroy(FacesContext ctx) {
        getSession(ctx).invalidate();
    }

    /**
     * Retorna o objeto HTTPSession.
     *
     * @param ctx - FacesContext
     * @return HttpSession
     */
    public static HttpSession getSession(FacesContext ctx) {
        return (HttpSession) ctx.getExternalContext().getSession(true);
    }

    /**
     * Retorna o objeto HTTPSession.
     *
     * @param ctx - FacesContext
     * @return HttpSession
     */
    public static HttpSession getSession(FacesContext ctx, boolean parametroSession) {
        return (HttpSession) ctx.getExternalContext().getSession(parametroSession);
    }

    /**
     * Retorna o Objeto HTTPServletRequest.
     *
     * @param ctx - FacesContext
     * @return HttpServletRequest
     */
    public static HttpServletRequest getRequest(FacesContext ctx) {
        return (HttpServletRequest) ctx.getExternalContext().getRequest();
    }

    /**
     * Retorna o Objeto HTTPServletRequest.
     */
    public static HttpServletRequest getRequest() {
        return (HttpServletRequest) FacesContext.getCurrentInstance().getExternalContext().getRequest();
    }

    /**
     * Retorna um InputStream de algum recurso da aplicação
     */
    public static InputStream getResourceAsStream(FacesContext ctx, String caminho) {
        return ctx.getExternalContext().getResourceAsStream(caminho);
    }

    /**
     * Retorna o caminho real da aplicação
     *
     * @param ctx - FacesContext
     * @return String
     */
    public static String getRealPath(FacesContext ctx) {
        return getServletContext(ctx).getRealPath("");
    }

    /**
     * Retorna o caminho real da aplicação
     */
    public static String getRealPath(FacesContext ctx, String path) {
        return getServletContext(ctx).getRealPath(path);
    }

    /**
     * Retorna o Objeto HTTPServletRequest.
     *
     * @param ctx - FacesContext
     * @return HttpServletRequest
     */
    public static HttpServletResponse getResponse(FacesContext ctx) {
        return (HttpServletResponse) ctx.getExternalContext().getResponse();
    }

    /**
     * Realiza uma navegacao JSF - Forward
     *
     * @param ctx - FacesContext
     * @param target - String de Navegacao definida no arquivo navigation-rules.xml
     * @return void
     */
    public static void handleNavigation(FacesContext ctx, String target) {
        NavigationHandler handler = ctx.getApplication().getNavigationHandler();
        handler.handleNavigation(ctx, null, target);
    }

    /**
     * Dispara um Foward no FacesContext
     *
     * @param ctx - FacesContext
     * @param handler - ViewHandler
     * @param viewId - String
     */
    public static void foward(FacesContext ctx, ViewHandler handler, String viewId) {
        UIViewRoot view = handler.createView(ctx, viewId);
        ctx.setViewRoot(view);
        ctx.renderResponse();
    }

    /**
     * Recupera a lista de conversores controlada pela app
     *
     * @param ctx - FacesContext
     * @return Iterator<String>
     */
    public static Iterator<String> getConverterIds(FacesContext ctx) {
        return ctx.getApplication().getConverterIds();
    }

    /**
     * Recupera a lista de validadores controlada pela app
     *
     * @param ctx - FacesContext
     * @return Iterator<String>
     */
    public static Iterator<String> getValidatorIds(FacesContext ctx) {
        return ctx.getApplication().getValidatorIds();
    }

    /**
     * Envia o comando de redirect para a URL passada como parâmetro.
     *
     * @param ctx - FacesContext
     * @param url - String
     */
    public static void redirect(FacesContext ctx, String url) {
        try {
            ctx.getExternalContext().redirect(url);
            ctx.responseComplete();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Adiciona parametros na sessão do usuário.
     *
     * @param ctx - FacesContext
     * @param alias - String
     * @param parameter - Object
     */
    public static void setParamSession(FacesContext ctx, String alias, Object parameter) {
        getSession(ctx).setAttribute(alias, parameter);
    }

    /**
     * Adiciona parametros na sessão do usuário.
     *
     * @param httpSession - HttpSession
     * @param alias - String
     * @param parameter - Object
     */
    public static void setParamSession(HttpSession httpSession, String alias, Object parameter) {
        httpSession.setAttribute(alias, parameter);
    }

    /**
     * Remove um atributo da SESSÃO.
     *
     * @param ctx - FacesContext
     * @param alias - String
     */
    public static void removeParamSession(FacesContext ctx, String alias) {
        getSession(ctx).removeAttribute(alias);
    }

    /**
     * Insere um parâmetro no request.
     *
     * @param alias - String
     * @param parameter - Object
     */
    public static void setParamRequest(FacesContext ctx, String alias, Object parameter) {
        getRequest(ctx).setAttribute(alias, parameter);
    }

    /**
     * Retorna o parametro armazenado no session.
     *
     * @param ctx - FacesContext
     * @param key - String
     * @return Object
     */
    public static Object getParamSession(FacesContext ctx, String key) {
        return getSession(ctx).getAttribute(key);
    }

    /**
     * Retorna o parametro armazenado no session.
     *
     * @param ctx - HttpSession
     * @param key - String
     * @return Object
     */
    public static Object getParamSession(HttpSession ctx, String key) {
        return ctx.getAttribute(key);
    }

    /**
     * Constroi um objeto MethodExpression utilizado na chamado a "action" ou "actionListener"
     *
     * @param ctx
     * @param expression
     * @param methodData
     * @throws NoSuchMethodException
     * @throws ClassNotFoundException
     * @return MethodExpression
     */
    public static MethodExpression createMethodExpression(FacesContext ctx, String expression, Class<?> returnType, Class<?>[] arguments)
            throws NoSuchMethodException, ClassNotFoundException {
        return ctx.getApplication().getExpressionFactory().createMethodExpression(ctx.getELContext(), expression, returnType, arguments);
    }

    /**
     * Constroi um objeto ValueExpression utilizado na chamado a "actionListener"
     *
     * @param ctx
     * @param expression
     * @param methodData
     * @throws NoSuchMethodException
     * @throws ClassNotFoundException
     * @return MethodExpression
     */
    public static ValueExpression getValueExpression(FacesContext ctx, String expression, Class<?> expectedType) throws NoSuchMethodException,
            ClassNotFoundException {
        return ctx.getApplication().getExpressionFactory().createValueExpression(ctx.getELContext(), expression, expectedType);
    }

    /**
     * Executa uma expressão regular cujo resultado vai ser um Boolean
     *
     * @param ctx
     * @param expression
     * @throws NoSuchMethodException
     * @throws ClassNotFoundException
     * @return boolean
     */
    public static boolean execValueExpression(FacesContext ctx, String expression) throws NoSuchMethodException, ClassNotFoundException {
        return (Boolean) getValueExpression(ctx, expression, Boolean.class).getValue(ctx.getELContext());
    }

    /**
     * Constroi um objeto MethodExpression utilizado na chamado a "action" ou "actionListener"
     *
     * @param ctx
     * @param expression
     * @param methodData
     * @return
     * @throws NoSuchMethodException
     * @throws ClassNotFoundException
     * @return MethodExpression
     */
    @SuppressWarnings({ "deprecation" })
    public static void createValueBinding(FacesContext ctx, String expression, Object value) {
        ctx.getApplication().createValueBinding(expression).setValue(ctx, value);
        /*
         * ValueExpression expr = ctx.getApplication().getExpressionFactory().createValueExpression (ctx.getELContext(), expression, classe);
         * expr.getValue(ctx.getELContext());
         */
    }

    /**
     * Retorna o parametro armazenado no request.
     *
     * @param ctx - FacesContext
     * @param key - String
     * @return Object
     */
    public static Object getParamRequest(FacesContext ctx, String key) {
        return getRequest(ctx).getAttribute(key);
    }

    /**
     * Retorna o parametro passado pela URL
     *
     * @param ctx - FacesContext
     * @param key - String
     * @return Object
     */
    public static String getParamUrl(FacesContext ctx, String key) {
        return ctx.getExternalContext().getRequestParameterMap().get(key);
    }

    /**
     * Retorna o valor do atributo de um componente
     *
     * @param event - ActionEvent do JSF
     * @param nome - Nome do atributo
     * @return String
     */
    public static String getActionAtribute(ActionEvent event, String nome) {
        return (String) event.getComponent().getAttributes().get(nome);
    }

    /**
     * Retorna um valor inserido no request atraves de atributos Hidden.
     *
     * @param context - FacesContext
     * @param key - Key do objeto no HashMap
     * @return Object
     */
    public static Object getRequestMapValue(FacesContext context, String key) {
        return context.getExternalContext().getRequestMap().get(key);
    }

    /**
     * Insere um atributo no request
     *
     * @param context - FacesContext
     * @param key - String Key do objeto no request
     * @param value - Object
     */
    public static void setRequestMapValue(FacesContext context, String key, Object value) {
        context.getExternalContext().getRequestMap().put(key, value);
    }

    /**
     * Adiciona uma mensagem no FacesContext
     *
     * @param ctx - FacesContext
     * @param msgs - FacesMessage
     */
    public static void addMessageCtx(FacesContext ctx, FacesMessage msgs) {
        ctx.addMessage(null, msgs);
    }

    /**
     * Retorna o objeto ServletContext da aplicação
     *
     * @param ctx - FacesContext
     * @return ServletContext
     */
    public static ServletContext getServletContext(FacesContext ctx) {
        return getRequest(ctx).getSession().getServletContext();
    }

    /**
     * Captura uma classe gerenciada pelo JSF
     *
     * @param ctx - FacesContext
     * @param alias - String
     * @return Object
     */
    public static Object getManagedBean(FacesContext ctx, String alias) {
        return ctx.getELContext().getELResolver().getValue(ctx.getELContext(), null, alias);
    }

    /**
     * Busca um parâmetro passada pela View.
     *
     * @param event - ActionEvent
     * @param key - String
     * @return Object
     */
    public static Object getParamView(ActionEvent event, String key) {
        try {
            UIParameter param = (UIParameter) event.getComponent().findComponent(key);
            return param.getValue();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static String getServerAddr() {
        return getServerAddr(getRequest());
    }

    public static String getServerAddr(HttpServletRequest request) {
        String hostAddr = request.getScheme() + "://" + request.getServerName() + getPort(request);
        return hostAddr;
    }

    public static String getPort(HttpServletRequest request) {
        String port = "";
        if (request.getServerPort() != 80 && request.getServerPort() != 443) {
            port = ":" + request.getServerPort();
        }
        return port;
    }

    public static String getHostAddr(HttpServletRequest request) {
        return getServerAddr(request) + request.getContextPath();
    }

    public static String getHostAddr(boolean forceSchemeHttps) {
        if (forceSchemeHttps) {
            HttpServletRequest request = (HttpServletRequest) FacesContext.getCurrentInstance().getExternalContext().getRequest();
            String hostAddr = getSchemeHttps(request) + "://" + request.getServerName() + getPort(request) + request.getContextPath();
            return hostAddr;
        } else {
            return getHostAddr((HttpServletRequest) FacesContext.getCurrentInstance().getExternalContext().getRequest());
        }
    }

    private static String getSchemeHttps(HttpServletRequest request) {
        String scheme = request.getScheme();
        if (!scheme.equals("https")) {
            return scheme.replaceFirst("http", "https");
        } else {
            return scheme;
        }
    }

    public static String getHostAddr() {
        return getHostAddr((HttpServletRequest) FacesContext.getCurrentInstance().getExternalContext().getRequest());
    }

    public static String getLocalHostAddr() {
        HttpServletRequest request = (HttpServletRequest) FacesContext.getCurrentInstance().getExternalContext().getRequest();
        String hostAddr = request.getScheme() + "://" + request.getServerName() + getLocalPort(request);
        return hostAddr + request.getContextPath();
    }

    public static String getLocalPort(HttpServletRequest request) {
        String port = null;
        if (request.getLocalPort() != 80 && request.getLocalPort() != 443) {
            port = ":" + request.getLocalPort();
        } else {
            port = "";
        }
        return port;
    }

    public static void forward(String path) {
        try {
            HttpServletRequest request = (HttpServletRequest) FacesContext.getCurrentInstance().getExternalContext().getRequest();
            HttpServletResponse response = (HttpServletResponse) FacesContext.getCurrentInstance().getExternalContext().getResponse();
            request.getRequestDispatcher(path).forward(request, response);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void renderIdsView(String... viewIds) {
        FacesContext context = FacesContext.getCurrentInstance();
        Collection<String> renderIds = context.getPartialViewContext().getRenderIds();
        for (String id : viewIds) {
            renderIds.add(id);
        }
    }

    public static boolean hasMessage(FacesContext ctx) {
        return !FacesContext.getCurrentInstance().getMessageList().isEmpty();

    }

    public static String getUrlBaseDaAplicacao() {
        return getUrlBaseDaAplicacao(getRequest());
    }

    public static String getUrlBaseDaAplicacao(HttpServletRequest request) {
        return request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
    }

    public static Locale getLocalePadrao() {
        return FacesContext.getCurrentInstance().getApplication().getDefaultLocale();
    }
}
