(function(){
'use strict';

var cont = angular.module('ryanoshea.controllers');

cont.controller('homeController', function ($scope, $filter, $http, $location, $timeout) {
  
  document.title = 'Ryan O\'Shea // Home';

  var mobileWidth = 1120;
  var networkError = false;

  $scope.currentYear = new Date().getFullYear();

  $scope.selectedFlickrPhoto = 0;
  $scope.flickrWaiting = false; // True only when user has clicked to view
                                // flickr panel and images aren't loaded 
  $scope.flickrFoldoutOpen = false;
  $scope.dummyArray = [0];
  $scope.toggleFlickrFoldout = function (tim) {
    if ($(window).width() < mobileWidth || networkError) {
      var tab = window.open('https://www.flickr.com/photos/rinoshea/', '_blank');
      tab.opener = null;
      return;
    }
    if (!$scope.flickrFoldoutOpen) {
      if (flickrContentLoaded) {// && currentPhotoHeight() > 0) {
        $scope.flickrWaiting = false;
        $('#flickr-foldout').css({'height': currentPhotoHeight() + 'px'});
        $('#flickr-foldout').css({'margin-top': '1em'});
        $('#flickr-foldout').css({'margin-bottom': '1em'});
        $('#flickr-foldout').css({'min-height': ($('#flickr-foldout-label').height() + 25) + 'px'});
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
      $('#flickr-foldout').css({'min-height': '0'});
      $scope.flickrFoldoutOpen = !$scope.flickrFoldoutOpen;
    }
  };

  var flickrContentLoaded = false;
  var flickrRequestOutstanding = false;
  var getFlickrMostRecent = function () {
    if (flickrRequestOutstanding) {
      return;
    }
    flickrRequestOutstanding = true;
    $http.get('/api/flickr/most-recent-photos')
    .success(function (data, status, headers, config) {
      $scope.flickrPhotos = data.photos;
      if ($scope.flickrPhotos === null) {
        networkError = true;
      } else {
        if ($scope.dummyArray.length === 1) {
          $scope.flickrPhotos.forEach(function (photo, i) {
            if (i > 0) {
              $scope.dummyArray.push(i);
            }
          });
        }
        // Don't open the panel until the first photo is fully loaded (and dimensions are usable)
        $('#flickr-photo-0 img').on('load', function () {
          flickrContentLoaded = true;
          flickrRequestOutstanding = false;
        });
      }
    })
    .error(function (data, status, headers, config) {
      console.error('Error fetching Flickr photos.');
      networkError = true;
      flickrRequestOutstanding = false;
    });
  };

  function currentPhotoHeight() {
    return $('#flickr-photo-' + $scope.selectedFlickrPhoto + ' img').height();
  }

  $scope.flickrPhotoTitle = function () {
    if (!$scope.flickrPhotos) return '';
    else return $scope.flickrPhotos[$scope.selectedFlickrPhoto].title;
  };

  $scope.changeFlickrPhoto = function (direction) {
    if (direction == 'left') {
      if ($scope.selectedFlickrPhoto === 0)
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
      $scope.isMobile = false;
      $timeout(function () {
        $scope.isMobile = false;
      }, 0);
      if (!flickrContentLoaded && !$scope.flickrPhotos) {
        getFlickrMostRecent();
      }
      $('.foldout').show();
      $('#main #left').css('width', $('#main').width() * columnRatio + 'px');
      $('#main #content').css('width', $('#main').width() * (1 - columnRatio - 0.05) + 'px');
    }
    else {
      $scope.isMobile = true;
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
        $('#flickr-foldout').css({'min-height': ($('#flickr-foldout-label').height() + 25) + 'px'});
      }, 510);
    }
    if ($(window).height() > $('body').height()) {
      $('body').css('height', $(window).height());
    }
    else {
      $('body').css('height', 'auto');
    }
  }

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

    if (!$scope.isMobile) {
      getFlickrMostRecent();
    }
  });

});

})();

