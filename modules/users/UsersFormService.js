angular.module('app')
	.factory('UsersFormService', ['$http', function($http) {
		var service = {};

		service.save = function (datas, callback) {
			$http({
				method: 'POST',
				url: 'http://localhost:1337/signup',
				data: datas
			}).then(function (response) {
				callback({error: false, message: response.data.response.message});
			}, function(error) {
				callback({error: true, message: error.data.response.message});
			});
		};

		service.getById = function(id, callback) {
			$http({
				method: 'GET',
				url: 'http://localhost:1337/user/'+id
			}).then(function (response) {
				callback({error: false, message: response});
			}, function(error) {
				callback({error: true, message: error});
			});
		};

		service.update = function (id, datas, callback) {
			$http({
				method: 'PUT',
				url: 'http://localhost:1337/user/'+id,
				data: datas
			}).then(function (response) {
				callback({error: false, message: response});
			}, function(error) {
				callback({error: true, message: error});
			});
		};

        service.delete = function (id, callback) {
            $http({
                method: 'DELETE',
                url: 'http://localhost:1337/user/'+id
            }).then(function (response) {
                callback({error: false, message: response});
            }, function(error) {
                callback({error: true, message: error});
            });
        };

		service.deleteMany  = function(ids, callback) {
			$http({
				method: 'POST',
				url: 'http://localhost:1337/user/deleteMany',
				data: {
                    ids: ids
				}
			}).then(function (response) {
				callback({error: false, message: response});
			}, function(error) {
				callback({error: true, message: error});
			});
		};

        service.changePassword = function (datas, callback) {
            $http({
                method: 'POST',
                url: 'http://localhost:1337/user/changePassword/',
                data: datas
            }).then(function (response) {
                callback({error: false, message: response});
            }, function(error) {
                callback({error: true, message: error});
            });
        };

		return service;
	}]);