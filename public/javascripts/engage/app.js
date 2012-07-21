var stylePicker = new stylePicker();

jQuery(document).ready(function ($) {

	initUI();

	var engage = new coreApi.Engage();




	if (window.location.toString().indexOf('starred') != -1) {
		//if starred
		//TODO: change to a better method later
		$('#starred_btn').addClass('active');
		loadStarredArticles(engage);

	}
	else if (window.location.toString().indexOf('instructor') != -1) {
		//if starred
		//TODO: change to a better method later
		$('#instructor_btn').addClass('active');
		loadInstructorArticles(engage);

	}
	else if (window.location.toString().indexOf('mine') != -1) {
		$('#contruibutions_btn').addClass('active');
		loadMyArticles(engage);


	}
	else if (window.location.toString().indexOf('design') != -1) {


	}
	else {
		$('#all_btn').addClass('active');
		loadAllArticles(engage);
	}

	$('span.typicn.star').live('click', function () {
		var self = $(this);
		var resource_uuid = $(this).parent().parent().attr('data-id');
		if (resource_uuid) {
			engage.starResource(resource_uuid, function (data) {
				if (data && data.errorcode === 0) {
					self.addClass('starred');
				}


			})
		}

	})

	$('span.typicn.star.starred').live('click', function () {
		var self = $(this);
		var resource_uuid = $(this).parent().parent().attr('data-id');
		if (resource_uuid) {
			engage.unstarResource(resource_uuid, function (data) {
				if (data && data.errorcode === 0) {
					self.removeClass('starred');
				}

			})
		}

	})


	/* Use this js doc for all application specific JS */

	/* TABS --------------------------------- */
	/* Remove if you don't need :) */


});

function initUI() {
	$('dl.tabs dd a').on('click.fndtn', function (event) {
		activateTab($(this).parent('dd'));
	});

	if (window.location.hash) {
		activateTab($('a[href="' + window.location.hash + '"]'));
		$.foundation.customForms.appendCustomMarkup();
	}

	/* ALERT BOXES ------------ */
	$(".alert-box").delegate("a.close", "click", function (event) {
		event.preventDefault();
		$(this).closest(".alert-box").fadeOut(function (event) {
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
		$('.nav-bar a.flyout-toggle').on('click.fndtn touchstart.fndtn', function (e) {
			e.preventDefault();
			var flyout = $(this).siblings('.flyout').first();
			if (lockNavBar === false) {
				$('.nav-bar .flyout').not(flyout).slideUp(500);
				flyout.slideToggle(500, function () {
					lockNavBar = false;
				});
			}
			lockNavBar = true;
		});
		$('.nav-bar>li.has-flyout').addClass('is-touch');
	} else {
		$('.nav-bar>li.has-flyout').hover(function () {
			$(this).children('.flyout').show();
		}, function () {
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
	var normalButtonHeight = $('.button.dropdown:not(.large):not(.small):not(.tiny)').outerHeight() - 1,
		largeButtonHeight = $('.button.large.dropdown').outerHeight() - 1,
		smallButtonHeight = $('.button.small.dropdown').outerHeight() - 1,
		tinyButtonHeight = $('.button.tiny.dropdown').outerHeight() - 1;

	$('.button.dropdown:not(.large):not(.small):not(.tiny) > ul').css('top', normalButtonHeight);
	$('.button.dropdown.large > ul').css('top', largeButtonHeight);
	$('.button.dropdown.small > ul').css('top', smallButtonHeight);
	$('.button.dropdown.tiny > ul').css('top', tinyButtonHeight);


}

function loadInstructorArticles(engage) {

	var	cached_json = localStorage.getItem('allArticles');
	if(cached_json){
		var data = JSON.parse(cached_json);
		$.each(data.resources, function (index, item) {

			console.log(item);
			if (item.user.type === 1) {
				article = renderArticlePreviewBox(item);
				$('#contents').append(article);
			}

		});
	}

	engage.getResourcesByCourseUUIDs(function (data) {

		if (data) {


			if (data.errorcode == 0) {
				localStorage.setItem('allArticles', JSON.stringify(data));
				$('.articlebox').remove();
				//$('#contents').empty();
				console.log(data);
				$.each(data.resources, function (index, item) {

					console.log(item);
					if (item.user.type === 1) {
						article = renderArticlePreviewBox(item);
						$('#contents').append(article);
					}

				});

			}

			else {

			}
		}
		else {

		}


	})
}


function loadMyArticles(engage) {
	var	cached_json = localStorage.getItem('myArticles');
	if(cached_json){
		var data = JSON.parse(cached_json);
		$.each(data.resources, function (index, item) {

			console.log(item);

			article = renderArticlePreviewBox(item);
			$('#contents').append(article);


		});
	}

	engage.getResourcesByCurrentUserId(function (data) {
		if (data) {

			if (data.errorcode == 0) {
				localStorage.setItem('myArticles', JSON.stringify(data));
				$('.articlebox').remove();
				//$('#contents').empty();
				console.log(data);
				$.each(data.resources, function (index, item) {

					console.log(item);
					article = renderArticlePreviewBox(item);


					$('#contents').append(article);
				});

			}

			else {

			}
		}
		else {

		}


	})
}


function loadAllArticles(engage) {
	var	cached_json = localStorage.getItem('allArticles');
	if(cached_json){
		var data = JSON.parse(cached_json);
		$.each(data.resources, function (index, item) {

			console.log(item);

			article = renderArticlePreviewBox(item);
			$('#contents').append(article);


		});
	}

	engage.getResourcesByCourseUUIDs(function (data) {
		if (data) {
			if (data.errorcode == 0) {
				localStorage.setItem('allArticles', JSON.stringify(data));
				$('.articlebox').remove();
				//$('#contents').empty();
				console.log(data);
				$.each(data.resources, function (index, item) {

					console.log(item);
					article = renderArticlePreviewBox(item);


					$('#contents').append(article);
				});

			}

			else {

			}
		}
		else {

		}


	})
}

function loadStarredArticles(engage) {
	var	cached_json = localStorage.getItem('starredArticles');
	if(cached_json){
		var data = JSON.parse(cached_json);
		$.each(data.resources, function (index, item) {

			console.log(item);

			article = renderArticlePreviewBox(item);
			$('#contents').append(article);


		});
	}

	engage.getStarredResources(function (data) {
//	engage.getResourcesByCourseUUIDs(function(data){
		if (data) {
			if (data.errorcode == 0) {
				localStorage.setItem('starredArticles', JSON.stringify(data));
				$('.articlebox').remove();
				//$('#contents').empty();
				console.log(data);
				$.each(data.resources, function (index, item) {

					console.log(item);
					article = renderArticlePreviewBox(item);


					$('#contents').append(article);
				});

			}

			else {

			}
		}
		else {

		}


	})
}

function renderArticlePreviewBox(item) {
	var article =
		'<div class="three columns articlebox">'
			+ '<div class="innercontents '+ stylePicker.getStyle(item.course.subject) +'" data-id="' + item.uuid + '" id="' + item.uuid + '">'
			+ '<img src="'+'https://secure.gravatar.com/avatar/aa50677b765abddd31f3fd1c279f75e0?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-140.png'+'<" class="avatar"/>'


			+ '<div class="post_details"> '
			+ '<span>' + item.user.firstName + " " + item.user.lastName + '</span>'
			+ isProf(item.user.type) //return nothing if not

			+ '<p>Posted in '
			+ '<span class="coursename">' + '<a>' + item.course.subject + " " + item.course.number
			+ '-' + renameSectionName(item) + '</a>'
			+ '</span>'
			+ '<span class="post_time"> ' + formartDate(item.createdAt) + '</span>'
			+ '</p>'
			+ '</div>'
			//end of post_details

			+ renderPreviewImage(item)
			//end of innerwrap

			+ '<div class="articlepreview">' + '<p>' + renderExcerpt(item.excerpt) + '</p>'
			+ '</div>'
			+ '<div class="likescomments">'
			+ renderStar(item.starred)

			+ '<span> Like (' + item.likes + ') </span>'
			+ '<span> Comments (' + item.totalComments + ') </span>'
			+ '</div>'
			+ '</div>'
			+ '</div>';
	return article;

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


function formartDate(old_date) {
	var now = new Date();
	var post_time = new Date(Date.parse(old_date));
	var prettytime = formatAgo(post_time, null, now);
	return prettytime;
}

function renameSectionName(item) {
	if (item.section && item.section.title && item.section.title.indexOf('WEEK') !== -1) {
		return (item.section.title).replace('WEEK ', "WK");
	}
	else {
		return "?";
	}

}

function isProf(user_type) {
	if (user_type === 1) {
		return '<span id="prof" title="instructor" class="typicn tick"></span>'
	}
	else {
		return '';
	}
}

function renderStar(starred) {
	if (starred) {
		return '<span class="typicn star starred"></span>';
	}
	else {
		return '<span class="typicn star"></span>'
	}
}


function renderPreviewImage(item) {

	var previewImage =  '<div class="innerwrap" style=\'background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0.62)), color-stop(27%,rgba(0,0,0,0.12)), color-stop(41%,rgba(0,0,0,0.01)), color-stop(53%,rgba(0,0,0,0.06)), color-stop(100%,rgba(0,0,0,0.48))), url("'
		+ (item.thumbnail ? item.thumbnail :'http://www.blog.spoongraphics.co.uk/wp-content/uploads/2011/great-britain/great-britain-sm.jpg')
//		+ 'http://www.smashinglists.com/wp-content/uploads/2010/02/persian.jpg'
		+ '")' +'\'>'
		+ '<h5>'
		+ '<a href="/article/' + item.uuid + '">' + item.title + '</a></h5>'
		+'</div>'

	console.log(previewImage);


	return  previewImage


//	if (item.thumbnail) {
//
//		return '<img src="' + item.thumbnail + '" alt="' + item.title + '" />';
//	}
//	else {
//		return '<img src="http://www.blog.spoongraphics.co.uk/wp-content/uploads/2011/great-britain/great-britain-sm.jpg" alt="' + item.title + '" />';
//	}


}

function renderExcerpt(excerpt) {
	if (excerpt) {

		return excerpt;
	}
	else {
		return 'Australia\'s Prime Minister Julia Gillard and New Zealand\'s Foreign Minister Murray McCully give their reaction (whaling footage courtesy of';
	}
}


// a class that choose unique box color style for given subject
// if the subject is new, give a new color, otherwise use the old one;

function stylePicker() {
	var available_styles = ['box-style-1', 'box-style-2'];
	var subjects = {};

	this.getStyle = function (subject) {

		if (subjects[subject]) {
			return subjects[subject]

		}
		else {
			var result  = available_styles.shift();
			if(!result){
				result = "box-style-1";
			}
			subjects[subject] = result;
			return result;
		}

	}


}