package br.com.dataeasy.core.i18n;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.text.MessageFormat;
import java.util.Locale;
import java.util.Properties;
import java.util.ResourceBundle;

import javax.faces.context.FacesContext;
import javax.servlet.ServletContext;

import org.apache.commons.lang3.StringUtils;

public final class Messages {

    private Messages() {
    }

    private static Properties properties;

    public static void loadPropertiesFileInMemory(ServletContext sc, Locale locale) throws FileNotFoundException, IOException {
        if (properties == null) {
            String nomeArquivo = "messages_" + locale.toString() + ".properties";
            String file = sc.getRealPath("/WEB-INF/classes/bundle/" + nomeArquivo);
            try (FileInputStream fis = new FileInputStream(file); InputStreamReader isr = new InputStreamReader(fis, Charset.forName("UTF-8"))) {
                properties = new Properties();
                properties.load(isr);
            }
        }
    }

    public static void loadPropertiesFileInMemory(File dir, Locale locale) throws FileNotFoundException, IOException {
        if (properties == null) {
            String nomeArquivo = "messages_" + locale.toString() + ".properties";
            try (FileInputStream fis = new FileInputStream(new File(dir, nomeArquivo));
                    InputStreamReader isr = new InputStreamReader(fis, Charset.forName("UTF-8"))) {
                properties = new Properties();
                properties.load(isr);
            }
        }
    }

    public static String get(String key) {
        if (existsFacesContext()) {
            return getMessageFromFacesBundle(key);
        } else {
            return getMessageFromDocflowBundle(key);
        }
    }

    public static String get(String key, Object... params) {
        if (existsFacesContext()) {
            return getMessageFromFacesBundle(key, params);
        } else {
            return getMessageFromDocflowBundle(key, params);
        }
    }

    private static String getMessageFromDocflowBundle(String key) {
        return properties.getProperty(key);
    }

    private static String getMessageFromDocflowBundle(String key, Object params[]) {
        String text = getMessageFromDocflowBundle(key);
        if (text == null) {
            text = key;
        }
        if (params != null && StringUtils.isNotEmpty(text) && text != key) {
            MessageFormat mf = new MessageFormat(text, new Locale("pt", "BR"));
            text = mf.format(params, new StringBuffer(), null).toString();
        }
        return text;
    }

    private static String getMessageFromFacesBundle(String key) {
        return getMessageFromFacesBundle(key, null);
    }

    private static String getMessageFromFacesBundle(String key, Object[] params) {
        String text = null;
        FacesContext context = FacesContext.getCurrentInstance();
        Locale locale = getLocale(context);
        ResourceBundle bundle = context.getApplication().getResourceBundle(context, "msg");
        try {
            text = bundle.getString(key);
        } catch (Exception e) {
            text = key;
        }
        if (params != null && StringUtils.isNotEmpty(text) && text != key) {
            MessageFormat mf = new MessageFormat(text, locale);
            text = mf.format(params, new StringBuffer(), null).toString();
        }
        return text;
    }

    private static boolean existsFacesContext() {
        return FacesContext.getCurrentInstance() != null;
    }

    private static Locale getLocale(FacesContext context) {
        if (context.getViewRoot() != null && context.getViewRoot().getLocale() != null) {
            return context.getViewRoot().getLocale();
        } else {
            return new Locale("pt", "BR");
        }
    }
}
