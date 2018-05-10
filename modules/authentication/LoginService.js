angular.module('app')
	.factory('LoginService', ['$http', '$localStorage', function($http, $localStorage) {
		var service = {}
		
		service.Login = function (email, password, callback) {
			$http({
		      	method: 'POST',
		      	url: 'http://localhost:1337/login', 
                data: {email: email, password: password}
		   	}).then(function (response){
		   		if (response.data.response.data.token) {
		   			$localStorage.currentUser = { id: response.data.response.data.user.id, email: email, token: response.data.response.data.token };

		   			// add jwt token to auth header for all request made by the $http service
		   			$http.defaults.headers.common.Authorization = 'Baerer ' + response.data.response.data.token;

		   			// execute callback with true to indicate successfully login
		   			callback(true);
		   		}
		   	},function (error){
		   		// execute callback with false to indicate failed login
		   		callback(error);
		   	});
		}

		service.Logout = function() {
			// remove user from local storage and clear http auth header
			delete $localStorage.currentUser;
			$http.defaults.headers.common.Authorization = 'Baerer ';			
		}

		return service;
	}]);