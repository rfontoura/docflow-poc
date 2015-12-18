	/**
	 * Função para limpar o valor do input do select quando foca no campo
	 * 
	 * @param event
	 */
	function changeManualInput(event, idCombo) {
		var select = RichFaces.$(idCombo);
		setSelectAtivo(select);		
		if (select.selValueInput.val() != "") {
			setIdCurrentItem(select);
			select.input[0].value = "";
			select.__updateItems();
			scrollList(select);
			select.container.removeClass("rf-sel-fld-err");
		}
		var inputwidth = select.input.width() + 17;
		jQuery('.rf-sel-lst-scrl').css({"min-width": inputwidth+"px", "max-height": "300px"});
		var listItens = jQuery(document.getElementById(idCombo+'Items'));
		if (listItens.width() > inputwidth) {
			jQuery('.rf-sel-opt').css({"margin-right": "17px"});
		}
	};
	
	/**
	 * Função para limpar o item selecionado quando for digitado um texto
	 * 
	 * @param event
	 * @param idCombo
	 */
	function clearSelection(event, idCombo) {
		var code;
		if (event.keyCode) {
			code = event.keyCode;
		} else if (event.which) {
			code = event.which;
		}
		
		if (code != RichFaces.KEYS.DOWN && code != RichFaces.KEYS.UP 
				&& code != RichFaces.KEYS.RETURN && code != RichFaces.KEYS.TAB 
					&& code != RichFaces.KEYS.ESC) {
			
			var select = RichFaces.$(idCombo);
			// Scroll para o topo
			select.popupList.popup.find(".rf-sel-lst-scrl").scrollTop(0);
			// Desmarca o item selecionado
			select.list.resetSelection();
			// Habilita a função like do filtro
			CustomFilterSelect.enableLike = true;
		}
	}
	
	/**
	 * Função que resolve o valor que estava setado no input
	 */
	function blurManualInput(idCombo) {
		criarFuncaoTrim();
		var select = RichFaces.$(idCombo);
		var listSize = select.list.__getItems().length;
		// Desabilita a função like do filtro
		CustomFilterSelect.enableLike = false;
		
		// Se o usuário tenha selecionado um item e depois digitou um texto inválido ou incompleto
		if (select.selValueInput.val() != "") {
			var prevValue = select.selValueInput.val();
			var itemLabel = null;
			var currentIndex = -1;
			if (prevValue && prevValue != "") {
				jQuery.each(select.clientSelectItems, function(index) {
					if (this.value == prevValue) {
						itemLabel = this.label;
						currentIndex = index;
						return false;
					}
				});
			}
			if (select.__getValue() != "") {
				var invalidValue = select.list.index == -1;
				if (!invalidValue) {
					var item = select.list.getItemByIndex(select.list.index);
					if (select.__getValue().trim() != jQuery(item).text().trim()) {
						invalidValue = true;
					}
				}
			}
			if (itemLabel != null && (select.__getValue() == "" || listSize == 0 || invalidValue)) {
				if (listSize == 0) {
					select.container.removeClass("rf-sel-fld-err");
				}
				select.list.resetSelection();
				select.__setValue(itemLabel);
			} else {
				removerEspacos(select);
				
				// Seta o id do item corrent selecionado com o teclado
				setIdCurrentItem(select);
			}
		}
		// Se o usuário não selecionou nada e digitou um texto inválido ou incompleto
		else if (select.__getValue() != "" && (listSize == 0 || select.list.index == -1)) {
			if (listSize == 0) {
				select.container.removeClass("rf-sel-fld-err");
			}
			select.__setValue("");
		} else {
			removerEspacos(select);
			
			// Seta o id do item corrent selecionado com o teclado
			setIdCurrentItem(select);
		}
	};
	
	/**
	 * Verifica se o valor selecionado tem espaço em branco no incio ou no fim
	 * 
	 * Obs.: Esse espaço e removido porque no momente de comparar os valores
	 * a lista que está no cache não possui o espaço, com isso o valor não é selecionado
	 */
	function removerEspacos(select) {
		var value = select.__getValue();
		if (value.match(/^\s+|\s+$/g)) {
			// Remove os espaços em branco e salva o novo valor
			select.__setValue(value.trim());
			select.__save();
		}
	}
	
	/**
	 * Cria a função trim
	 * 
	 * Obs.: Somente o IE 8 que não existe a função trim()
	 */
	function criarFuncaoTrim() {
		if (typeof String.prototype.trim !== 'function') {
			String.prototype.trim = function() {
				return this.replace(/^\s+|\s+$/g, ''); 
			}
		}
	}
	
	/**
	 * Seta o id do item corrent selecionado com o teclado
	 * 
	 * @param select
	 */
	function setIdCurrentItem(select) {
		var prevLabel = select.__getValue();
		if (prevLabel != null) {
			var invalidItem = true;
			jQuery.each(select.clientSelectItems, function(index) {
				if (this.label == prevLabel) {
					setIndex(index);
					invalidItem = false;
					return false;
				}
			});
			if (invalidItem) {
				select.__setValue("");
			}
		}
	};
	
	var indexSelect = 0;
    function setIndex(index) {
    	indexSelect = index;
    };
    function getIndex() {
    	return indexSelect;
    };
    function scrollList(select) {
        var list = select.list,
            listDiv = select.popupList.popup.find(".rf-sel-lst-scrl"),
            selectedDivPos = jQuery(list.items[getIndex()]).position();  
        
        if (selectedDivPos != null) {
        	listDiv.scrollTop(selectedDivPos.top - 7);
        	var itemSelect = jQuery(list.items[getIndex()]);
        	if (itemSelect != null) {
        		select.list.__select(itemSelect);
        		itemSelect.addClass(select.options.selectItemCss);
        	}
    	}						            
    };
    
    
    /*---------------------------------------------------------------------------------*/
    
	var rExps=[
			{re: /[\xC0-\xC6]/g, ch: "A"},
			{re: /[\xE0-\xE6]/g, ch: "a"},
			{re: /[\xC8-\xCB]/g, ch: "E"},
			{re: /[\xE8-\xEB]/g, ch: "e"},
			{re: /[\xCC-\xCF]/g, ch: "I"},
			{re: /[\xEC-\xEF]/g, ch: "i"},
			{re: /[\xD2-\xD6]/g, ch: "O"},
			{re: /[\xF2-\xF6]/g, ch: "o"},
			{re: /[\xD9-\xDC]/g, ch: "U"},
			{re: /[\xF9-\xFC]/g, ch: "u"},
			{re: /[\xC7-\xE7]/g, ch: "c"},
			{re: /[\xD1]/g, ch: "N"},
			{re: /[\xF1]/g, ch: "n"}
		];

	/**
	 * Remove os caracters especiais
	 * 
	 * @param element
	 * @param search
	 * @returns
	 */
	function accent_fold(element, search) {
        if (!search) { return ''; }
        
        jQuery.each(rExps, function() {
        	element = element.replace(this.re, this.ch);
        	search = search.replace(this.re, this.ch);
        });
        
        return element.indexOf(search) != -1;
    };

    /**
	 * Função para filtrar o texto digitado
	 * 
	 * @param subString
	 * @param value
	 * @returns {Boolean}
	 */
    function customFilterFunction(subString, value) {
    	return CustomFilterSelect.filter(subString, value);
    }
    
    function CustomFilterSelect() {
		this.enableLike = true;
	}; 
	CustomFilterSelect.filter = function (subString, value) {
    	if (subString.length >= 1) {
    		if (CustomFilterSelect.enableLike) {
    			return accent_fold(value, subString);
    		} else {
    			return subString == value;
    		}
        } else {
        	return false;
        }						            
	};
	
	/**
	 * Armazena o select ativo
	 */
	var selectAtivo = null;
	function setSelectAtivo(select) {
		this.selectAtivo = select;
	}

	/**
	 * Função responsável por desabilitar os clicks nas bordas do componente select 
	 * Quando tem muitos items e clica nela a função onClick() ou onDblClick() 
	 * entram em loop e ocorre o travamento do componente
	 */
	jQuery(document).ready(function() {
		var preventFunc = function(event) {
			if (selectAtivo != null) {
				var item = selectAtivo.list.__getItem(event);
				if (item == undefined) {
					event.preventDefault();
					return false;
				}
			}
		};
		
		jQuery(".rf-sel-shdw").on("click", preventFunc).on("dblclick", preventFunc);
		jQuery(".rf-sel-lst-cord").on("click", preventFunc).on("dblclick", preventFunc);
	});
