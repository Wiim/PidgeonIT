var pidgeonITFilters = angular.module('pidgeonITFilters', [])

pidgeonITFilters.filter('ownerFilter', function()
{
	return function(pidgeons, ownerName)
	{
		if (ownerName == null || ownerName.isUndefined)
		{
			return pidgeons;
		}
		
		var filtered = [];
		angular.forEach(pidgeons, function(pidgeon)
		{
			if (pidgeon.Owner.Name == ownerName)
			{
				filtered.push(pidgeon);
			}
		});
		
		return filtered;
	};
});