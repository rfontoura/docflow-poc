
	//var $j = jQuery.noConflict();
	
	jQuery(document).ready(
	function() {
		if (jQuery(window).width() >= 1024) {
			// alert('Resolução de tela: 1024x768 ou maior');
			var top = jQuery('#menuacoes');
			
			if (top != null) {
				jQuery(window).scroll(function(event) {
					
					// se não existir o menu de ações na página não sera executado a função
					if (jQuery('#menuacoes') == null || jQuery('#menuacoes') != null && jQuery('#menuacoes')[0] == undefined) {
						return;
					}
					
					var menuHeight = jQuery('#menuacoesWrapper').height();
					var windowHeight = jQuery(window).height();
					
					// Verifica se a altura do menu (+padding) ultrapassou a altura da tela
					if (menuHeight + 5 > windowHeight) {
						//alert('Altura menu: '+menuHeight+' Altura Window: '+windowHeight);
						return;
					}
					
					var topDash = jQuery('#dashboard').offset().top;
		
					// what the y position of the scroll is
					var y = jQuery(this).scrollTop();
		
					if (topDash != top) {
						top = topDash;
					}
		
					// whether that's below the form
					if (y >= top) {
						// if so, ad the fixed class
						jQuery('#menuacoes').addClass('fixo');
						jQuery('#dashboard').addClass('padding');
		
					} else {
						// otherwise remove it
						jQuery('#menuacoes').removeClass('fixo');
						jQuery('#dashboard').removeClass('padding');
					}
				});
			}
		} else {
			//alert('Resolução menor que 1024x768');
			jQuery('#menuacoesWrapper').css("marginRight", "0");
		}
	});
	
	function ancora(id) {
		var panel = document.getElementById(id);
		if (panel != null) {
			var tempo = 1300;
			panel.style.border="2px solid #AAAAAA";
			jQuery('html,body').animate({scrollTop: jQuery('#'+id).offset().top}, tempo);
		}
	}
	
	function resetBorder(id) {
		try {
			var panel = document.getElementById(id);
			if (panel != null) {
				panel.style.border="1px solid #BBBBBB";
			}
		} catch(e) {}
	}
