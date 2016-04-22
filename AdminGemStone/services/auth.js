'use strict';

angular.module('loginApp')
.factory('Auth', [ '$http', '$rootScope', '$window', 'Session', 'AUTH_EVENTS', 
function($http, $rootScope, $window, Session, AUTH_EVENTS) {
	var authService = {};
	
	
	//the login function
	authService.login = function(user, success, error) {
		$http.get("http://gemstonelive.azurewebsites.net/api/panelUsers?userName=" + user.username)
			.success(function (res) {
				//this is my dummy technique, normally here the
				//user is returned with his data from the db


				var users = res[0].userName;
				var pass=res[0].passWord;
				var agentRole=res[0].userRole;


					var loginData = users;
					var loginPass=pass;

					//insert your custom login function here
					if(user.username == users && user.password == pass){
						//set the browser session, to avoid relogin on refresh

				$state.go("home");
						//		$window.sessionStorage["userInfo"] = loginData;

						//delete password not to be seen clientside
					//	delete loginData.password;

						//update current user into the Session service or $rootScope.currentUser
						//whatever you prefer
				//		Session.create(loginData,agentRole);
						//or
				//		$rootScope.currentUser = loginData;

						//fire event of successful login
				//		$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
						//run success function
				//		success(loginData);
					} else{
						//OR ELSE
						//unsuccessful login, fire login failed event for
						//the according functions to run
				//		$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
						error();
					}
				});


			};



	//check if the user is authenticated
	authService.isAuthenticated = function() {
		return !!Session.user;
	};
	
	//check if the user is authorized to access the next route
	//this function can be also used on element level
	//e.g. <p ng-if="isAuthorized(authorizedRoles)">show this only to admins</p>
	authService.isAuthorized = function(authorizedRoles) {
		if (!angular.isArray(authorizedRoles)) {
	      authorizedRoles = [authorizedRoles];
	    }
	    return (authService.isAuthenticated() &&
	      authorizedRoles.indexOf(Session.userRole) !== -1);
	};
	
	//log out the user and broadcast the logoutSuccess event
	authService.logout = function(){
	window.location="index.html";
		/*Session.destroy();
		$window.sessionStorage.removeItem("userInfo");
		$rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);*/
	}

	return authService;


}]);