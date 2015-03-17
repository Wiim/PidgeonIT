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
      when('/match', {
        templateUrl: 'match.html',
        controller: 'MatchController'
      }).
      otherwise({
        redirectTo: '/index'
      });
  }]);