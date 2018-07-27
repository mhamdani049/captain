angular.module('app')
	.controller('DriverFormController', ['$location', '$http', '$state', '$stateParams', function($location, $http, $state, $stateParams) {
		
		console.log("DriverFormController loaded");
		var vm = this;
		vm.title = "Driver Form";
		vm.f = {};
		vm.mode = "add";
		vm.saveOnSubmit = saveOnSubmit;
		
		vm.employees = [];

		if ($stateParams.id) {
			initEdit();
			vm.mode = "edit";
		}

		function saveOnSubmit() {
			console.log("saveOnSubmit loaded");
			$stateParams.id ? update() : save();
		}

		function save() {
			console.log('save loaded', vm.selectedEmployee);
			vm.f.employee = vm.selectedEmployee ? vm.selectedEmployee : null;
			$http.post('http://localhost:1337/driver', vm.f).then(function(response) {
				console.log("save - response", response);
				alert('Success');
			}, function(err) {
				console.log("save - err", err);
				alert(JSON.stringify(err));
			});
		}

		function update() {
			console.log('update loaded', $stateParams.id, vm.f, vm.selectedEmployee);
			vm.f.employee = vm.selectedEmployee ? vm.selectedEmployee : null;
			delete vm.f.id;
			$http.put('http://localhost:1337/driver/'+$stateParams.id, vm.f).then(function(response) {
				console.log("update - response", response);
				alert('Success');
			}, function(err) {
				console.log("update - err", err);
				alert(JSON.stringify(err));
			});
		}

		function initEdit() {
			console.log("initEdit...");
			$http.get('http://localhost:1337/driver/'+$stateParams.id).then(function(response) {
				console.log("initEdit - response", response);
				vm.f = response.data;
				vm.selectedEmployee = vm.f.employee.id;
			}, function(err) {
				console.log("initEdit - err", err);
				alert(JSON.stringify(err));
			});	
		}

		execute();
        function execute() {
            getEmployee();
        }

		function getEmployee() {
			$http.get('http://localhost:1337/user/').then(function(response) {
				console.log("getEmployee - response", response);

				vm.employees = response.data;
			}, function(err) {
				console.log("getEmployee - err", err);
			});
		}
	}]);