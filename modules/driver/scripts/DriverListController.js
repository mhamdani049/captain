angular.module('app')
	.controller('DriverListController', ['$location', '$stateParams', '$state', '$scope', '$uibModal', '$log', 'TableService', '$http', function($location, $stateParams, $state, $scope, $uibModal, $log, TableService, $http) {
		
		console.log("DriverListController loaded");
		var vm = this;
		vm.title = "Driver";
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
				endPoint: '/driver/orm',
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

		function onClickDelete(index) {
			selectedItem = vm.tableSvc.datas[index];
			console.log("onClickDelete loaded", selectedItem);
			var cf = confirm("Are you sure will delete " + selectedItem.nopol + "?");
		    if (cf == true) {
		        $http.delete($scope.config.apiUrl + "/driver/"+selectedItem.id).then(function (res) {
					console.log("onClickDelete - success:", res);
					alert('Successfully deleted!');
					vm.tableSvc.refresh();
				}, function(err) {
					console.log("onClickDelete - error:",err);
					alert(JSON.stringify(err));
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
				$http.post($scope.config.apiUrl + "/driver/deleteMany", { ids:ids }).then(function (res) {
					console.log("onClickDeleteMultiple - success:", res);
					alert('Successfully deleted!');
					vm.tableSvc.refresh();
				}, function(err) {
					console.log("onClickDeleteMultiple - error:",err);
					alert(err.data.response.message);
				});
			} else {
				alert('no data selected yet!');
			}
		}

		function onSubmitSearch() {
			console.log("onSubmitSearch...");
			console.log("vm.filter: ", vm.filter);
			vm.tableSvc.where = {
				email: vm.filter.email ? vm.filter.email : "",
				firstName: vm.filter.firstName ? { contains: vm.filter.firstName } : "" 
			};
            vm.tableSvc.refresh();
		}

	}]);