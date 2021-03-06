'use strict'

angular
	.module('app', [
		'oc.lazyLoad',
		'ui.router',
		'ui.bootstrap',
		'angular-loading-bar',
		'ngStorage',
		'amActionUtil'
	])
	.config(['$stateProvider','$urlRouterProvider', '$locationProvider', '$ocLazyLoadProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $ocLazyLoadProvider, $httpProvider) {

		$ocLazyLoadProvider.config({
			debug: true,
			events: false,
		});

		$locationProvider.html5Mode(false);
        $locationProvider.html5Mode('!');

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
            .state('app.me.changePassword', {
                url: '/changePassword',
                controller: 'ChangePasswordController',
                controllerAs: 'vm',
                templateUrl: 'modules/me/views/changePassword.html',
                resolve: {
                    loadMyFiles: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'app',
                            files: [
                                'modules/me/ChangePasswordController.js',
                            ]
                        })
                    }
                }
            });

        $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.currentUser) {
                        config.headers.Authorization = 'Bearer ' + $localStorage.currentUser.token;
                    }
                    return config;
                },
                'responseError': function (response) {
                    if (response.status === 401 || response.status === 403) {
                        $location.path('/login');
                    }
                    return $q.reject(response);
                }
            };
        }]);
	}])
	.run(['$rootScope', '$http', '$location', '$localStorage', function($rootScope, $http, $location, $localStorage) {
		// keep user logged in after page refresh
        // if ($localStorage.currentUser) {
         //    $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
        // }

        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var publicPages = ['/login'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !$localStorage.currentUser) {
                $location.path('/login');
            }
        });
	}]);
