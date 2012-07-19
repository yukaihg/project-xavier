jQuery(document).ready(function ($) {

	initUI();


	if (window.location.toString().indexOf('starred')!= -1){
		//if starred
		//TODO: change to a better method later

		loadStarredArticles();

	}


	/* Use this js doc for all application specific JS */

  /* TABS --------------------------------- */
  /* Remove if you don't need :) */






});

function initUI(){
	$('dl.tabs dd a').on('click.fndtn', function (event) {
		activateTab($(this).parent('dd'));
	});

	if (window.location.hash) {
		activateTab($('a[href="' + window.location.hash + '"]'));
		$.foundation.customForms.appendCustomMarkup();
	}

	/* ALERT BOXES ------------ */
	$(".alert-box").delegate("a.close", "click", function(event) {
		event.preventDefault();
		$(this).closest(".alert-box").fadeOut(function(event){
			$(this).remove();
		});
	});

	/* PLACEHOLDER FOR FORMS ------------- */
	/* Remove this and jquery.placeholder.min.js if you don't need :) */
	$('input, textarea').placeholder();

	/* TOOLTIPS ------------ */
	$(this).tooltips();

	/* UNCOMMENT THE LINE YOU WANT BELOW IF YOU WANT IE6/7/8 SUPPORT AND ARE USING .block-grids */
	//  $('.block-grid.two-up>li:nth-child(2n+1)').css({clear: 'left'});
	//  $('.block-grid.three-up>li:nth-child(3n+1)').css({clear: 'left'});
	//  $('.block-grid.four-up>li:nth-child(4n+1)').css({clear: 'left'});
	//  $('.block-grid.five-up>li:nth-child(5n+1)').css({clear: 'left'});


	/* DROPDOWN NAV ------------- */

	var lockNavBar = false;
	/* Windows Phone, sadly, does not register touch events :( */
	if (Modernizr.touch || navigator.userAgent.match(/Windows Phone/i)) {
		$('.nav-bar a.flyout-toggle').on('click.fndtn touchstart.fndtn', function(e) {
			e.preventDefault();
			var flyout = $(this).siblings('.flyout').first();
			if (lockNavBar === false) {
				$('.nav-bar .flyout').not(flyout).slideUp(500);
				flyout.slideToggle(500, function(){
					lockNavBar = false;
				});
			}
			lockNavBar = true;
		});
		$('.nav-bar>li.has-flyout').addClass('is-touch');
	} else {
		$('.nav-bar>li.has-flyout').hover(function() {
			$(this).children('.flyout').show();
		}, function() {
			$(this).children('.flyout').hide();
		});
	}

	/* DISABLED BUTTONS ------------- */
	/* Gives elements with a class of 'disabled' a return: false; */

	/* SPLIT BUTTONS/DROPDOWNS */
	$('.button.dropdown > ul').addClass('no-hover');

	$('.button.dropdown').on('click.fndtn touchstart.fndtn', function (e) {
		e.stopPropagation();
	});
	$('.button.dropdown.split span').on('click.fndtn touchstart.fndtn', function (e) {
		e.preventDefault();
		$('.button.dropdown').not($(this).parent()).children('ul').removeClass('show-dropdown');
		$(this).siblings('ul').toggleClass('show-dropdown');
	});
	$('.button.dropdown').not('.split').on('click.fndtn touchstart.fndtn', function (e) {
		e.preventDefault();
		$('.button.dropdown').not(this).children('ul').removeClass('show-dropdown');
		$(this).children('ul').toggleClass('show-dropdown');
	});
	$('body, html').on('click.fndtn touchstart.fndtn', function () {
		$('.button.dropdown ul').removeClass('show-dropdown');
	});

	// Positioning the Flyout List
	var normalButtonHeight  = $('.button.dropdown:not(.large):not(.small):not(.tiny)').outerHeight() - 1,
		largeButtonHeight   = $('.button.large.dropdown').outerHeight() - 1,
		smallButtonHeight   = $('.button.small.dropdown').outerHeight() - 1,
		tinyButtonHeight    = $('.button.tiny.dropdown').outerHeight() - 1;

	$('.button.dropdown:not(.large):not(.small):not(.tiny) > ul').css('top', normalButtonHeight);
	$('.button.dropdown.large > ul').css('top', largeButtonHeight);
	$('.button.dropdown.small > ul').css('top', smallButtonHeight);
	$('.button.dropdown.tiny > ul').css('top', tinyButtonHeight);


}

function loadStarredArticles(){
	var engage = new coreApi.Engage();
	engage.getStarredResources(function(data){
		if(data){
			if (data.errorcode == 0){
				//$('#contents').empty();
				console.log(data);
				$.each(data.resources, function (index, item) {

					console.log(item);

					var article =
						'<div class="three columns">'
							+ '<div class="innercontents" data-id="' + item.uuid + '" id="' + item.uuid + '">'
							+ '<span class="uploader">' + item.user.firstName + " " + item.user.lastName+ '</span>'
							+ isProf(item.user.type) //return nothing if not
							+ '<div class="post_details"> '
							+ '<p>Posted in '
							+ '<span class="coursename">' +'<a>' + item.course.subject +" "+ item.course.number
							+ '-'  + (item.section.title).replace('WEEK ',"WK")  + '</a>'
							+ '</span>'
							+ '<span class="post_time"> ' + formartDate(item.createdAt) + '</span>'
							+ '</p>'
							+ '</div>'
							+ '<h5>'
							+ '<a href="/article/' + item.uuid + '">' + item.title + '</a></h5>'
							+ '<div class="imgpreview">'
							+ '<img src="'+ item.thumbnail + '" alt="'+ item.title + '" />'
							+ '</div>'
							+ '<div class="articlepreview">' + '<p>' + item.excerpt + '</p>'
							+ '</div>'
							+ '<div class="likescomments">'
							+ '<span class="typicn star starred"></span>'

							+ '<span> Like ('+ item.likes +') </span>'
							+ '<span> Comments ('+ item.totalComments +') </span>'
							+ '</div>'
							+ '</div>'
							+ '</div>';

					$('#contents').append(article);
				});

			}

			else{

			}
		}
		else{

		}


	})
}


function activateTab($tab) {
	var $activeTab = $tab.closest('dl').find('dd.active'),
		contentLocation = $tab.children('a').attr("href") + 'Tab';

	// Strip off the current url that IE adds
	contentLocation = contentLocation.replace(/^.+#/, '#');

	// Strip off the current url that IE adds
	contentLocation = contentLocation.replace(/^.+#/, '#');

	//Make Tab Active
	$activeTab.removeClass('active');
	$tab.addClass('active');

	//Show Tab Content
	$(contentLocation).closest('.tabs-content').children('li').hide();
	$(contentLocation).css('display', 'block');
}


function formartDate(old_date){
	var now = new Date();
	var post_time = new Date(Date.parse(old_date));
	var prettytime = formatAgo(post_time, null, now);
	return prettytime;
}

function isProf(user_type){
	if (user_type === 0){
		 return '<span id="prof" title="instructor" class="typicn tick"></span>'
	}
	else {
		return '';
	}
}