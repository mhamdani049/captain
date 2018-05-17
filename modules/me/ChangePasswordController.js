angular.module('app')
    .controller('ChangePasswordController', ['$location', '$stateParams', '$state', '$localStorage', 'UsersFormService', function($location, $stateParams, $state, $localStorage, UsersFormService) {
        var vm = this;

        vm.f = {};
        initController();

        vm.saveOnSubmitChangePassword = saveOnSubmitChangePassword;

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
        
        function saveOnSubmitChangePassword() {
            console.log("saveOnSubmitChangePassword...");



            UsersFormService.changePassword(vm.f, function(result) {
                if (!result.error) {
                    alert('Successfully updated!');
                } else {
                    alert(JSON.stringify(result));
                }
            });
        }

    }]);