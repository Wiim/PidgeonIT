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
			$scope.loadMatch();
		}).error(function(data){console.log(data);});
	};
	
	$scope.removePidgeonFromMatch = function(index, matchId, pidgeonId)
	{
		$http.delete('http://localhost:56981/api/matches/' + matchId + '/' + pidgeonId).success(function(data)
		{
			$scope.loadMatch();
		}).error(function(data){console.log(data);});
	};
	
	$scope.loadMatch = function()
	{
		$http.get('http://localhost:56981/api/matches/' + $routeParams.matchId).success(function(matchData)
		{
			$scope.getOwners();
			$http.get('http://localhost:56981/api/pidgeons').success(function(pidgeonData)
			{
				$scope.pidgeons = [];
				$scope.match = matchData;
				
				// For all Pidgeons...
				angular.forEach(pidgeonData, function(pidgeon)
				{
					var alreadyInMatch = false;
					// ... loop through all Pidgeons already in the match ...
					angular.forEach($scope.match.Pidgeons, function(matchPidgeon)
					{
						if (pidgeon.pidgeonID == matchPidgeon.pidgeonID)
						{
							alreadyInMatch = true;
						}
					});
					// ... and if the Pidgeon does not already exist in the match, add it to the addable Pidgeons list.
					if (!alreadyInMatch)
					{
						$scope.pidgeons.push(pidgeon);
					}
				});
			}).error(function(data){console.log(data);});
		}).error(function(data){console.log(data);});
	};
	
	$scope.getOwners = function()
	{
		$http.get('http://localhost:56981/api/owners/').success(function(data)
		{
			$scope.owners = data;
		}).error(function(data){console.log(data);});
	};
}]);