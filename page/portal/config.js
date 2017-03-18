define([
	"router",
	"/i18n?callback=define",
	"services"
	], function (router, i18n) {	
		var rootScope = null;
		router.config(function ($httpProvider) {
			$httpProvider.interceptors.push(function ($q) {
				var interceptor = {
					'request': function (config) {
						if (rootScope.mask && rootScope.mask.show) {
							rootScope.mask.show += 1;
						}
						return config;
					},
					'response': function (response) {
						return response;
					},
					'requestError': function (rejection) {
						//请求发生了错误，如果能从错误中恢复，可以返回一个新的请求或promise
						return response;//或新的promise
						//或者，可以通过返回一个rejection来阻止下一步
						//return $q.reject(rejection);
					},
					'responseError': function (rejection) {
						return rejection;//或新的promise
					}
				};
				return interceptor;
			});
		});

		router.run(function ($rootScope, $http) {
			$rootScope.i18n = router.i18n = i18n;
			rootScope = $rootScope;

			function setLoginInfo (http) {
				var common = http.headers.common;
			}

			$http.get("/getLoginInfo").then(function (data) {
				var data = data.data;
				$rootScope.userInfo = function () {return data;};
				try {
					if (data.error) {
						$rootScope.mainPage = "portal/login.html";
						$rootScope.mainCtrl = "portal/login";
						return;
					}

					setLoginInfo($http);
					$rootScope.mainPage = "portal/menu.html";
					$rootScope.mainCtrl = "portal/menu";
				}catch (e) {
					console.log(e);
				}
			}, function (error) {
				$rootScope.mainPage = "portal/login.html";
				$rootScope.mainCtrl = "portal/login";
			});
		});

});