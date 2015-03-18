var pidgeonITControllers = angular.module('pidgeonITControllers', []);

pidgeonITControllers.controller('PidgeonController', 
['$scope', '$http', 'PidgeonService', function($scope, $http, PidgeonService)
{
	$scope.newPidgeon = {"Owner":"", "Name":"", "matchID":0};
	
	$scope.loadPidgeons = function()
	{
		//console.log(PidgeonService.loadPidgeons());
		//$scope.pidgeons = PidgeonService.loadPidgeons();
		
		$http.get('http://localhost:56981/api/pidgeons').success(function(data)
		{
			var maxID = 0;
			for (i=0; i<data.length; i++)
			{
				if (data[i].pidgeonID > maxID)
				{
					maxID = data[i].pidgeonID;
				}
			}
			$scope.newPidgeonID = maxID + 1;
			$scope.pidgeons = data;
		}).error(function(data){$scope.pidgeons = data});
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
		}).error(function(data){$scope.pidgeon = data});
	};
	
	$scope.removePidgeon = function(index, pidgeonId)
	{
		$http.delete('http://localhost:56981/api/pidgeons/' + pidgeonId).success(function(data)
		{
			$scope.pidgeons.splice(index, 1);
		}).error(function(data){$scope.pidgeons[index].error = data});
	};
	
	function clearNewPidgeon()
	{
		$scope.newPidgeon.Name = "";
		$scope.newPidgeon.Owner.Name = "";
		$scope.newPidgeon.matchID = null;
	}
	
	$scope.addPidgeon = function(pidgeon)
	{
		$http.post('http://localhost:56981/api/pidgeons/', pidgeon).success(function(data)
		{
			$scope.pidgeons = data;
			clearNewPidgeon();
			//$scope.pidgeons.push(pidgeon);
		}).error(function(data){console.log(data);});
	};
	
	$scope.editPidgeon = function(pidgeon)
	{
		$http.put('http://localhost:56981/api/pidgeons/', pidgeon).success(function(data)
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
		$http.get('http://localhost:56981/api/matches/').success(function(data)
		{
			console.log(JSON.stringify(data));
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
	$scope.addPidgeonToMatch = function(index, pidgeonId)
	{
		$http.post('http://localhost:56981/api/matches/' + $scope.match.matchID + '/' + pidgeonId).success(function(data)
		{
			$scope.pidgeons.splice(index, 1);
		}).error(function(data){console.log(data);});
	};
	
	$scope.removePidgeonFromMatch = function(index, matchId, pidgeonId)
	{
		$http.delete('http://localhost:56981/api/matches/' + matchId + '/' + pidgeonId).success(function(data)
		{
			$scope.match.Pidgeons.splice(index, 1);
		}).error(function(data){console.log(data);});
	};
	
	$scope.loadMatch = function()
	{
		$http.get('http://localhost:56981/api/matches/' + $routeParams.matchId).success(function(data)
		{
			$scope.match = data;
			$scope.getOwners();
			$scope.loadPidgeons();
		}).error(function(data){console.log(data);});
	};
	
	$scope.loadPidgeons = function()
	{
		$http.get('http://localhost:56981/api/pidgeons').success(function(data)
		{
			$scope.pidgeons = data;
		}).error(function(data){$scope.pidgeons = data});
	};
	
	$scope.getOwners = function()
	{
		$http.get('http://localhost:56981/api/owners/').success(function(data)
		{
			$scope.owners = data;
		}).error(function(data){console.log(data);});
	};
}]);