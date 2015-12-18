package br.com.dataeasy.core.i18n;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.Enumeration;
import java.util.Locale;
import java.util.PropertyResourceBundle;
import java.util.ResourceBundle;

public class ResourceBundleUTF8 extends ResourceBundle {

    protected static final String  BUNDLE_NAME  = "br.com.dataeasy.core.i18n.ResourceBundleUTF8";
    protected static final Control UTF8_CONTROL = new UTF8Control();

    public ResourceBundleUTF8() {
        setParent(ResourceBundle.getBundle(BUNDLE_NAME, new Locale("pt, BR"), UTF8_CONTROL));
    }

    public ResourceBundleUTF8(File dir) {
        setParent(ResourceBundle.getBundle(BUNDLE_NAME, new Locale("pt, BR"), new UTF8ControlDir(dir)));
    }

    @Override
    protected Object handleGetObject(String key) {
        return parent.getObject(key);
    }

    @Override
    public Enumeration<String> getKeys() {
        return parent.getKeys();
    }

    protected static class UTF8Control extends Control {
        @Override
        public ResourceBundle newBundle(String baseName, Locale locale, String format, ClassLoader loader, boolean reload)
                throws IllegalAccessException, InstantiationException, IOException {
            // The below code is copied from default Control#newBundle()
            // implementation.
            // Only the PropertyResourceBundle line is changed to read the file
            // as UTF-8.
            String resourceName = "bundle/messages_pt_BR.properties";
            ResourceBundle bundle = null;
            InputStream stream = null;
            if (reload) {
                URL url = loader.getResource(resourceName);
                if (url != null) {
                    URLConnection connection = url.openConnection();
                    if (connection != null) {
                        connection.setUseCaches(false);
                        stream = connection.getInputStream();
                    }
                }
            } else {
                stream = loader.getResourceAsStream(resourceName);
            }
            if (stream != null) {
                try {
                    bundle = new PropertyResourceBundle(new InputStreamReader(stream, "UTF-8"));
                } finally {
                    stream.close();
                }
            }
            return bundle;
        }
    }

    protected static class UTF8ControlDir extends Control {
        private File dir;

        public UTF8ControlDir(File dir) {
            this.dir = dir;
        }

        @Override
        public ResourceBundle newBundle(String baseName, Locale locale, String format, ClassLoader loader, boolean reload)
                throws IllegalAccessException, InstantiationException, IOException {
            ResourceBundle bundle = null;
            // Monta o nome do arquivo para fazer a busca
            String nomeArquivo = "messages_pt_BR.properties";
            // Cria um Properties e o carrega com o arquivo de mensagens..
            try (FileInputStream fis = new FileInputStream(new File(dir, nomeArquivo));
                    InputStreamReader isr = new InputStreamReader(fis, "UTF-8")) {
                bundle = new PropertyResourceBundle(isr);
            }
            return bundle;
        }
    }
}
