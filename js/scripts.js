// Ref: https://greensock.com/docs/TimelineLite

// Animations
// Middle layer - First layer of buttons
$(document).ready(function () {


var animate_middle = new TimelineLite({paused: true});

animate_middle
	.from(".middle-layer", 0.5, {
		transformOrigin:"50% 50%", 
		scale: "0"
	}, 0, 0)

	.from(".middle-layer .button-group", 0.75, {
		transformOrigin: "50% 50%",
		rotation: "-=135"
	}, 0, 0)
	
	.from("middle-layer .button-group", 0.5, {
		opacity: "0"
	}, 0, 0)
;

// Outside layer - Outside layer menu background
var animate_outside = new TimelineLite({paused: true});

animate_outside
	.from(".outside-layer", 0.5, {
		transformOrigin:"50% 50%",
		scale: "0"
	}, 0, 0)
;

// Home Buttons
var animate_home = new TimelineLite({paused: true});

animate_home
	.staggerFrom(".home-menu g", 0.5, {
		transformOrigin:"50% 50%",
		opacity: "0",
		scale: "0"
	}, 0.125, 0.25)
;

// More Buttons
var animate_more = new TimelineLite({paused: true});

animate_more
	.staggerFrom(".more-menu g", 0.5, {
		transformOrigin:"50% 50%",
		opacity: "0",
		scale: "0"
	}, 0.125, 0.25)
;

// Settings Buttons
var animate_settings = new TimelineLite({paused: true});

animate_settings
	.staggerFrom(".settings-menu g", 0.5, {
		transformOrigin:"50% 50%",
		opacity: "0",
		scale: "0"
	}, 0.125, 0.25)
;

// FAQ Buttons
var animate_faq = new TimelineLite({paused: true});

animate_faq
	.staggerFrom(".faq-menu g", 0.5, {
		transformOrigin:"50% 50%",
		opacity: "0",
		scale: "0"
	}, 0.125, 0.25)
;






// Interaction

// Variables
var menuOpen = false;
var outsideCircleOpen = false;
var homeOpen = false;
var faqOpen = false;
var settingsOpen = false;
var moreOpen = false;
var circleRect = false;

// Main (Center) Button
$('.main-menu').click(function() {

	if($(".draggable-menu").data('dragging')) return;
	
	if(menuOpen == false) {
		
		$('.main-menu').addClass('is-active');
		animate_middle.play();
		menuOpen = true;
	
	} else {
		
		$('.middle-layer [class*="-button"]').removeClass('is-active');
		$('.outside-layer [class*="-button"]').removeClass('is-active');

		setTimeout(function() {
			$('.main-menu').removeClass('is-active');
		}, 750);
		
		animate_middle.reverse();
		animate_outside.reverse();

		animate_home.reverse();
		animate_faq.reverse();
		animate_settings.reverse();
		animate_more.reverse();
		
		// reset all variables
		menuOpen = false;
		outsideCircleOpen = false;
		homeOpen = false;
		faqOpen = false;
		settingsOpen = false;
		moreOpen = false;
	
	}
	
});

// Home Button
$('.home-button').click(function() {
	
	if(homeOpen == false) {
		
		if(outsideCircleOpen == false) {
			animate_outside.play();
		}
		
		animate_home.play();

		outsideCircleOpen = true;
		homeOpen = true;

		animate_faq.reverse();
		animate_settings.reverse();
		animate_more.reverse();

		$(this).addClass('is-active');
		
	} else {
		homeOpen = false;
		outsideCircleOpen = false;
		animate_outside.reverse();
		animate_home.reverse();
	}

	faqOpen = false;
	settingsOpen = false;
	moreOpen = false;
	
});

// FAQ Button
$('.faq-button').click(function() {

	if(faqOpen == false) {
		
		if(outsideCircleOpen == false) {
			animate_outside.play();
		}

		animate_faq.play();
		
		outsideCircleOpen = true;
		faqOpen = true;

		animate_home.reverse();
		animate_settings.reverse();
		animate_more.reverse();

		$(this).addClass('is-active');
		
	} else {
		faqOpen = false;
		outsideCircleOpen = false;
		animate_outside.reverse();
		animate_faq.reverse();
	}
	
	homeOpen = false;
	settingsOpen = false;
	moreOpen = false;

});

// Settings Button
$('.settings-button').click(function() {

	if(settingsOpen == false) {
		
		if(outsideCircleOpen == false) {
			animate_outside.play();
		}
		
		animate_settings.play();

		outsideCircleOpen = true;
		settingsOpen = true;
		
		animate_faq.reverse();
		animate_home.reverse();
		animate_more.reverse();

		$(this).addClass('is-active');

	} else {
		settingsOpen = false;
		outsideCircleOpen = false;
		animate_outside.reverse();
		animate_settings.reverse();
	}
	
	homeOpen = false;
	faqOpen = false;
	moreOpen = false;
	
});

// More Button
$('.more-button').click(function() {

	if(moreOpen == false) {

		if(outsideCircleOpen == false) {
			animate_outside.play();
		}

		animate_more.play();

		outsideCircleOpen = true;
		moreOpen = true;

		animate_faq.reverse();
		animate_home.reverse();
		animate_settings.reverse();

		$(this).addClass('is-active');

	} else {
		moreOpen = false;
		outsideCircleOpen = false;
		animate_outside.reverse();
		animate_more.reverse();
	}

	homeOpen = false;
	settingsOpen = false;
	faqOpen = false;

});



// Middle Layer Active States
$('.middle-layer [class*="-button"]').click(function(){

	$('.middle-layer [class*="-button"]').removeClass('is-active');
	$('.outside-layer [class*="-button"]').removeClass('is-active');
	$(this).addClass('is-active');

});

//Outside Layer Active States
$('.outside-layer [class*="-button"]').click(function(){

	$('.outside-layer [class*="-button"]').removeClass('is-active');
	$(this).addClass('is-active');

});

$( ".draggable-menu" ).draggable(
	{
		start: function(event, ui){

			$(this).data('dragging', true);
		},
		stop: function(event, ui){
			setTimeout(function(){
				$(event.target).data('dragging', false);
			}, 0.01);
		},
		containment: 'body',
		scroll: false,
		drag: function(){
			$(this).css({
				'transform' : 'translate(0,0)',
				'-webkit-transform' : 'translate(0,0)',
				'-moz-transform' : 'translate(0,0)',
				'-ms-transform' : 'translate(0,0)',
				'-o-transform' : 'translate(0,0)'
			});
			var offset = $(this).offset();
			var xPos = offset.left + 396;
			var yPos = offset.top + 396;
			$('#posX').text('x: ' + xPos);
			$('#posY').text('y: ' + yPos);
		}
	});



	/*****************
	 Summary
	 *****************/

	/* Watch the codecast to learn how this demo was made: https://www.youtube.com/watch?v=MDLiVB6g2NY&hd=1 */

	/* This demo serves two purposes:
        1) Act as Velocity's primary visual test (in addition to the unit and load tests).
        2) Demonstrate all of Velocity's features.
        3) Demonstrate the performance capabilties of the DOM; WebGL and Canvas are not used in this demo.
    */

	/* Intended demo behavior:
        1) A message box fades out.
        2) Dots are randomly assigned coordinates and opacities then translated and increased in opacity. This animation is then reversed.
        3) Meanwhile, the dots' container has its perspective, rotateZ, and opacity animated in a loop with a delay.
        4) Once the dot animation is complete, the message box fades back in.
    */

	/*********************
	 Device Detection
	 *********************/

	var isWebkit = /Webkit/i.test(navigator.userAgent),
		isChrome = /Chrome/i.test(navigator.userAgent),
		isMobile = !!("ontouchstart" in window),
		isAndroid = /Android/i.test(navigator.userAgent),
		isIE = document.documentMode;

	/***************
	 Helpers
	 ***************/

	/* Randomly generate an integer between two numbers. */
	function r (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	/* Override the default easing type with something a bit more jazzy. */
	$.Velocity.defaults.easing = "easeInOutsine";

	/*******************
	 Dot Creation
	 *******************/

	/* Differentiate dot counts based on roughly-guestimated device and browser capabilities. */
	var dotsCount,
		dotsHtml = "",
		$count = $("#count"),
		$dots;

	if (window.location.hash) {
		dotsCount = window.location.hash.slice(1);
	} else {
		dotsCount = isMobile ? (isAndroid ? 40 : 60) : (isChrome ? 175 : 150);
	}

	for (var i = 0; i < dotsCount; i++) {
		dotsHtml += "<div class='dot'></div>";
	}

	$dots = $(dotsHtml);

	$count.html(dotsCount);

	/*************
	 Setup
	 *************/

	var $container = $("#container");

	var screenWidth = window.innerWidth,
		screenHeight = window.innerHeight,
		chromeHeight = screenHeight - (document.documentElement.clientHeight || screenHeight);

	var translateZMin = -725,
		translateZMax = 600;

	var containerAnimationMap = {
		perspective: [ 215, 50 ],
		opacity: [ 0.90, 0.55 ]
	};

	/* IE10+ produce odd glitching issues when you rotateZ on a parent element subjected to 3D transforms. */
	if (!isIE) {
		containerAnimationMap.rotateZ = [ 10, 0 ];
	}

	/*****************
	 Animation
	 *****************/


	/* Animate the dots' container. */
	$container
		.css("perspective-origin", screenWidth/2 + "px " + ((screenHeight * 0.45) - chromeHeight/2) + "px")
		.velocity(containerAnimationMap, { duration: 1000, loop: true, delay: 3000 });


	/* Special visual enhancement for WebKit browsers, which are faster at box-shadow manipulation. */
	if (isWebkit) {
		$dots.css("boxShadow", "0px 0px 4px 0px #4bc2f1");
	}

	/* Animate the dots. */
	$dots
		.velocity({
			translateX: [
				function () {
					return "+=" + r(-screenWidth / 2.5, screenWidth / 2.5)
				},
				function () {
					return r(0, screenWidth)
				}
			],
			translateY: [
				function () {
					return "+=" + r(-screenHeight / 2.75, screenHeight / 2.75)
				},
				function () {
					return r(0, screenHeight)
				}
			],
			translateZ: [
				function () {
					return "+=" + r(translateZMin, translateZMax)
				},
				function () {
					return r(translateZMin, translateZMax)
				}
			],
			opacity: [
				function () {
					return Math.random()
				},
				function () {
					return Math.random() + 0.1
				}
			],
			rotateZ : [ function () {
				return r(100, 180)
			}, function () {
				return r(100, 180)
			} ]
		}, {duration: 10000, loop: true})
		.appendTo($container);

});