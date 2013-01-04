/* Author: Ryan O'Shea
*/

$(document).ready(function() {
	var loadedBlog = false;
	var loadedDelicious = false;
	
	function closePanels(me) {
		
		$('.panels:not(.panels-small)').not(me).animate({
			right : ($('body').width()*-0.8)
		},250,
		
		function() {
			$('.panels').not(me).hide();
		});
		
		$('.panels-small').not(me).animate({
			right : ($('body').width()*-0.3)
		},250,
		function() {
			$('.panels-small').not(me).hide();
		});		
	}
	

	$('#blog-link').click(function() {
		
		closePanels('#blog-panel');
		$('#blog-panel').show();
		
		$('#blog-panel').css(
			'right', ($('body').width()*-0.8)
		);
		$('#blog-panel').animate({
			right : '+='+($('body').width()*0.8)
		},250);
		
		if(!loadedBlog) {		
			$('#blog-panel').prepend('<iframe src="http://post.ryanoshea.com/"></iframe>');
			loadedBlog = true;
		}
	});
	
	$('#twitter-link').click(function() {
		closePanels('#twitter-panel');
		$('#twitter-panel').show();
		$('#twitter-panel').css(
			'right', ($('body').width()*-0.3)
		);
		$('#twitter-panel').animate({
			right : '+='+($('body').width()*0.3)
		},250);
		
	});
	
	$('#delicious-link').click(function() {
		closePanels('#delicious-panel');
		$('#delicious-panel').show();
		$('#delicious-panel').css(
			'right', ($('body').width()*-0.8)
		);
		$('#delicious-panel').animate({
			right : '+='+($('body').width()*0.8)
		},250);
		
		if(!loadedDelicious) {		
			$('#delicious-panel').prepend('<iframe src="http://delicious.com/ryancoshea/"></iframe>');
			loadedDelicious = true;
		}
		
	});
	
	
	
	$('.panel-closebutton').click(function() {
		closePanels();
	});
	
	$('.panel-closebutton-small').click(function() {
		closePanels();
	});
	
	
	$('#profiles li:first-child').css('color','inherit');
	
	$('#profiles li').hover(function() {
		$('#profiles li').css(
			'color','rgba(0,0,0,0)'
		);
		$(this).css(
			'color','inherit'
		);	
	});
});