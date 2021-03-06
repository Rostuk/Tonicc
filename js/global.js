/*--------------------------------------------------------*/
/* TABLE OF CONTENTS: */
/*--------------------------------------------------------*/

var _functions = {};
$(function() {
	"use strict";
	/*================*/
	/* 01 - VARIABLES */
	/*================*/
    var swipers = [], winW, winH, headerH, winScr, footerTop, _isresponsive,  responsivePoint = 991, _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i), _isPhone;

	/*========================*/
	/* 02 - page calculations */
	/*========================*/
	_functions.pageCalculations = function(){
		winW = $(window).width();
		winH = $(window).height();
        _isPhone = (winW<=767)?true:false; 
        _isresponsive = (winW<=responsivePoint)?true:false;
        if(_isresponsive) $('.device_imgWrapp').removeClass('active');
	};

    /*==============================*/
    /* 03 - function on page scroll */
    /*==============================*/
    $(window).scroll(function(){
        _functions.scrollCall();
    });

    _functions.scrollCall = function(){
        winScr = $(window).scrollTop();
        if (winScr > 1) $('header').addClass("sticky_shad");
        else $('header').removeClass("sticky_shad");
    };
    
	/*=================================*/
	/* 04 - function on document ready */
	/*=================================*/
	if(_ismobile) $('body').addClass('mobile');
	_functions.pageCalculations();
    _functions.scrollCall();
    
    
    if (_isresponsive) {
        $('.device_imgWrapp').removeClass('active');
    }
    
    setTimeout(function(){         
        $('body').addClass('loaded');
        _functions.initSwiper();
        $('#loader-wrapper').fadeOut();
    }, 100);
    
	/*============================*/
	/* 05 - function on page load */
	/*============================*/
	$(window).load(function(){
		
	});

	/*==============================*/
	/* 06 - function on page resize */
	/*==============================*/
	_functions.resizeCall = function(){
		_functions.pageCalculations();
	};
	if(!_ismobile){
		$(window).resize(function(){
			_functions.resizeCall();
		});
	} else{
		window.addEventListener("orientationchange", function() {
			_functions.resizeCall();
		}, false);
	}

	/*=====================*/
	/* 07 - swiper sliders */
	/*=====================*/
	var initIterator = 0;
	_functions.initSwiper = function(){
		$('.swiper-container').not('.initialized').each(function(){		
            
			var $t = $(this);	
            
			var index = 'swiper-unique-id-'+initIterator;

			$t.addClass('swiper-'+index+' initialized').attr('id', index);
			$t.find('.swiper-pagination').addClass('swiper-pagination-'+index);
			$t.find('.swiper-button-prev').addClass('swiper-button-prev-'+index);
			$t.find('.swiper-button-next').addClass('swiper-button-next-'+index);

			var slidesPerViewVar = ($t.data('slides-per-view'))?$t.data('slides-per-view'):1;
			if(slidesPerViewVar!='auto') slidesPerViewVar = parseInt(slidesPerViewVar, 10);

			swipers['swiper-'+index] = new Swiper('.swiper-'+index,{
				pagination: '.swiper-pagination-'+index,
		        paginationClickable: true,
		        nextButton: '.swiper-button-next-'+index,
		        prevButton: '.swiper-button-prev-'+index,
		        slidesPerView: slidesPerViewVar,
		        autoHeight:($t.is('[data-auto-height]'))?parseInt($t.data('auto-height'), 10):0,
		        loop: ($t.is('[data-loop]'))?parseInt($t.data('loop'), 10):0,
                loopedSlides: 4,
				autoplay: ($t.is('[data-autoplay]'))?parseInt($t.data('autoplay'), 10):0,
                autoplayDisableOnInteraction: 1,             
                breakpoints: ($t.is('[data-breakpoints]'))? { 
                    767: { slidesPerView: ($t.attr('data-xs-slides')!='auto')?parseInt($t.attr('data-xs-slides'), 10):'auto' }, 
                    991: { slidesPerView: ($t.attr('data-sm-slides')!='auto')?parseInt($t.attr('data-sm-slides'), 10):'auto' }, 
                    1199: { slidesPerView: ($t.attr('data-md-slides')!='auto')?parseInt($t.attr('data-md-slides'), 10):'auto' }}: {},

		        initialSlide: ($t.is('[data-ini]'))?parseInt($t.data('ini'), 10):0,
		        speed: ($t.is('[data-speed]'))?parseInt($t.data('speed'), 10):500,
		        keyboardControl: true,
                preloadImages: false,
                lazyLoading: true,
                slidesPerColumn: ($t.is('[data-slide-column]'))?parseInt($t.data('slide-column'), 10):0,
		        mousewheelControl: ($t.is('[data-mousewheel]'))?parseInt($t.data('mousewheel'), 10):0,
		        mousewheelReleaseOnEdges: true,
		        direction: ($t.is('[data-direction]'))?$t.data('direction'):'horizontal',
		        spaceBetween: ($t.is('[data-space-between]'))?parseInt($t.data('space-between'), 10):0,
                centeredSlides: ($t.is('[data-center]'))?parseInt($t.data('center'), 10):0,
                paginationType: ($t.is('[data-pagination-type]'))?$t.data('pagination-type'):'bullets',
                
                onTouchMove:function(swiper, event){
                    swiper.params.speed = 500;
                    clearTimeout(swiper.autoplayDelay);
                    $t.removeClass('linear');
                },
                onTransitionEnd: function(swiper){
                    swiper.autoplayDelay = setTimeout(function(){
                        swiper.startAutoplay();
                        swiper.params.speed = ($t.is('[data-speed]'))?parseInt($t.data('speed'), 10):500;
                        $t.addClass('linear');
                    }, 3000);
                }
			});
			swipers['swiper-'+index].update();
			initIterator++;
		});
		$('.swiper-container.swiper-control-top').each(function(){
			swipers['swiper-'+$(this).attr('id')].params.control = swipers['swiper-'+$(this).parent().find('.swiper-control-bottom').attr('id')];
		});
		$('.swiper-container.swiper-control-bottom').each(function(){
			swipers['swiper-'+$(this).attr('id')].params.control = swipers['swiper-'+$(this).parent().find('.swiper-control-top').attr('id')];
		});

	};
	$('.custom-arrows-prev').on('click',function(){
		swipers['swiper-'+$(this).siblings('.swiper-container').attr('id')].slidePrev();
	});
	$('.custom-arrows-next').on('click',function(){
		swipers['swiper-'+$(this).siblings('.swiper-container').attr('id')].slideNext();
	});

	/*==============================*/
	/* 08 - buttons, clicks, hovers */
	/*==============================*/
	//menu
	$('.cmn-toggle-switch').on('click', function(e){
		//$(this).toggleClass('active');
		$(this).parents('header').find('.toggle-block').toggleClass('active');
		e.preventDefault();
	});
	$('.main-nav .menu-toggle').on('click', function(e){
		$(this).closest('li').addClass('select').siblings('.select').removeClass('select');
		$(this).closest('li').siblings('.parent').find('ul').slideUp();
		$(this).closest('a').siblings('ul').slideToggle();
		e.preventDefault();
	});


    //open and close popup
    $(document).on('click', '.open-popup', function(){
        openPopup($(this).data('rel'));
        return false;
    });

    var openPopup = function(foo){
        $('.popup-content').removeClass('active');
        $('.popup-wrapper').addClass('active');
        foo.addClass('active');
        $('html').addClass('overflow-hidden');
    };

    $(document).on('click', '.popup-wrapper .button-close, .popup-wrapper .layer-close', function(){
        closePopup();
    });

    var closePopup = function(){
        $('.popup-wrapper, .popup-content').removeClass('active');
        $('html').removeClass('overflow-hidden');
        $('#video-popup .embed-responsive').html('');
        return false;
    };

    
    var videoPopup = function(src){
        $('#video-popup .embed-responsive').html('<iframe src="'+src+'"></iframe>');
        openPopup($('#video-popup'));
    };
    $('.video').on('click', function(e){
        e.preventDefault();
        videoPopup($(this).data('src'));
    });
    //open and close popup

    $(".nav_iteams, .btn.learnHow").on('click', function() {
        var header_height = $('.header').outerHeight();
        var acc_title = $('.acc_title').outerHeight();
        var top_offser = header_height + acc_title;
        var anchor = $(this).attr('data-attr-scroll');
        var anchorOffset = $('#'+anchor);

        $('html,body').animate({ 
            scrollTop: anchorOffset.offset().top -top_offser
        });    
    });
        
    //accordeon
    $('.accordeon-title').on('click', function(){
        var button = $(this);
        
        $(this).closest('.accordeon').find('.accordeon-title').not(this).removeClass('active triangle').next().slideUp();
        $(this).toggleClass('active triangle').next().slideToggle(
            function(){
                if(_isPhone){
                    $('html,body').animate({
                        scrollTop: button.offset().top - $('.header').outerHeight() - 20
                    }); 
                }
            }
        );
    });
    
    $('.navicon').on('click', function(){
        $(this).next().slideToggle();
        $(this).closest('header').toggleClass('height');
    })
    
    //gallery
    if($('.about_gallery').length){
    var $gallery = $('.about_gallery a').simpleLightbox({
        navText:[' ',' '],
        closeText:	' ',
        history: false,
        disableScroll: false,
        heightRatio: 0.7,
        widthRatio: 0.7
    });
    }
    
    $('.application_iteams').on('click', function(){
        var appl_attr =  $(this).attr('data-img');
        var apll_img =  $('#'+appl_attr);
        $('.device_imgWrapp').removeClass('active');
        apll_img.addClass('active');
        
        $('.application_iteams').removeClass('active');
        $(this).addClass('active'); 
        
        $('.default_img').fadeOut();
    });

    $('.device_imgWrapp .close').on('click', function(){
        $(this).closest('.device_imgWrapp').removeClass('active');
        
    });
    
    $(document).keyup(function(e) {
        if (e.keyCode == 27) {
            closePopup();
            if(_isresponsive) $('.device_imgWrapp').removeClass('active');
        }
    });
 
   $('.send').on('click', function(){
       $('.hidden_formCN').addClass('active');
       $(this).closest('.contact_form').addClass('hiden');  
       $('.visible_form').addClass('hiden');
       return false;
   });
    
    $('.okey').on('click', function(){
        $('.hidden_formCN').removeClass('active');
        $('.contact_form').removeClass('hiden');
        $('.visible_form').removeClass('hiden');
        return false;
    });
    
    $(window).scroll(function() {
        if($('.img-animate').length){
            $('.img-animate').css({'transform':'translateY('+(winScr/4.8)+'px)'});
        }
    });
    
    if(navigator.userAgent.match(/iPhone/i)){
        $('.cartWrapp ').remove();
        $('.devices_img img:first-child').remove();
    }

});




