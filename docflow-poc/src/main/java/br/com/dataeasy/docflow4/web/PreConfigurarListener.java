package br.com.dataeasy.docflow4.web;

import java.util.Locale;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import br.com.dataeasy.core.i18n.Messages;

public class PreConfigurarListener implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent sc) {
        this.setup(sc);
    }

    private void setup(ServletContextEvent sc) {
        try {
            loadPropertiesFileInMemory(sc);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private static void loadPropertiesFileInMemory(ServletContextEvent sc) {
        try {
            Messages.loadPropertiesFileInMemory(sc.getServletContext(), new Locale("pt", "BR"));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void contextDestroyed(ServletContextEvent sc) {
        //
    }
}
