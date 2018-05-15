angular.module('app')
	.controller('UsersChangePasswordModal', ['$uibModalInstance', 'item', 'UsersFormService', function($uibModalInstance, item, UsersFormService) {
		var vm = this;
		vm.f = item;

		vm.onSubmitChangePassword = onSubmitChangePassword;
		vm.onClickCloseModalChangePassword = onClickCloseModalChangePassword;

		function onSubmitChangePassword() {
			console.log("onSubmitChangePassword...");
			console.log("vm.f",vm.f);

            UsersFormService.changePassword(vm.f, function(result) {
                if (!result.error) {
                    alert('Successfully updated!');
                    $uibModalInstance.close();
                } else {
                    alert(JSON.stringify(result));
                }
            });
		}
		
		function onClickCloseModalChangePassword() {
            $uibModalInstance.close();
        }

	}]);