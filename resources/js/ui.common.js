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
				$plugins.ajax.init({ 
					id: $('.base-header'), 
					url:'../inc/header.html', 
					page:true, 
					callback:$plugins.common.header 
				});

				// $plugins.uiAjax({ 
				// 	id: $('.base-header'), 
				// 	url:'../inc/header.html', 
				// 	page:true, 
				// 	callback:$plugins.common.header 
				// });
			}
			if ($('.tab-bar').length) {
				console.log('tabbar');
				$plugins.ajax.init({ 
					id: $('.tab-bar'), 
					url:'../inc/tabbar.html', 
					page:true, 
					callback:$plugins.common.tabBar 
				});

				// $plugins.uiAjax({ 
				// 	id: $('.base-footer'), 
				// 	url:'../inc/footer.html', 
				// 	page:true, 
				// 	callback:$plugins.common.footer 
				// });
			}	

			$plugins.uiInputClear();
			$plugins.uiTooltip();
			$('body').append('<button type="button" class="btn-top ui-top"><span class="a11y-hidden">상단으로 이동</span></button>');
			
			
			//event
			$('.ui-top').on('click', function(){
				$plugins.scroll.move({ 
					value: 0,
					speed: 300,
					target: 'html, body' 
				});
			});
			//직종
			$('.modal-typework').on('click', function(){
				$plugins.uiModalOpen({ 
					id: 'modal_typework', 
					full:true,
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

			$('.ui-talkview').off('click.talk').on('click.talk', function(){
				var $this = $(this);
				var $item = $(this).closest('.talk-item');

				if (!$item.hasClass('view')) {
					$item.addClass('view');
				} else {
					$item.removeClass('view');
				}
			});

			$('.ui-notiview').off('click.talk').on('click.talk', function(){
				var $this = $(this);
				var $item = $(this).closest('.noti-wrap');

				if (!$item.hasClass('view')) {
					$item.addClass('view');
				} else {
					$item.removeClass('view');
				}
			});

			$('.ui-reply').off('click.reply').on('click.reply', function(){
				var $reply = $('.ui-talkreply');

				$reply.addClass('view');
				$plugins.common.contentHeight();
			});

			$('.ui-talkreply .ui-close').on('click.reply', function(){
				var $reply = $('.ui-talkreply');

				$reply.removeClass('view');
				$plugins.common.contentHeight();
			});

			$(document).on('click.tg', '.ui-toggle', function(){
				!$(this).hasClass('on') ? $(this).addClass('on') : $(this).removeClass('on');
			});

		},
		pageTop: function(v){
			var current = v;

			if (v > 50) {
				$('html').addClass('is-FAB');

			} else {
				$('html').removeClass('is-FAB');
			}

		},
		siteSelect: function() {
			$plugins.uiDropdown({ 
				id:'uiSiteSelect',
				ps: 'BR',
				openback:function() { console.log('open callback'); },
				closeback:function() { console.log('close callback'); } 
			});

			$('[data-id="uiSiteSelect"] .list-base button').off('click.site').on('click.site', function(){
				var v = $(this).data('tit');

				if ($('.ui-siteselect-result').prop('tagName') === 'INPUT') {
					$('.ui-siteselect-result').val(v);
				} else {
					$('.ui-siteselect-result').text(v);
				}
				
				$plugins.uiDropdownToggle({ 
					id:'uiSiteSelect',
					state: 'close' 
				});
			});
		},
		processSelect: function() {
			$plugins.uiDropdown({ 
				id:'uiProcessSelect',
				ps: 'BR',
				openback:function() { console.log('open callback'); },
				closeback:function() { console.log('close callback'); } 
			});

			$('[data-id="uiProcessSelect"] .list-base button').off('click.site').on('click.site', function(){
				//var v = $(this).data('tit');

				//if ($('.ui-siteselect-result').prop('tagName') === 'INPUT') {
				//	$('.ui-siteselect-result').val(v);
				//} else {
				//	$('.ui-siteselect-result').text(v);
				//}
				
				$plugins.uiDropdownToggle({ 
					id:'uiProcessSelect',
					state: 'close' 
				});
			});
		},
		dragDel: function(opt){
			var $item = $('.ui-drag > .item');
			var s = 0;
			var n = 0;
			var maxMove = 50;
			var j = 50; 
			var state = false;
			var callback = opt === undefined || opt.callback === undefined ? false : opt.callback;

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
						!!callback && callback();
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
			var nh =  $('.tab-bar').length ? $('.tab-bar').outerHeight() : 0;
			var h = $(win).outerHeight() - hh - nh;
			var add = 0;
			console.log(h);

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

				console.log(add, hh, h, $(win).outerHeight());

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
			var nav  = $('.base-header').data('nav');
			var $html = $('html');
			var $tit = $('.base-header-wrap .page-title .text');

			console.log(type);
			switch (type) {
				case 'none':
					//없음
					$html.addClass('type-none');
					$('.base-header-wrap').remove();
					break;

				case 'sub':
					//뒤로가기, 알림
					$html.addClass('type-sub');
					$tit.html(tit);
					break;

				case 'qr':
					//뒤로가기, qr코드
					$html.addClass('type-qr');
					$tit.html(tit);
					break;

				case 'alarm':
					//뒤로가기,알림설정
					$html.addClass('type-alarm');
					$tit.html(tit);
					break;

				case 'auth':
					//뒤로가기,콘톡,알림
					$html.addClass('type-auth');
					$tit.html(tit);
					break;

				case 'normal':
					//메뉴, 알림
					$html.addClass('type-normal');
					$tit.html(tit);
					$html.removeClass('nav-admin');
					$html.addClass('nav-normal');
					// if (nav === 'normal') {
					// 	$html.addClass('nav-normal');
					// } else if (nav === 'site') {
					// 	$html.addClass('nav-place');
					// }
					break;

				case 'admin':
					//메뉴,콘톡,알림
					$html.addClass('type-normal');
					$tit.html(tit);
					$html.removeClass('nav-normal');
					$html.addClass('nav-admin');
					// if (nav === 'normal') {
					// 	$html.addClass('nav-normal');
					// } else if (nav === 'site') {
					// 	$html.addClass('nav-place');
					// }
					break;

				case 'contalk':
					//뒤로가기,신문고,알림
					$html.addClass('type-contalk');
					$tit.html('Con-Talk');

					break;
				case 'worker':
					//뒤로가기,현장초대
					$html.addClass('type-worker');
					$tit.html(tit);

					break;
				case 'myworker':
						//뒤로가기,내보내기
						$html.addClass('type-myworker');
						$tit.html(tit);
	
						break;
				case 'out':
						//뒤로가기,선택해제
						$html.addClass('type-out');
						$tit.html(tit);
	
						break;
				case 'details':
					//뒤로가기,편집
					$html.addClass('type-details');
					$tit.html(tit);

					break;
				case 'modify':
						//취소,삭제
						$html.addClass('type-modify');
						$tit.html(tit);
	
						break;
				case 'list':
						//뒤로가기,작성
						$html.addClass('type-list');
						$tit.html(tit);
	
						break;
				case 'lists':
						//뒤로가기,작성
						$html.addClass('type-lists');
						$tit.html(tit);
	
						break;
			} 
			
		},
		navOpen: function(){
			var $body = $('body');
			$('.menu-body').off('transitionend.menu');
			$body.addClass('nav-ready');
			setTimeout(function(){
				$body.addClass('nav-open');
				$('a[disabled]').off('click.a').on('click.a', function(e){
					e.preventDefault();
					
				});

				$plugins.uiAccordion({
                    id:'accoNav',
                    current: null,
                    autoclose:false
                });
				for (var i = 0, len = $('.menu-body').length; i < len; i++) {
					
					var $mbody = $('.menu-body').eq(i);
					var w = $(win).outerHeight();
					var h = $mbody.find('.menu-header').outerHeight();
					var q = $mbody.find('.menu-qr').outerHeight();
					console.log($mbody.find('.nav-bottom').length)
					var f = $mbody.find('.nav-bottom').length > 0 ? $mbody.find('.nav-bottom').outerHeight() : 0;

					console.log(h,q,f);

					$mbody.find('.nav-list').css({
						'min-height': w - (h+q+f) + 'px',
						'max-height': w - (h+q+f) + 'px'
					})
				}
				
			},0);

			$plugins.common.dragDel({
                callback:function(){
                    $plugins.common.navClose({
						callback: function(){
							$('.menu-wrap .item-wrap').removeAttr('style');
						}
					});
                   
                }
            });

		},
		navClose: function(opt){
			var $body = $('body');
			var callback = opt && opt.callback && opt.callback;
			$body.removeClass('nav-open');

			$('.menu-body').on('transitionend.menu', function(){
				$body.removeClass('nav-ready');
				callback && callback();
			});
		

			
		},
		tabBar: function(){
			$('html').addClass('is-bar');
		},
		checkButton: function() {
			$('.btn-check').on('click', function(){
				console.log(!!$(this).hasClass('on'));
				if (!!$(this).hasClass('on')) {
					$(this).removeClass('on');
				} else {
					$(this).addClass('on');
				}
			});
		},
		
	};


	
})(jQuery, window, document);
