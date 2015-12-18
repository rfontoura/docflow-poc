	
	function isearch() {
		var url = document.getElementById("urlISearch");
		window.open(url.value, "ISEARCH", "width=800,height=600,status=no,scrollbars=yes,resizable=yes,menubar=no,tollbar=no,dependent=yes");
	}

	/**
	 * Desabilita um determinado componente
	 * @param id - Identificador do componente na página JSP 
	 */
	function disabledObject(id) {
		document.getElementById(id).disabled = true;
	}
	
	function goBack() {
		window.history.back();
	}
	
	function invocarServico(serverName, serverPort, contextPath, id, tipo) {
		var address = "http://"+serverName+":"+serverPort + contextPath+"/documentView.jsf?id=" + id + "&tipo=" + tipo;
		window.location = address;
	}
	
	/**
	 * Atualiza uma lista de Radios e Checks Box
	 * retornando verdadeiro somente o componente selecionado.
	 * Parâmetros: componente html
	 */
	function dataTableSelectAll(radio) {
	    var id = radio.name.substring(radio.name.lastIndexOf(':'));
	    var el = radio.form.elements;
	    for (var i = 0; i < el.length; i++) {
	    	if (el[i].checked) {
	    		el[i].checked = false;
	    	} else {
	    		el[i].checked = true;
	    	}
	    }
	    if (radio.checked) {
	    	radio.checked = false;
	    } else {
	    	radio.checked = true;
	    }
	}
	
	/**
	 * Abre o Editor de fluxos
	 */
	function openHelp() {
	   var urlSistema  = document.getElementById("urlSistemaHelp").value;
	   urlSistema = urlSistema+"/xhtml/help.jsf";
	   window.open(urlSistema, "Help", "width=800, height=600, status=yes, scrollbars=yes, resizable=no, menubar=yes, tollbar=yes");	
	}
	
	/**
	 * Inverte a seleção atual de todos os booleanCheckbox 
	 * da lista e componente informados como parametro.
	 * Comecando a partir do ID inicial informado.
	 * 
	 * @param lista
	 * @param importar
	 * @param importar
	 * @return
	 */
	function dataTableSelectAllCheckBox(lista,source,total,checked) {
		for (var i = 0;i < total;i++) {
			ck = document.getElementById(lista + ":" + i + ":" + source);
			if (ck && !ck.disabled) {
		        ck.checked = checked;
			}
		}
	}
	
	/**
	 * formata campo CPF com auto - completar
	 * @param campo
	 * @param teclapres
	 * @return void
	 */
	function formatarCpf(campo, teclapres) {
		var tecla = teclapres.keyCode;
		var vr = new String(campo.value);
		vr = vr.replace(".", "");
		vr = vr.replace("/", "");
		vr = vr.replace("-", "");
		tam = vr.length + 1;
		if (tecla != 14) {
			if (tam == 4) {
				campo.value = vr. substr(0, 3) + '.';
			}
			if (tam == 7) {
				campo.value = vr.substr(0, 3) + '.' + vr.substr(3, 6) + '.';
			}
			if (tam == 11) {
				campo.value = vr.substr(0, 3) + '.' + vr.substr(3, 3) + '.' + vr.substr(7, 3) + '-' + vr.substr(11, 2);
			}
		}
	}
	
	/**
	 * Formata o campo que pode ser um CPF ou um CNPJ
	 */
	function formatarCpfCnpj(campo) {
		var vr = new String(campo.value);
		vr = replaceAll(vr, ".", "");
		vr = replaceAll(vr, "/", "");
		vr = replaceAll(vr, "-", "");
		if (vr.length == 11) {
			campo.value = vr.substr(0, 3) + '.' + vr.substr(3, 3) + '.' + vr.substr(6, 3) + '-' + vr.substr(9, 2);
		}
		else if (vr.length == 14) {
			campo.value = vr.substr(0,2) + '.' + vr.substr(2,3) + '.' + vr.substr(5,3) + '/' + vr.substr(8,4)+ '-' + vr.substr(12,2);
		}
		else { 
			campo.value = vr;
		}
	}
	
	/**
	 * Retorna true caso o dígito seja válido para um campo CPF/CNPJ
	 */
	function isDigitoCpfCnpjValido(objeto, event) {
		var cpfCnpj = objeto.value.replace(/\D/g, '');
		var keyCode = (event.which) ? event.which : event.keyCode;
 		
		// Se for Ctrl+V, retorna true ('v'=118, 'V'=86)
		if(event.ctrlKey && (keyCode == 118 || keyCode == 86)) return true;
		// Se for Ctrl+A, retorna true ('a'=97, 'V'=65)
		if(event.ctrlKey && (keyCode == 97 || keyCode == 65)) return true;
		// Se for Ctrl+C, retorna true ('c'=99, 'C'=67)
		if(event.ctrlKey && (keyCode == 99 || keyCode == 67)) return true;
		// Se for Ctrl+X, retorna true ('x'=88, 'X'=120)
		if(event.ctrlKey && (keyCode == 88 || keyCode == 120)) return true;
		
		// Pega informações sobre a tecla pressionada
		var isNumero = keyCode >= 48 && keyCode <= 57;
		var isBackspaceOuTabOuEnter = keyCode == 8 || keyCode == 9 || keyCode == 13;
		
		// Se for um número e o campo já tiver 14 dígitos, retorna false
		if(isNumero && cpfCnpj.length == 14) return false;
		
		return isNumero || isBackspaceOuTabOuEnter;
	}
	
	/**
	 * Faz replace dos caracteres
	 */
	function replaceCaracteresCpfCnpj(valor) {
 		var vr = new String(valor);
		vr = replaceAll(vr, ".", "");
		vr = replaceAll(vr, "/", "");
		vr = replaceAll(vr, "-", "");
		vr = replaceAll(vr, "_", "");
		return vr;
	}
	
	/**
	 * Faz replace dos caracteres
	 */
	function replaceAll(string, token, newtoken) {
		while (string.indexOf(token) != -1) {
	 		string = string.replace(token, newtoken);
		}
		return string;
	}
	
	
	/**
	 * Invoca a função JS atualizarMenuAcoes() que tem a finalidade de atualizar a página de consulta de documento.
	 * Consequentemente, esta função também invoca um método no controlador documentoElaboracaoBean chamado
	 * updateActionMenuModoConsulta() que por sua vez sincroniza o objeto DocumentoTO 
	 */
	function updateActionMenu() {
		sleep(1500);
		atualizarMenuAcoes();
	}
	
	function agendarFuncao() {
		window.setTimeout("refresh()", 2000);
	}
	
	function refresh() {
		//var sURL = unescape(window.location.pathname);
		window.location.reload(false);
	}
	
	/**
	 * Pára a execução do script pelo tempo(em milisegundos) passsado
	 * como parâmetro
	 */
	function sleep(milisegundos) {
		var start = new Date().getTime();
		flag = true;
		while(flag) {
			if ((new Date().getTime() - start) >  milisegundos) {
				flag = false;
			}
		}
	}
	
	/**
	 * Realiza a ação de clicar um botão
	 * Como utilizar esta função:
	 * Invocá-la em um componente que pertença obrigatoriamente ao mesmo
	 * formulário do botão. 
	 */
	function clickButton(e, componenteRef, idBotao) {
		var tecla = null;
		if (window.event) {
			tecla = e.keyCode;
		} else if (e.which) {
			tecla = e.which;
		}
	    if (tecla == 13) {
	    	var button = componenteRef.form.elements[idBotao];
			if (button != null) {
				button.click();
			}
	    }
	} 
	
	/**
	 * Realiza a ação de clicar um botão
	 * Como utilizar esta função:
	 * Invocá-la em um componente que pertença obrigatoriamente ao mesmo
	 * formulário do botão. 
	 */
	function clickButtonGeral(e, idBotao) {
		var tecla = null;
		if (window.event) {
			tecla = e.keyCode;
		} else if (e.which) {
			tecla = e.which;
		}
		if (tecla == 13) {
			var botao = document.getElementById(idBotao);
			if (botao != null && (botao.type == "submit" || botao.type == "button")) {
				botao.click();
			}
		}
	}
	
	/**
	 * Scroll down.
	 * 
	 * @param divId - Id do componente <div/>
	 */
	function scrollDown(divId) {
		var divObject = document.getElementById(divId);
		divObject.scrollTop = divObject.scrollHeight;
	}
	
	/**
	 * Funcao que seta o foco no primeiro componente de input 
	 */
	function focusOnFirstInput() {

		var forms = document.forms;
		var len = forms.length;

		for (var i = 0; i < len; i++) {
			var form = forms[i];
			for (var j = 0; j < form.length; j++) {
				var input = form[j];
				if (input.type != "hidden" && input.type != "button" && input.type != "submit") {
					if (!input.disabled) {
						input.focus();
						return;
					}
				}
			}
		}
	}
	
	/**
	 * Funcao que seta o foco no primeiro componente de input 
	 */
	function focusOnFirstInputForm(componenteRef) {
		var form = componenteRef.form;
		for (var j = 0; j < form.length; j++) {
			var input = form[j];
			if (input.type != "hidden" && input.type != "button" && input.type != "submit") {
				if (!input.disabled) {
					input.focus();
					return;
				}
			}
		}
	}
	
	/**
	 * Funcao que seta o foco no componente de id passado como parametro 
	 */
	function focusByIdElement(idElement) {
		document.getElementById(idElement).focus();
	}
	
	/**
	 * Clica o botao passado como parâmetro
	 * @return
	 */
	function pulldownChanged(idComponente) {
        document.getElementById(idComponente).click();
    }
	
	/**
	 *Busca os elementos de um determinado tipo
	 */
	function getElementByType(type) {
		var retorno = new Array();
		var fields = document.getElementsByTagName("input");
		if (fields != null && fields.length > 0) {
			//percorre os campos do formulário
			for (var i = 0; i <= fields.length - 1; i++) {
				//verifica se o elemento e do mesmo TYPE
				if ((fields[i].type == type)) {
			    	retorno[retorno.length] = fields[i];	  
			    }
		    }
		}
		return retorno;
	}
	
	/**
	 * Seta o foco no primeiro Input encontrado na página.
	 */
	function fieldFocus() {
		var fields = document.getElementsByTagName("input");
		if (fields != null && fields.length > 0) {
			//percorre os campos do formulário
			for (var i = 0; i <= fields.length - 1; i++) {
				//busca por um campo do tipo TXT, TXTAREA, SELECT, RADIO, CHECKBOX
				if ((fields[i].type == "text") 
			    		|| (fields[i].type == "textArea") 
			    			|| (fields[i].type == "select")
			    				|| (fields[i].type == "radio")
			    					|| (fields[i].type == "checkbox")
										|| (fields[i].type == "password")) {
			    	try {
						fields[i].focus();
					} catch(e) {
					}
					break;
			    }
		    }
		}
	}
	
	/**
	 * Funcao que formata cnpj tanto no i.e. quanto no firefox
	 * @param campo - id do campo
	 * @param teclaprs - event do Browser 
	 */
	function formataCNPJ(Campo, teclapres) {
		var tecla;
		
		if (window.event) {
			tecla = teclapres.keyCode;
		} else {
			tecla = teclapres.which;
		}
	
		var vr = new String(Campo.value);
		vr = vr.replace(".", "");
		vr = vr.replace(".", "");
		vr = vr.replace("/", "");
		vr = vr.replace("-", "");
	
		tam = vr.length + 1 ;
	
		if (teclapres.ctrlKey || (tecla != 9 && tecla != 8)) {
	
			if (tam > 2 && tam < 6) {
				Campo.value = vr.substr(0, 2) + '.' + vr.substr(2, tam);
			}
			if (tam >= 6 && tam < 9) {
				Campo.value = vr.substr(0,2) + '.' + vr.substr(2,3) + '.' + vr.substr(5,tam-5);
			}
			if (tam >= 9 && tam < 13) {
				Campo.value = vr.substr(0,2) + '.' + vr.substr(2,3) + '.' + vr.substr(5,3) + '/' + vr.substr(8,tam-8);
			}
			if (tam >= 13) {
				Campo.value = vr.substr(0,2) + '.' + vr.substr(2,3) + '.' + vr.substr(5,3) + '/' + vr.substr(8,4)+ '-' + vr.substr(12,tam-12);
			}
		}
	}
	
	/** Original:  Ronnie T. Moore
	 * Web Site:  The JavaScript Source
	 * Dynamic 'fix' by: Nannette Thacker
	 * Web Site: http://www.shiningstar.net
	 */
	function limitTextArea(field, countFieldId, maxlimit) {
		var countField = getSpan(countFieldId);
		if (field != null) {
			if (field.value.length > maxlimit) { // if too long...trim it!
				field.value = field.value.substring(0, maxlimit);
				// otherwise, update 'characters left' counter
			} else { 
				countField.firstChild.nodeValue = maxlimit - field.value.length;
			}
		}
	}
	
	/**
	 * Retorna um Label com base em um ID.
	 */
	function getSpan(idLabel) {
		var retorno = null;
		var fields = document.getElementsByTagName("span");
		for (var i = 0; i <= fields.length - 1; i++) {
	    	if (fields[i].id.indexOf(idLabel) != -1) {
	    		retorno = fields[i];
	    		break;
	    	}
		}
		return retorno;
	}
	
	/**
	 * Retorna um Label com base em um ID.
	 */
	function getLabel(idLabel) {
		var retorno = null;
		var fields = document.getElementsByTagName("label");
		for (var i = 0; i <= fields.length - 1; i++) {
	    	if (fields[i].id.indexOf(idLabel) != -1) {
	    		retorno = fields[i];
	    		break;
	    	}
		}
		return retorno;
	}
	
	/**
	 * Busca um campo com base no ID
	 */
	function getDiv(idField) {
		var retorno = null;
		var fields = document.getElementsByTagName("div");
		for (var i = 0; i <= fields.length - 1; i++) {
		    if ((fields[i].type == "text") 
		    		|| (fields[i].type == "textArea") 
		    			|| (fields[i].type == "select")
		    				|| (fields[i].type == "radio")
		    					|| (fields[i].type == "checkbox")
		    						|| (fields[i].type == "div")
			    						|| (fields[i].type == "DIV")
			    							|| (fields[i].type == "hidden")) {
		    	
		    	if (fields[i].id.indexOf(idField) != -1) {
		    		retorno = fields[i];
		    		break;
		    	}
		    }
		}
		return retorno;
	}
	
	/**
	 * Busca um campo com base no ID
	 */
	function getField(idField) {
		var retorno = null;
		var fields = document.getElementsByTagName("input");
		for (var i = 0; i <= fields.length - 1; i++) {
			alert(fields[i].id);
		    if ((fields[i].type == "text") 
		    		|| (fields[i].type == "textArea") 
		    			|| (fields[i].type == "select")
		    				|| (fields[i].type == "radio")
		    					|| (fields[i].type == "checkbox")
		    						|| (fields[i].type == "div")
			    						|| (fields[i].type == "DIV")
			    							|| (fields[i].type == "hidden")) {
		    	
		    	if (fields[i].id.indexOf(idField) != -1) {
		    		retorno = fields[i];
		    		alert(retorno.value);
		    		break;
		    	}
		    }
		}
		return retorno;
	}
	
	/**
	 * Verifica se o caractere passado e um inteiro
	 */
	function isInt(number) {
		var result = true;
	    if (isNaN(number)) {
	        result = false;
	    }
	    var myMod = number % 1;
	    if (myMod == 0) {
	        result = true;
	    } else {
	        result = false;
	    }
		return result;
	}
	
	/**
	 * Verifica se a tecla pressionada é equivalente a um número
	 */
	function isNum(campo, event) {
		var BACKSPACE= 8;
	    var DELETE = 46;
		var TAB = 0;
		var result = false;
		var tecla;
	
		if (navigator.appName.indexOf("Netscape")!= -1) {
			tecla = event.which;
	  	} else {
			tecla = event.keyCode;
		}
	
		//Testa o Ctrl+118
		if (event.ctrlKey) {
			result = true;
		}
		if ((tecla >= 96 &&  tecla <= 105) || (tecla >= 48 &&  tecla <= 57)) {
	  		result =  true;
	  	}
		if ( tecla == BACKSPACE || tecla == TAB || tecla == DELETE) {
	  		result = true;
		}
		if (tecla == 9) {
			setFoco(" ");
		}
		return result;
	}
	
	function validaTecla(campo, event) { 
	  
		var BACKSPACE= 8;   
		var key;   
		var tecla; 
		CheckTAB=true;
	  
		if (navigator.appName.indexOf("Netscape")!= -1) {  
			tecla = event.which; 
	  	} else {  
			tecla = event.keyCode; 
		}  
	  
		key = String.fromCharCode( tecla); 
		//alert( 'key: ' + tecla + ' -> campo: ' + campo.value); 
	  
		if ( tecla == 13 ) {
	  		return false; 
	  	}
		if ( tecla == BACKSPACE ) {
	  		return true; 
		}	
	  
		return (isNum(key)); 
	}
	
	/**
	 * 
	 */
	function MascaraDoubleDigit(objeto, evt, mask) {
		var Numeros = '0123456789,.';
		var LetrasU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		var LetrasL = 'abcdefghijklmnopqrstuvwxyz';
		var Letras  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
		var Fixos  = '().-:/ '; 
		var Charset = " !\"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_/`abcdefghijklmnopqrstuvwxyz{|}~";
	
		evt = (evt) ? evt : (window.event) ? window.event : "";
		var value = objeto.value;
	
		if (evt) {
	 		var ntecla = (evt.which) ? evt.which : evt.keyCode;
	 		tecla = Charset.substr(ntecla - 32, 1);
	 		
	 		if (ntecla < 32) return true;
	
	 		var tamanho = value.length;
	 		
	 		if (tamanho >= mask.length) return false;
	
	 		var pos = mask.substr(tamanho,1); 
	 		
	 		while (Fixos.indexOf(pos) != -1) {
	  			value += pos;
	  			tamanho = value.length;
	  			
	  			if (tamanho >= mask.length) return false;
	  			
	  			pos = mask.substr(tamanho,1);
	 		}
	
	 		switch (pos) {
	   			case '#' : if (Numeros.indexOf(tecla) == -1) return false; break;
	   			case 'A' : if (LetrasU.indexOf(tecla) == -1) return false; break;
	   			case 'a' : if (LetrasL.indexOf(tecla) == -1) return false; break;
	   			case 'Z' : if (Letras.indexOf(tecla) == -1) return false; break;
	   			case '*' : objeto.value = value; return true; break;
	   			default : return false; break;
	 		}
		}
		objeto.value = value; 
		return true;
	}
	
	/**
	 * Aplica uma Mácara aleatória a um determinada campo
	 */
	function Mascara(objeto, evt, mask) {
		var Numeros = '0123456789';
		var LetrasU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		var LetrasL = 'abcdefghijklmnopqrstuvwxyz';
		var Letras  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
		var Fixos  = '().-:/ '; 
		var Charset = " !\"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_/`abcdefghijklmnopqrstuvwxyz{|}~";
		
		evt = (evt) ? evt : (window.event) ? window.event : "";
		var value = objeto.value;
	
		if (evt) {
	 		var ntecla = (evt.which) ? evt.which : evt.keyCode;
	 		tecla = Charset.substr(ntecla - 32, 1);
	 		
	 		if (ntecla < 32) return true;
	
	 		var tamanho = value.length;
	 		
	 		if (tamanho >= mask.length) return false;
	
	 		var pos = mask.substr(tamanho,1); 
	 		
	 		while (Fixos.indexOf(pos) != -1) {
	  			value += pos;
	  			tamanho = value.length;
	  			
	  			if (tamanho >= mask.length) return false;
	  			
	  			pos = mask.substr(tamanho,1);
	 		}
	
	 		switch (pos) {
	 			case '@' : if (Numeros.indexOf(tecla) == -1 && Letras.indexOf(tecla) == -1) return false; break;
	   			case '#' : if (Numeros.indexOf(tecla) == -1) return false; break;
	   			case 'A' : if (LetrasU.indexOf(tecla) == -1) return false; break;
	   			case 'a' : if (LetrasL.indexOf(tecla) == -1) return false; break;
	   			case 'Z' : if (Letras.indexOf(tecla) == -1) return false; break;
	   			case '*' : objeto.value = value; return true; break;
	   			default : return false; break;
	 		}
		}
		objeto.value = value; 
		return true;
	}
	
	/**
	 * 
	 */
	function MascaraNumeracao(objeto, evt, mask) {
		var Letras  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
		var Numeros = '0123456789';
		var Fixos  = '().-:/ '; 
		var Charset = " !\"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_/`abcdefghijklmnopqrstuvwxyz{|}~";
		
		evt = (evt) ? evt : (window.event) ? window.event : "";
		var value = objeto.value;
		
		if (evt && mask != "") {
	 		var ntecla = (evt.which) ? evt.which : evt.keyCode;
	 		tecla = Charset.substr(ntecla - 32, 1);
	 		
	 		if (ntecla < 32) return true;
	
	 		var tamanho = value.length;
	 		
	 		if (tamanho >= mask.length) return false;
	
	 		var pos = mask.substr(tamanho,1); 
	 		
	 		while (Fixos.indexOf(pos) != -1) {
	  			value += pos;
	  			tamanho = value.length;
	  			
	  			if (tamanho >= mask.length) return false;
	  			
	  			pos = mask.substr(tamanho,1);
	 		}
	
	 		switch (pos) {
	   			case '#' : if (Numeros.indexOf(tecla) == -1) return false; break;
	   			case '*' : if (Letras.indexOf(tecla) == -1) return false; break;
	   			default : return false; break;
	 		}
		}
		objeto.value = value; 
		return true;
	}
	
	function MaskCEP(objeto, evt) { 
		return Mascara(objeto, evt, '#####-###');
	}
	
	function MaskValor(objeto, evt) { 
		return Mascara(objeto, evt, '###.###.###.###.###.###,00');
	}
	
	function MaskData(objeto, evt) { 
		return Mascara(objeto, evt, '##/##/####');
	}
	
	function MaskRG(objeto, evt) { 
		return Mascara(objeto, evt, '@@@@@@@@@@');
	}
	
	function MaskTelefone(objeto, evt) {
	    return Mascara(objeto, evt, '(##) ########');
	}
	
	function MaskAno(objeto, evt) {
	    return Mascara(objeto, evt, '####');
	}
	
	function MaskInteger(objeto, evt) {
	    return Mascara(objeto, evt, '#########');
	}
	
	function MaskDouble(objeto, evt) {
	    return Mascara(objeto, evt, '####################');
	}
	
	function MaskCPF(objeto, evt) {
	    return Mascara(objeto, evt, '###.###.###-##');
	}
	 
	function MaskCNPJ(objeto, evt) {
	    return Mascara(objeto, evt, '##.###.###/####-##');
	}
	
	/**
	 * Mascara Global
	 * Com possibilidade de receber valores dinamicos
	 * Exemplo: [###.]###,## ao digitar mais números o campo vai sendo mascarado com o valor entre []
	 * 
	 * @param objeto
	 * @param mascara
	 * @returns
	 */
	function mascaraGlobal(objeto, mascara) {
		if (objeto == null) {
			return;
		}
		valor = objeto.value;
		tvalor = "";
		ret = "";
		caracter = "#";
		separador = "|";
		mascara_utilizar = "";
		valor = removeEspacos(valor);
		if (valor == "")
			return valor;
		temp = mascara.split(separador);
		dif = 1000;
		valorm = valor;
		// tirando mascara do valor já existente
		for (i = 0; i < valor.length; i++) {
			if (!isNaN(valor.substr(i, 1))) {
				tvalor = tvalor + valor.substr(i, 1);
			}
		}
		valor = tvalor;
		// formatar mascara dinamica
		for (i = 0; i < temp.length; i++) {
			mult = "";
			validar = 0;
			for (j = 0; j < temp[i].length; j++) {
				if (temp[i].substr(j, 1) == "]") {
					temp[i] = temp[i].substr(j + 1);
					break;
				}
				if (validar == 1) {
					mult = mult + temp[i].substr(j, 1);
				}
				if (temp[i].substr(j, 1) == "[") {
					validar = 1;
				}
			}
			for (j = 0; j < valor.length; j++) {
				temp[i] = mult + temp[i];
			}
		}
		// verificar qual mascara utilizar
		if (temp.length == 1) {
			mascara_utilizar = temp[0];
			mascara_limpa = "";
			for (j = 0; j < mascara_utilizar.length; j++) {
				if (mascara_utilizar.substr(j, 1) == caracter) {
					mascara_limpa = mascara_limpa + caracter;
				}
			}
			tam = mascara_limpa.length;
		} else {
			// limpar caracteres diferente do caracter da máscara
			for (i = 0; i < temp.length; i++) {
				mascara_limpa = "";
				for (j = 0; j < temp[i].length; j++) {
					if (temp[i].substr(j, 1) == caracter) {
						mascara_limpa = mascara_limpa + caracter;
					}
				}
				if (valor.length > mascara_limpa.length) {
					if (dif > (valor.length - mascara_limpa.length)) {
						dif = valor.length - mascara_limpa.length;
						mascara_utilizar = temp[i];
						tam = mascara_limpa.length;
					}
				} else if (valor.length < mascara_limpa.length) {
					if (dif > (mascara_limpa.length - valor.length)) {
						dif = mascara_limpa.length - valor.length;
						mascara_utilizar = temp[i];
						tam = mascara_limpa.length;
					}
				} else {
					mascara_utilizar = temp[i];
					tam = mascara_limpa.length;
					break;
				}
			}
		}
		// validar tamanho da mascara de acordo com o tamanho do valor
		if (valor.length > tam) {
			valor = valor.substr(0, tam);
		} else if (valor.length < tam) {
			masct = "";
			j = valor.length;
			for (i = mascara_utilizar.length - 1; i >= 0; i--) {
				if (j == 0) {
					break;
				}
				if (mascara_utilizar.substr(i, 1) == caracter) {
					j--;
				}
				masct = mascara_utilizar.substr(i, 1) + masct;
			}
			mascara_utilizar = masct;
		}
		// mascarar
		j = mascara_utilizar.length - 1;
		for (i = valor.length - 1; i >= 0; i--) {
			if (mascara_utilizar.substr(j, 1) != caracter) {
				ret = mascara_utilizar.substr(j, 1) + ret;
				j--;
			}
			ret = valor.substr(i, 1) + ret;
			j--;
		}
		objeto.value = ret;
	}
	
	/**
	 * Revemo espaços em branco do valor
	 */
	function removeEspacos(valor) {
		var valorSemEspacos = "";
		if (valor != undefined) {
			var tamanho = valor.length;
			for (i = 0; i < 30; i++) {
				if (valor.substr(i, 1) != " ") {
					valorSemEspacos = valorSemEspacos + valor.substr(i, 1);
				}
			}
		}
		return valorSemEspacos;
	} 
	
	/**
	 * Seta foco no campo informado no parâmetro "campo".
	 */
	function setFoco(campo) {
		return document.getElementById(campo).focus();
	}
	
	/**
	 * Função responsável por buscas na página objetos do tipo SELECT e selecionar os itens
	 * dos mesmos.
	 */
	function selecionaSelectItens() {
		var select = document.getElementsByTagName("select");
		for (var i = 0; i < select.length; i ++) {
			if (select[i].multiple) {
				var options = select[i].options;
				for (var j = 0; j < options.length; j++) {
					options[j].selected = true;
				}
			}
		}
	}
	
	/**
	 * Função de autocomplete que associa dois componentes:
	 * Input type text
	 * Select
	 */
	function autoComplete (inputText, select, property, forcematch) {
		var found = false;
		
		for (var i = 0; i < select.options.length; i++) {
			if (select.options[i][property].toUpperCase().indexOf(inputText.value.toUpperCase()) == 0) {
				found = true;
				break;
			}
		}
		
		if (found) {
			select.selectedIndex = i;
		} else {
			select.selectedIndex = -1;
		}
		
		if (inputText.createTextRange) {
			if (forcematch && !found) {
				inputText.value = inputText.value.substring(0, inputText.value.length-1); 
				return;
			}
			var cursorKeys = "8;46;37;38;39;40;33;34;35;36;45;";
			if (cursorKeys.indexOf(event.keyCode+";") == -1) {
				var r1 = inputText.createTextRange();
				var oldValue = r1.text;
				var newValue = found ? select.options[i][property] : oldValue;
				if (newValue != inputText.value) {
					inputText.value = newValue;
					var rNew = inputText.createTextRange();
					rNew.moveStart('character', oldValue.length) ;
					rNew.select();
				}
			}
		}
	}

	/**
	 * Função para manipulação de Browser
	 */
	function BrowserDetect() {
		var ua = navigator.userAgent.toLowerCase(); 
	
		// browser engine name
		this.isGecko       = (ua.indexOf('gecko') != -1 && ua.indexOf('safari') == -1);
		this.isAppleWebKit = (ua.indexOf('applewebkit') != -1);
	
		// browser name
		this.isKonqueror   = (ua.indexOf('konqueror') != -1); 
		this.isSafari      = (ua.indexOf('safari') != - 1);
		this.isOmniweb     = (ua.indexOf('omniweb') != - 1);
		this.isOpera       = (ua.indexOf('opera') != -1); 
		this.isIcab        = (ua.indexOf('icab') != -1); 
		this.isAol         = (ua.indexOf('aol') != -1); 
		this.isIE          = (ua.indexOf('msie') != -1 && !this.isOpera && (ua.indexOf('webtv') == -1) ); 
		this.isMozilla     = (this.isGecko && ua.indexOf('gecko/') + 14 == ua.length);
		this.isFirebird    = (ua.indexOf('firebird/') != -1);
		this.isNS          = ( (this.isGecko) ? (ua.indexOf('netscape') != -1) : ( (ua.indexOf('mozilla') != -1) && !this.isOpera && !this.isSafari && (ua.indexOf('spoofer') == -1) && (ua.indexOf('compatible') == -1) && (ua.indexOf('webtv') == -1) && (ua.indexOf('hotjava') == -1) ) );
	   
		// spoofing and compatible browsers
		this.isIECompatible = ( (ua.indexOf('msie') != -1) && !this.isIE);
		this.isNSCompatible = ( (ua.indexOf('mozilla') != -1) && !this.isNS && !this.isMozilla);
	   
		// rendering engine versions
		this.geckoVersion = ( (this.isGecko) ? ua.substring( (ua.lastIndexOf('gecko/') + 6), (ua.lastIndexOf('gecko/') + 14) ) : -1 );
		this.equivalentMozilla = ( (this.isGecko) ? parseFloat( ua.substring( ua.indexOf('rv:') + 3 ) ) : -1 );
		this.appleWebKitVersion = ( (this.isAppleWebKit) ? parseFloat( ua.substring( ua.indexOf('applewebkit/') + 12) ) : -1 );
	   
		// browser version
		this.versionMinor = parseFloat(navigator.appVersion); 
	   
		// correct version number
		if (this.isGecko && !this.isMozilla) {
	      this.versionMinor = parseFloat( ua.substring( ua.indexOf('/', ua.indexOf('gecko/') + 6) + 1 ) );
		}
		else if (this.isMozilla) {
			this.versionMinor = parseFloat( ua.substring( ua.indexOf('rv:') + 3 ) );
		}
		else if (this.isIE && this.versionMinor >= 4) {
			this.versionMinor = parseFloat( ua.substring( ua.indexOf('msie ') + 5 ) );
		}
		else if (this.isKonqueror) {
			this.versionMinor = parseFloat( ua.substring( ua.indexOf('konqueror/') + 10 ) );
		}
		else if (this.isSafari) {
			this.versionMinor = parseFloat( ua.substring( ua.lastIndexOf('safari/') + 7 ) );
		}
		else if (this.isOmniweb) {
			this.versionMinor = parseFloat( ua.substring( ua.lastIndexOf('omniweb/') + 8 ) );
		}
		else if (this.isOpera) {
			this.versionMinor = parseFloat( ua.substring( ua.indexOf('opera') + 6 ) );
		}
		else if (this.isIcab) {
			this.versionMinor = parseFloat( ua.substring( ua.indexOf('icab') + 5 ) );
		}
	   
		this.versionMajor = parseInt(this.versionMinor); 
	   
		// dom support
		this.isDOM1 = (document.getElementById);
		this.isDOM2Event = (document.addEventListener && document.removeEventListener);
	   
		// css compatibility mode
		this.mode = document.compatMode ? document.compatMode : 'BackCompat';
	
		// platform
		this.isWin    = (ua.indexOf('win') != -1);
		this.isWin32  = (this.isWin && ( ua.indexOf('95') != -1 || ua.indexOf('98') != -1 || ua.indexOf('nt') != -1 || ua.indexOf('win32') != -1 || ua.indexOf('32bit') != -1 || ua.indexOf('xp') != -1) );
		this.isMac    = (ua.indexOf('mac') != -1);
		this.isUnix   = (ua.indexOf('unix') != -1 || ua.indexOf('sunos') != -1 || ua.indexOf('bsd') != -1 || ua.indexOf('x11') != -1);
		this.isLinux  = (ua.indexOf('linux') != -1);
	   
		// specific browser shortcuts
		this.isNS4x = (this.isNS && this.versionMajor == 4);
		this.isNS40x = (this.isNS4x && this.versionMinor < 4.5);
		this.isNS47x = (this.isNS4x && this.versionMinor >= 4.7);
		this.isNS4up = (this.isNS && this.versionMinor >= 4);
		this.isNS6x = (this.isNS && this.versionMajor == 6);
		this.isNS6up = (this.isNS && this.versionMajor >= 6);
		this.isNS7x = (this.isNS && this.versionMajor == 7);
		this.isNS7up = (this.isNS && this.versionMajor >= 7);
	   
		this.isIE4x = (this.isIE && this.versionMajor == 4);
		this.isIE4up = (this.isIE && this.versionMajor >= 4);
		this.isIE5x = (this.isIE && this.versionMajor == 5);
		this.isIE55 = (this.isIE && this.versionMinor == 5.5);
		this.isIE5up = (this.isIE && this.versionMajor >= 5);
		this.isIE6x = (this.isIE && this.versionMajor == 6);
		this.isIE6up = (this.isIE && this.versionMajor >= 6);
	   
		this.isIE4xMac = (this.isIE4x && this.isMac);
	}
	var browser = new BrowserDetect();

	/**
	 * Pega o id do departamento de um sugetionBox
	 * 
	 * @param suggestionBox
	 * @param idDiv
	 * @return
	 */
	function setDeparId(suggestionBox, idDiv) {
	    var items = suggestionBox.getSelectedItems();  
		if (items.length > 0) {
			document.getElementById(idDiv).value = items[0][2];//setando o valor no campo hidden 
	    }
		items = null;
	}
	
	function lowerDayDisableFunction(day) {
		var curDt = new Date();
		var curTp = day.date;
		curTp.setHours(0, 0, 0, 0);
		curDt.setHours(0, 0, 0, 0);
		if (curDt == undefined) {
			curDt = curTp.getDate;
		}
		return curDt.getTime() - curTp.getTime() <= 0;
	}
	
	function upperDayDisableFunction(day) {
		var curDt = new Date();
		var curTp = day.date;
		curTp.setHours(0, 0, 0, 0);
		curDt.setHours(0, 0, 0, 0);
		if (curDt == undefined) {
			curDt = curTp.getDate;
		}
		return curDt.getTime() - curTp.getTime() >= 0;
	}
    
	function lowerDayDisableClassProv(day) {
		var curDt = new Date();
		var curTp = day.date;
		curTp.setHours(0, 0, 0, 0);
		curDt.setHours(0, 0, 0, 0);
		if (curDt == undefined) {
			curDt = curTp.getDate;
		}
		if (curDt.getTime() - curTp.getTime() > 0) {
        	return 'richCalendarDayDisabled';
        }
        if (day.isWeekend) {
        	return 'weekendBold';
        }
        return '';
    }
	
	function upperDayDisableClassProv(day) {
		var curDt = new Date();
		var curTp = day.date;
		curTp.setHours(0, 0, 0, 0);
		curDt.setHours(0, 0, 0, 0);
		if (curDt == undefined) {
			curDt = curTp.getDate;
		}
		if (curDt.getTime() - curTp.getTime() < 0) {
        	return 'richCalendarDayDisabled';
        }
        if (day.isWeekend) {
        	return 'weekendBold';
        }
        return '';
	}

	function renderDataScroller(idLista) {
		var idDataScroller = idLista + "IdDataScroller";
		var scroller = RichFaces.$(idDataScroller);
		
		if (typeof(scroller) != 'undefined') {
			var lista = RichFaces.$(idLista);
			
			// Caso não seja um rich:dataTable
			if (typeof(lista) == 'undefined') {
				lista = document.getElementById(idLista);
			}
			
			// Para requisicoes ajax o dataScroller nao e atualizado
			// entao devemos verificar se a lista foi carregada
			if (typeof(lista) == 'undefined' || isEmpty(scroller.options.buttons)) {
				jQuery('#'+idDataScroller).hide();
			} else {
				// Se existir algum botao mostra o datascroller
				jQuery('#'+idDataScroller).show();
				return;
			}
		}
	}
	
	function isEmpty(obj) {
		for (var prop in obj) {
			if (obj.hasOwnProperty(prop)) {
				return false;
			}
		}
		return true;
	}
	
	/**
	 * funcoes para tratamento de view on / off
	 * @param idElement
	 * @return
	 */
	function displayOnOff(idElement) {
		try {
			var elementShown = document.getElementById(idElement);
			if (elementShown.style.display.length == 0 || elementShown.style.display == 'none') {
				displayOn(idElement);
			} else {
				displayOff(idElement);
			}
		} catch (e) {
			alert('A id buscada nao foi encontrada.\nErro:' + e );
		}
	}
	
	/**
	 * 
	 * @param idElement
	 * @return
	 */
	function displayOff(idElement) {
		try {
			var elementShown = document.getElementById(idElement);
			elementShown.style.display = 'none';
		} catch (e) {
			alert('A id buscada nao foi encontrada.\nErro:' + e );
		}
	}
	
	/**
	 * 
	 * @param idElement
	 * @return
	 */
	function displayOn(idElement) {
		try {
			var elementShown = document.getElementById(idElement);
			elementShown.style.display = 'block';
		} catch (e) {
			alert('A id buscada nao foi encontrada.\nErro:' + e );
		}
	}
	
	/**
	 * Funcoes utilizadas para gerenciamento do PickList no lado do cliente.
	 * As seis (6) funcoes abaixo sao responsaveis pelo gerenciamento dos options nos "select multiple boxes" utilizadas para ListShuttle.
	 * @param idTargetList
	 * @param idTargetListFake
	 * @param idBaseList
	 */
	function updateListFakeAndListSourceFromTargetList(idTargetList, idTargetListFake, idBaseList) {
		var optionsFromSelectTargetList = document.getElementById(idTargetList).options;
		var selectOneMenuFakeList = document.getElementById(idTargetListFake);
		var optionsFromSelectFakeList = selectOneMenuFakeList.options;
		selectOneMenuFakeList.length = 0;
		for (var i = 0; i < optionsFromSelectTargetList.length; i++) {
			if (optionsFromSelectTargetList[i].selected) {
				var newOptionTargetFakeList = optionsFromSelectTargetList[i].cloneNode(true);
				newOptionTargetFakeList.selected = false;
				selectOneMenuFakeList.appendChild(newOptionTargetFakeList);
			}
		}
		var selectOneMenuBaseList = document.getElementById(idBaseList);
		var optionsFromSelectBaseList = selectOneMenuBaseList.options;
		for (var i = 0; i < optionsFromSelectFakeList.length; i++) {
			for (var j = 0; j < optionsFromSelectBaseList.length; j++) {
				if (optionsFromSelectFakeList[i].value == optionsFromSelectBaseList[j].value) {
					selectOneMenuBaseList.removeChild(optionsFromSelectBaseList[j]);
				}
			}
		}
	}
	
	function exchangeElementListShuttleSource(idBaseList, idTargetListFake, idTargetList, justSelectedItens) {
		var selectOneMenuBase = document.getElementById(idBaseList);
		var selectOneMenuTargetFake = document.getElementById(idTargetListFake);
		var optionsFromSelectBase = selectOneMenuBase.options;
		var listElements = new Array();
		var aux = 0;
		for (var i = 0; i < optionsFromSelectBase.length; i++) {
			if (!justSelectedItens || optionsFromSelectBase[i].selected) {
				listElements[aux++] = i;
			}
		}
				
		addOptionItens(selectOneMenuTargetFake, selectOneMenuBase, listElements);
		removeOptionItens(selectOneMenuBase, listElements);
		
		updateListShuttleTarget(selectOneMenuTargetFake, document.getElementById(idTargetList));
	}
	
	function exchangeElementListShuttleTarget(idTargetListFake, idBaseList, idTargetList, justSelectedItens) {
		var selectOneMenuFake = document.getElementById(idTargetListFake);
		var optionsFromSelectFake = selectOneMenuFake.options;
		var listElements = new Array();
		var aux = 0;
		for (var i = 0; i < optionsFromSelectFake.length; i++) {
			if (!justSelectedItens || optionsFromSelectFake[i].selected) {
				listElements[aux++] = i;
			}
		}

		addOptionItens(document.getElementById(idBaseList), selectOneMenuFake, listElements);
		removeOptionItens(selectOneMenuFake, listElements);
		updateListShuttleTarget(selectOneMenuFake, document.getElementById(idTargetList));
	}
	
	function updateListShuttleTarget(selectItemFake, selectItemTarget) {
		var optionsFromSelectFake = selectItemFake.options;
		selectItemTarget.length = 0;
		for (var i = 0; i < optionsFromSelectFake.length; i++) {
			var newOptionSelectForTargetSelect = optionsFromSelectFake[i].cloneNode(true);
			newOptionSelectForTargetSelect.selected = true;
			selectItemTarget.appendChild(newOptionSelectForTargetSelect);
		}
	}
	
	function addOptionItens(selectOneMenuBase, selectOneMenuTarget, listElements) {
		for (var i = 0; i < listElements.length; i++) {
			selectOneMenuBase.appendChild(selectOneMenuTarget.options[listElements[i]].cloneNode(true));
		}
	}
	
	function removeOptionItens(selectBoxItens, listElements) {
		var initialSize = selectBoxItens.options.length;
		for (var i = 0; i < listElements.length; i++) {
			selectBoxItens.removeChild(selectBoxItens.options[(listElements[i] - (initialSize - selectBoxItens.options.length))]);
		}
	}
	
	/**
	 * Função para controlar tamanho comboBox Internet Explorer
	 */
	jQuery(document).ready(function() {
		// Apply this behavior for IE only
		if (!jQuery.browser.msie) {
			return;
		}

		var expand = function() {
			jQuery(this).css("width", "auto");	
			if (this.className == "dropdown") {
				jQuery(this).css("min-width", "245");
			} else if (this.className == "dropdownpequeno") {
				jQuery(this).css("min-width", "145");				
			}
		};

		var contract = function() {
			if (this.className == "dropdown") {
				jQuery(this).css("width", "245");		
			} else if (this.className == "dropdownpequeno") {
				jQuery(this).css("width", "145");		
			}
		};
		
    	// Add event listeners
		// Bug IE com RichFileUpdload não é possível adicionar função para o evento "change"
		// os arquivos selecionados no componente de upload são duplicados
		jQuery(document).on("mousedown", "select", expand).on("blur", "select", contract);
	});
	
	/**
	 * Objeto responsável por gerenciar fotos de determinado ponto do mouse, armazenando em determinado momento a os pontos X e Y.
	 * 1 - Para invocar o disparo de uma foto do mouse na janela, basta invocar SnapshotWindow.snapshot()
	 * 2 - Para invocar o ponto X do mouse armazenada no momento da foto, basta analisar o valor da propriedade mouseXposition invocando
	 * 	SnapshotWindow.mouseXposition e para o ponto Y SnapshotWindow.mouseYposition  
	 * @returns {SnapshotWindow}
	 */
	function SnapshotWindow() {
		this.mouseXposition = null;
		this.mouseYposition = null;
	}; 
	SnapshotWindow.snapshot = function () {
		jQuery(document).mousedown(function(e) {
			SnapshotWindow.mouseXposition = e.pageX;
			SnapshotWindow.mouseYposition = e.pageY;
		});
	};
	
	/**
	 * Força a abertura de uma nova aba do browser
	 */
	function targetBlank() {
		// Adiciona o target para o form
		jQuery('form').attr("target", "_blank");
		// Remove o target do form apos 1 segundo
		setTimeout("jQuery('form').removeAttr('target')", 1000);
	}
	
	/**
	 * Alteracao de estilo de linha de datatable em funcao dos
	 * eventos de mouse
	 */
	var dtStyle;
	function onMouseOverTable(obj) {
		dtStyle = obj.style.backgroundColor;
		obj.style.backgroundColor = "#F0E8D1";
	}

	function onMouseOutTable(obj) {
		obj.style.backgroundColor = dtStyle;
	}
	
	/**
	 * 
	 * @param e
	 * @returns {Boolean}
	 */
	function enterPressed(e) {
		var key = e.keyCode || e.which;
		return key == 13;
	}
	
	/**
	 * 
	 * @param objeto
	 * @param evento
	 * @returns
	 */
	function validaNumeroProtocolo(objeto, evento) {
		if (enterPressed(evento)) {
			findByBarCode();
			return false;
		}
	}
	
	function maskTelefone(idElement) {
		jQuery('#'+idElement).focusout(function() {
		    var phone, element;
		    element = jQuery(this);
		    element.unmask();
		    phone = element.val().replace(/\D/g, '');
		    if (phone.length > 10) {
		        element.mask("(99) 99999-999?9");
		    } else {
		        element.mask("(99) 9999-9999?9");
		    }
		}).trigger('focusout');
	}
	
	function isValidDate(sdata, isUpper, isLower) {
		if (sdata == null || sdata.length != 10) {
			return false;   
		}
		
		var data        = sdata;
		var dia         = data.substr(0,2);
		var mes         = data.substr(3,2);
		var ano         = data.substr(6,4);
		
		if (isNaN(parseInt(dia)) && isNaN(parseInt(mes)) && isNaN(parseInt(ano))) {
			return true;
		}
		if (dia > 31 || mes > 12) {
			return false;            
		}
		if ((mes == 4 || mes == 6 || mes == 9 || mes == 11) && dia == 31) {
			return false;
		}
		if (mes == 2 && (dia > 29 || (dia == 29 && ano % 4 != 0))) {
			return false;
		}
		
		return true;
	}
	
	/**
	 * Função para fixar o submit no momento que for executado o tecla ENTER
	 * Essa função resolve o problema de termos um so <form/>
	 * Utilizado especificamente para filtros de listagem
	 * Obs.: Todos os campos que estiverem envolvidos pelo formulario terão essa propriedade
	 */
	function fixEnter(idFormulario, idBotaoListar) {
		var checkEnter = function(event) {
			if (enterPressed(event)) {
				jQuery("#"+idBotaoListar).click();
	        	return false;
	        }
		};
		jQuery("#"+idFormulario).on("keypress", "input:text", checkEnter);
	}
	
	function replaceParams(string, replacements) {
	    return string.replace(/\{(\d+)\}/g, function() {
	        return replacements[arguments[1]];
	    });
	}
	
	function topScroll(id) {
		jQuery('html, body').animate({ scrollTop: $("#"+id).offset().top}, 1000);
	}	
	
	/**
	 * Bloqueia a inserção de espaços (Tecla SPACE) para o input
	 * 
	 * Eventos interceptados: PASTE e KEYUP
	 * 
	 * @param idInput
	 */
	function noSpace(idInput) {
		var removeSpace = function (event) {
			if (event.charCode == 32) {
				return false;
			} else {
				var t = $( this );
				if (t.val().match(/\s/g)) {
					t.val(t.val().replace(/\s/g,''));
					return false;
				}
			}
		};
		jQuery(document).on("change", "#"+idInput, removeSpace).on("keypress", "#"+idInput, removeSpace).on("keyup", "#"+idInput, removeSpace);
	}
	
	/**
	 * Limita o upload de arquivos que ultrapassam o limite definido nas configurações
	 * 
	 * @param idElement
	 * @param limiteMaximo
	 */
	function limiteFileUpload(idElement, limiteMaximo) {
		var checkLength = function () {
			var upFile = RichFaces.$(idElement);
			
			if (typeof(this.files) == 'undefined' || upFile == undefined) {
				return true;
			}
			
			var limiteMaximoMB = (limiteMaximo / 1024 / 1024);
			var nBytes = 0, 
			oFiles = this.files, 
			nFiles = oFiles.length;
			
			for (var nFileId = 0; nFileId < nFiles; nFileId++) {
				nBytes += oFiles[nFileId].size;
				var nMB = (nBytes / 1024 / 1024);
				if (nMB > limiteMaximoMB) {
					upFile.__removeAllItems();
					jAlert('Tamanho do arquivo maior que o permitido de ' + limiteMaximoMB + ' MB (Megabytes)', 'Aten\xE7\xE3o');
					//alert('Tamanho do arquivo maior que o permitido de ' + limiteMaximoMB + ' MB');
					return false;
				}			
			}
		}
		if (idElement.indexOf(":") != -1) {
			var idElementSplit = idElement.split(":");
			jQuery('#' + idElementSplit[0]).on("change", '#' + idElementSplit[0] + ' .rf-fu-inp', checkLength);
		} else {
			jQuery('#' + idElement).on("change", '#' + idElement + ' .rf-fu-inp', checkLength);
		}
	}
	
	/**
	 * Função utilizada para confirmar a exclusão de informação. A Função jConfirm é definida no plugin jQuery Alert Dialogs em "jquery.alerts.js". 
	 * A variável result é o resultado dos botões pressionado pelo usuário, se "Sim" chama a função remove que foi definida em algumas telas . xhtml utilizando o
	 *  <a4j:jsFunction>
	 * @param mensagemConfirmacao
	 * @param tipo
	 */
	
	function confirmarExclusao(mensagemConfirmacao, tipo) {
		jConfirm(mensagemConfirmacao, tipo, function(result) {
			if (result) {
				remove();
			} 
		});
	}
	
	/**
	 * Limpa o campo de seleção de itens do autocomplete
	 * 
	 * @param idComp
	 * @param event
	 */
	function limparAutoComplete(idComp, event) {
		var autocomplete = RichFaces.$(idComp);
		if (autocomplete != undefined) {
			autocomplete.__hide(event);			 
		}
	}
	
	/**
	 * Bloqueia o componente com o overlay
	 * 
	 * @param id
	 */
	function block(id) {
		var widthComp = jQuery('#'+id).width();
		jQuery('.overlay').css('width', widthComp).show();
		jQuery('.img-carregando').show();
	}
	
	/**
	 * Desbloqueia o componente de overlay
	 */
	function unblock() {
		jQuery('.overlay').hide();
		jQuery('.img-carregando').hide();
	}
	
	/**
	 * Adiciona o parâmetro de contador de requisição no form a ser submetido.
	 * Como a View tem vários form e o contador só pode ficar em um deles, quando um form que não tem
	 * o contador for submetido é necessário adicionar um parâmetro com o contador nele
	 * 
	 * @param form - Formulário que será submetido
	 */
    function prepareFormBlockDoubleRequest(form){
        var mainFormHidden = document.getElementById('docflowRequestCount');
        
        var hidden = document.createElement("input");
        hidden.id = "docflowRequestCountFormPopup";
        hidden.name = "docflowRequestCountFormPopup";
        hidden.type = "hidden";
        hidden.value = mainFormHidden.value;
       
        form.appendChild(hidden);
     }
