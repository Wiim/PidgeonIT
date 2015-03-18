var pidgeonITControllers = angular.module('pidgeonITControllers', []);

/**************************************************
 * PidgeonController
**************************************************/
pidgeonITControllers.controller('PidgeonController', 
['$scope', '$http', 'PidgeonService', function($scope, $http, PidgeonService)
{
	$scope.newPidgeon = {"ownerID":null, "Name":"", "matchID":null};
	
	function getOwners()
	{
		$http.get('http://localhost:56981/api/owners/').success(function(data)
		{
			$scope.owners = data;
		}).error(function(data){console.log(data);});
	};
	
	$scope.loadPidgeons = function()
	{
		getOwners();
		$http.get('http://localhost:56981/api/pidgeons').success(function(data)
		{
			$scope.pidgeons = data;
		}).error(function(data){console.log(data);});
	};
	
	$scope.unloadPidgeons = function()
	{
		clearNewPidgeon();
		$scope.pidgeons = null;
	};
	
	$scope.loadPidgeon = function(pidgeonId)
	{
		$http.get('http://localhost:56981/api/pidgeons/' + pidgeonId).success(function(data)
		{
			$scope.pidgeon = data;
		}).error(function(data){console.log(data);});
	};
	
	$scope.removePidgeon = function(index, pidgeonId)
	{
		$http.delete('http://localhost:56981/api/pidgeons/' + pidgeonId).success(function(data)
		{
			$scope.pidgeons.splice(index, 1);
		}).error(function(data){console.log(data);});
	};
	
	function clearNewPidgeon()
	{
		$scope.newPidgeon.Name = "";
		$scope.newPidgeon.ownerID = null;
		$scope.newPidgeon.matchID = null;
	}
	
	$scope.addPidgeon = function(pidgeon)
	{
		$http.post('http://localhost:56981/api/pidgeons/', pidgeon).success(function(data)
		{
			$scope.pidgeons = data;
			clearNewPidgeon();
		}).error(function(data)
		{
			console.log(data);
		});
	};
	
	$scope.editPidgeon = function(pidgeon)
	{
		$http.put('http://localhost:56981/api/pidgeons/', pidgeon).success(function(data)
		{
			$scope.pidgeons = data;
			clearNewPidgeon();
		}).error(function(data){console.log(data);});
	};
}]);

/**************************************************
 * MatchesController
**************************************************/
pidgeonITControllers.controller('MatchesController', ['$scope', '$http', '$location', function($scope, $http, $location)
{
	$scope.loadMatches = function()
	{
		$http.get('http://localhost:56981/api/matches/').success(function(data)
		{
			$scope.matches = data;
		}).error(function(data){console.log(data);});
	};
	
	$scope.viewMatch = function(id)
    {
        $location.path('/matches/' + id);
    };
}]);

/**************************************************
 * MatchController
**************************************************/
pidgeonITControllers.controller('MatchController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams)
{
	$scope.addPidgeonToMatch = function(index, pidgeonId)
	{
		$http.post('http://localhost:56981/api/matches/' + $scope.match.matchID + '/' + pidgeonId).success(function(data)
		{
			//$scope.match = data;
			//$scope.pidgeons.splice(index, 1);
			$scope.loadMatch();
		}).error(function(data){console.log(data);});
	};
	
	$scope.removePidgeonFromMatch = function(index, matchId, pidgeonId)
	{
		$http.delete('http://localhost:56981/api/matches/' + matchId + '/' + pidgeonId).success(function(data)
		{
			//$scope.match.Pidgeons.splice(index, 1);
			$scope.loadMatch();
		}).error(function(data){console.log(data);});
	};
	
	$scope.loadMatch = function()
	{
		$http.get('http://localhost:56981/api/matches/' + $routeParams.matchId).success(function(data)
		{
			// do stuff here to split the pidgeons between in and out
			$scope.match = data;
			$scope.getOwners();
			$http.get('http://localhost:56981/api/pidgeons').success(function(data)
			{
				$scope.pidgeons = data;
			}).error(function(data){console.log(data);};
			
			
		}).error(function(data){console.log(data);});
	};
	
	// $scope.loadPidgeons = function()
	// {
			// $http.get('http://localhost:56981/api/pidgeons').success(function(data)
			// {
				// $scope.pidgeons = data;
			// }).error(function(data){$scope.pidgeons = data});
	// };
	
	$scope.getOwners = function()
	{
		$http.get('http://localhost:56981/api/owners/').success(function(data)
		{
			$scope.owners = data;
		}).error(function(data){console.log(data);});
	};
}]);