var pidgeonITControllers = angular.module('pidgeonITControllers', []);

pidgeonITControllers.controller('PidgeonController', ['$scope', '$http', function($scope, $http)
{
	$scope.loadPidgeons = function()
	{
		$http.get('http://localhost:56981/api/pidgeon').success(function(data)
		{
			$scope.pidgeons = data;
		}).error(function(data){$scope.pidgeons = data});
	};
	
	$scope.unloadPidgeons = function()
	{
		$scope.pidgeons = null;
	}
	
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
		}).error(function(data){/*stuff*/});
	};
	
	$scope.editPidgeon = function(pidgeon)
	{
		$http.put('http://localhost:56981/api/pidgeon/', pidgeon).success(function(data)
		{
			$scope.pidgeons = data;
			//$scope.pidgeons.push(pidgeon);
		}).error(function(data){/*stuff*/});
	}
}]);

pidgeonITControllers.controller('MatchController', ['$scope', '$http', function($scope, $http)
{
	$scope.loadMatches = function()
	{
		$http.get('http://localhost:56981/api/match/').success(function(data)
		{
			$scope.match = data;
		}).error(function(data){/*stuff*/});
	}
}]);