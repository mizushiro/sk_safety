;(function($, win, doc, undefined) {

	'use strict';
	
	$plugins.common = {
		init: function(){
			//hover event
			$(document).on("touchstart", function(){ });

			//최소높이 설정
			$(win).on('resize', $plugins.common.pageMinHeight);
			this.pageMinHeight();

			if ($('.base-header').length) {
				$plugins.uiAjax({ 
					id: $('.base-header'), 
					url:'../inc/header.html', 
					page:true, 
					callback:$plugins.common.header 
				});
			}
			if ($('.base-footer').length) {
				$plugins.uiAjax({ 
					id: $('.base-footer'), 
					url:'../inc/footer.html', 
					page:true, 
					callback:$plugins.common.footer 
				});
			}	

			$plugins.uiInputClear();
			

		},
		pageMinHeight: function(){
			var hh =  $('.base-header').length ? $('.base-header').outerHeight() : 0;
			var th =  $('.tit-page').length ? $('.tit-page').outerHeight() : 0;
			var min_h = $(win).outerHeight() - hh - th;

			$('.ui-minheight').css('min-height',min_h + 'px');
		},
		header: function(){
			var tit  = $('.base-header').data('title');
			
			$('.base-header-wrap .page-title').html(tit);
		},
		navOpen: function(v){
			
		},
		footer: function(){
			console.log('footer load');
		}
	};


	
})(jQuery, window, document);
