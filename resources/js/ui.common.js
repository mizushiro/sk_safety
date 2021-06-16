;(function($, win, doc, undefined) {

	'use strict';
	
	$plugins.common = {
		init: function(){
			//hover event
			$(document).on("touchstart", function(){ });

			//최소높이 설정
			$(win).on('resize', $plugins.common.contentHeight);
			this.contentHeight();

			$(win).off('scroll.win').on('scroll.win', function(){
				$plugins.common.sTop = $(this).scrollTop();
				
				if ($plugins.common.sTop > 10) {
					$('html').addClass('not-top');
				} else {
					$('html').removeClass('not-top');
				}
			});

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
		dragDel: function(){
			var $item = $('.ui-drag > .item');
			var s = 0;
			var n = 0;
			$item.on('touchstart', function(e){
				s = e.originalEvent.touches[0].pageX;
			});
			$item.on('touchmove', function(e){
				if ($(this).hasClass('open')) {
					n = 50 - (e.originalEvent.touches[0].pageX - s);
					n = n > 50 ? 50 : n < 0 ? 0 : n;
					$(this).find('.item-wrap').css('transform','translateX(-'+ n +'px)');
				} else {
					if ( s - e.originalEvent.touches[0].pageX > 10) {
						n = s - e.originalEvent.touches[0].pageX;
						n = n > 50 ? 50 : n < 0 ? 0 : n;
						$(this).find('.item-wrap').css('transform','translateX(-'+ n +'px)');
					} 
				}
			});
			$item.on('touchend', function(e){
				if (n < 25) {
					$(this).removeClass('open').find('.item-wrap').css('transform','translateX(0)');
				} else {
					$(this).addClass('open').find('.item-wrap').css('transform','translateX(-50px)');
				}
				s = 0;
				n = 0;
			});
		},
		contentHeight: function(){
			var $sp =  $('.ui-sp');
			var $target = $('.ui-height');

			var hh =  $('.base-header').length ? $('.base-header').outerHeight() : 0;
			var h = $(win).outerHeight() - hh;
			var add = 0;

			var type = $target.data('type');

			if (!!$sp.length) {
				for (var i = 0; i < $sp.length; i++) {
					if ($sp.eq(i).is(':visible')){
						add = $sp.eq(i).outerHeight() + add;
					}
				}
			}

			$target.css({
				'max-height': '100%',
				'min-height': 0
			});

			if (type === undefined || type === 'min') {
				$target.css('min-height', h - add + 'px');
			} else if (type === 'max') {
				$target.css('max-height', h - add + 'px');
			} else {
				$target.css({
					'max-height': h - add + 'px',
					'min-height': h - add + 'px'
				});
			}
		},
		header: function(){
			var _this = this;
			var tit  = $('.base-header').data('title');
			var type  = $('.base-header').data('type');
			
			console.log(type);
			switch (type) {
				case 'none':
					console.log(type);
					$('html').addClass('type-none');
					$('.base-header-wrap').remove();
					break;
				case 'normal':
					console.log(type);
					$('html').addClass('type-normal');
					$('.base-header-wrap .page-title .text').html(tit);
					break;
				case 'contalk':
					console.log(type);
					$('html').addClass('type-contalk');
					$('.base-header-wrap .page-title .text').html('Con-Talk');

					break;
			} 
			
		},
		navOpen: function(v){
			
		},
		footer: function(){
			console.log('footer load');
		}
	};


	
})(jQuery, window, document);
