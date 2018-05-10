angular.module('app')
	.controller('ProfileController', ['$location', '$stateParams', '$state', '$localStorage', 'UsersFormService', function($location, $stateParams, $state, $localStorage, UsersFormService) {
		var vm = this;

		vm.f = {};

		vm.saveOnSubmit = saveOnSubmit;

		initController();

        function initController() {
            loadCurrentUser();
        }

        function loadCurrentUser() {
        	console.log('loadCurrentUser...');

        	UsersFormService.getById($localStorage.currentUser.id, function(result) {
				if (!result.error) {
					vm.f = result.message.data;
				} else {
					alert(JSON.stringify(result));
				}
			});
        }

        function saveOnSubmit() {
        	console.log("saveOnSubmit...");

        	UsersFormService.update($localStorage.currentUser.id, vm.f, function(result) {
				if (!result.error) {
					vm.f = result.message.data;

					$localStorage.currentUser.email = result.message.data.email;

					alert('Successfully updated!');
				} else {
					alert(JSON.stringify(result));
				}
			});
        }
	}]);