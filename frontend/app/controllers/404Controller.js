(function(){
'use strict';

var cont = angular.module('ryanoshea.controllers');

cont.controller('404Controller', function ($scope, $filter, $http, $location, $rootScope) {
  
  var mobileWidth = 1120;
  
  function resizeHandler() {
    var columnRatio = 0.2;
    if ($(window).width() >= mobileWidth) {
      $('article').css('max-width', '75%');
      $('#main #left').css('width', $('article').width() * columnRatio + 'px');
      $('#main #content').css('width', $('article').width() * (1 - columnRatio - 0.05) + 'px');
    }
    else {
      $('#main #left').css('width', 'auto');
      $('#main #content').css('width', 0.95 * $(window).width());
      $('article').css('max-width', 'none');
    }

    $('#wrapper').css('opacity', '1');
  };

  $(document).ready(function () {
    resizeHandler();

    $(window).resize(function () {
      resizeHandler();
    });
  });

});

})();

