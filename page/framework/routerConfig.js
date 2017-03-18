define(["angular", "ui-router"], function (angular) {
	var mod = angular.module("ui.router");

	function getResolve ($controllerProvider, ctrlPath, ctrlName) {
		return {
			ctrl: function ($q) {
				var deferred = $q.defer();
				require([ctrlPath], function (ctrl) {				
					$controllerProvider.register(ctrlName, ctrl);
					deferred.resolve();
				});	

				return deferred.promise;
			}
		}
	}

	mod.run(function ($rootScope, rememberMe) {
		$rootScope.$on("$stateChangeStart", function (evt, toState, toParams, fromState, fromParams) {
			if (rememberMe.getCookie("isAuthenticated")) {
				console.log("isAuthenticated");
			} else {

			}
		});
	});

	mod.home = function (state) {
        mod.config(function ($urlRouterProvider) {
            mod.homeState = state;
            var url = "/" + state.replace(".", "/");
            $urlRouterProvider.otherwise(url);
            $urlRouterProvider.when("", url);
        });
    }
	mod.config(function ($stateProvider, $controllerProvider) {
		mod.state = function (state, url, ctrlPath) {
			var array = ctrlPath.split("/"),
			ctrlName = array[array.length - 1],
			config = {};
			if (typeof(ctrlPath) === "string") {
					config.resolve = getResolve($controllerProvider, ctrlPath, ctrlName);
			}
			config.url = "/" + state;
			config.controller = ctrlName;
			config.templateUrl = url;

			$stateProvider.state(state, config);
		}	
	});

	var menuData = {};

	mod.menu = function (type, level, state, label) {
		var e = {
			type: type,
			level: level,
			state: state,
			label: label
		};

		var menu = menuData[type];
		if (menu == null) {
			menuData[type] = [];
		}

		menuData[type].push(e);
	};

	mod.getMenu = function (type) {
		var out = {
			child: []
		};
		var map = {};
		var menus = menuData[type];

		for (var i in menus) {
			var arr = [];
			var menu = menus[i];
			menu.child = [];
			map[menu.level.join()] = menu;

			var supe = map[menu.level.slice(0,-1).join()];
			if (supe) {
				arr = supe.child;
			} else {
				arr = out.child;
			}
			arr.push(menu);
		}

		return out.child;

		function trim () {
		}

	};

	return mod;
});