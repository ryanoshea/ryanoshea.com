(function(){
'use strict';

var cont = angular.module('ryanoshea.controllers');

cont.controller('homeController', function ($scope, $filter, $http, $location) {
  
  document.title = 'Ryan O\'Shea // Home';

  $scope.currentYear = new Date().getFullYear();

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
  });

});

})();

