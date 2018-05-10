angular.module('app')
	.factory('UsersListService', ['$http', function($http) {

		var service = {};

		service.All = function(params, callback) {
			$http({
				method: 'GET',
				url: 'http://localhost:1337/user/orm?page='+params.page+'&per_page='+params.perPage,
			}).then(function (response) {
				callback({error: false, datas: response})
			}, function(error) {
				callback({error: true, datas: error})
			});
		}

		return service;

	}])