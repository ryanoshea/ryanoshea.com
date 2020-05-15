(function(){
'use strict';

var app = angular.module('ryanoshea', [
  'ngRoute',
  'ryanoshea.controllers'
]);

var cont = angular.module('ryanoshea.controllers', [ ]);

app.config(function ($routeProvider) {

  // configure view routing
  $routeProvider
    .when('/', {
      controller: 'homeController',
      templateUrl: 'app/pages/home.html'
    })
    .when('/404', {
      controller: '404Controller',
      templateUrl: 'app/pages/404.html'
    })
    .otherwise({
      redirectTo: '/404'
    });

});

app.config(['$compileProvider', function($compileProvider) {
  $compileProvider.debugInfoEnabled(false);
}]);

})();

