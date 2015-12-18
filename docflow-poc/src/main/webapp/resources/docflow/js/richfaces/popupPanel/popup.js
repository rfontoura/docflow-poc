	// Resolver conflito com jQuery
	//$j = jQuery.noConflict();
	// Tamanho default w considerado para a LARGURA da janela modal.
	var wDft = 32;
	// Tamanho default h considerado para a ALTURA da janela modal.
	var hDft = 33;
	// Coordenada x que indica a posição HORIZONTAL próximo ao menu ações.
	var xRMA = 215;
	// Coordenada y que indica a posição VERTICAL próximo ao menu ações.
	var yRMA = 145;
	
	/**
	 * Renderiza o popup com tamanho das PORCENTAGENS (w:h) sobre o tamanho da tela
	 * do usuário posicionado no TOPO da tela e centralizado. 
	 * 
	 * @param id - Identificador do popup. 
	 * @param w  - Valor numérico entre (1 e 100) que representa porcentagem da LARGURA sobre a tela do usuário.
	 * @param h  - Valor numérico entre (1 e 100) que representa porcentagem da ALTURA sobre a tela do usuário.
	 */
	function showModalTmDinTop(id, w, h){
		popupPanelTmDinamico(id, null, 1, w, h);
	}
	
	/**
	 * Renderiza o popup com tamanho das PORCENTAGENS (w:h) sobre o tamanho da tela
	 * do usuário posicionado no CENTRO da tela do usuário.
	 * 
	 * @param id - Identificador do popup. 
	 * @param w  - Valor numérico entre (1 e 100) que representa porcentagem da LARGURA sobre a tela do usuário.
	 * @param h  - Valor numérico entre (1 e 100) que representa porcentagem da ALTURA sobre a tela do usuário.
	 */
	function showModalTmDinCentro(id, w, h){
		popupPanelTmDinamico(id, null, null, w, h);
	}
	
	/**
	 * Renderiza o popup com tamanho das PORCENTAGENS (w:h) sobre o tamanho da tela
	 * do usuário posicionado ao lado do MENU DE AÇÕES.
	 * 
	 * @param id - Identificador do popup. 
	 * @param w  - Valor numérico entre (1 e 100) que representa porcentagem da LARGURA sobre a tela do usuário.
	 * @param h  - Valor numérico entre (1 e 100) que representa porcentagem da ALTURA sobre a tela do usuário.
	 */
	function showModalTmDinRente(id, w, h) {
		popupPanelTmDinamico(id, xRMA, yRMA, w, h);
	}
	
	/**
	 * Renderiza o popup de tamanho FIXO (w:h) no TOPO da tela centralizado. 
	 * 
	 * @param id - Identificador do popup. 
	 * @param w  - Valor numérico que representa LARGURA do popup em px.
	 * @param h  - Valor numérico que representa ALTURA do popup em px.
	 */
	function showModalTmFixoTop(id, w, h){
		popupPanelTmFixo(id, null, 1, w, h);
	}
	
	/**
	 * Renderiza o popup de tamanho FIXO (w:h) no TOPO da tela centralizado. 
	 * 
	 * @param id - Identificador do popup. 
	 * @param w  - Valor numérico que representa LARGURA do popup em px.
	 * @param h  - Valor numérico que representa ALTURA do popup em px.
	 * @param t  - Valor numérico que representa TEMPO que o popup será apresentado. Padrão:4 segundos
	 */
	function showModalMsgSucess(id, w, h, t){
		popupPanelTmFixo(id, null, 35, w, h, true);
		pulsePopup(id, 0.7);
		t = (t == null || t < 1 || t > 5) ? 4 : t;
		t = t * 1000
		setTimeout("closePopup('"+id+"')", t);
	}
	
	/**
	 * Função para fazer o efeito de pulsação do popup
	 * 
	 * @param idElement
	 * @param opacity
	 * @param speed
	 */
	function pulsePopup(idElement, opacity, speed) {
		opacity = opacity != null ? opacity : 0.5;
		speed = speed != null ? speed : 500;		
		
		RichFaces.$(idElement).cdiv.animate({opacity: opacity}, speed, function() {
			jQuery(this).animate({opacity: 1}, speed);
		});
	}
	
	/**
	 * Renderiza o popup de tamanho FIXO (w:h) no CENTRO da tela do usuário.
	 * 
	 * @param id - Identificador do popup. 
	 * @param w  - Valor numérico que representa LARGURA do popup em px.
	 * @param h  - Valor numérico que representa ALTURA do popup em px.
	 */
	function showModalTmFixoCentro(id, w, h) {
		if (id == 'modalStatusSubmit') { 
			w = 130;
		}
		popupPanelTmFixo(id, null, null, w, h);
	}
	
	/**
	 * Renderiza o popup de tamanho FIXO (w:h) no CENTRO da tela do usuário com temporizador.
	 * 
	 * @param id - Identificador do popup. 
	 * @param w  - Valor numérico que representa LARGURA do popup em px.
	 * @param h  - Valor numérico que representa ALTURA do popup em px.
	 */
	function showModalTmFixoCentroTime(id, w, h) {
		if (id == 'modalStatusSubmit') { 
			w = 130;
		}
		popupPanelTmFixo(id, null, null, w, h);
		setTimeout("closePopup('"+id+"')",3000);
	}
	
	/**
	 * Renderiza o popup de tamanho FIXO (w:h) ao lado do MENU DE AÇÕES. 
	 * 
	 * @param id - Identificador do popup. 
	 * @param w  - Valor numérico que representa LARGURA do popup em px.
	 * @param h  - Valor numérico que representa ALTURA do popup em px.
	 */
	function showModalTmFixoRente(id, w, h){
		popupPanelTmFixo(id, xRMA, yRMA, w, h);
	}
	function showModalTmFixoCenter(id, w, h){
		popupPanelTmFixo(id, null, 132, w, h);
	}
	
	/**
	 * Fecha o popup.
	 * 
	 * @param id - Identificador do popup. 
	 */
	function closePopup(id) {
		RichFaces.$(id).hide();
	}
	
	/**
	 * Função calcula o tamanho do popup de acordo com as porcentagens.
	 */
	function popupPanelTmDinamico(id, x, y, w, h) {
		// Captura o tamanho ta tela do usuário.
		var winW = jQuery(window).width();
		var winH = jQuery(window).height();
		
		// normaliza o tamanho do popup.
		w = w != null ? w : wDft;
		h = h != null ? h : hDft;
		
		// Calcula o tamanho do popup em px
		var width = winW*w/100;
		var height = winH*h/100;
			
		// Posição que o popup será rederizado na tela 
		var left = x != null ? x : winW/2-width/2;
		var top = y != null ? y : winH/2-height/2;

		show(id, left, top, width, height);
	}
	
	/**
	 * Função calcula o tamanho do popup de acordo com os parâmetros.
	 */
	function popupPanelTmFixo(id, x, y, w, h, modal) {
		// Captura o tamanho ta tela do usuário.
		var winW = jQuery(window).width();
		var winH = jQuery(window).height();
		
		w = w != null ? w : winW*wDft/100;
		h = h != null ? h : -1;
		
		// Posição que o popup será rederizado na tela 
		var left = x != null ? x : winW/2-w/2;
		var top = y != null ? y : (winH*0.25)*1.3;

		// Abrir a popUp
		show(id, left, top, w, h, modal);
	}  
	
	/**
	 * Mostra um modal no centro da tela.
	 */
	function popupPanelTmFixoCentro(id , w, h) {
		// Captura o tamanho ta tela do usuário.
		var winW = jQuery(window).width();
		var winH = jQuery(window).height();
		
		w = w != null ? w : winW*wDft/100;
		h = h != null ? h : -1;
		
		// Posição que o popup será rederizado na tela 
		var left = winW/2-w/2;
		var top =  winH/2-h/2;

		// Abrir a popUp
		show(id, left, top, w, h);
	}  
	
	/**
	 * Função que mostra um popUp de acordo com os parâmetros.
	 * 
	 * @param id 	 		 - Identificador do popup. 
	 * @param left	 		 - Valor numérico que indica a posição HORIZONTAL onde o popup será rederizado na tela. 
	 * @param top	 		 - Valor numérico que indica a posição VERTICAL onde o popup será rederizado na tela.
	 * @param width  		 - Valor numérico que representa LARGURA.
	 * @param height 		 - Valor numérico que representa ALTURA.
	 * @param removerMmodal  - Boolean indica se o popup vai ser um modal ou não
	 */
	function show(id, left, top, width, height, removerModal) {
		var popup = RichFaces.$(id);
		
		// Seta os parâmetros de rederização do popup
		popup.options.left = left;
		popup.options.top = top;
		popup.options.width = width;
		popup.options.height = height;
		
		// Abrir a popUp
		popup.show();
		
		// Remove a shadeDiv que bloqueia o popup
		if (removerModal != null && removerModal) {
			popup.shadeDiv.remove();
		}
	}
	
	/**
	 * Esta função tem o objetivo de atualizar as cordenadas informadas para o popup e reapresentar o mesmo na tela.
	 */
	function updateCoordinatesPopUp(idPopUpComponent, leftPosition, topPosition) {
		var popup = RichFaces.$(idPopUpComponent); 
		popup.hide();
		popup.options.left = leftPosition;
		popup.options.top = topPosition;
		popup.show();
	}
	
	/**
	 * Atualiza uma lista de Radios e Checks Box
	 * retornando verdadeiro somente o componente selecionado.
	 * Parâmetros: componente html
	 */
	function dataTableSelectAll(radio) {
	    var el = radio.form.elements;
	    for (var i = 0; i < el.length; i++) {
	    	if(el[i].checked){
	    		el[i].checked = false;
	    	}else{
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
	 * Marca ou desmarca todos os componentes em função da marcação de um.
	 * 
	 * Parâmetro: componente html
	 */
	function checkOrUncheckAll(comp) {
		var el = comp.form.elements;
		if (comp.checked) {
			for (var i = 0; i < el.length; i++) {
				if (el[i].type == "checkbox") {
					el[i].checked = true;
				}
			}
		} else {
			for (var i = 0; i < el.length; i++) {
				if (el[i].type == "checkbox") {
					el[i].checked = false;
				}
			}
		}
	}
	
	/**
	 * Marca ou desmarca todos os checkbox filhos do tbody atual
	 * 
	 * Parâmetro: componente html
	 */
	function checkOrUncheckAllTBody(comp) {
		var childrens = jQuery(comp).closest('tbody').children();
		childrens.find('td:first :checkbox').each(function() {
			this.checked = comp.checked;
		});
	}
	
	/**
	 * Marca ou desmarca somente os checkbox filhos do tbody atual
	 * 
	 * Parâmetro: componente html
	 */
	function checkOrUncheckThisTBody(comp) {
		var tbody = jQuery(comp).closest('tbody');
		tbody.find('td:first :checkbox').each(function() {
			this.checked = comp.checked;
		});
	}
	
	/**
	 * Atualiza uma lista de Radios e Checks Box
	 * retornando verdadeiro somente o componente selecionado.
	 * Parâmetros: componente html
	 */
	function dataTableSelectOneRadio(radio) {
		
	    var id = radio.name.substring(radio.name.lastIndexOf(':'));
	    var el = radio.form.elements;
	    for (var i = 0; i < el.length; i++) {
	        if (el[i].name.substring(el[i].name.lastIndexOf(':')) == id) {
	            el[i].checked = false;
	        }
	    }
	    radio.checked = true;
	}
	
	/**
	 * Modifica o Status das TAB'S na DashBoard
	 * @param id
	 * @return
	 */
	function swapNav(id){
		var allDivs = document.getElementsByTagName("div");
		for(var i=0; i < allDivs.length; i++){
			if(allDivs[i].className == 'navOn' || allDivs[i].className == 'navOff'){
				if(allDivs[i].id == id){
					allDivs[i].className = 'navOn';
				}else{ 
					allDivs[i].className = 'navOff';
				}
			}
		}
	}
	
	function atualizaTab(id) {
		document.getElementById(id).className = 'navOn';
	}
	
	/**
	 * A ideia e que se possa inserir registros a partir de um popup, para que o usuario nao tenha que sair no cadastro corrente para voltar em outra tela
	 * e so depois entao volte para o cadastro corrente, logo faz-se necessario que os cadastros em popups sao simples, com poucos campos a serem 
	 * informados.
	 * 
	 * @param idSelectOneMenu - O select box origem que será verificado o option corrente selecionado.
	 * @param idPopup - O id do popUp que será apresentado.
	 * @return
	 */
	var INCLUIR_NOVO_REGISTRO_POPUP = "incluirNovo";
	function popUpInsereNovoItemDecideItemNovo(selectOneMenu) {
		try {
			var optionsFromSelect = selectOneMenu.options;
			return optionsFromSelect[selectOneMenu.selectedIndex].value == INCLUIR_NOVO_REGISTRO_POPUP;
		} catch (e) {
			alert('Problemas com verificacao do select box: popUpInsereNovoItemDecideItemNovo: ' + e);
		}
	}
	function popUpInsereNovoItem(idSelectOneMenu, idPopup, widthPopup, heightPopup) {
		try {
			var selectOneMenu = document.getElementById(idSelectOneMenu);
			if(popUpInsereNovoItemDecideItemNovo(selectOneMenu)) {
				selectOneMenu.selectedIndex = '';
				showModalTmFixoCentro(idPopup, widthPopup, heightPopup);
			}
		} catch (e) {
			alert('Problemas com adicionar novo item: popUpInsereNovoItem: ' + e);
		}
	}
	function popUpInsereNovoItemInvoqueJsFunction(idSelectOneMenu, idPopup, jsFunctionExecuteServer, widthPopup, heightPopup) {
		try {
			var selectOneMenu = document.getElementById(idSelectOneMenu);
			if(popUpInsereNovoItemDecideItemNovo(selectOneMenu)) {
				jsFunctionExecuteServer();
				selectOneMenu.selectedIndex = '';
				showModalTmFixoCentro(idPopup, widthPopup, heightPopup);
			}
		} catch (e) {
			alert('Problemas com adicionar novo item: popUpInsereNovoItemInvoqueJsFunction: ' + e);
		}
	}

	/**
	 * Atualiza uma lista de Radios e Checks Box
	 * marcando a opção e validando a quantidade de itens selecionados
	 */
	function dataTableSelectCompWithMessage(comp, qtd, message, alert) {
		var count = 0;
		var id = comp.name.substring(comp.name.lastIndexOf(':'));
		var el = comp.form.elements;
	    for (var i = 0; i < el.length; i++) {
	        if (el[i].name.substring(el[i].name.lastIndexOf(':')) == id) {
	            if (el[i].checked) {
	            	count++;
	            }
	        }
	    }
	    if (count > qtd) {
	    	comp.checked = false;
	    	jAlert(message, alert);
	    }
	}