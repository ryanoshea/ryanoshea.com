<?php 
	function echoPageHead($title, $id) {
?>
<!doctype html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>
        	Ryan O'Shea<?php 
			if($title != ""){
				echo " // $title";
			} ?>
	</title>
	<meta name="description" content="Homepage of Ryan O'Shea: student, programmer, and web developer from Philadelphia, PA">
	<meta name="viewport" content="width=device-width">
	<meta name="author" content="Ryan O'Shea"> <!-- href="/humans.txt" --> 
	<link rel="stylesheet" href="/css/style.css">
	<link href='http://fonts.googleapis.com/css?family=Open+Sans:300,400,800' rel='stylesheet' type='text/css'>
	<link href='http://fonts.googleapis.com/css?family=Lato:300,400,700,900,300italic,400italic,700italic,900italic' rel='stylesheet' type='text/css'>
	
	<script type="text/javascript">

	  var _gaq = _gaq || [];
	  _gaq.push(['_setAccount', 'UA-3319912-4']);
	  _gaq.push(['_trackPageview']);
	
	  (function() {
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	  })();
	
	</script>
</head>

<body id="<?php if($id != "") {echo $id;} ?>">
	<!--[if lt IE 7]><p class=chromeframe>Your browser is <em>ancient!</em> <a href="http://browsehappy.com/">Upgrade to a different browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to experience this site.</p><![endif]-->
	
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.7.2.min.js"><\/script>')</script>
	<script src="js/main.js"></script>
<?php
	}
?>


<?php 
	function echoBio() {
?>
				<h2>
					<p id="line1">
						I&#8217;m a student from outside of Philly. 
					</p>
					<p id="line3">
						I code, I build websites, I design, and I write.
					</p>
					<p id="line4">
						I&#8217;m a big fan of science, so now I&#8217;m studying to be an engineer.
					</p>
					<p id="line5">
						And that&#8217;s about it.
					</p>
				</h2>
                
                <div id="resume"><a href="/contact/resume.pdf" class="nohover nocolor" target="_blank">resume &nbsp;<img src="images/doc.svg"></a></div>
<?php
	}
?>



<?php 
	function echoPageHeader() {
?>
	
	<div id="wrapper">
		<div id="main" role="main">
        	<div id="left">
                <h1>
                    <a href="//ryanoshea.com" class="nocolor nohover">Ryan<strong>O&#8217;Shea</strong></a>
                </h1>
			</div>                
			<div id="content">
<?php
	}
?>



<?php 
	function echoFooter() {
?>
			</div>	
		</div>
		<div id="push"></div>
	</div>
	
	<footer>
		<p>
			Copyright &copy; 2006&ndash;<?php echo date("Y"); ?> Ryan O'Shea. CC <a href="http://creativecommons.org/licenses/by-nc-sa/3.0/" class="nocolor" target="_blank">BY-NC-SA</a>.
		</p>
	</footer>
<?php
	}
?>



<?php 
	function echoDocClose() {
?>
</body>
</html>
<?php
	}
?>