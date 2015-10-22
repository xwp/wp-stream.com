(function($)
{
	"use strict";

	/* Event - Window Scroll */
	$(window).scroll(function()
	{
		var scroll	=	$(window).scrollTop();
		var height	=	$(window).height();

		/*** set sticky menu ***/
		if( scroll >= 90 )
		{
			$('.header-section').addClass("navbar-fixed-top animated fadeInDown").delay( 2000 ).fadeIn();
		}
		else if ( scroll <= height )
		{
			$('.header-section').removeClass("navbar-fixed-top animated fadeInDown");
		}
		else
		{
			$('.header-section').removeClass("navbar-fixed-top animated fadeInDown");
		} // set sticky menu - end

	});
	/* Event - Window Scroll /- */

	/* Event - Document Ready /- */
	$(document).ready(function($) {
		var scroll	=	$(window).scrollTop();
		var height	=	$(window).height();

		/*** set sticky menu ***/
		if( scroll >= height -500 )
		{
			$('.header-section').addClass("navbar-fixed-top").delay( 2000 ).fadeIn();
		}
		else if ( scroll <= height )
		{
			$('.header-section').removeClass("navbar-fixed-top");
		}
		else
		{
			$('.header-section').removeClass("navbar-fixed-top");
		} // set sticky menu - end

		$('.navbar-nav li a, .logo-block a').on('click', function(event)
		{
			var anchor = $(this);

			if( anchor == 'undefined' || anchor == null || anchor.attr('href') == '#' ) { return; }
			if ( anchor.attr('href').indexOf('#') === 0 )
			{
				if( $(anchor.attr('href')).length )
				{
					$('html, body').stop().animate( { scrollTop: $(anchor.attr('href')).offset().top - 100 }, 1500, 'easeInOutExpo' );
				}
				event.preventDefault();
			}
		});

		/* Install */
		$( '.install-input' ).on( 'focus', function() {
			if ( '' === $( this ).val() ) {
				var starter = $( this ).attr( 'starter' );
				$( this ).val( starter );
			}
		});

		$( '.install-input' ).on( 'blur', function() {
			var starter = $( this ).attr( 'starter' );
			if ( starter === $( this ).val() ) {
				$( this ).val( '' );
			}
		});

		$( '.install-input' ).on( 'keypress', function( e ) {
			if ( 13 === e.which ) {
				$('.install-btn').trigger( 'click' );
			}
		});

		$( '.install-btn' ).on( 'click', function( e ) {
			e.preventDefault();

			var url = $( '.install-input' ).val();
			if ( '/' !== url.substr(-1, 1) ) {
				url += '/';
			}
			url += 'plugin-install.php?tab=search&type=tag&s=wp+stream';

			if ( ! is_url( url ) ) {
				return;
			}

			var redirectWindow = window.open( url, '_blank' );
			redirectWindow.location;
		});

		/***********************************/
		/* ANIMSITION PLUGIN*/
		/**********************************/

		if($(".animsition").length){
			$(".animsition").animsition({
		inClass               :   'fade-in-down',
		outClass              :   'fade-out-up',
		inDuration            :    600,
		outDuration           :    800,
		linkElement           :   '.animsition-link',
		   // e.g. linkElement   :   'a:not([target="_blank"]):not([href^=#])'
		loading               :    false,
		loadingParentElement  :   'body',
		loadingClass          :   'animsition-loading',
		unSupportCss          : [ 'animation-duration',
								  '-webkit-animation-duration',
								  '-o-animation-duration'
								],
		overlay               :   false,

		overlayClass          :   'animsition-overlay-slide',
		overlayParentElement  :   'body'
		});
		}
		/* Window Hight Set to Elements /- */
		var window_height = $(window).height();
		var window_width = $(window).width();

		/* Connectors Section */
		if($("#connectors-carousel").length){
			$("#connectors-carousel").owlCarousel(
			{
				autoplay: true,
				touchDrag: true,
				mouseDrag: true,
				loop:true,
				margin:10,
				nav:false,
				dots: false,
				responsive:{
					0:{
						items:1
					},
					480:{
						items:2
					},
					640:{
						items:3
					},
					1000:{
						items:4
					}
				}
			});
		}

		/* Testimonial Section */
		if($("#testimonial-slider").length){
			$("#testimonial-slider").owlCarousel(
			{
				autoplay: true,
				autoplayTimeout: 10000,
				touchDrag: true,
				mouseDrag: true,
				loop:true,
				margin:10,
				nav: false,
				dots: true,
				responsive:{
					0:{
						items:1
					}
				}
			});
		}

		/* partner Section */
		if($("#contributors-carousel").length){
			$("#contributors-carousel").owlCarousel(
			{
				autoplay: true,
				touchDrag: true,
				mouseDrag: true,
				loop:true,
				margin:10,
				nav:false,
				dots: false,
				responsive:{
					0:{
						items:1
					},
					480:{
						items:2
					},
					640:{
						items:3
					},
					1000:{
						items:4
					}
				}
			});
		}

		/* Ticker */
		var words = $('.words')
		if (words.length == 1) {
			words.on('switched', function() {
				var timeout = setTimeout(function() {
					animateWords(words);
				}, 1500);
				words.data('timeout', timeout);
			}).trigger('switched');
		}

		function animateWords(words) {
			var activeWord = words.find('.is-active');
			var newWord = activeWord.next();
			if (newWord.length == 0)
				newWord = words.find('.word').first();
			newWord.css({
				display: 'block',
				position: 'absolute',
				top: 0,
				left: 0,
				opacity: 0
			});
			var newWordWidth = newWord.find('div').outerWidth();
			newWord.find('div').css({
				width: 0
			});
			var tl = new TimelineLite();
			tl.pause();
			tl.to(activeWord.find('div'), 0.5, {
				width: 0,
				ease: Power3.easeInOut
			});
			tl.call(function() {
				activeWord.css({
					opacity: 0
				});
				newWord.css({
					opacity: 1
				});
			});
			tl.to(newWord.find('div'), 0.5, {
				width: newWordWidth,
				ease: Power3.easeInOut
			}, '+=0.1');
			tl.call(function() {
				activeWord.attr('style', '').removeClass('is-active');
				newWord.attr('style', '').addClass('is-active');
				activeWord.find('div').attr('style', '');
				newWord.find('div').attr('style', '');
				newWord.closest('.words').trigger('switched');
			});
			tl.play();
		}

		function loadIndividualContributors() {
			var githubAPIURL = 'https://api.github.com/repos/xwp/stream/stats/contributors';

			$.getJSON( githubAPIURL, function( data ) {
				data.reverse();
				$.each( data, function( key, val ) {
					var contributor = $( '<div class="item">' );
					contributor.append( '<div class="col-md-2">' );
					contributor.find( '.col-md-2' ).append( '<div class="contributors-individual-box">' );

					var author = val.author;
					var authorName = $( '<h3>' + author.login + '</h3>' );
					var authorAvatar = $( '<div class="contributors-individual-img-box"><img src="' + author.avatar_url + '" alt="' + author.login + '"></div>' );
					contributor.find( '.contributors-individual-box' ).append( authorAvatar );
					contributor.find( '.contributors-individual-box' ).append( authorName );
					contributor.find( '.contributors-individual-box' ).wrapInner( '<a href="' + author.html_url + '"></a>' );

					$( '.contributors-individual' ).append( contributor );
				});
			});
		}
		loadIndividualContributors();

		var y, E = $(window);
	});
	/* document.ready /- */

	$('.modal-backdrop').remove();

	/* Event - Window Resize /- */
	$(window).resize(function()
	{
		/* Window Hight Set to Elements /- */
		var window_height = $(window).height();
		var window_width = $(window).width();
		// $(".header").css("height", window_height + "px");
	});
	/* Event - Window Resize /- */

	if (!$('html').is('.ie6, .ie7, .ie8'))
	{
		$(window).load(function()
		{
			$('.text-rotator').each(function(){

				var text_rotator_content = $(this).html();
				$(this).empty();
				$(this).html('<div class="rotator-wrap"></div>');
				var this_item = $(this).children('.rotator-wrap');
				var text_rotator_content_split = text_rotator_content.split(',');
				var item_size = text_rotator_content_split.length;
				nova_text_rotator(text_rotator_content_split, this_item, item_size);
			});

			function nova_text_rotator(item_array, this_item, item_size, my_index){

				if(my_index == undefined)
					var my_index = -1;

				my_index++;

				if(my_index < item_size)
				{

					this_item.fadeOut(3000, function(){
						this_item.html('<span>'+ item_array[my_index] +'</span>');
						this_item.fadeIn(3000);
					});
				}
				else
				{
					my_index = -1;
				}

				setTimeout(function() {
					 nova_text_rotator(item_array, this_item, item_size, my_index);
				}, 2000);
			}
		});
	}

	function is_url( value ) {
		var expression = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi;
		return expression.test(value)
	};

})(jQuery);

