/* Author:

*/

$(document).ready(function() {
	
	$('#blog-link').click(function() {
		
		$('#blog-panel').css(
			'right', ($('body').width()*-0.8)
		);
		$('#blog-panel').animate({
			right : '+='+($('body').width()*0.8)
		},250);
		
	});
	
	$('#twitter-link').click(function() {
		
		$('#twitter-panel').css(
			'right', ($('body').width()*-0.8)
		);
		$('#twitter-panel').animate({
			right : '+='+($('body').width()*0.8)
		},250);
		
	});
	
	$('#github-link').click(function() {
		
		$('#github-panel').css(
			'right', ($('body').width()*-0.8)
		);
		$('#github-panel').animate({
			right : '+='+($('body').width()*0.8)
		},250);
		
	});
	
	$('#flickr-link').click(function() {
		
		$('#flickr-panel').css(
			'right', ($('body').width()*-0.8)
		);
		$('#flickr-panel').animate({
			right : '+='+($('body').width()*0.8)
		},250);
		
	});
	
	$('#facebook-link').click(function() {
		
		$('#facebook-panel').css(
			'right', ($('body').width()*-0.8)
		);
		$('#facebook-panel').animate({
			right : '+='+($('body').width()*0.8)
		},250);
		
	});
	
	$('#delicious-link').click(function() {
		
		$('#delicious-panel').css(
			'right', ($('body').width()*-0.8)
		);
		$('#delicious-panel').animate({
			right : '+='+($('body').width()*0.8)
		},250);
		
	});
	
	$('#google-link').click(function() {
		
		$('#google-panel').css(
			'right', ($('body').width()*-0.8)
		);
		$('#google-panel').animate({
			right : '+='+($('body').width()*0.8)
		},250);
		
	});
	
	$('.panel-closebutton').click(function() {
	
		$('.panels').animate({
			right : ($('body').width()*-0.8)
		},250);
		
	});
});