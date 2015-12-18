	/**
	 * Variável responsável por armazenar os itens atualmente selecionados no painel SELECTABLE.
	 */
	var selectedItems = new generic.list();
	/**
	 * Script para transformar os elementos div em componentes selecionaveis onde há um painel com a classe (style) denominada ".panelSelectable"
	 */
	jQuery(document).ready(function() {
		jQuery(".panelSelectable").selectable({
			selected: function(event, ui) {
				selectedItems.add(ui.selected.id);
			}
			, unselected: function(event, ui) {
				selectedItems.remove(ui.unselected.id);
			}
			, start: function(event, ui) {
				if (menuContextVar) menuContextVar.destroyClear(); 
			}
			, filter: 'div' , tolerance: 'touch'
		});
	});
