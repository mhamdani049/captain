angular.module('app')
    .directive('ngFiles', ['$parse', function ($parse) {
		alert('aa');
        function fn_link(scope, element, attrs) {
            alert('bb');
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
            var _formdata = new FormData();
            //_formdata.append("email", vm.f.email);

            for (var key in vm.f) {
                _formdata.append("email", vm.f[key]);
			}

			UsersFormService.save(_formdata, function(result) {
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

        function getTheFiles($files) {
            angular.forEach($files, function (value, key) {
                formdata.append(key, value);
            });
            console.log("formdata", formdata);
        };
	}]);