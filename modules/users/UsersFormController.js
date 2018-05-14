angular.module('app')
	.controller('UsersFormController', ['$location', '$http', '$state', '$stateParams', 'UsersFormService', function($location, $http, $state, $stateParams, UsersFormService) {
		var vm = this;

		vm.f = {};
		vm.mode = "add";

		vm.saveOnSubmit = saveOnSubmit;

		if ($stateParams.id) {
			initEdit();
			vm.mode = "edit";
		}

		function saveOnSubmit() {
			console.log("saveOnSubmit...");
			$stateParams.id ? update() : save();
		}

		function save() {
			console.log('save...');

			delete vm.f.id;
			UsersFormService.save(vm.f, function(result) {
				if (!result.error) {
					alert(result.message);
					$state.go("app.users.list", {action:''});
				} else {
					alert(result.message);
				}
			});
		}

		function update() {
			console.log('update...');

			UsersFormService.update($stateParams.id, vm.f, function(result) {
				if (!result.error) {
					vm.f = result.message.data;
					alert('Successfully updated!');
				} else {
					alert(JSON.stringify(result));
				}
			});
		}

		function initEdit() {
			console.log("initEdit...");
			UsersFormService.getById($stateParams.id, function(result) {
				if (!result.error) {
					vm.f = result.message.data;
				} else {
					alert(JSON.stringify(result));
				}
			});
		}
	}]);