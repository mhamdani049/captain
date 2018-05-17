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
	.controller('UsersFormController', ['$location', '$http', '$state', '$stateParams', 'UsersFormService', function($location, $http, $state, $stateParams, UsersFormService) {
		var vm = this;

		vm.f = {};
		vm.mode = "add";
        var formdata = new FormData();

		vm.getTheFiles = getTheFiles;
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
            //var _formdata = new FormData();
            //_formdata.append("email", vm.f.email);

            for (var key in vm.f) {
                formdata.append(key, vm.f[key]);
			}

			UsersFormService.save(formdata, function(result) {
				if (!result.error) {
					alert(result.message);
					$state.go("app.users.list", {action:''});
				} else {
					alert(result.message);
				}
			});
		}

		function update() {
			console.log('update...', $stateParams.id, vm.f);
            for (var key in vm.f) {
                formdata.append(key, vm.f[key]);
            }
			UsersFormService.update($stateParams.id, formdata, function(result) {
				if (!result.error) {
					alert('Successfully updated!');
                    $state.go("app.users.list", {action:''});
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

        function getTheFiles($files) {
            angular.forEach($files, function (value, key) {
            	console.log("key",key);
                console.log("value",value);
                formdata.append("avatar", value);
            });
            console.log("formdata", formdata);
        };
	}]);