(function(){
'use strict';

var cont = angular.module('ryanoshea.controllers');

cont.controller('homeController', function ($scope, $filter, $http, $location, $timeout) {
  
  document.title = 'Ryan O\'Shea // Home';

  $scope.currentYear = new Date().getFullYear();

  $scope.selectedFlickrPhoto = 0;
  $scope.flickrWaiting = false; // True only when user has clicked to view
                                // flickr panel and images aren't loaded 
  $scope.flickrFoldoutOpen = false;
  $scope.toggleFlickrFoldout = function (tim) {
    if (!$scope.flickrFoldoutOpen) {
      var currentPhotoHeight = $('#flickr-photo-' 
                                  + $scope.selectedFlickrPhoto
                                  + ' img').height();
      if (flickrContentLoaded && currentPhotoHeight > 0) {
        $scope.flickrWaiting = false;
        console.log('set to false');
        console.log(currentPhotoHeight);
        $('#flickr-foldout').css({'height': currentPhotoHeight + 'px'});
        $('#flickr-foldout').css({'margin-top': '1em'});
        $('#flickr-foldout').css({'margin-bottom': '1em'});
        $scope.flickrFoldoutOpen = !$scope.flickrFoldoutOpen;
      }
      else {
        $scope.flickrWaiting = true;
        console.log('set to true');
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
      console.log($scope.flickrPhotos);
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

  $scope.flickrPhotoTitle = function () {
    if (!$scope.flickrPhotos) return '';
    else return $scope.flickrPhotos[$scope.selectedFlickrPhoto].title;
  };

  $scope.changeFlickrPhoto = function (direction) {
    if (direction == 'left') {
      if ($scope.selectedFlickrPhoto == 0)
        $scope.selectedFlickrPhoto = 4;
      else $scope.selectedFlickrPhoto--;
    }
    else {
      if ($scope.selectedFlickrPhoto == 4)
        $scope.selectedFlickrPhoto = 0;
      else $scope.selectedFlickrPhoto++;
    }
    var currentPhotoHeight = $('#flickr-photo-' 
                                + $scope.selectedFlickrPhoto
                                + ' img').height();
    $('#flickr-foldout').css({'height': currentPhotoHeight + 'px'});
  }

  $(document).ready(function () {
    $('#profiles li:first-child').css('color','inherit');

    $('#profiles li').hover(function() {
      $('#profiles li').css(
        'color','rgba(0,0,0,0)'
      );
      $(this).css(
        'color','inherit'
      );	
    });

    getFlickrMostRecent();
  });

});

})();

