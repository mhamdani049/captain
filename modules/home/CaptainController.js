angular.module('app')
	.controller('CaptainController', ['$scope', '$localStorage', 'LoadConfigService', function($scope, $localStorage, LoadConfigService) {
    	
        var vm = this;
		vm.currentUser = null;

        $scope.config = {};
        LoadConfigService.loadConfig().then(function(data) {
            console.log("LoadConfigService - ", data);
            $scope.config = data;
        });

		initController();

        function initController() {
            loadCurrentUser();
        }

        function loadCurrentUser() {
        	vm.currentUser = $localStorage.currentUser;
        }
    	
	}]);