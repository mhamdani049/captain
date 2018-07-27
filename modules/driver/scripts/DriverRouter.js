angular.module('app')
	.config(['$stateProvider','$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
		
		$stateProvider
			.state('app.driver', {
				url: '/driver',
				template: '<div ui-view></div>'
			})
			.state('app.driver.list', {
				url: '/list/:action',
				controller: 'DriverListController',
				controllerAs: 'vm',
				templateUrl: 'modules/driver/views/list.html',
				resolve: {
					loadMyFiles: function($ocLazyLoad) {
						return $ocLazyLoad.load({
							name: 'app',
							files: [
								'modules/driver/scripts/DriverListController.js',
								'modules/home/TableService.js'
							]
						})
					}
				}
			})
			.state('app.driver.add', {
				url: '/add',
				controller: 'DriverFormController',
				controllerAs: 'vm',
				templateUrl: 'modules/driver/views/form.html',
				resolve: {
					loadMyFiles: function($ocLazyLoad) {
						return $ocLazyLoad.load({
							name: 'app',
							files: [
								'modules/driver/scripts/DriverFormController.js',
							]
						})
					}
				}
			})
			.state('app.driver.edit', {
				url: '/edit/:id',
				controller: 'DriverFormController',
				controllerAs: 'vm',
				templateUrl: 'modules/driver/views/form.html',
				resolve: {
					loadMyFiles: function($ocLazyLoad) {
						return $ocLazyLoad.load({
							name: 'app',
							files: [
								'modules/driver/scripts/DriverFormController.js',
							]
						})
					}
				}
			});

	}])
