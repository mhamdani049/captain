angular.module('app')
	.controller('LoginController', ['$location', 'LoginService', function($location, LoginService) {
		var vm = this;

		vm.f = {};
		vm.loginOnSubmit = loginOnSubmit;

		initController();
		function initController() {
			// reset login status
			LoginService.Logout();
		}

		function loginOnSubmit() {
			LoginService.Login(vm.f.email, vm.f.password, function(result) {
				if (result === true) {
					$location.path('/app/home');
				} else {
					alert('error');
				}
			})
		}

	}]);