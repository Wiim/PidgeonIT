var pidgeonITApp = angular.module('pidgeonITApp', [
  'ngRoute',
  'pidgeonITControllers',
  'pidgeonITFilters',
  'pidgeonITServices'
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
        controller: 'MatchesController'
      }).
      when('/matches/:matchId', {
        templateUrl: 'match.html',
        controller: 'MatchController'
      }).
      otherwise({
        redirectTo: '/index'
      });
  }]);