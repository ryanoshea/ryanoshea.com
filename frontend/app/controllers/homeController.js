(function(){
'use strict';

var cont = angular.module('ryanoshea.controllers');

cont.controller('homeController', function ($scope, $filter, $http, $location) {
  
  document.title = 'Ryan O\'Shea // Home';

  $scope.currentYear = new Date().getFullYear();

  $scope.selectedFlickrPhoto = 0;
  
  var flickrFoldoutOpen = false;
  $scope.toggleFlickrFoldout = function () {
    if (!flickrFoldoutOpen) {
      $('#flickr-foldout').css({'max-height': '70em'});
      $('#flickr-foldout').css({'margin-top': '1em'});
      $('#flickr-foldout').css({'margin-bottom': '1em'});
    }
    else {
      $('#flickr-foldout').css({'max-height': '0'});
      $('#flickr-foldout').css({'margin-top': '0'});
      $('#flickr-foldout').css({'margin-bottom': '0'});
    }
    flickrFoldoutOpen = !flickrFoldoutOpen;
  };

  var getFlickrMostRecent = function () {
    $http.get('/api/flickr/most-recent-photo')
    .success(function (data, status, headers, config) {
      $scope.flickrPhotos = data.photos;
      console.log($scope.flickrPhotos);
      for (var i = 0; i < $scope.flickrPhotos.length; i++) {
        $('#flickr-photo-' + i + ' img').attr('src', $scope.flickrPhotos[i].url);
        $('#flickr-photo-' + i).attr('href', $scope.flickrPhotos[i].pageUrl);
      }
    })
    .error(function (data, status, headers, config) {
      alert('Server error.');
    });
  };

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

