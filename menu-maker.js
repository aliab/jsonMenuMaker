/*

 External JSON html menu maker v1.0.0
 http://abdolahi.info

 Use this plug-in to easily load and make html "ul/li/a" menu

 Copyright (c) 2012 Ali Abdollahi - i@abdolahi.info
 Dual licensed under the MIT and GPL licenses, located in
 MIT-LICENSE.txt and GPL-LICENSE.txt respectively.
 

*/

/*
 * Examples:
 *
 *   $('#menu').jsonMenuManker('menu.json','menu',1);
 *
 * Note that the first argument is external JSON url, and second argument is the Node that you want to grab as a menu -
 * and third argument is boolean, and if it set to 1, the plug-in load all sub node's and else it will not load the sub node's.
 * please take a look at external JSON file, in the demo folder, to understand how to make JSON file. 
 *
 */ 

(function($){
	$.fn.jsonMenuManker = function(json,node,goToDeph){
		
		var el = this;
		var jsonAddress = json;
		var goToDeph = goToDeph;
		var startNode = 'data.'+node;
		
		$.getJSON(jsonAddress,function(e){
			data = e;
			startNode = eval(startNode);
			var mrMakers = function(node){
				var htmls = '';
				for(var i=0;i < node.length ; i++){
					var deph=0;
					if(node[i].sub && goToDeph == 1){
						var subhtml = mrMakers(node[i].sub);
						htmls += '<li><a href="'+ node[i].href +'">'+ node[i].name +'</a><ul>'+subhtml+'</ul></li>';
						deph++;
					}else{
						htmls += '<li><a href="'+ node[i].href +'">'+ node[i].name +'</a></li>';
					}
				}
				return htmls;
			}
			
			var line = mrMakers(startNode);
			
			// edit ul tag, to add custom class or Id to it
			el.html('<ul>'+line+'<div style="width:0;height:0;clear:both"></div></ul>');
		});
	}
})(jQuery)