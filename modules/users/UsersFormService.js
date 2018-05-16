angular.module('app')
	.factory('UsersFormService', ['$http', '$localStorage', function($http, $localStorage) {
		var service = {};

		service.save = function (datas, callback) {
			// $http({
			// 	method: 'POST',
			// 	url: 'http://localhost:1337/signup',
			// 	data: datas,
             //    transformRequest: angular.identity,
             //    headers: {
			// 		'Content-Type': undefined
             //    }
			// }).then(function (response) {
			// 	callback({error: false, message: response.data.response.message});
			// }, function(error) {
			// 	callback({error: true, message: error.data.response.message});
			// });

            // /* Using AJAX */
            // var oReq  = new XMLHttpRequest();

            // /* Required for large files */
            // //xhr.setRequestHeader('X-CSRF-Token', csrfToken);
            // //formData.append('myFile', inputElement.files[0]);
            // //formData.append('_csrf', csrfToken);

            // oReq.open('POST', 'http://localhost:1337/signup', true);
            // oReq.setRequestHeader('Authorization', 'Bearer ' + $localStorage.currentUser.token);
            // oReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            // //oReq.setRequestHeader("Access-Control-Allow-Origin", "*");
            // //oReq.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            // oReq.onload = function() {
            //     if (oReq.readyState === 4) {
            //         var response = JSON.parse(oReq.responseText);
            //         if (oReq.status === 200 && response.status === 'OK') {
            //             console.log('successful');
            //         } else {
            //             console.log('failed');
            //         }
            //     }
            // }
            // oReq.send(datas);

            $.ajax({
		        url: 'http://localhost:1337/signup',
		        type: 'POST',
		        data: datas,
		        dataType: 'json',
		        async: false,
		        cache: false,
		        contentType: false,
		        processData: false,
		        headers: {
					'Authorization': 'Bearer ' + $localStorage.currentUser.token
                },
		       success: function(response) {
		           console.log("Success : " + response);
		       },
		       error: function(jqXHR, textStatus, errorMessage) {
		           console.log(errorMessage); // Optional
		       }
		    });
		};

		service.getById = function(id, callback) {
			$http({
				method: 'GET',
				url: 'http://localhost:1337/user/'+id
			}).then(function (response) {
				callback({error: false, message: response});
			}, function(error) {
				callback({error: true, message: error});
			});
		};

		service.update = function (id, datas, callback) {
			$http({
				method: 'PUT',
				url: 'http://localhost:1337/user/'+id,
				data: datas
			}).then(function (response) {
				callback({error: false, message: response});
			}, function(error) {
				callback({error: true, message: error});
			});
		};

        service.delete = function (id, callback) {
            $http({
                method: 'DELETE',
                url: 'http://localhost:1337/user/'+id
            }).then(function (response) {
                callback({error: false, message: response});
            }, function(error) {
                callback({error: true, message: error});
            });
        };

		service.deleteMany  = function(ids, callback) {
			$http({
				method: 'POST',
				url: 'http://localhost:1337/user/deleteMany',
				data: {
                    ids: ids
				}
			}).then(function (response) {
				callback({error: false, message: response});
			}, function(error) {
				callback({error: true, message: error});
			});
		};

        service.changePassword = function (datas, callback) {
            $http({
                method: 'POST',
                url: 'http://localhost:1337/user/changePassword/',
                data: datas
            }).then(function (response) {
                callback({error: false, message: response});
            }, function(error) {
                callback({error: true, message: error});
            });
        };

		return service;
	}]);