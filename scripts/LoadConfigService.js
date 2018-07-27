angular.module('app')
	.factory('LoadConfigService', ['$http', function ($http) {
		return({
			loadConfig: function() {
				var promise = $http.get('config.json').then(function (res) {
					return res.data;
				});
				return promise;
			}
		});
	}]);