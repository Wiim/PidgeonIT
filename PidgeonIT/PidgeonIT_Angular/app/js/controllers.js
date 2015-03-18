var pidgeonITControllers = angular.module('pidgeonITControllers', []);

pidgeonITControllers.controller('PidgeonController', 
['$scope', '$http', 'PidgeonService', function($scope, $http, PidgeonService)
{
	$scope.loadPidgeons = function()
	{
		//console.log(PidgeonService.loadPidgeons());
		//$scope.pidgeons = PidgeonService.loadPidgeons();
		
		$http.get('http://localhost:56981/api/pidgeon').success(function(data)
		{
			$scope.pidgeons = data;
		}).error(function(data){$scope.pidgeons = data});
	};
	
	$scope.unloadPidgeons = function()
	{
		$scope.pidgeons = null;
	};
	
	$scope.loadPidgeon = function(pidgeonId)
	{
		$http.get('http://localhost:56981/api/pidgeon/' + pidgeonId).success(function(data)
		{
			$scope.pidgeon = data;
		}).error(function(data){$scope.pidgeon = data});
	};
	
	$scope.removePidgeon = function(index, pidgeonId)
	{
		$http.delete('http://localhost:56981/api/pidgeon/' + pidgeonId).success(function(data)
		{
			$scope.pidgeons.splice(index, 1);
		}).error(function(data){$scope.pidgeons[index].error = data});
	};
	
	$scope.addPidgeon = function(pidgeon)
	{
		for (i=0; i<$scope.pidgeons.length; i++)
		{
			if ($scope.pidgeons[i].Id == pidgeon.Id)
			{
				pidgeon.error = "This id already exists!";
				return;
			}
		}
		$http.post('http://localhost:56981/api/pidgeon/', pidgeon).success(function(data)
		{
			$scope.pidgeons = data;
			//$scope.pidgeons.push(pidgeon);
		}).error(function(data){console.log(data);});
	};
	
	$scope.editPidgeon = function(pidgeon)
	{
		$http.put('http://localhost:56981/api/pidgeon/', pidgeon).success(function(data)
		{
			$scope.pidgeons = data;
			//$scope.pidgeons.push(pidgeon);
		}).error(function(data){console.log(data);});
	};
}]);

pidgeonITControllers.controller('MatchesController', ['$scope', '$http', '$location', function($scope, $http, $location)
{
	$scope.loadMatches = function()
	{
		$http.get('http://localhost:56981/api/match/').success(function(data)
		{
			$scope.matches = data;
		}).error(function(data){console.log(data);});
	};
	
	$scope.viewMatch = function(id)
    {
        $location.path('/matches/' + id);
    };
}]);

pidgeonITControllers.controller('MatchController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams)
{
	$scope.addPidgeonToMatch = function(pidgeonId)
	{
		$http.post('http://localhost:56981/api/match/' + matchId + '/' + pidgeonId).success(function(data)
		{
			$scope.pidgeons = data;
		}).error(function(data){console.log(data);});
	};
	
	$scope.loadMatch = function()
	{
		$http.get('http://localhost:56981/api/match/' + $routeParams.matchId).success(function(data)
		{
			$scope.match = data;
			$scope.getOwners();
			$scope.loadPidgeons();
		}).error(function(data){console.log(data);});
	};
	
	$scope.loadPidgeons = function()
	{
		$http.get('http://localhost:56981/api/pidgeon').success(function(data)
		{
			$scope.pidgeons = data;
		}).error(function(data){$scope.pidgeons = data});
	};
	
	$scope.removePidgeonFromMatch = function(index, matchId, pidgeonId)
	{
		$http.delete('http://localhost:56981/api/match/' + matchId + '/' + pidgeonId).success(function(data)
		{
			$scope.match.Pidgeons.splice(index, 1);
		}).error(function(data){console.log(data);});
	};
	
	$scope.getOwners = function()
	{
		$http.get('http://localhost:56981/api/owner/').success(function(data)
		{
			$scope.owners = data;
		}).error(function(data){console.log(data);});
	};
}]);