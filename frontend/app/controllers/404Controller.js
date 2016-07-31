(function(){
'use strict';

var cont = angular.module('ryanoshea.controllers');

cont.controller('404Controller', function ($scope, $filter, $http, $location, $rootScope) {
  
  var mobileWidth = 1120;
  
  function resizeHandler() {
    var columnRatio = 0.2;
    if ($(window).width() >= mobileWidth) {
      $('#main #left').css('width', $('#main').width() * columnRatio + 'px');
      $('#main #content').css('width', $('#main').width() 
                                       * (1 - columnRatio - 0.05) + 'px');
    }
    else {
      $('#main #left').css('width', 'auto');
      $('#main #content').css('width', 0.95 * $(window).width());
    }
    if ($(window).height() > $('body').height()) {
      $('body').css('height', $(window).height());
    }
    else {
      $('body').css('height', 'auto');
    }
  };

  $(document).ready(function () {
    resizeHandler();

    $(window).resize(function () {
      resizeHandler();
    });
  });

});

})();

