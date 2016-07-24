(function(){

var cont = angular.module('ryanoshea.controllers');

cont.controller('mainController', function ($scope, $filter, $http, $location) {
  
  $scope.currentYear = new Date().getFullYear();

});

})();

