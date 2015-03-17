var pidgeonITServices = angular.module('pidgeonITServices', []);

pidgeonITServices.service('PidgeonService', ['$http', function($http)
{
	this.loadPidgeons = function()
	{
		$http.get('http://localhost:56981/api/pidgeon').success(function(data)
		{
			return data;
		}).error(function(data){$scope.pidgeons = data});
	}
}]);