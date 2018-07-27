angular.module('app')
	.controller('UsersChangePasswordModal', ['$uibModalInstance', 'item', '$http', '$scope', function($uibModalInstance, item, $http, $scope) {
		var vm = this;
		vm.f = item;

		vm.onSubmit = onSubmit;
		vm.closeModal = closeModal;

		function onSubmit() {
			console.log("onSubmit loaded",vm.f);

			$http.post("http://localhost:1337/user/changePassword/", vm.f).then(function (res) {
				console.log("onSubmit - success:", res);
				alert('Successfully updated!');
				$uibModalInstance.close();
			}, function(err) {
				console.log("onSubmit - error:", err);
				alert(JSON.stringify(err));
			});
		}
		
		function closeModal() {
            $uibModalInstance.close();
        }

	}]);