/**
 * Copy Right: DataEasy Consultoria e Informatica Ltda.
 * JSscript based by: ...
 * 
 * jQuery plugin for Pretty looking Button Split Menu.
 *
 * Requires popup.js and popup.css to be included in your page. And jQuery, obviously.
 *
 */
var subMenu;
jQuery(document).ready(function() {
	jQuery( ".buttonSplitMenu" )
		.click(function() {
			if (jQuery( this ).next().is(':visible')) {
				jQuery( this ).next().hide();
			} else {
				if (subMenu != null) subMenu.hide();
				
				subMenu = jQuery( this ).next()
				.click(function() {
					jQuery(this).hide();
				})
				.show().position({
					of: this,
					my: "left top",
					at: "left bottom"
				});
			}
			return false;
		}).next().hide();
});
