'use strict';
var user;
angular.module('loginApp')
.controller('LoginCtrl', [ '$scope', '$state', '$modalInstance' , '$window', 'Auth', '$http',
function($scope, $state, $modalInstance, $window, Auth,$http ) {
	$scope.credentials = {};
	$scope.loginForm = {};
	$scope.error = false;





	//when the form is submitted
	$scope.submit = function() {
		$scope.submitted = true;
		if (!$scope.loginForm.$invalid) {
			$scope.login($scope.credentials);
		} else {
			alert("Login Failed..!! Please check your credentials.");
			$scope.error = true;
			return;
		}
	};

	//Performs the login function, by sending a request to the server with the Auth service
	$scope.login = function() {
		var adminuser=this.adminUsername;
		var adminpass=this.adminPassword;
		//console.log(adminuser);
		//console.log(adminpass);

		$http.get("http://gemstonelive.azurewebsites.net/api/panelUsers?username="+adminuser+"&password="+adminpass)
			.then(function onFulfilled(response) {
				//alert("inside get");

				$scope.result=response.data;
				var res=$scope.result;
				user=res[0].userName
				var users = res[0].userName;
				var pass=res[0].passWord;


				//insert your custom login function here
				if(adminuser == users && adminpass == pass) {
					$modalInstance.close();
					$state.go("home");
				}else
				{
					alert("Credentials dont match");
				}
			}).catch(function onRejected(err)
		{
			alert("Login Failed ! Please Enter The Credentials Again !");
		});


	};

	
	// if a session exists for current user (page was refreshed)
	// log him in again
	//if ($window.sessionStorage["userInfo"]) {
	//	var credentials = JSON.parse($window.sessionStorage["userInfo"]);
		//$scope.login(credentials);
	//}

} ]);
