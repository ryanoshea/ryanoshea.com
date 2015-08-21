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
    <!--[if lte IE 7]><script src="/images/elusive-iconfont-master/lte-ie7.js"></script><![endif]-->

	<script>
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		ga('create', 'UA-3319912-4', 'ryanoshea.com');
		ga('require', 'linkid', 'linkid.js');
		ga('require', 'displayfeatures');
		ga('send', 'pageview');
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
						I&#8217;m a student from outside of Philadelphia.
					</p>
					<p id="line3">
						I build things, I code, I design, I write, and I take photos.
					</p>
					<p id="line4">
						I&#8217;m a big fan of science, so now I&#8217;m studying to be an electrical engineer.
					</p>
					<p id="line5">
						And that&#8217;s about it.
					</p>
				</h2>

                <div id="resume"><a href="/contact/resume.pdf" class="nohover nocolor" target="_blank">r&eacute;sum&eacute; &nbsp;<img src="/images/doc.svg" height=20 width=17></a></div>
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
			<a href="https://github.com/ryanoshea/ryanoshea.com" class="nocolor">see the code for this site on github <i id="icon-github-footer" class="icon-github"></i></a> &nbsp;// Copyright &copy; 2006&ndash;<?php echo date("Y"); ?> Ryan O'Shea. <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" class="nocolor" target="_blank">CC BY-NC-SA 4.0</a>.
		</p>
		<p>
			Contact me at <span class="dummy">asdfas</span>ry<span class="dummy">asdfas</span>an@<span class="dummy">7jt30h</span>ryanosh<span class="dummy">asdfas</span>ea.com (<a href="http://pgp.mit.edu/pks/lookup?op=get&search=0x3BE538A4E17D2A03" class="nocolor">PGP key</a>) or via <a href="/contact/bitmessage.txt" class="nocolor">Bitmessage</a>.
		</p>
		<p>
			<a href="https://cash.me/$ryanoshea">Donate</a>
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
