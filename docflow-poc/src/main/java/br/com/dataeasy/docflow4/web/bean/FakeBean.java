package br.com.dataeasy.docflow4.web.bean;

import java.util.ArrayList;
import java.util.List;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;

@ManagedBean
@RequestScoped
public class FakeBean {

    private class ObjetoExemplo {
        private String nome;
        private String valor;

        public ObjetoExemplo(String nome, String valor) {
            super();
            this.nome = nome;
            this.valor = valor;
        }

        public String getNome() {
            return nome;
        }

        public void setNome(String nome) {
            this.nome = nome;
        }

        public String getValor() {
            return valor;
        }

        public void setValor(String valor) {
            this.valor = valor;
        }
    }

    public String fakeAction() {
        return "";
    }

    public List<ObjetoExemplo> listar() {
        List<ObjetoExemplo> lista = new ArrayList<ObjetoExemplo>();

        for (int i = 0; i < 5; i++) {
            lista.add(new ObjetoExemplo("nome" + (i + 1), "" + (i + 1)));
        }

        return lista;
    }
}
