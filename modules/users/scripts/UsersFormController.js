angular.module('app')
	.controller('UsersFormController', ['$location', '$http', '$state', '$stateParams', '$scope', function($location, $http, $state, $stateParams, $scope) {
		
		console.log("UsersFormController loaded");
		var vm = this;
		vm.title = "Users Form";
		vm.f = {};
		vm.mode = "add";
		vm.saveOnSubmit = saveOnSubmit;

		if ($stateParams.id) {
			initEdit();
			vm.mode = "edit";
		}

		function saveOnSubmit() {
			console.log("saveOnSubmit loaded");
			$stateParams.id ? update() : save();
		}

		function save() {
			console.log('save loaded');
			delete vm.f.id;
			$http.post($scope.config.apiUrl + "/signup/", vm.f).then(function (res) {
				console.log("save - success:",res);
				alert('Successfully created!');
				$state.go("app.users.list", {action:''});
			}, function(err) {
				console.log("save - error:",err);
				alert(err.data.response.message);
			});
		}

		function update() {
			console.log('update loaded', $stateParams.id, vm.f);
			$http.put($scope.config.apiUrl + "/user/update/" + $stateParams.id, vm.f).then(function (res) {
				console.log("update - success:",res);
				alert('Successfully updated!');
				$state.go("app.users.list", {action:''});
			}, function(err) {
				console.log("update - error:",err);
				alert(JSON.stringify(err));
			});
		}

		function initEdit() {
			console.log("initEdit loaded");
			$http.get($scope.config.apiUrl + "/user/" + $stateParams.id).then(function (res) {
				console.log("initEdit - success:",res);
				vm.f = res.data;
			}, function(err) {
				console.log("initEdit - error:",err);
				alert(JSON.stringify(err));
			});
		}
	}]);