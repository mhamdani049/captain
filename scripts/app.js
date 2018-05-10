'use strict'

angular
	.module('app', [
		'oc.lazyLoad',
		'ui.router',
		'ui.bootstrap',
		'angular-loading-bar',
		'ngStorage'
	])
	.config(['$stateProvider','$urlRouterProvider', '$locationProvider', '$ocLazyLoadProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $ocLazyLoadProvider) {

		$ocLazyLoadProvider.config({
			debug: true,
			events: false,
		});

		// $locationProvider.html5Mode(true);

		$urlRouterProvider.otherwise('/login');

		$stateProvider
			.state('login', {
				url: '/login',
				controller: 'LoginController',
				controllerAs: 'vm',
				templateUrl: 'modules/authentication/views/login.html',
				resolve: {
					loadMyFiles: function($ocLazyLoad) {
						return $ocLazyLoad.load({
							name: 'app',
							files: [
								'modules/authentication/LoginController.js',
								'modules/authentication/LoginService.js'
							]
						})
					}
				}
			})
			.state('app', {
		        url:'/app',
		        controller: 'CaptainController',
		        controllerAs: 'vm',
		        templateUrl: 'modules/home/views/main.html',
		        resolve: {
		            loadMyDirectives:function($ocLazyLoad){
		                return $ocLazyLoad.load(
		                {
		                    name:'app',
		                    files: [
		                    	'scripts/directives/header/header.js',
		                    	'scripts/directives/header/header-notification/header-notification.js',
		                    	'scripts/directives/sidebar/sidebar.js',
		                    	'scripts/directives/sidebar/sidebar-search/sidebar-search.js',
		                    	'modules/home/CaptainController.js'
		                    ]
		                })
		            }
		        }
		    })
			.state('app.home', {
        		url:'/home',
				controller: 'HomeController',
				controllerAs: 'vm',
				templateUrl: 'modules/home/views/home.html',
				resolve: {
					loadMyFiles: function($ocLazyLoad) {
						return $ocLazyLoad.load({
							name: 'app',
							files: [
								'modules/home/HomeController.js',
								'modules/home/HomeService.js'
							]
						})
					}
				}
			})
			.state('app.me', {
        		url:'/me',
				controller: 'MeMainController',
				controllerAs: 'vm',
				templateUrl: 'modules/me/views/main.html',
				resolve: {
					loadMyFiles: function($ocLazyLoad) {
						return $ocLazyLoad.load({
							name: 'app',
							files: [
								'modules/me/MeMainController.js'
							]
						})
					}
				}
			})
			.state('app.me.profile', {
				url: '/profile',
				controller: 'ProfileController',
				controllerAs: 'vm',
				templateUrl: 'modules/me/views/profile.html',
				resolve: {
					loadMyFiles: function($ocLazyLoad) {
						return $ocLazyLoad.load({
							name: 'app',
							files: [
								'modules/me/ProfileController.js',
								'modules/users/UsersFormService.js'
							]
						})
					}
				}
			})
			.state('app.users', {
				url: '/users',
				controller: 'UsersMainController',
				controllerAs: 'vm',
				templateUrl: 'modules/users/views/main.html',
				resolve: {
					loadMyFiles: function($ocLazyLoad) {
						return $ocLazyLoad.load({
							name: 'app',
							files: [
								'modules/users/UsersMainController.js'
							]
						})
					}
				}
			})
			.state('app.users.list', {
				url: '/list/:page/:per_page',
				controller: 'UsersListController',
				controllerAs: 'vm',
				templateUrl: 'modules/users/views/list.html',
				resolve: {
					loadMyFiles: function($ocLazyLoad) {
						return $ocLazyLoad.load({
							name: 'app',
							files: [
								'modules/users/UsersListController.js',
								'modules/users/UsersListService.js',
								'modules/users/UsersFormService.js'
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
								'modules/users/UsersFormController.js',
								'modules/users/UsersFormService.js'
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
								'modules/users/UsersFormController.js',
								'modules/users/UsersFormService.js'
							]
						})
					}
				}
			})


	}])
	.run(['$rootScope', '$http', '$location', '$localStorage', function($rootScope, $http, $location, $localStorage) {
		// keep user logged in after page refresh
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
        }

        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var publicPages = ['/login'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !$localStorage.currentUser) {
                $location.path('/login');
            }
        });
	}])
