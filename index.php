<?php include('includes/includes.inc.php'); ?><?php include 'includes/Mobile_Detect.php'; $detect = new Mobile_Detect();?><?php echoPageHead("Home", "home"); ?>

	<div class="panels" id="blog-panel">
    	<a class="panel-closebutton nohover" href="#">&times;</a>
	</div>
	<div class="panels panels-small" id="twitter-panel">

        <a class="twitter-timeline" data-dnt="true" href="https://twitter.com/ryancoshea" data-widget-id="345595603637633024">Tweets by @ryancoshea</a>
		<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>


        <!-- OLD TWITTER WIDGET CODE
		<script charset="utf-8" src="http://widgets.twimg.com/j/2/widget.js"></script>
		<script>
        new TWTR.Widget({
          version: 2,
          type: 'profile',
          rpp: 25,
          interval: 30000,
          width: 'auto',
          height: ($('body').height()-90),
          theme: {
            shell: {
              background: '#333333',
              color: '#ffffff'
            },
            tweets: {
              background: '#000000',
              color: '#ffffff',
              links: '#bb0054'
            }
          },
          features: {
            scrollbar: true,
            loop: false,
            live: true,
            behavior: 'all'
          }
        }).render().setUser('ryancoshea').start();
        </script>
        -->
		<a class="panel-closebutton-small nohover" href="#">&times;</a>
	</div>
	<!--
    <div class="panels" id="github-panel">
		<iframe src="https://github.com/ryanoshea"></iframe>
		<a class="panel-closebutton" href="#">&times;</a>
	</div>
	<div class="panels" id="flickr-panel">
		<iframe src="//flickr.com/rinoshea"></iframe>
		<a class="panel-closebutton" href="#">&times;</a>
	</div>
	<div class="panels" id="facebook-panel">
		<iframe src="https://facebook.com/ryan.c.oshea"></iframe>
		<a class="panel-closebutton" href="#">&times;</a>
	</div>
    -->
	<div class="panels" id="delicious-panel">
		<a class="panel-closebutton nohover" href="#">&times;</a>
	</div>
	<!--
    <div class="panels" id="google-panel">
		<iframe src="https://plus.google.com/106038738053849300832/posts"></iframe>
		<a class="panel-closebutton" href="#">&times;</a>
	</div>
	-->

	<?php echoPageHeader(); ?>

			<?php echoBio(); ?>

                <p>
                    this summer: I <a href="http://www.linkedin.com/pub/ryan-o-shea/36/103/20b/">interned at Comcast</a> building an AngularJS web app &amp; backend for Business Voice
                    <br>
                    what else I&#8217;ve done recently: <a href="http://www.ryanoshea.com/bitcoin">a site</a> about bitcoin for a final project
    			</p>
				<div id="profile-links">
					<ul id="profiles">
						<li>sometimes I <a id="blog-link" href="<?php
							if ($detect->isMobile())
								echo "http://post.ryanoshea.com";
							else
								echo "#";
						?>" title="my blog">write</a></li>
                        <li>sometimes I <a id="linkedin-link" href="http://www.linkedin.com/pub/ryan-o-shea/36/103/20b/" title="my linkedin" target="_blank">work</a></li>
						<li>sometimes I <a id="twitter-link" href="<?php
							if ($detect->isMobile())
								echo "https://twitter.com/ryancoshea";
							else
								echo "#";
						?>" title="my twitter">talk</a></li>
                        <li>sometimes I <a id="github-link" href="https://github.com/ryanoshea?tab=repositories" title="my github" target="_blank">code</a></li>
                        <li>sometimes I <a id="behance-link" href="http://www.behance.net/ryanoshea" title="my behance" target="_blank">design</a></li>
						<li>sometimes I <a id="flickr-link" href="http://flickr.com/rinoshea" title="my flickr" target="_blank">take photos</a></li>
						<li>sometimes I <a id="facebook-link" href="https://facebook.com/ryan.c.oshea" title="my facebook" target="_blank">waste time</a></li>
						<li>sometimes I <a id="delicious-link" href="<?php
							if ($detect->isMobile())
								echo "http://delicious.com/ryancoshea";
							else
								echo "#";
						?>" title="my del.icio.us">save</a></li>
						<li>sometimes I <a id="google-link" href="https://plus.google.com/106038738053849300832/posts" title="my google+" target="_blank">search</a></li>
						<!--
						<li>sometimes I <a href="//post.ryanoshea.com/" title="my blog" target="_blank">write</a></li>
						<li>sometimes I <a href="//twitter.com/ryancoshea" title="my twitter" target="_blank">babble</a></li>
						<li>sometimes I <a href="//github.com/ryanoshea" title="my github" target="_blank">code</a></li>
						<li>sometimes I <a href="//flickr.com/rinoshea" title="my flickr" target="_blank">take photos</a></li>
						<li>sometimes I <a href="//facebook.com/ryan.c.oshea" title="my facebook" target="_blank">waste time</a></li>
						<li>sometimes I <a href="//delicious.com/ryancoshea" title="my del.icio.us" target="_blank">save things i like</a></li>
						<li>sometimes I <a href="https://plus.google.com/106038738053849300832/posts" title="my google+" target="_blank">shout into the void</a></li>
						-->
					</ul>
					<ul>
                    	<li>I&#8217;m majoring in Electrical Engineering at <a href="//princeton.edu" title="my college" target="_blank">Princeton</a>.</li>
						<li>I went to <a href="//devonprep.com" title="my high school" target="_blank">Devon Prep</a> before that.</li>
						<li><a href="//djoshea.com" title="dan o'shea" target="_blank">This guy</a> is my brother.</li>
					</ul>
				</div>
	<?php echoFooter(); ?>
<?php echoDocClose(); ?>
