var pidgeonITApp = angular.module('pidgeonITApp', [
  'ngRoute',
  'pidgeonITControllers'
]);

pidgeonITApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/pidgeon', {
        templateUrl: 'pidgeon.html',
        controller: 'PidgeonController'
      }).
      when('/matches', {
        templateUrl: 'matches.html',
        controller: 'MatchController'
      }).
      otherwise({
        redirectTo: '/index'
      });
  }]);