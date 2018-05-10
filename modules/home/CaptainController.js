angular.module('app')
	.controller('CaptainController', ['$scope', '$localStorage', function($scope, $localStorage) {
    	var vm = this;

		vm.currentUser = null;

		initController();

        function initController() {
            loadCurrentUser();
        }

        function loadCurrentUser() {
        	vm.currentUser = $localStorage.currentUser;
        }
    	
	}]);