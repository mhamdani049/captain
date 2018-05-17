angular.module('app')
	.factory('UsersFormService', ['$http', '$localStorage', function($http, $localStorage) {
		var service = {};

		service.save = function (datas, callback) {
			// $http({
			// 	method: 'POST',
			// 	url: 'http://localhost:1337/signup',
			// 	data: datas,
             //    transformRequest: angular.identity,
             //    headers: {
			// 		'Content-Type': undefined
             //    }
			// }).then(function (response) {
			// 	callback({error: false, message: response.data.response.message});
			// }, function(error) {
			// 	callback({error: true, message: error.data.response.message});
			// });
            $.ajax({
		        url: 'http://localhost:1337/signup',
		        type: 'POST',
		        data: datas,
		        dataType: 'json',
		        async: false,
		        cache: false,
		        contentType: false,
		        processData: false,
		        headers: {
					'Authorization': 'Bearer ' + $localStorage.currentUser.token
                },
		       success: function(response) {
		        	console.log("response",response);
                   	callback({error: false, message: response.response.message});
		       },
		       error: function(jqXHR, textStatus, errorMessage) {
                   	callback({error: true, message: JSON.stringify(errorMessage)});
		       }
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
			// $http({
			// 	method: 'PUT',
			// 	url: 'http://localhost:1337/user/'+id,
			// 	data: datas
			// }).then(function (response) {
			// 	callback({error: false, message: response});
			// }, function(error) {
			// 	callback({error: true, message: error});
			// });
            $.ajax({
                url: 'http://localhost:1337/user/update/'+id,
                type: 'POST',
                data: datas,
                dataType: 'json',
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                headers: {
                    'Authorization': 'Bearer ' + $localStorage.currentUser.token
                },
                success: function(response) {
                    console.log("response",response);
                    callback({error: false, message: response.response});
                },
                error: function(jqXHR, textStatus, errorMessage) {
                    callback({error: true, message: JSON.stringify(errorMessage)});
                }
            });
		};

        service.delete = function (id, callback) {
            $http({
                method: 'POST',
                url: 'http://localhost:1337/user/delete',
                data: {id:id}
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