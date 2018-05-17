angular.module('app')
    .directive('ngFiles', ['$parse', function ($parse) {
        function fn_link(scope, element, attrs) {
            var onChange = $parse(attrs.ngFiles);
            element.on('change', function (event) {
                onChange(scope, { $files: event.target.files });
            });
        };

        return {
            link: fn_link
        }
    }])
	.controller('ProfileController', ['$location', '$stateParams', '$state', '$localStorage', 'UsersFormService', function($location, $stateParams, $state, $localStorage, UsersFormService) {
		var vm = this;

		vm.f = {};
        var formdata = new FormData();

        vm.getTheFiles = getTheFiles;
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

            for (var key in vm.f) {
                formdata.append(key, vm.f[key]);
            }

        	UsersFormService.update($localStorage.currentUser.id, formdata, function(result) {
				console.log("result", result);
        		if (!result.error) {
					vm.f = result.message.data[0];

					$localStorage.currentUser.email = result.message.data[0].email;

					alert('Successfully updated!');
				} else {
					alert(JSON.stringify(result));
				}
			});
        }

        function getTheFiles($files) {
            angular.forEach($files, function (value, key) {
                //console.log("key",key);
                //console.log("value",value);
                formdata.append("avatar", value);
            });
            console.log("formdata", formdata);
        };
	}]);