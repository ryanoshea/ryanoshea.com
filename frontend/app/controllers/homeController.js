(function(){
'use strict';

var cont = angular.module('ryanoshea.controllers');

cont.controller('homeController', function ($scope, $filter, $http, $location, $timeout) {
  
  document.title = 'Ryan O\'Shea // Home';

  var mobileWidth = 1120;

  $scope.currentYear = new Date().getFullYear();

  $scope.selectedFlickrPhoto = 0;
  $scope.flickrWaiting = false; // True only when user has clicked to view
                                // flickr panel and images aren't loaded 
  $scope.flickrFoldoutOpen = false;
  $scope.dummyArray = [0,1,2,3,4,5,6,7,8,9];
  $scope.toggleFlickrFoldout = function (tim) {
    if ($(window).width() < mobileWidth) {
      window.open('https://www.flickr.com/photos/rinoshea/', '_blank').focus();
      return;
    }
    if (!$scope.flickrFoldoutOpen) {
      if (flickrContentLoaded) {// && currentPhotoHeight() > 0) {
        $scope.flickrWaiting = false;
        $('#flickr-foldout').css({'height': currentPhotoHeight() + 'px'});
        $('#flickr-foldout').css({'margin-top': '1em'});
        $('#flickr-foldout').css({'margin-bottom': '1em'});
        $('html, body').animate({
            scrollTop: $('#flickr-foldout').offset().top - 0.1 * $(window).height()
        }, 500);
        $scope.flickrFoldoutOpen = !$scope.flickrFoldoutOpen;
      }
      else {
        $scope.flickrWaiting = true;
        $timeout(function () {
          $scope.toggleFlickrFoldout();
        }, 100);
      }
    }
    else {
      $('#flickr-foldout').css({'height': '0'});
      $('#flickr-foldout').css({'margin-top': '0'});
      $('#flickr-foldout').css({'margin-bottom': '0'});
      $scope.flickrFoldoutOpen = !$scope.flickrFoldoutOpen;
    }
  };

  var flickrContentLoaded = false;
  var getFlickrMostRecent = function () {
    $http.get('/api/flickr/most-recent-photo')
    .success(function (data, status, headers, config) {
      $scope.flickrPhotos = data.photos;
      for (var i = 0; i < $scope.flickrPhotos.length; i++) {
        $('#flickr-photo-' + i + ' img').attr('src', $scope.flickrPhotos[i].url);
        $('#flickr-photo-' + i).attr('href', $scope.flickrPhotos[i].pageUrl);
      }
      flickrContentLoaded = true;
    })
    .error(function (data, status, headers, config) {
      alert('Server error.');
    });
  };

  function currentPhotoHeight() {
    return $('#flickr-photo-' + $scope.selectedFlickrPhoto + ' img').height();
  };

  $scope.flickrPhotoTitle = function () {
    if (!$scope.flickrPhotos) return '';
    else return $scope.flickrPhotos[$scope.selectedFlickrPhoto].title;
  };

  $scope.changeFlickrPhoto = function (direction) {
    if (direction == 'left') {
      if ($scope.selectedFlickrPhoto == 0)
        $scope.selectedFlickrPhoto = $scope.dummyArray.length - 1;
      else $scope.selectedFlickrPhoto--;
    }
    else {
      if ($scope.selectedFlickrPhoto == $scope.dummyArray.length - 1)
        $scope.selectedFlickrPhoto = 0;
      else $scope.selectedFlickrPhoto++;
    }
    $('#flickr-foldout').css({'height': currentPhotoHeight() + 'px'});
  };

  $scope.flickrPhotoExif = function () {
    if (!$scope.flickrPhotos) return 'n/a';
    else return $scope.flickrPhotos[$scope.selectedFlickrPhoto].exif;
  };

  function resizeHandler() {
    var columnRatio = 0.2;
    if ($(window).width() >= mobileWidth) {
      $timeout(function () {
        $scope.isMobile = false;
      }, 0);
      $('.foldout').show();
      $('#main #left').css('width', $('#main').width() * columnRatio + 'px');
      $('#main #content').css('width', $('#main').width() 
                                       * (1 - columnRatio - 0.05) + 'px');
    }
    else {
      $timeout(function () {
        $scope.isMobile = true;
      }, 0);
      $('.foldout').hide();
      $('#main #left').css('width', 'auto');
      $('#main #content').css('width', 0.95 * $(window).width());
    }
    $('.foldout').css('width', $(window).width());
    $('.foldout').css('margin-left', (-1 * $('#content').offset().left));
    if ($scope.flickrFoldoutOpen) {
      $timeout(function () {
        $('#flickr-foldout').css({'height': currentPhotoHeight() + 'px'});
      }, 510);
    }
    if ($(window).height() > $('body').height()) {
      $('body').css('height', $(window).height());
    }
    else {
      $('body').css('height', 'auto');
    }
  };

  $(document).ready(function () {
    $('#profiles > li:first-child').css('color','inherit');

    $('#profiles > li').hover(function() {
      $('#profiles > li').css(
        'color','rgba(0,0,0,0)'
      );
      $(this).css(
        'color','inherit'
      );	
    });

    resizeHandler();

    $(window).resize(function () {
      resizeHandler();
    });

    getFlickrMostRecent();
  });

});

})();

