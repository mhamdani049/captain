angular.module('app')
	.config(['$stateProvider','$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
		
		$stateProvider
			.state('app.users', {
				url: '/users',
				template: '<div ui-view></div>'
			})
			.state('app.users.list', {
				url: '/list/:action',
				controller: 'UsersListController',
				controllerAs: 'vm',
				templateUrl: 'modules/users/views/list.html',
				resolve: {
					loadMyFiles: function($ocLazyLoad) {
						return $ocLazyLoad.load({
							name: 'app',
							files: [
								'modules/users/scripts/UsersListController.js',
								'modules/home/TableService.js'
							]
						})
					}
				}
			})
			.state('app.users.add', {
				url: '/add',
				controller: 'UsersFormController',
				controllerAs: 'vm',
				templateUrl: 'modules/users/views/form.html',
				resolve: {
					loadMyFiles: function($ocLazyLoad) {
						return $ocLazyLoad.load({
							name: 'app',
							files: [
								'modules/users/scripts/UsersFormController.js',
							]
						})
					}
				}
			})
			.state('app.users.edit', {
				url: '/edit/:id',
				controller: 'UsersFormController',
				controllerAs: 'vm',
				templateUrl: 'modules/users/views/form.html',
				resolve: {
					loadMyFiles: function($ocLazyLoad) {
						return $ocLazyLoad.load({
							name: 'app',
							files: [
								'modules/users/scripts/UsersFormController.js',
							]
						})
					}
				}
			})

	}])
