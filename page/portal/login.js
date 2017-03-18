define([], function () {
	var ctrl = ["$scope", "$rootScope", "$http", "rememberMe", "authService",
	 function ($scope, $rootScope, $http, rememberMe, authService) {
		var name = {
				label: "Name",
				required: false,
				type: "textbox",
				value: "user",
				show: true
			},
			pwd = {
				label: "Password",
				required: false,
				type: "password",
				value: "password",
				show: true
			},
			retryPwd = {
				label: "ConfirmPassword",
				required: false,
				type: "password",
				value: "password",
				show: true
			};
		$scope.form = [
			name,
			pwd,
			retryPwd
		];

		$scope.login = function () {
			var params = {
				name: name,
				pwd: pwd
			};
			$http.post("/token", params).then(function (data) {
				var data = data.data;
				authService.setLogin();
				rememberMe.setCookie("user", data.user);
				$rootScope.userInfo().name = data.user;
				$rootScope.userInfo().password = data.password;

				$rootScope.mainPage = "portal/menu.html";
				$rootScope.mainCtrl = "portal/menu";
			});
		};

	}];

	return ctrl;
});