angular.module('app')
	.controller('UsersListController', ['$location', '$stateParams', '$state', '$scope', '$uibModal', '$log', 'UsersListService', 'UsersFormService', 'TableService', function($location, $stateParams, $state, $scope, $uibModal, $log, UsersListService, UsersFormService, TableService) {
		var vm = this;

		vm.pagination = {
			page: $stateParams.page,
			perPage: $stateParams.per_page,
	      	previousPage: false,
	      	nextPage: false,
	      	pageCount: 0,
	      	total: 0
		}

		vm.paginationSelectNumberPage = [2, 5, 10, 15, 50];
		vm.selectedPaginationSelectNumberPage = 5;
		vm.onChangePaginationSelectNumberPage = onChangePaginationSelectNumberPage;

		vm.inputPaginationPage = 1;

		vm.onClickPaginationPrevious = onClickPaginationPrevious;
		vm.onClickPaginationNext = onClickPaginationNext;

		vm.onChangePaginationPage = onChangePaginationPage;

		vm.onClickDelete = onClickDelete;
		vm.onClickRefresh = onClickRefresh;
		vm.onClickDeleteMultiple = onClickDeleteMultiple;

		vm.checkAll = false;
		vm.checkUncheckAll = checkUncheckAll;
		vm.updateCheckall = updateCheckall;

		vm.filter = {};
		vm.onSubmitSearch = onSubmitSearch;

		vm.tableSvc = new TableService();
        initTableListener();

        vm.goToPagePrev = goToPagePrev;
        vm.goToPageNext = goToPageNext;
        vm.setLimit = setLimit;

        vm.onClickShowModalChangePassword = onClickShowModalChangePassword;
		
		function initTableListener() {
			$scope.$on('requestDataStart', function () {
				vm.loadingdata = 'inprogress';
            });

			$scope.$on('requestDataSuccess', function () {
				vm.loadingdata = 'done';
            });

			$scope.$on('requestDataError', function (even, err) {
				vm.loadingdata = 'done';
				console.log('err: ', err);
				alert(err.message);
            })
        }

        execute();
        function execute() {
			if(!_.isEmpty(vm.tableSvc.where)) initFilterValue();
            initController();
        }

		function initController() {
			var tblOpt = {
				endPoint: '/user/orm',
				collect: [],
				sort: 'createdAt desc',
				criteriaMapping: {name: 'contains'}
			};

			vm.tableSvc.initialize(tblOpt);
			vm.tableSvc.requestData();
			console.log('initTableData - vm.tableSvc: ', vm.tableSvc);
		}

        function initFilterValue() {
            console.log('initFilter loaded');
        }

		function onChangePaginationSelectNumberPage() {
			console.log("onChangePaginationSelectNumberPage...");
			vm.pagination.perPage = parseInt(vm.selectedPaginationSelectNumberPage);
			initController();
		}

		function onClickPaginationPrevious() {
			console.log("onClickPaginationPrevious...");
			$state.go('app.users.list', {page: vm.pagination.previousPage, per_page: vm.pagination.perPage});
		}

		function onClickPaginationNext() {
			console.log("onClickPaginationNext...");
			$state.go('app.users.list', {page: vm.pagination.nextPage, per_page: vm.pagination.perPage});
		}

		function onChangePaginationPage() {
			console.log("onChangePaginationPage...");
			vm.pagination.page = parseInt(vm.inputPaginationPage);
			initController();
		}

		function onClickDelete(data) {
			console.log("onClickDelete...");
			var cf = confirm("Are you sure will delete " + data.email);
		    if (cf == true) {
		        UsersFormService.delete(data.id, function(result) {
					if (!result.error) {
						alert("Successfully deleted!");
                        vm.tableSvc.refresh();
					} else {
						alert(JSON.stringify(result));
					}
				});
		    } else {
		        console.log("Delete cancel...")
		    }
		}

		function onClickRefresh() {
			console.log("onClickRefresh...");
            vm.tableSvc.refresh();
		}

		function checkUncheckAll() {
			console.log("checkUncheckAll...");
			if (vm.checkAll) {
				vm.checkAll = true;
			} else {
				vm.checkAll = false;
			}
			angular.forEach(vm.tableSvc.datas, function(data) {
				data.checked = vm.checkAll;
			});
		};

		function updateCheckall($index, data) {
			console.log("updateCheckall...");
			var dataTotal = vm.tableSvc.datas.length;
			var count = 0;
			angular.forEach(vm.tableSvc.datas, function(data) {
				if (data.checked) {
					count++;
				}
			});

			if (dataTotal == count) {
				vm.checkAll = true;
			} else {
				vm.checkAll = false;
			}
		};

		function onClickDeleteMultiple() {
			console.log("onClickDeleteMultiple...");
			var arrDeleted = [];
			angular.forEach(vm.tableSvc.datas, function(data) {
				if (data.checked) {
					arrDeleted.push(data.id);
				}
			});

			if (arrDeleted.length > 0) {
				var ids = JSON.stringify(arrDeleted);
                UsersFormService.deleteMany(ids, function(result) {
                    if (!result.error) {
                        alert("Successfully deleted!");
                        vm.tableSvc.refresh();
                    } else {
                        alert(JSON.stringify(result));
                    }
                });
			} else {
				alert('no data selected yet!');
			}
		}

		function onSubmitSearch() {
			console.log("onSubmitSearch...");
			console.log(vm.filter);
            vm.tableSvc.refresh();
		}
		
		function setLimit() {
			vm.tableSvc.setLimit(vm.tableSvc.limit);
        }

		function goToPageNext() {
			vm.tableSvc.goToPage(vm.tableSvc.page + 1);
		}

		function goToPagePrev() {
			vm.tableSvc.goToPage(vm.tableSvc.page + -1);	
		}

		vm.people = [
		    'Fred',
		    'Jim',
		    'Bob'
		 ];
		
		function onClickShowModalChangePassword(data) {
			console.log("onClickShowModalChangePassword...", data);
			var modalInstance = $uibModal.open({
                templateUrl: 'modules/users/views/changePassword-modal.html',
                controller: 'UsersChangePasswordModal',
                controllerAs: 'vm',
                resolve: {
					item: function(){
			          	return data;
			        },
					loadMyFiles: function($ocLazyLoad) {
						return $ocLazyLoad.load({
							name: 'app',
							files: [
								'modules/users/UsersChangePasswordModal.js',
                                'modules/users/UsersFormService.js',
							]
						})
					}
				}
			});

            modalInstance.result.then(function (selectedItem) {
                vm.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });

        }

	}]);