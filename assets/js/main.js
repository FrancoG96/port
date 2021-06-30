(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch mode.
		if (browser.mobile)
			$body.addClass('is-touch');

	// Scrolly links.
		$('.scrolly').scrolly({
			speed: 2000
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			alignment: 'right',
			hideDelay: 350
		});

	// Nav.

		// Title Bar.
			$(
				'<div id="titleBar">' +
					'<a href="#navPanel" class="toggle"></a>' +
					'<span class="switch">' + $('#switch').html() + '</span>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
				
			)
			
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

	// Parallax.
	// Disabled on IE (choppy scrolling) and mobile platforms (poor performance).
		if (browser.name == 'ie'
		||	browser.mobile) {

			$.fn._parallax = function() {

				return $(this);

			};

		}
		else {

			$.fn._parallax = function() {

				$(this).each(function() {

					var $this = $(this),
						on, off;

					on = function() {

						$this
							.css('background-position', 'center 0px');

						$window
							.on('scroll._parallax', function() {

								var pos = parseInt($window.scrollTop()) - parseInt($this.position().top);

								$this.css('background-position', 'center ' + (pos * -0.15) + 'px');

							});

					};

					off = function() {

						$this
							.css('background-position', '');

						$window
							.off('scroll._parallax');

					};

					breakpoints.on('<=medium', off);
					breakpoints.on('>medium', on);

				});

				return $(this);

			};

			$window
				.on('load resize', function() {
					$window.trigger('scroll');
				});

		}

	// Wrappers.
		var $wrappers = $('.wrapper');

		$wrappers
			.each(function() {

				var $this = $(this),
					on, off;

				on = function() {

					$this.scrollex({
						top:		250,
						bottom:		0,
						initialize:	function(t) { $this.addClass('inactive'); },
						terminate:	function(t) { $this.removeClass('inactive'); },
						enter:		function(t) { $this.removeClass('inactive'); },

						// Uncomment the line below to "rewind" when this wrapper scrolls out of view.

						//leave:	function(t) { $this.addClass('inactive'); },

					});

				};

				off = function() {
					$this.unscrollex();
				};

				breakpoints.on('<=medium', off);
				breakpoints.on('>medium', on);

			});

	// Banner.
		var $banner = $('#banner');

		$banner
			._parallax();

})(jQuery);



	//smoth scrolling

		$('a[href*="#"]')
		.not('[href="#"]')
		.not('[href="#0"]')
		.click(function(event) {
			
			if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname){

				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

					if (target.length) {
						
						event.preventDefault();
						$('html, body').animate({
						scrollTop: target.offset().top
						}, 1000, function() {
						
							var $target = $(target);
							$target.focus();
							if ($target.is(":focus")) { 
								return false;
							} 
								else {
									$target.attr('tabindex','-1'); 
									$target.focus(); 
								};
						});
					}
			}
		});


	// Go Top 
		window.onscroll = function() {
			if(document.documentElement.scrollTop > 200){
				document.querySelector('.go-top-container').classList.add('show');
			}
				else{
					document.querySelector('.go-top-container').classList.remove('show');	
				}
		}

		document.querySelector('.go-top-container').addEventListener('click', () =>{
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
		});

	// Textarea Autosizing	

		function getScrollHeight(elm){
			var savedValue = elm.value
			elm.value = ''
			elm._baseScrollHeight = elm.scrollHeight
			elm.value = savedValue
		}
		
		function onExpandableTextareaInput({ target:elm }){
			
			if( !elm.classList.contains('autoExpand') || !elm.nodeName == 'texarea' ) return
			
			var minRows = elm.getAttribute('data-min-rows')|0, rows;
			!elm._baseScrollHeight && getScrollHeight(elm)
		
			elm.rows = minRows
			rows = Math.ceil((elm.scrollHeight - elm._baseScrollHeight) / 16)
			elm.rows = minRows + rows
		}
		
		document.addEventListener('input', onExpandableTextareaInput)



	// Switch Dark Mode 
	const btnSwitch = document.querySelector('#switch');

	btnSwitch.addEventListener('click', () => {
		document.body.classList.toggle('dark');
		btnSwitch.classList.toggle('active');

		if(document.body.classList.contains('dark')){
			localStorage.setItem('dark-mode', 'true');
		} else {
			localStorage.setItem('dark-mode', 'false');
		}
	});

	btnSwitch.addEventListener('click', () => {
		document.body.classList.titleBar('dark');
		btnSwitch.classList.titleBar('active');

		if(document.body.classList.contains('dark')){
			localStorage.setItem('dark-mode', 'true');
		} else {
			localStorage.setItem('dark-mode', 'false');
		}
	});

	if(localStorage.getItem('dark-mode') === 'true'){
		document.body.classList.add('dark');
		btnSwitch.classList.add('active');
	} else {
		document.body.classList.remove('dark');
		btnSwitch.classList.remove('active');
	}
