/**
 * Copy Right: DataEasy Consultoria e Informatica Ltda.
 * JSscript based by: ...
 * 
 * jQuery plugin for Pretty looking right click context menu.
 *
 * Requires popup.js and popup.css to be included in your page. And jQuery, obviously.
 *
 * Icon needs to be 16x16. I recommend the Fugue icon set from: http://p.yusukekamiyamane.com/ 
 *
 * - Joe Walnes, 2011 http://joewalnes.com/
 *   https://github.com/joewalnes/jquery-simple-context-menu
 *
 * MIT License: https://github.com/joewalnes/jquery-simple-context-menu/blob/master/LICENSE.txt
 */
var menuContextVar = null;
function createMenu(menuData) {
    var menu = jQuery('<ul class=contextMenuPlugin></ul>').appendTo(document.body);
    menu.destroyClear = function() {
    	menu.fadeOut(75);
    	if (menu.bg) menu.bg.remove();
    };
    menu.bg = jQuery('<div></div>')
		.css({left:0, top:0, width:'100%', height:'100%', position:'absolute', zIndex:1000000})
		.appendTo(document.body)
		.bind('contextmenu click', function() {
			menu.destroyClear();
	        return false;
		});
    for (var i=0;i<menuData.items.length;i++) {
    	var item = menuData.items[i];
		if (item.divisor) {
    		var divisorRow = jQuery('<li></li>').appendTo(menu);
        	divisorRow.css({'margin':'5px 0px', 'height':'1px', 'background':'#D5D5D5'});
    	}
    	var row = jQuery('<li><span></span></li>').appendTo(menu);
    	row.find('span').css({'background-image':'url('+item.icon+')'});
    	row.find('span').text(item.label);
    	row.find('span').click(function(){
    		menu.destroyClear();
    	});
    	if (item.action) { row.find('span').click(item.action); }
    }
	return menu;
}
jQuery.fn.contextPopup = function(menuData) {
	this.bind('contextmenu', function(e) {
		if (menuContextVar) menuContextVar.fadeOut(75);
		menuContextVar = createMenu(menuData)
			.fadeIn(150)
			.css({zIndex:1000001, left:e.pageX + 5, top:e.pageY});
		return false;
	});
	return this;
};
