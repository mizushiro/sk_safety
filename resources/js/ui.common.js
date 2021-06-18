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
				$plugins.common.pageTop($plugins.common.sTop);
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
			$plugins.uiTooltip();
			$('body').append('<button type="button" class="btn-top ui-top"><span class="a11y-hidden">상단으로 이동</span></button>');
			
			
			//event
			$('.ui-top').on('click', function(){
				$plugins.uiScroll({ 
					value: 0,
					speed: 300,
					target: 'html, body' 
				});
			});
			//직종
			$('.modal-typework').on('click', function(){
				$plugins.uiModalOpen({ 
					id: 'modal_typework', 
					mobileFull:true,
					src: '../modal/modal_typeWork.html', 
					ps: 'center', 
					closeCallback: function(v) { 
							console.log('close callback', v); 
					},
					callback: function(v) { 
							console.log('callback', v); 
							$plugins.uiTab({ 
								id:'exeWorkTab', 
								current:0, 
								callback:function(v){
									console.log(111111);
								} 
							});
					}
				});
			});
			//전자서명
			$('.btn-draw').on('click', function(){
				$plugins.uiModalOpen({ 
					id: 'modal_digitalsign', 
					src: '../modal/modal_digitalSign.html', 
					ps: 'center', 
					closeCallback: function(v) { 
							console.log('close callback', v); 
					},
					callback: function(v) { 
							console.log('callback', v); 
					}
				});
			});

		},
		pageTop: function(v){
			console.log(v);
			var current = v;

			if (v > 50) {
				$('html').addClass('is-FAB');

			} else {
				$('html').removeClass('is-FAB');
			}

		},
		dragDel: function(){
			var $item = $('.ui-drag > .item');
			var s = 0;
			var n = 0;
			var maxMove = 50;
			var j = 50; 
			var state = false;

			$item.off('touchstart.d').on('touchstart.d', function(e){
				s = e.originalEvent.touches[0].pageX;
			});
			$item.off('touchmove.d').on('touchmove.d', function(e){
				state = true;
				var m = e.originalEvent.touches[0].pageX;
				var $this = $(this);
				var $wrap = $this.find('.item-wrap');

				if (Math.abs(s - m) > j) {
					if ($(this).hasClass('open')) {
						n = maxMove + j - (m - s);
					} else {
						n = (s - m - j) / 2;
					}
					
					n = n > maxMove ? maxMove : n < 0 ? 0 : n;
					$wrap.css('transform','translateX(-'+ n +'px)');
				}
			});
			$item.off('touchend.d').on('touchend.d', function(e){
				var $this = $(this);
				var $wrap = $this.find('.item-wrap');
				
				if (state) {
					if (n < 25) {
						$this.removeClass('open');
						$wrap.css('transform','translateX(0)');
					} else {
						$this.addClass('open');
						$wrap.css('transform','translateX(-'+ maxMove +'px)');
					}
					s = 0;
					n = 0;
					state=false;
				}
			});
		},
		contentHeight: function(){
			var $sp =  $('.ui-sp');
			var $target = $('.ui-height');

			var hh =  $('.base-header').length ? $('.base-header').outerHeight() : 0;
			var h = $(win).outerHeight() - hh;
			var add = 0;

			$target.each(function(){
				var $this = $(this);
				var type = $this.data('type');

				if (!!$this.closest('.ui-modal').length) {
					h = $(win).outerHeight();
				}
			
				if (!!$sp.length) {
					for (var i = 0; i < $sp.length; i++) {
						if ($sp.eq(i).is(':visible')){
							add = $sp.eq(i).outerHeight() + add;
						}
					}
				}

				console.log(add, hh, h);

				$this.css({
					'max-height': '100%',
					'min-height': 0
				});

				if (type === undefined || type === 'min') {
					$this.css('min-height', h - add + 'px');
				} else if (type === 'max') {
					$this.css('max-height', h - add + 'px');
				} else {
					$this.css({
						'max-height': h - add + 'px',
						'min-height': h - add + 'px',
						'overflow-y' : 'auto'
					});
				}
			});

			
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
