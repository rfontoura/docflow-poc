
/*
 * Layout:
 *  ______________________________
 * |__________head________________|} altura do head
 * |        |   |                 |
 * |        |   |                 |
 * |   ce   |dec|       cd        |
 * |        |   |                 |
 * |        |   |                 |
 * |________|__ |_________________|
 * ce = coluna esquerda
 * cd = coluna direita
 * dec = distancia entre colunas
 */

var dec = 30; // Declara e inicializa a constante "distancia entre colunas" (pixels)
var ah = 170; // Declara e inicializa a constante "altura do head" (pixels)

jQuery(document).ready( function() {
	
	var h = jQuery(window).height();
	var w = jQuery(window).width();
	
	jQuery("#majorColunaEsquerda").height(h - ah);
	jQuery("#majorColunaDireita").height(h - ah);
	jQuery("#panelOverflow").height((h - ah) - 50);
	
	var colEsqWidth = w * (20/100);
	
	jQuery("#majorColunaEsquerda").width(colEsqWidth);
	jQuery("#majorColunaDireita").width(w - (colEsqWidth+dec));
	
	jQuery("#majorColunaEsquerda").resizable({
		handles: 'e',
		resize: function(event, ui) {
			var larguraTotal = jQuery(window).width();
			var larguraColunaEsquerda = jQuery("#majorColunaEsquerda").width();
			
			var off = (((larguraColunaEsquerda+dec)/larguraTotal)*100);
			jQuery("#majorColunaDireita").width( larguraTotal * ((100-off)/100) );
		}
	});
});

jQuery(window).resize( function() {
	var height = jQuery(window).height() - top;
	if (height > 300) {
		jQuery("#majorColunaEsquerda").height(height);
		jQuery("#majorColunaDireita").height(height);
		jQuery("#panelOverflow").height(height - 50);
	}
	
	var larguraTotal = jQuery(window).width();
	var larguraColunaEsquerda = jQuery("#majorColunaEsquerda").width();
	
	var off = (((larguraColunaEsquerda+dec)/larguraTotal)*100);
	var widthCD = larguraTotal * ((100-off)/100);
	if (widthCD > 620) {
		jQuery("#majorColunaDireita").width(widthCD);
	}
});
