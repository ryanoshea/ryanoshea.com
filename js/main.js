/* Author:

*/

$(document).ready(function() {
	
	$('#blog-link').click(function() {
		
		$('#blog-panel').css(
			'right', ($('body').width()*-0.8)
		);
		$('#blog-panel').animate({
			right : '+='+($('body').width()*0.8)
		},500);
		
	});
	
	$('.panel-closebutton').click(function() {
	
		$('.panels').animate({
			right : ($('body').width()*-0.8)
		},500);
		
	});
});