angular.module('app')
	.controller('UsersChangePasswordModal', ['item', function(item) {
		var vm = this;
		vm.f = item;

		vm.onSubmitChangePassword = onSubmitChangePassword;

		function onSubmitChangePassword() {
			console.log("onSubmitChangePassword...");
			console.log("vm.f",vm.f);
		}

	}]);