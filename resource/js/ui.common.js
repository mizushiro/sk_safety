;(function($, win, doc, undefined) {

	'use strict';
	
	$plugins.common = {
		init: function(){

			$plugins.uiAjax({ 
				id: $('.base-header'), 
				url:'./inc/header.html', 
				page:true, 
				callback:$plugins.common.header 
			});

			$plugins.uiAjax({ 
				id: $('.base-footer'), 
				url:'./inc/footer.html', 
				page:true, 
				callback:$plugins.common.footer 
			});

			

		},
		header: function(){
			
		},
		navOpen: function(v){
			
		},
		footer: function(){
			console.log('footer load');
		}
	};


	
})(jQuery, window, document);
