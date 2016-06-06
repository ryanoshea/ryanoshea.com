<?php include('includes/includes.inc.php'); ?><?php include 'includes/Mobile_Detect.php'; $detect = new Mobile_Detect();?><?php echoPageHead("Home", "home"); ?>

  <div class="panels" id="blog-panel">
    <a class="panel-closebutton nohover" href="#">&times;</a>
  </div>
  <div class="panels panels-small" id="twitter-panel">

    <a class="twitter-timeline" data-dnt="true" href="https://twitter.com/ryancoshea" data-widget-id="345595603637633024">Tweets by @ryancoshea</a>
    <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
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
       I'm a <abbr title="firmware engineering, embedded programming, sensor communications, and computer hardware design in Verilog">computing-focused</abbr> electrical engineer and <abbr title="Node.js w/ Express.js, AngularJS, MongoDB, jQuery, Bootstrap">full-stack</abbr> web developer.
     </p>
     <p>
       Recently, I graduated Cum Laude from <a href="https://princeton.edu" target="_blank">Princeton University</a> with a <abbr title="Bachelor of Science in Engineering">B.S.E.</abbr> in Electrical Engineering and a <abbr title="effectively, a Minor">Certificate</abbr> in Computer Science.
     </p>
     <p>
       My <a href="https://github.com/ryanoshea/data-center-monitoring" target="_blank">senior thesis</a> was a scalable network of temperature sensors for monitoring data center climates.
     </p>
     <p>
       Last Summer, I interned at <a href="http://www.vecna.com/robotics/" target="_blank">Vecna Technologies</a> in Boston, writing firmware and designing electrical systems for their autonomous robots.
     </p>
     <p>
       In Junior year, I built the control circuitry to make an <a href="https://github.com/ryanoshea/car-lab" target="_blank">electric hobby car</a> autonomously navigate an environment while avoiding obstacles.
     </p>
     <p>
       I also built an <a href="http://pollprinceton.com/" target="_blank">open-source social network</a> for Princeton students.
     </p>
     <p>
       In Summer 2014, I <a href="http://www.linkedin.com/pub/ryan-o-shea/36/103/20b/" target="_blank">interned at Comcast</a>, building an AngularJS web app for their Business Voice division.
     </p>
     <p>
       Until recently, I was the Technology Chair of <a href="http://princetontowerclub.com" target="_blank">The Princeton Tower Club</a> and <br>Publicity Chair for <a href="http://tigermag.com" target="_blank"><em>The Princeton Tiger</em></a>, one of the oldest college humor magazines in the country.
     </p>
        <div id="profile-links">
          <ul id="profiles">
            <li>sometimes I <a id="github-link" href="https://github.com/ryanoshea" title="my github" target="_blank">code</a></li>
            <li>sometimes I <a id="linkedin-link" href="http://www.linkedin.com/pub/ryan-o-shea/36/103/20b/" title="my linkedin" target="_blank">work</a></li>
            <li>sometimes I <a id="flickr-link" href="http://flickr.com/rinoshea" title="my flickr" target="_blank">take photos</a></li>
            <li>sometimes I <a id="blog-link" href="<?php
              if ($detect->isMobile())
                echo "http://post.ryanoshea.com";
              else
                echo "#";
            ?>" title="my blog">write</a></li>
            <li>sometimes I <a id="behance-link" href="http://www.behance.net/ryanoshea" title="my behance" target="_blank">design</a></li>
            <li>sometimes I <a id="twitter-link" href="<?php
              if ($detect->isMobile())
                echo "https://twitter.com/ryancoshea";
              else
                echo "#";
            ?>" title="my twitter">tweet</a></li>
            <li>sometimes I <a id="facebook-link" href="https://facebook.com/ryan.c.oshea" title="my facebook" target="_blank">facebook</a></li>
            <!--<li>sometimes I <a id="delicious-link" href="<?php
              if ($detect->isMobile())
                echo "http://delicious.com/ryancoshea";
              else
                echo "#";
            ?>" title="my del.icio.us">save</a></li>-->
            <li>sometimes I <a id="google-link" href="https://plus.google.com/106038738053849300832/posts" title="my google+" target="_blank">google</a></li>
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
            <li>I went to <a href="//devonprep.com" title="my high school" target="_blank">Devon Prep</a> before undergrad.</li>
            <li><a href="//djoshea.com" title="Dan O'Shea" target="_blank">This guy</a> is my brother.</li>
          </ul>
        </div>
  <?php echoFooter(); ?>
<?php echoDocClose(); ?>
