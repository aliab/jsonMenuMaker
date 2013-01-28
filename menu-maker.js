/*
 External JSON html menu maker v1.0.1
 http://abdolahi.info

 Use this plug-in to easily load and make html "ul/li/a" menu

 Copyright (c) 2012 Ali Abdollahi - i@abdolahi.info
 Dual licensed under the MIT and GPL licenses, located in
 MIT-LICENSE.txt and GPL-LICENSE.txt respectively.
*/

/**
 * Examples:
 *
 *   $('#menu').jsonMenuMaker({
 *		json	: 'menu.json',
 *		node	: 'menu',
 *		nested	: 0
 *	});
 *
 * Note that the first argument is external JSON url, and second argument is the Node that you want to grab as a menu -
 * and third argument is boolean, and if it set to 1, the plug-in load all sub node's and else it will not load the sub node's.
 * please take a look at external JSON file, in the demo folder, to understand how to make JSON file. 
 *
 */ 

(function($){
	$.fn.jsonMenuMaker = function (usrOption) {
		
		var	opt = {
			json : undefined,
			node : undefined,
			nested : true
		}, _this = this;
	
		$.extend(true, opt, usrOption);

		var menuMaker = function (node) {
			var output = '';
			for (var i=0; i<node.length ; i++) {
				if (node[i].sub && !!opt.nested) {
					var subhtml = menuMaker(node[i].sub);
					output += '<li><a href="'+ node[i].href +'">'+ node[i].name +'</a><ul>'+subhtml+'</ul></li>\n';
				} else {
					output += '<li><a href="'+ node[i].href +'">'+ node[i].name +'</a></li>\n';
				}
			}
			return output;
		};
		
		$.getJSON(opt.json, function(data) {
			var json = (opt.node && data[opt.node]) ? data[opt.node] : data;
			var line = menuMaker(json);
			// edit ul tag, to add custom class or Id to it
			_this.html('<ul>'+line+'<div style="width:0;height:0;clear:both"></div></ul>');
		}).error(function(){
				_this.html('Unable to load JSON!');
		});

		return this;
	};
})(jQuery)