'use strict';

//Polyfill
if (!Object.create) {
	Object.create = function (o) {
		if (arguments.length > 1) {
			throw new Error('Sorry the polyfill Object.create only accepts the first parameter.');
		}
		function F() {}
		F.prototype = o;
		return new F();
	};
}
if (!Array.indexOf){ 
	Array.prototype.indexOf = function(obj){ 
		for(var i=0; i<this.length; i++){ 
			if(this[i]==obj){ return i; } 
		} 
		return -1; 
	};
}
if (!Array.prototype.forEach) {
	Array.prototype.forEach = function(callback,thisArg) {
		var T,k;
		if(this === null) {
			throw new TypeError('error');
		}
		var O = Object(this);
		var len = O.length >>> 0;
		if(typeof callback !== "function"){
			throw new TypeError('error');
		}
		if(arguments.length > 1){
			T = thisArg;
		}
		k = 0;
		while(k < len){
			var kValue;
			if(k in O) {
				kValue = O[k];
				callback.call(T, kValue, k, O);
			}
			k++;
		}
	};
}
if (!Array.isArray) {
	Array.isArray = function(arg){
		return Object.prototype.toString.call(arg) === '[object Array]';
	};
}
if (!Object.keys){
	Object.keys = (function() {
		'use strict';
		var hasOwnProperty = Object.prototype.hasOwnProperty,
			hasDontEnumBug = !({ toDtring : null }).propertyIsEnumerable('toString'),
			dontEnums = [
				'toString',
				'toLocaleString',
				'valueOf',
				'hasOwnProperty',
				'isPrototypeOf',
				'propertyIsEnumerable',
				'varructor'
			],
			dontEnumsLength = dontEnums.length;
		
		return function(obj) {
			if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
				throw new TypeError('Object.keys called on non=object');
			}
			var result = [], prop, i;
			for (prop in obj) {
				if (hasOwnProperty.call(obj, prop)) {
					result.push(prop);
				}
			}
			if (hasDontEnumBug) {
				for (i=0; i < dontEnumsLength; i++) {
					if (hasOwnProperty.call(obj, dontEnums[i])) {
						result.push(dontEnums[i]);
					}
				}
			}
			return result;
		};
	}()); 
}

//utils module
;(function ($, win, doc, undefined) {

	'use strict';

	var global = '$plugins';
	var namespace = 'netiveUI.plugins';
	
	//global namespace
	if (!!win[global]) {
		throw new Error("already exists global!> " + global);
	} else {
		win[global] = createNameSpace(namespace, {
			uiNameSpace: function (identifier, module) { 
				return createNameSpace(identifier, module); 
			}
		});
	}
	function createNameSpace(identifier, module) {
		var name = identifier.split('.'),
			w = win,
			p;

		if (!!identifier) {
			for (var i = 0, len = name.length; i < len; i += 1) {
				(!w[name[i]]) ? (i === 0) ? w[name[i]] = {} : w[name[i]] = {} : '';
				w = w[name[i]];
			}
		}

		if (!!module) {
			for (p in module) {
				if (!w[p]) {
					w[p] = module[p];
				} else {
					throw new Error("module already exists! >> " + p);
				}
			}
		}
		return w;
	}

	//requestAnimationFrame
	win.requestAFrame = (function () {
		return win.requestAnimationFrame || win.webkitRequestAnimationFrame || win.mozRequestAnimationFrame || win.oRequestAnimationFrame ||
			//if all else fails, use setTimeout
			function (callback) {
				return win.setTimeout(callback, 1000 / 60); //shoot for 60 fp
			};
	})();
	win.cancelAFrame = (function () {
		return win.cancelAnimationFrame || win.webkitCancelAnimationFrame || win.mozCancelAnimationFrame || win.oCancelAnimationFrame ||
			function (id) {
				win.clearTimeout(id);
			};
	})();

	//components option 
	win[global].option = {
		pageName: function() {
			var page = document.URL.substring(document.URL.lastIndexOf("/") + 1),
				pagename = page.split('?');

			return pagename[0]
		},
		keys: { 
			'tab': 9, 'enter': 13, 'alt': 18, 'esc': 27, 'space': 32, 'pageup': 33, 'pagedown': 34, 'end': 35, 'home': 36, 'left': 37, 'up': 38, 'right': 39, 'down': 40
		},
		effect: {
			//http://cubic-bezier.com - css easing effect
			linear: '0.250, 0.250, 0.750, 0.750',
			ease: '0.250, 0.100, 0.250, 1.000',
			easeIn: '0.420, 0.000, 1.000, 1.000',
			easeOut: '0.000, 0.000, 0.580, 1.000',
			easeInOut: '0.420, 0.000, 0.580, 1.000',
			easeInQuad: '0.550, 0.085, 0.680, 0.530',
			easeInCubic: '0.550, 0.055, 0.675, 0.190',
			easeInQuart: '0.895, 0.030, 0.685, 0.220',
			easeInQuint: '0.755, 0.050, 0.855, 0.060',
			easeInSine: '0.470, 0.000, 0.745, 0.715',
			easeInExpo: '0.950, 0.050, 0.795, 0.035',
			easeInCirc: '0.600, 0.040, 0.980, 0.335',
			easeInBack: '0.600, -0.280, 0.735, 0.045',
			easeOutQuad: '0.250, 0.460, 0.450, 0.940',
			easeOutCubic: '0.215, 0.610, 0.355, 1.000',
			easeOutQuart: '0.165, 0.840, 0.440, 1.000',
			easeOutQuint: '0.230, 1.000, 0.320, 1.000',
			easeOutSine: '0.390, 0.575, 0.565, 1.000',
			easeOutExpo: '0.190, 1.000, 0.220, 1.000',
			easeOutCirc: '0.075, 0.820, 0.165, 1.000',
			easeOutBack: '0.175, 0.885, 0.320, 1.275',
			easeInOutQuad: '0.455, 0.030, 0.515, 0.955',
			easeInOutCubic: '0.645, 0.045, 0.355, 1.000',
			easeInOutQuart: '0.770, 0.000, 0.175, 1.000',
			easeInOutQuint: '0.860, 0.000, 0.070, 1.000',
			easeInOutSine: '0.445, 0.050, 0.550, 0.950',
			easeInOutExpo: '1.000, 0.000, 0.000, 1.000',
			easeInOutCirc: '0.785, 0.135, 0.150, 0.860',
			easeInOutBack: '0.680, -0.550, 0.265, 1.550'
		},
		uiComma: function(n){
			//숫자 세자리수마다 , 붙이기
			var parts = n.toString().split(".");

			return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
		},
		partsAdd0 :function(x) {
			//숫자 한자리수 일때 0 앞에 붙이기
			return Number(x) < 10 ? '0' + x : x;
		}
	};

	//set device information
	(function () {
		var ua = navigator.userAgent;
		var maxTouchPoints = navigator.maxTouchPoints;
		var ie = ua.match(/(?:msie ([0-9]+)|rv:([0-9\.]+)\) like gecko)/i);
		var deviceInfo = ['android', 'iphone', 'ipod', 'ipad', 'blackberry', 'windows ce', 'samsung', 'lg', 'mot', 'sonyericsson', 'nokia', 'opeara mini', 'opera mobi', 'webos', 'iemobile', 'kfapwi', 'rim', 'bb10'];
		var filter = "win16|win32|win64|mac|macintel";
		var uAgent = ua.toLowerCase();
		var deviceInfo_len = deviceInfo.length;

		var browser = win[global].browser = {};
		var support = win[global].support = {};
		var i = 0;
		var version;
		var device;

		console.log(ua);

		for (i = 0; i < deviceInfo_len; i++) {
			if (uAgent.match(deviceInfo[i]) !== null) {
				device = deviceInfo[i];
				break;
			}
		}
		
		browser.local = (/^http:\/\//).test(location.href);
		browser.firefox = (/firefox/i).test(ua);
		browser.webkit = (/applewebkit/i).test(ua);
		browser.chrome = (/chrome/i).test(ua);
		browser.opera = (/opera/i).test(ua);
		browser.ios = (/ip(ad|hone|od)/i).test(ua);
		browser.android = (/android/i).test(ua);
		browser.safari = browser.webkit && !browser.chrome;
		browser.app = ua.indexOf('appname') > -1 ? true : false;

		//touch, mobile 환경 구분
		support.touch = browser.ios || browser.android || (doc.ontouchstart !== undefined && doc.ontouchstart !== null);
		browser.mobile = support.touch && ( browser.ios || browser.android);
		//navigator.platform ? filter.indexOf(navigator.platform.toLowerCase()) < 0 ? browser.mobile = false : browser.mobile = true : '';
		
		//false 삭제
		// for (j in browser) {
		// 	if (!browser[j]) {
		// 		delete browser[j]
		// 	}
		// }
		
		//os 구분
		browser.os = (navigator.appVersion).match(/(mac|win|linux)/i);
		browser.os = browser.os ? browser.os[1].toLowerCase() : '';

		//version 체크
		if (browser.ios || browser.android) {
			version = ua.match(/applewebkit\/([0-9.]+)/i);
			version && version.length > 1 ? browser.webkitversion = version[1] : '';
			if (browser.ios) {
				version = ua.match(/version\/([0-9.]+)/i);
				version && version.length > 1 ? browser.ios = version[1] : '';
			} else if (browser.android) {
				version = ua.match(/android ([0-9.]+)/i);
				version && version.length > 1 ? browser.android = parseInt(version[1].replace(/\./g, '')) : '';
			}
		}

		if (ie) {
			browser.ie = ie = parseInt( ie[1] || ie[2] );
			( 11 > ie ) ? support.pointerevents = false : '';
			( 9 > ie ) ? support.svgimage = false : '';
		} else {
			browser.ie = false;
		}

		var clsBrowser = browser.chrome ? 'chrome' : browser.firefox ? 'firefox' : browser.opera ? 'opera' : browser.safari ? 'safari' : browser.ie ? 'ie ie' + browser.ie : 'other';
		var clsMobileSystem = browser.ios ? "ios" : browser.android ? "android" : 'etc';
		var clsMobile = browser.mobile ? browser.app ? 'ui-a ui-m' : 'ui-m' : 'ui-d';

		//doc.querySelector('html').classList.add(browser.os, clsBrowser, clsMobileSystem, clsMobile);
		$('html').addClass(browser.os);
		$('html').addClass(clsBrowser);
		$('html').addClass(clsMobileSystem);
		$('html').addClass(clsMobile);

	})();


	/**
	 * ajax
	 */
	win[global].ajax = {
		options : {
			page: true,
			add: false,
			prepend: false,
			effect: false,
			loading:false,
			callback: false,
			errorCallback: false,
			type: 'GET',
			cache: false,
			async: true,
			contType: 'application/x-www-form-urlencoded',
			dataType: 'html'
		},
		init : function(opt){
			if (opt === undefined) {
				return false;
			}
			var xhr = new XMLHttpRequest();	
			var opt = opt === undefined ? {} : opt;
			opt = $.extend(true, {}, this.options, opt);
			
			var $id = typeof opt.id === 'string' ? $('#' + opt.id) : typeof opt.id === 'object' ? opt.id : $('body');
			var loading = opt.loading;
			var effect = opt.effect;
			var callback = opt.callback === undefined ? false : opt.callback;
			var errorCallback = opt.errorCallback === undefined ? false : opt.errorCallback;
	
			if (loading) {
				win[global].loading.show();
			}
	
			if (effect) {
				$id.removeClass('changeover action');
				$id.addClass('changeover');
			}

			xhr.open(opt.type, opt.url);
			xhr.setRequestHeader(opt.mimeType, opt.contType);
			xhr.send();
			xhr.onreadystatechange = function () {
				if (xhr.readyState !== XMLHttpRequest.DONE) {
					return;
				}

				if (xhr.status === 200) {
					if (loading) {
						win[global].loading.hide();
					}
	
					if (opt.page) {
						opt.add ? opt.prepend ? $id.prepend(xhr.responseText) : $id.append(xhr.responseText) : $id.html(xhr.responseText);
						callback && callback();
						effect && $id.addClass('action');
					} else {
						callback && callback(xhr.responseText);
					}

				} else {
					if (loading) {
						win[global].loading.hide();
					}
					errorCallback ? errorCallback() : '';
				}
			};
	
			// $.ajax({
			// 	type: opt.type,
			// 	url: opt.url,
			// 	cache: opt.cache,
			// 	async: opt.async,  
			// 	headers: {
			// 		"cache-control": "no-cache",
			// 		"pragma": "no-cache"
			// 	},
			// 	error: function (request, status, err) {
			// 		if (loading) {
			// 			win[global].uiLoading({
			// 				visible: false
			// 			});
			// 		}
			// 		errorCallback ? errorCallback() : '';
			// 	},
			// 	success: function (v) {
			// 		if (loading) {
			// 			win[global].uiLoading({
			// 				visible: false
			// 			});
			// 		}
	
			// 		if (opt.page) {
			// 			opt.add ? opt.prepend ? $id.prepend(v) : $id.append(v) : $id.html(v);
			// 			callback && callback();
			// 			effect && $id.addClass('action');
			// 		} else {
			// 			callback && callback(v);
			// 		}
			// 	},
			// 	complete: function(){
			// 	}
			// });
		}
	}

	/**
	 * toast
	 */
	win[global].toast = {
		timer : null,
		options : {
			delay: 'short',
			classname : ''
		},
		show : function(opt) {
			var opt = $.extend(true, {}, this.options, opt);
			var delay = opt.delay;
			var toast = '<div class="ui-toast toast '+ opt.classname +'">'+ opt.conts +'</div>';
			var $body = $('body');
			var time = delay === 'short' ? 2000 : 3500;

			if (delay === 'short') {
				time = 2000;
			} else if(delay === 'long') {
				time = 3500;
			} else {
				time = delay;
			}

			if (!!$('.ui-toast-ready').length) {
				clearTimeout(win[global].toast.timer);
				$body.removeClass('ui-toast-show').removeClass('ui-toast-ready');
				$('.ui-toast').off('transitionend.toastshow').remove();
			} 

			$body.append(toast);
			toast = null;
			
			var $shanckbar = $('.ui-toast');
			
			$body.addClass('ui-toast-ready');

			setTimeout(function(){
				$body.addClass('ui-toast-show');

				$shanckbar.off('transitionend.toasthide').on('transitionend.toastshow', function(){
					$(this).off('transitionend.toastshow').addClass('on');
					win[global].toast.timer = setTimeout(win[global].toast.hide, time);
				});
			},0);
		},
		hide : function(){
			var $body = $('body');
			
			clearTimeout(win[global].toast.timer);
			$body.removeClass('ui-toast-show');

			$('.ui-toast').off('transitionend.toastshow').on('transitionend.toasthide', function(){
				$(this).off('transitionend.toasthide').remove();
				$body.removeClass('ui-toast-ready');
			});
		}
	}

	/**
	* Create a scroll move
	*/
	win[global].scroll = {
		options : {
			value: 0,
			speed: 0,
			callback: false,
			ps: 'top',
			addLeft: false,
			focus: false,
			target: 'html, body'
		},
		move : function(opt){
			if (opt === undefined) {
				return false;
			}

			var opt = $.extend(true, {}, this.options, opt);
			var psVal = opt.value;
			var s = opt.speed;
			var c = opt.callback;
			var p = opt.ps;
			var addLeft = opt.addLeft;
			var overlap = false;
			var f = typeof opt.focus === 'string' ? $('#' + opt.focus) : opt.focus;
			var $target = typeof opt.target === 'string' ? $(opt.target) : opt.target;
			
			if (p === 'top') {
				$target.stop().animate({ 
						scrollTop : psVal 
					}, { 
						duration: s,
						step: function(now) { 
						!!c && now !== 0 ? c({ scrolltop:Math.ceil(now), complete:false }) : '';
					},
					complete: function(){
						if (overlap) {
							!!c ? c({ focus:f, complete:true }) : '';
							!!f ? f.attr('tabindex', 0).focus() : '';
						} else {
							overlap = true;
						}
					}
				});
			} else if (p === 'left') {
				$target.stop().animate({ 
						scrollLeft : psVal
					}, { 
						duration: s,
						step: function(now) { 
							!!c && now !== 0 ? c({ scrollleft:Math.ceil(now), complete:false }) : '';
					},
					complete: function(){
						!!c ? c({ focus:f, complete:true }) : '';
						!!f ? f.attr('tabindex', 0).focus() : '';
					}
				});
			} else if (p === 'center') {
				var w = $target.outerWidth();
	
				$target.stop().animate({ 
					scrollLeft : psVal - (w / 2) + addLeft
				}, { 
					duration: s,
					step: function(now) { 
						!!c && now !== 0 ? c({ scrollleft:Math.ceil(now), complete:false }) : '';
					},
					complete: function(){
						!!c ? c({ focus:f, complete:true }) : '';
						!!f ? f.attr('tabindex', 0).focus() : '';
					}
				});
			}
		}
	}

	/**
	 * parameter get
	 */
	win[global].para = {
		get: function(paraname){
			var _tempUrl = win.location.search.substring(1),
			_tempArray = _tempUrl.split('&'),
			_tempArray_len = _tempArray.length,
			_keyValue;

			for (var i = 0, len = _tempArray_len; i < len; i++) {
				_keyValue = _tempArray[i].split('=');

				if (_keyValue[0] === paraname) {
					return _keyValue[1];
				}
			}
		}
	}
	/**
	 * Focus Loop 
	 */
	win[global].focus = {
		options: {
			callback: false
		},
		loop : function(opt){
			if (opt === undefined) {
				return false;
			}

			var opt = $.extend(true, {}, this.options, opt);
			var $base = opt.selector;
			var callback = opt.callback;

			if(!$base.find('[class*="ui-focusloop-"]').length) {
				$base.prepend('<div tabindex="0" class="ui-focusloop-start"><span>시작지점입니다.</span></div>');
				$base.append('<div tabindex="0" class="ui-focusloop-end"><span>마지막지점입니다.</span></div>');
			}

			var $itemStart = $base.find('.ui-focusloop-start');
			var $itemEnd = $base.find('.ui-focusloop-end');
						
			$itemStart.off('keydown.loop').on('keydown.loop', function(e) {
				if (e.shiftKey && e.keyCode == 9) {
					e.preventDefault();
					$itemEnd.focus();
					!!callback && callback();
				}
			});
			$itemEnd.off('keydown.loop').on('keydown.loop', function(e) {
				if (!e.shiftKey && e.keyCode == 9) {
					e.preventDefault();
					$itemStart.focus();
					!!callback && callback();
				}
			});
		}
	}

	/**
	 * table caption/scroll(vertical)
	 */
	win[global].table = {
		caption: function(){
			var $cp = $('.ui-caption');

			$cp.text('');
			$cp.each(function(){
				var $table = $(this).closest('table');
				var isthead = !!$table.find('> thead').length;
				var $th = $(this).closest('table').find('> tbody th');
				var th_len = $th.length;
				var i = 0;
				var cp_txt = '';

				if (isthead) {
					$th = $(this).closest('table').find('> thead th');
					th_len = $th.length
				}

				for (i = 0; i < th_len; i++) {
					if ($th.eq(i).text() !== '') {
						cp_txt += $th.eq(i).text();
					}
					if (i < th_len - 1) {
						cp_txt += ', ';
					}
				}
				$(this).text(cp_txt + ' 정보입니다.');
			});
		}
	}

	/* ------------------------
	* accordion tab  
	* date : 2020-05-17
	------------------------ */
	win[global].accordion = {
		options: {
			current: null,
			autoclose: false,
			callback: false,
			add: false,
			level: 3,
			effect: win[global].option.effect.easeInOut,
			effTime: '.2'
		},
		init: function(opt){
			if (opt === undefined) {
				return false;
			}
	
			var opt = $.extend(true, {}, this.options, opt);
			var id = opt.id;
			var current = opt.current;
			var callback = opt.callback;
			var autoclose = opt.autoclose;
			var level = opt.level;
			var add = opt.add;

	
			var	$acco = $('#' + id),
				$wrap = $acco.children('.ui-acco-wrap'),
				$pnl = $wrap.children('.ui-acco-pnl'),
				$tit = $wrap.children('.ui-acco-tit'),
				$btn = $tit.find('.ui-acco-btn');
	
			var	len = $wrap.length, 
				keys = win[global].option.keys,
				optAcco;
	
			var para = win[global].para.get('acco'),
				paras,
				paraname;
	
			//set up
			if (!!para && !add) {
				if (para.split('+').length > 1) {
					//2 or more : acco=exeAcco1*2+exeAcco2*3
					paras = para.split('+');
	
					for (var j = 0; j < paras.length; j++ ) {
						paraname = paras[j].split('*');
						opt.id === paraname[0] ? current = [Number(paraname[1])] : '';
					}
				} else {
					//only one : tab=1
					 if (para.split('*').length > 1) {
						paraname = para.split('*');
						opt.id === paraname[0] ? current = [Number(paraname[1])] : '';
					} else {
						current = [Number(para)];
					}
				}
			}
	
			if (add) {
				current = [];
				var ss = JSON.parse(sessionStorage.getItem(id));
	
				autoclose = autoclose || ss.close;
	
				$acco.find('.ui-acco-btn.selected').each(function(){
					current.push($(this).closest('.ui-acco-wrap').index());
				});
				$btn.removeAttr('acco-last').removeAttr('acco-first');
	
				autoclose = $acco.data('opt').close;
				callback = $acco.data('opt').callback;
			}
	
			sessionStorage.setItem(id, JSON.stringify({ 'close': autoclose, 'current': current }) );
			win[global].uiAccordion[id] = callback;
	
			//set up
			!$pnl ? $pnl = $tit.children('.ui-acco-pnl') : '';
			$acco.data('opt', { 
				id: id, 
				close: autoclose, 
				callback: callback
			});
	
			for (var i = 0; i < len; i++) {
				var $wrap_i = $wrap.eq(i),
					$accotit = $wrap_i.find('> .ui-acco-tit'),
					$accopln = $wrap_i.find('> .ui-acco-pnl'),
					$accobtn = $accotit.find('.ui-acco-btn');
	
				if ($accotit.prop('tagName') !== 'DT') {
					$accotit.attr('role','heading');
					$accotit.attr('aria-level', level);
				}
				
				if (!$accopln) {
					$accopln = $accotit.children('.ui-acco-pnl');
				}
	
				($accotit.attr('id') === undefined) && $accobtn.attr('id', id + '-btn' + i);
				($accopln.attr('id') === undefined) && $accopln.attr('id', id + '-pnl' + i);
				
				$accobtn
					.data('selected', false)
					.attr('data-n', i)
					.attr('data-len', len)
					.attr('aria-expanded', false)
					.attr('aria-controls', $accopln.attr('id'))
					.removeClass('selected');
				$accopln
					.attr('data-n', i)
					.attr('data-len', len)
					.attr('aria-labelledby', $accobtn.attr('id'))
					.attr('aria-hidden', true).hide();
	
				(i === 0) && $accobtn.attr('acco-first', true);
				(i === len - 1) && $accobtn.attr('acco-last', true);
			}
			
			if (current !== null) {
				win[global].uiAccordionToggle({ 
					id: id, 
					current: current, 
					motion: false 
				});
			}
	
			//event
			$btn.off('click.uiaccotab keydown.uiaccotab')
				.on({
					'click.uiaccotab': evtClick,
					'keydown.uiaccotab': evtKeys
				});
	
			function evtClick(e) {
				if (!!$(this).closest('.ui-acco-wrap').find('.ui-acco-pnl').length) {
					e.preventDefault();
					var $this = $(this);
	
					optAcco = $this.closest('.ui-acco').data('opt');
					win[global].uiAccordionToggle({ 
						id: optAcco.id, 
						current: [$this.data('n')], 
						close: optAcco.close, 
						callback: optAcco.callback
					});
				}
			}
			function evtKeys(e) {
				var $this = $(this),
					n = Number($this.data('n')),
					m = Number($this.data('len')),
					id = $this.closest('.ui-acco').attr('id');
	
				switch(e.keyCode){
					case keys.up: upLeftKey(e);
					break;
	
					case keys.left: upLeftKey(e);
					break;
	
					case keys.down: downRightKey(e);
					break;
	
					case keys.right: downRightKey(e);
					break;
	
					case keys.end: endKey(e);
					break;
	
					case keys.home: homeKey(e);
					break;
				}
	
				function upLeftKey(e) {
					e.preventDefault();
					
					!$this.attr('acco-first') ?
					$('#' + id + '-btn' + (n - 1)).focus():
					$('#' + id + '-btn' + (m - 1)).focus();
				}
				function downRightKey(e) {
					e.preventDefault();
	
					!$this.attr('acco-last') ? 
					$('#' + id + '-btn' + (n + 1)).focus():
					$('#' + id + '-btn0').focus();
				}
				function endKey(e) {
					e.preventDefault();
	
					$('#' + id + '-btn' + (m - 1)).focus();
				}
				function homeKey(e) {
					e.preventDefault();
					$('#' + id + '-btn0').focus();
				}
			}
		}
	}

	win[global] = win[global].uiNameSpace(namespace, {
		uiAccordion: function (opt) {
			return createUiAccordion(opt);
		},
		uiAccordionToggle: function (opt) {
			return createUiAccordionToggle(opt);
		}
	});
	win[global].uiAccordion.option = {
		current: null,
		autoclose: false,
		callback: false,
		add: false,
		level: 3,
		effect: win[global].option.effect.easeInOut,
		effTime: '.2'
	};
	function createUiAccordion(opt){
		if (opt === undefined || !$('#' + opt.id).length) {
			return false;
		}

		var opt = $.extend(true, {}, win[global].uiAccordion.option, opt),
			id = opt.id,
			current = opt.current,
			callback = opt.callback,
			autoclose = opt.autoclose,
			level = opt.level,
			add = opt.add,
			effect = opt.effect,
			effTime = opt.effTime;

		var	$acco = $('#' + id),
			$wrap = $acco.children('.ui-acco-wrap'),
			$pnl = $wrap.children('.ui-acco-pnl'),
			$tit = $wrap.children('.ui-acco-tit'),
			$btn = $tit.find('.ui-acco-btn');

		var	len = $wrap.length, 
			keys = win[global].option.keys,
			optAcco;

		var para = win[global].para.get('acco'),
			paras,
			paraname;

		//set up
		if (!!para && !add) {
			if (para.split('+').length > 1) {
				//2 or more : acco=exeAcco1*2+exeAcco2*3
				paras = para.split('+');

				for (var j = 0; j < paras.length; j++ ) {
					paraname = paras[j].split('*');
					opt.id === paraname[0] ? current = [Number(paraname[1])] : '';
				}
			} else {
				//only one : tab=1
			 	if (para.split('*').length > 1) {
					paraname = para.split('*');
					opt.id === paraname[0] ? current = [Number(paraname[1])] : '';
				} else {
					current = [Number(para)];
				}
			}
		}

		if (add) {
			current = [];
			var ss = JSON.parse(sessionStorage.getItem(id));

			autoclose = autoclose || ss.close;

			$acco.find('.ui-acco-btn.selected').each(function(){
				current.push($(this).closest('.ui-acco-wrap').index());
			});
			$btn.removeAttr('acco-last').removeAttr('acco-first');

			autoclose = $acco.data('opt').close;
			callback = $acco.data('opt').callback;
		}

		sessionStorage.setItem(id, JSON.stringify({ 'close': autoclose, 'current': current, 'effTime':effTime, 'effect':effect }) );
		win[global].uiAccordion[id] = callback;

		//set up
		!$pnl ? $pnl = $tit.children('.ui-acco-pnl') : '';
		$acco.data('opt', { 
			id: id, 
			close: autoclose, 
			callback: callback
		});

		for (var i = 0; i < len; i++) {
			var $wrap_i = $wrap.eq(i),
				$accotit = $wrap_i.find('> .ui-acco-tit'),
				$accopln = $wrap_i.find('> .ui-acco-pnl'),
				$accobtn = $accotit.find('.ui-acco-btn');

			if ($accotit.prop('tagName') !== 'DT') {
				$accotit.attr('role','heading');
				$accotit.attr('aria-level', level);
			}
			
			if (!$accopln) {
				$accopln = $accotit.children('.ui-acco-pnl');
			}

			($accotit.attr('id') === undefined) && $accobtn.attr('id', id + '-btn' + i);
			($accopln.attr('id') === undefined) && $accopln.attr('id', id + '-pnl' + i);
			
			$accobtn
				.data('selected', false)
				.attr('data-n', i)
				.attr('data-len', len)
				.attr('aria-expanded', false)
				.attr('aria-controls', $accopln.attr('id'))
				.removeClass('selected');
			$accopln
				.attr('data-n', i)
				.attr('data-len', len)
				.attr('aria-labelledby', $accobtn.attr('id'))
				.attr('aria-hidden', true).hide();

			(i === 0) && $accobtn.attr('acco-first', true);
			(i === len - 1) && $accobtn.attr('acco-last', true);
		}
		
		if (current !== null) {
			win[global].uiAccordionToggle({ 
				id: id, 
				current: current, 
				motion: false 
			});
		}

		//event
		$btn.off('click.uiaccotab keydown.uiaccotab')
			.on({
				'click.uiaccotab': evtClick,
				'keydown.uiaccotab': evtKeys
			});

		function evtClick(e) {
			if (!!$(this).closest('.ui-acco-wrap').find('.ui-acco-pnl').length) {
				e.preventDefault();
				var $this = $(this);

				optAcco = $this.closest('.ui-acco').data('opt');
				win[global].uiAccordionToggle({ 
					id: optAcco.id, 
					current: [$this.data('n')], 
					close: optAcco.close, 
					callback: optAcco.callback
				});
			}
		}
		function evtKeys(e) {
			var $this = $(this),
				n = Number($this.data('n')),
				m = Number($this.data('len')),
				id = $this.closest('.ui-acco').attr('id');

			switch(e.keyCode){
				case keys.up: upLeftKey(e);
				break;

				case keys.left: upLeftKey(e);
				break;

				case keys.down: downRightKey(e);
				break;

				case keys.right: downRightKey(e);
				break;

				case keys.end: endKey(e);
				break;

				case keys.home: homeKey(e);
				break;
			}

			function upLeftKey(e) {
				e.preventDefault();
				
				!$this.attr('acco-first') ?
				$('#' + id + '-btn' + (n - 1)).focus():
				$('#' + id + '-btn' + (m - 1)).focus();
			}
			function downRightKey(e) {
				e.preventDefault();

				!$this.attr('acco-last') ? 
				$('#' + id + '-btn' + (n + 1)).focus():
				$('#' + id + '-btn0').focus();
			}
			function endKey(e) {
				e.preventDefault();

				$('#' + id + '-btn' + (m - 1)).focus();
			}
			function homeKey(e) {
				e.preventDefault();
				$('#' + id + '-btn0').focus();
			}
		}
	}
	function createUiAccordionToggle(opt){
		if (opt === undefined) {
			return false;
		}
		
		var id = opt.id,
			$acco = $('#' + id),
			dataOpt = $acco.data('opt'),
			current = opt.current === undefined ? null : opt.current,
			callback = opt.callback === undefined ? dataOpt.callback : opt.callback,
			state = opt.state === undefined ? 'toggle' : opt.state,
			motion = opt.motion === undefined ? true : opt.motion,
			autoclose = dataOpt.close,
			open = null,
			$wrap = $acco.children('.ui-acco-wrap'),
			$pnl,
			$tit,
			$btn,
			len = $wrap.length,
			speed = 200,
			i, c = 0;
		
		(motion === false) ? speed = 0 : speed = 200;

		if (current !== 'all') {
			for (i = 0 ; i < current.length; i++) {
				$pnl = $wrap.eq(current[i]).children('.ui-acco-pnl');
				$tit = $wrap.eq(current[i]).children('.ui-acco-tit');
				$btn = $tit.find('.ui-acco-btn');
				
				if (state === 'toggle') {
					(!$btn.data('selected')) ? act('down') : act('up');
				} else {
					(state === 'open') ? act('down') : (state === 'close') ? act('up') : '';
				}
			}
			!callback ? '' :
				callback({ 
					id:id, 
					open:open, 
					current:current
				});
		} else if (current === 'all') {
			checking();
		}

		function checking() {
			//열린상태 체크하여 전체 열지 닫을지 결정
			c = 0;
			$wrap.each(function(i){
				c = ($wrap.eq(i).find('> .ui-acco-tit .ui-acco-btn').attr('aria-expanded') === 'true') ? c + 1 : c + 0;
			});
			//state option 
			if (state === 'open') {
				c = 0;
				$acco.data('allopen', false);
			} else if (state === 'close') {
				c = len;
				$acco.data('allopen', true);
			}
			//all check action
			if (c === 0 || !$acco.data('allopen')) {
				$acco.data('allopen', true);
				act('down');
			} else if (c === len || !!$acco.data('allopen')) {
				$acco.data('allopen', false);
				act('up');
			}
		}
		function act(v) {
			var isDown = v === 'down',
				a = isDown ? true : false, 
				cls = isDown ? 'addClass' : 'removeClass', 
				updown = isDown ? 'slideDown' : 'slideUp';
			
			open = isDown ? true : false;

			if (autoclose === true && isDown) {
				$wrap.each(function(i){
					$wrap.eq(i).find('> .ui-acco-tit .ui-acco-btn').data('selected', false).removeClass('selected').attr('aria-expanded', false);
					$wrap.eq(i).find('> .ui-acco-pnl').attr('aria-hidden',true).stop().slideUp(speed);
				});
			}

			if (current === 'all') {
				$wrap.each(function(i){
					$wrap.eq(i).find('> .ui-acco-tit .ui-acco-btn').data('selected', a)[cls]('selected').attr('aria-expanded', a);
					$wrap.eq(i).find('> .ui-acco-pnl').attr('aria-hidden', !a).stop()[updown](speed, function(){
						$(this).css({ height: '', padding: '', margin: '' }); 
					});
				});
			} else {
				$btn.data('selected', a).attr('aria-expanded', a)[cls]('selected');
				$pnl.attr('aria-hidden', !a).stop()[updown](speed, function(){
					$(this).css({ height: '', padding: '', margin: '' }); 
				});
			}
		}
	}


	/* ------------------------
	* name : dropdown
	* date : 2020-06-10
	------------------------ */	
	win[global] = win[global].uiNameSpace(namespace, {
		uiDropdown: function (opt) {
			return createUiDropdown(opt);
		},
		uiDropdownToggle: function (opt) {
			return createUiDropdownToggle(opt);
		},
		uiDropdownHide: function () {
			return createUiDropdownHide();
		},
	});
	win[global].uiDropdown.option = {
		ps: 'BL',
		hold: true,
		dropSpace: $('body'),
		dropSrc: false,
		dropOffset: false,
		openback:false,
		closeback:false
	};
	function createUiDropdown(opt){
		if (opt === undefined || !$('#' + opt.id).length) {
			return false;
		}

		var opt = $.extend(true, {}, win[global].uiDropdown.option, opt),
			id = opt.id,
			ps = opt.ps,
			hold = opt.hold,
			dropSpace = opt.dropSpace,
			dropSrc = opt.dropSrc,
			dropOffset = opt.dropOffset,
			openback = opt.openback,
			closeback = opt.closeback;

		if (!!dropSrc && !$('[data-id="' + opt.id + '"]').length) {
			$plugins.uiAjax({
				id: dropSpace,
				url: dropSrc,
				add: true,
				callback: function(){
					setDropdown();
				}
			});
		} else {
			setDropdown();
		}
		
		function setDropdown(){
			var $btn = $('#' + id),
				$pnl = $('[data-id="'+ id +'"]'); 

			//set up
			$btn.attr('aria-expanded', false)
				.data('opt', { 
					id: id, 
					ps: ps,
					hold: hold, 
					openback: openback,
					closeback: closeback,
					dropOffset: dropOffset
				});
			$pnl.attr('aria-hidden', true).attr('aria-labelledby', id).addClass(ps)
				.data('opt', { 
					id: id, 
					ps: ps,
					hold: hold, 
					openback: openback,
					closeback: closeback,
					dropOffset: dropOffset
				});
			
			//event
			$btn.off('click.dp').on('click.dp', function(e){
				action(this);
			});
			$(doc).find('.ui-drop-close').off('click.dp').on('click.dp', function(e){
				var pnl_opt = $('#' + $(this).closest('.ui-drop-pnl').data('id')).data('opt');
				win[global].uiDropdownToggle({ 
					id: pnl_opt.id 
				});
				$('#' + pnl_opt.id).focus();
			})

			//dropdown 영역 외에 클릭 시 
			$(doc).off('click.dpb').on('click.dpb', function(e){
				if (!!$('body').data('dropdownOpened')){
					if ($(doc).find('.ui-drop-pnl').has(e.target).length < 1) {
						win[global].uiDropdownHide();
					}
				}
			});

			function action(t) {
				var $this = $(t),
					btn_opt = $this.data('opt');

				$this.data('sct', $(doc).scrollTop());
				win[global].uiDropdownToggle({ 
					id: btn_opt.id 
				});
			}
		}
	}
	function createUiDropdownToggle(opt){
		if (opt === undefined) {
			return false;
		}
		
		var id = opt.id,
			$btn = $('#' + id),
			$pnl = $('.ui-drop-pnl[data-id="'+ id +'"]'),
			defaults = $btn.data('opt'),
			opt = $.extend(true, {}, defaults, opt),
			
			ps = opt.ps,
			openback = opt.openback,
			closeback = opt.closeback,
			hold = opt.hold,
			state = opt.state,
			dropOffset = opt.dropOffset,
			btnExpanded =  $btn.attr('aria-expanded'),
			is_modal = !!$btn.closest('.ui-modal').length,

			btn_w = Math.ceil($btn.outerWidth()),
			btn_h = Math.ceil($btn.outerHeight()),
			btn_t = Math.ceil($btn.position().top) + parseInt($btn.css('margin-top')),
			btn_l = Math.ceil($btn.position().left) + parseInt($btn.css('margin-left')),
			pnl_w = Math.ceil($pnl.outerWidth()),
			pnl_h = Math.ceil($pnl.outerHeight());

		//dropOffset: ture 이거나 modal안의 dropdown 일때 position -> offset 으로 위치 값 변경
		if (dropOffset || is_modal) {
			btn_t = Math.ceil($btn.offset().top);
			btn_l = Math.ceil($btn.offset().left);
			is_modal ? btn_t = btn_t - $(win).scrollTop(): '';
		}

		//test 
		!!$btn.attr('data-ps') ? ps = $btn.attr('data-ps') : '';
		
		if (state === 'open') {
			btnExpanded = 'false';
		} else if (state === 'close') {
			btnExpanded = 'true';
		}

		btnExpanded === 'false' ? pnlShow(): pnlHide();

		function pnlShow(){
			var drop_inner = $btn.closest('.ui-drop-pnl').data('id');
			
			//dropdown in dropdown 인 경우
			if (!!drop_inner) {
				$('.ui-drop').not('#' + drop_inner).attr('aria-expanded', false);
				$('.ui-drop-pnl').not('[data-id="' + drop_inner +'"]')
						.attr('aria-hidden', true)
						.attr('tabindex', -1)
						.removeAttr('style');
			} else {
				win[global].uiDropdownHide();
			}

			$btn.attr('aria-expanded', true);
			$pnl.attr('aria-hidden', false).addClass('on');

			win[global].focus.loop({
				selector: $('.ui-drop-pnl[data-id="'+ id +'"]'),
				callback:pnlHide
			});
			//focus hold or sense
			// hold ?	
			// 	win[global].uiFocusTab({ selector:'.ui-drop-pnl[data-id="'+ id +'"]', type:'hold' }):
			// 	win[global].uiFocusTab({ selector:'.ui-drop-pnl[data-id="'+ id +'"]', type:'sense', callback:pnlHide });

			switch (ps) {
				case 'BL': 
					$pnl.css({ 
						top: btn_t + btn_h, 
						left: btn_l
					}); 
					break;
				case 'BC': 
					$pnl.css({ top: btn_t + btn_h, left: btn_l - ((pnl_w - btn_w) / 2) }); 
					break;
				case 'BR': 
					$pnl.css({ top: btn_t + btn_h, left: btn_l - (pnl_w - btn_w) }); 
					break;
				case 'TL': 
					$pnl.css({ top: btn_t - pnl_h, left: btn_l }); 
					break;
				case 'TC': 
					$pnl.css({ top: btn_t - pnl_h, left: btn_l - ((pnl_w - btn_w) / 2) }); 
					break;
				case 'TR': 
					$pnl.css({ top: btn_t - pnl_h, left: btn_l - (pnl_w - btn_w) }); 
					break;
				case 'RT': 
					$pnl.css({ top: btn_t, left: btn_l + btn_w }); 
					break;
				case 'RM': 
					$pnl.css({ top: btn_t - ((pnl_h - btn_h) / 2), left:  btn_l + btn_w  }); 
					break;
				case 'RB': 
					$pnl.css({ top: btn_t - (pnl_h - btn_h), left: btn_l + btn_w }); 
					break;
				case 'LT': 
					$pnl.css({ top: btn_t, left: btn_l - pnl_w }); 
					break;
				case 'LM': 
					$pnl.css({ top: btn_t - ((pnl_h - btn_h) / 2), left: btn_l - pnl_w  }); 
					break;
				case 'LB': 
					$pnl.css({ top: btn_t - (pnl_h - btn_h), left: btn_l - pnl_w }); 
					break; 
				case 'CM': 
					$pnl.css({ top: '50%', left: '50%', marginTop: (pnl_h / 2 ) * -1, marginLeft: (pnl_w / 2 ) * -1 }); 
					break;
			}

			setTimeout(function(){
				$('body').data('dropdownOpened',true).addClass('dropdownOpened');
				setTimeout(function(){
					$pnl.focus();
				},0);
			},0);

			!!openback ? openback() : '';			
		}
		function pnlHide(){
			if ($('#' + id).closest('.ui-drop-pnl').length < 1) {
				$('body').data('dropdownOpened',false).removeClass('dropdownOpened');
			}

			$btn.attr('aria-expanded', false).focus();
			$pnl.attr('aria-hidden', true).attr('tabindex', -1).removeClass('on');
			
			!!closeback ? closeback() : '';
		}
	}
	function createUiDropdownHide(){
		$('body').data('dropdownOpened',false).removeClass('dropdownOpened');
		$('.ui-drop').attr('aria-expanded', false);
		$('.ui-drop-pnl[aria-hidden="false"]').each(function(){
			var $pnl = $(this),
				defaults = $pnl.data('opt'),
				opt = $.extend(true, {}, defaults),
				closeback = opt.closeback;
			
			$pnl.attr('aria-hidden', true).attr('tabindex', -1).removeClass('on');
			!!closeback ? closeback() : '';
		});	
	}
	
	/* ------------------------
	* name : modal
	* date : 2020-06-11
	------------------------ */	
	win[global] = win[global].uiNameSpace(namespace, {
		uiModalOpen: function (opt) {
			return createUiModalOpen(opt);
		},
		uiModalClose: function (opt) {
			return createUiModalClose(opt);
		},
		uiSystemModalClose: function () {
			return createUiSystemModalClose();
		}
	});
	win[global].uiModalOpen.option = {
		type: 'normal',
		wrap: false,
		full: false,
		ps: 'center',
		src: false,
		remove: false,
		modalWidth: false,
		modalHeight: false,
		innerScroll: false,
		mg: 20,
		callback:false,
		closeCallback:false,
		endfocus:false,

		sMessage: '',
		sBtnConfirmTxt: 'Ok',
		sBtnCancelTxt: 'Cancel',
		sZindex: false,
		sClass: 'type-system',
		sConfirmCallback: false,
		sCancelCallback: false
	}
	function createUiModalOpen(opt) {
		var opt = $.extend(true, {}, win[global].uiModalOpen.option, opt),
			wrap = opt.wrap === false ? $('body') : typeof opt.wrap === 'object' ? opt.wrap : $('#' + opt.wrap),
			type = opt.type,
			id = opt.id,
			src = opt.src,
			full = opt.full,
			ps = opt.ps,
			mg = opt.mg,
			remove = opt.remove,
			w = opt.modalWidth,
			h = opt.modalHeight,
			innerScroll = opt.innerScroll,
			scr_t = $(win).scrollTop(),
			endfocus = opt.endfocus === false ? document.activeElement : typeof opt.endfocus === 'string' ? $('#' + opt.endfocus) : opt.endfocus,
			callback = opt.callback,
			closeCallback = opt.closeCallback,
			timer;
		
		var sMessage = opt.sMessage,
			sBtnConfirmTxt = opt.sBtnConfirmTxt,
			sBtnCancelTxt = opt.sBtnCancelTxt,
			sZindex = opt.sZindex,
			sClass = opt.sClass,
			sConfirmCallback = opt.sConfirmCallback,
			sCancelCallback = opt.sCancelCallback;

		if (type === 'normal') {
			if (!!src && !$('#' + opt.id).length) {
				$plugins.ajax.init({
					id: wrap,
					url: src,
					add: true,
					callback: function(){
						act();
					}
				});
			} else {
				act();
			}
		} else {
			endfocus = null;
			remove = true;
			id = 'uiSystemModal';
			makeSystemModal();
		}

		if (endfocus === 'body') {
			endfocus = $('body').data('active');
		}

		function makeSystemModal(){
			var htmlSystem = '';
			
			htmlSystem += '<div class="ui-modal '+ sClass +'" id="uiSystemModal">';
			htmlSystem += '<div class="ui-modal-wrap">';
			htmlSystem += '<div class="ui-modal-body">';
			htmlSystem += sMessage;
			htmlSystem += '</div>';
			htmlSystem += '<div class="ui-modal-footer">';
			htmlSystem += '<div class="btn-area stick">';

			if (type === 'confirm') {
				htmlSystem += '<button type="button" class="btn-base ui-modal-cancel"><span>'+ sBtnCancelTxt +'</span></button>';
			}

			htmlSystem += '<button type="button" class="btn-base ui-modal-confirm"><span>'+ sBtnConfirmTxt +'</span></button>';	
			htmlSystem += '</div>';
			htmlSystem += '</div>';
			htmlSystem += '</div>';
			htmlSystem += '</div>';

			$('body').append(htmlSystem);
			htmlSystem = '';
			act();
		}

		function act(){
			var $modal = $('#' + id);
			var $modalWrap = $modal.find('> .ui-modal-wrap');
			var $modalBody = $modalWrap.find('> .ui-modal-body');
			var $modalHeader = $modalWrap.find('> .ui-modal-header');
			var $modalFooter = $modalWrap.find('> .ui-modal-footer');
			var headerH = 0;
			var footerH = 0;

			$('.ui-modal').removeClass('current');
			$('body').addClass('scroll-no');
			
			$modal
				.attr('tabindex', '0')
				.attr('n', $('.ui-modal.open').length)
				.attr('role', 'dialog')
				.addClass('n' + $('.ui-modal.open').length + ' current')
				.data('scrolltop', scr_t)
				.data('active', endfocus)
				.data('closecallback', closeCallback);

			if (full) {
				$modal.addClass('type-full');
				mg = 0;
			} 

			$('html').addClass('is-modal');
			
			switch (ps) {
				case 'center' :
					$modal.addClass('ready ps-center');
					break;
				case 'top' :
					$modal.addClass('ready ps-top');
					break;
				case 'bottom' :
					$modal.addClass('ready ps-bottom');
					break;
			}

			headerH = $modalHeader.length ? $modalHeader.outerHeight() : 0;
			footerH = $modalFooter.length ? $modalFooter.outerHeight() : 0;

			if (!full) {
				//lyaer modal
				if (!h) {
					var win_h = $(win).outerHeight();
					var max_h = win_h - (headerH + footerH + (mg * 2));

					$modalBody
					.addClass('is-scrollable')
					.css({
						'max-height' : max_h + 'px',
						'overflow-y' : 'auto',
						'height' : '100%'
					});
				} else {
					$modalBody
					.addClass('is-scrollable')
					.css({
						'overflow-y' : 'auto',
						'height' : h + 'px'
					});
				}
			} else {
				//full modal
				!!w && $modalWrap.css('width', w);
				if (!!h) {
					$modalBody.css({ 
						'height': h + 'px', 
						'overflow-y' : 'auto' 
					});
				} else {
					$modalBody.css({ 
						'min-height': $(window).outerHeight() + 'px', 
						'overflow-y' : 'auto' ,
						'padding-top': (headerH + 10)  + 'px',
						'padding-bottom': '75px'
					});
				}
			}
			
			clearTimeout(timer);
			timer = setTimeout(function(){
				win[global].focus.loop({ 
					selector: $modal, 
				});
				// win[global].uiFocusTab({ 
				// 	selector: $modal, 
				// 	type:'hold' 
				// });

				$modal.addClass('open');

				!!sZindex && $modal.css('z-index', sZindex);
				callback && callback(opt);

				$('html').off('click.uimodaldim').on('click.uimodaldim', function(e){
					if(!$(e.target).closest('.ui-modal-wrap').length) {
						var openN = [];
						
						$('.ui-modal.open').each(function(){
							var thisN = $(this).attr('n');

							thisN !== undefined ?
								openN.push(thisN) : '';
						});
						
						var currentID = $('.ui-modal.open[n="'+ Math.max.apply(null, openN) +'"]').attr('id');

						if (currentID !== 'uiSystemModal') {
							$plugins.uiModalClose({ 
								id: currentID, 
								remove: remove,
								closeCallback: closeCallback
							});
						}
					}
				});

				$(win).outerHeight() < $modal.find('.ui-modal-wrap').outerHeight() ?
					$modal.addClass('is-over'):
					$modal.removeClass('is-over');
			},150);

			$(doc).find('.ui-modal-close').off('click.close').on('click.close', function(e){
				$plugins.uiModalClose({ 
					id: $(this).closest('.ui-modal').attr('id'), 
					remove: remove,
					closeCallback: closeCallback
				});
			});
			$(doc).find('.ui-modal-confirm').off('click.callback').on('click.callback', function(e){
				sConfirmCallback();
			});
			$(doc).find('.ui-modal-cancel').off('click.callback').on('click.callback', function(e){
				sCancelCallback();
			});
			$(doc).find('.ui-modal').find('button, a').off('click.act').on('click.act', function(e){
				var $this = $(this); 
				$this.closest('.ui-modal').data('active', $this);
			});

			$modalWrap.on('transitionend.modal', function(){
				if (!!full) {
					$modal.addClass('fix-header');
					$modalBody.css({
						'padding-top': (headerH + 10)  + 'px',

					});
				}
			});
		}
	}
	win[global].uiModalClose.option = {
		remove: false,
		endfocus: false
	}
	function createUiSystemModalClose(){
		$plugins.uiModalClose({ 
			id: 'uiSystemModal', 
			remove: true
		});
	}
	function createUiModalClose(v) {
		var opt = $.extend(true, {}, win[global].uiModalClose.option, v);
		var id = opt.id;
		var remove = opt.remove;
		var $modal = $('#' + id);
		var endfocus = opt.endfocus;
		var closeCallback = opt.closeCallback === undefined ? $modal.data('closecallback') === undefined ? false : $modal.data('closecallback') : opt.closeCallback;
		var $modalWrap = $modal.find('> .ui-modal-wrap');

		$modalWrap.off('transitionend.modal');
		$modal.removeClass('open').addClass('close');
		$modal.removeClass('fix-header');

		var timer;
		var $modalPrev = $('.ui-modal.open.n' + ($('.ui-modal.open').length - 1));

		if (!$('.ui-modal.open').length) {
			endfocus = endfocus === false ? $('body').data('active') : typeof opt.endfocus === 'string' ? $('#' + opt.endfocus) : opt.endfocus;

			$('html').off('click.uimodaldim');
			$('html').removeClass('is-modal');
		} else {
			endfocus = endfocus === false ? $modalPrev.data('active') : typeof opt.endfocus === 'string' ? $('#' + opt.endfocus) : opt.endfocus;
		}

		$modalPrev.addClass('current');
		
		win[global].scroll.move({
			value: Number($modal.data('scrolltop'))
		});
		
		clearTimeout(timer);
		timer = setTimeout(function(){
			$modal.find('.ui-modal-wrap').removeAttr('style');
			$modal.find('.ui-modal-body').removeAttr('style');
			$modal.removeClass('ready is-over current close ps-bottom ps-top ps-center type-normal type-full n0 n1 n2 n3 n4 n5 n6 n7');
			$modal.removeAttr('n');
			
			if (!$('.ui-modal.open').length) {
				$("html, body").removeClass('scroll-no');
			}
			closeCallback ? closeCallback(opt) : '';
			remove ? $modal.remove() : '';

			console.log($modal.attr('id'), endfocus);

			!!endfocus ? endfocus.focus() : '';
		},210);
	}

 
	/* ------------------------
	* name : tab
	* date : 2020-06-14
	------------------------ */	
	win[global] = win[global].uiNameSpace(namespace, {
		uiTab: function (opt) {
			return createUiTab(opt);
		},
		uiTabAction: function (opt) {
			return createuiTabAction(opt);
		}
	});
	win[global].uiTab.option = {
		current: 0,
		onePanel: false,
		callback: false,
		effect: false,
		align : 'center'
	};
	function createUiTab(opt) {
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, win[global].uiTab.option, opt),
			id = opt.id,
			effect = opt.effect,
			current = isNaN(opt.current) ? 0 : opt.current,
			onePanel = opt.onePanel,
			callback = opt.callback,
			align = opt.align;
			
		var	$tab = $('#' + id),
			$btns = $tab.find('> .ui-tab-btns'),
			$btn = $btns.find('.ui-tab-btn'),
			$pnls = $tab.find('> .ui-tab-pnls'),
			$pnl = $pnls.find('> .ui-tab-pnl');

		var	len = $btn.length,
			keys = win[global].option.keys;
			
		var	para = win[global].para.get('tab'),
			paras,
			paraname;

		//set up
		if (!!para) {
			if (para.split('+').length > 1) {
				//2 or more : tab=exeAcco1*2+exeAcco2*3
				paras = para.split('+');

				for (var j = 0; j < paras.length; j++ ) {
					paraname = paras[j].split('*');
					opt.id === paraname[0] ? current = Number(paraname[1]) : '';
				}
			} else {
				//only one : tab=1
			 	if (para.split('*').length > 1) {
					paraname = para.split('*');
					opt.id === paraname[0] ? current = Number(paraname[1]) : '';
				} else {
					current = Number(para);
				}
			}
		}

		//set up
		!!effect && $tab.addClass(effect);
		$tab.data('opt', opt);
		$btns.attr('role','tablist');
		$btn.attr('role','tab');
		$pnl.attr('role','tabpanel');
		
		var ps_l = [];

		for (var i = 0; i < len; i++) {
			var $btnN = $btn.eq(i);
			var $pnlN = $pnl.eq(i);
			
			if ($btnN.data('tabnum') === undefined ) {
				$btnN.attr('data-tabnum', i);
			}

			var tabN = Number($btnN.data('tabnum'));
			var isCurrent = current === tabN;
			var cls = isCurrent ? 'addClass' : 'removeClass';
			var attrs = isCurrent ? 'removeAttr' : 'attr';
			
			//make ID
			$btnN.attr('id') === undefined ? $btnN.attr('id', id + 'Btn' + tabN) : '';
			$pnlN.attr('id') === undefined ? $pnlN.attr('id', id + 'Pnl' + tabN) : '';
			
			var btnID = $btnN.attr('id');
			var pnlID = $pnlN.attr('id');

			if (!onePanel) {
				$btnN.attr('aria-controls', pnlID)[cls]('selected');
				$btnN.attr('aria-controls', $pnlN.attr('id'));
				$pnlN.attr('aria-labelledby', btnID).attr('aria-hidden', (current === tabN) ? false : true)[attrs]('tabindex', -1)[cls]('selected');
			} else {
				$btnN.attr('aria-controls', $pnl.eq(0).attr('id')).addClass('selected');
				isCurrent && $pnl.attr('aria-labelledby', btnID).addClass('selected');
			}

			if (isCurrent) {
				$btnN.attr('aria-selected', true).addClass('selected');
			} else {
				$btnN.attr('aria-selected', false).removeClass('selected');
			}
				
			ps_l.push(Math.ceil($btnN.position().left));

			i === 0 ? $btnN.attr('tab-first', true) : '';
			i === len - 1 ? $btnN.attr('tab-last', true) : ''
		}

		callback ? callback(opt) : '';
		$btn.data('psl', ps_l).data('len', len);

		win[global].scroll.move({ 
			value: ps_l[current], 
			target: $btns,
			speed: 0, 
			ps: align
		});

		//event
		$btn.off('click.uitab keydown.uitab')
			.on({
				'click.uitab': evtClick,
				'keydown.uitab': evtKeys
			});

		function evtClick() {
			win[global].uiTabAction({ 
				id: id, 
				current: $(this).index(), 
				align:align 
			}); 
		}
		function evtKeys(e) {
			var $this = $(this),
				n = $this.index(),
				m = Number($this.data('len'));

			switch(e.keyCode){
				case keys.up: upLeftKey(e);
				break;

				case keys.left: upLeftKey(e);
				break;

				case keys.down: downRightKey(e);
				break;

				case keys.right: downRightKey(e);
				break;

				case keys.end: endKey(e);
				break;

				case keys.home: homeKey(e);
				break;
			}

			function upLeftKey(e) {
				e.preventDefault();
				!$this.attr('tab-first') ? 
				win[global].uiTabAction({ id: id, current: n - 1, align:align }): 
				win[global].uiTabAction({ id: id, current: m - 1, align:align});
			}
			function downRightKey(e) {
				e.preventDefault();
				!$this.attr('tab-last') ? 
				win[global].uiTabAction({ id: id, current: n + 1, align:align }): 
				win[global].uiTabAction({ id: id, current: 0, align:align });
			}
			function endKey(e) {
				e.preventDefault();
				win[global].uiTabAction({ id: id, current: m - 1, align:align });
			}
			function homeKey(e) {
				e.preventDefault();
				win[global].uiTabAction({ id: id, current: 0, align:align });
			}
		}
	}
	function createuiTabAction(opt) {
		var id = opt.id,
			$tab = $('#' + id),
			$btns = $tab.children('.ui-tab-btns'),
			$btn = $btns.find('.ui-tab-btn'),
			$pnls = $tab.children('.ui-tab-pnls'),
			$pnl = $pnls.children('.ui-tab-pnl'),
			$target = $btns;

		var ps_l = $btn.data('psl'),
			
			opt = $.extend(true, {}, $tab.data('opt'), opt),
			current = isNaN(opt.current) ? 0 : opt.current,
			onePanel = opt.onePanel,
			align = opt.align,
			callback = opt.callback;

		//$btn.eq(current).append('<b class="hide">선택됨</b>');

		var currentPnl = $btns.find('.ui-tab-btn[data-tabnum="'+ current +'"]').index();
		$btn.removeClass('selected').eq(current).addClass('selected').focus();

		var $btnN = $btn.eq(current),
			btnId = $btn.eq(currentPnl).attr('id');

		if ($btns.hasClass('ui-scrollbar')) {
			$target = $btns.find('> .ui-scrollbar-item');
		}

		win[global].scroll.move({ 
			value: ps_l[current], 
			addLeft : $btn.outerWidth(),
			target: $target, 
			speed: 300, 
			ps: align 
		});

		if (onePanel === false) {
			$pnl.attr('aria-hidden', true).removeClass('selected').attr('tabindex', '-1');
			$pnl.eq(current).addClass('selected').attr('aria-hidden', false).removeAttr('tabindex');
		} else {
			$pnl.attr('aria-labelledby', btnId);
		}

		!!callback ? callback(opt) : '';
	}   


	
	/* ------------------------
	* name : tooltip
	* date : 2020-06-15
	------------------------ */	
	win[global] = win[global].uiNameSpace(namespace, {
		uiTooltip: function (opt) {
			return createUiTooltip(opt);
		}
	});
	win[global].uiTooltip.option = {
		visible: null,
		id: false,
		ps: false
	};
	function createUiTooltip(opt){
		var opt = opt === undefined ? {} : opt;

		opt = $.extend(true, {}, win[global].uiTooltip.option, opt);

		var $btn = $('.ui-tooltip-btn');
		var $tip = opt.id ? typeof opt.id === 'string' ? $('#' + opt.id) : opt.id : false;
		var visible = opt.visible;
		var id = opt.id ? $tip.attr('id') : '';
		var sp = 4;
		var ps = opt.ps;
		var timer;
		var class_ps = 'ps-ct ps-cb ps-lt ps-lb ps-rt ps-rb';

		if (visible !== null) {
			visible ? tooltipSet(id) : tooltipHide();
		}

		// $btn
		// .on('click', function(e){
		// 	e.preventDefault();
		// 	tooltipSet($(this).attr('aria-describedby'));
		// });

		// $btn.off('mouseover.ui focus.ui').on('mouseover.ui focus.ui', function(e){
		// 	e.preventDefault();
		// 	tooltipSet(this);
		// }).off('mouseleave.ui ').on('mouseleave.ui', function(){
		// 	tooltipHideDelay();

		// 	$('.ui-tooltip').on('mouseover.ui', function(){
		// 		clearTimeout(timer);
		// 	}).on('mouseleave.ui', function(e){
		// 		tooltipHideDelay();
		// 	});
		// });

		$('.ui-tooltip-close').off('click.uitooltip').on('click.uitooltip', function(){
			$btn.data('view', false);
			tooltipHide();
		});

		$btn.off('touchstart.uitooltip').on('touchstart.uitooltip', function(){
			var $this = $(this);

			if (!$this.data('view')){
				$this.data('view', true);
				tooltipHide();
				tooltipSet(this);
			} else {
				$this.data('view', false);
				tooltipHide();
			}
			
			setTimeout(function(){
				$(doc).on('click.bdd', function(){
					$btn.data('view', false);
					tooltipHide();
					console.log(22222);
				});
			},100);
			

			// $(doc).off('click.bdd').on('click.bdd', function(e){
			// 	//dropdown 영역 외에 클릭 시 판단
			// 	if (!!$('body').data('dropdownOpened')){
			// 		if ($('.ui-tooltip').has(e.target).length < 1) {
			// 			tooltipHide();
			// 		}
			// 	}
			// });
		});

		function tooltipSet(v) {
			var $t = $(v);
			var $win = $(win);
			var $doc = $(doc);
			var id = $t.attr('aria-describedby');
			var src = $t.data('src');

			var off_t = $t.offset().top;
			var off_l =$t.offset().left;
			var w = $t.outerWidth();
			var h = $t.outerHeight();
			var bw = $win.innerWidth();
			var bh = $win.innerHeight();
			var st = $doc.scrollTop();
			var sl = $doc.scrollLeft();
			
			if (!!src && !$('#' + id).length) {
				$('body').append('<div class="ui-tooltip" id="'+ id +'" role="tooltip" aria-hidden="true"><button class="ui-tooltip-close" type="button"><span class="a11y-hidden">툴팁닫기</span></button><div class="ui-tooltip-arrow"></div>')

				$plugins.ajax.init({
					id: $('#' + id),
					url: src,
					add: true,
					callback: function(){
						act();
					}
				});
				// $plugins.uiAjax({
				// 	id: $('#' + id),
				// 	url: src,
				// 	add: true,
				// 	callback: function(){
				// 		act();
				// 	}
				// });
			} else {
				act();
			}
			
			function act(){
				$('#' + id).removeClass(class_ps);	
				tooltipShow(off_t, off_l, w, h, bw, bh, st, sl, id, false);
			}
		}
		function tooltipHide() {
			$(doc).off('click.bdd');
			$('.ui-tooltip').removeAttr('style').attr('aria-hidden', true).removeClass(class_ps);
		}
		function tooltipHideDelay(){
			timer = setTimeout(tooltipHide, 100);
		}

		function tooltipShow(off_t, off_l, w, h, bw, bh, st, sl, id) {
			var $id = $('#' + id);
			var pst = (bh / 2 > (off_t - st) + (h / 2)) ? true : false;
			var psl = (bw / 2 > (off_l - sl) + (w / 2)) ? true : false;
			var tw = $id.outerWidth();
			var th = $id.outerHeight();
			var ps_l; 
			var ps_r; 
			var cursorCls = 'ps-';
				
			if (psl) {
				if (off_l - sl > tw / 2) {
					cursorCls += 'c';
					ps_l = off_l - (tw / 2) + (w / 2);
				} else {
					cursorCls += 'l';
					ps_l = off_l;
				}
			} else {
				if (bw - (off_l - sl + w) > tw / 2) {
					cursorCls += 'c';
					ps_r = Math.ceil(off_l) - (tw / 2) + (w / 2);
				} else {
					cursorCls += 'r';
					ps_r = off_l - tw + w;
				}
			}

			ps ? cursorCls = 'ps-l' : '';
			ps ? ps_l = off_l : '';
			ps ? psl = true : '';
			pst ? cursorCls += 'b' : cursorCls += 't';

			if (!!$id.attr('modal')) {
				if (!win[global].browser.oldie) {
					ps_l = ps_l;
					ps_r = ps_r;
				}

				win[global].browser.ie ? '' : off_t = off_t;
			}

			if (!!$id.closest('.type-fixed-bottom').length) {
				off_t = off_t - $('ui-modal-tit').outerHeight();
			}
			console.log(sp);
			$id.addClass(cursorCls).attr('aria-hidden', false).css({ 
				display:'block'
			}).css({
				top : pst ? off_t + h + sp : off_t - th - sp,
				left : 0
			});
		}
	}



	/* ------------------------
	* name : input cancel
	* date : 2020-06-15
	------------------------ */	
	win[global] = win[global].uiNameSpace(namespace, {
		uiInputClear: function () {
			return createUiInputClear();
		}
	});
	function createUiInputClear(){
		var $inp = $('.inp-base');

		$inp.each(function(i){
			var $this = $(this);
			var $wrap = $this.parent();
			var $clear = $wrap.find('.ui-clear');

			// if ($this.val() === '' || $this.prop('readonly') || $this.prop('disabled')) {
			// 	$clear.remove();
			// } else { 
			// 	if ($clear.length === 0) {
			// 		$wrap.append(make($this.attr('id')));
			// 	} 
			// }

			$inp.eq(i).off('keyup.clear focus.clear').on('keyup.clear focus.clear', function(){
				var _$this = $(this);
				var _$wrap = $this.parent();
				
				if (_$this.prop('readonly') || _$this.prop('disabled') || _$this.attr('type') === 'date') {
					return false;
				}

				if (_$this.val() === '') {
					_$this.next('.ui-clear').remove();
				} else {
					if (!$('.ui-clear[data-id="'+ _$this.attr('id') +'"]').length || _$this.attr('type') === 'date') {
						_$wrap.append( make(_$this.attr('id')) );
					} 
				}
			}).off('blur.clear').on('blur.clear', function(){
				var $clear =  $(this).parent().find('.ui-clear');
				setTimeout(function(){
					$clear.remove();
				},100)
			});
		});

		function make(v){
			return '<button type="button" class="ui-clear btn-clear" data-id="'+ v +'"><span class="a11y-hidden">내용지우기</span></button>';
		}

		//event
		$(doc).off('click.clear').on('click.clear', '.ui-clear', function(){
			$('#' + $(this).data('id')).val('').focus();
			$(this).remove();
		});
	}
	

})(jQuery, window, document);