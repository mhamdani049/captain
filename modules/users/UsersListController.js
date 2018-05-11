angular.module('app')
	.controller('UsersListController', ['$location', '$stateParams', '$state', '$scope', 'UsersListService', 'UsersFormService', 'TableService', function($location, $stateParams, $state, $scope, UsersListService, UsersFormService, TableService) {
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

		vm.find = {};
		vm.onSubmitSearch = onSubmitSearch;

		vm.tableSvc = new TableService();
        initTableListener();
		
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

		initController();
		function initController() {

			var tblOpt = {
				endPoint: '/user/orm',
				collect: [],
				sort: 'id desc',
				criteriaMapping: {name: 'contains'}
			};

			vm.tableSvc.initialize(tblOpt);
			vm.tableSvc.requestData();
			console.log('initTableData - vm.tableSvc: ', vm.tableSvc);

			UsersListService.All(vm.pagination, function(result) {
				if (!result.error) {
					console.log(result.datas.data.response.data);
					vm.ts = result.datas.data.response.data;

					vm.pagination = result.datas.data.response.meta;
				} else {
					vm.ts = [];
				}
			});
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
			initController();
		}

		function checkUncheckAll() {
			console.log("checkUncheckAll...");
			if (vm.checkAll) {
				vm.checkAll = true;
			} else {
				vm.checkAll = false;
			}
			angular.forEach(vm.ts, function(data) {
				data.checked = vm.checkAll;
			});
		};

		function updateCheckall($index, data) {
			console.log("updateCheckall...");
			var dataTotal = vm.ts.length;
			var count = 0;
			angular.forEach(vm.ts, function(data) {
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
			angular.forEach(vm.ts, function(data) {
				if (data.checked) {
					arrDeleted.push(data.id);
				}
			});
			console.log(arrDeleted);
		}

		function onSubmitSearch() {
			console.log("onSubmitSearch...");
			console.log(vm.find);
			console.log(vm.tableSvc.refresh());
		}

	}]);